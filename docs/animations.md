# 动画

| | 列表点进文章 | 浅色 / 深色 | 正文渐入 |
| --- | --- | --- | --- |
| 看起来 | 标题和日期从那一行移到文章页，其余内容淡出 | 新主题像帘子一样揭开。去深色从上往下，去浅色从下往上 | 正文和目录自下而上出现 |
| 技术 | View Transitions API，由 `ClientRouter` 触发 | 同一种 API，由主题按钮自己调用 | 普通 CSS `@keyframes` |
| 样式 | Astro 的 `astroFadeIn` / `astroFadeOut`，加上浏览器对分组的位移 | `theme-reveal`，只匹配 `theme-toggle-transition` | `content-rise` |
| 何时 | 站内点击链接 | 点击 `#theme-toggle` | 文章页一渲染就播放 |

列表飞行和主题帘子都是视图过渡，但是两次不同的过渡。不要把页面淡出写到 `::view-transition-old(*)` 上，那会把文章飞行换掉。标题或日期如果在抓快照时是透明的，飞行也看不见。

## 文件

| 文件 | 职责 |
| --- | --- |
| `src/layouts/Layout.astro` | `<ClientRouter fallback="none" />`。没有视图过渡时不做替代动画 |
| `src/styles/global.css` | 设计令牌，并引入各样式文件 |
| `src/styles/theme.css` | 浅色 / 深色帘子：`theme-reveal`、`--theme-from` |
| `src/styles/transition.css` | 正文渐入。不写页面淡出，也不写主题帘子 |
| `src/components/blog/PostRow.astro` | 列表上的标题、日期过渡名 |
| `src/layouts/BlogPost.astro` | 文章页上的同一对过渡名 |
| `src/pages/[lang]/blog/[...slug].astro` | 把 slug 传给 `BlogPost` |
| `src/components/site/SiteHeader.astro` | 站点标题 `site-title` |
| `src/components/site/ThemeToggle.astro` | 主题帘子的脚本 |
| `src/components/site/LanguageNav.astro` | `data-astro-reload`，换语言整页打开，不走视图过渡 |

## 视图过渡

### 列表点进文章

`ClientRouter` 拦截站内链接，在同一次文档里换页，并调用 `document.startViewTransition()`。浏览器先给旧页面拍照，再拍新页面。两边 `view-transition-name` 相同的元素合成一组：分组负责从旧位置移到新位置，旧快照淡出，新快照淡入。

名字必须成对，而且同一时刻全页唯一：

| 元素 | 列表 | 文章页 | 名字 |
| --- | --- | --- | --- |
| 标题 | `PostRow.astro` 里标题 `<span>` | `BlogPost.astro` 里 `<h2>` 内的 `<span>` | `post-${lang}-${slug}` |
| 日期 | `PostRow.astro` 里的 `<time>` | `BlogPost.astro` 里日期外的 `<span>` | `time-${lang}-${slug}` |
| 站点标题 | `SiteHeader.astro` | 同一组件，每页都在 | `site-title` |

`lang` 是当前语言，例如 `zh`。`slug` 来自 `entrySlug(post.id)`，再把 `/` 换成 `-`。文章页在 `[...slug].astro` 里用同一条规则传给 `BlogPost`。两边不一致时，标题不会飞，只会整页淡出。

名字打在标题和日期自己身上，不打在包住整行的 `<a>` 上。打在链接上会把日期和标题当成一块一起移动。

页头、导航、页脚不要设 `view-transition-name`。它们留在根快照里，跟简介、列表其余部分一起淡出。再命名就会从整页里抠出去，页面淡出只剩空白。

### Astro 实际加上的动画

Astro 为每个 `transition:name` 生成分层样式，例如：

```css
::view-transition-old(post-zh-lijian) {
  animation-name: astroFadeOut;
  animation-duration: 180ms;
}
::view-transition-new(post-zh-lijian) {
  animation-name: astroFadeIn;
  animation-duration: 180ms;
}
```

分组上的位移是浏览器自带的 `-ua-view-transition-group-anim-*`，不是我们写的关键帧。根快照用浏览器默认的淡出淡入。

因此 `transition.css` 里不要出现：

```css
::view-transition-old(*),
::view-transition-new(*) {
  animation: …;
}
```

未分层的 `animation` 简写会盖掉 `@layer` 里的 `astroFadeIn` / `astroFadeOut`。标题不再从列表飞到文章页，所有快照都变成同一种淡出。`mix-blend-mode` 和 `animation-duration` 写在 `*` 上也会改掉这组默认过渡，不要加。

共享元素用 `inline-block`，并且不能套在 `overflow: hidden` 里。`line-clamp` 和文章容器上的 `overflow-hidden` 都会把元素排除出快照，或把快照裁没。标题、日期也不要参与 `content-rise`。

## 浅色与深色

点页头的太阳或月亮，整页换成另一种配色。旧画面留在下面，新画面从一条边展开盖住它。文字、导航和标题不单独移动，也不做颜色过渡。颜色只来自 `.dark` 上的 Tailwind 类，例如 `bg-page` / `dark:bg-page-dark`。

方向跟**新**主题走：

| 切到 | `--theme-from` | `clip-path` 的含义 | 看到的 |
| --- | --- | --- | --- |
| 深色（`<html>` 有 `.dark`） | `0 0 100% 0` | 上 0、右 0、下 100%、左 0，先只露出顶上一条 | 深色从上往下揭开 |
| 浅色（没有 `.dark`） | `100% 0 0 0` | 上 100%、右 0、下 0、左 0，先只露出底下一条 | 浅色从下往上揭开 |

`clip-path: inset()` 的四个值是上、右、下、左。`theme-reveal` 从 `--theme-from` 变到 `inset(0)`，0.7 秒，`cubic-bezier(0.4, 0, 0.2, 1)`。新快照 `z-index: 1`，旧快照 `z-index: -1` 且 `animation: none`，所以旧主题不淡出，只被新主题盖住。

### 脚本

`ThemeToggle.astro` 的按钮是 `#theme-toggle`。浅色显示太阳，深色显示月亮。`applyTheme()` 用 `.dark` 表示深色，并把 `light` 或 `dark` 写入 `localStorage` 的 `theme`。

支持 `document.startViewTransition`、且没有 `prefers-reduced-motion: reduce` 时：

1. 给 `<html>` 加上 `data-theme-changing`。
2. 把 `<html>` 的内联 `view-transition-name` 设为 `theme-toggle-transition`。整页因此收成这一组，不再使用根过渡的名字 `root`。
3. 在 `startViewTransition()` 的回调里调用 `applyTheme()`。回调结束时类名已经是新主题，随后才拍新快照，所以帘子方向读到的是新主题的 `--theme-from`。
4. `finished` 之后去掉 `data-theme-changing` 和内联的 `view-transition-name`。

连续点击时 `themeTransition` 递增。只有和当前次数相同的那次 `finished` 才清理，避免前一次的结束把后一次的帘子拆掉。另一标签页通过 `storage` 改 `theme` 时只改类名，不播帘子。

不支持这套 API，或用户要求减少动态效果时，直接 `applyTheme()`，页面立刻换色。

### 标题不要跟着飞

换色时如果标题、日期、站点标题还带着 `post-*`、`time-*`、`site-title`，它们会各自做一组过渡，字会离开原位。`data-theme-changing` 存在期间，这条规则生效：

```css
html[data-theme-changing] [data-disable-theme-toggle-transition] {
  view-transition-name: none;
}
```

`data-disable-theme-toggle-transition` 加在列表和文章页的标题、日期，以及站点标题上。打开文章时这个属性还在，但没有 `data-theme-changing`，飞行不受影响。

帘子的选择器写的是 `theme-toggle-transition`，不是 `*`。打开文章时根元素没有这个名字，所以不会揭帘子。

不要用带 `%23` 的 SVG data URI 做圆形遮罩。Vite 会把它当成地址，LightningCSS 压缩时会失败。换方向只改 `--theme-from` 的四个 inset 值。

## 正文渐入

`#post-content > *` 和 `#toc .toc-item` 使用 `content-rise`：

- 0.5 秒，`cubic-bezier(0.165, 0.84, 0.44, 1)`，`animation-fill-mode: both`
- 从 `opacity: 0`、`translate: 0 3rem` 到元素本身的样式
- 正文前 15 块的延迟从 0.15 秒加到 0.85 秒，之后都是 0.9 秒
- 目录前三项分别是 0.175 秒、0.2 秒、0.225 秒，其后 0.25 秒
- 宽度小于 768px 时，第 8 块及以后不再排队，直接显示

目录容器自己用 `translateY(-50%)` 做垂直居中，渐入只加在 `.toc-item` 上，避免把居中冲掉。

`prefers-reduced-motion: reduce` 时，这些元素 `animation: none`，透明度为 1。

这段动画在文章页渲染时就播放，从列表点进来也会播。它和标题飞行同时发生：标题在过渡层里移动，正文在页面里渐入。

## 以后改动时

加一个新的共享元素：

1. 两边使用同一个 `transition:name`。全页只能有一个元素使用这个名字。
2. 元素用 `inline-block`，不要放进 `overflow: hidden` 或 `line-clamp`。
3. 不要让它在快照时透明，所以不要套 `content-rise`。
4. 加上 `data-disable-theme-toggle-transition`，换主题时才不会飞。
5. slug 继续用 `entrySlug()`，并把 `/` 换成 `-`。

改飞行手感时，改 Astro 生成的那一组，或者只给具体名字写样式，例如 `::view-transition-group(post-zh-lijian)`。不要用 `*`。

改正文节奏时，只改 `content-rise` 和对应的 `animation-delay`。

改浅色、深色帘子的方向或时长时，只改 `theme.css` 里的 `--theme-from`、`theme-reveal` 和 0.7 秒。不要给 `::view-transition-old(*)` 加动画。结束后必须去掉 `<html>` 上的 `view-transition-name`，否则下一次打开文章仍会走帘子。

链接不要加 `data-umami-event`。Umami 会 `preventDefault()` 再设置 `location.href`，视图过渡不会发生。自定义事件只放在 `<button>` 上，目前是主题切换。语言切换保持 `data-astro-reload`。

## 验收

刷新后从首页点一篇不是第一行的文章：

- 那一行的标题移到文章标题，日期移到文首日期。
- 开发者工具里，这一对的动画名是 `astroFadeIn` 和 `astroFadeOut`，分组名以 `-ua-view-transition-group-anim-` 开头。
- 正文第一块的 `animation-name` 是 `content-rise`，开始时透明度接近 0。
- 浅色下点主题按钮，深色从页面顶部展开盖住浅色。再点一次，浅色从页面底部展开盖住深色。标题、导航不单独移动。
- 帘子播放时，`<html>` 的 `view-transition-name` 是 `theme-toggle-transition`，新快照的动画名是 `theme-reveal`。
- 帘子结束后，`<html>` 上没有 `data-theme-changing`，也没有内联的 `view-transition-name`。
