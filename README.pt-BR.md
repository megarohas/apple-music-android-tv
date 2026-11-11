<div align="center">

<img src="docs/icon.png" width="96" alt="Ícone do AMTV">

# AMTV — Apple Music para Android TV e Google TV

**Um app não oficial do Apple Music para Android TV, Google TV, Xiaomi Mi Box, Chromecast with Google TV, NVIDIA Shield e outros TV boxes com Android — feito para o controle remoto.**

[![Baixar APK](https://img.shields.io/github/v/release/megarohas/apple-music-android-tv?label=Baixar%20APK&color=fa233b&style=for-the-badge)](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)
&nbsp;
[![Licença: MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-333?style=for-the-badge)](LICENSE)

[English](README.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Français](README.fr.md) · **Português** · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [日本語](README.ja.md) · [简体中文](README.zh-CN.md)

[Instale em 5 minutos](#instalação) · [Controle remoto](#usando-com-o-controle-remoto) · [Perguntas frequentes](#perguntas-frequentes) · [Como funciona](#como-funciona)

<img src="docs/screenshots/now_controls.jpg" width="820" alt="Tela Reproduzindo do AMTV em uma TV">

</div>

---

## O que é isto?

Não existe **nenhum app oficial do Apple Music para Android TV / Google TV**. O app da Apple para celulares Android pode ser instalado manualmente, mas foi feito para telas sensíveis ao toque e usá-lo com o controle remoto é um sofrimento. Transmitir do celular funciona, mas aí o celular vira o controle remoto.

O **AMTV** dá à sua TV um app do Apple Music de verdade:

- você inicia sessão **uma única vez** com seu Apple ID, na própria página de início de sessão da Apple;
- você navega por **Início, Explorar, Rádio, Biblioteca e Buscar** com as setas do controle remoto;
- você pressiona OK e a música toca, com uma visualização **Reproduzindo** tranquila e em tela cheia.

É gratuito, de código aberto e **não usa nenhum hack**: por baixo dos panos, ele roda o **player web oficial da Apple** ([music.apple.com](https://music.apple.com)) e só coloca por cima uma interface pensada para a TV. A reprodução, o DRM e a sua conta ficam com a Apple.

> É preciso ter uma **assinatura do Apple Music**. O AMTV não é afiliado à Apple nem endossado por ela.

## Capturas de tela

| | |
|:---:|:---:|
| <img src="docs/screenshots/browse.jpg" alt="Explorar: seleções editoriais do Apple Music em uma TV"> | <img src="docs/screenshots/radio.jpg" alt="Rádio: estações ao vivo Apple Music 1, Hits e Country"> |
| **Explorar** — seleções editoriais da Apple, lançamentos, paradas | **Rádio** — Apple Music 1, Hits, Country e programas |
| <img src="docs/screenshots/now_calm.jpg" alt="Reproduzindo: só capa, título e artista"> | <img src="docs/screenshots/now_lyrics.jpg" alt="Reproduzindo com a letra sincronizada palavra por palavra"> |
| **Reproduzindo** — visual tranquilo, os controles aparecem com qualquer tecla | **Letra** — palavra por palavra, desativada por padrão |
| <img src="docs/screenshots/album.jpg" alt="Página de álbum com a lista de faixas e os botões Reproduzir/Aleatório"> | <img src="docs/screenshots/artist.jpg" alt="Página de artista com biografia e músicas populares"> |
| **Álbum** — faixas populares marcadas, Reproduzir / Aleatório | **Artista** — biografia, músicas populares, álbuns, artistas semelhantes |
| <img src="docs/screenshots/search.jpg" alt="Resultados de busca de artistas e músicas"> | <img src="docs/screenshots/menu.jpg" alt="Menu ao segurar OK: Reproduzir a Seguir, Reproduzir por Último, Adicionar à Biblioteca"> |
| **Buscar** — com o teclado na tela da TV | **Segurar OK** — Reproduzir a Seguir, Reproduzir por Último, Adicionar à Biblioteca, Estação |
| <img src="docs/screenshots/settings.jpg" alt="Ajustes: modo site, idioma, finalizar sessão"> | <img src="docs/screenshots/splash.jpg" alt="Tela de abertura mostrando o que está carregando"> |
| **Ajustes** — idioma, modo site, finalizar sessão | **Tela de abertura** — diz o que está fazendo |

*As capturas de tela mostram a interface em inglês; em uma TV configurada em português, ela aparece em português.*

## Recursos

- 🎛️ **Feito para o controle remoto** — as setas passam de um item a outro, OK reproduz ou abre, Voltar retorna. O foco lembra onde você estava em cada fileira.
- 🏠 **Início** — suas recomendações pessoais: playlists *Feito para Você*, o que você ouviu recentemente, estações para você, lançamentos.
- 🧭 **Explorar e Rádio** — seleções editoriais da Apple, paradas, rádio ao vivo (Apple Music 1, Hits, Country…) e programas de rádio.
- 📚 **Biblioteca** — adicionados recentemente, playlists, álbuns, artistas, músicas.
- 🔍 **Buscar** — artistas, músicas, álbuns, playlists e estações, com histórico de buscas.
- 💿 **Páginas de álbum, playlist e artista** — Reproduzir, Aleatório, Adicionar à Biblioteca; as faixas populares são marcadas como no Apple Music.
- 🎵 **Reproduzindo** — capa grande, troca suave de faixas, fundo tingido pelas cores da capa; os controles se escondem sozinhos, **←/→ pulam faixas** enquanto estão escondidos, e dá para avançar ou voltar na faixa com um marcador que desliza suavemente. Títulos longos rolam; a capa, o título, o artista e o relógio flutuam juntos devagar, para nada ficar marcado na tela. O protetor de tela da TV não aparece enquanto a música toca, e as barrinhas da aba Reproduzindo se mexem enquanto ela toca.
- ⭐ **Favoritos** — a estrela no player (a mesma ⭐ do Apple Music).
- 📝 **Letra** — letras sincronizadas palavra por palavra, vindas do Apple Music (ative-as com o botão de letra no player).
- 🗣️ **Integração com voz e automação** — inicie uma estação ou pule faixas de fora do app (veja [Automação](#assistentes-de-voz-e-automação)); funciona com o controle remoto por voz de código aberto [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice).
- 🌐 **Nove idiomas de interface** — English, Deutsch, Español, Français, Português, Русский, हिन्दी, 日本語 e 简体中文. O app segue o idioma da TV; Ajustes → Idioma lista todos, cada um com o próprio nome.
- 🐢 **Rápido em TV boxes fracos** — otimizado em um Xiaomi TV Box S (4×Cortex-A55, Mali-G31, 2 GB de RAM): CPU em repouso ≈ 0 %, sem animações infinitas, nada baixado em segundo plano.
- 🖱️ **Modo site** — o site completo do Apple Music com um ponteiro na tela, para tudo o que a interface de TV ainda não faz.

## Instalação

### O que você precisa

- Um aparelho **Android TV / Google TV** com **Android 10 ou mais recente** (TV boxes, sticks, TVs com Android TV / Google TV).
- Uma **assinatura do Apple Music** e seu **Apple ID**.
- 5 minutos.

### Opção 1 — com o app gratuito “Downloader” (o mais fácil, sem computador)

1. Na TV, abra o **Google Play** e instale o **Downloader** (da AFTVnews).
2. Permita que ele instale apps: **Configurações → Apps → Segurança e restrições → Fontes desconhecidas → Downloader → Ativado**
   *(o caminho varia um pouco de uma TV para outra; procure “Fontes desconhecidas” nas Configurações)*.
3. Abra o **Downloader**, digite este endereço e pressione **Go**:
   ```
   https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk
   ```
4. Quando terminar, pressione **Instalar** e depois **Abrir**.

### Opção 2 — envie o arquivo do celular ou do computador

1. Baixe o [`amtv.apk`](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk).
2. Envie-o para a TV com um app como **Send Files to TV**, **LocalSend** ou um pendrive.
3. Abra-o na TV com um gerenciador de arquivos e pressione **Instalar** (permita “Fontes desconhecidas” para esse gerenciador de arquivos quando for solicitado).

### Opção 3 — ADB (para quem gosta de fuçar)

```bash
adb connect <IP-da-TV>:5555
adb install amtv.apk
```

### Primeiro uso

1. Abra o **AMTV** na fileira de apps (ícone vermelho com uma nota musical).
2. Pressione **Iniciar Sessão** — a própria página de início de sessão da Apple se abre, adaptada para o controle remoto: **↑ / ↓** escolhem um campo ou botão (moldura vermelha), **OK** em um campo abre o teclado na tela, **OK** em um botão o pressiona. Digite seu Apple ID → Continuar → senha → Iniciar Sessão. Os códigos de autenticação de dois fatores chegam ao seu iPhone / Mac, como de costume.
   > Dica: o app **Google TV** no celular funciona como teclado para a TV — dá para colar a senha de um gerenciador de senhas.
3. Pronto — o AMTV passa para a interface de TV. A sessão continua iniciada; da próxima vez, ele abre direto no Início.

> Sua senha é digitada **somente na página da Apple** (`idmsa.apple.com`). O AMTV nunca a vê nem a armazena.

## Usando com o controle remoto

| Botão | O que faz |
|---|---|
| **← ↑ → ↓** | Move entre itens, fileiras e a barra superior. As abas abrem assim que você chega nelas. |
| **→ no fim de uma fileira / ← no começo** | Pula para a aba seguinte / anterior (no Início, **←** vai direto para Reproduzindo). |
| **OK** | Reproduz uma música ou estação, abre um álbum / playlist / artista. |
| **Segurar OK** | Menu: Reproduzir, Aleatório, Reproduzir a Seguir, Reproduzir por Último, Adicionar à Biblioteca, Criar Estação. |
| **Voltar** | Volta à página anterior → Início → sai do app (a música é pausada). |
| **Play/Pause, Próxima, Anterior** (se o seu controle tiver esses botões) | Controla a música em qualquer lugar do app. |

Em **Reproduzindo**:

| Botão | O que faz |
|---|---|
| qualquer tecla | Mostra os controles (eles somem após alguns segundos) |
| **← / →** com os controles escondidos | Faixa anterior / próxima |
| **↓** até a barra de progresso, depois **← / →** | Avança ou volta 10 s a cada clique (um único salto suave quando você parar) |
| ⭐ | Adiciona aos / remove dos Favoritos |
| botão de letra | Ativa / desativa a letra |

## Assistentes de voz e automação

O AMTV aceita comandos simples como intents do Android, então controles remotos por voz, ferramentas do tipo Tasker ou um script podem comandá-lo:

```bash
# inicia uma estação / playlist / álbum (abre o app se precisar, mostra o player quando a música começa)
adb shell am start -n com.megarohas.amtv/.MainActivity --es play ra.978194965      # Apple Music 1
adb shell am start -n com.megarohas.amtv/.MainActivity --es play pl.<id-da-playlist>

# controla o player
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd next        # next | prev | pause | play | toggle
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd favorite    # ⭐ adiciona a música atual
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd unfavorite  # remove a música (não faz nada se ela não for favorita)
```

Os IDs são os dos links do Apple Music (`music.apple.com/…/playlist/…/pl.xxxx`, estações `ra.…`, álbuns são números). O controle remoto por voz [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) usa exatamente isso: *“Remote, play music”* acorda o TV box, abre o AMTV e inicia a sua estação.

## Perguntas frequentes

<details><summary><b>Existe um app oficial do Apple Music para Android TV / Google TV?</b></summary>

Não (em 2026). A Apple oferece o Apple Music para celulares Android e para algumas smart TVs (Samsung, LG), mas não para TV boxes Android TV / Google TV. O AMTV preenche essa lacuna usando o próprio player web da Apple.
</details>

<details><summary><b>Está dentro da lei? Ele quebra o DRM?</b></summary>

O AMTV **não** contorna o DRM nem extrai tokens. A música toca pelo player web oficial da Apple com o Widevine embutido na TV, exatamente como em um navegador de computador no music.apple.com. É preciso ter sua própria assinatura paga. O AMTV é um projeto independente e não oficial.
</details>

<details><summary><b>Funciona no meu TV box / Fire TV?</b></summary>

Ele é testado em um **Xiaomi TV Box S (2ª geração), Google TV, Android 14**. Deve funcionar em qualquer aparelho Android TV / Google TV com Android 10+ e Widevine (ou seja, praticamente todos os aparelhos certificados: Chromecast with Google TV, NVIDIA Shield, Mi Box, Onn, TVs com Google TV). Também há relatos de que funciona em uma TV Changhong (Android 11) e em uma Sony Bravia (Android TV 12). O Fire TV não foi testado — relatos são bem-vindos.
</details>

<details><summary><b>Lossless, Dolby Atmos, videoclipes?</b></summary>

O AMTV reproduz o que o player web da Apple reproduz: AAC de alta qualidade. Lossless e Dolby Atmos não estão disponíveis na web. Videoclipes ainda não são suportados.
</details>

<details><summary><b>Por que a primeira inicialização leva ~10 segundos?</b></summary>

O app carrega o player web da Apple e restaura a sua sessão; a tela de abertura mostra o que está fazendo. Iniciar uma estação leva alguns segundos porque o player da Apple busca as faixas da estação, uma licença de reprodução e o começo do áudio antes de tocar. Depois disso, a navegação fica em cache e é rápida.
</details>

<details><summary><b>A música continua tocando quando eu saio do app?</b></summary>

Ela é pausada quando você sai do app (botão Início, outro app) e continua tocando sob o protetor de tela da TV.
</details>

<details><summary><b>O conteúdo é de outro país</b></summary>

O Apple Music mostra o catálogo do país do seu Apple ID. Antes de você iniciar sessão, o site pode deduzir um país pelo seu endereço IP.
</details>

## Solução de problemas

| Problema | Tente isto |
|---|---|
| Travado na tela de abertura | Verifique a conexão com a internet; a tela de abertura desiste após 30 s e mostra o site. |
| “É preciso iniciar sessão” toda vez | Confira se a data e a hora da TV estão corretas; inicie sessão de novo em Ajustes → Modo site. |
| Sem som, ou “Falha ao reproduzir” | Seu aparelho precisa ter Widevine (todas as TVs certificadas pelo Google têm). Confira se a sua assinatura está ativa em music.apple.com. |
| Aparece o ponteiro em vez da interface de TV | Pressione **Voltar** — ele sai do modo site e volta para a interface de TV. |
| Algo parece errado depois de uma atualização | Ajustes → **Atualizar dados**, ou limpe o armazenamento do app nas configurações do Android (você vai precisar iniciar sessão de novo). |

## Como funciona

```
┌──────────────── AMTV (app Android) ────────────────┐
│  WebView ── music.apple.com (player web da Apple)   │
│    │          ├── MusicKit JS: sua sessão iniciada   │
│    │          └── <audio> + Widevine: reprodução     │
│    └── interface de TV (HTML/CSS/JS num shadow DOM)  │
│           dados ← API MusicKit (amp-api)             │
│           tocar → MusicKit setQueue / play           │
│  Controle ─► MainActivity ─► a interface de TV       │
│  Intents (--es play / --es cmd) ─► o player          │
└─────────────────────────────────────────────────────┘
```

- **Sem truques com DRM, sem extração de tokens.** A interface consulta a API da Apple pela própria sessão MusicKit da página, já iniciada, e começa a reprodução com o MusicKit, como o site faz.
- **A própria página da Apple continua carregada, mas escondida** (`display: none`) — o player é dela. O AMTV a mantém em uma página sem capas animadas e recusa as requisições que ela faria só para si mesma (vídeo das capas animadas, suas próprias miniaturas, analytics): num aparelho lento, essa foi a diferença entre uma estação começar em 20 s ou em 4 s.
- **Feito para GPUs fracas** — sem filtros de desfoque nem animações infinitas; o fundo de Reproduzindo é um canvas desfocado de 64×36, pintado uma vez por música e esticado; a letra avança com timers mirando a próxima palavra, não com um loop a cada quadro; a flutuação, a legenda que rola e a barra de progresso compartilham um único tique de 10 por segundo e se movem por animações pausadas, então nenhum passo faz a página refazer as camadas; as barrinhas da aba Reproduzindo mudam algumas vezes por segundo, só enquanto a música toca e a barra superior está na tela, e param após um minuto sem nenhuma tecla pressionada; a página escondida da Apple é impedida de animar qualquer coisa.
- **Tempo de reprodução exato** — o MusicKit informa o tempo em segundos inteiros; a barra de progresso e o relógio seguem o tempo exato do player, então nunca andam para trás.
- **Navegação pelo controle remoto** — um pequeno motor de foco: fileiras de itens focáveis, memória de cada fileira, prateleiras que deslizam com `transform`, troca de aba pelas bordas e um ponteiro de mouse para o modo site.

Mapa do código:

| Caminho | O que tem dentro |
|---|---|
| `src/com/megarohas/amtv/MainActivity.java` | WebView, tela de abertura, roteamento das teclas do controle, intents, filtro de requisições |
| `src/com/megarohas/amtv/Cursor.java` | o ponteiro na tela do modo site |
| `res/raw/page.js` | pequenas correções injetadas na página da Apple |
| `res/raw/tv_i18n.js` | as traduções da interface: uma tabela por idioma, com os originais em russo como chaves |
| `res/raw/tv_core.js` | a interface de TV: motor de foco, abas, funções auxiliares da API, reprodução |
| `res/raw/tv_screens.js` | Início, Explorar, Rádio, Biblioteca, Buscar, Ajustes, álbum / playlist / artista |
| `res/raw/tv_player.js` | Reproduzindo: fundo, letra, avanço na faixa, favoritos |
| `res/raw/signin.js` | a página de início de sessão da Apple adaptada para o controle remoto: moldura de foco, setas, OK abre o teclado (só apresentação; nunca lê o que você digita) |
| `res/values*/strings.xml` | as linhas da tela de abertura em cada idioma |
| `res/raw/brand.js` | ajustes de marca (ícones, fonte) — o único arquivo que um build personalizado troca |
| `tools/cdp.mjs` | auxiliar do Chrome DevTools: inspecionar a interface e recarregá-la a quente numa TV de verdade |

## Compilar a partir do código-fonte

Sem Gradle — o Makefile chama diretamente as ferramentas do Android SDK; um build leva alguns segundos.

Requisitos: **Android SDK** (build-tools 36.0.0, plataforma `android-36`), **JDK 17 ou mais recente**, `make`, `adb`.

```bash
git clone https://github.com/megarohas/apple-music-android-tv.git
cd apple-music-android-tv
make                                   # → build/amtv.apk (assinado com a sua chave de debug)
make install TV=192.168.1.50:5555      # TV box conectado via adb; ou coloque `TV = …` no local.mk
make start

make dev-install && make dev-start    # um app “AMTV Dev” separado, ao lado (com sessão e dados próprios), para testes
```

Os caminhos podem ser substituídos: `make SDK=/caminho/para/sdk BT=$SDK/build-tools/36.0.0`.

Desenvolva numa TV de verdade sem reinstalar:

```bash
make devtools                                  # encaminha o DevTools da WebView para localhost:9222
node tools/cdp.mjs run res/raw/tv_i18n.js res/raw/tv_core.js res/raw/tv_screens.js res/raw/tv_player.js
node tools/cdp.mjs eval '__tv.boot()'          # interface recarregada a quente
node tools/cdp.mjs shot screen.png             # ou inspecione em chrome://inspect
```

Uma marca personalizada (seus próprios ícones e fonte) vai em `res/raw/brand.js` e `assets/fonts/` — veja os comentários nesse arquivo.

### Adicionando um idioma

1. `res/raw/tv_i18n.js` — copie a tabela em inglês, traduza os valores e adicione o idioma a `LANGS` (o código dele e o nome dele no próprio idioma).
2. `res/values-<código>/strings.xml` — as sete linhas da tela de abertura.
3. `res/raw/signin.js` — a dica de uma linha sobre o controle remoto na página de início de sessão da Apple.
4. Opcionalmente, `README.<código>.md`, com link na linha de idiomas no topo de cada README.

Mantenha os textos mais ou menos do tamanho dos em inglês: a barra superior e o player têm pouco espaço. Depois rode `make` e confira cada aba numa TV.

## Créditos

- [**JObersi10/apple-music-tv**](https://github.com/JObersi10/apple-music-tv) — um cliente nativo do Apple Music para Android TV cuja pesquisa sobre a API web da Apple (endpoints de Início, Explorar, Rádio, letras, favoritos) e cujas ideias de UX para TV ajudaram muito. Nenhum código foi copiado. Aquele projeto descriptografa os streams por conta própria; o AMTV deliberadamente não faz isso e deixa a reprodução com o player da Apple.
- [**Material Icons**](https://github.com/google/material-design-icons) (Apache License 2.0) — a base do conjunto de ícones do AMTV. Veja [NOTICE](NOTICE).
- **Traduções** — francês por [NeoNathoon](https://github.com/NeoNathoon). Os outros idiomas ainda não foram revisados por falantes nativos: correções são bem-vindas como pull requests.
- **Apple MusicKit on the Web** — o player e a API da Apple com os quais o AMTV se comunica.

## Aviso legal

O AMTV é um projeto independente de código aberto, **não afiliado à Apple Inc. nem autorizado ou endossado por ela.** Apple, Apple Music e Apple ID são marcas comerciais da Apple Inc., usadas aqui apenas para descrever com o que o app funciona. O AMTV não inclui fontes, ícones nem logotipos da Apple, não modifica nem contorna DRM e exige uma assinatura válida do Apple Music. As capas de álbuns nas capturas de tela pertencem aos seus proprietários e são mostradas a título de ilustração.

## Licença

[MIT](LICENSE) © 2026 megarohas
