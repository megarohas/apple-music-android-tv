<div align="center">

<img src="docs/icon.png" width="96" alt="Icône AMTV">

# AMTV — Apple Music pour Android TV et Google TV

**Une appli Apple Music non officielle pour Android TV, Google TV, Xiaomi Mi Box, Chromecast avec Google TV, NVIDIA Shield et les autres boîtiers TV sous Android, faite pour la télécommande.**

[![Télécharger l’APK](https://img.shields.io/github/v/release/megarohas/apple-music-android-tv?label=T%C3%A9l%C3%A9charger%20l%E2%80%99APK&color=fa233b&style=for-the-badge)](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)
&nbsp;
[![Licence : MIT](https://img.shields.io/badge/licence-MIT-333?style=for-the-badge)](LICENSE)

[English](README.md) · [Deutsch](README.de.md) · [Español](README.es.md) · **Français** · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

[Installation en 5 minutes](#installation) · [La télécommande](#utilisation-avec-la-télécommande) · [Questions fréquentes](#questions-fréquentes) · [Fonctionnement](#fonctionnement)

<img src="docs/screenshots/now_controls.jpg" width="820" alt="L’écran Lecture en cours d’AMTV sur une TV">

</div>

---

## C’est quoi ?

Il n’existe **pas d’appli Apple Music officielle pour Android TV / Google TV**. On peut installer à la main l’appli Android pour téléphone, mais elle est faite pour l’écran tactile et pénible à la télécommande. On peut aussi diffuser depuis un téléphone, mais c’est alors le téléphone qui sert de télécommande.

**AMTV** donne à votre TV une vraie appli Apple Music :

- vous vous connectez **une seule fois** avec votre Apple ID, sur la page de connexion d’Apple ;
- vous parcourez **Accueil, Explorer, Radio, Bibliothèque et Rechercher** avec les flèches de la télécommande ;
- vous appuyez sur OK et la musique démarre, avec un écran **Lecture en cours** sobre et plein écran.

Elle est gratuite, open source et ne contient **aucun bidouillage** : elle fait tourner le **lecteur web officiel d’Apple** ([music.apple.com](https://music.apple.com)) et ajoute seulement par-dessus une interface adaptée à la TV. La lecture, les DRM et votre compte restent chez Apple.

> Il faut un **abonnement Apple Music**. AMTV n’est ni affiliée à Apple ni approuvée par Apple.

## Captures d’écran

| | |
|:---:|:---:|
| <img src="docs/screenshots/browse.jpg" alt="Explorer : les sélections éditoriales d’Apple Music sur une TV"> | <img src="docs/screenshots/radio.jpg" alt="Radio : les stations en direct Apple Music 1, Hits et Country"> |
| **Explorer** — les sélections d’Apple, nouveautés, classements | **Radio** — Apple Music 1, Hits, Country et émissions |
| <img src="docs/screenshots/now_calm.jpg" alt="Lecture en cours : pochette, titre et artiste seulement"> | <img src="docs/screenshots/now_lyrics.jpg" alt="Lecture en cours avec les paroles synchronisées mot à mot"> |
| **Lecture en cours** — vue sobre, les commandes apparaissent à n’importe quelle touche | **Paroles** — mot à mot, désactivées par défaut |
| <img src="docs/screenshots/album.jpg" alt="Page d’album avec la liste des morceaux et les boutons Lire / Aléatoire"> | <img src="docs/screenshots/artist.jpg" alt="Page d’artiste avec biographie et meilleurs morceaux"> |
| **Album** — morceaux populaires repérés, Lire / Aléatoire | **Artiste** — biographie, meilleurs morceaux, albums, artistes similaires |
| <img src="docs/screenshots/search.jpg" alt="Résultats de recherche d’artistes et de morceaux"> | <img src="docs/screenshots/menu.jpg" alt="Menu OK maintenu : Lire ensuite, Lire en dernier, Ajouter à la bibliothèque"> |
| **Rechercher** — avec le clavier à l’écran de la TV | **OK maintenu** — Lire ensuite, Lire en dernier, Ajouter à la bibliothèque, Station |
| <img src="docs/screenshots/settings.jpg" alt="Réglages : mode site web, langue, déconnexion"> | <img src="docs/screenshots/splash.jpg" alt="Écran de démarrage qui indique ce qui se charge"> |
| **Réglages** — langue, mode site web, déconnexion | **Écran de démarrage** — indique ce qu’il fait |

*Les captures montrent l’interface en anglais ; sur une TV en français, elle est en français.*

## Fonctions

- 🎛️ **Faite pour la télécommande** — les flèches passent d’une carte à l’autre, OK lance ou ouvre, Retour revient en arrière. Chaque rangée retient où vous étiez.
- 🏠 **Accueil** — vos recommandations : playlists *Pour vous*, écoutes récentes, stations pour vous, nouveautés.
- 🧭 **Explorer et Radio** — les sélections éditoriales d’Apple, les classements, la radio en direct (Apple Music 1, Hits, Country…) et les émissions.
- 📚 **Bibliothèque** — ajouts récents, playlists, albums, artistes, morceaux.
- 🔍 **Rechercher** — artistes, morceaux, albums, playlists et stations, avec l’historique de recherche.
- 💿 **Pages d’album, de playlist et d’artiste** — Lire, Aléatoire, Ajouter à la bibliothèque ; les morceaux populaires sont repérés comme dans Apple Music.
- 🎵 **Lecture en cours** — grande pochette, transitions douces entre les morceaux, fond teinté par la pochette ; les commandes se cachent toutes seules, **←/→ changent de morceau** quand elles sont cachées, et l’avance dans le morceau se fait avec un curseur fluide. Les titres longs défilent ; la pochette, le titre, l’artiste et l’horloge dérivent lentement, tous ensemble, pour que rien ne marque l’écran. L’écran de veille de la TV ne se lance pas pendant la musique, et les barres de l’onglet Lecture en cours bougent tant qu’elle joue.
- ⭐ **Favoris** — l’étoile du lecteur (la même que ⭐ dans Apple Music).
- 📝 **Paroles** — les paroles d’Apple Music synchronisées mot à mot (activez-les avec le bouton paroles du lecteur).
- 🗣️ **Commandes vocales et automatisation** — lancer une station ou changer de morceau depuis l’extérieur de l’appli (voir [Automatisation](#assistants-vocaux-et-automatisation)) ; marche avec la télécommande vocale open source [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice).
- 🌐 **Neuf langues d’interface** — English, Deutsch, Español, Français, Português, Русский, हिन्दी, 日本語 et 简体中文. Elle suit la langue de la TV ; Réglages → Langue les liste toutes, chacune sous son propre nom.
- 🐢 **Rapide sur les petits boîtiers** — réglée sur une Xiaomi TV Box S (4×Cortex-A55, Mali-G31, 2 Go de RAM) : processeur à ≈ 0 % au repos, pas d’animations sans fin, rien de téléchargé en arrière-plan.
- 🖱️ **Mode site web** — le site Apple Music complet avec un pointeur à l’écran, pour tout ce que l’interface TV ne fait pas encore.

## Installation

### Ce qu’il faut

- Un appareil **Android TV / Google TV** sous **Android 10 ou plus récent** (boîtiers, clés, TV sous Android TV / Google TV).
- Un **abonnement Apple Music** et votre **Apple ID**.
- 5 minutes.

### Méthode 1 — avec l’appli gratuite « Downloader » (la plus simple, sans ordinateur)

1. Sur la TV, ouvrez **Google Play** et installez **Downloader** (de AFTVnews).
2. Autorisez-la à installer des applis : **Paramètres → Applis → Sécurité et restrictions → Sources inconnues → Downloader → Activé**
   *(le chemin change un peu d’une TV à l’autre ; cherchez « Sources inconnues » dans les Paramètres)*.
3. Ouvrez **Downloader**, tapez cette adresse et appuyez sur **Go** :
   ```
   https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk
   ```
4. À la fin du téléchargement, appuyez sur **Installer**, puis sur **Ouvrir**.

### Méthode 2 — envoyer le fichier depuis un téléphone ou un ordinateur

1. Téléchargez [`amtv.apk`](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk).
2. Envoyez-le sur la TV avec une appli comme **Send Files to TV**, **LocalSend**, ou une clé USB.
3. Ouvrez-le sur la TV avec un gestionnaire de fichiers et appuyez sur **Installer** (autorisez les « Sources inconnues » pour ce gestionnaire de fichiers quand la TV le demande).

### Méthode 3 — ADB (pour les bricoleurs)

```bash
adb connect <IP-de-la-TV>:5555
adb install amtv.apk
```

### Premier lancement

1. Ouvrez **AMTV** depuis la rangée des applis (tuile rouge avec une note de musique).
2. Appuyez sur **Se connecter** : la page de connexion d’Apple s’ouvre, adaptée à la télécommande. **↑ / ↓** choisissent un champ ou un bouton (cadre rouge), **OK** sur un champ ouvre le clavier à l’écran, **OK** sur un bouton l’active. Tapez votre Apple ID → Continuer → mot de passe → Se connecter. Les codes de double authentification arrivent sur votre iPhone / Mac comme d’habitude.
   > Astuce : l’appli **Google TV** du téléphone sert de clavier pour la TV ; vous pouvez y coller votre mot de passe depuis un gestionnaire de mots de passe.
3. C’est fini : AMTV passe à l’interface TV. Vous restez connecté ; la fois suivante, elle s’ouvre directement sur l’Accueil.

> Votre mot de passe est tapé **uniquement dans la page d’Apple** (`idmsa.apple.com`). AMTV ne le voit jamais et ne l’enregistre pas.

## Utilisation avec la télécommande

| Touche | Ce qu’elle fait |
|---|---|
| **← ↑ → ↓** | Passer d’une carte, d’une rangée ou de la barre du haut à l’autre. Les onglets s’ouvrent dès que vous arrivez dessus. |
| **→ en fin de rangée / ← en début de rangée** | Passer à l’onglet suivant / précédent (depuis l’Accueil, **←** va directement à Lecture en cours). |
| **OK** | Lancer un morceau ou une station, ouvrir un album / une playlist / un artiste. |
| **OK maintenu** | Menu : Lire, Aléatoire, Lire ensuite, Lire en dernier, Ajouter à la bibliothèque, Créer une station. |
| **Retour** | Page précédente → Accueil → quitte l’appli (la musique se met en pause). |
| **Lecture/Pause, Suivant, Précédent** (si la télécommande les a) | Commandent la musique partout dans l’appli. |

Dans **Lecture en cours** :

| Touche | Ce qu’elle fait |
|---|---|
| n’importe quelle touche | Affiche les commandes (elles se cachent après quelques secondes) |
| **← / →** quand les commandes sont cachées | Morceau précédent / suivant |
| **↓** jusqu’à la barre de progression, puis **← / →** | Avance ou recule de 10 s par appui (un seul saut fluide quand vous arrêtez) |
| ⭐ | Ajouter aux favoris / retirer des favoris |
| bouton paroles | Paroles activées / désactivées |

## Assistants vocaux et automatisation

AMTV accepte des commandes simples sous forme d’intents Android : une télécommande vocale, un outil du genre Tasker ou un script peuvent la piloter :

```bash
# lancer une station / playlist / un album (ouvre l’appli si besoin, affiche le lecteur quand la musique démarre)
adb shell am start -n com.megarohas.amtv/.MainActivity --es play ra.978194965      # Apple Music 1
adb shell am start -n com.megarohas.amtv/.MainActivity --es play pl.<id-de-playlist>

# commander le lecteur
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd next        # next | prev | pause | play | toggle
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd favorite    # ⭐ ajoute le morceau en cours
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd unfavorite  # le retire (ne fait rien s’il n’est pas en favori)
```

Les identifiants sont ceux des liens Apple Music (`music.apple.com/…/playlist/…/pl.xxxx`, stations `ra.…`, les albums sont des nombres). La télécommande vocale [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) s’en sert exactement ainsi : *« Remote, play music »* réveille le boîtier TV, ouvre AMTV et lance votre station.

## Questions fréquentes

<details><summary><b>Existe-t-il une appli Apple Music officielle pour Android TV / Google TV ?</b></summary>

Non (en 2026). Apple propose Apple Music sur les téléphones Android et sur certaines TV connectées (Samsung, LG), mais pas sur les boîtiers Android TV / Google TV. AMTV comble ce manque avec le lecteur web d’Apple.
</details>

<details><summary><b>Est-ce légal ? Est-ce que ça casse les DRM ?</b></summary>

AMTV ne contourne **pas** les DRM et n’extrait aucun jeton. La musique passe par le lecteur web officiel d’Apple avec le Widevine intégré à la TV, exactement comme dans un navigateur d’ordinateur sur music.apple.com. Il faut votre propre abonnement payant. AMTV est un projet indépendant et non officiel.
</details>

<details><summary><b>Est-ce que ça marchera sur mon boîtier TV / ma Fire TV ?</b></summary>

Elle est testée sur une **Xiaomi TV Box S (2e génération), Google TV, Android 14**. Elle devrait marcher sur tout appareil Android TV / Google TV sous Android 10+ avec Widevine (c’est le cas de presque tous les appareils certifiés : Chromecast avec Google TV, NVIDIA Shield, Mi Box, Onn, TV sous Google TV). On nous l’a aussi signalée fonctionnelle sur une TV Changhong (Android 11) et une Sony Bravia (Android TV 12). La Fire TV n’a pas été testée : les retours sont les bienvenus.
</details>

<details><summary><b>Lossless, Dolby Atmos, clips vidéo ?</b></summary>

AMTV lit ce que lit le lecteur web d’Apple : de l’AAC haute qualité. Le lossless et le Dolby Atmos ne sont pas disponibles sur le web. Les clips vidéo ne sont pas encore pris en charge.
</details>

<details><summary><b>Pourquoi le tout premier lancement prend-il ~10 secondes ?</b></summary>

L’appli charge le lecteur web d’Apple et rétablit votre connexion ; l’écran de démarrage indique ce qu’il fait. Lancer une station prend quelques secondes, car le lecteur d’Apple récupère les morceaux de la station, une licence de lecture et le début de l’audio avant de jouer. La navigation ensuite est mise en cache et rapide.
</details>

<details><summary><b>La musique continue-t-elle quand je quitte l’appli ?</b></summary>

Elle se met en pause quand vous quittez l’appli (bouton Accueil, autre appli), et continue sous l’écran de veille de la TV.
</details>

<details><summary><b>Le contenu est celui d’un autre pays</b></summary>

Apple Music affiche le catalogue du pays de votre Apple ID. Avant la connexion, le site peut deviner un pays d’après votre adresse IP.
</details>

## Dépannage

| Problème | Essayez ceci |
|---|---|
| Bloquée sur l’écran de démarrage | Vérifiez la connexion internet ; l’écran de démarrage abandonne au bout de 30 s et affiche le site. |
| « Connexion nécessaire » à chaque fois | Vérifiez que la date et l’heure de la TV sont justes ; reconnectez-vous depuis Réglages → Mode site web. |
| Pas de son, ou « Impossible de lancer la lecture » | L’appareil doit avoir Widevine (toutes les TV certifiées Google l’ont). Vérifiez que votre abonnement est actif sur music.apple.com. |
| Le pointeur apparaît au lieu de l’interface TV | Appuyez sur **Retour** : il ramène du mode site web à l’interface TV. |
| Quelque chose cloche après une mise à jour | Réglages → **Actualiser les données**, ou effacez les données de l’appli dans les paramètres Android (il faudra se reconnecter). |

## Fonctionnement

```
┌────────────────── AMTV (appli Android) ──────────────────┐
│  WebView ── music.apple.com (lecteur web d’Apple)        │
│    │          ├── MusicKit JS : votre session connectée  │
│    │          └── <audio> + Widevine : la lecture        │
│    └── interface TV (HTML/CSS/JS dans un shadow DOM)     │
│           données  ← API MusicKit (amp-api)              │
│           lecture  → MusicKit setQueue / play            │
│  Touches ─► MainActivity ─► l’interface TV               │
│  Intents (--es play / --es cmd) ─► le lecteur            │
└──────────────────────────────────────────────────────────┘
```

- **Pas d’astuce DRM, pas d’extraction de jeton.** L’interface interroge l’API d’Apple par la session MusicKit déjà connectée de la page et lance la lecture avec MusicKit, comme le fait le site.
- **La page d’Apple reste chargée mais cachée** (`display: none`) : c’est elle qui possède le lecteur. AMTV la garde sur une page sans pochette animée et refuse les requêtes qu’elle ne ferait que pour elle-même (vidéo des pochettes animées, ses propres vignettes, statistiques) : sur un boîtier lent, c’est la différence entre une station qui démarre en 20 s et en 4 s.
- **Faite pour les GPU modestes** — pas de filtres de flou ni d’animations sans fin ; le fond de Lecture en cours est un canvas flouté de 64×36 peint une fois par morceau puis étiré ; les paroles avancent sur des minuteurs calés sur le mot suivant, pas sur une boucle par image ; la dérive, le titre qui défile et la barre de progression partagent un seul tic de 10 par seconde et bougent par des animations en pause, donc un pas ne force jamais la page à recréer ses calques ; les barres de l’onglet Lecture en cours avancent quelques pas par seconde, seulement pendant la musique et quand la barre du haut est à l’écran, et s’arrêtent après une minute sans appui sur une touche ; la page cachée d’Apple n’a pas le droit d’animer quoi que ce soit.
- **Temps exact** — MusicKit donne le temps à la seconde entière ; la barre de progression et le compteur suivent le temps exact du lecteur, donc ils ne reculent jamais.
- **Navigation à la télécommande** — un petit moteur de focus : des rangées d’éléments focalisables, la mémoire de chaque rangée, des étagères qui glissent avec `transform`, le passage à l’onglet voisin depuis les bords, et un pointeur de souris pour le mode site web.

Plan du code :

| Chemin | Contenu |
|---|---|
| `src/com/megarohas/amtv/MainActivity.java` | WebView, écran de démarrage, routage des touches, intents, filtre des requêtes |
| `src/com/megarohas/amtv/Cursor.java` | le pointeur à l’écran du mode site web |
| `res/raw/page.js` | petites corrections injectées dans la page d’Apple |
| `res/raw/tv_i18n.js` | les traductions de l’interface : une table par langue, indexée par les originaux russes |
| `res/raw/tv_core.js` | l’interface TV : moteur de focus, onglets, fonctions d’API, lecture |
| `res/raw/tv_screens.js` | Accueil, Explorer, Radio, Bibliothèque, Rechercher, Réglages, album / playlist / artiste |
| `res/raw/tv_player.js` | Lecture en cours : fond, paroles, avance dans le morceau, favoris |
| `res/raw/signin.js` | la page de connexion d’Apple adaptée à la télécommande : cadre de focus, flèches, OK ouvre le clavier (présentation seulement, il ne lit jamais ce que vous tapez) |
| `res/values*/strings.xml` | les lignes de l’écran de démarrage dans chaque langue |
| `res/raw/brand.js` | réglages de marque (icônes, police) : le seul fichier qu’une version personnalisée remplace |
| `tools/cdp.mjs` | outil Chrome DevTools : inspecter et recharger à chaud l’interface sur une vraie TV |

## Compiler depuis les sources

Pas de Gradle : le Makefile appelle directement les outils du SDK Android ; une compilation prend quelques secondes.

Prérequis : **SDK Android** (build-tools 36.0.0, plateforme `android-36`), **JDK 17 ou plus récent**, `make`, `adb`.

```bash
git clone https://github.com/megarohas/apple-music-android-tv.git
cd apple-music-android-tv
make                                   # → build/amtv.apk (signé avec votre clé de debug)
make install TV=192.168.1.50:5555      # boîtier TV connecté en adb ; ou mettez `TV = …` dans local.mk
make start

make dev-install && make dev-start    # une appli « AMTV Dev » séparée à côté (sa propre connexion et ses données) pour tester
```

Les chemins peuvent être changés : `make SDK=/chemin/vers/sdk BT=$SDK/build-tools/36.0.0`.

Développer sur une vraie TV sans réinstaller :

```bash
make devtools                                  # redirige les DevTools de la WebView vers localhost:9222
node tools/cdp.mjs run res/raw/tv_i18n.js res/raw/tv_core.js res/raw/tv_screens.js res/raw/tv_player.js
node tools/cdp.mjs eval '__tv.boot()'          # interface rechargée à chaud
node tools/cdp.mjs shot screen.png             # ou inspectez dans chrome://inspect
```

Une marque personnalisée (vos icônes et votre police) va dans `res/raw/brand.js` et `assets/fonts/` : voir les commentaires de ce fichier.

### Ajouter une langue

1. `res/raw/tv_i18n.js` — copiez la table anglaise, traduisez les valeurs et ajoutez la langue à `LANGS` (son code et son nom dans la langue même).
2. `res/values-<code>/strings.xml` — les sept lignes de l’écran de démarrage.
3. `res/raw/signin.js` — la ligne d’aide pour la télécommande sur la page de connexion d’Apple.
4. Si vous voulez, `README.<code>.md`, avec un lien dans la ligne des langues en tête de chaque README.

Gardez des textes à peu près aussi longs que l’anglais : la barre du haut et le lecteur ont peu de place. Ensuite `make`, et passez par tous les onglets sur une TV.

## Remerciements

- [**JObersi10/apple-music-tv**](https://github.com/JObersi10/apple-music-tv) — un client Apple Music natif pour Android TV, dont les recherches sur l’API web d’Apple (les adresses pour Accueil, Explorer, Radio, paroles, favoris) et les idées d’interface TV ont beaucoup aidé. Aucun code n’a été copié. Ce projet déchiffre lui-même les flux ; AMTV ne le fait volontairement pas et laisse le lecteur d’Apple s’occuper de la lecture.
- [**Material Icons**](https://github.com/google/material-design-icons) (Apache License 2.0) — la base du jeu d’icônes d’AMTV. Voir [NOTICE](NOTICE).
- **Traductions** — le français par [NeoNathoon](https://github.com/NeoNathoon). Les autres langues n’ont pas encore été relues par des locuteurs natifs : les corrections sont bienvenues en pull request.
- **Apple MusicKit on the Web** — le lecteur et l’API d’Apple avec lesquels AMTV communique.

## Mentions légales

AMTV est un projet open source indépendant, **ni affilié à Apple Inc., ni autorisé, ni approuvé par Apple Inc.** Apple, Apple Music et Apple ID sont des marques d’Apple Inc., citées ici seulement pour décrire ce avec quoi l’appli fonctionne. AMTV n’inclut ni les polices, ni les icônes, ni les logos d’Apple, ne modifie ni ne contourne les DRM, et demande un abonnement Apple Music valide. Les pochettes d’albums des captures d’écran appartiennent à leurs propriétaires et servent d’illustration.

## Licence

[MIT](LICENSE) © 2026 megarohas
