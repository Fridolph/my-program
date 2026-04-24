---
layout: doc
title: M5 开发笔记：让 metadata 真正长成站点导航
description: 把 tags、scenes 和 difficulty 从生成字段推进成可访问的站点导航结构。
---

# M5 开发笔记：让 metadata 真正长成站点导航

- 日期：2026-03-14
- 类型：开发笔记
- 原始文档：`docs/blog/2026-03-14-vitepress-dao-m5-multi-dimensional-navigation.md`

## 摘要

- 这一轮把标签、场景和难度从 metadata 字段推进成真正的浏览入口。
- 核心变化是建立多维导航页，并让 demo 详情页也能回流到这些维度页。

## 关键主题

<div class="browse-chip-list"><span class="browse-chip">多维导航</span><span class="browse-chip">tags</span><span class="browse-chip">scenes</span><span class="browse-chip">difficulty</span></div>

## 相关 Demo

<div class="mini-card-grid">
    <a class="mini-card" href="/demos/hover-transition/futuristic-3d-menu">
      <strong>未来派3D悬停效果</strong>
      <span>科技感 3D 菜单效果，适合参考带空间感的导航动效。</span>
    </a>
    <a class="mini-card" href="/demos/other/scroll-reading-progress-bar">
      <strong>滚动阅读进度条</strong>
      <span>利用页面滚动进度驱动顶部进度条，适合作为长文阅读或滚动反馈参考。</span>
    </a>
    <a class="mini-card" href="/demos/css-animation/animation-js-loading-love">
      <strong>爱心 Loading 动画</strong>
      <span>爱心主题的 Loading 动画，适合作为节日或趣味场景的等待反馈。</span>
    </a>
  </div>

## 为什么值得读

把 tags、scenes 和 difficulty 从生成字段推进成可访问的站点导航结构。

## 继续阅读

<div class="journal-card-grid">
    <a class="journal-card" href="/journal/dao-m11-build-performance">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M11 开发笔记：让站点回到内容入口优先的轻量构建状态</strong>
      <p>收掉高成本本地搜索入口，收敛 header 信息优先级，并把 docs:dev / docs:preview 的职责明确写回文档。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m9-release-observability">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M9 开发笔记：让发布结果开始拥有可回看的状态快照</strong>
      <p>新增发布快照、站内发布状态页和 workflow 发布摘要，让发布结果开始具备可回看的状态表达。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m7-release-convergence">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M7 开发笔记：让发布链路可回看，让旧入口真正完成收敛</strong>
      <p>把发布说明、workflow 校验和旧入口迁移说明统一收口，让发布链路更可回看、可验证。</p>
    </a>
  </div>

## 邻接笔记

<div class="journal-card-grid">
    <a class="journal-card" href="/journal/dao-m6-seo-sharing">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M6 开发笔记：让站点开始具备被搜索与被分享的基础能力</strong>
      <p>补齐 canonical、OG、Twitter Card、robots、manifest 和 sitemap，让站点开始具备外部可见性基础设施。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m4-content-productization">
      <span class="journal-card-date">2026-03-14</span>
      <strong>M4 开发笔记：让展示站开始承载内容</strong>
      <p>让开发笔记、专题发现和首页内容入口进入站点主路径，推动展示站向内容站演进。</p>
    </a>
  </div>

## 延伸入口

- [返回开发笔记列表](/journal/)
- [查看项目进度](/guide/progress)
- [查看里程碑规划](/guide/roadmap)
