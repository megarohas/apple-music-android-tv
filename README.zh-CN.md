<div align="center">

<img src="docs/icon.png" width="96" alt="AMTV 图标">

# AMTV — 适用于 Android TV 和 Google TV 的 Apple Music

**一款为遥控器打造的非官方 Apple Music 应用，适用于 Android TV、Google TV、Xiaomi Mi Box、Chromecast with Google TV、NVIDIA Shield 及其他基于 Android 的电视盒子。**

[![下载 APK](https://img.shields.io/github/v/release/megarohas/apple-music-android-tv?label=%E4%B8%8B%E8%BD%BD%20APK&color=fa233b&style=for-the-badge)](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)
&nbsp;
[![许可证：MIT](https://img.shields.io/badge/%E8%AE%B8%E5%8F%AF%E8%AF%81-MIT-333?style=for-the-badge)](LICENSE)

[English](README.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Français](README.fr.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md) · [हिन्दी](README.hi.md) · [日本語](README.ja.md) · **简体中文**

[5 分钟完成安装](#安装) · [遥控器操作](#用遥控器操作) · [常见问题](#常见问题) · [工作原理](#工作原理)

<img src="docs/screenshots/now_controls.jpg" width="820" alt="电视上的 AMTV“播放中”界面">

</div>

---

## 这是什么？

**Android TV / Google TV 上没有官方的 Apple Music 应用**。Apple 的 Android 手机版应用虽然可以侧载，但它是为触摸屏设计的，用遥控器操作非常痛苦。从手机投屏倒是可行，但那样一来，手机就成了遥控器。

**AMTV** 让你的电视拥有一款真正好用的 Apple Music 应用：

- 只需在 Apple 自己的登录页面上用 Apple ID 登录**一次**；
- 用遥控器的方向键浏览**主页、新发现、广播、资料库和搜索**；
- 按下 OK，音乐就开始播放，并显示简洁的全屏**播放中**界面。

它免费、开源，而且**不含任何破解手段**：底层运行的是 **Apple 官方网页播放器**（[music.apple.com](https://music.apple.com)），AMTV 只是在其上加了一层适合电视的界面。播放、DRM 和你的账户都仍由 Apple 负责。

> 你需要 **Apple Music 订阅**。AMTV 与 Apple 无关联，也未获得 Apple 的认可。

## 截图

| | |
|:---:|:---:|
| <img src="docs/screenshots/browse.jpg" alt="新发现：电视上的 Apple Music 编辑精选"> | <img src="docs/screenshots/radio.jpg" alt="广播：Apple Music 1、Hits 和 Country 直播电台"> |
| **新发现**：Apple 编辑精选、新音乐、排行榜 | **广播**：Apple Music 1、Hits、Country 及电台节目 |
| <img src="docs/screenshots/now_calm.jpg" alt="播放中：只显示封面、歌名和艺人"> | <img src="docs/screenshots/now_lyrics.jpg" alt="播放中，显示逐字同步的歌词"> |
| **播放中**：简洁画面，按任意键显示控制按钮 | **歌词**：逐字同步，默认关闭 |
| <img src="docs/screenshots/album.jpg" alt="专辑页面，带曲目列表及“播放”/“随机播放”按钮"> | <img src="docs/screenshots/artist.jpg" alt="艺人页面，带简介和热门歌曲"> |
| **专辑**：热门曲目有标记，可“播放”/“随机播放” | **艺人**：简介、热门歌曲、专辑、类似艺人 |
| <img src="docs/screenshots/search.jpg" alt="艺人和歌曲的搜索结果"> | <img src="docs/screenshots/menu.jpg" alt="长按 OK 菜单：插播、最后播放、添加到资料库"> |
| **搜索**：使用电视的屏幕键盘 | **长按 OK**：插播、最后播放、添加到资料库、创建电台 |
| <img src="docs/screenshots/settings.jpg" alt="设置：网页模式、语言、退出登录"> | <img src="docs/screenshots/splash.jpg" alt="启动画面，显示正在载入的内容"> |
| **设置**：语言、网页模式、退出登录 | **启动画面**：显示当前正在做什么 |

*截图中是英文界面；在语言设为简体中文的电视上，界面就是简体中文。*

## 功能

- 🎛️ **为遥控器而生**：方向键在卡片之间移动，OK 键播放或打开，返回键返回上一层。每一行都会记住你上次停留的位置。
- 🏠 **主页**：你的个性化推荐，包括“专属推荐”播放列表、最近播放、为你推荐的电台和最新发行。
- 🧭 **新发现与广播**：Apple 的编辑精选、排行榜、直播电台（Apple Music 1、Hits、Country 等）以及电台节目。
- 📚 **资料库**：最近添加、播放列表、专辑、艺人、歌曲。
- 🔍 **搜索**：艺人、歌曲、专辑、播放列表和电台，并保留搜索历史记录。
- 💿 **专辑、播放列表和艺人页面**：“播放”、“随机播放”、“添加到资料库”；热门曲目会像在 Apple Music 中一样带有标记。
- 🎵 **播放中**：大尺寸封面，曲目切换平滑，背景随封面着色；控制按钮会自动隐藏，隐藏时 **←/→ 可切换曲目**，进度可用平滑的滑块拖动。过长的标题会滚动显示；封面、标题、艺人和时钟会一起缓慢漂移，以免在屏幕上留下烧屏残影。播放音乐时电视不会进入屏保，“播放中”标签页上的音柱也会随之跳动。
- ⭐ **个人收藏**：播放器里的星标（与 Apple Music 中的 ⭐ 相同）。
- 📝 **歌词**：来自 Apple Music 的逐字同步歌词（用播放器中的歌词按钮打开）。
- 🗣️ **语音与自动化接口**：可从应用外部启动电台或切换曲目（见[自动化](#语音助手与自动化)）；可配合开源语音遥控器 [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) 使用。
- 🌐 **九种界面语言**：English、Deutsch、Español、Français、Português、Русский、हिन्दी、日本語和简体中文。界面跟随电视的语言；“设置” → “语言”中列出了全部语言，每种语言都以其自身的名称显示。
- 🐢 **低配电视盒子也流畅**：在 Xiaomi TV Box S（4×Cortex-A55、Mali-G31、2 GB 内存）上调校过，空闲时 CPU 占用约为 0%，没有无休止的动画，后台也不下载任何内容。
- 🖱️ **网页模式**：完整的 Apple Music 网站，带屏幕指针，用来完成电视界面暂时还做不到的事情。

## 安装

### 准备工作

- 一台运行 **Android 10 或更高版本**的 **Android TV / Google TV** 设备（电视盒子、电视棒，或搭载 Android TV / Google TV 的电视机）。
- **Apple Music 订阅**和你的 **Apple ID**。
- 5 分钟时间。

### 方式 1：使用免费的“Downloader”应用（最简单，无需电脑）

1. 在电视上打开 **Google Play**，安装 **Downloader**（开发者：AFTVnews）。
2. 允许它安装应用：**设置 → 应用 → 安全和限制 → 未知来源 → Downloader → 开启**
   *（不同电视上的路径略有差异，可在“设置”中搜索“未知来源”）*。
3. 打开 **Downloader**，输入以下地址，然后按 **Go**：
   ```
   https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk
   ```
4. 下载完成后，按 **安装**，然后按 **打开**。

### 方式 2：从手机或电脑发送文件

1. 下载 [`amtv.apk`](https://github.com/megarohas/apple-music-android-tv/releases/latest/download/amtv.apk)。
2. 用 **Send Files to TV**、**LocalSend** 等应用或 U 盘把它传到电视上。
3. 在电视上用文件管理器打开它，然后按 **安装**（出现提示时，允许该文件管理器安装“未知来源”应用）。

### 方式 3：ADB（适合爱折腾的用户）

```bash
adb connect <电视IP>:5555
adb install amtv.apk
```

### 首次启动

1. 在应用行中打开 **AMTV**（带音符的红色图块）。
2. 按 **登录**，Apple 自己的登录页面随即打开，并已针对遥控器做了适配：**↑ / ↓** 选择输入框或按钮（以红框标出），在输入框上按 **OK** 会调出屏幕键盘，在按钮上按 **OK** 则会按下该按钮。输入 Apple ID → 继续 → 输入密码 → 登录。双重认证验证码会照常发送到你的 iPhone / Mac。
   > 提示：手机上的 **Google TV** 应用可以用作电视的键盘，你可以从密码管理器中粘贴密码。
3. 大功告成：AMTV 会切换到电视界面。登录状态会一直保留，下次打开时直接进入“主页”。

> 你的密码**只会输入到 Apple 的页面中**（`idmsa.apple.com`）。AMTV 既看不到，也不会存储你的密码。

## 用遥控器操作

| 按键 | 作用 |
|---|---|
| **← ↑ → ↓** | 在卡片、行和顶部栏之间移动。移到某个标签页上时，该标签页会立即打开。 |
| **在行末按 → / 在行首按 ←** | 跳到下一个 / 上一个标签页（在“主页”按 **←** 会直接跳到“播放中”）。 |
| **OK** | 播放歌曲或电台，打开专辑 / 播放列表 / 艺人。 |
| **长按 OK** | 菜单：播放、随机播放、插播、最后播放、添加到资料库、创建电台。 |
| **返回** | 回到上一页 → “主页” → 退出应用（音乐暂停）。 |
| **播放/暂停、下一首、上一首**（如果遥控器上有这些键） | 在应用内任何位置控制音乐播放。 |

在**播放中**界面：

| 按键 | 作用 |
|---|---|
| 任意键 | 显示控制按钮（几秒后自动隐藏） |
| 控制按钮隐藏时按 **← / →** | 上一首 / 下一首 |
| 按 **↓** 移到进度条，再按 **← / →** | 每按一次快进或快退 10 秒（停止按键后一次性平滑跳转） |
| ⭐ | 添加到个人收藏 / 取消收藏 |
| 歌词按钮 | 打开 / 关闭歌词 |

## 语音助手与自动化

AMTV 支持以 Android intent 形式发送的简单命令，因此可以用语音遥控器、Tasker 之类的工具或脚本来控制它：

```bash
# 播放电台 / 播放列表 / 专辑（必要时会打开应用，音乐开始后显示播放器）
adb shell am start -n com.megarohas.amtv/.MainActivity --es play ra.978194965      # Apple Music 1
adb shell am start -n com.megarohas.amtv/.MainActivity --es play pl.<播放列表ID>

# 控制播放器
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd next        # next | prev | pause | play | toggle
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd favorite    # ⭐ 将当前歌曲添加到个人收藏
adb shell am start -n com.megarohas.amtv/.MainActivity --es cmd unfavorite  # 取消收藏（如果它本来就不在个人收藏中，则不执行任何操作）
```

ID 就是 Apple Music 链接中的 ID（`music.apple.com/…/playlist/…/pl.xxxx`，电台为 `ra.…`，专辑则是数字）。语音遥控器 [megarohas_tv_voice](https://github.com/megarohas/megarohas_tv_voice) 正是这样用的：说一句“Remote, play music”，它就会唤醒电视盒子、打开 AMTV 并播放你的电台。

## 常见问题

<details><summary><b>Android TV / Google TV 有官方的 Apple Music 应用吗？</b></summary>

没有（截至 2026 年）。Apple 为 Android 手机和部分智能电视（Samsung、LG）提供了 Apple Music，但没有为 Android TV / Google TV 电视盒子提供。AMTV 借助 Apple 自己的网页播放器填补了这一空白。
</details>

<details><summary><b>这样合法吗？会破解 DRM 吗？</b></summary>

AMTV **不会**绕过 DRM，也不会提取令牌。音乐通过 Apple 官方网页播放器和电视内置的 Widevine 播放，与在电脑浏览器中访问 music.apple.com 完全一样。你需要自己的付费订阅。AMTV 是一个独立的非官方项目。
</details>

<details><summary><b>能在我的电视盒子 / Fire TV 上运行吗？</b></summary>

已在 **Xiaomi TV Box S（第 2 代）、Google TV、Android 14** 上测试。它应该能在任何运行 Android 10 及以上版本并支持 Widevine 的 Android TV / Google TV 设备上运行（几乎所有通过认证的设备都满足条件：Chromecast with Google TV、NVIDIA Shield、Mi Box、Onn、搭载 Google TV 的电视机）。也有用户反馈它能在 Changhong 电视（Android 11）和 Sony Bravia（Android TV 12）上运行。Fire TV 尚未测试，欢迎反馈。
</details>

<details><summary><b>支持无损、杜比全景声和音乐视频吗？</b></summary>

AMTV 能播放的就是 Apple 网页播放器能播放的：高品质 AAC。网页版不提供无损和杜比全景声。音乐视频暂不支持。
</details>

<details><summary><b>为什么第一次启动要花约 10 秒？</b></summary>

应用需要载入 Apple 的网页播放器并恢复你的登录状态，启动画面会显示它正在做什么。开始播放电台需要几秒钟，因为 Apple 的播放器在播放前要先获取电台的曲目、播放许可证和开头的音频。之后的浏览都有缓存，速度很快。
</details>

<details><summary><b>离开应用后音乐还会继续播放吗？</b></summary>

离开应用（按主屏幕键、切换到其他应用）时音乐会暂停；电视进入屏保时则会继续播放。
</details>

<details><summary><b>显示的是其他国家或地区的内容</b></summary>

Apple Music 显示的是你的 Apple ID 所属国家或地区的曲库。登录前，网站可能会根据你的 IP 地址推测国家或地区。
</details>

## 故障排除

| 问题 | 解决办法 |
|---|---|
| 卡在启动画面 | 检查网络连接；启动画面在 30 秒后会停止等待并显示网站。 |
| 每次都提示“需要登录” | 确认电视的日期和时间正确；然后在“设置” → “网页模式”中重新登录。 |
| 没有声音，或提示“无法开始播放” | 设备需要支持 Widevine（所有通过 Google 认证的电视都支持）。请在 music.apple.com 上确认你的订阅有效。 |
| 出现指针而不是电视界面 | 按 **返回** 键，即可从网页模式回到电视界面。 |
| 更新后显示异常 | 前往“设置” → **刷新数据**，或在 Android 设置中清除该应用的数据（之后需要重新登录）。 |

## 工作原理

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

- **不搞 DRM 花招，不提取令牌。** 界面通过页面自身已登录的 MusicKit 会话请求 Apple 的 API，并用 MusicKit 开始播放，与网站的做法相同。
- **Apple 自己的页面保持载入但处于隐藏状态**（`display: none`），播放器归它所有。AMTV 让它停留在没有动态封面的页面上，并拒绝它只为自身发出的请求（动态封面视频、它自己的缩略图、分析统计）：在慢速盒子上，电台启动时间因此从 20 秒缩短到 4 秒。
- **为低性能 GPU 打造**：没有模糊滤镜，也没有无休止的动画；“播放中”的背景是一张 64×36 的模糊 canvas，每首歌只绘制一次，然后拉伸显示；歌词由瞄准下一个词的定时器推进，而不是逐帧循环；漂移效果、滚动标题和进度条共用一个每秒 10 次的节拍，并通过暂停状态的动画来移动，因此每走一步都不会让页面重新分层；“播放中”标签页上的音柱每秒只跳动几次，而且只在播放音乐且顶部栏可见时才会动，一分钟没有按键后便停下；Apple 的隐藏页面则完全不允许播放任何动画。
- **精确的播放时间**：MusicKit 只以整秒报告时间；进度条和播放计时跟随播放器的精确时间，因此绝不会往回跳。
- **遥控器导航**：一个小巧的焦点引擎，包括由可聚焦项目组成的行、每行的位置记忆、用 `transform` 滑动的内容栏、在行边缘切换标签页，以及网页模式下的鼠标指针。

代码结构：

| 路径 | 内容 |
|---|---|
| `src/com/megarohas/amtv/MainActivity.java` | WebView、启动画面、遥控器按键分发、intent、请求过滤 |
| `src/com/megarohas/amtv/Cursor.java` | 网页模式下的屏幕指针 |
| `res/raw/page.js` | 注入 Apple 页面的小修补 |
| `res/raw/tv_i18n.js` | 界面翻译：每种语言一张表，以俄语原文为键 |
| `res/raw/tv_core.js` | 电视界面：焦点引擎、标签页、API 辅助函数、播放 |
| `res/raw/tv_screens.js` | 主页、新发现、广播、资料库、搜索、设置，以及专辑 / 播放列表 / 艺人页面 |
| `res/raw/tv_player.js` | 播放中：背景、歌词、拖动进度、个人收藏 |
| `res/raw/signin.js` | 为遥控器适配的 Apple 登录页面：焦点框、方向键、按 OK 打开键盘（只改变外观，从不读取你输入的内容） |
| `res/values*/strings.xml` | 各语言的启动画面文字 |
| `res/raw/brand.js` | 品牌设置（图标、字体），自定义构建只需替换这一个文件 |
| `tools/cdp.mjs` | Chrome DevTools 辅助工具：在真实的电视上调试界面并热重载 |

## 从源码构建

不需要 Gradle：Makefile 直接调用 Android SDK 工具，构建只需几秒钟。

环境要求：**Android SDK**（build-tools 36.0.0，平台 `android-36`）、**JDK 17 或更高版本**、`make`、`adb`。

```bash
git clone https://github.com/megarohas/apple-music-android-tv.git
cd apple-music-android-tv
make                                   # → build/amtv.apk（使用你的 debug 密钥签名）
make install TV=192.168.1.50:5555      # 已通过 adb 连接的电视盒子；也可以把 `TV = …` 写进 local.mk
make start

make dev-install && make dev-start    # 在旁边另装一个独立的“AMTV Dev”应用（登录和数据各自独立），用于测试
```

路径可以覆盖：`make SDK=/path/to/sdk BT=$SDK/build-tools/36.0.0`。

无需重新安装，直接在真实的电视上开发：

```bash
make devtools                                  # 将 WebView 的 DevTools 转发到 localhost:9222
node tools/cdp.mjs run res/raw/tv_i18n.js res/raw/tv_core.js res/raw/tv_screens.js res/raw/tv_player.js
node tools/cdp.mjs eval '__tv.boot()'          # 热重载后的界面
node tools/cdp.mjs shot screen.png             # 或在 chrome://inspect 中调试
```

自定义品牌（你自己的图标和字体）放在 `res/raw/brand.js` 和 `assets/fonts/` 中，详见该文件中的注释。

### 添加语言

1. `res/raw/tv_i18n.js`：复制英文表，翻译其中的值，并将该语言加入 `LANGS`（填入语言代码和该语言自己的名称）。
2. `res/values-<code>/strings.xml`：启动画面的七行文字。
3. `res/raw/signin.js`：Apple 登录页面上那一行遥控器操作提示。
4. 可选：`README.<code>.md`，并在每个 README 顶部的语言行中添加链接。

译文长度尽量与英文相当：顶部栏和播放器的空间都很有限。然后运行 `make`，在电视上逐一查看每个标签页。

## 致谢

- [**JObersi10/apple-music-tv**](https://github.com/JObersi10/apple-music-tv)：一个原生的 Android TV 版 Apple Music 客户端，它对 Apple 网页 API 的研究（主页、新发现、广播、歌词、个人收藏的端点）以及电视交互设计思路帮了大忙。本项目没有复制它的任何代码。该项目自行解密音频流；AMTV 刻意不这样做，而是让 Apple 的播放器负责播放。
- [**Material Icons**](https://github.com/google/material-design-icons)（Apache License 2.0）：AMTV 图标集的基础。详见 [NOTICE](NOTICE)。
- **翻译**：法语由 [NeoNathoon](https://github.com/NeoNathoon) 翻译。其他语言尚未经过母语者审校，欢迎通过 pull request 提交修正。
- **Apple MusicKit on the Web**：AMTV 所对接的 Apple 播放器和 API。

## 法律声明

AMTV 是一个独立的开源项目，**与 Apple Inc. 没有关联，也未经 Apple Inc. 授权或认可。** Apple、Apple Music 和 Apple ID 是 Apple Inc. 的商标，此处仅用于说明本应用的适用对象。AMTV 不包含 Apple 的字体、图标或标志，不修改也不规避 DRM，并且需要有效的 Apple Music 订阅。截图中的专辑封面归其所有者所有，仅用于示意。

## 许可证

[MIT](LICENSE) © 2026 megarohas
