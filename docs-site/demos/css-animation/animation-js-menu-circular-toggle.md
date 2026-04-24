---
layout: doc
title: 圆形展开菜单
description: 使用纯 CSS3 实现的圆形菜单展开效果，适合学习 transform 与过渡组合。
---

# 圆形展开菜单

<DemoPreview
  demoUrl="/animation-js/menu-circular-toggle/index.html"
  title="圆形展开菜单"
  description="使用纯 CSS3 实现的圆形菜单展开效果，适合学习 transform 与过渡组合。"
/>

## 效果说明

使用纯 CSS3 实现的圆形菜单展开效果，适合学习 transform 与过渡组合。

## 为什么值得看

- 它把“菜单如何展开”这件事做成了非常直观的空间运动，适合作为导航动效入门案例。
- 圆形排布的结构非常清楚，便于拆开观察 transform、延迟和层次关系是怎么配合的。

## 技术要点

- 分类：动画效果
- 标签：CSS3 / Menu / Transform
- 场景：导航交互
- 难度：中级
- 原始入口：
  - `/animation-js/menu-circular-toggle/index.html`
  - `animation-js/menu-circular-toggle`

## 在线体验

- [打开原始 Demo 页面](/animation-js/menu-circular-toggle/index.html)
- [查看 GitHub 源码目录](https://github.com/Fridolph/my-program/tree/master/public/animation-js/menu-circular-toggle)
- [返回 动画效果 分类](../)

## 目录结构

```bash
└── index.html
```

## 适用场景

- 适合在“导航交互”这类页面或模块里作为第一批参考案例。

## 实现拆解

- 先看触发按钮和菜单项之间的层级关系，理解谁负责状态切换、谁负责位置变化。
- 再看菜单项如何沿圆周展开，这一部分最适合拿来练习 transform-origin 和位移组合。

## 改造提醒

- 如果要迁移到业务项目，优先保留展开节奏，减少不必要的装饰层。
- 如果导航项较多，记得控制按钮间距，避免移动端点击区域重叠。

## 多维入口

### 按标签继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/tags/css3">CSS3</a><a class="browse-chip" href="/explore/tags/menu">Menu</a><a class="browse-chip" href="/explore/tags/transform">Transform</a></div>

### 按场景继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/scenes/u5bfc-u822a-u4ea4-u4e92">导航交互</a></div>

### 按难度继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/difficulty/intermediate">中级</a></div>

## 相关专题路线

如果你不是只想看单个案例，而是想继续判断“这一类页面问题还能往哪里看”，可以从这里回到专题路线。

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/spotlights/hero-brand-experience">
      <strong>首屏与品牌感建立</strong>
      <span>4 个场景 · 11 个 demo · 命中 1 个当前场景</span>
      <small>当前案例已被这条路线直接点名，适合回到路线页继续看整体组织方式。</small>
    </a>
  </div>

## 继续浏览

### 邻接导航

<div class="browse-nav-grid">
    <a class="browse-nav-card" href="/demos/css-animation/animation-js-text-animation">
      <span>上一条</span>
      <strong>文字动画特效</strong>
      <small>文字动画效果合集，适合参考标题入场与强调型文本表现。</small>
    </a>
    <a class="browse-nav-card" href="/demos/css-animation/animation-js-login-focus-line-animation">
      <span>下一条</span>
      <strong>自动焦点登录框</strong>
      <small>登录框焦点线条动画，适合参考表单输入态与聚焦反馈设计。</small>
    </a></div>

### 相关推荐

<div class="mini-card-grid">
    <a class="mini-card" href="/demos/css-animation/animation-js-menu-toggle-animation">
      <strong>CSS3 切换菜单</strong>
      <span>菜单按钮切换动画示例，适合学习展开收起的动效组织。</span>
    </a>
    <a class="mini-card" href="/demos/css-animation/animation-js-loading-love">
      <strong>爱心 Loading 动画</strong>
      <span>爱心主题的 Loading 动画，适合作为节日或趣味场景的等待反馈。</span>
    </a>
    <a class="mini-card" href="/demos/css-animation/animation-js-progress-demo-demo5">
      <strong>顶部吸附进度条</strong>
      <span>将进度条固定在页面顶部，适合模拟阅读进度或加载反馈。</span>
    </a>
  </div>

### 相关阅读

<p class="browse-empty">当前还没有可展示的开发笔记。</p>

---

<nav class="demo-nav">
  <a href="../">← 返回分类</a>
  <a href="/">返回首页</a>
</nav>
