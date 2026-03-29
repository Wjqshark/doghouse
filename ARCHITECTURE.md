# 🏗️ 小红狗的家 —— 架构指南

> 本文件是项目的维护者手册，说明文件布局、开发约定和常见操作步骤。  
> 维护者：**OpenClaw** | 最后更新：2026-03-29

---

## 📁 文件布局

```
doghouse/
├── index.html              # 首页 —— 犬舍外观场景
├── script.js               # 首页交互逻辑（动画、弹窗、状态更新）
├── style.css               # 全局样式（首页动画 + 公共组件 + 弹窗）
├── comic.html              # 四格漫画独立展示页
│
├── assets/
│   └── css/
│       └── room-base.css   # ★ 房间公共样式（CSS 变量 + 共享组件）
│
├── rooms/
│   ├── study.html          # 📚 书房
│   ├── creation.html       # 🎨 创作室
│   ├── living.html         # 🦞 会客厅
│   ├── workshop.html       # ⚙️ 工作室
│   ├── shangshi-notes.html # 笔记详情：《伤逝》
│   └── gaolaofuzi-notes.html # 笔记详情：《高老夫子》
│
├── README.md               # 项目简介 + 快速上手
├── ROADMAP.md              # 已知问题 + 版本路线图
└── ARCHITECTURE.md         # 本文件：架构指南
```

---

## 🎨 CSS 架构

### 三层样式结构

| 文件 | 作用 | 被谁引用 |
|------|------|----------|
| `style.css` | 首页专用样式 + 全局 reset + 弹窗样式 | `index.html`、所有 `rooms/*.html` |
| `assets/css/room-base.css` | 房间公共组件（卡片、按钮、标题等） | 所有 `rooms/*.html` |
| 各房间 `<style>` 块 | 仅含 CSS 变量声明 + 该房间独有样式 | 本房间 |

### CSS 变量

`room-base.css` 定义以下变量，每个房间通过覆盖 `:root` 来设置自己的主题色：

| 变量 | 含义 | 示例值（书房） |
|------|------|--------------|
| `--theme-color` | 主色（标题、边框、按钮背景） | `#8B4513` 棕色 |
| `--theme-light` | 浅色（标签背景） | `#f0e6dd` 米色 |
| `--theme-dark` | 深色（按钮 hover 背景） | `#654321` 深棕 |

**四个房间的主题色配置：**

| 房间 | `--theme-color` | `--theme-light` | `--theme-dark` |
|------|----------------|----------------|---------------|
| 📚 书房 | `#8B4513` | `#f0e6dd` | `#654321` |
| 🎨 创作室 | `#9B59B6` | `#f5eef8` | `#8E44AD` |
| 🦞 会客厅 | `#E74C3C` | `#fdedec` | `#C0392B` |
| ⚙️ 工作室 | `#3498DB` | `#ebf5fb` | `#2980B9` |

---

## 🚪 如何新增一个房间

1. **复制任意已有房间**作为模板（推荐 `rooms/study.html`）

2. **修改 `<head>` 中的主题色变量**，只需改三个值：
   ```html
   <style>
       :root { --theme-color: #你的颜色; --theme-light: #浅色; --theme-dark: #深色; }
       /* 该房间独有的样式写在这里 */
   </style>
   ```

3. **修改正文内容**（标题、卡片内容等）

4. **在 `script.js` 的 `roomMap` 和 `roomNames` 对象里注册新房间**：
   ```js
   const roomMap   = { ..., 'newroom': 'rooms/newroom.html' };
   const roomNames = { ..., 'newroom': '🏠 新房间' };
   ```

5. **在 `index.html` 的欢迎弹窗 `room-buttons` 区块里添加入口按钮**：
   ```html
   <a href="rooms/newroom.html" class="room-btn newroom-btn">
       <span class="room-btn-icon">🏠</span>
       <span class="room-btn-title">新房间</span>
       <span class="room-btn-desc">房间描述</span>
   </a>
   ```

6. **在 `style.css` 底部补充按钮主题色**：
   ```css
   .newroom-btn { background: linear-gradient(135deg, #你的颜色, #深色); }
   ```

---

## 📝 如何向书房添加一篇笔记

1. 在 `rooms/` 目录新建笔记文件，例如 `rooms/mynote-notes.html`
   - 复制 `rooms/shangshi-notes.html` 作为模板

2. 在 `rooms/study.html` 的 `.bookshelf` 区块里添加一张新卡片：
   ```html
   <div class="book">
       <h3>《书名》深度阅读</h3>
       <p>一句话简介。</p>
       <div class="meta">
           <span class="tag">作者</span>
           <span class="tag">标签</span>
           <span style="margin-left: 10px;">📅 YYYY-MM-DD</span>
       </div>
       <a href="mynote-notes.html" style="display:block;margin-top:15px;color:var(--theme-color);text-decoration:none;">阅读全文 →</a>
   </div>
   ```

---

## 🎬 如何向创作室添加一件作品

在 `rooms/creation.html` 的 `.gallery` 区块里添加一张 `.artwork` 卡片，格式同上（参考现有卡片）。

---

## 🏠 欢迎弹窗工作原理

弹窗由 `script.js` 中的 `showWelcomeMessage()` 动态生成，**样式统一在 `style.css` 的「欢迎弹窗」区块**。

关闭弹窗支持三种方式：
1. 点击「先看看外观」按钮（`.close-btn`）
2. 点击弹窗背景遮罩
3. 按 `Escape` 键

> ⚠️ 不要在 `innerHTML` 里用 `onclick="closeModal()"` —— 弹窗逻辑已全部封装在 `showWelcomeMessage()` 内部，避免全局作用域污染。

---

## 🔧 本地开发

```bash
# 进入项目目录
cd doghouse

# 用任意静态服务器启动（避免 file:// 跨域问题）
python3 -m http.server 8080
# 或
npx http-server -p 8080

# 访问 http://localhost:8080
```

---

## 📐 编码约定

| 约定 | 说明 |
|------|------|
| CSS 动画 | 用 `@keyframes`，不用 JS 操控样式帧 |
| 变量命名 | 避免与浏览器内置对象同名（`window`、`document`、`event`） |
| 颜色 | 房间主题色通过 CSS 变量集中管理，不散落在 HTML 行内样式 |
| 提交信息 | 使用前缀：`feat:` / `fix:` / `docs:` / `style:` / `refactor:` |
| 新文件 | 笔记类内容建单独 `*.html`，房间页面只放卡片摘要 + 链接 |

---

> 文档由 OpenClaw 维护。架构有重大变更时请同步更新本文件。
