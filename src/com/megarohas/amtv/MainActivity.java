package com.megarohas.amtv;

import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.graphics.Color;
import android.graphics.Outline;
import android.graphics.PixelFormat;
import android.net.Uri;
import android.os.Bundle;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;
import android.view.WindowManager;
import android.view.accessibility.AccessibilityManager;
import android.view.accessibility.AccessibilityNodeProvider;
import android.view.inputmethod.InputMethodManager;
import android.webkit.CookieManager;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * music.apple.com full screen in a WebView, driven by the remote through {@link Cursor}.
 * Android TV has no Chrome, so there is no PWA to install: this is the wrapper instead.
 */
public class MainActivity extends Activity {
    static final String TAG = "amtv";
    // Search, not home: the hidden site's home plays animated artwork non-stop (see page.js).
    private static final String HOME = "https://music.apple.com/search";
    private static final java.util.regex.Pattern STOREFRONT = java.util.regex.Pattern.compile("[a-z]{2}");
    private static final ViewGroup.LayoutParams FILL = new ViewGroup.LayoutParams(-1, -1);

    private FrameLayout pages;                                // the main page, popups on top
    private WebView web;
    private final ArrayList<WebView> popups = new ArrayList<>();
    private Cursor cursor;
    private String pageJs;
    private String signinJs;                                  // remote-friendly look for Apple's sign-in popup
    private boolean siOkDown;
    private boolean tv;                                       // our TV interface is up (else: the site + cursor)
    private boolean okDown, okHeld;
    private boolean pageReady;
    private View splash;                                      // until the TV interface says it has a screen
    private TextView splashStatus;
    private FrameLayout root;
    private final Runnable splashTimeout = this::hideSplash;
    private int splashGen;                                    // which showing of the splash a "ready" lifts
    private boolean started, dreaming;
    private volatile boolean screenReader;                    // TalkBack & co are on: they read the page itself
    private final AccessibilityManager.AccessibilityStateChangeListener a11yChanged = on -> checkScreenReader();
    private final AccessibilityManager.TouchExplorationStateChangeListener touchChanged = on -> checkScreenReader();

    // Leaving the app pauses the music; the TV's screensaver (a "dream") does not count as leaving.
    private final BroadcastReceiver dreams = new BroadcastReceiver() {
        @Override
        public void onReceive(Context c, Intent i) {
            dreaming = Intent.ACTION_DREAMING_STARTED.equals(i.getAction());
        }
    };
    private final Runnable pauseIfLeft = () -> {
        if (started || dreaming) return;
        Log.i(TAG, "left the app: pause");
        web.evaluateJavascript("try{MusicKit.getInstance().pause()}catch(e){}", null);
    };
    private String storefrontReload;                          // the storefront the site was reopened in
    private String pendingPlay;                               // `--es play ra.…`, kept until the page takes it

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        WebView.setWebContentsDebuggingEnabled(true);         // reachable only through adb
        CookieManager.getInstance().setAcceptCookie(true);
        AccessibilityManager am = (AccessibilityManager) getSystemService(ACCESSIBILITY_SERVICE);
        am.addAccessibilityStateChangeListener(a11yChanged);
        am.addTouchExplorationStateChangeListener(touchChanged);
        checkScreenReader();

        pages = new FrameLayout(this);
        pages.setBackgroundColor(Color.BLACK);
        web = newPage();
        pages.addView(web, FILL);
        web.addJavascriptInterface(new Bridge(), "AmtvNative");
        // Under the splash the site loads, the sign-in is restored from cookies and our interface
        // builds its first screen; it lifts when the page says ready (25 s at most, never stuck).
        root = new FrameLayout(this);
        root.addView(pages, FILL);
        setContentView(root);
        showSplash(str("status_starting"));
        cursor = new Cursor(this, this::top, () -> web.evaluateJavascript("window.__amtv&&__amtv.wake(2500)", null));
        cursor.setVisibility(View.INVISIBLE);                 // until we know it's needed (site mode)
        pages.post(this::attachCursor);
        // Once per document: the site's own router (pushState) also fires onPageFinished, and
        // re-running the scripts would tear the interface down and build it again.
        signinJs = raw("signin");
        pageJs = "window.__amtvVersion=" + js(versionName()) + ";\nif(!window.__amtvLoaded){window.__amtvLoaded=true;\n" + raw("page") + "\n" + raw("brand") + "\n" + raw("tv_core")
                + "\n" + raw("tv_screens") + "\n" + raw("tv_player") + "\nwindow.__tv&&__tv.boot();\n}";
        web.loadUrl(home());
        playFrom(getIntent());
        IntentFilter f = new IntentFilter(Intent.ACTION_DREAMING_STARTED);
        f.addAction(Intent.ACTION_DREAMING_STOPPED);
        if (Build.VERSION.SDK_INT >= 33) registerReceiver(dreams, f, Context.RECEIVER_NOT_EXPORTED);
        else registerReceiver(dreams, f);
    }

    @Override
    protected void onStart() {
        super.onStart();
        started = true;
        pages.removeCallbacks(pauseIfLeft);
        checkScreenReader();                                  // turned on in Settings meanwhile
    }

    // The dream broadcast can land just after onStop: decide a moment later.
    @Override
    protected void onStop() {
        super.onStop();
        started = false;
        pages.postDelayed(pauseIfLeft, 1200);
    }

    // Already running (singleTask): a voice command or adb asking for something to play.
    @Override
    protected void onNewIntent(Intent i) {
        super.onNewIntent(i);
        setIntent(i);
        playFrom(i);
    }

    /**
     * `--es play <id>`: a station (ra.…), playlist (pl./p.…), album (numeric / l.…) or library song (i.…).
     * `--es cmd next|prev|pause|play|toggle|favorite|unfavorite`: the player (the voice remote's commands).
     */
    private void playFrom(Intent i) {
        String cmd = i == null ? null : i.getStringExtra("cmd");
        if (cmd != null && cmd.matches("next|prev|pause|play|toggle|favorite|unfavorite")) {
            Log.i(TAG, "cmd " + cmd);
            web.evaluateJavascript("window.__tv&&__tv.command('" + cmd + "')", null);
        }
        String id = i == null ? null : i.getStringExtra("play");
        if (id == null || !id.matches("[A-Za-z0-9._-]{1,100}")) return;
        Log.i(TAG, "play " + id);
        showSplash(str("status_play"));
        pendingPlay = id;
        flushPlay();
    }

    // Re-sent on every load until the interface says it took it (Bridge.played): a page that
    // reloads before our interface is up must not lose the station.
    private void flushPlay() {
        if (pendingPlay == null || !pageReady) return;
        web.evaluateJavascript("window.__amtvPlay='" + pendingPlay + "';window.__tv&&__tv.flushPlay()", null);
    }

    /** A see-through panel window over the activity: redrawing it leaves the page's window alone. */
    private void attachCursor() {
        WindowManager.LayoutParams lp = new WindowManager.LayoutParams(-1, -1,
                WindowManager.LayoutParams.TYPE_APPLICATION_PANEL,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE
                        | WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
                        | WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
                PixelFormat.TRANSLUCENT);
        lp.token = pages.getWindowToken();
        lp.setTitle("amtv cursor");
        getWindowManager().addView(cursor, lp);
    }

    private final ArrayList<android.animation.Animator> splashAnims = new ArrayList<>();

    /** App-coloured tile with a breathing glow and three loading dots: alpha/scale animations only. */
    private View makeSplash() {
        float dp = getResources().getDisplayMetrics().density;
        FrameLayout f = new FrameLayout(this);
        f.setBackgroundColor(Color.BLACK);

        android.graphics.drawable.GradientDrawable glowBg = new android.graphics.drawable.GradientDrawable();
        glowBg.setGradientType(android.graphics.drawable.GradientDrawable.RADIAL_GRADIENT);
        glowBg.setColors(new int[] { 0x66FA233B, 0x22FB5C74, 0x00000000 });
        glowBg.setGradientRadius(260 * dp);
        View glow = new View(this);
        glow.setBackground(glowBg);
        f.addView(glow, new FrameLayout.LayoutParams((int) (520 * dp), (int) (520 * dp), Gravity.CENTER));

        android.widget.LinearLayout col = new android.widget.LinearLayout(this);
        col.setOrientation(android.widget.LinearLayout.VERTICAL);
        col.setGravity(Gravity.CENTER_HORIZONTAL);
        f.addView(col, new FrameLayout.LayoutParams(-2, -2, Gravity.CENTER));
        f.setClipChildren(false);                             // the breathing tile may grow past its box
        col.setClipChildren(false);
        col.setClipToPadding(false);

        ImageView tile = new ImageView(this);
        tile.setImageDrawable(new android.graphics.drawable.LayerDrawable(new android.graphics.drawable.Drawable[] {
                getDrawable(res("ic_launcher_bg", "drawable")), getDrawable(res("ic_launcher_fg", "drawable")) }));
        tile.setScaleType(ImageView.ScaleType.FIT_XY);
        tile.setOutlineProvider(new ViewOutlineProvider() {
            @Override
            public void getOutline(View v, Outline o) {
                o.setRoundRect(0, 0, v.getWidth(), v.getHeight(), 30 * dp);
            }
        });
        tile.setClipToOutline(true);
        col.addView(tile, new android.widget.LinearLayout.LayoutParams((int) (128 * dp), (int) (128 * dp)));

        // A wordmark if the build has one (res/drawable/wordmark.xml), else the app's name.
        int mark = res("wordmark", "drawable");
        android.widget.LinearLayout.LayoutParams tp;
        if (mark != 0) {
            ImageView title = new ImageView(this);
            title.setImageResource(mark);
            tp = new android.widget.LinearLayout.LayoutParams((int) (150 * dp), (int) (36 * dp));
            tp.topMargin = (int) (24 * dp);
            col.addView(title, tp);
        } else {
            TextView title = new TextView(this);
            title.setText(getApplicationInfo().loadLabel(getPackageManager()));
            title.setTextColor(Color.WHITE);
            title.setTextSize(28);
            title.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            tp = new android.widget.LinearLayout.LayoutParams(-2, -2);
            tp.topMargin = (int) (20 * dp);
            col.addView(title, tp);
        }

        android.widget.LinearLayout dots = new android.widget.LinearLayout(this);
        android.widget.LinearLayout.LayoutParams dp0 = new android.widget.LinearLayout.LayoutParams(-2, -2);
        dp0.topMargin = (int) (28 * dp);
        col.addView(dots, dp0);
        for (int i = 0; i < 3; i++) {
            android.graphics.drawable.GradientDrawable c = new android.graphics.drawable.GradientDrawable();
            c.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            c.setColor(i == 1 ? 0xFFFB5C74 : 0xFFFA233B);
            View d = new View(this);
            d.setBackground(c);
            d.setAlpha(0.25f);
            android.widget.LinearLayout.LayoutParams lp = new android.widget.LinearLayout.LayoutParams((int) (9 * dp), (int) (9 * dp));
            lp.leftMargin = lp.rightMargin = (int) (6 * dp);
            dots.addView(d, lp);
            loop(android.animation.ObjectAnimator.ofFloat(d, View.ALPHA, 0.25f, 1f), 520, i * 170L);
        }
        splashStatus = new TextView(this);
        splashStatus.setTextColor(0xFF8A8A8E);
        splashStatus.setTextSize(14);
        splashStatus.setGravity(Gravity.CENTER);
        splashStatus.setAlpha(0f);
        android.widget.LinearLayout.LayoutParams sp = new android.widget.LinearLayout.LayoutParams((int) (420 * dp), -2);
        sp.topMargin = (int) (18 * dp);
        col.addView(splashStatus, sp);

        // Entrance, then a slow breath of the glow and the tile.
        col.setAlpha(0f);
        col.setScaleX(0.9f);
        col.setScaleY(0.9f);
        col.animate().alpha(1f).scaleX(1f).scaleY(1f).setDuration(550)
                .setInterpolator(new android.view.animation.DecelerateInterpolator()).start();
        loop(android.animation.ObjectAnimator.ofPropertyValuesHolder(glow,
                android.animation.PropertyValuesHolder.ofFloat(View.ALPHA, 0.55f, 1f),
                android.animation.PropertyValuesHolder.ofFloat(View.SCALE_X, 0.92f, 1.08f),
                android.animation.PropertyValuesHolder.ofFloat(View.SCALE_Y, 0.92f, 1.08f)), 1600, 0);
        loop(android.animation.ObjectAnimator.ofPropertyValuesHolder(tile,
                android.animation.PropertyValuesHolder.ofFloat(View.SCALE_X, 1f, 1.04f),
                android.animation.PropertyValuesHolder.ofFloat(View.SCALE_Y, 1f, 1.04f)), 1600, 0);
        return f;
    }

    private void loop(android.animation.ObjectAnimator a, long ms, long delay) {
        a.setDuration(ms);
        a.setStartDelay(delay);
        a.setRepeatCount(android.animation.ValueAnimator.INFINITE);
        a.setRepeatMode(android.animation.ValueAnimator.REVERSE);
        a.setInterpolator(new android.view.animation.AccelerateDecelerateInterpolator());
        a.start();
        splashAnims.add(a);
    }

    private int R_string(String name) {
        return res(name, "string");
    }

    // The splash speaks the interface's language: the one chosen in Settings if any, else the system's.
    private String str(String name, Object... args) {
        return localized().getString(R_string(name), args);
    }

    private android.content.res.Resources localized() {
        String l = getSharedPreferences("amtv", MODE_PRIVATE).getString("lang", "");
        if (l.isEmpty()) return getResources();
        android.content.res.Configuration c = new android.content.res.Configuration(getResources().getConfiguration());
        c.setLocale(new java.util.Locale(l));
        return createConfigurationContext(c).getResources();
    }

    // Resources keep the source package's name even in a renamed build (make dev → ….amtv.dev).
    private int res(String name, String type) {
        int id = getResources().getIdentifier(name, type, getPackageName());
        return id != 0 ? id : getResources().getIdentifier(name, type, MainActivity.class.getPackage().getName());
    }

    /** The splash with what is going on underneath; also comes back for "play this" until it plays. */
    private void showSplash(String status) {
        splashGen++;
        pages.removeCallbacks(splashTimeout);
        pages.postDelayed(splashTimeout, 30000);              // never stuck behind it
        if (splash != null) { setStatus(status); return; }
        splash = makeSplash();
        root.addView(splash, FILL);
        setStatus(status);
    }

    // Splash lines queue up: each stays at least a second and cross-fades into the next. At most
    // three wait their turn, so the text never lags far behind what is actually happening.
    private final java.util.ArrayDeque<String> statusQueue = new java.util.ArrayDeque<>();
    private long statusSince;
    private boolean statusFading;
    private final Runnable statusPump = this::pumpStatus;

    private void setStatus(String text) {
        if (splashStatus == null || text == null) return;
        String last = statusQueue.isEmpty() ? splashStatus.getText().toString() : statusQueue.peekLast();
        if (text.equals(last)) return;
        while (statusQueue.size() >= 3) statusQueue.pollFirst();   // a burst: the oldest waiting line goes
        statusQueue.add(text);
        pumpStatus();
    }

    private void pumpStatus() {
        TextView t = splashStatus;
        if (t == null || statusFading || statusQueue.isEmpty()) return;
        long wait = statusSince + 1000 - android.os.SystemClock.uptimeMillis();
        if (t.getText().length() > 0 && wait > 0) {
            pages.removeCallbacks(statusPump);
            pages.postDelayed(statusPump, wait);
            return;
        }
        String next = statusQueue.poll();
        statusFading = true;
        t.animate().cancel();
        t.animate().alpha(0f).setDuration(t.getText().length() > 0 ? 180 : 0).withEndAction(() -> {
            t.setText(next);
            statusSince = android.os.SystemClock.uptimeMillis();
            t.animate().alpha(1f).setDuration(280).withEndAction(() -> { statusFading = false; pumpStatus(); });
        });
    }

    private void hideSplash() {
        if (splash == null) return;
        // Let the line on screen finish its second (the rest of the queue is skipped), so the last
        // words don't blink away together with the splash.
        long wait = splashStatus != null && splashStatus.getText().length() > 0
                ? statusSince + 1000 - android.os.SystemClock.uptimeMillis() : 0;
        if (statusFading) wait = Math.max(wait, 300);
        if (wait > 0) {
            statusQueue.clear();
            pages.removeCallbacks(splashTimeout);
            pages.postDelayed(this::hideSplash, wait);
            return;
        }
        View v = splash;
        splash = null;
        splashStatus = null;
        statusQueue.clear();
        statusFading = false;
        pages.removeCallbacks(statusPump);
        pages.removeCallbacks(splashTimeout);
        if (!tv) { cursor.setVisibility(View.VISIBLE); cursor.show(); }   // no TV interface: the site needs the pointer
        v.animate().alpha(0).setDuration(300).withEndAction(() -> {
            for (android.animation.Animator a : splashAnims) a.cancel();
            splashAnims.clear();
            ((ViewGroup) v.getParent()).removeView(v);
        });
        Log.i(TAG, "splash off");
    }

    private String versionName() {
        try {
            return getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
        } catch (android.content.pm.PackageManager.NameNotFoundException e) {
            return "?";
        }
    }

    /** A script from res/raw, or "" when a build leaves it out. */
    private String raw(String name) {
        int id = res(name, "raw");
        if (id == 0) return "";
        try (InputStream in = getResources().openRawResource(id)) {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            for (int n; (n = in.read(buf)) > 0; ) out.write(buf, 0, n);
            return out.toString("UTF-8");
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    private WebView top() {
        return popups.isEmpty() ? web : popups.get(popups.size() - 1);
    }

    // Without a storefront in the path Apple's site picks one from the browser's language (en-US here,
    // whatever the account), and MusicKit then refuses to play an account from another country
    // (CONTENT_EQUIVALENT). The page reports the account's storefront once signed in; it is kept here.
    private String home() {
        String sf = getSharedPreferences("amtv", MODE_PRIVATE).getString("storefront", "");
        return STOREFRONT.matcher(sf).matches() ? "https://music.apple.com/" + sf + "/search" : HOME;
    }

    // Any accessibility service that may read windows (a button remapper, here Button Mapper) makes
    // Chromium mirror the whole page as an accessibility tree and update it as the page changes:
    // about a tenth of the page's work while browsing. Only a screen reader uses that tree, so only
    // with one on does the page get asked for it (Chromium builds the tree on that first request).
    private void checkScreenReader() {
        AccessibilityManager am = (AccessibilityManager) getSystemService(ACCESSIBILITY_SERVICE);
        screenReader = am.isTouchExplorationEnabled() || !am.getEnabledAccessibilityServiceList(
                AccessibilityServiceInfo.FEEDBACK_SPOKEN | AccessibilityServiceInfo.FEEDBACK_BRAILLE).isEmpty();
    }

    private WebView newPage() {
        WebView v = new WebView(this) {
            @Override
            public AccessibilityNodeProvider getAccessibilityNodeProvider() {
                return screenReader ? super.getAccessibilityNodeProvider() : null;
            }
        };
        WebSettings s = v.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        // Apple's sign-in opens a popup and reports back to its opener
        s.setSupportMultipleWindows(true);
        s.setJavaScriptCanOpenWindowsAutomatically(true);
        s.setUserAgentString(desktop(s.getUserAgentString()));
        CookieManager.getInstance().setAcceptThirdPartyCookies(v, true);
        v.setBackgroundColor(Color.BLACK);
        v.setWebViewClient(client);
        v.setWebChromeClient(chrome);
        return v;
    }

    /** The desktop layout (and no "open in the app" detours): Chrome on Linux, same engine version. */
    private static String desktop(String ua) {
        Matcher m = Pattern.compile("Chrome/(\\d+)").matcher(ua);
        String major = m.find() ? m.group(1) : "140";
        return "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/"
                + major + ".0.0.0 Safari/537.36";
    }

    private static boolean apple(Uri u) {
        String h = u == null ? null : u.getHost();
        return h != null && (h.equals("apple.com") || h.endsWith(".apple.com"));
    }

    // What the hidden site would fetch for itself and we never show: its animated artwork (video),
    // its own artwork (webp; ours is always jpg) and Apple's analytics. Answered empty, never sent.
    private static boolean useless(Uri u) {
        String host = u.getHost(), path = u.getPath();
        if (host == null || path == null) return false;
        if (host.equals("mvod.itunes.apple.com") && path.startsWith("/itunes-assets/")) return true;
        if (host.endsWith("mzstatic.com") && path.endsWith(".webp")) return true;
        return host.equals("xp.apple.com");
    }

    private WebResourceResponse empty() {
        WebResourceResponse r = new WebResourceResponse("text/plain", "utf-8", new java.io.ByteArrayInputStream(new byte[0]));
        r.setStatusCodeAndReasonPhrase(204, "No Content");
        return r;
    }

    /** Our own files at https://music.apple.com/amtv/… (the SF Pro font), straight from the APK. */
    private WebResourceResponse asset(String path) {
        try {
            String name = path.substring("/amtv/".length());
            if (!name.matches("[A-Za-z0-9._-]+")) return null;
            String type = name.endsWith(".woff2") ? "font/woff2" : "application/octet-stream";
            WebResourceResponse r = new WebResourceResponse(type, null, getAssets().open("fonts/" + name));
            java.util.Map<String, String> h = new java.util.HashMap<>();
            h.put("Cache-Control", "max-age=31536000");
            h.put("Access-Control-Allow-Origin", "*");
            r.setResponseHeaders(h);
            return r;
        } catch (IOException e) {
            return null;
        }
    }

    private final WebViewClient client = new WebViewClient() {
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
            Uri u = r.getUrl();
            if ("music.apple.com".equals(u.getHost()) && u.getPath() != null && u.getPath().startsWith("/amtv/")) return asset(u.getPath());
            if (useless(u)) return empty();
            return null;
        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
            if (r.isForMainFrame()) {
                Log.i(TAG, "navigate " + r.getUrl() + " redirect=" + r.isRedirect() + " gesture=" + r.hasGesture());
                if (!pageReady) setStatus(str("status_opening"));
            }
            String scheme = r.getUrl().getScheme();
            if ("https".equals(scheme) || "http".equals(scheme)) return false;
            Log.i(TAG, "not opening " + r.getUrl());            // itms:, music:, intent: — nothing here handles them
            return true;
        }

        @Override
        public void onPageFinished(WebView v, String url) {
            if (v != web) {
                // Apple's sign-in popup: arrows and OK instead of the pointer.
                if (signinPage(url) && !signinJs.isEmpty()) {
                    v.evaluateJavascript(signinJs, null);
                    cursor.setVisibility(View.INVISIBLE);
                }
                return;
            }
            if (!apple(Uri.parse(url))) return;
            Log.i(TAG, "page finished " + url);
            if (!pageReady) setStatus(str("status_interface"));
            v.evaluateJavascript(pageJs, null);
            pageReady = true;
            flushPlay();
        }

        @Override
        public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
            if (!r.isForMainFrame()) return;
            Log.w(TAG, "load failed: " + e.getDescription() + " " + r.getUrl());
            String url = r.getUrl().toString();
            String html = "<html><body style='background:#000;color:#ddd;font:22px sans-serif;"
                    + "display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;margin:0'"
                    + " onclick=\"location.replace(" + TextUtils.htmlEncode(js(url)) + ")\">"
                    + "<p>" + TextUtils.htmlEncode(str("error_open", r.getUrl().getHost())) + "</p>"
                    + "<p style='color:#888;font-size:16px'>" + TextUtils.htmlEncode(String.valueOf(e.getDescription())) + "</p>"
                    + "<p>" + TextUtils.htmlEncode(str("error_retry")) + "</p></body></html>";
            v.loadDataWithBaseURL(null, html, "text/html", "utf-8", url);
        }

        @Override
        public boolean onRenderProcessGone(WebView v, RenderProcessGoneDetail d) {
            // The 2 GB box may kill the renderer under memory pressure: start over instead of crashing.
            Log.w(TAG, "renderer gone, crashed=" + d.didCrash());
            if (v == web) {
                pageReady = false;
                for (WebView p : popups) { pages.removeView(p); p.destroy(); }
                popups.clear();
                pages.removeView(web);
                web.destroy();
                web = newPage();
                pages.addView(web, 0, FILL);
                web.loadUrl(home());
            } else {
                close(v);
            }
            return true;
        }
    };

    private final WebChromeClient chrome = new WebChromeClient() {
        @Override
        public void onPermissionRequest(PermissionRequest r) {
            // Widevine for the music itself; nothing else, and only for Apple.
            for (String res : r.getResources()) {
                if (PermissionRequest.RESOURCE_PROTECTED_MEDIA_ID.equals(res) && apple(r.getOrigin())) {
                    r.grant(new String[] { res });
                    return;
                }
            }
            Log.i(TAG, "denied " + TextUtils.join(",", r.getResources()) + " for " + r.getOrigin());
            r.deny();
        }

        @Override
        public boolean onCreateWindow(WebView v, boolean dialog, boolean gesture, Message result) {
            WebView p = newPage();
            popups.add(p);
            pages.addView(p, FILL);
            ((WebView.WebViewTransport) result.obj).setWebView(p);
            result.sendToTarget();
            Log.i(TAG, "popup opened");
            return true;
        }

        @Override
        public void onCloseWindow(WebView w) {
            close(w);
        }
    };

    /** What the injected TV interface may ask of the app. Nothing here touches data or the network. */
    private final class Bridge {
        @JavascriptInterface
        public void mode(String m) {
            runOnUiThread(() -> setTv("tv".equals(m)));
        }

        /** The page focused a text field from a remote key (not a user gesture), so Chromium won't. */
        @JavascriptInterface
        public void keyboard() {
            runOnUiThread(() -> {
                web.requestFocus();
                ((InputMethodManager) getSystemService(INPUT_METHOD_SERVICE)).showSoftInput(web, 0);
            });
        }

        /**
         * Lift the splash once the WebView will draw the page as it is now (our interface, not the site).
         * A page being replaced (a reopen in another storefront, a reload) can still say ready on its
         * way out: that must not lift the splash put up for its successor.
         */
        @JavascriptInterface
        public void ready() {
            runOnUiThread(() -> {
                if (!pageReady) return;
                int gen = splashGen;
                web.postVisualStateCallback(0, new WebView.VisualStateCallback() {
                    @Override
                    public void onComplete(long id) {
                        if (gen == splashGen) hideSplash();
                    }
                });
            });
        }

        /** A line under the splash dots: what the interface is doing right now. */
        @JavascriptInterface
        public void status(String text) {
            if (text == null) return;
            String t = text.length() > 80 ? text.substring(0, 80) + "…" : text;
            runOnUiThread(() -> setStatus(t));
        }

        @JavascriptInterface
        public void played() {
            runOnUiThread(() -> pendingPlay = null);
        }

        /** Music is playing: keep the screen on so the TV's screensaver doesn't cover the player. */
        @JavascriptInterface
        public void playing(boolean on) {
            runOnUiThread(() -> {
                if (on) getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                else getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                Log.i(TAG, on ? "keep screen on" : "screen may sleep");
            });
        }

        /** The interface language picked in Settings ("" = follow the system), for the splash lines. */
        @JavascriptInterface
        public void lang(String l) {
            if (l != null && l.matches("|en|ru|fr")) getSharedPreferences("amtv", MODE_PRIVATE).edit().putString("lang", l).apply();
        }

        /**
         * The signed-in account's storefront and the one the site opened with. Remembered for the next
         * start; when they differ, the site reopens in the account's storefront (once per storefront).
         */
        @JavascriptInterface
        public void storefront(String account, String page) {
            if (account == null || !STOREFRONT.matcher(account).matches()) return;
            getSharedPreferences("amtv", MODE_PRIVATE).edit().putString("storefront", account).apply();
            if (account.equals(page)) return;
            runOnUiThread(() -> {
                if (account.equals(storefrontReload)) return;     // reopened there already: don't loop
                storefrontReload = account;
                Log.i(TAG, "storefront " + page + " -> " + account + ": reopening the site");
                showSplash(str("status_region"));
                pageReady = false;
                web.loadUrl(home());
            });
        }

        /** Start the page over behind the splash (e.g. after switching the interface language). */
        @JavascriptInterface
        public void reload() {
            runOnUiThread(() -> {
                showSplash(str("status_interface"));
                pageReady = false;
                web.reload();
            });
        }

        @JavascriptInterface
        public void exit() {
            runOnUiThread(() -> moveTaskToBack(true));
        }
    }

    private void setTv(boolean on) {
        tv = on;
        cursor.setVisibility(on ? View.INVISIBLE : View.VISIBLE);
        if (!on) cursor.show();
        Log.i(TAG, on ? "tv mode" : "site mode");
    }

    private void tvKey(String name) {
        web.evaluateJavascript("window.__tv&&__tv.key('" + name + "')", null);
    }

    /** Remote → the TV interface: arrows on press (and auto-repeat), OK on release, a held OK is "hold". */
    private boolean tvDispatch(KeyEvent e) {
        int k = e.getKeyCode();
        boolean down = e.getAction() == KeyEvent.ACTION_DOWN;
        String dir = k == KeyEvent.KEYCODE_DPAD_UP ? "up" : k == KeyEvent.KEYCODE_DPAD_DOWN ? "down"
                : k == KeyEvent.KEYCODE_DPAD_LEFT ? "left" : k == KeyEvent.KEYCODE_DPAD_RIGHT ? "right" : null;
        if (dir != null) {
            if (down) tvKey(dir);
            return true;
        }
        if (k == KeyEvent.KEYCODE_DPAD_CENTER || k == KeyEvent.KEYCODE_ENTER
                || k == KeyEvent.KEYCODE_NUMPAD_ENTER || k == KeyEvent.KEYCODE_BUTTON_A) {
            if (down && e.getRepeatCount() == 0) { okDown = true; okHeld = false; }
            else if (down && e.getRepeatCount() == 1 && okDown) { okHeld = true; tvKey("hold"); }
            else if (!down && okDown) { okDown = false; if (!okHeld) tvKey("ok"); }
            return true;
        }
        if (k == KeyEvent.KEYCODE_MENU) {
            if (down && e.getRepeatCount() == 0) tvKey("hold");
            return true;
        }
        return false;
    }

    private boolean signinOnTop() {
        if (popups.isEmpty() || signinJs.isEmpty()) return false;
        return signinPage(top().getUrl());
    }

    // The Apple ID pages (address, password, codes), then "You are signed in. Continue" for Apple Music.
    private static boolean signinPage(String url) {
        String h = url == null ? null : Uri.parse(url).getHost();
        return "idmsa.apple.com".equals(h) || "authorize.music.apple.com".equals(h);
    }

    /** Arrows move the sign-in page's own focus ring; OK types into a field (keyboard) or presses. */
    private boolean signinDispatch(KeyEvent e) {
        int k = e.getKeyCode();
        boolean down = e.getAction() == KeyEvent.ACTION_DOWN;
        WebView p = top();
        String dir = k == KeyEvent.KEYCODE_DPAD_UP ? "up" : k == KeyEvent.KEYCODE_DPAD_DOWN ? "down"
                : k == KeyEvent.KEYCODE_DPAD_LEFT ? "left" : k == KeyEvent.KEYCODE_DPAD_RIGHT ? "right" : null;
        if (dir != null) {
            if (down) p.evaluateJavascript("window.__amtvSignin&&__amtvSignin.key('" + dir + "')", null);
            return true;
        }
        if (k == KeyEvent.KEYCODE_DPAD_CENTER || k == KeyEvent.KEYCODE_ENTER || k == KeyEvent.KEYCODE_NUMPAD_ENTER) {
            if (down && e.getRepeatCount() == 0) siOkDown = true;
            else if (!down && siOkDown) {
                siOkDown = false;
                p.evaluateJavascript("window.__amtvSignin?__amtvSignin.key('ok'):''", r -> {
                    java.util.regex.Matcher m = java.util.regex.Pattern.compile("tap:(\\d+),(\\d+)").matcher(r == null ? "" : r);
                    if (m.find()) tapAt(p, Float.parseFloat(m.group(1)), Float.parseFloat(m.group(2)));
                });
            }
            return true;
        }
        return false;
    }

    /** A finger tap at CSS-pixel coordinates of a page: to the browser, the person's own tap. */
    private void tapAt(WebView v, float cssX, float cssY) {
        float d = getResources().getDisplayMetrics().density;
        float x = cssX * d, y = cssY * d;
        long t = android.os.SystemClock.uptimeMillis();
        v.requestFocus();
        android.view.MotionEvent down = android.view.MotionEvent.obtain(t, t, android.view.MotionEvent.ACTION_DOWN, x, y, 0);
        down.setSource(android.view.InputDevice.SOURCE_TOUCHSCREEN);
        v.dispatchTouchEvent(down);
        down.recycle();
        v.postDelayed(() -> {
            android.view.MotionEvent up = android.view.MotionEvent.obtain(t, android.os.SystemClock.uptimeMillis(),
                    android.view.MotionEvent.ACTION_UP, x, y, 0);
            up.setSource(android.view.InputDevice.SOURCE_TOUCHSCREEN);
            v.dispatchTouchEvent(up);
            up.recycle();
        }, 40);
    }

    private void close(WebView p) {
        if (!popups.remove(p)) return;
        pages.removeView(p);
        p.destroy();
        if (!tv && popups.isEmpty()) cursor.setVisibility(View.VISIBLE);
        Log.i(TAG, "popup closed");
        if (popups.isEmpty()) keepSession();
    }

    // Apple's sign-in can leave the new session (media-user-token and its companions) only on
    // authorize.music.apple.com. The site then sees no token, Apple's sign-in service answers 403 and
    // MusicKit signs out a second later (issue #2). So when the sign-in host has a token and the site
    // has none at all, those cookies are copied to apple.com and the site reopens: it starts signed in,
    // and Apple's service then sets them on music.apple.com itself. A site that sees a token is left alone.
    private static final String[] SESSION = { "media-user-token", "itre", "itspod", "itua", "pldfltcid", "pltvcid" };
    private static final String SIGNIN_HOST = "https://authorize.music.apple.com/", SITE = "https://music.apple.com/";

    private void keepSession() {
        CookieManager cm = CookieManager.getInstance();
        String from = cm.getCookie(SIGNIN_HOST), site = cm.getCookie(SITE);
        if (cookie(from, SESSION[0]) == null || cookie(site, SESSION[0]) != null) return;
        ArrayList<String> copied = new ArrayList<>();
        for (String name : SESSION) {
            String v = cookie(from, name);
            if (v == null || cookie(site, name) != null) continue;
            cm.setCookie(SITE, name + "=" + v + "; Domain=.apple.com; Path=/; Secure; Max-Age=15552000");
            copied.add(name);
        }
        cm.flush();
        Log.i(TAG, "session cookies copied to apple.com " + copied + ": reopening the site");
        showSplash(str("status_interface"));
        pageReady = false;
        // A line in the page's diagnostics log (names only), then the site again.
        web.evaluateJavascript("window.__amtv&&__amtv.diag({ev:'session-cookies-copied',names:"
                + js(TextUtils.join(",", copied)) + "})", r -> web.loadUrl(home()));
    }

    /** The value of cookie `name` in a Cookie header (CookieManager.getCookie), or null. */
    private static String cookie(String header, String name) {
        if (header == null) return null;
        for (String part : header.split(";")) {
            int eq = part.indexOf('=');
            if (eq > 0 && part.substring(0, eq).trim().equals(name)) {
                String v = part.substring(eq + 1).trim();
                return v.isEmpty() ? null : v;
            }
        }
        return null;
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent e) {
        int k = e.getKeyCode();
        if (splash != null && k != KeyEvent.KEYCODE_BACK) return true;   // nothing to press yet
        if (tv && tvDispatch(e)) return true;
        if (signinOnTop() && signinDispatch(e)) return true;
        if (!tv && Cursor.handles(k)) return cursor.onKey(e);
        if (k == KeyEvent.KEYCODE_BACK) {
            if (e.getAction() == KeyEvent.ACTION_UP && !e.isCanceled()) back();
            return true;
        }
        String js = media(k);
        if (js != null) {
            if (e.getAction() == KeyEvent.ACTION_DOWN && e.getRepeatCount() == 0) {
                web.evaluateJavascript("(function(){try{var m=MusicKit.getInstance();" + js
                        + "}catch(e){console.log('amtv media: '+e)}})()", null);
            }
            return true;
        }
        return super.dispatchKeyEvent(e);
    }

    private static String media(int k) {
        switch (k) {
            case KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE: case KeyEvent.KEYCODE_HEADSETHOOK:
                return "m.isPlaying?m.pause():m.play()";
            case KeyEvent.KEYCODE_MEDIA_PLAY: return "m.play()";
            case KeyEvent.KEYCODE_MEDIA_PAUSE: case KeyEvent.KEYCODE_MEDIA_STOP: return "m.pause()";
            case KeyEvent.KEYCODE_MEDIA_NEXT: return "m.skipToNextItem()";
            case KeyEvent.KEYCODE_MEDIA_PREVIOUS: return "m.skipToPreviousItem()";
            case KeyEvent.KEYCODE_MEDIA_FAST_FORWARD: return "m.seekToTime(m.currentPlaybackTime+15)";
            case KeyEvent.KEYCODE_MEDIA_REWIND: return "m.seekToTime(Math.max(0,m.currentPlaybackTime-15))";
        }
        return null;
    }

    private void back() {
        if (tv) {
            // The interface walks its own screens back; at its root it says false and we go home.
            web.evaluateJavascript("window.__tv?__tv.key('back'):false", r -> {
                if (!"true".equals(r)) moveTaskToBack(true);
            });
            return;
        }
        cursor.show();
        if (!popups.isEmpty()) {
            WebView p = top();
            if (p.canGoBack()) p.goBack();
            else close(p);
        } else {
            // Out of the site and back to the TV interface; without it, home like a music app.
            web.evaluateJavascript("window.__tv?(__tv.show(),true):false", r -> {
                if ("true".equals(r)) return;
                if (web.canGoBack()) web.goBack();
                else moveTaskToBack(true);                        // music keeps playing
            });
        }
    }

    // No web.onPause()/pauseTimers(): the music has to keep going behind the launcher or screensaver.
    @Override
    protected void onPause() {
        super.onPause();
        CookieManager.getInstance().flush();
    }

    @Override
    protected void onDestroy() {
        unregisterReceiver(dreams);
        AccessibilityManager am = (AccessibilityManager) getSystemService(ACCESSIBILITY_SERVICE);
        am.removeAccessibilityStateChangeListener(a11yChanged);
        am.removeTouchExplorationStateChangeListener(touchChanged);
        if (cursor.isAttachedToWindow()) getWindowManager().removeViewImmediate(cursor);
        for (WebView p : popups) p.destroy();
        web.destroy();
        super.onDestroy();
    }

    private static String js(String s) {
        return "'" + s.replace("\\", "\\\\").replace("'", "\\'").replace("<", "\\x3c") + "'";
    }
}
