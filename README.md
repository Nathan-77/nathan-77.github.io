# 个人主页使用说明

这是一个纯静态网站，没有任何构建工具，也没有依赖。改内容就是用编辑器打开 `.html` 文件改文字、保存，再传到 GitHub。

**网站地址：** <https://zhiyuanqi.org>　**GitHub 仓库：** <https://github.com/Nathan-77/nathan-77.github.io>（`CNAME` 文件是域名设置，别删）

---

## 一、文件都是干什么的

```
index.html       首页：大图 + 三样东西（在哪里、研究方向、联系方式）
research.html    Publications / Working papers / Works in progress / Workshops / Research experience
teaching.html    教学
cv.html          网页版 CV + PDF 下载按钮
personal.html    Personal：一段介绍 + 一张 "My Works" 入口卡片
works.html       My Works：按地点分的相册（点进某个地点才看到照片，画放在最后）

assets/css/style.css    全站唯一的样式表（改配色、字号都在这里）
assets/js/gallery.js    相册页的小脚本（生成封面目录、点开放大），平时不用动
assets/img/hero.jpg     所有页面顶部的大图（photo/background 里那张）
assets/img/portrait.jpg 头像
assets/photos/          相册照片，每个地点一个子文件夹
assets/fonts/           网页字体（开源字体，随站一起上传，别删）
files/                  CV 的 PDF、论文 PDF、slides 都放这里
.nojekyll               告诉 GitHub 不要用 Jekyll 处理，别删
```

**CV 的 PDF：** 放在 `files/Zhiyuan_Qi_CV.pdf`（你 10 月 4 日发的最新版，页脚写 October 3, 2026）。以后更新 CV，用新文件覆盖它就行，文件名保持 `Zhiyuan_Qi_CV.pdf` 不变，网页上的下载按钮不用改。

---

## 二、自己改内容

### 准备（只做一次）

1. 装 **VS Code**（免费）：<https://code.visualstudio.com>
2. 打开 VS Code → File → Open Folder → 选这个文件夹
3. 左边文件列表里点开要改的页面

不想装也可以：Mac 用「文本编辑」、Windows 用「记事本」直接打开 `.html` 文件改。

### 改的时候

- **只改 `>` 和 `<` 中间的文字**，尖括号和里面的英文标签别动
- 需要你填的地方大多用 `▼ … ▲` 中文注释框起来了。按 `Cmd/Ctrl + F` 搜 `▼` 就能一处处跳过去
- 改完 `Cmd/Ctrl + S` 保存

### 看效果

在文件夹里**双击 `index.html`**，浏览器会直接打开网站。改完一处，回浏览器按 `Cmd/Ctrl + R` 刷新就能看到。

### 举个例子：下学期加一门课

在 `teaching.html` 里，把下面这一段粘在最上面那门课的前面，再改成你的课程和学期：

```html
<div class="entry">
  <p class="when">Spring 2027</p>
  <div class="what">
    <h3>课程名称</h3>
    <p class="sub">Teaching Assistant</p>
  </div>
</div>
```

注意开头的 `<div class="entry">` 和结尾的 `</div>` 要成对，少一个 `</div>` 下面的排版就会乱（这次 Environmental and Resource Economics 那条就少了一个，已经补上）。

会议、研究经历、荣誉也都是这种格式：复制一段 `<div class="entry">…</div>`，改里面的文字。`&middot;` 显示出来是一个居中的小圆点 ·，`&amp;` 是 &，`&rsquo;` 是 ’

### 常见修改去哪改

| 想改什么 | 去哪改 |
|---|---|
| 首页的介绍、研究方向、联系方式 | `index.html`，搜 `▼`；研究方向一行 `<li>` 就是一个标签 |
| 加一篇论文 | `research.html`，复制一整段 `<div class="paper">…</div>` |
| 论文加链接 | `research.html` 里每篇论文下面的 `<p class="paper-links">`，照着 MIT CEEPR / SSRN 那两行复制一行 `<a href="…">…</a>` |
| 会议和 workshop | `research.html`，搜 `WORKSHOPS`，复制一段 `<div class="entry">`，新的放最上面 |
| Works in Progress | `research.html`，搜 `WORKS IN PROGRESS`，复制一段 `<div class="paper">` |
| 研究经历 | `research.html`，搜 `RESEARCH EXPERIENCE`，复制一整段 `<div class="entry">…</div>` |
| 教学 | `teaching.html`，复制一段 `<div class="entry">`，新的放最上面 |
| 教育、奖项 | `cv.html`，同样是复制 `<div class="entry">` |
| Personal 页的介绍文字 | `personal.html`，搜 `▼` |
| 相册（加照片、加地点、换顺序、换封面） | `works.html`，见下面第三部分 |
| 配色 | `assets/css/style.css` 最上面 `--accent:` 那一行，改一个色号全站跟着变 |

**加或改导航栏目：** 六个 HTML 文件顶部的 `<ul class="nav">` 都要同样改一遍（每页各有一份导航）。

---

## 三、换照片

上传前先把照片压小：相机直出的照片一张 10–20 MB，网页会很慢。长边压到 1920 像素、每张几百 KB 就够了。推荐 <https://squoosh.app>（压完会顺便去掉照片里的拍摄信息）。

**注意定位信息：** 手机和相机的照片里常带 GPS 坐标。这次放进网站的照片都已经压小、去掉了拍摄信息和定位。以后自己加照片，用 squoosh 压一遍，或者在 Mac「照片」App 导出时勾选「移除位置信息」。

### 顶部大图（hero）

所有页面顶部都是 `assets/img/hero.jpg`（现在是 `photo/background` 里那张加州海边）。换的话用新照片覆盖它，文件名不变，HTML 不用改。

- 用**横构图**，宽 2000 像素左右
- 照片上压了一层渐变，名字一定看得清；但**主体别放在照片正下方**，那里最暗
- 取景偏上还是偏下：`assets/css/style.css` 最上面的 `--hero-y`（首页）和 `--hero-slim-y`（其他页面的窄条），0% 显示照片最上面，100% 显示最下面
- 首页右下角那行小字是拍摄地点，在 `index.html` 里搜 `hero-credit` 改

### 头像

覆盖 `assets/img/portrait.jpg`，**正方形**最好（600×600 以上）。

### My Works 相册（works.html）

Personal 页上只有一张 "My Works" 卡片（4 张小图 + 标题），点进去才是相册：先看到每个地点一张封面，点某个地点才显示那里的照片，点照片可以放大、左右切换。

照片放在 `assets/photos/` 的子文件夹里，一个地点一个文件夹：

```
research-triangle  wilmington  outer-banks  washington-dc  shenandoah
atlanta  orlando  boston  chicago  california  death-valley
my-cat  paintings
```

`works.html` 里每个地点是一段 `<section class="album">…</section>`，**页面上的顺序就是这些段落的先后顺序**，想调换就把整段剪切粘贴过去（现在画放在最后）。

**加照片：** 压小的照片放进对应文件夹，然后在那个地点的 `<div class="gallery">` 里复制一行，把文件名改成你的：

```html
<figure><img src="assets/photos/chicago/12.jpg" alt="" loading="lazy"></figure>
```

（其他行里的 `width="…" height="…"` 是照片尺寸，能让页面加载时不跳动，新加的行不写也没关系。）

想给某张照片加一句说明：

```html
<figure>
  <img src="assets/photos/chicago/12.jpg" alt="" loading="lazy">
  <figcaption>说明文字</figcaption>
</figure>
```

**加一个新地点：** 在 `assets/photos/` 里新建一个文件夹（比如 `kyoto`，只用英文小写字母、数字和连字符），再在 `works.html` 里复制一整段 `<section class="album" …>…</section>`，把 `id="…"`、标题、每个 `src` 里的文件夹名都改成新的。封面目录会自动多出一张卡片。

**改地点名：** 改 `<h2 class="album-title">` 里的文字。

**换封面：** 默认用这个地点的第一张照片。想用别的，就在 `<section>` 里加或改 `data-cover="assets/photos/…/03.jpg"`。

**删照片：** 删掉 `works.html` 里那一行 `<figure>`，文件夹里的照片也可以一起删。

**Personal 页卡片上的 4 张小图**只是预览，在 `personal.html` 里改那 4 个 `src`。

---

## 四、部署到 GitHub Pages

1. 登录 GitHub → 右上角 **+** → **New repository**
2. 仓库名填 **`你的用户名.github.io`**，全部小写
3. 选 **Public** → **Create repository**
4. 点 **uploading an existing file**，把这个文件夹**里面的所有东西**拖进去（是文件夹里的内容，不是文件夹本身；`.nojekyll` 默认可能被隐藏，别漏了）
5. 点 **Commit changes**
6. **Settings** → **Pages** → Source 选 **Deploy from a branch** → 分支 **main**、文件夹 **/ (root)** → **Save**
7. 等 1–2 分钟，网址会出现在 Settings → Pages 页面上

以后改了文件：仓库页面 → **Add file → Upload files** → 拖进改过的文件 → Commit。同名文件会被覆盖。新加的照片文件夹也可以整个拖进去。

小改动也可以直接在 GitHub 网页上改：点开文件 → 右上角铅笔图标 → 改完 Commit。在仓库页面按 `.` 键还能打开网页版 VS Code。

刷新看不到变化时，强制刷新：Mac `Cmd + Shift + R`，Windows `Ctrl + F5`。

**注意：** 如果在 GitHub 网页上改过，电脑上这份就旧了。之后要在电脑上改，先在仓库页面点绿色 **Code → Download ZIP** 下载最新版。

---

## 五、绑定自己的域名

域名买好、上面的部署也完成以后：

1. 在域名商的 DNS 设置里，先删掉默认的停放（parking）记录，再加这几条：

```
类型    主机名   值
A       @        185.199.108.153
A       @        185.199.109.153
A       @        185.199.110.153
A       @        185.199.111.153
CNAME   www      你的用户名.github.io
```

2. GitHub 仓库 → **Settings** → **Pages** → **Custom domain** 填你的域名 → **Save**
3. 等 DNS 检查通过后，勾选 **Enforce HTTPS**（证书可能要等一阵）

GitHub 会在仓库里自动生成一个叫 `CNAME` 的文件，**不要删它**。DNS 生效通常要几分钟到几小时。
