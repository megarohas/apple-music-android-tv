<div align="center">

<img src="docs/icon.png" width="96" alt="AMTV のアイコン">

# AMTV — Android TV・Google TV 向け Apple Music

**Android TV、Google TV、Xiaomi Mi Box、Chromecast with Google TV、NVIDIA Shield をはじめ、Android 搭載の TV ボックスで使える非公式の Apple Music アプリです。リモコン操作を前提に作られています。**

[![APK をダウンロード](https://img.shields.io/github/v/release/megarohas/apple-music-android-tv?label=APK%20%E3%82%92%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89&color=fa233b&style=for-the-badge)](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)
&nbsp;
[![ライセンス：MIT](https://img.shields.io/badge/%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9-MIT-333?style=for-the-badge)](LICENSE)

[English](README.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Français](README.fr.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · **日本語** · [简体中文](README.zh-CN.md)

[5 分でインストール](#インストール) · [リモコン操作](#リモコンでの操作) · [よくある質問](#よくある質問) · [しくみ](#しくみ)

<img src="docs/screenshots/now_controls.jpg" width="820" alt="テレビに表示された AMTV の「再生中」画面">

</div>

---

## AMTV とは

**Android TV / Google TV 用の公式 Apple Music アプリはありません**。Apple の Android スマートフォン用アプリを手動でインストールすることはできますが、タッチ操作向けに作られているため、リモコンでは非常に使いづらいです。スマートフォンからキャストすることもできますが、その場合はスマートフォンがリモコン代わりになってしまいます。

**AMTV** があれば、テレビで本格的な Apple Music アプリが使えます：

- Apple ID でのサインインは**一度だけ**。Apple 自身のサインインページで行います。
- リモコンの矢印キーで**ホーム、見つける、ラジオ、ライブラリ、検索**の各画面を見て回れます。
- OK を押せば音楽が流れ、落ち着いたフルスクリーンの**再生中**画面が表示されます。

無料のオープンソースで、**ハックは一切ありません**。内部では **Apple 公式の Webプレーヤー**（[music.apple.com](https://music.apple.com)）を動かし、その上にテレビ向けのインターフェイスを載せているだけです。再生、DRM、アカウントはすべて Apple の管理下にとどまります。

> **Apple Music のサブスクリプション**が必要です。AMTV は Apple と提携しておらず、Apple の承認も受けていません。

## スクリーンショット

| | |
|:---:|:---:|
| <img src="docs/screenshots/browse.jpg" alt="「見つける」：テレビに表示された Apple Music 編集部のおすすめ"> | <img src="docs/screenshots/radio.jpg" alt="「ラジオ」：Apple Music 1、Hits、Country のライブラジオ"> |
| **見つける** — Apple 編集部のおすすめ、新着ミュージック、チャート | **ラジオ** — Apple Music 1、Hits、Country とラジオ番組 |
| <img src="docs/screenshots/now_calm.jpg" alt="「再生中」：アートワーク、曲名、アーティスト名だけの表示"> | <img src="docs/screenshots/now_lyrics.jpg" alt="単語単位で同期する歌詞を表示した「再生中」画面"> |
| **再生中** — 落ち着いた表示。どのキーを押してもコントロールが現れます | **歌詞** — 単語単位で同期、初期設定ではオフ |
| <img src="docs/screenshots/album.jpg" alt="曲リストと「再生」「シャッフル」ボタンのあるアルバムページ"> | <img src="docs/screenshots/artist.jpg" alt="バイオグラフィとトップソングのあるアーティストページ"> |
| **アルバム** — 人気の曲に印、「再生」/「シャッフル」 | **アーティスト** — バイオグラフィ、トップソング、アルバム、同じタイプのアーティスト |
| <img src="docs/screenshots/search.jpg" alt="アーティストと曲の検索結果"> | <img src="docs/screenshots/menu.jpg" alt="OK 長押しメニュー：「次に再生」「最後に再生」「ライブラリに追加」"> |
| **検索** — テレビの画面キーボードで入力 | **OK 長押し** — 次に再生、最後に再生、ライブラリに追加、ステーション |
| <img src="docs/screenshots/settings.jpg" alt="「設定」：Webサイトモード、言語、サインアウト"> | <img src="docs/screenshots/splash.jpg" alt="読み込み中の内容を表示する起動画面"> |
| **設定** — 言語、Webサイトモード、サインアウト | **起動画面** — いま何をしているかを表示 |

*スクリーンショットは英語のインターフェイスです。テレビの言語が日本語なら、インターフェイスも日本語で表示されます。*

## 機能

- 🎛️ **リモコン操作に最適化** — 矢印キーでカードを移動し、OK で再生したり開いたり、「戻る」で前の画面に戻ります。どの行でも、前にいた位置をフォーカスが覚えています。
- 🏠 **ホーム** — あなた専用のおすすめ：「あなたにおすすめ」のプレイリスト、最近再生した項目、あなたにおすすめのステーション、ニューリリース。
- 🧭 **見つける**と**ラジオ** — Apple 編集部のおすすめ、チャート、ライブラジオ（Apple Music 1、Hits、Country…）、ラジオ番組。
- 📚 **ライブラリ** — 最近追加した項目、プレイリスト、アルバム、アーティスト、曲。
- 🔍 **検索** — アーティスト、曲、アルバム、プレイリスト、ステーションを検索でき、検索履歴も残ります。
- 💿 **アルバム、プレイリスト、アーティストのページ** — 「再生」「シャッフル」「ライブラリに追加」。人気の曲には Apple Music と同じように印が付きます。
- 🎵 **再生中** — 大きなアートワーク、なめらかな曲の切り替え、アートワークの色に染まる背景。コントロールは自動で隠れ、隠れている間は **←/→ で曲をスキップ**でき、なめらかに動くつまみで再生位置を調整できます。長い曲名はスクロールし、アートワーク、曲名、アーティスト名、時計がまとめてゆっくり漂うので、画面に焼き付きが残りません。音楽の再生中はテレビのスクリーンセーバーが起動せず、その間「再生中」タブのバーが動きます。
- ⭐ **お気に入り** — プレーヤーの星ボタン（Apple Music の ⭐ と同じ）。
- 📝 **歌詞** — Apple Music の、単語単位で同期する歌詞（プレーヤーの歌詞ボタンでオンにします）。
- 🗣️ **音声操作と自動化への対応** — アプリの外からステーションを開始したり、曲をスキップしたりできます（[自動化](#音声アシスタントと自動化)を参照）。オープンソースの音声リモコン [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) と連携できます。
- 🌐 **9 言語のインターフェイス** — English、Deutsch、Español、Français、Português、Русский、हिन्दी、日本語、简体中文。テレビの言語に従います。「設定」→「言語」には、すべての言語がそれぞれの言語での名前で並びます。
- 🐢 **非力な TV ボックスでも軽快** — Xiaomi TV Box S（4×Cortex-A55、Mali-G31、RAM 2 GB）で調整済み：アイドル時の CPU 使用率はほぼ 0%、終わりのないアニメーションはなく、バックグラウンドでのダウンロードもありません。
- 🖱️ **Webサイトモード** — 画面上のポインタで操作する、Apple Music のフル機能の Webサイト。TV インターフェイスでまだできないことに使えます。

## インストール

### 必要なもの

- **Android 10 以降**を搭載した **Android TV / Google TV** デバイス（TV ボックス、スティック、Android TV / Google TV 搭載のテレビ）。
- **Apple Music のサブスクリプション**と **Apple ID**。
- 5 分ほどの時間。

### 方法 1 — 無料アプリ「Downloader」を使う（いちばん簡単、パソコン不要）

1. テレビで **Google Play** を開き、**Downloader**（AFTVnews 製）をインストールします。
2. Downloader からのアプリのインストールを許可します：**設定 → アプリ → セキュリティと制限 → 提供元不明のアプリ → Downloader → オン**
   *（項目の場所はテレビによって少し異なります。設定で「提供元不明のアプリ」を検索してください）*。
3. **Downloader** を開き、次のアドレスを入力して **Go** を押します：
   ```
   https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk
   ```
4. ダウンロードが終わったら**インストール**を押し、続けて**開く**を押します。

### 方法 2 — スマートフォンやパソコンからファイルを送る

1. [`amtv.apk`](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk) をダウンロードします。
2. **Send Files to TV** や **LocalSend** などのアプリ、または USB メモリでテレビに送ります。
3. テレビのファイルマネージャでファイルを開き、**インストール**を押します（確認が表示されたら、そのファイルマネージャに「提供元不明のアプリ」を許可してください）。

### 方法 3 — ADB（上級者向け）

```bash
adb connect <テレビのIP>:5555
adb install amtv.apk
```

### 初回起動

1. アプリの行から **AMTV** を開きます（音符の付いた赤いタイル）。
2. **サインイン**を押すと、リモコン向けに調整された Apple 自身のサインインページが開きます。**↑ / ↓** で入力欄やボタンを選び（赤い枠）、入力欄で **OK** を押すと画面キーボードが表示され、ボタンで **OK** を押すとそのボタンが押されます。Apple ID を入力 → 「続ける」 → パスワードを入力 → 「サインイン」と進みます。2 ファクタ認証のコードは、いつもどおり iPhone / Mac に届きます。
   > ヒント：スマートフォンの **Google TV** アプリはテレビのキーボードとして使えます。パスワードマネージャからパスワードを貼り付けることもできます。
3. これで完了です。AMTV が TV インターフェイスに切り替わります。サインインしたままになるので、次回からは「ホーム」が直接開きます。

> パスワードを入力するのは **Apple のページだけ**（`idmsa.apple.com`）です。AMTV がパスワードを見たり保存したりすることはありません。

## リモコンでの操作

| ボタン | 動作 |
|---|---|
| **← ↑ → ↓** | カード、行、上部のバーの間を移動します。タブはフォーカスが乗った時点で開きます。 |
| **行の末尾で → / 先頭で ←** | 次 / 前のタブに移動します（「ホーム」で **←** を押すと「再生中」に直接移動します）。 |
| **OK** | 曲やステーションを再生します。アルバム / プレイリスト / アーティストを開きます。 |
| **OK 長押し** | メニュー：「再生」「シャッフル」「次に再生」「最後に再生」「ライブラリに追加」「ステーションを作成」。 |
| **戻る** | 前のページ → 「ホーム」 → アプリを終了（音楽は一時停止します）。 |
| **再生/一時停止、次へ、前へ**（リモコンにある場合） | アプリ内のどこでも音楽を操作できます。 |

**再生中**画面では：

| ボタン | 動作 |
|---|---|
| 任意のキー | コントロールを表示（数秒後に隠れます） |
| コントロールが隠れているときに **← / →** | 前 / 次の曲 |
| **↓** で進行状況バーへ移動し、**← / →** | 1 回押すごとに 10 秒移動（押すのをやめると、なめらかに 1 回でシーク） |
| ⭐ | お気に入りに追加 / 削除 |
| 歌詞ボタン | 歌詞のオン / オフ |

## 音声アシスタントと自動化

AMTV は簡単なコマンドを Android のインテントとして受け付けるので、音声リモコンや Tasker のようなツール、スクリプトから操作できます：

```bash
# ステーション / プレイリスト / アルバムを再生（必要ならアプリを開き、音楽が始まるとプレーヤーを表示）
adb shell am start -n com.megarohas.amtv/.MainActivity --es play ra.978194965      # Apple Music 1
adb shell am start -n com.megarohas.amtv/.MainActivity --es play pl.<プレイリストID>

# プレーヤーを操作
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd next        # next | prev | pause | play | toggle
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd favorite    # ⭐ 再生中の曲をお気に入りに追加
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd unfavorite  # お気に入りから削除（お気に入りでなければ何もしない）
```

ID は Apple Music のリンクに含まれているものです（`music.apple.com/…/playlist/…/pl.xxxx`、ステーションは `ra.…`、アルバムは数字）。音声リモコン [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) はまさにこの仕組みを使っています：「リモコン、音楽をかけて」と話しかけると TV ボックスが起動し、AMTV が開いて、あなたのステーションが流れ始めます。

## よくある質問

<details><summary><b>Android TV / Google TV 用の公式 Apple Music アプリはありますか？</b></summary>

ありません（2026 年時点）。Apple は Android スマートフォン向けと一部のスマートテレビ（Samsung、LG）向けに Apple Music を提供していますが、Android TV / Google TV のボックス向けには提供していません。AMTV は Apple 自身の Webプレーヤーを使って、その空白を埋めます。
</details>

<details><summary><b>合法ですか？DRM を破っているのですか？</b></summary>

AMTV は DRM を回避したり、トークンを抜き出したりは**しません**。音楽はテレビに内蔵された Widevine を使い、Apple 公式の Webプレーヤーで再生されます。パソコンのブラウザで music.apple.com を使う場合とまったく同じです。ご自身の有料サブスクリプションが必要です。AMTV は独立した非公式のプロジェクトです。
</details>

<details><summary><b>手持ちの TV ボックスや Fire TV で動きますか？</b></summary>

**Xiaomi TV Box S（第 2 世代）、Google TV、Android 14** で動作を確認しています。Android 10 以降と Widevine を備えた Android TV / Google TV デバイスなら動くはずです（認定デバイスのほぼすべてが該当します：Chromecast with Google TV、NVIDIA Shield、Mi Box、Onn、Google TV 搭載のテレビ）。Changhong のテレビ（Android 11）や Sony Bravia（Android TV 12）で動いたという報告もあります。Fire TV は未検証です。報告をお待ちしています。
</details>

<details><summary><b>ロスレス、Dolby Atmos、ミュージックビデオは？</b></summary>

AMTV が再生できるのは、Apple の Webプレーヤーが再生できるもの、つまり高音質の AAC です。ロスレスと Dolby Atmos は Web では利用できません。ミュージックビデオにはまだ対応していません。
</details>

<details><summary><b>初回の起動に 10 秒ほどかかるのはなぜですか？</b></summary>

アプリが Apple の Webプレーヤーを読み込み、サインイン状態を復元するためです。起動画面には、いま何をしているかが表示されます。ステーションの開始に数秒かかるのは、再生前に Apple のプレーヤーがステーションの曲、再生ライセンス、最初の音声データを取得するためです。その後の画面移動はキャッシュされるので高速です。
</details>

<details><summary><b>アプリを離れても音楽は再生され続けますか？</b></summary>

アプリを離れると（ホームボタン、別のアプリ）一時停止します。テレビのスクリーンセーバーの表示中は再生が続きます。
</details>

<details><summary><b>別の国のコンテンツが表示される</b></summary>

Apple Music には、Apple ID の国のカタログが表示されます。サインインする前は、Webサイトが IP アドレスから国を推測することがあります。
</details>

## トラブルシューティング

| 問題 | 対処法 |
|---|---|
| 起動画面から先に進まない | インターネット接続を確認してください。起動画面は 30 秒で待つのをやめ、Webサイトを表示します。 |
| 毎回「サインインが必要です」と表示される | テレビの日付と時刻が正しいか確認し、「設定」→「Webサイトモード」からサインインし直してください。 |
| 音が出ない、または「再生できませんでした」と表示される | デバイスに Widevine が必要です（Google 認定のテレビにはすべて搭載されています）。music.apple.com でサブスクリプションが有効か確認してください。 |
| TV インターフェイスの代わりにポインタが表示される | **戻る**を押してください。Webサイトモードから TV インターフェイスに戻ります。 |
| アップデート後に表示がおかしい | 「設定」→「**データを更新**」を実行するか、Android の設定でアプリのストレージを消去してください（もう一度サインインが必要になります）。 |

## しくみ

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

- **DRM の小細工もトークンの抽出もありません。** インターフェイスは、ページ自身のサインイン済み MusicKit セッションを通じて Apple の API に問い合わせ、Webサイトと同じように MusicKit で再生を開始します。
- **Apple 自身のページは読み込まれたまま非表示になっています**（`display: none`）。プレーヤーを持っているのはこのページです。AMTV はこのページを動くアートワークのないページにとどめ、このページが自分のためだけに行うリクエスト（モーションアートワークの動画、独自のサムネイル、アナリティクス）を拒否します。低速なボックスでは、これがステーション開始までの 20 秒と 4 秒の差になりました。
- **非力な GPU 向けの設計** — ぼかしフィルタや終わりのないアニメーションは使いません。「再生中」の背景は、曲ごとに 1 回だけ描いて引き伸ばす 64×36 のぼかしたキャンバスです。歌詞はフレームごとのループではなく、次の単語に合わせたタイマーで進みます。漂う動き、スクロールするキャプション、進行状況バーは 1 秒に 10 回の共通のティックで動き、一時停止したアニメーションを使って移動するため、1 ステップごとにページのレイヤーが作り直されることはありません。「再生中」タブのバーは、音楽の再生中かつ上部のバーが画面に出ているときだけ 1 秒に数回更新され、キー操作がないまま 1 分たつと止まります。Apple の非表示のページには、アニメーションを一切させません。
- **正確な再生時間** — MusicKit は時間を秒単位の整数で返しますが、進行状況バーと時間表示はプレーヤーの正確な時間に従うため、表示が後戻りすることはありません。
- **リモコンでのナビゲーション** — 小さなフォーカスエンジン：フォーカスできる項目の行、行ごとの位置の記憶、`transform` でスライドするシェルフ、端からのタブ切り替え、Webサイトモード用のマウスポインタ。

コードの構成：

| パス | 内容 |
|---|---|
| `src/com/megarohas/amtv/MainActivity.java` | WebView、スプラッシュ画面、リモコンのキーの振り分け、インテント、リクエストフィルタ |
| `src/com/megarohas/amtv/Cursor.java` | Webサイトモード用の画面上のポインタ |
| `res/raw/page.js` | Apple のページに注入する小さな修正 |
| `res/raw/tv_i18n.js` | インターフェイスの翻訳：言語ごとに 1 つの表で、キーはロシア語の原文 |
| `res/raw/tv_core.js` | TV インターフェイス：フォーカスエンジン、タブ、API ヘルパー、再生 |
| `res/raw/tv_screens.js` | ホーム、見つける、ラジオ、ライブラリ、検索、設定、アルバム / プレイリスト / アーティスト |
| `res/raw/tv_player.js` | 再生中：背景、歌詞、シーク、お気に入り |
| `res/raw/signin.js` | リモコン向けに調整した Apple のサインインページ：フォーカスリング、矢印キー、OK でキーボードを開く（見た目だけの調整で、入力内容は一切読み取りません） |
| `res/values*/strings.xml` | 各言語の起動画面の文言 |
| `res/raw/brand.js` | ブランディングの設定（アイコン、フォント）。カスタムビルドで差し替えるのはこのファイルだけです |
| `tools/cdp.mjs` | Chrome DevTools 用のヘルパー：実機のテレビでインターフェイスを調べたり、ホットリロードしたりできます |

## ソースからビルド

Gradle は使いません。Makefile が Android SDK のツールを直接呼び出すので、ビルドは数秒で終わります。

必要なもの：**Android SDK**（build-tools 36.0.0、プラットフォーム `android-36`）、**JDK 17 以降**、`make`、`adb`。

```bash
git clone https://github.com/megarohas/apple-music-android-tv.git
cd apple-music-android-tv
make                                   # → build/amtv.apk（自分のデバッグ鍵で署名）
make install TV=192.168.1.50:5555      # adb で接続した TV ボックス。または local.mk に `TV = …` と書く
make start

make dev-install && make dev-start    # テスト用に、別アプリ「AMTV Dev」を並べてインストール（サインインとデータは別）
```

パスは上書きできます：`make SDK=/path/to/sdk BT=$SDK/build-tools/36.0.0`。

再インストールせずに実機のテレビで開発するには：

```bash
make devtools                                  # WebView の DevTools を localhost:9222 に転送
node tools/cdp.mjs run res/raw/tv_i18n.js res/raw/tv_core.js res/raw/tv_screens.js res/raw/tv_player.js
node tools/cdp.mjs eval '__tv.boot()'          # インターフェイスをホットリロード
node tools/cdp.mjs shot screen.png             # または chrome://inspect で調べる
```

独自のブランディング（自分のアイコンとフォント）は `res/raw/brand.js` と `assets/fonts/` に置きます。詳しくはそのファイル内のコメントを参照してください。

### 言語を追加する

1. `res/raw/tv_i18n.js` — 英語の表をコピーして値を翻訳し、`LANGS` にその言語（言語コードと、その言語での名前）を追加します。
2. `res/values-<code>/strings.xml` — 起動画面の 7 行の文言。
3. `res/raw/signin.js` — Apple のサインインページに表示する、1 行のリモコン操作のヒント。
4. 必要に応じて `README.<code>.md`。すべての README の冒頭にある言語の行からリンクします。

文字列は英語とほぼ同じ長さに収めてください。上部のバーとプレーヤーには余裕があまりありません。そのあと `make` を実行し、テレビですべてのタブを確認してください。

## クレジット

- [**JObersi10/apple-music-tv**](https://github.com/JObersi10/apple-music-tv) — Android TV 用のネイティブな Apple Music クライアント。Apple の Web API に関する調査（ホーム、見つける、ラジオ、歌詞、お気に入りのエンドポイント）と、テレビ向け UX のアイデアが大いに役立ちました。コードはコピーしていません。あちらのプロジェクトはストリームを自前で復号しますが、AMTV はあえてそうせず、再生は Apple のプレーヤーに任せています。
- [**Material Icons**](https://github.com/google/material-design-icons)（Apache License 2.0）— AMTV のアイコンセットのベースです。[NOTICE](NOTICE) を参照してください。
- **翻訳** — フランス語は [NeoNathoon](https://github.com/NeoNathoon) によるものです。そのほかの言語はまだネイティブスピーカーによる確認を受けていません。修正はプルリクエストで歓迎します。
- **Apple MusicKit on the Web** — AMTV が通信する、Apple のプレーヤーと API。

## 法的事項

AMTV は独立したオープンソースプロジェクトであり、**Apple Inc. と提携しておらず、Apple Inc. から許可も承認も受けていません。** Apple、Apple Music、Apple ID は Apple Inc. の商標であり、ここではこのアプリが何と連携して動作するかを説明するためにのみ使用しています。AMTV は Apple のフォント、アイコン、ロゴを含まず、DRM を改変したり回避したりせず、有効な Apple Music のサブスクリプションを必要とします。スクリーンショット内のアルバムアートワークはそれぞれの所有者に帰属し、説明のために表示しています。

## ライセンス

[MIT](LICENSE) © 2026 megarohas
