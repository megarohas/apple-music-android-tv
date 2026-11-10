// Screens of the TV interface: tabs (home, browse, radio, library, search, settings) and detail pages
// (album, playlist, artist, room). Each builder gets a screen {el, page, off} and fills s.page.
(function () {
  'use strict';
  const T = window.__tv;
  if (!T) return;
  const h = T.h, S = T.screens;
  const rel = (x, k) => (x && x.relationships && x.relationships[k] && x.relationships[k].data) || [];
  const attrs = (x) => (x && x.attributes) || {};
  const notVideo = (x) => !/music-videos|uploaded-videos/.test(x.type);

  T.css(`
.spot { flex: none; width: var(--w, 300px); transition: transform .15s ease-out; }
.spot .lb { height: 58px; overflow: hidden; }
.spot .bd { font-size: 10px; font-weight: 700; letter-spacing: 1.1px; color: #9a9aa0; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.spot .tt { font-size: 15px; font-weight: 700; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.spot .st { font-size: 12px; color: #8a8a8e; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.spot .art { position: relative; width: var(--w, 300px); height: calc(var(--w, 300px) / 1.78); border-radius: 9px; overflow: hidden; background: #1c1c1e; margin-top: 8px; }
.spot .art img, .spot .art .noart { width: 100%; height: 100%; object-fit: cover; }
.spot .blurb { position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 10px 8px; font-size: 10.5px; line-height: 1.35;
  background: linear-gradient(transparent, rgba(0,0,0,.8)); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.spot.focus { transform: scale(1.05); }
.spot.focus .art { outline: 2.5px solid #fff; outline-offset: 2px; }
.more .art { display: flex; align-items: center; justify-content: center; font-size: 30px; color: #8a8a8e; }

.chips { display: flex; gap: 10px; padding: 0 48px 6px; flex-wrap: wrap; }
.chip { display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px; border-radius: 20px; background: rgba(255,255,255,.1);
  font-size: 13px; transition: transform .15s, background-color .15s, color .15s; }
.chip .ic { font-size: 15px; }
.chip.sel { background: rgba(255,255,255,.24); color: #fff; font-weight: 600; }
.chip.focus { background: #fff; color: #000; transform: scale(1.06); }
.grid { display: flex; gap: 18px; padding: 10px 48px 6px; }
.cols2 { display: flex; gap: 12px; padding: 0 36px; }
.cols2 .item { flex: 1; min-width: 0; }

.detail .side { position: absolute; left: 48px; top: 24px; width: 230px; }
.detail .side .cover { width: 230px; height: 230px; border-radius: 12px; overflow: hidden; background: #1c1c1e; }
.detail .side .cover img { width: 100%; height: 100%; object-fit: cover; }
.detail .side .nm { font-size: 19px; font-weight: 700; margin-top: 14px; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.detail .side .by { font-size: 14px; color: #fa233b; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.detail .side .meta { font-size: 11.5px; color: #8a8a8e; margin-top: 6px; }
.detail .side .nt { font-size: 11.5px; color: #8a8a8e; margin-top: 10px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; }
.detail .page { margin-left: 300px; padding-right: 40px; }
.detail .list { padding: 6px 0; }
.item .pop { width: 6px; height: 6px; border-radius: 50%; background: #8a8a8e; flex: none; margin-right: -8px; }
.item .pop.off { visibility: hidden; }

.hero { position: relative; height: 230px; margin: -24px 0 18px; overflow: hidden; }
.hero img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.hero .sh { position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.35) 50%, #000); }
.hero .tx { position: absolute; left: 48px; right: 48px; bottom: 16px; }
.hero .nm { font-size: 38px; font-weight: 800; letter-spacing: -.5px; }
.hero .fx { font-size: 12.5px; color: #c8c8cc; margin-top: 4px; }
.bio { margin: 0 48px 16px; font-size: 12.5px; line-height: 1.5; color: #b0b0b4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; max-width: 760px; }

.sbox { margin: 0 48px 12px; width: 480px; height: 42px; border-radius: 10px; background: #1c1c1e; display: flex; align-items: center;
  padding: 0 14px; font-size: 15px; color: #777; transition: transform .15s; }
.sbox.focus { transform: scale(1.03); box-shadow: 0 0 0 2px #fff; }
.sbox input { all: unset; flex: 1; color: #fff; font-size: 15px; caret-color: #fa233b; }
.set .item { margin: 0 36px; }
`);

  // ---------------------------------------------------------------- shared pieces

  // A shelf of songs: OK plays all of them starting from the chosen one.
  function songShelf(title, songs) {
    const shelf = T.shelf(title, songs, { w: 130 });
    if (!shelf) return null;
    [...shelf.querySelectorAll('.card')].forEach((c, i) => { c._onok = () => T.playSongs(songs, i); });
    return shelf;
  }

  T.playSongs = async function (songs, i) {
    const mk = T.mk(), el = T.cur();
    T.busy(true, el);
    try {
      mk.shuffleMode = 0;
      await mk.setQueue({ songs: songs.map((x) => x.id), startWith: i || 0, startPlaying: true });
      if (mk.playbackState !== 2) await mk.play();
      T.onPlay && T.onPlay(songs[i || 0]);
    } catch (e) {
      console.log('amtv playSongs', e);
      T.play(songs[i || 0]);
    } finally {
      T.busy(false, el);
    }
  };

  // Spotlight: wide editorial cards with a label block above (keeps every image on one line).
  function spotCard(el) {
    const a = attrs(el), ct = rel(el, 'contents')[0];
    if (!ct) return null;
    const ca = attrs(ct), ea = Object.assign({}, ca.editorialArtwork, a.editorialArtwork);
    const wide = ea.subscriptionHero || ea.superHeroWide || ea.storeFlowcase || ea.staticDetailSquare || ca.artwork || a.artwork;
    const notes = ca.editorialNotes || {};
    return h('div', { class: 'spot f', onok: () => T.activate(ct), onhold: () => T.itemMenu(ct) },
      h('div', 'lb', h('div', 'bd', a.designBadge || (ct.type === 'stations' ? T.t('Радио') : '')),
        h('div', 'tt', T.title(ct)), h('div', 'st', ca.artistName || ca.curatorName || notes.tagline || '')),
      h('div', { class: 'art', style: 'background:' + T.color(wide) },
        T.img(T.art(wide, 600, 338)), a.designTag || notes.short ? h('div', 'blurb', T.plain(a.designTag || notes.short)) : null));
  }

  function spotShelf(title, els) {
    const cards = els.map(spotCard).filter(Boolean);
    if (!cards.length) return null;
    return h('section', 'shelf row', title ? h('h2', null, title) : null,
      h('div', 'vp', h('div', { class: 'track', style: '--w:300px' }, cards)));
  }

  function moreCard(item) {
    return h('div', { class: 'card more f', onok: () => T.open('room', { item }) },
      h('div', 'art', T.icon('chevron')), h('div', 't1', T.t('Ещё')));
  }

  // An editorial grouping/room's children → shelves (spotlights, songs, albums/playlists/stations).
  function editorial(children) {
    const out = [];
    for (const k of children) {
      const a = attrs(k), title = a.name || a.title || '';
      const kids = rel(k, 'children'), contents = rel(k, 'contents').filter(notVideo);
      if (kids.length && rel(kids[0], 'contents').length) { out.push(spotShelf(title, kids)); continue; }
      if (!contents.length) continue;
      if (contents.every((x) => x.type === 'songs')) { out.push(songShelf(title, contents)); continue; }
      const shelf = T.shelf(title, contents, { w: 130 });
      if (shelf && k.type === 'editorial-elements' && contents.length >= 10) shelf.querySelector('.track').append(moreCard(k));
      out.push(shelf);
    }
    return out.filter(Boolean);
  }

  // Load, render, and handle errors the same way everywhere.
  function load(s, fn) {
    T.loading(s);
    const run = () => { return fn().then((nodes) => {
      s.page.replaceChildren(...[].concat(nodes).flat(Infinity).filter(Boolean));
      if (!s.page.querySelector('.f')) T.empty(s, T.t('Здесь пока пусто'));
      T.ready(s);
    }).catch((e) => T.fail(s, e, () => { T.loading(s); run(); })); };
    run();
  }

  // ---------------------------------------------------------------- tabs

  S.home = function (s) {
    load(s, async () => {
      const recs = (await T.api('/v1/me/recommendations', { limit: 20, 'include[personal-recommendation]': 'contents' }, 0, true)).data || [];
      const rows = recs.map((r) => ({ title: T.title(r), kind: attrs(r).kind, items: rel(r, 'contents').filter(notVideo) }))
        .filter((r) => r.items.length);
      // "Top picks": the lead item of each recommendation row, captioned with that row's title.
      const seen = new Set(), picks = [];
      for (const r of rows) {
        if (r.kind !== 'music-recommendations' || /made for you/i.test(r.title)) continue;
        const x = r.items.find((i) => !seen.has(i.id));
        if (x) { seen.add(x.id); picks.push(Object.assign({}, x, { _sub: r.title })); }
        if (picks.length >= 10) break;
      }
      const out = [];
      if (picks.length >= 3) {
        const shelf = T.shelf(T.t('Лучшее для вас'), picks, { w: 180 });
        [...shelf.querySelectorAll('.t2')].forEach((t, i) => { t.textContent = picks[i]._sub; });
        out.push(shelf);
      }
      for (const r of rows) out.push(T.shelf(r.title, r.items, { w: /made for you/i.test(r.title) ? 160 : 130 }));
      return out;
    });
  };

  S.browse = function (s) {
    load(s, async () => {
      const g = (await T.api('/v1/editorial/{sf}/groupings', { name: 'music', platform: 'web', include: 'tabs',
        extend: 'editorialArtwork', 'art[url]': 'f', 'limit[contents]': 12 }, 0, true)).data[0];
      return editorial(rel(rel(g, 'tabs')[0], 'children'));
    });
  };

  S.radio = function (s) {
    load(s, async () => {
      const g = (await T.api('/v1/editorial/{sf}/groupings/168577', { platform: 'web', include: 'tabs',
        extend: 'editorialArtwork', 'limit[contents]': 12 }, 0, true)).data[0];
      const kids = rel(rel(g, 'tabs')[0], 'children').filter((k) => !/watch interviews/i.test(attrs(k).name || ''));
      return editorial(kids);
    });
  };

  // "See all" pages: editorial rooms (a flat list) and groupings (shelves).
  S.room = function (s, p) {
    const x = p.item;
    load(s, async () => {
      const out = [h('h1', null, T.title(x) || attrs(x).name || '')];
      let items = rel(x, 'contents').filter(notVideo);
      try {
        const r = (await T.api('/v1/editorial/{sf}/rooms/' + x.id, { include: 'contents', extend: 'editorialArtwork',
          'limit[contents]': 100, platform: 'web' })).data[0];
        if (r) { out[0].textContent = T.title(r) || out[0].textContent; items = rel(r, 'contents').filter(notVideo); }
      } catch (e) { console.log('amtv room', e); }
      if (items.every((i) => i.type === 'songs')) out.push(songShelf('', items));
      else out.push(grid(items, 5, 146));
      return out;
    });
  };

  // Cards in rows of n, every row a focus row.
  function grid(items, n, w) {
    const rows = [];
    for (let i = 0; i < items.length; i += n) {
      rows.push(h('div', { class: 'grid row', style: '--w:' + w + 'px' }, items.slice(i, i + n).map((x) => T.card(x, { w }))));
    }
    return rows;
  }

  // Library: a row of section chips, the chosen section below.
  const LIB = [
    ['recent', T.t('Недавно добавленные'), '/v1/me/library/recently-added', { limit: 25 }],
    ['playlists', T.t('Плейлисты'), '/v1/me/library/playlists', { limit: 100, include: 'catalog' }],
    ['albums', T.t('Альбомы'), '/v1/me/library/albums', { limit: 100 }],
    ['artists', T.t('Артисты'), '/v1/me/library/artists', { limit: 100, include: 'catalog' }],
    ['songs', T.t('Песни'), '/v1/me/library/songs', { limit: 100 }],
  ];
  const LIB_ICON = { recent: 'recent', playlists: 'playlists', albums: 'albums', artists: 'artists', songs: 'songs' };
  S.library = function (s) {
    const body = h('div');
    const chips = h('div', 'chips row', LIB.map(([id, label]) => h('div', { class: 'chip f', onok: (el) => pick(id, el) }, T.icon(LIB_ICON[id]), label)));
    s.page.append(chips, body);
    let section = null;
    function pick(id, chip) {
      section = id;
      chips.querySelectorAll('.chip').forEach((c, i) => c.classList.toggle('sel', LIB[i][0] === id));
      const [, , path, params] = LIB.find((l) => l[0] === id);
      body.replaceChildren(h('div', 'skel', [1, 2, 3, 4, 5].map(() => h('div'))));
      T.busy(true, chip);
      T.api(path, params, 60e3).finally(() => T.busy(false, chip)).then(async (r) => {
        if (section !== id) return;
        let items = (r.data || []).filter(notVideo);
        if (id === 'artists') items = await withArtistArt(items);
        if (!items.length) return body.replaceChildren(h('div', 'msg', T.t('Пусто')));
        if (id === 'songs') {
          body.replaceChildren(h('div', 'list', twoColumns(items, (x, i) => T.playSongs(items, i))));
        } else {
          body.replaceChildren(...grid(items, 5, 146));
        }
        T.ready(s);
      }).catch((e) => body.replaceChildren(h('div', 'msg err', T.t('Не удалось загрузить: ') + T.plain(e && (e.errorCode || e.message)))));
    }
    pick('recent');
    T.ready(s);
  };

  // Library artists come without pictures; the catalog has them (20 per request).
  async function withArtistArt(items) {
    const ids = items.map((x) => rel(x, 'catalog')[0] && rel(x, 'catalog')[0].id).filter(Boolean);
    const art = {};
    for (let i = 0; i < ids.length; i += 20) {
      try {
        const r = await T.api('/v1/catalog/{sf}/artists', { ids: ids.slice(i, i + 20).join(',') });
        for (const a of r.data || []) art[a.id] = attrs(a).artwork;
      } catch (e) { break; }
    }
    return items.map((x) => {
      const c = rel(x, 'catalog')[0];
      return c ? Object.assign({}, c, { attributes: Object.assign({}, attrs(c), { artwork: art[c.id] || attrs(c).artwork }) }) : x;
    });
  }

  // Song rows two to a line: one column wastes the width of a TV.
  function twoColumns(songs, onok) {
    const rows = [];
    for (let i = 0; i < songs.length; i += 2) {
      rows.push(h('div', 'cols2 row', songs.slice(i, i + 2).map((x, j) => songRow(x, i + j, onok, { art: true }))));
    }
    return rows;
  }

  function songRow(x, i, onok, opt) {
    const a = attrs(x);
    opt = opt || {};
    return h('div', { class: 'item f' + (opt.row ? ' row' : ''), 'data-id': x.id, 'data-cid': (a.playParams && a.playParams.catalogId) || '',
      onok: () => onok(x, i), onhold: () => T.itemMenu(x) },
      opt.pop != null ? h('i', 'pop' + (opt.pop ? '' : ' off')) : null,
      opt.num ? h('span', 'n', a.trackNumber || i + 1) : null,
      opt.art ? T.img(T.art(a.artwork, 80), 'th') : null,
      h('div', 'tx', h('div', 'a', a.name || '', a.contentRating === 'explicit' ? T.icon('explicit', 'ex') : null), opt.sub !== false ? h('div', 'b', [a.artistName, opt.album ? a.albumName : null].filter(Boolean).join(' — ')) : null),
      h('span', 'd', a.durationInMillis ? T.dur(a.durationInMillis) : ''));
  }
  T.songRow = songRow;

  // Mark the playing track in any list on this screen.
  function markNow(s) {
    const upd = () => {
      const np = T.mk().nowPlayingItem;
      const id = np && np.id, cid = np && (np.songId || (np.attributes && np.attributes.playParams && np.attributes.playParams.catalogId));
      s.el.querySelectorAll('.item[data-id]').forEach((r) => r.classList.toggle('now', !!id && (r.dataset.id === id || r.dataset.id === cid || r.dataset.cid === id)));
    };
    T.on('nowPlayingItemDidChange', upd, s);
    upd();
  }

  // ---------------------------------------------------------------- search

  const HISTORY = 'amtv.search';
  const history = {
    get() { try { return JSON.parse(localStorage.getItem(HISTORY)) || []; } catch (e) { return []; } },
    add(t) {
      const l = [t].concat(this.get().filter((x) => x.toLowerCase() !== t.toLowerCase())).slice(0, 12);
      try { localStorage.setItem(HISTORY, JSON.stringify(l)); } catch (e) {}
    },
    del(t) { try { localStorage.setItem(HISTORY, JSON.stringify(this.get().filter((x) => x !== t))); } catch (e) {} },
  };

  S.search = function (s) {
    const input = h('input', { type: 'search', placeholder: T.t('Артисты, альбомы, песни…'), enterkeyhint: 'search' });
    const label = h('span', null, T.t('Поиск — нажмите OK, чтобы ввести'));
    const box = h('div', { class: 'sbox f row', onok: edit }, label);
    const body = h('div');
    s.page.append(h('h1', null, T.t('Поиск')), box, body);
    let timer = 0, seq = 0, editing = false;

    // The box is a button until OK: focusing a field on its own would pop the keyboard on every visit.
    function edit() {
      if (!editing) { editing = true; box.replaceChildren(input); }
      input.focus();
      T.native.keyboard();
    }
    function stop() {
      if (!editing) return;
      editing = false;
      input.blur();
      if (!input.value) box.replaceChildren(label);
    }
    box._onkey = (k) => {
      if (k === 'back' && editing && document.activeElement) { stop(); return true; }
      if (k === 'down' || k === 'up') stop();
      return false;
    };
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => run(input.value.trim()), 400);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      const t = input.value.trim();
      if (t.length >= 2) { history.add(t); run(t); }
      stop();
    });

    function recents() {
      const list = history.get();
      body.replaceChildren(...[list.length ? h('h2', { style: 'margin-top:10px' }, T.t('Недавние')) : null,
        list.length ? h('div', 'chips row', list.map((t) => h('div', { class: 'chip f',
          onok: () => { input.value = t; editing = true; box.replaceChildren(input); run(t); },
          onhold: () => { history.del(t); recents(); T.toast(T.t('Удалено из истории')); } }, t))) : null,
        h('div', { class: 'msg', style: 'margin-top:24px' }, T.t('Удерживайте OK на чём угодно — появится меню.'))].filter(Boolean));
    }

    async function run(term) {
      const my = ++seq;
      if (term.length < 2) return recents();
      try {
        const r = (await T.api('/v1/catalog/{sf}/search', { term, types: 'artists,songs,albums,playlists,stations', limit: 15 })).results || {};
        if (my !== seq) return;
        const songs = (r.songs && r.songs.data) || [];
        const nodes = [
          T.shelf(T.t('Артисты'), (r.artists && r.artists.data) || [], { w: 110, round: true }),
          songs.length ? h('h2', { style: 'margin-top:8px' }, T.t('Песни')) : null,
          songs.length ? h('div', 'list', twoColumns(songs.slice(0, 10), (x, i) => T.playSongs(songs, i))) : null,
          T.shelf(T.t('Альбомы'), (r.albums && r.albums.data) || []),
          T.shelf(T.t('Плейлисты'), (r.playlists && r.playlists.data) || []),
          T.shelf(T.t('Станции'), (r.stations && r.stations.data) || []),
        ].filter(Boolean);
        body.replaceChildren(...(nodes.length ? nodes : [h('div', 'msg', T.t('Ничего не нашлось'))]));
      } catch (e) {
        if (my === seq) body.replaceChildren(h('div', 'msg err', T.t('Поиск не удался: ') + T.plain(e && (e.errorCode || e.message))));
      }
    }
    recents();
    T.ready(s);
  };

  // ---------------------------------------------------------------- settings

  S.settings = function (s) {
    const mk = T.mk();
    const item = (label, sub, run) => h('div', { class: 'item f row', onok: run }, h('div', 'tx', h('div', 'a', label), sub ? h('div', 'b', sub) : null));
    s.page.append(h('h1', null, T.t('Настройки')), h('div', 'list set',
      item(T.t('Режим сайта'), T.t('Сайт Apple Music с курсором. «Назад» вернёт сюда.'), () => T.site()),
      // Every language under its own name: the item can be found from any of them, and each is one step away.
      item(T.t('Язык'), T.LANGS.map((l) => l[1]).join(' · '), () => T.menu(T.t('Язык'), T.LANGS.map(([id, name]) => (
        { label: name, on: id === T.lang, run: () => { if (id !== T.lang) T.setLang(id); } })))),
      item(T.t('Обновить данные'), T.t('Сбросить кэш подборок и медиатеки'), () => { T.forget(''); T.toast(T.t('Кэш сброшен')); }),
      item(T.t('Выйти из Apple ID'), null, () => T.menu(T.t('Выйти из Apple ID?'), [
        { label: T.t('Отмена'), run: () => {} },
        { label: T.t('Выйти'), run: () => mk.unauthorize().then(() => location.reload()) }]))),
      h('div', { class: 'msg', style: 'margin-top:30px;font-size:13px' },
        T.t('Регион: ') + T.sf().toUpperCase() + T.t(' · Apple Music в браузере, интерфейс для пульта.')));
    T.ready(s);
  };

  // ---------------------------------------------------------------- detail pages

  // The same first requests the album/playlist pages make (same keys → served from the cache).
  T.prefetch = function (x) {
    const quiet = (p) => p.catch(() => {});
    if (x.type === 'albums' && /^\d+$/.test(x.id)) {
      quiet(T.api('/v1/catalog/{sf}/albums/' + x.id, { include: 'artists' }));
      quiet(T.api('/v1/catalog/{sf}/albums/' + x.id + '/tracks', { limit: 100, extend: 'popularity' }));
    } else if (x.type === 'playlists' || x.type === 'library-playlists') {
      const lib = /^p\./.test(x.id);
      const base = lib ? '/v1/me/library/playlists/' + x.id : '/v1/catalog/{sf}/playlists/' + x.id;
      quiet(T.api(base, {}));
      quiet(T.api(base + '/tracks', { limit: 100, include: lib ? 'catalog' : undefined }));
    }
  };

  function detailFrame(s, x, by, onBy) {
    s.el.classList.add('detail');
    const a = attrs(x);
    const side = h('div', 'side',
      h('div', { class: 'cover', style: 'background:' + T.color(a.artwork) }, T.img(T.art(a.artwork, 460))),
      h('div', 'nm', T.title(x)), by ? h('div', 'by', by) : null, h('div', 'meta'), h('div', 'nt', T.plain(T.notes(a))));
    s.el.insertBefore(side, s.page);
    return side;
  }

  function actions(x, tracks) {
    return h('div', 'btns row',
      h('div', { class: 'btn red f', onok: () => T.play(x) }, T.icon('play'), T.t('Слушать')),
      h('div', { class: 'btn f', onok: () => T.play(x, { shuffle: true }) }, T.icon('shuffle'), T.t('Перемешать')),
      /^(albums|playlists)$/.test(x.type) ? h('div', { class: 'btn f', onok: () => T.addToLibrary(x) }, T.icon('plus')) : null,
      h('div', { class: 'btn f', onok: () => T.itemMenu(x) }, T.icon('more')));
  }

  // Album: catalog id (numeric) or library (l.…, resolved to the catalog when it has one).
  S.album = function (s, p) {
    let x = p.item;
    const side = detailFrame(s, x, attrs(x).artistName);
    load(s, async () => {
      if (/^l\./.test(x.id)) {
        const lib = (await T.api('/v1/me/library/albums/' + x.id, { include: 'catalog,tracks' })).data[0];
        const c = rel(lib, 'catalog')[0];
        if (c) x = c;
        else return [actions(lib), h('div', 'list', rel(lib, 'tracks').map((t, i) => songRow(t, i, (_, j) => T.play(lib, { startWith: j }), { num: true, sub: false, row: true })))];
      }
      const [al, tr] = await Promise.all([
        T.api('/v1/catalog/{sf}/albums/' + x.id, { include: 'artists' }),
        T.api('/v1/catalog/{sf}/albums/' + x.id + '/tracks', { limit: 100, extend: 'popularity' }),
      ]);
      const album = al.data[0], a = attrs(album);
      const tracks = (tr.data || []).filter((t) => t.type === 'songs');
      side.querySelector('.meta').textContent = [String(a.releaseDate || '').slice(0, 4), (a.genreNames || [])[0], tracks.length + T.t(' песен')]
        .filter(Boolean).join(' · ');
      side.querySelector('.nt').textContent = T.plain(T.notes(a));
      const artist = rel(album, 'artists')[0];
      if (artist) {
        const by = side.querySelector('.by');
        if (by) by.textContent = a.artistName;
      }
      // Popular dots: top quarter of this album by Apple's popularity, at most 5, above the median.
      const pops = tracks.map((t) => attrs(t).popularity).filter((v) => v != null).sort((m, n) => n - m);
      const cut = pops.length >= 4 ? Math.max(pops[Math.min(4, Math.floor(pops.length / 4))], pops[Math.floor(pops.length / 2)] + 1e-9) : Infinity;
      const list = tracks.map((t, i) => songRow(t, i, (_, j) => T.play(album, { startWith: j }),
        { num: true, sub: attrs(t).artistName !== a.artistName, row: true, pop: attrs(t).popularity >= cut }));
      const out = [actions(album), h('div', 'list', list)];
      if (artist) out.push(h('div', { class: 'btns row', style: 'margin-top:14px' },
        h('div', { class: 'btn f', onok: () => T.open('artist', { item: artist }) }, T.t('Об артисте: ') + a.artistName)));
      markNow(s);
      return out;
    });
  };

  S.playlist = function (s, p) {
    const x = p.item;
    const side = detailFrame(s, x, attrs(x).curatorName || (rel(x, 'catalog')[0] && attrs(rel(x, 'catalog')[0]).curatorName));
    load(s, async () => {
      const lib = /^p\./.test(x.id);
      const base = lib ? '/v1/me/library/playlists/' + x.id : '/v1/catalog/{sf}/playlists/' + x.id;
      const pl = (await T.api(base, {})).data[0];
      let tracks = [], next = base + '/tracks', guard = 0;
      while (next && guard++ < 5) {
        const r = await T.api(next, next.includes('offset') ? {} : { limit: 100, include: lib ? 'catalog' : undefined });
        tracks = tracks.concat(r.data || []);
        next = r.next;
      }
      tracks = tracks.filter(notVideo);
      const a = attrs(pl);
      side.querySelector('.meta').textContent = tracks.length + T.t(' песен');
      if (T.notes(a)) side.querySelector('.nt').textContent = T.plain(T.notes(a));
      const list = tracks.map((t, i) => songRow(t, i, (_, j) => T.play(pl, { startWith: j }), { art: true, row: true, album: true }));
      markNow(s);
      return [actions(pl), h('div', 'list', list)];
    });
  };

  S.artist = function (s, p) {
    let x = p.item;
    load(s, async () => {
      if (/^r\./.test(x.id)) {
        const lib = (await T.api('/v1/me/library/artists/' + x.id, { include: 'catalog' })).data[0];
        x = rel(lib, 'catalog')[0] || x;
      }
      const r = (await T.api('/v1/catalog/{sf}/artists/' + x.id, {
        views: 'top-songs,latest-release,full-albums,singles,featured-playlists,similar-artists',
        extend: 'editorialArtwork,artistBio,bornOrFormed,origin',
      })).data[0];
      const a = attrs(r), v = r.views || {};
      const view = (k) => (v[k] && v[k].data) || [];
      const ea = a.editorialArtwork || {};
      const heroArt = ea.superHeroWide || ea.storeFlowcase || a.artwork;
      const facts = [a.origin, a.bornOrFormed, (a.genreNames || [])[0]].filter(Boolean).join(' · ');
      const top = view('top-songs');
      return [
        h('div', 'hero', T.img(T.art(heroArt, 1920, 460)), h('div', 'sh'),
          h('div', 'tx', h('div', 'nm', a.name), facts ? h('div', 'fx', facts) : null)),
        a.artistBio || T.notes(a) ? h('div', 'bio', T.plain(a.artistBio || T.notes(a))) : null,
        top.length ? h('div', { class: 'btns row', style: 'margin: 0 48px 8px' },
          h('div', { class: 'btn red f', onok: () => T.playSongs(top, 0) }, T.icon('play'), T.t('Популярное')),
          h('div', { class: 'btn f', onok: () => { T.mk().shuffleMode = 1; T.playSongs(top.slice().sort(() => Math.random() - 0.5), 0); } }, T.icon('shuffle'), T.t('Перемешать'))) : null,
        songShelf(T.t('Популярные песни'), top),
        T.shelf(T.t('Последний релиз'), view('latest-release'), { w: 160 }),
        T.shelf(T.t('Альбомы'), view('full-albums')),
        T.shelf(T.t('Синглы и EP'), view('singles')),
        T.shelf(T.t('Плейлисты'), view('featured-playlists')),
        T.shelf(T.t('Похожие артисты'), view('similar-artists'), { w: 110, round: true }),
      ];
    });
  };
})();
