---
layout: doc
title: 滚动阅读进度条
description: 利用页面滚动进度驱动顶部进度条，适合作为长文阅读或滚动反馈参考。
---

# 滚动阅读进度条

<DemoPreview
  demoUrl="/other/scroll-progress-bar/index.html"
  title="滚动阅读进度条"
  description="利用页面滚动进度驱动顶部进度条，适合作为长文阅读或滚动反馈参考。"
/>

## 效果说明

利用页面滚动进度驱动顶部进度条，适合作为长文阅读或滚动反馈参考。

## 为什么值得看

- 它解决的是非常真实的内容问题：用户在长页面里需要知道自己已经读到哪里。
- 结构简单、反馈明确，很适合作为“滚动行为转成 UI 提示”的基础案例。

## 技术要点

- 分类：其他效果
- 标签：Scroll / Progress / Reading
- 场景：阅读反馈 / 长文阅读 / 页面滚动反馈
- 难度：初级
- 原始入口：
  - `/other/scroll-progress-bar/index.html`
  - `other/scroll-progress-bar`

## 在线体验

- [打开原始 Demo 页面](/other/scroll-progress-bar/index.html)
- [查看 GitHub 源码目录](https://github.com/Fridolph/my-program/tree/main/public/other/scroll-progress-bar)
- [返回 其他效果 分类](../)

## 目录结构

```bash
└── index.html
```

## 适用场景

- 适合长文阅读、教程页、文档页或需要滚动反馈的移动端详情页。
- 当页面滚动行为本身就是内容理解的一部分时，进度条会非常有帮助。

## 实现拆解

- 先看滚动进度是如何映射到顶部条宽度的，这部分最适合直接迁移。
- 如果项目里已经有阅读容器或文章布局，通常只需要替换进度计算和样式层。

## 改造提醒

- 如果页面结构不是单列长文，先确认进度提示是否真的能帮助用户，而不是制造额外噪音。
- 在移动端要注意顶部条高度和颜色，避免压住系统状态栏或导航栏。

## 多维入口

### 按标签继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/tags/scroll">Scroll</a><a class="browse-chip" href="/explore/tags/progress">Progress</a><a class="browse-chip" href="/explore/tags/reading">Reading</a></div>

### 按场景继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/scenes/u9605-u8bfb-u53cd-u9988">阅读反馈</a><a class="browse-chip" href="/explore/scenes/u957f-u6587-u9605-u8bfb">长文阅读</a><a class="browse-chip" href="/explore/scenes/u9875-u9762-u6eda-u52a8-u53cd-u9988">页面滚动反馈</a></div>

### 按难度继续找

<div class="browse-chip-list"><a class="browse-chip" href="/explore/difficulty/beginner">初级</a></div>

## 相关专题路线

如果你不是只想看单个案例，而是想继续判断“这一类页面问题还能往哪里看”，可以从这里回到专题路线。

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/spotlights/reading-progress-feedback">
      <strong>阅读与进度反馈路线</strong>
      <span>7 个场景 · 7 个 demo · 命中 3 个当前场景</span>
      <small>当前案例已被这条路线直接点名，适合回到路线页继续看整体组织方式。</small>
    </a>
  </div>

## 继续浏览

### 邻接导航

<div class="browse-nav-grid">
    <a class="browse-nav-card" href="/demos/other/other-radio-buttons">
      <span>上一条</span>
      <strong>单选按钮组件</strong>
      <small>单选按钮样式与交互示例，适合作为表单控件视觉参考。</small>
    </a>
    <a class="browse-nav-card" href="/demos/other/other-card-change-layout">
      <span>下一条</span>
      <strong>卡片详情切换布局</strong>
      <small>卡片点击后切换布局与详情视图，适合作为列表转详情交互参考。</small>
    </a></div>

### 相关推荐

<div class="mini-card-grid">
    <a class="mini-card" href="/demos/other/other-card-change-layout">
      <strong>卡片详情切换布局</strong>
      <span>卡片点击后切换布局与详情视图，适合作为列表转详情交互参考。</span>
    </a>
  </div>

### 相关阅读

<div class="journal-card-grid">
    <a class="journal-card" href="/journal/dao-m25-quick-start-overdoing-guardrails">
      <span class="journal-card-date">2026-03-28</span>
      <strong>M25 开发笔记：让 quick start 开始提醒哪里最容易做过头</strong>
      <p>继续沿 quick start 主链路补“做过头”的提醒，让站点开始表达当前这条线最容易失控的地方。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m24-quick-start-tradeoff-guidance">
      <span class="journal-card-date">2026-03-28</span>
      <strong>M24 开发笔记：让 quick start 开始解释为什么先补这一类</strong>
      <p>继续沿 quick start 主链路补推进取舍说明，让站点开始回答为什么当前先补 A，而不是 B。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m23-quick-start-defer-guidance">
      <span class="journal-card-date">2026-03-28</span>
      <strong>M23 开发笔记：让 quick start 开始表达当前先不上什么</strong>
      <p>为 quick start 补反向推进语义，让站点不只表达下一步该补什么，也开始表达当前先不上什么更稳。</p>
    </a>
  </div>

---

<nav class="demo-nav">
  <a href="../">← 返回分类</a>
  <a href="/">返回首页</a>
</nav>
