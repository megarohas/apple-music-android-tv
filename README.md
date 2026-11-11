<div align="center">

<img src="docs/icon.png" width="96" alt="AMTV icon">

# AMTV — Apple Music for Android TV & Google TV

**An unofficial Apple Music app for Android TV, Google TV, Xiaomi Mi Box, Chromecast with Google TV, NVIDIA Shield and other Android-based TV boxes — made for the remote.**

[![Download APK](https://img.shields.io/github/v/release/megarohas/apple-music-android-tv?label=Download%20APK&color=fa233b&style=for-the-badge)](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)
&nbsp;
[![License: MIT](https://img.shields.io/badge/license-MIT-333?style=for-the-badge)](LICENSE)

**English** · [Deutsch](README.de.md) · [Español](README.es.md) · [Français](README.fr.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

[Install in 5 minutes](#install) · [Remote controls](#using-it-with-the-remote) · [FAQ](#faq) · [How it works](#how-it-works)

<img src="docs/screenshots/now_controls.jpg" width="820" alt="AMTV Now Playing screen on a TV">

</div>

---

## What is this?

There is **no official Apple Music app for Android TV / Google TV**. Apple's Android phone app can be sideloaded, but it is built for touch screens and is painful with a remote. Casting from a phone works, but then your phone is the remote.

**AMTV** gives your TV a proper Apple Music app:

- you sign in **once** with your Apple ID, on Apple's own sign-in page;
- you browse **Home, Browse, Radio, Library and Search** with the arrows of your remote;
- you press OK and the music plays, with a calm full-screen **Now Playing** view.

It is free, open source and contains **no hacks**: under the hood it runs **Apple's official web player** ([music.apple.com](https://music.apple.com)) and only puts a TV-friendly interface on top of it. Playback, DRM and your account stay with Apple.

> You need an **Apple Music subscription**. AMTV is not affiliated with or endorsed by Apple.

## Screenshots

| | |
|:---:|:---:|
| <img src="docs/screenshots/browse.jpg" alt="Browse: Apple Music editorial shelves on a TV"> | <img src="docs/screenshots/radio.jpg" alt="Radio: Apple Music 1, Hits and Country live stations"> |
| **Browse** — Apple's editorial picks, new music, charts | **Radio** — Apple Music 1, Hits, Country and shows |
| <img src="docs/screenshots/now_calm.jpg" alt="Now Playing: cover, title and artist only"> | <img src="docs/screenshots/now_lyrics.jpg" alt="Now Playing with word-synced lyrics"> |
| **Now Playing** — calm view, controls appear on any key | **Lyrics** — word-by-word, off by default |
| <img src="docs/screenshots/album.jpg" alt="Album page with track list and Play/Shuffle buttons"> | <img src="docs/screenshots/artist.jpg" alt="Artist page with bio and top songs"> |
| **Album** — popular tracks marked, Play / Shuffle | **Artist** — bio, top songs, albums, similar artists |
| <img src="docs/screenshots/search.jpg" alt="Search results for artists and songs"> | <img src="docs/screenshots/menu.jpg" alt="Hold OK menu: Play Next, Play Last, Add to Library"> |
| **Search** — with the TV's on-screen keyboard | **Hold OK** — Play Next, Play Last, Add to Library, Station |
| <img src="docs/screenshots/settings.jpg" alt="Settings: website mode, language, sign out"> | <img src="docs/screenshots/splash.jpg" alt="Start screen showing what is loading"> |
| **Settings** — language, website mode, sign out | **Start screen** — says what it is doing |

## Features

- 🎛️ **Made for the remote** — arrows move between cards, OK plays or opens, Back goes back. Focus remembers where you were in every row.
- 🏠 **Home** — your personal recommendations: *Made for You* playlists, recently played, stations for you, new releases.
- 🧭 **Browse & Radio** — Apple's editorial shelves, charts, live radio (Apple Music 1, Hits, Country…) and radio shows.
- 📚 **Library** — recently added, playlists, albums, artists, songs.
- 🔍 **Search** — artists, songs, albums, playlists and stations, with search history.
- 💿 **Album, playlist and artist pages** — Play, Shuffle, Add to Library; popular tracks are marked like in Apple Music.
- 🎵 **Now Playing** — big cover, smooth track changes, background tinted by the artwork; controls hide by themselves, **←/→ skip tracks** while they are hidden, scrubbing with a smooth knob. Long titles scroll; the cover, title, artist and clock slowly float together, so nothing stays burned into the screen. The TV's screensaver stays away while music plays, and the bars on the Now Playing tab move while it does.
- ⭐ **Favorites** — the star in the player (same as ⭐ in Apple Music).
- 📝 **Lyrics** — word-by-word synced lyrics from Apple Music (switch them on with the lyrics button in the player).
- 🗣️ **Voice & automation hooks** — start a station or skip tracks from outside the app (see [Automation](#voice-assistants--automation)); works with the open-source voice remote [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice).
- 🌐 **Nine interface languages** — English, Deutsch, Español, Français, Português, Русский, हिन्दी, 日本語 and 简体中文. It follows the TV's language; Settings → Language lists them all, each under its own name.
- 🐢 **Fast on weak TV boxes** — tuned on a Xiaomi TV Box S (4×Cortex-A55, Mali-G31, 2 GB RAM): idle CPU ≈ 0 %, no endless animations, nothing downloaded in the background.
- 🖱️ **Website mode** — the full Apple Music website with an on-screen pointer, for anything the TV interface doesn't do yet.

## Install

### What you need

- An **Android TV / Google TV** device with **Android 10 or newer** (TV boxes, sticks, TVs with Android TV / Google TV).
- An **Apple Music subscription** and your **Apple ID**.
- 5 minutes.

### Option 1 — with the free “Downloader” app (easiest, no computer)

1. On the TV open **Google Play** and install **Downloader** (by AFTVnews).
2. Allow installing apps from it: **Settings → Apps → Security & restrictions → Unknown sources → Downloader → On**
   *(the path differs a little between TVs; search Settings for “Unknown sources”)*.
3. Open **Downloader**, type this address and press **Go**:
   ```
   https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk
   ```
4. When it finishes, press **Install**, then **Open**.

### Option 2 — send the file from your phone or computer

1. Download [`amtv.apk`](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk).
2. Send it to the TV with an app like **Send Files to TV**, **LocalSend**, or a USB stick.
3. Open it on the TV with a file manager and press **Install** (allow “Unknown sources” for that file manager when asked).

### Option 3 — ADB (for tinkerers)

```bash
adb connect <TV-IP>:5555
adb install amtv.apk
```

### First start

1. Open **AMTV** from the apps row (red tile with a music note).
2. Press **Sign In** — Apple's own sign-in page opens, adapted for the remote: **↑ / ↓** choose a field or button (red frame), **OK** on a field brings up the on-screen keyboard, **OK** on a button presses it. Type your Apple ID → Continue → password → Sign In. Two-factor codes arrive on your iPhone / Mac as usual.
   > Tip: the **Google TV** app on your phone works as a keyboard for the TV — you can paste your password from a password manager.
3. Done — AMTV switches to the TV interface. You stay signed in; next time it opens straight to Home.

> Your password is typed **only into Apple's page** (`idmsa.apple.com`). AMTV never sees or stores it.

## Using it with the remote

| Button | What it does |
|---|---|
| **← ↑ → ↓** | Move between cards, rows and the top bar. Tabs open as soon as you land on them. |
| **→ at the end of a row / ← at the start** | Jump to the next / previous tab (from Home, **←** goes straight to Now Playing). |
| **OK** | Play a song or station, open an album / playlist / artist. |
| **Hold OK** | Menu: Play, Shuffle, Play Next, Play Last, Add to Library, Create Station. |
| **Back** | Back to the previous page → Home → leaves the app (music pauses). |
| **Play/Pause, Next, Previous** (if your remote has them) | Control the music anywhere in the app. |

In **Now Playing**:

| Button | What it does |
|---|---|
| any key | Shows the controls (they hide after a few seconds) |
| **← / →** while controls are hidden | Previous / next track |
| **↓** to the progress bar, then **← / →** | Scrub 10 s per press (one smooth seek after you stop) |
| ⭐ | Add to / remove from Favorites |
| lyrics button | Lyrics on / off |

## Voice assistants & automation

AMTV accepts simple commands as Android intents, so voice remotes, Tasker-like tools or a script can drive it:

```bash
# start a station / playlist / album (opens the app if needed, shows the player when the music starts)
adb shell am start -n com.megarohas.amtv/.MainActivity --es play ra.978194965      # Apple Music 1
adb shell am start -n com.megarohas.amtv/.MainActivity --es play pl.<playlist-id>

# control the player
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd next        # next | prev | pause | play | toggle
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd favorite    # ⭐ add the current song
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd unfavorite  # remove it (does nothing if it isn't a favorite)
```

IDs are the ones in Apple Music links (`music.apple.com/…/playlist/…/pl.xxxx`, stations `ra.…`, albums are numbers). The voice remote [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) uses exactly this: *“Remote, play music”* wakes the TV box, opens AMTV and starts your station.

## FAQ

<details><summary><b>Is there an official Apple Music app for Android TV / Google TV?</b></summary>

No (as of 2026). Apple ships Apple Music for Android phones, and for some smart TVs (Samsung, LG), but not for Android TV / Google TV boxes. AMTV fills that gap using Apple's own web player.
</details>

<details><summary><b>Is it legal? Does it crack DRM?</b></summary>

AMTV does **not** circumvent DRM or extract tokens. Music plays through Apple's official web player with the TV's built-in Widevine, exactly as in a desktop browser on music.apple.com. You need your own paid subscription. AMTV is an independent, unofficial project.
</details>

<details><summary><b>Will it work on my TV box / Fire TV?</b></summary>

It is tested on a **Xiaomi TV Box S (2nd gen), Google TV, Android 14**. It should work on any Android TV / Google TV device with Android 10+ and Widevine (that's practically all certified devices: Chromecast with Google TV, NVIDIA Shield, Mi Box, Onn, TVs with Google TV). People have also reported it working on a Changhong TV (Android 11) and a Sony Bravia (Android TV 12). Fire TV is untested — reports are welcome.
</details>

<details><summary><b>Lossless, Dolby Atmos, music videos?</b></summary>

AMTV plays what Apple's web player plays: high-quality AAC. Lossless and Dolby Atmos are not available on the web. Music videos are not supported yet.
</details>

<details><summary><b>Why does the very first start take ~10 seconds?</b></summary>

The app loads Apple's web player and restores your sign-in; the start screen shows what it is doing. Starting a station takes a few seconds because Apple's player fetches the station's tracks, a playback license and the first audio before playing. Later navigation is cached and quick.
</details>

<details><summary><b>Does the music keep playing when I leave the app?</b></summary>

It pauses when you leave the app (Home button, another app), and keeps playing under the TV's screensaver.
</details>

<details><summary><b>The content is from another country</b></summary>

Apple Music shows the catalog of your Apple ID's country. Before you sign in, the website may guess a country from your IP address.
</details>

## Troubleshooting

| Problem | Try this |
|---|---|
| Stuck on the start screen | Check the internet connection; the start screen gives up after 30 s and shows the website. |
| “Sign-in needed” every time | Make sure the TV's date and time are correct; sign in again from Settings → Website mode. |
| No sound, or “Couldn't start playback” | Your device needs Widevine (all Google-certified TVs have it). Check that your subscription is active on music.apple.com. |
| The pointer appears instead of the TV interface | Press **Back** — it returns from website mode to the TV interface. |
| Something looks wrong after an update | Settings → **Refresh data**, or clear the app's storage in Android settings (you will need to sign in again). |

## How it works

```
┌──────────────── AMTV (Android app) ────────────────┐
│  WebView ── music.apple.com (Apple's web player)    │
│    │          ├── MusicKit JS: your signed-in session│
│    │          └── <audio> + Widevine: playback       │
│    └── TV interface (HTML/CSS/JS in a shadow DOM)    │
│           data  ← MusicKit API (amp-api)             │
│           play  → MusicKit setQueue / play           │
│  Remote keys ─► MainActivity ─► the TV interface     │
│  Intents (--es play / --es cmd) ─► the player        │
└─────────────────────────────────────────────────────┘
```

- **No DRM tricks, no token extraction.** The interface asks Apple's API through the page's own signed-in MusicKit session and starts playback with MusicKit, like the website does.
- **Apple's own page stays loaded but hidden** (`display: none`) — it owns the player. AMTV keeps it on a page without animated artwork and refuses the requests it would make only for itself (motion-artwork video, its own thumbnails, analytics): on a slow box this was the difference between a 20 s and a 4 s station start.
- **Built for weak GPUs** — no blur filters or endless animations; the Now Playing background is a 64×36 blurred canvas painted once per song and stretched; lyrics advance on timers aimed at the next word, not a per-frame loop; the floating, the scrolling caption and the progress bar share one 10-per-second tick and move through paused animations, so a step never makes the page re-layer; the bars on the Now Playing tab step a few times a second, only while music plays and the top bar is on screen, and rest after a minute without a key press; Apple's hidden page is kept from animating at all.
- **Exact play time** — MusicKit reports the time in whole seconds; the progress bar and the clock follow the player's exact time, so they never step back.
- **Remote navigation** — a small focus engine: rows of focusable items, row memory, shelves that slide with `transform`, edge-to-tab switching, and a mouse pointer for the website mode.

Code map:

| Path | What's inside |
|---|---|
| `src/com/megarohas/amtv/MainActivity.java` | WebView, splash, remote key routing, intents, request filter |
| `src/com/megarohas/amtv/Cursor.java` | the on-screen pointer for website mode |
| `res/raw/page.js` | small fixes injected into Apple's page |
| `res/raw/tv_i18n.js` | the interface's translations: one table per language, keyed by the Russian originals |
| `res/raw/tv_core.js` | the TV interface: focus engine, tabs, API helpers, playback |
| `res/raw/tv_screens.js` | Home, Browse, Radio, Library, Search, Settings, album / playlist / artist |
| `res/raw/tv_player.js` | Now Playing: background, lyrics, scrubbing, favorites |
| `res/raw/signin.js` | Apple's sign-in page adapted for the remote: focus ring, arrows, OK opens the keyboard (presentation only, it never reads what you type) |
| `res/values*/strings.xml` | the start screen's lines in each language |
| `res/raw/brand.js` | branding knobs (icons, font) — the one file a custom build swaps |
| `tools/cdp.mjs` | Chrome DevTools helper: inspect and hot-reload the interface on a real TV |

## Build from source

No Gradle — the Makefile calls the Android SDK tools directly; a build takes a few seconds.

Requirements: **Android SDK** (build-tools 36.0.0, platform `android-36`), **JDK 17 or newer**, `make`, `adb`.

```bash
git clone https://github.com/megarohas/apple-music-android-tv.git
cd apple-music-android-tv
make                                   # → build/amtv.apk (signed with your debug key)
make install TV=192.168.1.50:5555      # adb-connected TV box; or put `TV = …` into local.mk
make start

make dev-install && make dev-start    # a separate “AMTV Dev” app next to it (own sign-in and data) for testing
```

Paths can be overridden: `make SDK=/path/to/sdk BT=$SDK/build-tools/36.0.0`.

Develop on a real TV without reinstalling:

```bash
make devtools                                  # forwards the WebView's DevTools to localhost:9222
node tools/cdp.mjs run res/raw/tv_i18n.js res/raw/tv_core.js res/raw/tv_screens.js res/raw/tv_player.js
node tools/cdp.mjs eval '__tv.boot()'          # hot-reloaded interface
node tools/cdp.mjs shot screen.png             # or inspect in chrome://inspect
```

Custom branding (your own icons and font) goes into `res/raw/brand.js` plus `assets/fonts/` — see the comments in that file.

### Adding a language

1. `res/raw/tv_i18n.js` — copy the English table, translate the values and add the language to `LANGS` (its code and its own name).
2. `res/values-<code>/strings.xml` — the seven lines of the start screen.
3. `res/raw/signin.js` — the one-line remote hint on Apple's sign-in page.
4. Optionally `README.<code>.md`, linked from the language line at the top of every README.

Keep the strings about as long as the English ones: the top bar and the player have little room. Then `make`, and look at every tab on a TV.

## Credits

- [**JObersi10/apple-music-tv**](https://github.com/JObersi10/apple-music-tv) — a native Android TV Apple Music client whose research on Apple's web API (endpoints for Home, Browse, Radio, lyrics, favorites) and TV UX ideas helped a lot. No code was copied. That project decrypts streams itself; AMTV deliberately doesn't and lets Apple's player do the playback.
- [**Material Icons**](https://github.com/google/material-design-icons) (Apache License 2.0) — the base of AMTV's icon set. See [NOTICE](NOTICE).
- **Translations** — French by [NeoNathoon](https://github.com/NeoNathoon). The other languages have not been checked by native speakers yet: corrections are welcome as pull requests.
- **Apple MusicKit on the Web** — Apple's player and API that AMTV talks to.

## Legal

AMTV is an independent open-source project, **not affiliated with, authorized or endorsed by Apple Inc.** Apple, Apple Music and Apple ID are trademarks of Apple Inc., used here only to describe what the app works with. AMTV doesn't include Apple's fonts, icons or logos, doesn't modify or circumvent DRM and requires a valid Apple Music subscription. Album artwork in the screenshots belongs to its owners and is shown for illustration.

## License

[MIT](LICENSE) © 2026 megarohas
