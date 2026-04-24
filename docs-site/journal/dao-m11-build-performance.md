---
layout: doc
title: M11 开发笔记：让站点回到内容入口优先的轻量构建状态
description: "收掉高成本本地搜索入口，收敛 header 信息优先级，并把 docs:dev / docs:preview 的职责明确写回文档。"
---

# M11 开发笔记：让站点回到内容入口优先的轻量构建状态

- 日期：2026-03-15
- 类型：开发笔记
- 原始文档：`docs/blog/2026-03-15-vitepress-dao-m11-build-performance.md`

## 摘要

- 这一轮先移除高成本低收益的本地搜索索引，让站点回到首页、discover、explore 和分类页承担主要发现职责。
- 核心变化是让构建更轻、header 更聚焦，也让 docs:preview 的最终产物验证语义更清楚。

## 关键主题

<div class="browse-chip-list"><span class="browse-chip">build performance</span><span class="browse-chip">preview</span><span class="browse-chip">header</span><span class="browse-chip">discover</span></div>

## 相关 Demo

<div class="mini-card-grid">
    <a class="mini-card" href="/demos/css-animation/animation-js-loading-love">
      <strong>爱心 Loading 动画</strong>
      <span>爱心主题的 Loading 动画，适合作为节日或趣味场景的等待反馈。</span>
    </a>
    <a class="mini-card" href="/demos/hover-transition/futuristic-3d-menu">
      <strong>未来派3D悬停效果</strong>
      <span>科技感 3D 菜单效果，适合参考带空间感的导航动效。</span>
    </a>
    <a class="mini-card" href="/demos/other/scroll-reading-progress-bar">
      <strong>滚动阅读进度条</strong>
      <span>利用页面滚动进度驱动顶部进度条，适合作为长文阅读或滚动反馈参考。</span>
    </a>
  </div>

## 为什么值得读

收掉高成本本地搜索入口，收敛 header 信息优先级，并把 docs:dev / docs:preview 的职责明确写回文档。

## 继续阅读

<div class="journal-card-grid">
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
    <a class="journal-card" href="/journal/dao-m6-seo-sharing">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M6 开发笔记：让站点开始具备被搜索与被分享的基础能力</strong>
      <p>补齐 canonical、OG、Twitter Card、robots、manifest 和 sitemap，让站点开始具备外部可见性基础设施。</p>
    </a>
  </div>

## 邻接笔记

<div class="journal-card-grid">
    <a class="journal-card" href="/journal/dao-m12-visual-entry">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M12 开发笔记：让内容入口不只可用，也一眼更好判断</strong>
      <p>为分类和场景建立统一入口封面，并把首页、discover、explore 改成更可视的封面卡片入口。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m10-content-depth">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M10 开发笔记：让 demo 页开始真正承担内容解释职责</strong>
      <p>为重点 demo 补结构化内容骨架，并补强公共场景与 scene narrative，让详情页和场景页都更像内容入口。</p>
    </a>
  </div>

## 延伸入口

- [返回开发笔记列表](/journal/)
- [查看项目进度](/guide/progress)
- [查看里程碑规划](/guide/roadmap)
