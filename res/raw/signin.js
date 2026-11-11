// Apple's sign-in pages (the idmsa.apple.com popup, then authorize.music.apple.com), made usable
// with a TV remote: bigger fields, a clear focus ring, and ↑/↓ moving between the page's own fields,
// buttons and links. OK on a field taps it (MainActivity, so the TV keyboard comes up); OK on a
// button presses it.
// Presentation only: it never reads, stores or sends anything typed — the person types the Apple ID,
// password and codes themselves and presses Sign In themselves.
(function () {
  if (window.__amtvSignin) return;
  const S = window.__amtvSignin = {};
  // The remote hint, in the language picked in Settings (MainActivity passes it in), else the system's.
  const HINTS = {
    en: '↑ ↓  choose   ·   OK  type or press   ·   Back  cancel',
    de: '↑ ↓  auswählen   ·   OK  eingeben oder drücken   ·   Zurück  abbrechen',
    es: '↑ ↓  elegir   ·   OK  escribir o presionar   ·   Atrás  cancelar',
    fr: '↑ ↓  choisir   ·   OK  écrire ou valider   ·   Retour  annuler',
    pt: '↑ ↓  escolher   ·   OK  digitar ou pressionar   ·   Voltar  cancelar',
    ru: '↑ ↓  выбрать   ·   OK  ввести или нажать   ·   Назад  отмена',
    hi: '↑ ↓  चुनें   ·   OK  टाइप करें या दबाएँ   ·   वापस जाएँ  रद्द करें',
    ja: '↑ ↓  選択   ·   OK  入力または決定   ·   戻る  キャンセル',
    zh: '↑ ↓  选择   ·   OK  输入或按下   ·   返回  取消',
  };
  const lang = (() => {
    const nl = String(window.__amtvLang || navigator.language || '').toLowerCase(), l = nl.split(/[-_]/)[0];
    if (l === 'zh' && /hant|-tw|-hk|-mo/.test(nl)) return 'en';                // Simplified only
    return HINTS[l] ? l : 'en';
  })();

  const CSS = `
    .amtv-focus { outline: 4px solid #fa233b !important; outline-offset: 4px !important; border-radius: 12px !important; }
    input:not([type=hidden]) { font-size: 22px !important; min-height: 56px !important; }
    button, a[href] { font-size: 18px !important; }
  `;

  function widget() {
    const f = document.getElementById('aid-auth-widget-iFrame');
    try { return f && f.contentDocument; } catch (e) { return null; }
  }

  function styled(d) {
    if (!d || !d.documentElement || d.getElementById('amtv-signin-css')) return;
    const st = d.createElement('style');
    st.id = 'amtv-signin-css';
    st.textContent = CSS;
    (d.head || d.documentElement).appendChild(st);
  }

  function hint() {
    if (!document.body || document.getElementById('amtv-signin-hint')) return;
    const b = document.createElement('div');
    b.id = 'amtv-signin-hint';
    b.textContent = HINTS[lang];
    b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;padding:14px 0;text-align:center;z-index:2147483647;'
      + 'font:17px -apple-system,Roboto,sans-serif;color:#444;background:rgba(245,245,247,.96);border-top:1px solid #ddd';
    document.body.appendChild(b);
  }

  const shown = (e) => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';

  // The page's own controls, in document order (the form lives in a same-origin iframe).
  function items() {
    const d = widget() || document;
    return [...d.querySelectorAll('input:not([type=hidden]):not([disabled]), button:not([disabled]), a[href], [role=button]:not([aria-disabled=true])')]
      .filter(shown);
  }

  let cur = null;
  function mark(el) {
    if (cur && cur !== el) cur.classList.remove('amtv-focus');
    cur = el;
    if (el) { el.classList.add('amtv-focus'); el.scrollIntoView({ block: 'nearest' }); }
  }

  // A field that has just appeared (the password after "Continue", the code boxes, …) takes the
  // focus ring, so the next step is one OK away. Nothing about its contents is looked at.
  const seen = new WeakSet();
  function keep() {
    styled(document);
    styled(widget());
    hint();
    const list = items();
    let fresh = null;
    for (const e of list) if (e.tagName === 'INPUT' && !seen.has(e)) { seen.add(e); if (!fresh) fresh = e; }
    if (fresh) mark(fresh);
    else if (list.length && (!cur || !cur.isConnected || list.indexOf(cur) < 0)) {
      // Start on a field; with nothing to type ("You are signed in." → Continue), on a button, not a link.
      mark(list.find((e) => e.tagName === 'INPUT')
        || list.find((e) => e.tagName === 'BUTTON' || e.getAttribute('role') === 'button') || list[0]);
    }
  }

  S.key = function (k) {
    keep();
    const list = items();
    if (!list.length || !cur) return 'none';
    const i = list.indexOf(cur);
    if (k === 'down' || k === 'right') mark(list[Math.min(list.length - 1, i + 1)]);
    else if (k === 'up' || k === 'left') mark(list[Math.max(0, i - 1)]);
    else if (k === 'ok') {
      if (cur.tagName === 'INPUT') {
        // Where the field is on screen: MainActivity taps it there, like a finger would, so the
        // browser treats it as the person's own tap and brings up the TV keyboard by itself.
        const r = cur.getBoundingClientRect(), f = document.getElementById('aid-auth-widget-iFrame');
        const o = f && cur.ownerDocument !== document ? f.getBoundingClientRect() : { left: 0, top: 0 };
        return 'tap:' + Math.round(o.left + r.left + Math.min(r.width / 2, 120)) + ',' + Math.round(o.top + r.top + r.height / 2);
      }
      cur.click();
      return 'click';
    }
    return 'moved';
  };

  setInterval(keep, 600);
  keep();
})();
