---
layout: doc
title: 层叠式人物画廊
description: 层叠展开的人物图像画廊，适合参考纵向列表 hover 展开与图文层次切换。
---

# 层叠式人物画廊

<DemoPreview
  demoUrl="/hover-transition/里程图片/index2.html"
  title="层叠式人物画廊"
  description="层叠展开的人物图像画廊，适合参考纵向列表 hover 展开与图文层次切换。"
/>

## 效果说明

层叠展开的人物图像画廊，适合参考纵向列表 hover 展开与图文层次切换。

## 为什么值得看

- 这个版本把人物入口做成层叠展开，非常适合观察“列表如何在有限空间里承接更多身份信息”。
- 如果你正在做团队成员、嘉宾介绍或人物卡片入口，它能帮助你比较层叠结构是否比普通卡片更有记忆点。

## 技术要点

- 分类：CSS 过渡效果
- 标签：Gallery / Profile / Hover
- 场景：成员展示 / 人物卡片入口
- 难度：中级
- 原始入口：
  - `/hover-transition/里程图片/index2.html`
  - `hover-transition/里程图片`

## 在线体验

- [打开原始 Demo 页面](/hover-transition/里程图片/index2.html)
- [查看 GitHub 源码目录](https://github.com/Fridolph/my-program/tree/main/public/hover-transition/里程图片)
- [返回 CSS 过渡效果 分类](../)

## 目录结构

```bash
├── css
├── images
├── index.html
├── index2.html
└── index3.html
```

## 适用场景

- 适合成员展示、人物介绍、讲者列表或需要在小空间内承载多张人物卡的页面。
- 当你希望入口既像列表，又带一点浏览式展开体验时，这类结构很有参考价值。

## 实现拆解

- 先看默认堆叠状态如何控制层级，再看 hover 后图片和文本是如何逐步展开的。
- 迁移时可以先保留纵向展开关系，等信息密度跑通后，再决定是否保留完整层叠视觉。

## 改造提醒

- 人物类入口很依赖图片裁切，先统一头像比例和焦点区域，再迁移动效。
- 如果卡片上要承载职位、标签等更多信息，记得先验证展开后的内容是否会互相遮挡。

## 多维入口

### 按标签继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/tags/gallery">Gallery</a><a class="browse-chip" href="/explore/tags/profile">Profile</a><a class="browse-chip" href="/explore/tags/hover">Hover</a></div>

### 按场景继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/scenes/u6210-u5458-u5c55-u793a">成员展示</a><a class="browse-chip" href="/explore/scenes/u4eba-u7269-u5361-u7247-u5165-u53e3">人物卡片入口</a></div>

### 按难度继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/difficulty/intermediate">中级</a></div>

## 相关专题路线

如果你不是只想看单个案例，而是想继续判断“这一类页面问题还能往哪里看”，可以从这里回到专题路线。

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/spotlights/portfolio-preview-entry">
      <strong>作品集与人物预览入口</strong>
      <span>7 个场景 · 5 个 demo · 命中 2 个当前场景</span>
      <small>当前案例已被这条路线直接点名，适合回到路线页继续看整体组织方式。</small>
    </a>
    <a class="topic-card" href="/discover/spotlights/card-content-showcase">
      <strong>卡片与内容展示入口</strong>
      <span>6 个场景 · 12 个 demo · 命中 1 个当前场景</span>
      <small>当前案例已经进入这条路线的优先推荐区，适合回看它前后串联的案例。</small>
    </a>
    <a class="topic-card" href="/discover/spotlights/lightweight-ui-practice">
      <strong>轻量交互与基础练习路线</strong>
      <span>7 个场景 · 7 个 demo · 命中 1 个当前场景</span>
      <small>当前案例已经进入这条路线的优先推荐区，适合回看它前后串联的案例。</small>
    </a>
  </div>

## 继续浏览

### 邻接导航

<div class="browse-nav-grid">
    <a class="browse-nav-card" href="/demos/hover-transition/hover-transition-buttons-box-shadow">
      <span>上一条</span>
      <strong>按钮阴影交互动效</strong>
      <small>通过 box-shadow 变化强化按钮 hover 态，适合做操作反馈参考。</small>
    </a>
    <a class="browse-nav-card" href="/demos/hover-transition/emoji-face">
      <span>下一条</span>
      <strong>纯CSS表情符号</strong>
      <small>纯 CSS 绘制的表情符号效果，适合学习简单图形拼装与 hover 反馈。</small>
    </a></div>

### 相关推荐

<div class="mini-card-grid">
    <a class="mini-card" href="/demos/hover-transition/split-panel-gallery">
      <strong>分栏式人物画廊</strong>
      <span>分栏式人物画廊效果，适合参考并列菜单与大图预览的组合布局。</span>
    </a>
    <a class="mini-card" href="/demos/hover-transition/milestone-gallery-1">
      <strong>里程图片展示 · 1</strong>
      <span>里程图片系列的第一种展示方式，适合参考图文列表动效。</span>
    </a>
    <a class="mini-card" href="/demos/hover-transition/emoji-face">
      <strong>纯CSS表情符号</strong>
      <span>纯 CSS 绘制的表情符号效果，适合学习简单图形拼装与 hover 反馈。</span>
    </a>
  </div>

### 相关阅读

<div class="journal-card-grid">
    <a class="journal-card" href="/journal/dao-m15-route-expansion">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M15 开发笔记：继续扩路线密度，也把长尾场景讲清楚</strong>
      <p>扩充专题路线，并为一批长尾 scene 补 narrative，让 scene 页和首页入口都更像真正的内容入口。</p>
    </a>
  </div>

---

<nav class="demo-nav">
  <a href="../">← 返回分类</a>
  <a href="/">返回首页</a>
</nav>
