// TV interface over music.apple.com, driven by the remote through MainActivity:
//   __tv.key('up'|'down'|'left'|'right'|'ok'|'hold'|'back') → true when handled.
// Data comes from the page's own signed-in MusicKit session (MusicKit.getInstance().api.music),
// playback goes through the official player. Nothing here touches streams or tokens.
// Files: tv_core.js (this: shell, focus, navigation, API), tv_screens.js, tv_player.js.
// Re-running them replaces the old interface: `node tools/cdp.mjs run res/raw/tv_*.js`.
(function () {
  'use strict';
  if (window.__tv) try { window.__tv.destroy(); } catch (e) { console.log('amtv destroy', e); }

  const native = window.AmtvNative || { mode() {}, exit() {}, keyboard() {} };
  const T = window.__tv = { screens: {}, native };
  const listeners = [];

  // Interface language: the system's (Russian, or else English); Settings can override it.
  // Strings are written in Russian in the code and looked up here for English.
  const EN = {
"Сейчас играет": "Now Playing",
"Главная": "Home",
"Обзор": "Browse",
"Радио": "Radio",
"Медиатека": "Library",
"Поиск": "Search",
"Не удалось загрузить. ": "Couldn’t load. ",
"Повторить": "Try again",
"Станция": "Station",
"Это пока не открывается: ": "This can’t be opened yet: ",
"Не умею играть ": "Can’t play ",
"Не получилось включить: ": "Couldn’t start playback: ",
"Добавлено в конец очереди": "Added to the end of the queue",
"Сыграет следующим": "Will play next",
"Не получилось: ": "That didn’t work: ",
"Слушать": "Play",
"Перемешать": "Shuffle",
"Сыграть следующим": "Play Next",
"В конец очереди": "Play Last",
"Добавить в медиатеку": "Add to Library",
"Станция по песне": "Create Station",
"Добавлено в медиатеку": "Added to your library",
"Не получилось добавить: ": "Couldn’t add: ",
"Загружаю «%s»…": "Loading “%s”…",
"Буферизую звук…": "Buffering…",
"Пробую ещё раз…": "Trying again…",
"Включаю станцию…": "Starting the station…",
"Получаю треки станции…": "Getting the station’s tracks…",
"Получаю треки…": "Getting the tracks…",
"Не получилось включить": "Couldn’t start playback",
"Нечего добавить в избранное": "Nothing to add to Favorites",
"Добавлено в избранное: ": "Added to Favorites: ",
"Убрано из избранного: ": "Removed from Favorites: ",
"Проверяю вход в Apple ID…": "Checking your Apple ID sign-in…",
"Собираю главную…": "Building Home…",
"Нужен вход в Apple ID": "Sign-in needed",
"Вы вошли в Apple Music": "Signed in to Apple Music",
"Вход в Apple Music слетел — войдите снова": "You were signed out of Apple Music — please sign in again",
"Откроется вход Apple: ↑ ↓ — выбрать поле или кнопку, OK — ввести или нажать.": "Apple’s sign-in opens: ↑ ↓ choose a field or button, OK to type or press.",
"Войти": "Sign In",
"Ещё": "More",
"Здесь пока пусто": "Nothing here yet",
"Лучшее для вас": "Top Picks for You",
"Недавно добавленные": "Recently Added",
"Плейлисты": "Playlists",
"Альбомы": "Albums",
"Артисты": "Artists",
"Песни": "Songs",
"Пусто": "Empty",
"Не удалось загрузить: ": "Couldn’t load: ",
"Артисты, альбомы, песни…": "Artists, albums, songs…",
"Поиск — нажмите OK, чтобы ввести": "Search — press OK to type",
"Недавние": "Recent",
"Удалено из истории": "Removed from history",
"Удерживайте OK на чём угодно — появится меню.": "Hold OK on anything for more options.",
"Станции": "Stations",
"Ничего не нашлось": "No results",
"Поиск не удался: ": "Search failed: ",
"Настройки": "Settings",
"Режим сайта": "Website mode",
"Сайт Apple Music с курсором. «Назад» вернёт сюда.": "The Apple Music website with a pointer. Back returns here.",
"Обновить данные": "Refresh data",
"Сбросить кэш подборок и медиатеки": "Clear the cached shelves and library",
"Кэш сброшен": "Cache cleared",
"Выйти из Apple ID": "Sign out of Apple ID",
"Выйти из Apple ID?": "Sign out of your Apple ID?",
"Отмена": "Cancel",
"Выйти": "Sign Out",
"Регион: ": "Region: ",
" · Apple Music в браузере, интерфейс для пульта.": " · Apple Music on the web with a remote-friendly interface.",
" песен": " songs",
"Об артисте: ": "About ",
"Популярное": "Top Songs",
"Популярные песни": "Top Songs",
"Последний релиз": "Latest Release",
"Синглы и EP": "Singles & EPs",
"Похожие артисты": "Similar Artists",
"Перемешивание включено": "Shuffle on",
"Перемешивание выключено": "Shuffle off",
"Добавлено в избранное": "Added to Favorites",
"Убрано из избранного": "Removed from Favorites",
"Повтор выключен": "Repeat off",
"Повтор песни": "Repeat one",
"Повтор всего": "Repeat all",
"Сейчас ничего не играет": "Nothing is playing",
"Далее": "Up Next",
"Язык": "Language",
"Русский": "Русский",
"English": "English"
};
  const FR = {
"Сейчас играет": "Lecture en cours",
"Главная": "Accueil",
"Обзор": "Explorer",
"Радио": "Radio",
"Медиатека": "Bibliothèque",
"Поиск": "Rechercher",
"Не удалось загрузить. ": "Échec du chargement. ",
"Повторить": "Réessayer",
"Станция": "Station",
"Это пока не открывается: ": "Impossible d’ouvrir ceci pour l’instant : ",
"Не умею играть ": "Lecture impossible : ",
"Не получилось включить: ": "Impossible de lancer la lecture : ",
"Добавлено в конец очереди": "Ajouté à la fin de la file",
"Сыграет следующим": "Sera lu ensuite",
"Не получилось: ": "Ça n’a pas marché : ",
"Слушать": "Lire",
"Перемешать": "Aléatoire",
"Сыграть следующим": "Lire ensuite",
"В конец очереди": "Lire en dernier",
"Добавить в медиатеку": "Ajouter à la bibliothèque",
"Станция по песне": "Créer une station",
"Добавлено в медиатеку": "Ajouté à votre bibliothèque",
"Не получилось добавить: ": "Ajout impossible : ",
"Загружаю «%s»…": "Chargement de « %s »…",
"Буферизую звук…": "Mise en mémoire tampon…",
"Пробую ещё раз…": "Nouvel essai…",
"Включаю станцию…": "Lancement de la station…",
"Получаю треки станции…": "Récupération des morceaux de la station…",
"Получаю треки…": "Récupération des morceaux…",
"Не получилось включить": "Impossible de lancer la lecture",
"Нечего добавить в избранное": "Rien à ajouter aux favoris",
"Добавлено в избранное: ": "Ajouté aux favoris : ",
"Убрано из избранного: ": "Retiré des favoris : ",
"Проверяю вход в Apple ID…": "Vérification de la connexion Apple ID…",
"Собираю главную…": "Préparation de l’accueil…",
"Нужен вход в Apple ID": "Connexion nécessaire",
"Вы вошли в Apple Music": "Connecté à Apple Music",
"Вход в Apple Music слетел — войдите снова": "Vous avez été déconnecté d’Apple Music — reconnectez-vous",
"Откроется вход Apple: ↑ ↓ — выбрать поле или кнопку, OK — ввести или нажать.": "La connexion Apple s’ouvre : ↑ ↓ pour choisir un champ ou un bouton, OK pour écrire ou valider.",
"Войти": "Se connecter",
"Ещё": "Plus",
"Здесь пока пусто": "Rien pour l’instant",
"Лучшее для вас": "Sélection pour vous",
"Недавно добавленные": "Ajouts récents",
"Плейлисты": "Playlists",
"Альбомы": "Albums",
"Артисты": "Artistes",
"Песни": "Morceaux",
"Пусто": "Vide",
"Не удалось загрузить: ": "Échec du chargement : ",
"Артисты, альбомы, песни…": "Artistes, albums, morceaux…",
"Поиск — нажмите OK, чтобы ввести": "Rechercher — appuyez sur OK pour écrire",
"Недавние": "Récents",
"Удалено из истории": "Retiré de l’historique",
"Удерживайте OK на чём угодно — появится меню.": "Maintenez OK sur un élément pour plus d’options.",
"Станции": "Stations",
"Ничего не нашлось": "Aucun résultat",
"Поиск не удался: ": "Échec de la recherche : ",
"Настройки": "Réglages",
"Режим сайта": "Mode site web",
"Сайт Apple Music с курсором. «Назад» вернёт сюда.": "Le site Apple Music avec un pointeur. Retour revient ici.",
"Обновить данные": "Actualiser les données",
"Сбросить кэш подборок и медиатеки": "Vider le cache des sélections et de la bibliothèque",
"Кэш сброшен": "Cache vidé",
"Выйти из Apple ID": "Se déconnecter de l’Apple ID",
"Выйти из Apple ID?": "Se déconnecter de l’Apple ID ?",
"Отмена": "Annuler",
"Выйти": "Se déconnecter",
"Регион: ": "Région : ",
" · Apple Music в браузере, интерфейс для пульта.": " · Apple Music sur le web, avec une interface pour la télécommande.",
" песен": " morceaux",
"Об артисте: ": "À propos de ",
"Популярное": "Meilleurs morceaux",
"Популярные песни": "Meilleurs morceaux",
"Последний релиз": "Dernière sortie",
"Синглы и EP": "Singles et EP",
"Похожие артисты": "Artistes similaires",
"Перемешивание включено": "Aléatoire activé",
"Перемешивание выключено": "Aléatoire désactivé",
"Добавлено в избранное": "Ajouté aux favoris",
"Убрано из избранного": "Retiré des favoris",
"Повтор выключен": "Répétition désactivée",
"Повтор песни": "Répéter le morceau",
"Повтор всего": "Tout répéter",
"Сейчас ничего не играет": "Rien en cours de lecture",
"Далее": "À suivre",
"Язык": "Langue",
"Русский": "Русский",
"English": "English"
};
  let lang = 'en';
  try { lang = localStorage.getItem('amtv.lang') || ''; } catch (e) {}
  try { native.lang && native.lang(lang); } catch (e) {}                 // the splash follows the same choice
  if (!lang) lang = /^ru\b/i.test(navigator.language || '') ? 'ru' : /^fr\b/i.test(navigator.language || '') ? 'fr' : 'en';
  T.lang = lang;
  T.LANGS = [['en', 'English'], ['fr', 'Français'], ['ru', 'Русский']];   // each under its own name
  T.t = (ru, ...args) => {
    const table = lang === 'fr' ? FR : EN;
    let out = lang === 'ru' ? ru : (table[ru] != null ? table[ru] : (EN[ru] != null ? EN[ru] : ru));
    for (const a of args) out = out.replace('%s', a);
    return out;
  };
  T.setLang = (l) => {
    try { localStorage.setItem('amtv.lang', l); } catch (e) {}
    try { native.lang && native.lang(l); } catch (e) {}
    if (native.reload) native.reload(); else location.reload();   // the app reloads behind its splash
  };

  // ---------------------------------------------------------------- DOM helpers

  // h('div', 'cls', kids…) or h('div', {class, text, style, onok, onhold, onfocus, onkey, attr…}, kids…)
  function h(tag, a, ...kids) {
    const e = document.createElement(tag);
    if (typeof a === 'string') e.className = a;
    else if (a) for (const k in a) {
      const v = a[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'style') e.style.cssText = v;
      else if (k.startsWith('on')) e['_' + k] = v;           // our own handlers, not DOM events
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of kids.flat(Infinity)) if (c != null && c !== false) e.append(c.nodeType ? c : String(c));
    return e;
  }
  T.h = h;

  T.img = (url, cls) => url
    ? h('img', { class: cls, src: url, loading: 'lazy', decoding: 'async', alt: '' })
    : h('div', (cls || '') + ' noart');

  // Apple artwork URLs are templates: …/{w}x{h}bb.{f}. Ask for exactly what the screen shows.
  T.art = (a, px, py) => a && a.url
    ? a.url.replace('{w}', Math.round(px)).replace('{h}', Math.round(py || px)).replace('{f}', 'jpg') : '';
  T.color = (a) => a && a.bgColor ? '#' + a.bgColor : '#1c1c1e';

  T.title = (x) => {
    const a = x && x.attributes || {};
    const t = a.name != null ? a.name : a.title;
    return typeof t === 'object' && t ? (t.stringForDisplay || '') : (t || '');
  };
  T.notes = (a) => {
    const n = a && (a.editorialNotes || a.description);
    return !n ? '' : typeof n === 'string' ? n : (n.short || n.standard || '');
  };
  T.plain = (s) => String(s || '').replace(/<[^>]*>/g, '');
  T.dur = (ms) => {
    const s = Math.round((ms || 0) / 1000);
    return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  };

  // ---------------------------------------------------------------- icons

  // Apple's own glyphs, taken from the page at run time (nothing of theirs is stored here): found by
  // their button's test id or the start of their outline. Missing ones fall back to ours below.
  const OWN = {
    play: 'M8 5v14l11-7z', pause: 'M6 5h4v14H6zm8 0h4v14h-4z',
    next: 'M16 6h2v12h-2zM6 18l8.5-6L6 6z', prev: 'M6 6h2v12H6zm3.5 6 8.5 6V6z',
    shuffle: 'M10.6 9.2 5.4 4 4 5.4l5.2 5.2zM14.5 4l2 2L4 18.6 5.4 20 17.9 7.5l2.1 2.1V4zm.3 9.4-1.4 1.4 3.1 3.1L14.5 20H20v-5.5l-2.1 2.1z',
    repeat: 'M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2z',
    favorite: 'M12 17.3 18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2 7.5 14l-1.6 7z',
    lyrics: 'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1zm3 4v2h10V8zm0 4v2h7v-2z',
    more: 'M6 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z',
    plus: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z',
    search: 'M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 9.5 16a6.5 6.5 0 0 0 4.2-1.6l.3.3v.8l5 5 1.5-1.5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z',
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', new: 'M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z',
    radio: 'M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM6.3 6.3l1.5 1.5a6 6 0 0 0 0 8.4l-1.5 1.5a8 8 0 0 1 0-11.4zm11.4 0a8 8 0 0 1 0 11.4l-1.5-1.5a6 6 0 0 0 0-8.4z',
    albums: 'M6 2h12v2H6zM4 5h16v2H4zm-1 3h18v14H3z', playlists: 'M3 6h12v2H3zm0 5h12v2H3zm0 5h8v2H3zm14-5v8l5-4z',
    recent: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.5 2.1-.8 1.3L11 13V7h2z',
    songs: 'M12 3v10.6A4 4 0 1 0 14 17V7h4V3z', artists: 'M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1a7 7 0 0 0 6-6.9z',
    explicit: 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 4v10h6v-2h-4v-2h4v-2h-4V9h4V7z',
    chevron: 'm9 6 6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z',
    settings: 'M19.4 13a7.6 7.6 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.4 7.4 0 0 0-1.7-1L15 3h-4l-.3 2.9a7.4 7.4 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.6 7.6 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1c.5.4 1.1.7 1.7 1L11 21h4l.3-2.9c.6-.3 1.2-.6 1.7-1l2.5 1 2-3.5zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z',
  };
  const BY_TESTID = { search: 'search', home: 'home', new: 'new', radio: 'radio', 'recently-added': 'recent', artists: 'artists',
    albums: 'albums', songs: 'songs', 'made-for-you': 'madeforyou', 'all-playlists': 'playlists', 'more-button': 'more',
    'explicit-badge': 'explicit', 'favorite-button': 'favorite', 'header-title': 'chevron' };
  const BY_PATH = { 'M20.767 20.44': 'shuffle', 'M18.14 20.68': 'next', 'M10.345 23.287': 'play', 'M13.293 22.772': 'pause',
    'M9.545 14.272': 'repeat' };
  const brand = window.__amtvBrand || {};
  const apple = Object.assign({}, brand.icons);                  // a build may bring its own glyph set (brand.js)

  function clean(svg) {
    const c = svg.cloneNode(true);
    if (!c.getAttribute('viewBox')) return null;
    for (const a of ['width', 'height', 'class', 'style', 'aria-hidden', 'role', 'focusable']) c.removeAttribute(a);
    c.querySelectorAll('circle').forEach((n) => n.remove());                // the "more" button's backing disc
    for (const n of [c, ...c.querySelectorAll('*')]) {
      if (n.getAttribute('fill') && n.getAttribute('fill') !== 'none') n.removeAttribute('fill');
      n.removeAttribute('fill-opacity');
    }
    return c.outerHTML;
  }

  function harvest() {
    (function walk(r) {
      for (const e of r.querySelectorAll('*')) {
        if (e.shadowRoot && e.id !== 'amtv-tv') walk(e.shadowRoot);
        if (e.tagName !== 'svg' || e.closest('#amtv-tv')) continue;
        const d = (e.querySelector('path') && e.querySelector('path').getAttribute('d')) || '';
        let key = null;
        for (const pre in BY_PATH) if (d.startsWith(pre)) key = BY_PATH[pre];
        for (let p = e, i = 0; !key && p && i < 7; i++) {
          const tid = p.getAttribute && p.getAttribute('data-testid');
          if (tid && BY_TESTID[tid]) key = BY_TESTID[tid];
          p = p.parentElement || (p.getRootNode && p.getRootNode().host);
        }
        if (key && !apple[key]) { const m = clean(e); if (m) apple[key] = m; }
      }
    })(document);
  }

  function paint(el) {
    const name = el.dataset.ic;
    let markup = apple[name], flip = false;
    if (!markup && name === 'prev' && apple.next) { markup = apple.next; flip = true; }   // Apple mirrors "next"
    if (markup) el.dataset.src = 'apple';
    else markup = OWN[name] ? '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="' + OWN[name] + '"/></svg>' : '';
    el.innerHTML = markup;
    el.classList.toggle('flip', flip);
  }

  T.icon = (name, cls) => { const el = h('span', { class: 'ic' + (cls ? ' ' + cls : ''), 'data-ic': name }); paint(el); return el; };
  // Swap our stand-ins for Apple's as their interface renders them (startup, then a few retries).
  T.paintIcons = function () {
    if (missingApple()) harvest();
    if (T.root) T.root.querySelectorAll('.ic:not([data-src="apple"])').forEach(paint);
  };
  // Borrowing glyphs from the page at run time is opt-in (brand.borrowIcons); the default is our set.
  const missingApple = () => !!brand.borrowIcons && Object.values(BY_TESTID).concat(Object.values(BY_PATH)).some((k) => !apple[k]);
  if (missingApple()) harvest();

  // ---------------------------------------------------------------- API

  T.mk = () => window.MusicKit && MusicKit.getInstance && MusicKit.getInstance();
  T.sf = () => (T.mk() && T.mk().storefrontId) || 'us';

  // GET through the page's MusicKit (it adds both tokens). Promise cache; failures are not cached.
  // Apple's AMP sometimes answers 500 "Upstream Service Error" (~1 in 10): retried.
  // persist: also kept on the box between launches (home, browse, radio): shown at once on the next
  // start while a fresh copy loads quietly for the time after.
  const cache = new Map(), STORE = 'amtv.api.';
  T.api = function (path, params, ttl, persist) {
    path = path.replace('{sf}', T.sf());
    const key = path + '?' + JSON.stringify(params || {});
    const hit = cache.get(key);
    if (hit && Date.now() - hit.t < (ttl || 5 * 60e3)) return hit.p;
    if (persist && !hit) {
      let stored = null;
      try { stored = JSON.parse(localStorage.getItem(STORE + key)); } catch (e) {}
      if (stored) {
        const p = Promise.resolve(stored);
        cache.set(key, { t: Date.now(), p });
        fetchFresh(key, path, params).then((d) => keep(key, d)).catch(() => {});
        return p;
      }
    }
    const p = fetchFresh(key, path, params);
    cache.set(key, { t: Date.now(), p });
    p.catch(() => cache.delete(key));
    if (persist) p.then((d) => keep(key, d)).catch(() => {});
    return p;
  };
  function keep(key, data) {
    cache.set(key, { t: Date.now(), p: Promise.resolve(data) });
    try { localStorage.setItem(STORE + key, JSON.stringify(data)); } catch (e) { /* quota: just not kept */ }
  }
  function fetchFresh(key, path, params) {
    return (async () => {
      for (let i = 0; ; i++) {
        try { return (await T.mk().api.music(path, params || {})).data; }
        catch (e) {
          if (i >= 2 || !/50\d|upstream/i.test(String(e && (e.errorCode || e.status || e.message)))) throw e;
          await new Promise(r => setTimeout(r, 400 * (i + 1)));
        }
      }
    })();
  }
  T.forget = (prefix) => {
    for (const k of cache.keys()) if (k.startsWith(prefix)) cache.delete(k);
    try { for (const k of Object.keys(localStorage)) if (k.startsWith(STORE + prefix)) localStorage.removeItem(k); } catch (e) {}
  };

  // ---------------------------------------------------------------- shell

  const hostCss = document.createElement('style');
  hostCss.id = 'amtv-host-css';
  // Apple's own interface stays loaded (it owns the player) but is never laid out or painted.
  // A build may ship a font in the APK (brand.font; MainActivity serves /amtv/…): no network, first frame.
  const brandFont = (window.__amtvBrand || {}).font;
  hostCss.textContent = (brandFont ? '@font-face{font-family:"AMTV Brand";src:url(/amtv/' + brandFont
      + ') format("woff2");font-weight:1 1000;font-display:block}' : '')
    + '#amtv-tv{position:fixed;inset:0;z-index:2147483646;background:#000;contain:strict;display:none}';
  // TV mode on/off is this sheet's media switch, not a class on <html>: the site rewrites <html>'s
  // classes while it starts, which wiped ours and showed its own (signed-out looking) page for a moment.
  // Hidden with display:none, not content-visibility:hidden. Apple's interface still follows the music
  // (its mini player cross-fades every new cover); in a content-visibility subtree such a transition
  // got stuck and kept the page drawing 60 frames a second for minutes after a track change.
  const modeCss = document.createElement('style');
  modeCss.id = 'amtv-mode-css';
  modeCss.textContent = '.body-container{display:none!important}'
    + 'html,body{overflow:hidden!important}#amtv-tv{display:block!important}';
  modeCss.media = 'not all';
  document.head.append(hostCss, modeCss);
  const tvMode = (on) => { modeCss.media = on ? 'all' : 'not all'; };

  const host = h('div', { id: 'amtv-tv' });
  const root = host.attachShadow({ mode: 'open' });
  document.body.append(host);
  T.root = root;

  const style = h('style');
  root.append(style);
  T.css = (text) => { style.textContent += '\n' + text; };

  const nav = h('nav', 'nav row');
  const stage = h('div', 'stage');
  const toastEl = h('div', 'toast');
  const layer = h('div', 'layer');                          // menus and dialogs
  const spinner = (cls) => h('div', cls, h('div', 'sp', [0, 1, 2, 3, 4, 5, 6, 7].map((k) =>
    h('i', { style: 'transform:rotate(' + k * 45 + 'deg);opacity:' + (1 - k * 0.11).toFixed(2) }))));
  const busyEl = spinner('busy');
  root.append(nav, stage, toastEl, layer, busyEl);

  // Apple's activity spinner while something we asked for is on its way (shown only past 120 ms):
  // on the card/row/button that was pressed (faded under it), or mid-screen when nothing was.
  let busyN = 0, busyShow = 0, busyGuard = 0;
  function unbusy(el) {
    el._busy = 0;
    clearTimeout(el._busyT);
    clearTimeout(el._busyG);
    el.classList.remove('loading');
    if (el._spin) { el._spin.remove(); el._spin = null; }
  }
  T.busy = function (on, el) {
    if (el && el.nodeType && !nav.contains(el)) {
      if (on) {
        el._busy = (el._busy || 0) + 1;                       // (undefined + 1 is NaN: the spinner never left)
        if (el._busy > 1) return;
        el._busyT = setTimeout(() => {
          el.classList.add('loading');
          (el.querySelector('.art') || el).append(el._spin = spinner('mspin'));
        }, 120);
        el._busyG = setTimeout(() => unbusy(el), 25000);
      } else if (el._busy && --el._busy === 0) unbusy(el);
      return;
    }
    busyN = Math.max(0, busyN + (on ? 1 : -1));
    clearTimeout(busyShow);
    clearTimeout(busyGuard);
    if (busyN) {
      busyShow = setTimeout(() => busyEl.classList.add('on'), 120);
      busyGuard = setTimeout(() => { busyN = 0; busyEl.classList.remove('on'); }, 25000);
    } else busyEl.classList.remove('on');
  };
  T.stage = stage;

  T.css(`
:host { all: initial; }
* { box-sizing: border-box; }
:host, .stage { font-family: "AMTV Brand", Roboto, "Noto Sans", system-ui, sans-serif; color: #f2f2f5; -webkit-font-smoothing: antialiased; }
.ic { display: inline-flex; width: 1em; height: 1em; flex: none; align-items: center; justify-content: center; }
.ic svg { width: 100%; height: 100%; fill: currentColor; }
.ic.flip svg { transform: scaleX(-1); }
img { display: block; }
[hidden] { display: none !important; }

.nav { position: absolute; top: 0; left: 0; right: 0; height: 64px; z-index: 5; display: flex; justify-content: center;
  align-items: center; background: #0a0a0a; transition: opacity .4s; }
.nav.ghost:not(:focus-within):not(.has-focus) { opacity: 0; }
.pill { display: flex; gap: 10px; padding: 6px 10px; border-radius: 999px; background: #1c1c1e; }
.tab { padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 500; color: #9a9a9a; white-space: nowrap;
  display: flex; align-items: center; gap: 6px; transition: background-color .15s, color .15s, transform .15s, font-weight .25s; }
.tab .ic { font-size: 15px; }
.tab.sel { color: #fff; font-weight: 600; }
/* A label is as wide as its bold self, so turning bold (a variable font eases into it) moves nothing. */
.tab .lb { display: inline-flex; flex-direction: column; align-items: center; }
.tab .lb::after { content: attr(data-t); font-weight: 600; height: 0; overflow: hidden; visibility: hidden; }
.tab.focus { background: #fff; color: #000; transform: scale(1.06); }
.eq { display: flex; gap: 2px; align-items: flex-end; height: 11px; }
.eq i { width: 2px; height: 100%; border-radius: 1px; background: #8e8e93; transform-origin: 50% 100%; transition: background-color .3s; }
.playing .eq i { background: #fa233b; }

.stage { position: absolute; inset: 0; }
.screen { position: absolute; inset: 64px 0 0 0; overflow: hidden; background: #000; }
.screen.full { inset: 0; }
.screen.enter { z-index: 3; opacity: 0; }
.screen.enter.in { opacity: 1; transition: opacity .25s ease-out; }
.page { position: relative; padding: 24px 0 100px; transition: transform .25s ease-out; will-change: transform; }

h1 { font-size: 26px; font-weight: 700; letter-spacing: -.4px; margin: 4px 48px 18px; }
h2 { font-size: 18px; font-weight: 600; margin: 0 48px 4px; color: #f2f2f5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.shelf { margin-bottom: 18px; }
.vp { overflow: hidden; padding: 12px 0 10px; }
.track { position: relative; display: flex; gap: 14px; padding: 0 48px; transition: transform .22s ease-out; }

.card { flex: none; width: var(--w, 130px); transition: transform .15s ease-out; }
.card .art { position: relative; width: var(--w, 130px); height: var(--h, var(--w, 130px)); border-radius: 10px; overflow: hidden; background: #1c1c1e; }
.card .art img, .card .art .noart { width: 100%; height: 100%; object-fit: cover; }
.card.round .art { border-radius: 50%; }
.card .t1 { margin-top: 7px; font-size: 12.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card .t2 { margin-top: 2px; font-size: 10.5px; color: #8a8a8e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card.focus { transform: scale(1.1); }
.card.focus .art { box-shadow: 0 10px 24px rgba(0,0,0,.65); outline: 1.5px solid rgba(255,255,255,.7); }
.card .badge { position: absolute; left: 6px; top: 6px; font-size: 9px; font-weight: 700; background: #fa233b; color: #fff; padding: 1px 5px; border-radius: 4px; }
.noart { background: #2a2a2c; }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 12px; background: rgba(255,255,255,.12);
  font-size: 14px; font-weight: 600; transition: transform .15s, background-color .15s, color .15s; }
.btn .ic { font-size: 16px; }
.btn.red { background: #fa233b; }
.btn.focus { transform: scale(1.07); background: #fff; color: #000; box-shadow: 0 8px 20px rgba(0,0,0,.5); }
.btns { display: flex; gap: 14px; padding: 6px 0; }

.list .item { display: flex; align-items: center; gap: 14px; padding: 9px 12px; border-radius: 8px; font-size: 14px; }
.list .item.focus { background: #f2f2f5; color: #000; }
.list .item.focus .b, .list .item.focus .d, .list .item.focus .n { color: #555; }
.item .ex { font-size: 10px; color: #8a8a8e; margin-left: 5px; vertical-align: -1px; }
.item .n { width: 24px; text-align: right; color: #666; font-size: 13px; flex: none; }
.item .th { width: 40px; height: 40px; border-radius: 5px; flex: none; object-fit: cover; }
.item .tx { flex: 1; min-width: 0; }
.item .a { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item .b { font-size: 11.5px; color: #8a8a8e; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item .d { color: #8a8a8e; font-size: 12px; flex: none; }
.item.now .a { color: #fa233b; }

.msg { margin: 60px 48px; color: #8a8a8e; font-size: 16px; }
.msg.err { color: #ff6b5e; }
.skel { display: flex; gap: 14px; padding: 12px 48px; }
.skel div { width: 130px; height: 130px; border-radius: 10px; background: #141416; flex: none; }

.busy { position: absolute; left: 50%; top: 50%; width: 64px; height: 64px; margin: -32px 0 0 -32px; border-radius: 16px; z-index: 15;
  background: rgba(28,28,30,.88); opacity: 0; transition: opacity .15s; pointer-events: none; }
.busy.on { opacity: 1; }
.busy .sp { position: absolute; inset: 0; animation: amtvspin .9s steps(8) infinite; will-change: transform; }
.busy:not(.on) .sp { animation: none; }
.mspin { position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; margin: -20px 0 0 -20px; border-radius: 50%;
  background: rgba(0,0,0,.55); z-index: 2; pointer-events: none; }
.btn .mspin, .chip .mspin, .tb .mspin { transform: scale(.7); }
.mspin .sp { position: absolute; inset: 0; animation: amtvspin .9s steps(8) infinite; will-change: transform; }
.mspin i { position: absolute; left: 18.5px; top: 8px; width: 3px; height: 7px; border-radius: 1.5px; background: #fff; transform-origin: 1.5px 12px; }
.item, .btn, .chip { position: relative; }
.card.loading .art img, .card.loading .art .noart, .spot.loading .art img { opacity: .45; transition: opacity .2s; }
.item.loading > :not(.mspin), .btn.loading > :not(.mspin), .chip.loading > :not(.mspin) { opacity: .4; transition: opacity .2s; }
.busy i { position: absolute; left: 30.5px; top: 14px; width: 3px; height: 9px; border-radius: 2px; background: #fff; transform-origin: 1.5px 18px; }
@keyframes amtvspin { to { transform: rotate(360deg); } }
.toast { position: absolute; left: 50%; bottom: 36px; transform: translate(-50%, 20px); opacity: 0; z-index: 20;
  background: #2c2c2e; padding: 12px 22px; border-radius: 12px; font-size: 15px; transition: opacity .2s, transform .2s; max-width: 70%; }
.toast.on { opacity: 1; transform: translate(-50%, 0); }

.layer { position: absolute; inset: 0; z-index: 10; display: none; background: rgba(0,0,0,.6); align-items: center; justify-content: center; }
.layer.on { display: flex; }
.menu { width: 340px; max-height: 440px; overflow: hidden; background: #1c1c1e; border-radius: 14px; padding: 8px; }
.menu .hd { font-size: 13px; color: #999; padding: 10px 12px; border-bottom: 1px solid #2e2e30; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.menu .mi { padding: 12px 14px; border-radius: 8px; font-size: 15px; }
.menu .mi.focus { background: #3a3a3c; }
.menu .mi.on { display: flex; align-items: center; justify-content: space-between; }
.menu .mi.on::after { content: ''; width: 6px; height: 12px; margin: -3px 6px 0 12px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
`);

  // ---------------------------------------------------------------- focus

  let cur = null;
  T.cur = () => cur;
  T.inNav = () => inNav(cur);
  const rowOf = (el) => el && el.closest('.row');
  const screenOf = (el) => el && el.closest('.screen');
  const inNav = (el) => !!el && nav.contains(el);
  // Attached and not inside anything [hidden] — everything focusable is hidden that way here. No
  // offsetParent: it forced a layout per row and per card on every key press.
  const visible = (el) => !!el && el.isConnected && !el.closest('[hidden]');

  T.focus = function focus(el) {
    if (!el) return;
    if (cur && cur !== el) { cur.classList.remove('focus'); cur._onblur && cur._onblur(cur); }
    cur = el;
    el.classList.add('focus');
    if (nav.classList.contains('has-focus') !== inNav(el)) { nav.classList.toggle('has-focus', inNav(el)); eqStep(); }
    const row = rowOf(el);
    if (row) { row._mem = el; ensureX(row, el); }
    const s = active();
    if (s && s.el.contains(el)) { s.focusEl = el; ensureY(s, row || el); }
    el._onfocus && el._onfocus(el);
  };

  // Shelves slide sideways: keep the focused card inside, with the next one peeking.
  function ensureX(row, el) {
    const tr = row.querySelector('.track');
    if (!tr || !tr.contains(el)) return;
    const W = tr.parentNode.clientWidth, pad = 48, peek = 70;
    const last = tr.lastElementChild;
    const max = Math.max(0, last.offsetLeft + last.offsetWidth + pad - W);
    let x = tr._x || 0;
    if (el.offsetLeft - x < pad) x = el.offsetLeft - pad;
    else if (el.offsetLeft + el.offsetWidth - x > W - pad - peek) x = el.offsetLeft + el.offsetWidth - (W - pad - peek);
    x = Math.max(0, Math.min(x, max));
    if (x !== tr._x) { tr._x = x; tr.style.transform = 'translateX(' + (-x) + 'px)'; }
  }

  // Pages slide up: shelves snap to the top (every row lands in the same spot), lists just stay in view.
  function ensureY(s, target) {
    const page = s.page, H = s.el.clientHeight;
    let top = 0;
    for (let e = target; e && e !== page; e = e.offsetParent) top += e.offsetTop;
    const hgt = target.offsetHeight;
    let y = page._y || 0;
    if (target.classList.contains('shelf') || target.hasAttribute('data-snap')) y = top - 12;
    else if (top - y < 70) y = top - 70;
    else if (top + hgt - y > H - 70) y = top + hgt - H + 70;
    y = Math.max(0, Math.min(y, page.offsetHeight - H));
    if (y !== page._y) { page._y = y; page.style.transform = 'translateY(' + (-y) + 'px)'; }
  }
  T.scrollTop = (s) => { s.page._y = 0; s.page.style.transform = ''; };

  // A row is a .row holding .f items, or a single focusable that is its own row (.row.f).
  function focusables(scope) {
    const list = [...scope.querySelectorAll('.f')];
    if (scope.classList && scope.classList.contains('f')) list.unshift(scope);
    return list.filter(visible);
  }
  const rowsIn = (scope) => [...scope.querySelectorAll('.row')]
    .filter((r) => visible(r) && (r.classList.contains('f') || r.querySelector('.f')));

  // Entering a row: its remembered card (shelves), else whatever sits closest under/over us.
  function pickIn(row, from) {
    if (row.classList.contains('shelf') && row._mem && visible(row._mem)) return row._mem;
    const list = focusables(row);
    if (list.length <= 1) return list[0];
    const fr = from && from.getBoundingClientRect();
    const fx = fr ? (fr.left + fr.right) / 2 : 0;
    let best = null, bd = Infinity;
    for (const e of list) {
      const r = e.getBoundingClientRect();
      if (r.right < 0 || r.left > innerWidth) continue;
      const d = Math.abs((r.left + r.right) / 2 - fx);
      if (d < bd) { bd = d; best = e; }
    }
    return best || list[0];
  }

  function moveV(dir) {
    const s = active();
    if (inNav(cur)) {
      if (dir > 0 && s) T.focus(s.focusEl && visible(s.focusEl) ? s.focusEl : first(s));
      return;
    }
    const scope = layer.classList.contains('on') ? layer : s && s.el;
    if (!scope) return;
    const rows = rowsIn(scope);
    const i = rows.indexOf(rowOf(cur));
    for (let j = i + dir; j >= 0 && j < rows.length; j += dir) {
      const t = pickIn(rows[j], cur);
      if (t) return T.focus(t);
    }
    if (dir < 0 && scope !== layer) focusNav();
  }

  function moveH(dir) {
    const row = rowOf(cur);
    if (!row) return;
    const list = inNav(cur) ? [...nav.querySelectorAll('.f')].filter(visible) : focusables(row);
    const t = list[list.indexOf(cur) + dir];
    if (t) return T.focus(t);
    // Past either end of a row: the neighbouring top tab, straight into its content.
    // A row of one (a track in a list) is not a list to run off: it stays put.
    if (inNav(cur) || list.length < 2 || layer.classList.contains('on')) return;
    const ids = TABS.map((x) => x[0]).filter((id) => !tabEls[id].hidden), i = ids.indexOf(tab) + dir;
    if (i >= 0 && i < ids.length) T.tab(ids[i], true);
  }

  function first(s) {
    const rows = rowsIn(s.el);
    return rows.length ? pickIn(rows[0], null) : null;
  }
  T.first = first;

  // ---------------------------------------------------------------- tabs, screens, back

  const TABS = [['now', T.t('Сейчас играет')], ['home', T.t('Главная'), 'home'], ['browse', T.t('Обзор'), 'new'], ['radio', T.t('Радио'), 'radio'],
    ['library', T.t('Медиатека'), 'albums'], ['search', T.t('Поиск'), 'search'], ['settings', '', 'settings']];
  const pill = h('div', 'pill');
  nav.append(pill);
  const tabEls = {};
  // Tabs open as soon as focus rests on them (no OK needed); the short wait skips the ones passed over.
  let tabTimer = 0;
  for (const [id, label, icon] of TABS) {
    const t = h('div', { class: 'tab f', onok: () => T.tab(id), onfocus: () => {
      clearTimeout(tabTimer);
      tabTimer = setTimeout(() => { if (cur === t && id !== tab) T.tab(id); }, 500);
    } },
      icon ? T.icon(icon) : null, id === 'now' ? h('span', 'eq', h('i'), h('i'), h('i')) : null,
      label ? h('span', { class: 'lb', 'data-t': label }, label) : null);
    tabEls[id] = t;
    pill.append(t);
  }

  const stacks = {};
  let tab = null, prevTab = 'home';
  const active = () => tab && stacks[tab] && stacks[tab][stacks[tab].length - 1];
  T.active = active;

  function make(name, params) {
    const s = { name, params, el: h('div', 'screen'), page: h('div', 'page'), off: [] };
    s.el.append(s.page);
    s.el.hidden = true;
    stage.append(s.el);
    // Builders fill s.page, possibly later (after loading), and call T.ready(s) when they have.
    try { T.screens[name](s, params || {}); }
    catch (e) { console.log('amtv screen ' + name, e); T.fail(s, e); }
    return s;
  }

  // Screens cross-fade: the new one comes up over the old (opacity only, 0.25 s), then the old hides.
  let shown = null, fadeT = 0;
  function show(s, focusIt) {
    const prev = shown && shown !== s && shown.el.isConnected && !shown.el.hidden ? shown : null;
    shown = s;
    clearTimeout(fadeT);
    for (const el of stage.children) {
      el.classList.remove('enter', 'in');
      if (el !== s.el && (!prev || el !== prev.el)) el.hidden = true;
    }
    s.el.hidden = false;
    if (prev) {
      s.el.classList.add('enter');
      void s.el.offsetWidth;
      s.el.classList.add('in');
      fadeT = setTimeout(() => { prev.el.hidden = true; s.el.classList.remove('enter', 'in'); }, 270);
    }
    if (s.ghostNav && !nav.classList.contains('ghost')) {
      nav.style.transition = 'none';
      nav.classList.add('ghost');
      void nav.offsetWidth;
      nav.style.transition = '';
    } else nav.classList.toggle('ghost', !!s.ghostNav);
    if (focusIt) T.focus(s.focusEl && visible(s.focusEl) ? s.focusEl : first(s) || tabEls[tab]);
    s.onshow && s.onshow();
    eqStep();
  }

  // A builder finished rendering: take focus if this screen is up and focus is nowhere useful.
  let bootFocus = true;                                       // the very first screen starts in its content
  T.ready = function (s) {
    if (s === pendingOpen) return s.reveal();
    if (active() !== s) { s.readyEarly = true; return; }
    const wake = bootFocus && inNav(cur);
    if (wake || !cur || !cur.isConnected || !visible(cur) || (!inNav(cur) && !s.el.contains(cur))) {
      bootFocus = false;
      T.splashDone();
      const f = first(s);
      if (f) T.focus(f);
    }
  };

  T.tab = function (id, focusContent) {
    cancelOpen();
    if (id === 'now') tabEls.now.hidden = false;
    if (id !== tab) {
      if (tab && tab !== 'now' && tab !== 'settings') prevTab = tab;
      tab = id;
      if (!stacks[id]) stacks[id] = [make(id)];
      for (const k in tabEls) tabEls[k].classList.toggle('sel', k === id);
    }
    show(active(), focusContent || !inNav(cur));
  };

  // A detail page stays behind the card that opened it (spinner on the card) until it has its data,
  // then appears whole; 8 s at most. Another open, a tab switch or Back drops the waiting one.
  let pendingOpen = null;
  function cancelOpen() {
    const p = pendingOpen;
    if (!p) return false;
    pendingOpen = null;
    clearTimeout(p.revealT);
    if (p.from) T.busy(false, p.from);
    drop(p);
    return true;
  }
  T.open = function (name, params) {
    cancelOpen();
    const from = cur, home = tab;
    const s = make(name, params);
    const reveal = () => {
      if (pendingOpen === s) { pendingOpen = null; clearTimeout(s.revealT); if (from) T.busy(false, from); }
      if (tab !== home || s.shown) return;
      s.shown = true;
      stacks[tab].push(s);
      show(s, true);
    };
    if (s.readyEarly) { reveal(); return s; }
    pendingOpen = s;
    s.reveal = reveal;
    s.from = from;
    if (from) T.busy(true, from);
    s.revealT = setTimeout(reveal, 8000);
    return s;
  };

  function drop(s) {
    s.el.remove();
    for (const off of s.off) off();
    s.ondrop && s.ondrop();
  }

  function back() {
    if (layer.classList.contains('on')) { T.closeMenu(); return true; }
    if (cancelOpen()) return true;
    if (cur && cur._onkey && cur._onkey('back')) return true;
    const st = stacks[tab];
    if (st && st.length > 1) {
      const old = st.pop();
      show(active(), true);
      setTimeout(() => drop(old), 300);                         // after it has faded out
      return true;
    }
    if (inNav(cur) && tab === 'home') return false;         // home tab, at the bar: leave the app
    if (tab === 'now') { T.tab(prevTab, true); return true; }
    if (tab !== 'home') { T.tab('home', true); return true; }
    if (!inNav(cur)) { focusNav(); return true; }
    return false;
  }

  function focusNav() { T.focus(tabEls[tab] || tabEls.home); }

  T.key = function (k) {
    try {
      lastKey = Date.now();
      if (!eqLive) eqStep();
      if (!T.visible) return false;
      const s = active();
      if (s && s.onkey && s.onkey(k)) return true;            // e.g. Now Playing waking its controls
      if (k !== 'back' && cur && cur._onkey && cur._onkey(k)) return true;
      switch (k) {
        case 'up': moveV(-1); return true;
        case 'down': moveV(1); return true;
        case 'left': moveH(-1); return true;
        case 'right': moveH(1); return true;
        case 'ok': if (cur && cur._onok) cur._onok(cur); return true;
        case 'hold': if (cur && cur._onhold) cur._onhold(cur); else if (cur && cur._onok) cur._onok(cur); return true;
        case 'back': return back();
      }
    } catch (e) { console.log('amtv key', e); }
    return false;
  };

  // ---------------------------------------------------------------- toast, menus, errors

  let toastTimer = 0;
  T.toast = function (text) {
    toastEl.textContent = text;
    toastEl.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('on'), 2600);
  };

  let menuReturn = null, menuOpenedAt = 0;
  // items: [{label, run, on}] — a held OK opens these; its own release must not pick the first item.
  // In a list of options, `on` is the current one: ticked, and where the focus starts.
  T.menu = function (title, items) {
    menuReturn = cur;
    menuOpenedAt = Date.now();
    layer.replaceChildren(h('div', 'menu', title ? h('div', 'hd', title) : null,
      items.map((it) => h('div', { class: 'mi f row' + (it.on ? ' on' : ''), onok: () => {
        if (Date.now() - menuOpenedAt < 600) return;
        T.closeMenu();
        it.run();
      } }, it.label))));
    layer.classList.add('on');
    T.focus(layer.querySelector('.f.on') || layer.querySelector('.f'));
  };
  T.closeMenu = function () {
    layer.classList.remove('on');
    layer.replaceChildren();
    if (menuReturn && menuReturn.isConnected) T.focus(menuReturn);
    else { const s = active(); if (s) T.focus(first(s) || tabEls[tab]); }
  };

  T.loading = (s) => {
    s.page.replaceChildren(h('div', 'skel', [1, 2, 3, 4, 5, 6].map(() => h('div'))),
      h('div', 'skel', [1, 2, 3, 4, 5, 6].map(() => h('div'))));
  };
  T.fail = function (s, e, retry) {
    console.log('amtv fail ' + s.name, e);
    s.page.replaceChildren(...[
      h('div', 'msg err', T.t('Не удалось загрузить. ') + T.plain(e && (e.errorCode || e.message) || '')),
      retry ? h('div', { class: 'row', style: 'margin: 0 48px' }, h('div', { class: 'btn f', onok: retry }, T.t('Повторить'))) : null].filter(Boolean));
    T.ready(s);
  };
  T.empty = (s, text) => { s.page.append(h('div', 'msg', text)); };

  // ---------------------------------------------------------------- shared building blocks

  // A horizontal shelf of cards. items: API resources. opts: {w, h, round, wide}
  T.shelf = function (title, items, opts) {
    opts = opts || {};
    const w = opts.w || 130;
    const cards = items.map((x) => T.card(x, opts)).filter(Boolean);
    if (!cards.length) return null;
    return h('section', 'shelf row', title ? h('h2', null, title) : null,
      h('div', 'vp', h('div', { class: 'track', style: '--w:' + w + 'px' + (opts.h ? ';--h:' + opts.h + 'px' : '') }, cards)));
  };

  T.card = function (x, opts) {
    opts = opts || {};
    const a = x.attributes || {};
    const w = opts.w || 130, hh = opts.h || w;
    const artwork = (opts.wide && (a.editorialArtwork && (a.editorialArtwork.superHeroWide || a.editorialArtwork.subscriptionHero))) || a.artwork
      || (x.relationships && x.relationships.catalog && x.relationships.catalog.data[0] && x.relationships.catalog.data[0].attributes.artwork);
    const sub = opts.sub != null ? opts.sub : (a.artistName || a.curatorName || (x.type === 'stations' ? T.t('Станция') : ''));
    return h('div', { class: 'card f' + (opts.round || /artists/.test(x.type) ? ' round' : ''), style: '--w:' + w + 'px',
      onok: () => T.activate(x), onhold: () => T.itemMenu(x), onfocus: () => T.dwell(x) },
      h('div', { class: 'art', style: 'background:' + T.color(artwork) },
        T.img(T.art(artwork, w * 2, hh * 2)), x.type === 'stations' && a.isLive ? h('span', 'badge', 'LIVE') : null),
      h('div', 't1', T.title(x)), sub ? h('div', 't2', sub) : null);
  };

  // Resting on a card for a moment fetches what its page needs, so OK opens it from the cache.
  let dwellT = 0;
  T.dwell = (x) => {
    clearTimeout(dwellT);
    dwellT = setTimeout(() => {
      try { if (x.type === 'stations') T.warmConnections(); else if (T.prefetch) T.prefetch(x); } catch (e) {}
    }, 350);
  };

  // What OK on a card does, by resource type.
  T.activate = function (x) {
    const t = x.type || '';
    if (/^(songs|library-songs)$/.test(t) || t === 'stations') return T.play(x);
    if (/albums/.test(t)) return T.open('album', { item: x });
    if (/playlists/.test(t)) return T.open('playlist', { item: x });
    if (/artists/.test(t)) return T.open('artist', { item: x });
    if (/rooms|groupings|multirooms|curators|editorial-elements/.test(t)) return T.open('room', { item: x });
    T.toast(T.t('Это пока не открывается: ') + t);
  };

  // ---------------------------------------------------------------- playback (official player only)

  const QUEUE_KEY = { albums: 'album', 'library-albums': 'album', playlists: 'playlist', 'library-playlists': 'playlist',
    songs: 'song', 'library-songs': 'song', stations: 'station', 'music-videos': 'musicVideo' };

  // x: a resource to play; opts: {startWith, shuffle, from} — startWith is a track index in an album/playlist.
  T.play = async function (x, opts) {
    opts = opts || {};
    const mk = T.mk();
    const key = QUEUE_KEY[x.type];
    if (!key) return T.toast(T.t('Не умею играть ') + x.type);
    const el = opts.el !== undefined ? opts.el : cur;
    T.busy(true, el);
    try {
      mk.shuffleMode = opts.shuffle ? 1 : 0;
      const q = { [key]: x.id, startPlaying: true };
      if (opts.startWith != null) q.startWith = opts.startWith;
      await mk.setQueue(q);
      if (mk.playbackState !== 2) await mk.play();
      T.onPlay && T.onPlay(x);
    } catch (e) {
      console.log('amtv play', e);
      diag({ ev: 'play-failed', code: String(e && (e.errorCode || e.message) || e).slice(0, 80) });
      T.toast(T.t('Не получилось включить: ') + T.plain(e && (e.errorCode || e.message) || e));
    } finally {
      T.busy(false, el);
    }
  };

  T.playNext = async (x, later) => {
    try {
      const key = QUEUE_KEY[x.type];
      await T.mk()[later ? 'playLater' : 'playNext']({ [key]: x.id });
      T.toast(later ? T.t('Добавлено в конец очереди') : T.t('Сыграет следующим'));
    } catch (e) { T.toast(T.t('Не получилось: ') + T.plain(e && e.message)); }
  };

  // A held OK on anything playable.
  T.itemMenu = function (x) {
    const items = [{ label: T.t('Слушать'), run: () => T.play(x) }];
    if (/albums|playlists/.test(x.type)) items.push({ label: T.t('Перемешать'), run: () => T.play(x, { shuffle: true }) });
    if (QUEUE_KEY[x.type] && x.type !== 'stations') {
      items.push({ label: T.t('Сыграть следующим'), run: () => T.playNext(x) });
      items.push({ label: T.t('В конец очереди'), run: () => T.playNext(x, true) });
    }
    if (/^(songs|albums|playlists)$/.test(x.type)) items.push({ label: T.t('Добавить в медиатеку'), run: () => T.addToLibrary(x) });
    if (/^songs$/.test(x.type)) items.push({ label: T.t('Станция по песне'), run: () => T.play({ type: 'stations', id: 'ra.' + x.id }) });
    T.menu(T.title(x), items);
  };

  // Writes, and reads that must be fresh, go straight to Apple's API with this page's own tokens,
  // the way the site does it: MusicKit's api.music() quietly turns every call into a cached GET
  // (our "add to favourites" was a GET that changed nothing, and re-reads came from its cache).
  T.send = async function (method, path, params) {
    const mk = T.mk();
    const url = new URL('https://amp-api.music.apple.com' + path.replace('{sf}', T.sf()));
    for (const k in params || {}) url.searchParams.set(k, params[k]);
    const r = await fetch(url, { method, cache: 'no-store',
      headers: { Authorization: 'Bearer ' + mk.developerToken, 'Music-User-Token': mk.musicUserToken } });
    if (!r.ok) throw { errorCode: r.status, message: r.statusText };
    return r.status === 202 || r.status === 204 ? null : r.json().catch(() => null);
  };

  // Favourites as Apple's site keeps them: personalRating 1. Adding also puts the song in the library.
  T.isFavorite = (id) => T.send('GET', '/v1/catalog/{sf}/songs', { ids: id, 'fields[songs]': 'personalRating' })
    .then((j) => !!(j && j.data && j.data[0] && j.data[0].attributes.personalRating === 1)).catch(() => false);
  T.setFavorite = (id, on) => T.send(on ? 'POST' : 'DELETE', '/v1/me/favorites', { 'ids[songs]': id });

  T.addToLibrary = async function (x) {
    const el = cur;
    T.busy(true, el);
    try {
      await T.send('POST', '/v1/me/library', { ['ids[' + x.type + ']']: x.id });
      T.forget('/v1/me/library');
      T.toast(T.t('Добавлено в медиатеку'));
    } catch (e) { T.toast(T.t('Не получилось добавить: ') + T.plain(e && (e.errorCode || e.message))); }
    finally { T.busy(false, el); }
  };

  // The bars on the Now Playing tab: grey and still unless music plays; then pink, and moving while
  // anyone may be looking: eight steps a second, only while the top bar is on screen and a key was
  // pressed in the last minute (music can play for hours with nobody at the TV). Each bar is a paused
  // animation whose clock is set (see mover in tv_player.js): no restyle of the page per step.
  const EQ_REST = [.55, 1, .73], EQ_HZ = [[1.31, .47], [.97, 1.61], [1.73, .59]];
  const eqBars = [...tabEls.now.querySelectorAll('.eq i')].map((el) => {
    const an = el.animate([{ transform: 'scaleY(.2)' }, { transform: 'scaleY(1)' }], { duration: 1000, fill: 'both' });
    an.pause();
    return (v) => { an.currentTime = (v - .2) / .8 * 1000; };          // v: .2…1 of the full height
  });
  eqBars.forEach((set, i) => set(EQ_REST[i]));
  let eqTimer = 0, eqLive = false, lastKey = Date.now();
  function eqStep() {
    clearTimeout(eqTimer);
    const mk = T.mk();
    const live = !!mk && mk.playbackState === 2 && T.visible && !tabEls.now.hidden && document.visibilityState !== 'hidden'
      && (!nav.classList.contains('ghost') || nav.classList.contains('has-focus')) && Date.now() - lastKey < 60000;
    if (live) {
      const t = performance.now() / 1000;
      eqBars.forEach((set, i) => set(.6 + .2 * Math.sin(2 * Math.PI * EQ_HZ[i][0] * t + i * 2.1) + .2 * Math.sin(2 * Math.PI * EQ_HZ[i][1] * t + i)));
      eqTimer = setTimeout(eqStep, 125);
    } else if (eqLive) eqBars.forEach((set, i) => set(EQ_REST[i]));
    eqLive = live;
  }
  const onVisibility = () => eqStep();
  document.addEventListener('visibilitychange', onVisibility);
  listeners.push(() => { document.removeEventListener('visibilitychange', onVisibility); clearTimeout(eqTimer); });

  // Now-playing marker on the tab; the tab itself stays out of the bar until music first plays.
  let played = false, awake = null;
  function onState() {
    const mk = T.mk();
    tabEls.now.classList.toggle('playing', !!mk && (mk.playbackState === 2 || mk.playbackState === 1));
    // While music plays (or is loading/buffering) the TV's screensaver stays away; paused, it may come.
    const on = !!mk && [1, 2, 6, 8].includes(mk.playbackState);
    if (on !== awake) { awake = on; try { native.playing && native.playing(on); } catch (e) {} }
    if (!played && mk && mk.playbackState === 2) played = true;
    tabEls.now.hidden = !played && tab !== 'now';
    eqStep();
  }
  T.on = function (ev, fn, s) {
    const mk = T.mk();
    mk.addEventListener(ev, fn);
    const off = () => mk.removeEventListener(ev, fn);
    (s ? s.off : listeners).push(off);
  };

  // Started from outside (MainActivity got `--es play <id>`, e.g. from a voice command): MainActivity
  // leaves the id in window.__amtvPlay; it plays once we are booted and signed in.
  T.playId = function (id) {
    const type = /^ra\./.test(id) ? 'stations' : /^pl\./.test(id) ? 'playlists' : /^p\./.test(id) ? 'library-playlists'
      : /^l\./.test(id) ? 'library-albums' : /^i\./.test(id) ? 'library-songs' : 'albums';
    return T.play({ id, type });
  };
  T.flushPlay = async function () {
    const id = window.__amtvPlay, mk = T.mk();
    if (!id || !T.booted || !mk || !mk.isAuthorized) return;
    delete window.__amtvPlay;
    try { native.played && native.played(); } catch (e) {}
    if (T.launching) return;                                  // the same command, delivered again
    T.launching = true;
    // A launch keeps the splash up (Java shows it again if we were already running) until it plays.
    const said = (t) => T.status(t);
    const onItem = () => { const n = mk.nowPlayingItem, a = (n && n.attributes) || {}; if (a.name || (n && n.title)) said(T.t('Загружаю «%s»…', a.name || n.title)); };
    const onState = () => { if (mk.playbackState === 1 || mk.playbackState === 8) said(T.t('Буферизую звук…')); };
    mk.addEventListener('nowPlayingItemDidChange', onItem);
    mk.addEventListener('playbackStateDidChange', onState);
    try { await launch(id, mk, said); } finally {
      mk.removeEventListener('nowPlayingItemDidChange', onItem);
      mk.removeEventListener('playbackStateDidChange', onState);
      T.launching = false;
      splashUp = false;
      lift();
    }
  };
  async function launch(id, mk, said) {
    if (!T.visible) T.show();
    // Right after load the official player is still restoring its last session and swallows a new
    // queue: wait until it is configured, then make sure ours took (loading/playing/waiting), retry.
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const going = () => [1, 2, 6, 8].includes(mk.playbackState);          // loading, playing, seeking, waiting
    try { await mk._whenConfigured; } catch (e) {}
    for (let i = 0; i < 3; i++) {
      said(i ? T.t('Пробую ещё раз…') : T.t('Включаю станцию…'));
      if (i || performance.now() < 20000) await sleep(i ? 2500 : 800);   // only a fresh page is still restoring
      said(/^ra\./.test(id) ? T.t('Получаю треки станции…') : T.t('Получаю треки…'));
      await Promise.race([T.playId(id), sleep(5000)]);                     // its promise can lag the music
      for (let k = 0; k < 20 && !going(); k++) await sleep(500);         // a cold radio stream takes a while
      if (going()) { T.calmNext = true; T.tab('now', true); return; }
    }
    T.toast(T.t('Не получилось включить'));
  }

  // Remote commands (MainActivity got `--es cmd …`, e.g. from the voice remote): the player, wherever we are.
  T.command = function (c) {
    const mk = T.mk();
    if (!mk) return;
    if (c === 'next') mk.skipToNextItem();
    else if (c === 'prev') { if (mk.currentPlaybackTime > 8) mk.seekToTime(0); else mk.skipToPreviousItem(); }
    else if (c === 'pause') mk.pause();
    else if (c === 'play') mk.play();
    else if (c === 'toggle') { if (mk.playbackState === 2) mk.pause(); else mk.play(); }
    else if (c === 'favorite' || c === 'unfavorite') {
      // «Мне нравится» adds; «мне не нравится» removes, and only if it was a favourite (else nothing).
      const np = mk.nowPlayingItem, a = (np && np.attributes) || {};
      const id = np && (np.songId || (a.playParams && a.playParams.catalogId) || (/^\d+$/.test(np.id) ? np.id : ''));
      if (!id) return c === 'favorite' && T.toast(T.t('Нечего добавить в избранное'));
      const fail = (e) => T.toast(T.t('Не получилось: ') + T.plain(e && (e.errorCode || e.message)));
      if (c === 'favorite') {
        T.setFavorite(id, true).then(() => { T.toast(T.t('Добавлено в избранное: ') + (a.name || '')); T.onFavorite && T.onFavorite(id, true); }).catch(fail);
      } else {
        T.isFavorite(id).then((on) => on && T.setFavorite(id, false).then(() => {
          T.toast(T.t('Убрано из избранного: ') + (a.name || ''));
          T.onFavorite && T.onFavorite(id, false);
        })).catch(fail);
      }
    }
  };

  // ---------------------------------------------------------------- show / hide / boot

  T.visible = false;
  T.show = function () {
    T.visible = true;
    tvMode(true);
    native.mode('tv');
    if (!tab) T.tab('home', true);
    else show(active(), !cur || !cur.isConnected);
  };
  T.hide = function () {
    T.visible = false;
    tvMode(false);
    native.mode('site');
    eqStep();
  };
  T.site = () => T.hide();                                  // the cursor + Apple's own page

  T.destroy = function () {
    for (const off of listeners) off();
    for (const k in stacks) for (const s of stacks[k]) drop(s);
    host.remove();
    hostCss.remove();
    modeCss.remove();
    tvMode(false);
    clearTimeout(toastTimer);
    delete window.__tv;
  };

  // The app's splash stays up until there is something real to look at (or a launched station plays).
  let splashUp = true;
  T.status = (text) => { try { native.status && native.status(text); } catch (e) {} };
  // Built is not painted: on this box the first frame of the interface takes a while. Lift the
  // splash only after two frames went out, or the site's own page shows through for a moment.
  const lift = () => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(() => native.ready && native.ready(), 50)));
  T.splashDone = function () {
    if (!splashUp || window.__amtvPlay || T.launching) return;
    splashUp = false;
    lift();
  };

  // MusicKit restores the sign-in from cookies only after it is configured ("auth reflection"):
  // deciding before that showed the sign-in screen for a moment and then rebuilt everything.
  async function settled(mk) {
    try { await mk._whenConfigured; } catch (e) {}
    if (mk.isAuthorized) return;
    await new Promise((resolve) => {
      let t = 0;
      const done = () => {
        clearTimeout(t);
        mk.removeEventListener('authReflectionDidComplete', done);
        mk.removeEventListener('authorizationStatusDidChange', done);
        resolve();
      };
      mk.addEventListener('authReflectionDidComplete', done);
      mk.addEventListener('authorizationStatusDidChange', done);
      t = setTimeout(done, 5000);
    });
  }

  // The first play after launch also loads Apple's hls.js, starts the Widevine module and opens fresh
  // TLS connections to the playback hosts (each costly through the tunnel): do all that up front.
  // Idle connections close after a minute or two, so this also runs when focus rests on a station.
  let warmedAt = 0;
  T.warmConnections = function () {
    if (Date.now() - warmedAt < 30e3) return;
    warmedAt = Date.now();
    document.head.querySelectorAll('link[data-amtv-warm]').forEach((l) => l.remove());
    for (const host of ['https://amp-api.music.apple.com', 'https://play.music.apple.com', 'https://play.itunes.apple.com',
      'https://aod-ssl.itunes.apple.com', 'https://universal-activity-service.itunes.apple.com']) {
      document.head.append(Object.assign(document.createElement('link'), { rel: 'preconnect', href: host, crossOrigin: 'anonymous' }));
      document.head.lastChild.setAttribute('data-amtv-warm', '');
    }
  };
  function warmUp() {
    T.warmConnections();
    fetch('/includes/js-cdn/hls.js/current/hls.js/hls.js', { credentials: 'same-origin' }).catch(() => {});
    if (navigator.requestMediaKeySystemAccess) {
      navigator.requestMediaKeySystemAccess('com.widevine.alpha', [{ initDataTypes: ['cenc'],
        audioCapabilities: [{ contentType: 'audio/mp4; codecs="mp4a.40.2"', robustness: 'SW_SECURE_CRYPTO' }] }])
        .then((a) => a.createMediaKeys()).then(() => perf('widevine warm')).catch(() => {});
    }
  }

  // A small log of how long playback takes to start (read with tools/cdp.mjs: __tv.perf).
  T.perf = [];
  const perf = (m) => { T.perf.push(Math.round(performance.now()) + ' ' + m); if (T.perf.length > 120) T.perf.shift(); };
  function watchStarts(mk) {
    for (const ev of ['playbackStateDidChange', 'nowPlayingItemDidChange', 'mediaCanPlay']) {
      T.on(ev, () => perf(ev + (ev === 'playbackStateDidChange' ? ' ' + mk.playbackState : '')));
    }
    const sq = mk.setQueue.bind(mk);
    mk.setQueue = (q) => { perf('setQueue ' + JSON.stringify(q).slice(0, 60)); return sq(q).then((r) => { perf('setQueue done'); return r; }); };
  }

  // Sign-in events and Apple's sign-in service answers (page.js) go to a small log kept across reloads.
  const diag = (e) => { try { window.__amtv && __amtv.diag && __amtv.diag(e); } catch (x) {} };
  const mkState = (mk) => ({ signedIn: !!mk.isAuthorized, previewOnly: !!mk.previewOnly,
    site: mk.storefrontId, account: mk.storefrontCountryCode });

  // The site opens in a storefront picked from the browser's language (US on most TVs), but MusicKit
  // plays only in the account's own: an account from India gets CONTENT_EQUIVALENT for everything.
  // MusicKit switches storefronts in place, so the screens are just built again; the app remembers it
  // and opens that storefront from the next start on (reopening the site only if the switch fails).
  const SF_KEY = 'amtv.account.storefront';
  async function checkStorefront(mk) {
    if (!mk.isAuthorized) return;
    try {
      const r = await T.send('GET', '/v1/me/storefront');
      const sf = String((r && r.data && r.data[0] && r.data[0].id) || '').toLowerCase();
      if (!/^[a-z]{2}$/.test(sf)) return;
      try { localStorage.setItem(SF_KEY, sf); } catch (e) {}
      const was = String(mk.storefrontId || '').toLowerCase();
      if (sf !== was) {
        diag({ ev: 'storefront', from: was, to: sf });
        try { mk.storefrontId = sf; } catch (e) {}
        if (String(mk.storefrontId).toLowerCase() === sf) rebuildScreens();
      }
      if (native.storefront) native.storefront(sf, String(mk.storefrontId || '').toLowerCase());
    } catch (e) {
      console.log('amtv storefront', e);
    }
  }
  // Catalog ids and editorial are per storefront: every screen but Now Playing is built again.
  function rebuildScreens() {
    cache.clear();
    for (const k of Object.keys(stacks)) {
      if (k === 'now') continue;
      for (const s of stacks[k]) drop(s);
      delete stacks[k];
    }
    if (tab !== 'now') { tab = null; if (T.visible && !signinEl) T.show(); }
  }
  // Before playing a launch command, the storefront must be right; checked first unless already known.
  async function storefrontThenPlay(mk) {
    let known = null;
    try { known = localStorage.getItem(SF_KEY); } catch (e) {}
    if (mk.isAuthorized && known !== String(mk.storefrontId || '').toLowerCase()) await checkStorefront(mk);
    else checkStorefront(mk);
    T.flushPlay();
  }

  // Apple can end a session later (its sign-in service refused it): MusicKit then quietly plays
  // 90-second previews. Back to the sign-in screen instead, saying so; a moment's grace first.
  let signinEl = null, outTimer = 0;
  function signedOut(mk) {
    if (mk.isAuthorized || signinEl) return;
    if (mk.playbackState === 2) mk.pause();
    T.signin();
    T.toast(T.t('Вход в Apple Music слетел — войдите снова'));
  }
  T.boot = async function () {
    const mk = T.mk();
    if (!mk) return setTimeout(T.boot, 300);
    if (T.booting) return;
    T.booting = true;
    T.status(T.t('Проверяю вход в Apple ID…'));
    await settled(mk);
    diag(Object.assign({ ev: 'start', path: location.pathname }, mkState(mk)));
    T.status(mk.isAuthorized ? T.t('Собираю главную…') : T.t('Нужен вход в Apple ID'));
    T.on('playbackStateDidChange', onState);
    onState();
    T.on('authorizationStatusDidChange', () => {
      diag(Object.assign({ ev: mk.isAuthorized ? 'signed-in' : 'signed-out' }, mkState(mk)));
      clearTimeout(outTimer);
      if (!mk.isAuthorized) { outTimer = setTimeout(() => signedOut(mk), 3000); return; }
      cache.clear();
      if (signinEl) { signinEl.remove(); signinEl = null; nav.hidden = false; T.toast(T.t('Вы вошли в Apple Music')); }
      T.show();
      storefrontThenPlay(mk);
    });
    T.on('authReflectionDidComplete', () => diag(Object.assign({ ev: 'session-cookies-done' }, mkState(mk))));
    T.booted = true;
    try { performance.setResourceTimingBufferSize(4000); } catch (e) {}   // for diagnosing slow starts
    watchStarts(mk);
    setTimeout(warmUp, 2500);
    [0, 3000, 8000, 15000].forEach((ms) => setTimeout(T.paintIcons, ms));
    if (mk.isAuthorized) T.show();
    else T.signin();
    storefrontThenPlay(mk);
  };

  // For a bug report, from DevTools: copy(__tv.diag()). What the app knows about the sign-in and the
  // storefront, the log above and Apple requests that failed. No tokens, cookie values or personal data.
  T.diag = function () {
    const mk = T.mk() || {};
    const ua = navigator.userAgentData;
    const failed = performance.getEntriesByType('resource')
      .filter((e) => e.responseStatus >= 400 && /\.apple\.com\//.test(e.name))
      .slice(-20).map((e) => e.responseStatus + ' ' + e.name.replace(/\?.*/, ''));
    const log = (window.__amtv && __amtv.diagLog && __amtv.diagLog()) || [];
    return [
      'AMTV ' + (window.__amtvVersion || '?') + ' · ' + location.pathname + ' · up ' + Math.round(performance.now() / 1000) + ' s',
      'browser: ' + navigator.userAgent,
      'client hints: ' + (ua ? ua.platform + ', mobile=' + ua.mobile + ', ' + ua.brands.map((b) => b.brand + ' ' + b.version).join(' / ') : 'none'),
      'languages: ' + (navigator.languages || []).join(', '),
      'musickit: ' + JSON.stringify(Object.assign(mkState(mk), { hasUserToken: !!mk.musicUserToken, playbackState: mk.playbackState })),
      'cookies (names only): ' + document.cookie.split(';').map((c) => c.trim().split('=')[0]).filter(Boolean).join(', '),
      'log:',
      ...log.map((e) => '  ' + JSON.stringify(e)),
      'failed Apple requests (this page): ' + (failed.length ? '' : 'none'),
      ...failed.map((f) => '  ' + f),
    ].join('\n');
  };

  // Not signed in: one big button that hands over to Apple's own sign-in on the site (cursor mode).
  T.signin = function () {
    T.visible = true;
    tvMode(true);
    native.mode('tv');
    const s = { name: 'signin', el: h('div', 'screen full'), page: h('div', 'page'), off: [] };
    s.el.append(s.page);
    for (const el of stage.children) el.hidden = true;
    stage.append(s.el);
    signinEl = s.el;
    nav.hidden = true;
    s.page.append(h('h1', { style: 'margin-top:150px;text-align:center' }, 'Apple Music'),
      h('div', { class: 'msg', style: 'text-align:center' }, T.t('Откроется вход Apple: ↑ ↓ — выбрать поле или кнопку, OK — ввести или нажать.')),
      h('div', { class: 'row', style: 'display:flex;justify-content:center' },
        h('div', { class: 'btn red f', onok: () => { T.hide(); T.mk().authorize().catch(() => {}); } }, T.t('Войти'))));
    T.focus(s.page.querySelector('.f'));
    T.splashDone();
  };

  // Started by tv_player.js, the last file: by then every screen builder is registered.
})();
