<div align="center">

<img src="docs/icon.png" width="96" alt="Ícono de AMTV">

# AMTV — Apple Music para Android TV y Google TV

**Una app no oficial de Apple Music para Android TV, Google TV, Xiaomi Mi Box, Chromecast with Google TV, NVIDIA Shield y otros TV box con Android, hecha para el control remoto.**

[![Descargar APK](https://img.shields.io/github/v/release/megarohas/apple-music-android-tv?label=Descargar%20APK&color=fa233b&style=for-the-badge)](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)
&nbsp;
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-333?style=for-the-badge)](LICENSE)

[English](README.md) · [Deutsch](README.de.md) · **Español** · [Français](README.fr.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

[Instalación en 5 minutos](#instalación) · [El control remoto](#uso-con-el-control-remoto) · [Preguntas frecuentes](#preguntas-frecuentes) · [Cómo funciona](#cómo-funciona)

<img src="docs/screenshots/now_controls.jpg" width="820" alt="Pantalla En reproducción de AMTV en un televisor">

</div>

---

## ¿Qué es esto?

No existe **ninguna app oficial de Apple Music para Android TV / Google TV**. La app de Apple para teléfonos Android se puede instalar manualmente, pero está pensada para pantallas táctiles y usarla con un control remoto es un suplicio. Transmitir desde el teléfono funciona, pero entonces tu teléfono pasa a ser el control remoto.

**AMTV** le da a tu televisor una app de Apple Music como debe ser:

- inicias sesión **una sola vez** con tu Apple ID, en la propia página de inicio de sesión de Apple;
- recorres **Inicio, Explorar, Radio, Biblioteca y Buscar** con las flechas del control remoto;
- presionas OK y suena la música, con una vista **En reproducción** tranquila y a pantalla completa.

Es gratis, de código abierto y **no contiene hacks**: internamente ejecuta el **reproductor web oficial de Apple** ([music.apple.com](https://music.apple.com)) y solo le pone encima una interfaz pensada para la TV. La reproducción, el DRM y tu cuenta siguen en manos de Apple.

> Necesitas una **suscripción a Apple Music**. AMTV no está afiliada a Apple ni cuenta con su respaldo.

## Capturas de pantalla

| | |
|:---:|:---:|
| <img src="docs/screenshots/browse.jpg" alt="Explorar: secciones editoriales de Apple Music en un televisor"> | <img src="docs/screenshots/radio.jpg" alt="Radio: estaciones en vivo Apple Music 1, Hits y Country"> |
| **Explorar** — selecciones de los editores de Apple, música nueva, listas de éxitos | **Radio** — Apple Music 1, Hits, Country y programas |
| <img src="docs/screenshots/now_calm.jpg" alt="En reproducción: solo portada, título y artista"> | <img src="docs/screenshots/now_lyrics.jpg" alt="En reproducción con la letra sincronizada palabra por palabra"> |
| **En reproducción** — vista tranquila; los controles aparecen al presionar cualquier botón | **Letra** — palabra por palabra, desactivada de forma predeterminada |
| <img src="docs/screenshots/album.jpg" alt="Página de álbum con la lista de canciones y los botones Reproducir/Aleatorio"> | <img src="docs/screenshots/artist.jpg" alt="Página de artista con biografía y top canciones"> |
| **Álbum** — canciones populares marcadas, Reproducir / Aleatorio | **Artista** — biografía, top canciones, álbumes, artistas similares |
| <img src="docs/screenshots/search.jpg" alt="Resultados de búsqueda de artistas y canciones"> | <img src="docs/screenshots/menu.jpg" alt="Menú al mantener presionado OK: Reproducir a continuación, Reproducir al final, Agregar a la biblioteca"> |
| **Buscar** — con el teclado en pantalla del televisor | **Mantener presionado OK** — Reproducir a continuación, Reproducir al final, Agregar a la biblioteca, Crear estación |
| <img src="docs/screenshots/settings.jpg" alt="Configuración: modo sitio web, idioma, cerrar sesión"> | <img src="docs/screenshots/splash.jpg" alt="Pantalla de arranque que muestra lo que se está cargando"> |
| **Configuración** — idioma, modo sitio web, cerrar sesión | **Pantalla de arranque** — indica lo que está haciendo |

*Las capturas muestran la interfaz en inglés; en un televisor configurado en español, la interfaz aparece en español.*

## Funciones

- 🎛️ **Hecha para el control remoto** — las flechas recorren las tarjetas, OK reproduce o abre, Atrás regresa. Cada fila recuerda dónde te quedaste.
- 🏠 **Inicio** — tus recomendaciones personales: playlists *Hechos para ti*, reproducciones recientes, estaciones para ti, nuevos lanzamientos.
- 🧭 **Explorar y Radio** — las secciones editoriales de Apple, listas de éxitos, radio en vivo (Apple Music 1, Hits, Country…) y programas de radio.
- 📚 **Biblioteca** — lo agregado recientemente, playlists, álbumes, artistas, canciones.
- 🔍 **Buscar** — artistas, canciones, álbumes, playlists y estaciones, con historial de búsqueda.
- 💿 **Páginas de álbum, playlist y artista** — Reproducir, Aleatorio, Agregar a la biblioteca; las canciones populares aparecen marcadas como en Apple Music.
- 🎵 **En reproducción** — portada grande, cambios de canción suaves, fondo teñido con el color de la portada; los controles se ocultan solos, **←/→ cambian de canción** mientras están ocultos, y el avance por la canción se hace con un control deslizante fluido. Los títulos largos se desplazan; la portada, el título, el artista y el reloj flotan lentamente juntos, para que nada quede marcado en la pantalla. El protector de pantalla del televisor no aparece mientras suena música, y mientras tanto las barras de la pestaña En reproducción se mueven.
- ⭐ **Favoritos** — la estrella del reproductor (la misma que ⭐ en Apple Music).
- 📝 **Letra** — la letra de Apple Music sincronizada palabra por palabra (actívala con el botón de letra del reproductor).
- 🗣️ **Integración con voz y automatización** — inicia una estación o cambia de canción desde fuera de la app (consulta [Automatización](#asistentes-de-voz-y-automatización)); funciona con el control remoto por voz de código abierto [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice).
- 🌐 **Nueve idiomas de interfaz** — English, Deutsch, Español, Français, Português, Русский, हिन्दी, 日本語 y 简体中文. Sigue el idioma del televisor; Configuración → Idioma los muestra todos, cada uno con su propio nombre.
- 🐢 **Rápida en TV box modestos** — optimizada en un Xiaomi TV Box S (4×Cortex-A55, Mali-G31, 2 GB de RAM): CPU en reposo ≈ 0 %, sin animaciones infinitas, nada se descarga en segundo plano.
- 🖱️ **Modo sitio web** — el sitio web completo de Apple Music con un puntero en pantalla, para todo lo que la interfaz de TV aún no hace.

## Instalación

### Qué necesitas

- Un dispositivo **Android TV / Google TV** con **Android 10 o posterior** (TV box, sticks, televisores con Android TV / Google TV).
- Una **suscripción a Apple Music** y tu **Apple ID**.
- 5 minutos.

### Opción 1 — con la app gratuita “Downloader” (la más fácil, sin computadora)

1. En el televisor, abre **Google Play** e instala **Downloader** (de AFTVnews).
2. Permítele instalar apps: **Configuración → Apps → Seguridad y restricciones → Fuentes desconocidas → Downloader → Activado**
   *(la ruta cambia un poco de un televisor a otro; busca “Fuentes desconocidas” en Configuración)*.
3. Abre **Downloader**, escribe esta dirección y presiona **Go**:
   ```
   https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk
   ```
4. Cuando termine, presiona **Instalar** y luego **Abrir**.

### Opción 2 — envía el archivo desde tu teléfono o computadora

1. Descarga [`amtv.apk`](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk).
2. Envíalo al televisor con una app como **Send Files to TV** o **LocalSend**, o con una memoria USB.
3. Ábrelo en el televisor con un administrador de archivos y presiona **Instalar** (cuando te lo pida, permite las “Fuentes desconocidas” para ese administrador de archivos).

### Opción 3 — ADB (para los más técnicos)

```bash
adb connect <IP-del-televisor>:5555
adb install amtv.apk
```

### Primer inicio

1. Abre **AMTV** desde la fila de apps (recuadro rojo con una nota musical).
2. Presiona **Iniciar sesión** y se abrirá la propia página de inicio de sesión de Apple, adaptada al control remoto: **↑ / ↓** eligen un campo o un botón (marco rojo), **OK** en un campo abre el teclado en pantalla y **OK** en un botón lo presiona. Escribe tu Apple ID → Continuar → contraseña → Iniciar sesión. Los códigos de autenticación de dos factores llegan a tu iPhone / Mac como siempre.
   > Consejo: la app **Google TV** del teléfono funciona como teclado para el televisor; puedes pegar tu contraseña desde un administrador de contraseñas.
3. Listo: AMTV pasa a la interfaz de TV. Tu sesión queda iniciada; la próxima vez se abre directamente en Inicio.

> Tu contraseña se escribe **solo en la página de Apple** (`idmsa.apple.com`). AMTV nunca la ve ni la guarda.

## Uso con el control remoto

| Botón | Qué hace |
|---|---|
| **← ↑ → ↓** | Moverse entre tarjetas, filas y la barra superior. Las pestañas se abren en cuanto llegas a ellas. |
| **→ al final de una fila / ← al principio** | Saltar a la pestaña siguiente / anterior (desde Inicio, **←** va directo a En reproducción). |
| **OK** | Reproducir una canción o estación; abrir un álbum / playlist / artista. |
| **Mantener presionado OK** | Menú: Reproducir, Aleatorio, Reproducir a continuación, Reproducir al final, Agregar a la biblioteca, Crear estación. |
| **Atrás** | Volver a la página anterior → Inicio → salir de la app (la música se pausa). |
| **Reproducir/Pausar, Siguiente, Anterior** (si tu control remoto los tiene) | Controlar la música desde cualquier parte de la app. |

En la pantalla **En reproducción**:

| Botón | Qué hace |
|---|---|
| cualquier botón | Muestra los controles (se ocultan a los pocos segundos) |
| **← / →** con los controles ocultos | Canción anterior / siguiente |
| **↓** hasta la barra de progreso y luego **← / →** | Avanza o retrocede 10 s por pulsación (un solo salto fluido cuando te detienes) |
| ⭐ | Agregar a favoritos / quitar de favoritos |
| botón de letra | Activar / desactivar la letra |

## Asistentes de voz y automatización

AMTV acepta comandos simples como intents de Android, así que la pueden manejar controles remotos por voz, herramientas tipo Tasker o un script:

```bash
# inicia una estación / playlist / álbum (abre la app si hace falta y muestra el reproductor cuando empieza la música)
adb shell am start -n com.megarohas.amtv/.MainActivity --es play ra.978194965      # Apple Music 1
adb shell am start -n com.megarohas.amtv/.MainActivity --es play pl.<id-de-playlist>

# controla el reproductor
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd next        # next | prev | pause | play | toggle
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd favorite    # ⭐ agrega la canción actual
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd unfavorite  # la quita (no hace nada si no es favorita)
```

Los ID son los de los enlaces de Apple Music (`music.apple.com/…/playlist/…/pl.xxxx`, las estaciones `ra.…`, los álbumes son números). El control remoto por voz [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) usa exactamente esto: *“Remote, play music”* despierta el TV box, abre AMTV e inicia tu estación.

## Preguntas frecuentes

<details><summary><b>¿Hay una app oficial de Apple Music para Android TV / Google TV?</b></summary>

No (al menos en 2026). Apple ofrece Apple Music para teléfonos Android y para algunos televisores inteligentes (Samsung, LG), pero no para dispositivos Android TV / Google TV. AMTV cubre ese vacío usando el propio reproductor web de Apple.
</details>

<details><summary><b>¿Es legal? ¿Rompe el DRM?</b></summary>

AMTV **no** elude el DRM ni extrae tokens. La música se reproduce con el reproductor web oficial de Apple y el Widevine integrado del televisor, exactamente como en un navegador de computadora en music.apple.com. Necesitas tu propia suscripción de pago. AMTV es un proyecto independiente y no oficial.
</details>

<details><summary><b>¿Funcionará en mi TV box / Fire TV?</b></summary>

Está probada en un **Xiaomi TV Box S (2.ª generación), Google TV, Android 14**. Debería funcionar en cualquier dispositivo Android TV / Google TV con Android 10+ y Widevine (es decir, prácticamente todos los dispositivos certificados: Chromecast with Google TV, NVIDIA Shield, Mi Box, Onn, televisores con Google TV). Algunas personas también indicaron que funciona en un televisor Changhong (Android 11) y en un Sony Bravia (Android TV 12). Fire TV aún no se ha probado: cualquier informe es bienvenido.
</details>

<details><summary><b>¿Lossless, Dolby Atmos, videos musicales?</b></summary>

AMTV reproduce lo mismo que el reproductor web de Apple: AAC de alta calidad. Lossless y Dolby Atmos no están disponibles en la web. Los videos musicales aún no son compatibles.
</details>

<details><summary><b>¿Por qué el primer inicio tarda ~10 segundos?</b></summary>

La app carga el reproductor web de Apple y restaura tu sesión; la pantalla de arranque muestra lo que está haciendo. Iniciar una estación tarda unos segundos porque el reproductor de Apple obtiene las canciones de la estación, una licencia de reproducción y el primer fragmento de audio antes de empezar a sonar. Después, la navegación queda en caché y es rápida.
</details>

<details><summary><b>¿La música sigue sonando si salgo de la app?</b></summary>

Se pausa cuando sales de la app (botón de inicio, otra app) y sigue sonando con el protector de pantalla del televisor.
</details>

<details><summary><b>El contenido es de otro país</b></summary>

Apple Music muestra el catálogo del país de tu Apple ID. Antes de que inicies sesión, el sitio web puede deducir un país a partir de tu dirección IP.
</details>

## Solución de problemas

| Problema | Prueba esto |
|---|---|
| Se queda en la pantalla de arranque | Revisa la conexión a internet; la pantalla de arranque deja de esperar a los 30 s y muestra el sitio web. |
| “Necesitas iniciar sesión” cada vez | Asegúrate de que la fecha y la hora del televisor sean correctas; vuelve a iniciar sesión desde Configuración → Modo sitio web. |
| No hay sonido o aparece “No se pudo reproducir” | Tu dispositivo necesita Widevine (todos los televisores certificados por Google lo tienen). Comprueba que tu suscripción esté activa en music.apple.com. |
| Aparece el puntero en lugar de la interfaz de TV | Presiona **Atrás**: vuelve del modo sitio web a la interfaz de TV. |
| Algo se ve mal después de una actualización | Configuración → **Actualizar datos**, o borra el almacenamiento de la app en la configuración de Android (tendrás que volver a iniciar sesión). |

## Cómo funciona

```
┌──────────────── AMTV (app Android) ────────────────┐
│  WebView ── music.apple.com (reproductor de Apple)  │
│    │          ├── MusicKit JS: tu sesión iniciada    │
│    │          └── <audio> + Widevine: reproducción   │
│    └── interfaz de TV (HTML/CSS/JS en un shadow DOM) │
│           datos        ← API de MusicKit (amp-api)   │
│           reproducción → MusicKit setQueue / play    │
│  Control remoto ─► MainActivity ─► la interfaz de TV │
│  Intents (--es play / --es cmd) ─► el reproductor    │
└─────────────────────────────────────────────────────┘
```

- **Sin trucos con el DRM ni extracción de tokens.** La interfaz consulta la API de Apple a través de la sesión de MusicKit que la propia página ya tiene abierta y empieza la reproducción con MusicKit, igual que el sitio web.
- **La propia página de Apple sigue cargada pero oculta** (`display: none`): es la dueña del reproductor. AMTV la mantiene en una página sin ilustraciones animadas y rechaza las solicitudes que haría solo para sí misma (video de ilustraciones animadas, sus propias miniaturas, analíticas): en un dispositivo lento, eso marcó la diferencia entre que una estación arranque en 20 s o en 4 s.
- **Pensada para GPU modestas** — sin filtros de desenfoque ni animaciones infinitas; el fondo de En reproducción es un lienzo desenfocado de 64×36 que se pinta una vez por canción y se estira; la letra avanza con temporizadores dirigidos a la siguiente palabra, no con un bucle por fotograma; la flotación, el texto que se desplaza y la barra de progreso comparten un único tic de 10 por segundo y se mueven mediante animaciones en pausa, así que un paso nunca obliga a la página a rehacer sus capas; las barras de la pestaña En reproducción avanzan unas pocas veces por segundo, solo mientras suena música y la barra superior está en pantalla, y descansan tras un minuto sin que se presione ningún botón; a la página oculta de Apple no se le permite animar nada.
- **Tiempo de reproducción exacto** — MusicKit informa el tiempo en segundos enteros; la barra de progreso y el reloj siguen el tiempo exacto del reproductor, así que nunca retroceden.
- **Navegación con el control remoto** — un pequeño motor de foco: filas de elementos enfocables, memoria de posición en cada fila, secciones que se deslizan con `transform`, cambio de pestaña desde los bordes y un puntero en pantalla para el modo sitio web.

Mapa del código:

| Ruta | Qué contiene |
|---|---|
| `src/com/megarohas/amtv/MainActivity.java` | WebView, pantalla de arranque, enrutamiento de los botones del control remoto, intents, filtro de solicitudes |
| `src/com/megarohas/amtv/Cursor.java` | el puntero en pantalla del modo sitio web |
| `res/raw/page.js` | pequeñas correcciones inyectadas en la página de Apple |
| `res/raw/tv_i18n.js` | las traducciones de la interfaz: una tabla por idioma, cuyas claves son los originales en ruso |
| `res/raw/tv_core.js` | la interfaz de TV: motor de foco, pestañas, funciones auxiliares de la API, reproducción |
| `res/raw/tv_screens.js` | Inicio, Explorar, Radio, Biblioteca, Buscar, Configuración, álbum / playlist / artista |
| `res/raw/tv_player.js` | En reproducción: fondo, letra, avance por la canción, favoritos |
| `res/raw/signin.js` | la página de inicio de sesión de Apple adaptada al control remoto: marco de foco, flechas, OK abre el teclado (solo presentación; nunca lee lo que escribes) |
| `res/values*/strings.xml` | las líneas de la pantalla de arranque en cada idioma |
| `res/raw/brand.js` | ajustes de marca (íconos, fuente): el único archivo que cambia una compilación personalizada |
| `tools/cdp.mjs` | herramienta de Chrome DevTools: inspeccionar y recargar en caliente la interfaz en un televisor real |

## Compilar desde el código fuente

Sin Gradle: el Makefile llama directamente a las herramientas del Android SDK; una compilación tarda unos segundos.

Requisitos: **Android SDK** (build-tools 36.0.0, plataforma `android-36`), **JDK 17 o posterior**, `make`, `adb`.

```bash
git clone https://github.com/megarohas/apple-music-android-tv.git
cd apple-music-android-tv
make                                   # → build/amtv.apk (firmado con tu clave de depuración)
make install TV=192.168.1.50:5555      # TV box conectado por adb; o pon `TV = …` en local.mk
make start

make dev-install && make dev-start    # una app “AMTV Dev” aparte, junto a la principal (con su propia sesión y datos), para pruebas
```

Las rutas se pueden cambiar: `make SDK=/ruta/al/sdk BT=$SDK/build-tools/36.0.0`.

Desarrolla en un televisor real sin reinstalar:

```bash
make devtools                                  # redirige las DevTools del WebView a localhost:9222
node tools/cdp.mjs run res/raw/tv_i18n.js res/raw/tv_core.js res/raw/tv_screens.js res/raw/tv_player.js
node tools/cdp.mjs eval '__tv.boot()'          # interfaz recargada en caliente
node tools/cdp.mjs shot screen.png             # o inspecciona en chrome://inspect
```

La marca personalizada (tus propios íconos y fuente) va en `res/raw/brand.js` y `assets/fonts/`; consulta los comentarios de ese archivo.

### Agregar un idioma

1. `res/raw/tv_i18n.js`: copia la tabla en inglés, traduce los valores y agrega el idioma a `LANGS` (su código y su propio nombre).
2. `res/values-<code>/strings.xml`: las siete líneas de la pantalla de arranque.
3. `res/raw/signin.js`: la línea de ayuda para el control remoto en la página de inicio de sesión de Apple.
4. Opcionalmente, `README.<code>.md`, enlazado desde la línea de idiomas al principio de cada README.

Mantén las cadenas de una longitud parecida a las inglesas: la barra superior y el reproductor tienen poco espacio. Después ejecuta `make` y revisa cada pestaña en un televisor.

## Créditos

- [**JObersi10/apple-music-tv**](https://github.com/JObersi10/apple-music-tv) — un cliente nativo de Apple Music para Android TV cuya investigación sobre la API web de Apple (endpoints de Inicio, Explorar, Radio, letras, favoritos) y cuyas ideas de experiencia de usuario para TV ayudaron mucho. No se copió código. Ese proyecto descifra los streams por su cuenta; AMTV deliberadamente no lo hace y deja que el reproductor de Apple se encargue de la reproducción.
- [**Material Icons**](https://github.com/google/material-design-icons) (Apache License 2.0) — la base del conjunto de íconos de AMTV. Consulta [NOTICE](NOTICE).
- **Traducciones** — la del francés es de [NeoNathoon](https://github.com/NeoNathoon). Los demás idiomas todavía no los han revisado hablantes nativos: se agradecen las correcciones mediante pull requests.
- **Apple MusicKit on the Web** — el reproductor y la API de Apple con los que se comunica AMTV.

## Aviso legal

AMTV es un proyecto independiente de código abierto, **no afiliado a Apple Inc. ni autorizado ni respaldado por Apple Inc.** Apple, Apple Music y Apple ID son marcas comerciales de Apple Inc. y aquí se usan solo para describir con qué funciona la app. AMTV no incluye fuentes, íconos ni logotipos de Apple, no modifica ni elude el DRM y requiere una suscripción válida a Apple Music. Las portadas de álbumes de las capturas de pantalla pertenecen a sus propietarios y se muestran con fines ilustrativos.

## Licencia

[MIT](LICENSE) © 2026 megarohas
