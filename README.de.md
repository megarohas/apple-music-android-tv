<div align="center">

<img src="docs/icon.png" width="96" alt="AMTV-Symbol">

# AMTV – Apple Music für Android TV und Google TV

**Eine inoffizielle Apple Music-App für Android TV, Google TV, Xiaomi Mi Box, Chromecast with Google TV, NVIDIA Shield und andere TV-Boxen mit Android – gemacht für die Fernbedienung.**

[![APK herunterladen](https://img.shields.io/github/v/release/megarohas/apple-music-android-tv?label=APK%20herunterladen&color=fa233b&style=for-the-badge)](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)
&nbsp;
[![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-333?style=for-the-badge)](LICENSE)

[English](README.md) · **Deutsch** · [Español](README.es.md) · [Français](README.fr.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

[Installation in 5 Minuten](#installation) · [Fernbedienung](#bedienung-mit-der-fernbedienung) · [Häufige Fragen](#häufige-fragen) · [So funktioniert es](#so-funktioniert-es)

<img src="docs/screenshots/now_controls.jpg" width="820" alt="AMTV-Bildschirm „Jetzt läuft“ auf einem Fernseher">

</div>

---

## Was ist das?

Es gibt **keine offizielle Apple Music-App für Android TV / Google TV**. Apples Android-App für Smartphones lässt sich zwar per Sideloading installieren, ist aber für Touchscreens gebaut und mit der Fernbedienung eine Qual. Vom Smartphone aus zu casten funktioniert, aber dann ist dein Smartphone die Fernbedienung.

**AMTV** gibt deinem Fernseher eine richtige Apple Music-App:

- du meldest dich **einmal** mit deiner Apple ID an, auf Apples eigener Anmeldeseite;
- du bewegst dich mit den Pfeiltasten deiner Fernbedienung durch **Startseite, Entdecken, Radio, Mediathek und Suchen**;
- du drückst OK und die Musik läuft, mit der ruhigen Vollbildansicht **Jetzt läuft**.

AMTV ist kostenlos, Open Source und enthält **keine Hacks**: Unter der Haube läuft **Apples offizieller Webplayer** ([music.apple.com](https://music.apple.com)), AMTV legt nur eine fernsehtaugliche Oberfläche darüber. Wiedergabe, DRM und dein Account bleiben bei Apple.

> Du brauchst ein **Apple Music-Abo**. AMTV ist weder mit Apple verbunden noch von Apple befürwortet.

## Screenshots

| | |
|:---:|:---:|
| <img src="docs/screenshots/browse.jpg" alt="Entdecken: redaktionelle Rubriken von Apple Music auf einem Fernseher"> | <img src="docs/screenshots/radio.jpg" alt="Radio: die Live-Sender Apple Music 1, Hits und Country"> |
| **Entdecken** – Apples redaktionelle Auswahl, neue Musik, Charts | **Radio** – Apple Music 1, Hits, Country und Sendungen |
| <img src="docs/screenshots/now_calm.jpg" alt="Jetzt läuft: nur Cover, Titel und Künstler"> | <img src="docs/screenshots/now_lyrics.jpg" alt="Jetzt läuft mit wortgenau synchronisierten Liedtexten"> |
| **Jetzt läuft** – ruhige Ansicht, die Steuerelemente erscheinen bei jedem Tastendruck | **Liedtexte** – Wort für Wort, standardmäßig aus |
| <img src="docs/screenshots/album.jpg" alt="Albumseite mit Titelliste und den Buttons Wiedergeben/Zufällig"> | <img src="docs/screenshots/artist.jpg" alt="Künstlerseite mit Biografie und Top-Titeln"> |
| **Album** – beliebte Titel markiert, Wiedergeben / Zufällig | **Künstler** – Biografie, Top-Titel, Alben, ähnliche Künstler:innen |
| <img src="docs/screenshots/search.jpg" alt="Suchergebnisse für Künstler und Titel"> | <img src="docs/screenshots/menu.jpg" alt="Menü bei gedrückt gehaltenem OK: Nächster Titel, Zuletzt wiedergeben, Zur Mediathek hinzufügen"> |
| **Suchen** – mit der Bildschirmtastatur des Fernsehers | **OK gedrückt halten** – Nächster Titel, Zuletzt wiedergeben, Zur Mediathek hinzufügen, Sender erstellen |
| <img src="docs/screenshots/settings.jpg" alt="Einstellungen: Website-Modus, Sprache, Abmelden"> | <img src="docs/screenshots/splash.jpg" alt="Ladebildschirm, der zeigt, was gerade geladen wird"> |
| **Einstellungen** – Sprache, Website-Modus, Abmelden | **Ladebildschirm** – zeigt, was gerade passiert |

*Die Screenshots zeigen die englische Oberfläche; auf einem Fernseher mit deutscher Systemsprache ist sie auf Deutsch.*

## Funktionen

- 🎛️ **Gemacht für die Fernbedienung** – mit den Pfeiltasten geht es von Karte zu Karte, OK spielt ab oder öffnet, „Zurück“ geht zurück. Der Fokus merkt sich in jeder Reihe, wo du warst.
- 🏠 **Startseite** – deine persönlichen Empfehlungen: Playlists *Für dich zusammengestellt*, zuletzt gespielt, Sender für dich, Neuerscheinungen.
- 🧭 **Entdecken und Radio** – Apples redaktionelle Rubriken, Charts, Live-Radio (Apple Music 1, Hits, Country …) und Radiosendungen.
- 📚 **Mediathek** – zuletzt hinzugefügt, Playlists, Alben, Künstler, Titel.
- 🔍 **Suchen** – Künstler, Titel, Alben, Playlists und Sender, mit Suchverlauf.
- 💿 **Album-, Playlist- und Künstlerseiten** – Wiedergeben, Zufällig, Zur Mediathek hinzufügen; beliebte Titel sind wie in Apple Music markiert.
- 🎵 **Jetzt läuft** – großes Cover, sanfte Titelwechsel, Hintergrund in den Farben des Covers; die Steuerelemente blenden sich von selbst aus, **←/→ wechseln den Titel**, solange sie ausgeblendet sind, Spulen mit einem flüssigen Regler. Lange Titel laufen als Lauftext durch; Cover, Titel, Künstler und Uhr schweben langsam gemeinsam, damit sich nichts in den Bildschirm einbrennt. Der Bildschirmschoner des Fernsehers bleibt aus, solange Musik läuft, und die Balken auf dem Tab „Jetzt läuft“ bewegen sich dabei.
- ⭐ **Favoriten** – der Stern im Player (wie ⭐ in Apple Music).
- 📝 **Liedtexte** – Wort für Wort synchronisierte Liedtexte aus Apple Music (schalte sie mit der Liedtext-Taste im Player ein).
- 🗣️ **Schnittstellen für Sprache und Automatisierung** – Sender starten oder Titel überspringen, von außerhalb der App (siehe [Automatisierung](#sprachassistenten-und-automatisierung)); funktioniert mit der Open-Source-Sprachfernbedienung [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice).
- 🌐 **Oberfläche in neun Sprachen** – English, Deutsch, Español, Français, Português, Русский, हिन्दी, 日本語 und 简体中文. Die App folgt der Sprache des Fernsehers; unter Einstellungen → Sprache stehen alle, jede unter ihrem eigenen Namen.
- 🐢 **Schnell auf schwachen TV-Boxen** – optimiert auf einer Xiaomi TV Box S (4×Cortex-A55, Mali-G31, 2 GB RAM): CPU im Leerlauf ≈ 0 %, keine Endlosanimationen, keine Downloads im Hintergrund.
- 🖱️ **Website-Modus** – die komplette Apple Music-Website mit Bildschirmzeiger, für alles, was die TV-Oberfläche noch nicht kann.

## Installation

### Was du brauchst

- Ein Gerät mit **Android TV / Google TV** und **Android 10 oder neuer** (TV-Boxen, Sticks, Fernseher mit Android TV / Google TV).
- Ein **Apple Music-Abo** und deine **Apple ID**.
- 5 Minuten.

### Variante 1 – mit der kostenlosen App „Downloader“ (am einfachsten, ohne Computer)

1. Öffne auf dem Fernseher **Google Play** und installiere **Downloader** (von AFTVnews).
2. Erlaube Downloader, Apps zu installieren: **Einstellungen → Apps → Sicherheit & Einschränkungen → Unbekannte Herkunft → Downloader → An**
   *(der Pfad unterscheidet sich je nach Fernseher etwas; suche in den Einstellungen nach „Unbekannte Herkunft“ oder „Unbekannte Quellen“)*.
3. Öffne **Downloader**, gib diese Adresse ein und drücke **Go**:
   ```
   https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk
   ```
4. Wenn der Download fertig ist, drücke **Installieren** und dann **Öffnen**.

### Variante 2 – die Datei vom Smartphone oder Computer schicken

1. Lade [`amtv.apk`](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk) herunter.
2. Schick sie mit einer App wie **Send Files to TV**, **LocalSend** oder per USB-Stick an den Fernseher.
3. Öffne sie auf dem Fernseher mit einem Dateimanager und drücke **Installieren** (erlaube diesem Dateimanager „Unbekannte Herkunft“, wenn du gefragt wirst).

### Variante 3 – ADB (zum Basteln)

```bash
adb connect <TV-IP>:5555
adb install amtv.apk
```

### Erster Start

1. Öffne **AMTV** in der App-Reihe (rote Kachel mit Musiknote).
2. Drücke **Anmelden** – Apples eigene Anmeldeseite öffnet sich, angepasst an die Fernbedienung: **↑ / ↓** wählen ein Feld oder einen Button (roter Rahmen), **OK** auf einem Feld öffnet die Bildschirmtastatur, **OK** auf einem Button drückt ihn. Gib deine Apple ID ein → Weiter → Passwort → Anmelden. Codes für die Zwei-Faktor-Authentifizierung kommen wie gewohnt auf dein iPhone / deinen Mac.
   > Tipp: Die App **Google TV** auf deinem Smartphone funktioniert als Tastatur für den Fernseher – dort kannst du dein Passwort aus einem Passwortmanager einfügen.
3. Fertig – AMTV wechselt zur TV-Oberfläche. Du bleibst angemeldet; beim nächsten Mal öffnet sich direkt die Startseite.

> Dein Passwort gibst du **nur auf Apples Seite** ein (`idmsa.apple.com`). AMTV sieht und speichert es nie.

## Bedienung mit der Fernbedienung

| Taste | Funktion |
|---|---|
| **← ↑ → ↓** | Zwischen Karten, Reihen und der oberen Leiste wechseln. Tabs öffnen sich, sobald du auf ihnen landest. |
| **→ am Ende einer Reihe / ← am Anfang** | Zum nächsten / vorherigen Tab springen (auf der Startseite führt **←** direkt zu „Jetzt läuft“). |
| **OK** | Titel oder Sender abspielen, Album / Playlist / Künstler öffnen. |
| **OK gedrückt halten** | Menü: Wiedergeben, Zufällig, Nächster Titel, Zuletzt wiedergeben, Zur Mediathek hinzufügen, Sender erstellen. |
| **Zurück** | Zur vorherigen Seite → Startseite → verlässt die App (die Musik pausiert). |
| **Wiedergabe/Pause, nächster / vorheriger Titel** (falls deine Fernbedienung sie hat) | Steuern die Musik überall in der App. |

Auf dem Bildschirm **Jetzt läuft**:

| Taste | Funktion |
|---|---|
| beliebige Taste | Zeigt die Steuerelemente (sie verschwinden nach ein paar Sekunden) |
| **← / →** bei ausgeblendeten Steuerelementen | Vorheriger / nächster Titel |
| **↓** zur Fortschrittsleiste, dann **← / →** | 10 s pro Tastendruck spulen (ein flüssiger Sprung, sobald du aufhörst) |
| ⭐ | Zu Favoriten hinzufügen / aus Favoriten entfernen |
| Liedtext-Taste | Liedtexte ein / aus |

## Sprachassistenten und Automatisierung

AMTV nimmt einfache Befehle als Android-Intents entgegen, sodass Sprachfernbedienungen, Tools wie Tasker oder ein Skript die App steuern können:

```bash
# Sender / Playlist / Album starten (öffnet bei Bedarf die App, zeigt den Player, sobald die Musik startet)
adb shell am start -n com.megarohas.amtv/.MainActivity --es play ra.978194965      # Apple Music 1
adb shell am start -n com.megarohas.amtv/.MainActivity --es play pl.<Playlist-ID>

# den Player steuern
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd next        # next | prev | pause | play | toggle
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd favorite    # ⭐ den aktuellen Titel hinzufügen
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd unfavorite  # ihn wieder entfernen (tut nichts, wenn er kein Favorit ist)
```

Die IDs sind dieselben wie in Apple Music-Links (`music.apple.com/…/playlist/…/pl.xxxx`, Sender `ra.…`, Alben sind Zahlen). Die Sprachfernbedienung [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) nutzt genau das: *„Remote, play music“* weckt die TV-Box, öffnet AMTV und startet deinen Sender.

## Häufige Fragen

<details><summary><b>Gibt es eine offizielle Apple Music-App für Android TV / Google TV?</b></summary>

Nein (Stand 2026). Apple bietet Apple Music für Android-Smartphones und für einige Smart-TVs (Samsung, LG) an, aber nicht für Boxen mit Android TV / Google TV. AMTV schließt diese Lücke mit Apples eigenem Webplayer.
</details>

<details><summary><b>Ist das legal? Wird DRM geknackt?</b></summary>

AMTV umgeht DRM **nicht** und liest keine Tokens aus. Die Musik läuft über Apples offiziellen Webplayer mit dem im Fernseher eingebauten Widevine, genau wie in einem Desktop-Browser auf music.apple.com. Du brauchst dein eigenes bezahltes Abo. AMTV ist ein unabhängiges, inoffizielles Projekt.
</details>

<details><summary><b>Läuft es auf meiner TV-Box / meinem Fire TV?</b></summary>

Getestet ist AMTV auf einer **Xiaomi TV Box S (2. Generation), Google TV, Android 14**. Es sollte auf jedem Gerät mit Android TV / Google TV, Android 10+ und Widevine laufen (das sind praktisch alle zertifizierten Geräte: Chromecast with Google TV, NVIDIA Shield, Mi Box, Onn, Fernseher mit Google TV). Gemeldet wurde außerdem, dass es auf einem Changhong-Fernseher (Android 11) und einem Sony Bravia (Android TV 12) läuft. Fire TV ist ungetestet – Berichte sind willkommen.
</details>

<details><summary><b>Lossless, Dolby Atmos, Musikvideos?</b></summary>

AMTV spielt, was Apples Webplayer spielt: AAC in hoher Qualität. Lossless und Dolby Atmos gibt es im Web nicht. Musikvideos werden noch nicht unterstützt.
</details>

<details><summary><b>Warum dauert der allererste Start ~10 Sekunden?</b></summary>

Die App lädt Apples Webplayer und stellt deine Anmeldung wieder her; der Ladebildschirm zeigt, was gerade passiert. Ein Sender braucht ein paar Sekunden zum Starten, weil Apples Player vor der Wiedergabe die Titel des Senders, eine Wiedergabelizenz und die ersten Audiodaten holt. Danach ist die Navigation zwischengespeichert und schnell.
</details>

<details><summary><b>Läuft die Musik weiter, wenn ich die App verlasse?</b></summary>

Sie pausiert, wenn du die App verlässt (Home-Taste, andere App), und spielt unter dem Bildschirmschoner des Fernsehers weiter.
</details>

<details><summary><b>Die Inhalte stammen aus einem anderen Land</b></summary>

Apple Music zeigt den Katalog des Landes deiner Apple ID. Bevor du dich anmeldest, schätzt die Website das Land möglicherweise anhand deiner IP-Adresse.
</details>

## Fehlerbehebung

| Problem | Was hilft |
|---|---|
| Hängt im Ladebildschirm | Prüfe die Internetverbindung; der Ladebildschirm gibt nach 30 s auf und zeigt die Website. |
| Jedes Mal „Anmeldung erforderlich“ | Prüfe, ob Datum und Uhrzeit am Fernseher stimmen; melde dich über Einstellungen → Website-Modus neu an. |
| Kein Ton oder „Wiedergabe fehlgeschlagen“ | Dein Gerät braucht Widevine (alle von Google zertifizierten Fernseher haben es). Prüfe auf music.apple.com, ob dein Abo aktiv ist. |
| Statt der TV-Oberfläche erscheint der Zeiger | Drücke **Zurück** – damit geht es vom Website-Modus zurück zur TV-Oberfläche. |
| Nach einem Update sieht etwas falsch aus | Einstellungen → **Daten aktualisieren** oder die Daten der App in den Android-Einstellungen löschen (danach musst du dich neu anmelden). |

## So funktioniert es

```
┌──────────────── AMTV (Android-App) ────────────────┐
│  WebView ── music.apple.com (Apples Webplayer)      │
│    │          ├── MusicKit JS: angemeldete Sitzung   │
│    │          └── <audio> + Widevine: Wiedergabe     │
│    └── TV-Oberfläche (HTML/CSS/JS im Shadow DOM)     │
│           Daten      ← MusicKit API (amp-api)        │
│           Wiedergabe → MusicKit setQueue / play      │
│  Fernbedienung ─► MainActivity ─► TV-Oberfläche      │
│  Intents (--es play / --es cmd) ─► der Player        │
└─────────────────────────────────────────────────────┘
```

- **Keine DRM-Tricks, kein Auslesen von Tokens.** Die Oberfläche fragt Apples API über die angemeldete MusicKit-Sitzung der Seite selbst ab und startet die Wiedergabe mit MusicKit, genau wie die Website.
- **Apples eigene Seite bleibt geladen, aber versteckt** (`display: none`) – ihr gehört der Player. AMTV hält sie auf einer Seite ohne animierte Cover und blockiert die Anfragen, die sie nur für sich selbst stellen würde (Videos für animierte Cover, eigene Vorschaubilder, Analytics): Auf einer langsamen Box war das der Unterschied zwischen 20 s und 4 s bis zum Senderstart.
- **Gebaut für schwache GPUs** – keine Blur-Filter oder Endlosanimationen; der Hintergrund von „Jetzt läuft“ ist ein weichgezeichnetes 64×36-Canvas, das einmal pro Titel gemalt und gestreckt wird; Liedtexte rücken per Timer vor, der auf das nächste Wort zielt, nicht in einer Schleife pro Frame; das Schweben, der Lauftext und die Fortschrittsleiste teilen sich einen Takt von 10 pro Sekunde und bewegen sich über pausierte Animationen, sodass ein Schritt die Seite nie zum Neuaufbau ihrer Ebenen zwingt; die Balken auf dem Tab „Jetzt läuft“ bewegen sich ein paar Mal pro Sekunde, nur solange Musik läuft und die obere Leiste sichtbar ist, und ruhen nach einer Minute ohne Tastendruck; Apples versteckte Seite darf überhaupt nichts animieren.
- **Exakte Spielzeit** – MusicKit meldet die Zeit in ganzen Sekunden; Fortschrittsleiste und Zeitanzeige folgen der exakten Zeit des Players, sodass sie nie zurückspringen.
- **Navigation per Fernbedienung** – eine kleine Fokus-Engine: Reihen fokussierbarer Elemente, ein Gedächtnis pro Reihe, Leisten, die per `transform` gleiten, Tabwechsel am Rand und ein Mauszeiger für den Website-Modus.

Code-Übersicht:

| Pfad | Inhalt |
|---|---|
| `src/com/megarohas/amtv/MainActivity.java` | WebView, Ladebildschirm, Routing der Fernbedienungstasten, Intents, Anfragefilter |
| `src/com/megarohas/amtv/Cursor.java` | der Bildschirmzeiger für den Website-Modus |
| `res/raw/page.js` | kleine Korrekturen, die in Apples Seite eingeschleust werden |
| `res/raw/tv_i18n.js` | die Übersetzungen der Oberfläche: eine Tabelle pro Sprache, mit den russischen Originalen als Schlüsseln |
| `res/raw/tv_core.js` | die TV-Oberfläche: Fokus-Engine, Tabs, API-Helfer, Wiedergabe |
| `res/raw/tv_screens.js` | Startseite, Entdecken, Radio, Mediathek, Suchen, Einstellungen, Album / Playlist / Künstler |
| `res/raw/tv_player.js` | Jetzt läuft: Hintergrund, Liedtexte, Spulen, Favoriten |
| `res/raw/signin.js` | Apples Anmeldeseite, angepasst an die Fernbedienung: Fokusrahmen, Pfeiltasten, OK öffnet die Tastatur (nur Darstellung, liest nie mit, was du tippst) |
| `res/values*/strings.xml` | die Zeilen des Ladebildschirms in jeder Sprache |
| `res/raw/brand.js` | Branding-Einstellungen (Icons, Schrift) – die einzige Datei, die ein eigener Build austauscht |
| `tools/cdp.mjs` | Chrome-DevTools-Helfer: die Oberfläche auf einem echten Fernseher untersuchen und per Hot-Reload neu laden |

## Aus dem Quellcode bauen

Kein Gradle – das Makefile ruft die Tools des Android SDK direkt auf; ein Build dauert ein paar Sekunden.

Voraussetzungen: **Android SDK** (build-tools 36.0.0, Plattform `android-36`), **JDK 17 oder neuer**, `make`, `adb`.

```bash
git clone https://github.com/megarohas/apple-music-android-tv.git
cd apple-music-android-tv
make                                   # → build/amtv.apk (signiert mit deinem Debug-Schlüssel)
make install TV=192.168.1.50:5555      # per adb verbundene TV-Box; oder `TV = …` in local.mk eintragen
make start

make dev-install && make dev-start    # eine separate App „AMTV Dev“ daneben (eigene Anmeldung und Daten) zum Testen
```

Pfade lassen sich überschreiben: `make SDK=/pfad/zum/sdk BT=$SDK/build-tools/36.0.0`.

Auf einem echten Fernseher entwickeln, ohne neu zu installieren:

```bash
make devtools                                  # leitet die DevTools der WebView auf localhost:9222 weiter
node tools/cdp.mjs run res/raw/tv_i18n.js res/raw/tv_core.js res/raw/tv_screens.js res/raw/tv_player.js
node tools/cdp.mjs eval '__tv.boot()'          # Oberfläche per Hot-Reload neu geladen
node tools/cdp.mjs shot screen.png             # oder in chrome://inspect untersuchen
```

Eigenes Branding (eigene Icons und Schrift) gehört in `res/raw/brand.js` und `assets/fonts/` – siehe die Kommentare in dieser Datei.

### Eine Sprache hinzufügen

1. `res/raw/tv_i18n.js` – die englische Tabelle kopieren, die Werte übersetzen und die Sprache zu `LANGS` hinzufügen (ihren Code und ihren eigenen Namen).
2. `res/values-<code>/strings.xml` – die sieben Zeilen des Ladebildschirms.
3. `res/raw/signin.js` – der einzeilige Fernbedienungshinweis auf Apples Anmeldeseite.
4. Optional `README.<code>.md`, verlinkt in der Sprachzeile oben in jeder README.

Halte die Texte ungefähr so lang wie die englischen: Die obere Leiste und der Player haben wenig Platz. Danach `make` ausführen und jeden Tab auf einem Fernseher anschauen.

## Danksagungen

- [**JObersi10/apple-music-tv**](https://github.com/JObersi10/apple-music-tv) – ein nativer Apple Music-Client für Android TV, dessen Recherche zu Apples Web-API (Endpunkte für Startseite, Entdecken, Radio, Liedtexte, Favoriten) und dessen Ideen zur TV-UX sehr geholfen haben. Es wurde kein Code kopiert. Jenes Projekt entschlüsselt die Streams selbst; AMTV tut das bewusst nicht und überlässt die Wiedergabe Apples Player.
- [**Material Icons**](https://github.com/google/material-design-icons) (Apache License 2.0) – die Grundlage des Icon-Sets von AMTV. Siehe [NOTICE](NOTICE).
- **Übersetzungen** – Französisch von [NeoNathoon](https://github.com/NeoNathoon). Die anderen Sprachen sind noch nicht muttersprachlich geprüft: Korrekturen sind als Pull Requests willkommen.
- **Apple MusicKit on the Web** – Apples Player und API, mit denen AMTV kommuniziert.

## Rechtliches

AMTV ist ein unabhängiges Open-Source-Projekt, **das weder mit der Apple Inc. verbunden ist noch von ihr autorisiert oder befürwortet wird.** Apple, Apple Music und Apple ID sind Marken der Apple Inc. und werden hier nur verwendet, um zu beschreiben, womit die App funktioniert. AMTV enthält keine Schriften, Icons oder Logos von Apple, verändert oder umgeht kein DRM und setzt ein gültiges Apple Music-Abo voraus. Die Albumcover in den Screenshots gehören ihren Inhabern und werden zur Veranschaulichung gezeigt.

## Lizenz

[MIT](LICENSE) © 2026 megarohas
