---
layout: doc
title: 单个元素实现的 CSS3 Loading 效果
description: 单元素实现的 Loading 动画，适合练习伪元素与关键帧组合。
---

# 单个元素实现的 CSS3 Loading 效果

<DemoPreview
  demoUrl="/hover-transition/自制loading/index.html"
  title="单个元素实现的 CSS3 Loading 效果"
  description="单元素实现的 Loading 动画，适合练习伪元素与关键帧组合。"
/>

## 效果说明

单元素实现的 Loading 动画，适合练习伪元素与关键帧组合。

## 为什么值得看

- 它用极少的 DOM 把等待态做出来，非常适合拿来练习“轻量反馈是不是足够”的判断。
- 如果你正在做文档站、内容页或小型组件库，这种单元素写法往往比复杂插画 loading 更容易落地。

## 技术要点

- 分类：CSS 过渡效果
- 标签：Loading / CSS3 / Pseudo Elements
- 场景：加载进度反馈
- 难度：中级
- 原始入口：
  - `/hover-transition/自制loading/index.html`
  - `hover-transition/自制loading`

## 在线体验

- [打开原始 Demo 页面](/hover-transition/自制loading/index.html)
- [查看 GitHub 源码目录](https://github.com/Fridolph/my-program/tree/master/public/hover-transition/自制loading)
- [返回 CSS 过渡效果 分类](../)

## 目录结构

```bash
├── css
└── index.html
```

## 适用场景

- 适合局部异步加载、轻量数据刷新、按钮提交等待态和内容块占位反馈。
- 当页面只需要告诉用户“还在处理中”，但不希望加载态抢走太多注意力时尤其合适。

## 实现拆解

- 先看主体元素与伪元素各自负责哪一层动画，再判断哪些关键帧可以直接抽到业务组件里。
- 如果只需要节奏反馈，可以先保留缩放、透明度或位移中的一类，不必完整照搬。

## 改造提醒

- 先测试在深浅两种背景下的可见度，避免单元素 loading 一换主题就丢失识别度。
- 如果和真实骨架屏同时存在，尽量二选一，避免页面里出现两个不同层级的等待信号。

## 多维入口

### 按标签继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/tags/loading">Loading</a><a class="browse-chip" href="/explore/tags/css3">CSS3</a><a class="browse-chip" href="/explore/tags/pseudo-elements">Pseudo Elements</a></div>

### 按场景继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/scenes/u52a0-u8f7d-u8fdb-u5ea6-u53cd-u9988">加载进度反馈</a></div>

### 按难度继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/difficulty/intermediate">中级</a></div>

## 相关专题路线

如果你不是只想看单个案例，而是想继续判断“这一类页面问题还能往哪里看”，可以从这里回到专题路线。

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/spotlights/gallery-loading-flow">
      <strong>图片浏览与资源进入节奏</strong>
      <span>5 个场景 · 6 个 demo · 命中 1 个当前场景</span>
      <small>当前案例已被这条路线直接点名，适合回到路线页继续看整体组织方式。</small>
    </a>
    <a class="topic-card" href="/discover/spotlights/reading-progress-feedback">
      <strong>阅读与进度反馈路线</strong>
      <span>7 个场景 · 7 个 demo · 命中 1 个当前场景</span>
      <small>当前案例已被这条路线直接点名，适合回到路线页继续看整体组织方式。</small>
    </a>
  </div>

## 继续浏览

### 邻接导航

<div class="browse-nav-grid">
    <a class="browse-nav-card" href="/demos/hover-transition/emoji-face">
      <span>上一条</span>
      <strong>纯CSS表情符号</strong>
      <small>纯 CSS 绘制的表情符号效果，适合学习简单图形拼装与 hover 反馈。</small>
    </a>
    <a class="browse-nav-card" href="/demos/hover-transition/split-panel-gallery">
      <span>下一条</span>
      <strong>分栏式人物画廊</strong>
      <small>分栏式人物画廊效果，适合参考并列菜单与大图预览的组合布局。</small>
    </a></div>

### 相关推荐

<div class="mini-card-grid">
    <a class="mini-card" href="/demos/hover-transition/emoji-face">
      <strong>纯CSS表情符号</strong>
      <span>纯 CSS 绘制的表情符号效果，适合学习简单图形拼装与 hover 反馈。</span>
    </a>
    <a class="mini-card" href="/demos/hover-transition/gradient-background-gallery">
      <strong>渐变背景样式集</strong>
      <span>多组 CSS3 渐变背景示例，适合参考卡片、区块和按钮的配色过渡。</span>
    </a>
    <a class="mini-card" href="/demos/hover-transition/hover-transition-css3-count-showtime">
      <strong>数字翻转计数展示</strong>
      <span>CSS3 计数展示效果，适合作为数据面板或统计卡片的视觉参考。</span>
    </a>
  </div>

### 相关阅读

<div class="journal-card-grid">
    <a class="journal-card" href="/journal/dao-m14-spotlight-feedback">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M14 开发笔记：让专题路线真正回流到 demo 详情页</strong>
      <p>把专题路线从上层入口继续接回 demo 详情页，并补齐 spotlight 长尾 demo 的结构化深描内容。</p>
    </a>
  </div>

---

<nav class="demo-nav">
  <a href="../">← 返回分类</a>
  <a href="/">返回首页</a>
</nav>
