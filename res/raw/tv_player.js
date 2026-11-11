// Now Playing: cover, transport, progress, word-synced lyrics over a background made from the cover.
// Built for a Mali-G31: the background is painted once per song (tiny blurred canvas, stretched),
// lyrics advance on timers aimed at the next word instead of a per-frame loop, the progress bar is
// one linear CSS transition. When nothing changes, nothing runs.
(function () {
  'use strict';
  const T = window.__tv;
  if (!T) return;
  const h = T.h;
  const LEAD_MS = 200;                                        // lyrics a touch early read as in sync
  const CHROME_MS = 7000;

  const LYRICS_PREF = 'amtv.lyrics';                          // off unless asked for

  T.css(`
.np { background: #000; }
.np .bg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 1.2s; }
.np .bg.on { opacity: 1; }
.np .veil { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,.25), rgba(0,0,0,.45) 45%, rgba(0,0,0,.7)); }
.np .page { position: absolute; inset: 0; padding: 0; transition: none; }
.np .left { position: absolute; left: 64px; top: 0; bottom: 0; width: 320px; display: flex; flex-direction: column; justify-content: center;
  align-items: center; transition: transform .6s ease; }
.np.idle .left { transform: translateY(var(--dy, 50px)) scale(1.04); }
.np.noanim .left, .np.noanim .chrome { transition: none !important; }
.np .tb .ic { font-size: 26px; }
.np .tb.big .ic { font-size: 34px; }
.np .tb.sm .ic { font-size: 19px; }
.np .tb.fav.on { color: #fa233b; }
.np.idle .focus { background: transparent !important; box-shadow: none !important; }
.np .cover { position: relative; width: 270px; height: 270px; border-radius: 16px; overflow: hidden; background: #1a1a2e; box-shadow: 0 10px 40px rgba(0,0,0,.5); }
.np .cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity .7s ease; }
.np .ti, .np .ar { transition: opacity .25s ease; }
.np .marq { text-overflow: clip; text-align: left; }
.np .marq > span { display: inline-block; will-change: transform; transition: opacity .35s; }
.np .swap { opacity: 0; }
.np .ti { margin-top: 6px; padding: 10px 14px 12px; font-size: 21px; font-weight: 700; text-align: center; max-width: 348px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-shadow: 0 2px 10px rgba(0,0,0,.6); }
.np .ar { margin-top: 3px; font-size: 15px; color: #ff5a6e; text-align: center; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 2px 8px; border-radius: 6px; }
.np .ar.focus { background: rgba(255,255,255,.12); }
.np .chrome { width: 100%; transition: opacity .25s; }
.np.idle .chrome { opacity: 0; transition: opacity 1.6s; }
.np .tr { display: flex; justify-content: center; align-items: center; gap: 14px; margin-top: 14px; }
.np .tb { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; transition: transform .15s, background-color .15s; }
.np .tb.big { width: 60px; height: 60px; }
.np .tb.sm { width: 40px; height: 40px; color: #8a8a8e; }
.np .tb.on { color: #fa233b; }
.np .tb.focus { background: rgba(255,255,255,.16); transform: scale(1.1); }
.np .pr { margin-top: 14px; padding: 6px 0; }
.np .bar { height: 4px; border-radius: 3px; background: rgba(255,255,255,.27); overflow: hidden; transition: height .15s; }
.np .pr.focus .bar { height: 7px; }
.np .fill { height: 100%; background: #fa233b; transform-origin: 0 50%; transform: scaleX(0); }
.np .tm { display: flex; justify-content: space-between; font-size: 11px; color: #aaa; margin-top: 5px; font-variant-numeric: tabular-nums; }
.np .live { background: #fa233b; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; padding: 3px 10px; border-radius: 10px; margin-bottom: 12px; }

.np.nolyr .left { left: calc(50% - 160px); }
.np.nolyr .cover { width: 300px; height: 300px; }
.np.nolyr .right { display: none; }
.np .right { position: absolute; left: 430px; right: 40px; top: 0; bottom: 0; overflow: hidden; }
.np .lyr { position: absolute; left: 0; right: 0; top: 0; transition: transform .45s ease-out; will-change: transform; }
.np .ln { font-size: 25px; font-weight: 700; line-height: 1.25; letter-spacing: -.3px; margin: 0 0 16px; color: #8e8e93;
  opacity: .28; transform: scale(.78); transform-origin: 0 50%; transition: opacity .25s, transform .3s, color .25s; }
.np .ln.past { color: #ccc; opacity: .18; }
.np .ln.act { opacity: 1; transform: none; color: #76767c; }
.np .ln.duet { text-align: right; transform-origin: 100% 50%; }
.np .ln.plain { opacity: .5; transform: scale(.85); color: #ddd; }
.np .ln .w { white-space: pre; }
.np .ln.act .w.sung { color: #fff; }
.np .ln.act .w.cur { color: transparent; -webkit-background-clip: text; background-clip: text;
  background-image: linear-gradient(90deg, #fff 45%, #76767c 55%); background-size: 220% 100%; background-position: 100% 0; }
.np .ln .bgv { display: block; font-size: 17px; font-weight: 600; color: #6e6e73; margin-top: 2px; }
.np .ln.act .bgv { color: #d0d0d4; }
.np .upn { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); }
.np .upn h3 { font-size: 13px; color: #aaa; font-weight: 600; margin: 0 0 10px 12px; letter-spacing: .5px; text-transform: uppercase; }
.np .upn .item { font-size: 14px; }
.np .empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #777; font-size: 18px; }
.np .clock { position: absolute; right: 28px; top: 16px; font-size: 15px; color: rgba(255,255,255,.8); }
.np .drift { display: flex; flex-direction: column; align-items: center; }
.np .float { will-change: transform; }
`);

  // ---------------------------------------------------------------- lyrics: Apple TTML → lines of words

  const ms = (v) => {
    if (!v) return NaN;
    const p = String(v).replace(/s$/, '').split(':').map(Number);
    return Math.round(1000 * p.reduce((acc, x) => acc * 60 + x, 0));
  };
  const isSpan = (n) => n.nodeType === 1 && /(^|:)span$/.test(n.nodeName);
  const isBg = (n) => /x-bg/.test(n.getAttribute('ttm:role') || n.getAttribute('role') || '');

  // Leaf timed spans, each knowing whether a word break follows. Syllables of one word are adjacent
  // spans with no whitespace between them ("fa","vo","rite"): merged back into words.
  function leaves(node, out) {
    const kids = [...node.childNodes];
    kids.forEach((c, i) => {
      if (!isSpan(c) || isBg(c)) return;
      if ([...c.childNodes].some((k) => isSpan(k) && !isBg(k))) return leaves(c, out);
      let ends = /\s$/.test(c.textContent);
      for (let j = i + 1; j < kids.length && !ends; j++) {
        if (isSpan(kids[j])) break;
        if (kids[j].nodeType === 3 && /\s/.test(kids[j].textContent)) ends = true;
      }
      out.push({ s: ms(c.getAttribute('begin')), e: ms(c.getAttribute('end')), t: c.textContent, ends });
    });
    return out;
  }
  function merge(entries) {
    const out = [];
    for (let i = 0; i < entries.length; i++) {
      const w = Object.assign({}, entries[i]);
      while (!w.ends && i + 1 < entries.length) { const n = entries[++i]; w.t += n.t; w.e = n.e; w.ends = n.ends; }
      w.t = w.t.trim();
      if (w.t) out.push(w);
    }
    return out.length === 1 && entries.length > 3 ? entries.map((e) => Object.assign({}, e, { t: e.t.trim() })) : out;
  }

  function parseTTML(xml) {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    const ps = [...doc.getElementsByTagName('p')];
    const lead = ps.length && ps[0].getAttribute('ttm:agent');
    return ps.map((p) => {
      const line = { s: ms(p.getAttribute('begin')), e: ms(p.getAttribute('end')), words: merge(leaves(p, [])), bg: null };
      if (isNaN(line.e)) line.e = line.s + 5000;
      const agent = p.getAttribute('ttm:agent');
      line.duet = !!(lead && agent && agent !== lead);
      const bg = [...p.getElementsByTagName('*')].find((n) => isSpan(n) && isBg(n));
      if (bg) {
        const bw = merge(leaves(bg, []));
        line.bg = { s: ms(bg.getAttribute('begin')) || (bw[0] && bw[0].s), e: ms(bg.getAttribute('end')) || (bw.length && bw[bw.length - 1].e),
          text: bw.length ? bw.map((w) => w.t).join(' ') : bg.textContent.trim() };
      }
      if (!line.words.length) line.text = p.textContent.replace(/\s+/g, ' ').trim();   // line-timed lyrics
      return line;
    }).filter((l) => l.words.length || l.text);
  }

  const lyricsCache = new Map();
  async function lyricsFor(id) {
    if (lyricsCache.has(id)) return lyricsCache.get(id);
    const p = (async () => {
      for (const kind of ['syllable-lyrics', 'lyrics']) {
        try {
          const r = await T.mk().api.music('/v1/catalog/' + T.sf() + '/songs/' + id + '/' + kind, {});
          const ttml = r.data && r.data.data && r.data.data[0] && r.data.data[0].attributes.ttml;
          if (ttml) { const lines = parseTTML(ttml); if (lines.length) return lines; }
        } catch (e) { /* 404 when a song has none */ }
      }
      return null;
    })();
    lyricsCache.set(id, p);
    if (lyricsCache.size > 30) lyricsCache.delete(lyricsCache.keys().next().value);
    return p;
  }

  // ---------------------------------------------------------------- the screen

  T.screens.now = function (s) {
    s.el.classList.add('full', 'np');
    s.ghostNav = true;
    const mk = T.mk();
    const bgA = h('canvas', { class: 'bg', width: 64, height: 36 }), bgB = h('canvas', { class: 'bg', width: 64, height: 36 });
    s.el.insertBefore(bgB, s.page);
    s.el.insertBefore(bgA, bgB);
    s.el.insertBefore(h('div', 'veil'), s.page);

    const cover = h('div', 'cover'), ti = h('div', 'ti'), live = h('div', 'live', 'LIVE');
    const ar = h('div', 'ar');                                 // just a caption for now: focus skips it
    const btn = (icon, cls, run) => h('div', { class: 'tb f ' + (cls || ''), onok: run }, T.icon(icon));
    const bShuffle = btn('shuffle', 'sm', () => { mk.shuffleMode = mk.shuffleMode ? 0 : 1; sync(); T.toast(mk.shuffleMode ? T.t('Перемешивание включено') : T.t('Перемешивание выключено')); });
    const bPrev = btn('prev', '', () => (mk.currentPlaybackTime > 8 ? mk.seekToTime(0) : mk.skipToPreviousItem()));
    const bPlay = btn('pause', 'big', () => (mk.playbackState === 2 ? mk.pause() : mk.play()));
    const bNext = btn('next', '', () => mk.skipToNextItem());
    // Favourite = Apple's own star: POST/DELETE /v1/me/favorites, state from the song's rating (1).
    let favId = '';
    const bFav = btn('favorite', 'sm fav', async () => {
      if (!favId) return;
      const on = !bFav.classList.contains('on');
      try {
        await T.setFavorite(favId, on);
        bFav.classList.toggle('on', on);
        T.toast(on ? T.t('Добавлено в избранное') : T.t('Убрано из избранного'));
      } catch (e) { T.toast(T.t('Не получилось: ') + T.plain(e && (e.errorCode || e.message))); }
    });
    T.onFavorite = (id, on) => { if (id === favId) bFav.classList.toggle('on', on !== false); };
    const bRepeat = btn('repeat', 'sm', () => { mk.repeatMode = (mk.repeatMode + 1) % 3; sync(); T.toast([T.t('Повтор выключен'), T.t('Повтор песни'), T.t('Повтор всего')][mk.repeatMode]); });
    let showLyr = false;
    try { showLyr = localStorage.getItem(LYRICS_PREF) === '1'; } catch (e) {}
    s.el.classList.toggle('nolyr', !showLyr);
    const bLyr = btn('lyrics', 'sm', () => {
      showLyr = !showLyr;
      try { localStorage.setItem(LYRICS_PREF, showLyr ? '1' : '0'); } catch (e) {}
      s.el.classList.toggle('nolyr', !showLyr);
      bLyr.classList.toggle('on', showLyr);
      loadLyrics();
    });
    bLyr.classList.toggle('on', showLyr);
    const fill = h('div', 'fill'), tNow = h('span', null, '0:00'), tDur = h('span', null, '0:00');
    const pr = h('div', { class: 'pr f row', onok: () => bPlay._onok() }, h('div', 'bar', fill), h('div', 'tm', tNow, tDur));
    const chrome = h('div', 'chrome', h('div', 'tr row', bFav, bShuffle, bPrev, bPlay, bNext, bRepeat, bLyr), pr);
    const drift = h('div', 'drift', live, cover, ti, ar);
    const left = h('div', 'left', drift, chrome);
    const lyr = h('div', 'lyr'), right = h('div', 'right', lyr);
    const empty = h('div', 'empty', T.t('Сейчас ничего не играет'));
    const clock = h('div', 'clock');
    s.page.append(left, right, empty, clock);

    // Seek with left/right on the bar.
    // Scrubbing: every press moves a target by 10 s, shown at once; the one real seek follows 0.6 s
    // after the last press (a seek per press made the player stall and stutter through the tunnel).
    let scrubTo = null, scrubTimer = 0, seekingTo = null, seekUntil = 0;
    pr._onkey = (k) => {
      if (k !== 'left' && k !== 'right') return false;
      const dur = mk.currentPlaybackDuration || 0;
      if (!dur) return true;
      const from = scrubTo != null ? scrubTo : seekingTo != null ? seekingTo : pos() / 1000;
      scrubTo = Math.max(0, Math.min(dur - 1, from + (k === 'right' ? 10 : -10)));
      fill.style.transition = 'transform .25s ease-out';      // the knob glides to the new spot
      fill.style.transform = 'scaleX(' + (scrubTo / dur) + ')';
      tNow.textContent = T.dur(scrubTo * 1000);
      clearTimeout(scrubTimer);
      scrubTimer = setTimeout(() => {
        const t = scrubTo;
        scrubTo = null;
        // The player needs a second or so to get there and keeps reporting the old time meanwhile:
        // trust the target until it arrives (or 6 s pass), or the next press counts from the old spot.
        seekingTo = t;
        seekUntil = performance.now() + 6000;
        jump(t * 1000);
        mk.seekToTime(t);
        progress();
      }, 600);
      return true;
    };

    // ---- idle chrome: controls fade after a while, the first key only brings them back
    let idleTimer = 0;
    const idle = () => s.el.classList.contains('idle');
    // Without its controls the cover block sits in the true middle: shift by what is left visible.
    // Offsets inside the left column, whichever ancestors sit in between (the drift wrapper).
    const yIn = (el) => { let t = 0; for (let e = el; e && e !== left; e = e.offsetParent) t += e.offsetTop; return t; };
    function center() {
      const top = yIn(live.hidden ? cover : live), bottom = yIn(ar) + ar.offsetHeight;
      const mid = (top + bottom) / 2;
      left.style.transformOrigin = '50% ' + mid + 'px';
      left.style.setProperty('--dy', (left.clientHeight / 2 - mid) + 'px');
    }
    function goIdle() {
      center();
      s.el.classList.add('idle');
      if (s.el.contains(T.cur())) T.focus(bPlay);              // back from idle lands on play/pause
    }
    const wake = () => {
      s.el.classList.remove('idle');
      lastFill = -1;
      paintProgress();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(goIdle, T.cur() === pr ? 15000 : CHROME_MS);   // more time while scrubbing
    };
    s.onkey = (k) => {
      if (k === 'back') return false;
      if (idle()) {
        if (k === 'left' || k === 'right') {                   // controls hidden: arrows switch tracks
          if (k === 'right') mk.skipToNextItem();
          else if (mk.currentPlaybackTime > 8) mk.seekToTime(0);
          else mk.skipToPreviousItem();
          return true;
        }
        wake();
        return k === 'ok' || k === 'hold';                     // OK only shows them; Up/Down also move on
      }
      wake();
      return false;
    };
    s.marquee = marquee;                                       // (for tools/cdp.mjs experiments)
    s.onshow = () => {
      clockTick();
      marquee(ti);
      marquee(ar);
      driftStep();
      if (T.calmNext) {
        // Opened because something started playing: cover and captions only, controls on the first key.
        T.calmNext = false;
        clearTimeout(idleTimer);
        s.el.classList.add('noanim');
        goIdle();
        T.focus(bPlay);
        requestAnimationFrame(() => requestAnimationFrame(() => s.el.classList.remove('noanim')));
      } else wake();
      // Arriving by the tab bar keeps focus up there; Play is where Down will land.
      if (!s.el.contains(T.cur())) { if (T.inNav()) s.focusEl = bPlay; else T.focus(bPlay); }
      relayout();
    };

    // ---- clock in the corner, once a minute
    let clockTimer = 0;
    function clockTick() {
      const d = new Date();
      clock.textContent = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
      clearTimeout(clockTimer);
      clockTimer = setTimeout(clockTick, (60 - d.getSeconds()) * 1000 + 50);
    }

    // ---- playback clock: anchored to the player, interpolated between its updates
    // MusicKit rounds currentPlaybackTime to whole seconds (its default timing mode): anchoring on it
    // pulled the bar and the time back by up to half a second every few seconds. The player under it
    // keeps the exact time, so that is read instead. Should it be missing (another MusicKit build), the
    // clock re-anchors only when the rounded second turns over: the true time is then just past the half.
    let anchorPos = 0, anchorWall = 0;
    const playing = () => mk.playbackState === 2;
    const pos = () => anchorPos + (playing() ? performance.now() - anchorWall : 0);
    function exactTime() {
      try {
        const mip = mk._mediaItemPlayback, p = mip && (mip._currentPlayer || (mip.getCurrentPlayer && mip.getCurrentPlayer()));
        const t = p && p._currentTime;
        if (typeof t === 'number' && isFinite(t) && Math.abs(t - (mk.currentPlaybackTime || 0)) <= 0.75) return t;
      } catch (e) {}
      return null;
    }
    const playerTime = () => { const t = exactTime(); return t != null ? t : mk.currentPlaybackTime || 0; };
    function anchor(ms) { anchorPos = ms != null ? ms : playerTime() * 1000; anchorWall = performance.now(); }
    // A seek or another song: the clock moves there and the screen follows, backwards included.
    function jump(ms) { anchor(ms); shownPos = -1; }

    // Progress: the bar and the time are painted by the shared tick (see driftStep), only while the
    // controls are on screen and only when the fill moved a quarter pixel or more. A CSS transition
    // across the whole song kept the page restyling 60 times a second, hidden controls included.
    // What the bar and the time show never steps back by a correction: it waits for the clock instead.
    let lastFill = -1, shownPos = -1;
    function shown() {
      const p = pos();
      if (seekingTo == null && shownPos >= 0 && p < shownPos && shownPos - p < 1500) return shownPos;
      shownPos = p;
      return p;
    }
    function paintProgress() {
      if (scrubTo != null || idle()) return;
      const dur = (mk.currentPlaybackDuration || 0) * 1000, at = shown();
      const f = dur ? Math.min(1, at / dur) : 0;
      if (Math.abs(f - lastFill) * 320 >= 0.25) {
        lastFill = f;
        fill.style.transform = 'scaleX(' + f.toFixed(4) + ')';
      }
      const now = T.dur(at);
      if (tNow.textContent !== now) tNow.textContent = now;
    }
    function progress() {
      if (scrubTo != null) return;
      const dur = (mk.currentPlaybackDuration || 0) * 1000;
      fill.style.transition = 'none';
      tDur.textContent = dur ? T.dur(dur) : '';
      lastFill = -1;
      paintProgress();
    }

    // ---- background from the cover: a 64×36 blurred paint, stretched by the GPU for free
    let front = bgA, bgFor = '';
    function paintBackground(art) {
      const url = T.art(art, 120);
      if (!url || url === bgFor) return;
      bgFor = url;
      const img = new Image();
      img.onload = () => {
        const back = front === bgA ? bgB : bgA, c = back.getContext('2d');
        c.filter = 'blur(5px) saturate(1.5) brightness(.75)';
        c.fillStyle = '#050505';
        c.fillRect(0, 0, 64, 36);
        c.drawImage(img, 0, img.height * 0.2, img.width, img.height * 0.56, -10, -10, 84, 56);
        back.classList.add('on');
        front.classList.remove('on');
        front = back;
      };
      img.src = url;
    }

    // ---- lyrics
    let lines = null, lineEls = [], active = -1, tickTimer = 0, lyricsId = '';
    function showLyrics(list) {
      lines = list;
      active = -1;
      lineEls = list.map((l) => {
        const el = h('div', 'ln' + (l.duet ? ' duet' : '') + (l.s >= 0 ? '' : ' plain'));
        if (l.words.length) l.words.forEach((w, i) => { el.append(w.el = h('span', 'w', w.t)); if (i < l.words.length - 1) el.append(' '); });
        else el.append(l.text);
        if (l.bg) el.append(h('span', 'bgv', l.bg.text));
        return el;
      });
      lyr.replaceChildren(...lineEls);
      scrollTo(0, false);
      tick();
    }

    function upNext() {
      lines = null;
      const items = (mk.queue && mk.queue.items) || [], at = (mk.queue && mk.queue.position) || 0;
      const next = items.slice(at + 1, at + 8);
      lyr.style.transform = '';
      lyr.replaceChildren(next.length ? h('div', 'upn', h('h3', null, T.t('Далее')), h('div', 'list', next.map((it) =>
        h('div', 'item', h('div', 'tx', h('div', 'a', it.title || (it.attributes && it.attributes.name) || ''),
          h('div', 'b', it.artistName || (it.attributes && it.attributes.artistName) || '')))))) : '');
    }

    function scrollTo(i, animate) {
      const el = lineEls[i];
      const y = el ? el.offsetTop - right.clientHeight * 0.3 : 0;
      lyr.style.transition = animate === false ? 'none' : '';
      lyr.style.transform = 'translateY(' + (-Math.max(0, y)) + 'px)';
    }

    // Light the line and words due now, then sleep until the next word or line changes anything.
    function tick() {
      clearTimeout(tickTimer);
      if (!lines || s.el.hidden) return;
      const t = pos() + LEAD_MS;
      let passed = -1;
      for (let i = 0; i < lines.length; i++) { if (lines[i].s >= 0 && lines[i].s <= t) passed = i; else if (lines[i].s > t) break; }
      const L = lines[passed];
      const now = L && t <= Math.max(L.e, L.bg ? L.bg.e || 0 : 0) + 250 ? passed : -1;
      if (now !== active) {
        if (active >= 0) {
          lineEls[active].classList.remove('act');
          lines[active].words.forEach((w) => { w.el.className = 'w'; w.el.style.transition = ''; w.el.style.backgroundPosition = ''; });
        }
        active = now;
        lineEls.forEach((el, i) => el.classList.toggle('past', i < passed && i !== active));
        if (active >= 0) lineEls[active].classList.add('act');
        if (passed >= 0) scrollTo(active >= 0 ? active : passed);
      }
      let next = Infinity;
      if (active >= 0) {
        for (const w of lines[active].words) {
          const st = t >= w.e ? 'sung' : t >= w.s ? 'cur' : '';
          if (w.state !== st) {
            w.state = st;
            w.el.className = 'w' + (st ? ' ' + st : '');
            if (st === 'cur' && playing()) {
              // The wipe across this word is one CSS transition timed to the word.
              w.el.style.transition = 'none';
              w.el.style.backgroundPosition = '100% 0';
              void w.el.offsetWidth;
              w.el.style.transition = 'background-position ' + Math.max(50, w.e - t) + 'ms linear';
              w.el.style.backgroundPosition = '0 0';
            }
          }
          if (w.s > t) next = Math.min(next, w.s);
          else if (w.e > t) next = Math.min(next, w.e);
        }
        next = Math.min(next, Math.max(L.e, L.bg ? L.bg.e || 0 : 0) + 251);
      }
      const nl = lines.find((l) => l.s > t);
      if (nl) next = Math.min(next, nl.s);
      if (playing() && next < Infinity) tickTimer = setTimeout(tick, Math.max(20, next - t));
    }

    // ---- track changes flow: the new cover fades in over the old one, the captions fade through
    function swapCover(url) {
      if (!url) return;
      const img = h('img', { src: url, alt: '', decoding: 'async' });
      img.style.opacity = '0';
      cover.append(img);
      const show = () => requestAnimationFrame(() => {
        img.style.opacity = '1';
        setTimeout(() => { while (cover.firstChild && cover.firstChild !== img) cover.firstChild.remove(); }, 800);
      });
      if (img.complete) show(); else img.onload = img.onerror = show;
    }
    function swapText(el, text) {
      if (el.textContent === text) return;
      if (!el.textContent) { el.textContent = text; marquee(el); return; }
      el.classList.add('swap');
      clearTimeout(el._swap);
      el._swap = setTimeout(() => { el.textContent = text; el.classList.remove('swap'); marquee(el); }, 250);
    }

    // A caption too long for its line: rest 3 s, glide to its end (30 px/s), rest 3 s, fade back to
    // the start. Moved by the same tick as the floating (below), so the two never add up frames;
    // a 60 fps CSS marquee doubled the box's CPU while it moved. Short captions don't move at all.
    const MARQ_SPEED = 30, MARQ_REST = 3000, MARQ_FADE = 400;
    const marqs = new Map();                                   // caption → {span, d, phase, at}
    function marquee(el) {
      const text = el.textContent;
      marqs.delete(el);
      el.classList.remove('marq');
      if (el.firstElementChild) el.textContent = text;
      if (!text || el.clientWidth === 0 || el.scrollWidth <= el.clientWidth + 1) return;
      const cs = getComputedStyle(el), span = h('span', null, text);
      el.replaceChildren(span);
      el.classList.add('marq');
      const d = Math.ceil(span.offsetWidth - (el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)));
      marqs.set(el, { span, d, move: mover(span, 'x', d), phase: 'rest', at: performance.now() });
      driftStep();
    }
    // Returns true while some caption is gliding (the tick then runs twice as often).
    function marqStep(now) {
      let gliding = false;
      for (const m of marqs.values()) {
        const t = now - m.at;
        if (m.phase === 'rest' && t >= MARQ_REST) { m.phase = 'glide'; m.at = now; }
        else if (m.phase === 'glide') {
          const x = Math.min(m.d, MARQ_SPEED * t / 1000);
          m.move(-x);
          if (x >= m.d) { m.phase = 'end'; m.at = now; }
        } else if (m.phase === 'end' && t >= MARQ_REST) { m.phase = 'fade'; m.at = now; m.span.style.opacity = '0'; }
        else if (m.phase === 'fade' && t >= MARQ_FADE) {
          m.move(0);
          m.span.style.opacity = '1';
          m.phase = 'rest';
          m.at = now;
        }
        if (m.phase === 'glide') gliding = true;
      }
      return gliding;
    }

    // ---- what is playing
    let itemKey = '';
    async function onItem() {
      const np = mk.nowPlayingItem;
      empty.hidden = !!np;
      left.hidden = right.hidden = !np;
      if (!np) return;
      const a = np.attributes || {};
      const key = np.id + '|' + (a.name || np.title);
      const art = a.artwork || np.artwork;
      swapText(ti, a.name || np.title || '');
      swapText(ar, a.artistName || np.artistName || a.curatorName || '');
      live.hidden = !(np.isLiveRadioStation || (np.type === 'stations' && a.isLive) || np.playbackType === 4);
      if (idle()) center();                                    // the LIVE badge may have come or gone
      if (key === itemKey) return;
      itemKey = key;
      swapCover(T.art(art, 600));
      favId = np.songId || (a.playParams && a.playParams.catalogId) || (/^\d+$/.test(np.id) ? np.id : '');
      bFav.classList.remove('on');
      bFav.hidden = !favId;
      if (favId) T.isFavorite(favId).then((on) => { if (favId === (np.songId || (a.playParams && a.playParams.catalogId) || np.id)) bFav.classList.toggle('on', on); });
      paintBackground(art);
      sync();
      return loadLyrics();
    }

    // Lyrics only when switched on: otherwise nothing is fetched and nothing ticks.
    async function loadLyrics() {
      clearTimeout(tickTimer);
      lines = null;
      lyricsId = '';
      lyr.replaceChildren();
      const np = mk.nowPlayingItem;
      if (!showLyr || !np) return;
      const a = np.attributes || {};
      const id = np.songId || (a.playParams && a.playParams.catalogId) || (/^\d+$/.test(np.id) ? np.id : '');
      lyricsId = id;
      if (id && a.hasLyrics !== false) {
        const list = await lyricsFor(id);
        if (lyricsId !== id || !showLyr) return;
        if (list) return showLyrics(list);
      }
      upNext();
    }

    function sync() {
      bPlay.replaceChildren(T.icon(playing() ? 'pause' : 'play'));
      bShuffle.classList.toggle('on', !!mk.shuffleMode);
      bRepeat.classList.toggle('on', !!mk.repeatMode);
    }

    let lastAnchor = 0, lastSecond = -1;
    T.on('nowPlayingItemDidChange', () => { jump(); lastSecond = -1; onItem(); progress(); }, s);
    T.on('playbackStateDidChange', () => { if (seekingTo == null) anchor(); sync(); progress(); tick(); }, s);
    T.on('playbackTimeDidChange', () => {
      if (seekingTo != null) {
        if (Math.abs(playerTime() - seekingTo) < 2 || performance.now() > seekUntil) seekingTo = null;
        else return;
      }
      // Re-anchor only when the clock is off (or every 5 s): the interpolated clock is smoother.
      let at = exactTime(), near = 120;
      if (at == null) {
        const r = mk.currentPlaybackTime || 0, turned = r === lastSecond + 1;
        if (r === lastSecond) return;
        lastSecond = r;
        at = turned ? r - 0.375 : r;                          // timeupdate comes every 250 ms: mid-window
        near = turned ? 200 : 650;
      }
      const off = Math.abs(pos() - at * 1000);
      if (off > near || performance.now() - lastAnchor > 5000) {
        anchor(at * 1000);
        lastAnchor = performance.now();
        if (off > 1000) { shownPos = -1; progress(); if (lines) { active = -1; lines.forEach((l) => l.words.forEach((w) => { w.state = null; })); } tick(); }
      }
    }, s);
    T.on('queueItemsDidChange', () => { if (!lines) upNext(); }, s);

    function relayout() { anchor(); onItem().then(() => { progress(); tick(); }); }
    // An offset moved step by step from script. Chromium redoes the whole page's layering after any
    // inline transform change (~1 ms on this box, ten times a second), but moves a layer driven by an
    // animation directly: so each offset is a paused linear animation whose clock is set instead.
    // Across goes on `translate`, up/down on `transform`, so the two never override each other.
    function mover(el, axis, reach) {
      reach = Math.max(1, reach);
      const at = (v) => axis === 'x' ? { translate: v + 'px 0' } : { transform: 'translateY(' + v + 'px)' };
      const an = el.animate([at(-reach), at(reach)], { duration: 1000, fill: 'both' });
      an.pause();
      const move = (v) => { an.currentTime = (v / reach + 1) * 500; };   // v: -reach…reach px
      move(0);
      return move;
    }

    // Burn-in care: the cover block (badge, cover, title, artist) and the clock float together, on one
    // slow path (two sines, periods of a minute or two). Ten sub-pixel steps a second on two GPU layers
    // read as a smooth drift, at the cost of ten composites a second — not a 60 fps animation.
    // (The title's padding leaves room for its shadow: overflow:hidden, needed for the ellipsis, clips.)
    const FLOAT_X = 12, FLOAT_Y = 8, FLOAT_PX = 97, FLOAT_PY = 131;   // reach (px), periods (s)
    const floaters = [drift, clock].map((el) => {
      el.classList.add('float');
      return { mx: mover(el, 'x', FLOAT_X), my: mover(el, 'y', FLOAT_Y) };
    });
    const floatFrom = performance.now() - Math.random() * 3600e3;
    let driftTimer = 0;
    function driftStep() {
      clearTimeout(driftTimer);
      if (s.el.hidden || !s.el.isConnected) return;
      const t = (performance.now() - floatFrom) / 1000;
      const x = FLOAT_X * Math.sin(2 * Math.PI * t / FLOAT_PX), y = FLOAT_Y * Math.sin(2 * Math.PI * t / FLOAT_PY + 1.3);
      for (const f of floaters) { f.mx(x); f.my(y); }
      paintProgress();
      driftTimer = setTimeout(driftStep, marqStep(performance.now()) ? 50 : 100);
    }

    s.ondrop = () => { clearTimeout(idleTimer); clearTimeout(clockTimer); clearTimeout(tickTimer); clearTimeout(driftTimer); };
    relayout();
    s.focusEl = bPlay;
  };

  // Starting something from anywhere: go to Now Playing.
  T.onPlay = () => { T.calmNext = true; T.tab('now', true); };

})();
