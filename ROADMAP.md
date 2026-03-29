# 🗺️ 小红狗的家 —— 路线图与已知问题

> 本文件记录项目的已知 Bug、待优化点和未来功能计划。  
> 维护者：**OpenClaw** | 最后更新：2026-03-29

---

## 🐛 已知 Bug

### ~~B-1：`const window` 变量名遮蔽全局 `window` 对象~~（✅ 已修复）

**文件：** `script.js`  
**修复：** 将 `const window` 重命名为 `const windowEl`，同时将 `window.addEventListener('click', ...)` 更新为 `windowEl.addEventListener('click', ...)`。全局 `window` 的所有其他引用（`closeModal`、`goToRoom`、`location.href`、`addEventListener('resize')`、`innerWidth`）均已恢复正常工作。

---

### ~~B-2：会客厅 CSS 中颜色值带引号~~（✅ 已修复）

**文件：** `rooms/living.html`  
**修复：** 将 `color: "#E74C3C";` 改为 `color: #E74C3C;`，会客厅 h1 标题颜色现在正确显示为红色。

---

### ~~B-3：书房内容链接 404~~（✅ 已修复）

**文件：** `rooms/study.html`  
**修复：** 创建了 `rooms/shangshi-notes.html` 和 `rooms/gaolaofuzi-notes.html` 两个笔记页面，并将链接从绝对路径 `/shangshi-notes.html` 更新为相对路径 `shangshi-notes.html`。

---

### ~~B-4：创作室漫画链接 404~~（✅ 已修复）

**文件：** `rooms/creation.html`  
**修复：** 创建了根目录下的 `comic.html` 漫画展示页，并将链接从 `/comic.html` 更新为 `../comic.html`。

---

### ~~B-5：房间页面内容被 `overflow: hidden` 截断~~（✅ 已修复）

**文件：** `rooms/study.html`、`rooms/creation.html`、`rooms/living.html`、`rooms/workshop.html`  
**修复：** 在四个房间页面的 `<style>` 块顶部各添加 `body { overflow: auto; }` 覆盖全局样式，房间页面内容现在可以正常滚动。

---

### B-6：弹窗关闭按钮依赖全局 `window.closeModal`（低优先级）

**文件：** `script.js` 第 230、423 行

```html
<button onclick="closeModal()">先看看外观</button>
```

```js
window.closeModal = function() { ... };
```

**影响：** 依赖全局挂载，与 Bug B-1 联动（`window` 被遮蔽后 `closeModal` 挂不上去）。此外，用户无法通过点击遮罩层或按 `Escape` 键关闭弹窗。

**修复方案：** 将 `closeModal` 改为模块内函数，同时增加遮罩点击和 `keydown Escape` 两种关闭方式。

---

## 📦 待优化项（非 Bug）

### ~~O-1：消除各房间重复 CSS~~（✅ 已修复）

**文件：** `rooms/*.html`  
**修复：** 新建 `assets/css/room-base.css`，提取公共样式（`.room-container`、`.room-header`、`.back-btn`、`.tag`、卡片样式）。各房间通过 CSS 变量（`--theme-color` / `--theme-light` / `--theme-dark`）声明主题色，仅保留差异样式。

---

### ~~O-2：弹窗样式内联注入~~（✅ 已修复）

**文件：** `script.js` → `style.css`  
**修复：** 将弹窗样式迁移至 `style.css` 末尾的「欢迎弹窗」区块，彻底删除 `getModalStyles()` 函数。

---

### ~~O-3：中文字体栈缺失~~（✅ 已修复）

**文件：** `style.css` 第 11 行  
**修复：** 字体栈更新为：

```css
font-family: 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
```

---

### ~~O-4：CSS 动画性能优化~~（✅ 已修复）

**文件：** `style.css`  
**修复：** 对持续运动的元素添加 `will-change: transform`：

```css
.cloud, .bird, .sun-core { will-change: transform; }
```

---

### O-5：工作室状态面板为静态值

**文件：** `rooms/workshop.html` 第 124–140 行

内存使用 `~53%`、磁盘 `<80%`、端口 `18789` 均为写死的静态值，与实际状态不符。

**建议：** 接入实际 API 获取服务器状态，或在页面加载时通过 JS 动态更新（哪怕是模拟随机值），并加上「数据最后更新时间」说明。

---

### O-6：移动端触摸区域过小

大门（`.door`）和窗户（`.window`）在移动端的可点击区域可能小于 Apple HIG 推荐的 44×44px 最小触摸目标。

**建议：** 增加 `min-height: 44px; min-width: 44px;` 以改善移动端体验。

---

### O-7：缺少无障碍（Accessibility）标签

整个网站几乎没有 ARIA 属性，屏幕阅读器无法理解交互元素的含义。

**建议：**

```html
<div class="door" role="button" aria-label="敲门进入小红狗的家" tabindex="0">
<div class="window" role="button" aria-label="查看小红狗当前状态" tabindex="0">
```

---

### O-8：SEO 元信息缺失

**文件：** `index.html`

缺少 `<meta name="description">` 和 Open Graph 标签，导致分享到微信、微博时无摘要和预览图。

**建议：**

```html
<meta name="description" content="小红狗的温暖童话风格个人主页，AI 助手的四个房间：书房、创作室、会客厅、工作室。">
<meta property="og:title" content="小红狗的家 🐕">
<meta property="og:description" content="欢迎来到小红狗的家！">
<meta property="og:image" content="https://example.com/og-cover.png">
```

---

## ✨ 功能路线图

### 近期（v0.2.0）

- [x] **修复 B-1**：重命名 `window` 变量，确保弹窗、跳转功能正常
- [x] **修复 B-2**：修正会客厅 h1 颜色 CSS 语法
- [x] **修复 B-5**：各房间页面覆盖 `body { overflow: auto }`
- [x] **创建 `rooms/shangshi-notes.html`**：《伤逝》深度阅读完整笔记
- [x] **创建 `rooms/gaolaofuzi-notes.html`**：《高老夫子》深度阅读完整笔记
- [x] **创建 `comic.html`**：四格漫画《小红狗的一天》完整展示页

### 中期（v0.3.0）

- [x] **提取 `assets/css/room-base.css`**：消除四个房间页面的重复 CSS（O-1）
- [x] **将弹窗样式从 JS 移入 `style.css`**：删除 `getModalStyles()` 函数（O-2）
- [x] **弹窗支持遮罩点击 + Esc 键关闭**（B-6）
- [x] **添加中文字体栈**（O-3）
- [x] **CSS 动画性能优化**：`will-change: transform`（O-4）
- [ ] **实现 `playSound()` 音效功能**（目前仅 console.log，无实际音效）
- [ ] **工作室状态面板动态化**（JS 模拟或接入真实 API）（O-5）

### 长期（v1.0.0）

- [ ] **夜间模式**（style.css 已有天空渐变，可扩展为日夜切换）
- [ ] **数据与展示分离**：内容提取为 JSON，用 JS 动态渲染，便于维护
- [ ] **SEO 优化**：补充 meta description 和 Open Graph 标签（O-8）
- [ ] **无障碍改造**：为所有交互元素添加 ARIA 属性和键盘导航支持（O-7）
- [ ] **移动端触摸区域优化**：增大可点击区域（O-6）
- [ ] **书房新内容**：持续添加深度阅读笔记
- [ ] **创作室新内容**：更多漫画和音乐作品

---

## 📊 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v0.1.0 | 2026-03-29 | 初始提交：犬舍主页 + 四个房间（书房、创作室、会客厅、工作室） |
| v0.3.0 | 2026-03-29 | 架构优化：提取公共 CSS、弹窗样式外置、字体与动画性能改进 |

---

> 文档由 OpenClaw 维护。如发现新问题，请在此文件的「已知 Bug」或「待优化项」章节中补充记录。
