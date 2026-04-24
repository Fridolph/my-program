---
layout: home
title: My Program Demo Collection
description: 收集整理各种前端 demo，支持分类浏览、详情页和隔离预览
---

# My Program Demo Collection

重构后的展示站点已经把原始 demo 统一整理为可搜索、可分类浏览的文档站。当前这一轮重构的重点，是把历史静态页面进一步沉淀成长期可维护的内容库。

- 当前已收录 **74** 个 demo
- 覆盖 **6** 个主分类
- 每个 demo 提供详情页、源码目录链接与原始页面入口
- 首页精选目前由 **8** 个 metadata 驱动条目参与编排
- 已补充项目进度页与里程碑页，便于继续推进 VitePress 化改造

<div class="status-panel">
  <div class="status-panel-card">
    <h2>项目进度</h2>
    <p>查看最近提交带来的能力演进、当前已完成模块和站点架构。</p>
    <a href="/guide/progress" class="button">查看进度 →</a>
  </div>

  <div class="status-panel-card">
    <h2>里程碑规划</h2>
    <p>查看下一阶段的内容治理、体验增强和发布落地计划。</p>
    <a href="/guide/roadmap" class="button alt">查看路线图 →</a>
  </div>
</div>

## 分类浏览

<div class="entry-visual-grid">
    <a class="entry-visual-card" href="/demos/css-animation/">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/categories/css-animation.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Animation</span>
          <strong>🎨 动画效果</strong>
          <small>关键帧 · 节奏 · 入场反馈</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">15 个 demo</span>
        <p>收录 CSS 与 JavaScript 驱动的动画演示。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/demos/hover-transition/">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/categories/hover-transition.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Hover</span>
          <strong>✨ CSS 过渡效果</strong>
          <small>悬停反馈 · 卡片层次 · 导航切换</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">27 个 demo</span>
        <p>聚合 hover、transition 与交互反馈类效果。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/demos/canvas/">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/categories/canvas.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Canvas</span>
          <strong>🖌️ Canvas 动画</strong>
          <small>氛围画面 · 取色 · 图形动画</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">4 个 demo</span>
        <p>收录基于 Canvas 的视觉与图形动画案例。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/demos/jquery/">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/categories/jquery.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Legacy Interaction</span>
          <strong>⚡ jQuery 特效</strong>
          <small>历史交互 · 旧项目复用 · 快速检索</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">12 个 demo</span>
        <p>保留历史 jQuery 交互效果，方便检索和复用。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/demos/layout/">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/categories/layout.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Layout</span>
          <strong>📐 布局方案</strong>
          <small>排版骨架 · 页面结构 · 基础练习</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">11 个 demo</span>
        <p>聚合常见布局练习和基础结构示例。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/demos/other/">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/categories/other.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Mixed Cases</span>
          <strong>🔧 其他效果</strong>
          <small>混合案例 · 交互样式 · 长尾参考</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">5 个 demo</span>
        <p>放置暂未归类但仍有参考价值的效果示例。</p>
      </div>
    </a>
  </div>

## 精选 Demo

首页精选不再按顺序截取，而是优先展示显式标记的推荐 demo，并附带推荐理由与封面策展层。

<div class="featured-demos">
  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/animation-js-loading-love.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">Loading</span>
        <strong class="featured-cover-title">Warm Heart</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">动画效果</span>
      </div>
      <h3>爱心 Loading 动画</h3>
      <p>爱心主题的 Loading 动画，适合作为节日或趣味场景的等待反馈。</p>
      <p class="featured-reason">推荐理由：主题鲜明、轻量直观，适合做首页第一屏的情绪入口。</p>
      <div class="tags"><span class="tag">Loading</span><span class="tag">CSS3</span><span class="tag">Animation</span></div>
      <a href="/demos/css-animation/animation-js-loading-love" class="button">查看详情</a>
    </div>
  </div>

  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/futuristic-3d-menu.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">3D Hover</span>
        <strong class="featured-cover-title">Future Menu</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">CSS 过渡效果</span>
      </div>
      <h3>未来派3D悬停效果</h3>
      <p>科技感 3D 菜单效果，适合参考带空间感的导航动效。</p>
      <p class="featured-reason">推荐理由：空间感和视觉冲击都很强，适合作为首页的高辨识度 showcase。</p>
      <div class="tags"><span class="tag">Menu</span><span class="tag">3D</span><span class="tag">Hover</span></div>
      <a href="/demos/hover-transition/futuristic-3d-menu" class="button">查看详情</a>
    </div>
  </div>

  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/fireworks-background-switch.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">Canvas Interaction</span>
        <strong class="featured-cover-title">Fireworks Tap</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">Canvas 动画</span>
      </div>
      <h3>烟花触发背景切换</h3>
      <p>点击触发烟花并切换背景图，适合作为互动型视觉演示。</p>
      <p class="featured-reason">推荐理由：交互反馈明确，最适合作为首页中的互动型视觉样例。</p>
      <div class="tags"><span class="tag">Canvas</span><span class="tag">Fireworks</span><span class="tag">Interaction</span></div>
      <a href="/demos/canvas/fireworks-background-switch" class="button">查看详情</a>
    </div>
  </div>

  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/animation-js-menu-circular-toggle.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">CSS Menu</span>
        <strong class="featured-cover-title">Radial Motion</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">动画效果</span>
      </div>
      <h3>圆形展开菜单</h3>
      <p>使用纯 CSS3 实现的圆形菜单展开效果，适合学习 transform 与过渡组合。</p>
      <p class="featured-reason">推荐理由：造型辨识度高，适合作为首页展示交互型菜单的经典入口。</p>
      <div class="tags"><span class="tag">CSS3</span><span class="tag">Menu</span><span class="tag">Transform</span></div>
      <a href="/demos/css-animation/animation-js-menu-circular-toggle" class="button">查看详情</a>
    </div>
  </div>

  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/canvas-colorful-gallery.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">Canvas Color</span>
        <strong class="featured-cover-title">Chromatic Mood</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">Canvas 动画</span>
      </div>
      <h3>图片取色氛围画廊</h3>
      <p>根据图片主色生成背景氛围，适合学习图片取色与视觉呼应。</p>
      <p class="featured-reason">推荐理由：能直接体现 Canvas 与图片取色能力，适合作为视觉氛围型案例入口。</p>
      <div class="tags"><span class="tag">Canvas</span><span class="tag">Color</span><span class="tag">Gallery</span></div>
      <a href="/demos/canvas/canvas-colorful-gallery" class="button">查看详情</a>
    </div>
  </div>

  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/emoji-face.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">CSS Emoji</span>
        <strong class="featured-cover-title">Playful Faces</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">CSS 过渡效果</span>
      </div>
      <h3>纯CSS表情符号</h3>
      <p>纯 CSS 绘制的表情符号效果，适合学习简单图形拼装与 hover 反馈。</p>
      <p class="featured-reason">推荐理由：图形简洁、风格轻松，适合作为 CSS 创意类示例入口。</p>
      <div class="tags"><span class="tag">CSS3</span><span class="tag">Emoji</span><span class="tag">Hover</span></div>
      <a href="/demos/hover-transition/emoji-face" class="button">查看详情</a>
    </div>
  </div>

  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/flex-layout-guide.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">Layout Guide</span>
        <strong class="featured-cover-title">Flex Basics</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">布局方案</span>
      </div>
      <h3>Flex 语法示例</h3>
      <p>Flex 布局语法演示页，适合作为基础属性学习索引。</p>
      <p class="featured-reason">推荐理由：适合作为布局类 demo 的导航入口，帮助快速进入基础排版主题。</p>
      <div class="tags"><span class="tag">Flex</span><span class="tag">Layout</span><span class="tag">Guide</span></div>
      <a href="/demos/layout/flex-layout-guide" class="button">查看详情</a>
    </div>
  </div>

  <div class="featured-card">
    
    <div class="featured-cover featured-cover-image" style="background-image:url('/featured-covers/other-card-change-layout.svg')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        <span class="featured-cover-label">Interaction</span>
        <strong class="featured-cover-title">Card Switch</strong>
      </div>
    </div>
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">其他效果</span>
      </div>
      <h3>卡片详情切换布局</h3>
      <p>卡片点击后切换布局与详情视图，适合作为列表转详情交互参考。</p>
      <p class="featured-reason">推荐理由：从列表到详情的切换关系明确，适合作为内容流转型卡片交互示例。</p>
      <div class="tags"><span class="tag">Card</span><span class="tag">Layout</span><span class="tag">Interaction</span></div>
      <a href="/demos/other/other-card-change-layout" class="button">查看详情</a>
    </div>
  </div>
</div>

## 按场景开始

如果你不是按技术栈找 demo，也可以从常见场景开始。

<div class="entry-visual-grid">
    <a class="entry-visual-card" href="/explore/scenes/u9996-u5c4f-u6c1b-u56f4">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/scenes/u9996-u5c4f-u6c1b-u56f4.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Hero Mood</span>
          <strong>首屏氛围</strong>
          <small>首屏气质 · 品牌氛围 · 视觉记忆</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">6 个案例</span>
        <p>先从 爱心 Loading 动画 这类案例进入，更容易建立直观判断。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/explore/scenes/u5bfc-u822a-u4ea4-u4e92">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/scenes/u5bfc-u822a-u4ea4-u4e92.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Navigation</span>
          <strong>导航交互</strong>
          <small>入口组织 · 空间动线 · 切换反馈</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">4 个案例</span>
        <p>先从 未来派3D悬停效果 这类案例进入，更容易建立直观判断。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/explore/scenes/u56fe-u6587-u5361-u7247-u5c55-u793a">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/scenes/u56fe-u6587-u5361-u7247-u5c55-u793a.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Cards</span>
          <strong>图文卡片展示</strong>
          <small>图文封面 · 内容入口 · 层次切换</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">4 个案例</span>
        <p>先从 卡片 Hover 展示 这类案例进入，更容易建立直观判断。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/explore/scenes/u52a0-u8f7d-u8fdb-u5ea6-u53cd-u9988">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/scenes/u52a0-u8f7d-u8fdb-u5ea6-u53cd-u9988.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Loading</span>
          <strong>加载进度反馈</strong>
          <small>等待态 · 节奏提示 · 轻量反馈</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">3 个案例</span>
        <p>先从 爱心 Loading 动画 这类案例进入，更容易建立直观判断。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/explore/scenes/u56fe-u7247-u6d4f-u89c8">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/scenes/u56fe-u7247-u6d4f-u89c8.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Scene</span>
          <strong>图片浏览</strong>
          <small>场景入口 · 浏览线索 · 案例聚合</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">2 个案例</span>
        <p>先从 图片取色氛围画廊 这类案例进入，更容易建立直观判断。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/explore/scenes/u9605-u8bfb-u53cd-u9988">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/scenes/u9605-u8bfb-u53cd-u9988.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Reading</span>
          <strong>阅读反馈</strong>
          <small>阅读进度 · 滚动定位 · 长文反馈</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">2 个案例</span>
        <p>先从 滚动阅读进度条 这类案例进入，更容易建立直观判断。</p>
      </div>
    </a>
  </div>

## 专题路线

如果你面对的是一个更完整的页面问题，也可以先从专题路线进入。

<div class="entry-visual-grid">
    <a class="entry-visual-card" href="/discover/spotlights/hero-brand-experience">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/spotlights/hero-brand-experience.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Spotlight</span>
          <strong>首屏与品牌感建立</strong>
          <small>首屏氛围 · 导航组织 · 作品集入口</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">4 个场景 · 11 个 demo</span>
        <p>适合在首页首屏、作品集首页和品牌型着陆页里建立第一眼的氛围、导航感和视觉记忆。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/discover/spotlights/card-content-showcase">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/spotlights/card-content-showcase.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Spotlight</span>
          <strong>卡片与内容展示入口</strong>
          <small>图文卡片 · 人物入口 · 大图预览</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">6 个场景 · 12 个 demo</span>
        <p>适合在内容卡片、人物入口、图文悬停和图片浏览中寻找更完整的内容展示路线。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/discover/spotlights/reading-progress-feedback">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/spotlights/reading-progress-feedback.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Spotlight</span>
          <strong>阅读与进度反馈路线</strong>
          <small>阅读反馈 · 滚动进度 · 加载节奏</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">7 个场景 · 7 个 demo</span>
        <p>适合在长文、页面滚动、加载反馈和逐步资源进入中寻找更完整的节奏型反馈方案。</p>
      </div>
    </a>
    <a class="entry-visual-card" href="/discover/spotlights/lightweight-ui-practice">
      <div class="entry-visual-media" style="background-image:url('/entry-covers/spotlights/lightweight-ui-practice.svg')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">Spotlight</span>
          <strong>轻量交互与基础练习路线</strong>
          <small>基础练习 · 轻量反馈 · 小型组件</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">7 个场景 · 7 个 demo</span>
        <p>适合在基础动画教学、轻量组件反馈和小型 UI 演示中快速找到容易上手的练习入口。</p>
      </div>
    </a>
  </div>

## 按问题开始

如果你现在更关心“我该先做什么”，可以直接从具体问题起步线进入。

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/quick-start/hero-first-screen">
      <strong>我想先做首页首屏</strong>
      <span>中等投入 · 1 条路线</span>
      <small>适合先判断首屏氛围、导航组织和第一眼品牌感该如何配合。 适合：品牌首页 / Landing Page</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/card-list-and-preview">
      <strong>我想先做卡片列表与内容预览</strong>
      <span>低到中等投入 · 2 条路线</span>
      <small>适合先判断卡片入口、作品集列表、人物卡片和预览切换应该如何分层。 适合：内容列表页 / 案例集</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/reading-and-loading-feedback">
      <strong>我想先做阅读与加载反馈</strong>
      <span>低投入 · 2 条路线</span>
      <small>适合先比较阅读进度、滚动反馈、加载节奏和资源进入提示。 适合：文档页 / 教程页</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/lightweight-animation-practice">
      <strong>我想先找低成本练习案例</strong>
      <span>低投入 · 1 条路线</span>
      <small>适合先从轻量动画、基础 transform 和小型组件反馈开始练手。 适合：动效练手 / 组件试验</small>
    </a>
  </div>

## 做完第一步后继续推进

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/quick-start/hero-first-screen">
      <strong>我想先做首页首屏 -&gt; 我想先做卡片列表与内容预览</strong>
      <span>补内容入口 · 2 条下一步</span>
      <small>首屏方向跑通之后，下一步通常要继续把卡片入口、内容预览或列表结构补稳。</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/card-list-and-preview">
      <strong>我想先做卡片列表与内容预览 -&gt; 我想先做阅读与加载反馈</strong>
      <span>补反馈节奏 · 2 条下一步</span>
      <small>列表结构稳定之后，下一步通常要继续补阅读反馈、滚动反馈或资源进入节奏。</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/reading-and-loading-feedback">
      <strong>我想先做阅读与加载反馈 -&gt; 我想先做卡片列表与内容预览</strong>
      <span>补内容入口 · 2 条下一步</span>
      <small>反馈节奏跑通之后，下一步常常要回到内容入口本身，把卡片、摘要和预览层级一起整理稳定。</small>
    </a>
  </div>

## 按下一步推进类型继续看

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/quick-start/follow-up/content-entry">
      <strong>补内容入口</strong>
      <span>3 条推进顺序 · 4 个阶段</span>
      <small>更适合先把卡片、摘要、预览和列表层级补稳，再继续扩展页面内容入口。 常见阶段：验证期 / 打磨期</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/follow-up/feedback-flow">
      <strong>补反馈节奏</strong>
      <span>2 条推进顺序 · 4 个阶段</span>
      <small>更适合先补阅读反馈、滚动提示和资源进入节奏，减少用户浏览时的不确定感。 常见阶段：打磨期 / 验证期</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/follow-up/hero-atmosphere">
      <strong>补首屏氛围</strong>
      <span>2 条推进顺序 · 3 个阶段</span>
      <small>更适合回到首页首屏、导航组织和第一眼品牌感，把整体氛围层继续补强。 常见阶段：验证期 / 打磨期</small>
    </a>
  </div>

## 当前先不急着补什么

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/quick-start/hero-first-screen">
      <strong>我想先做首页首屏 -&gt; 先不上 当前还没有补充</strong>
      <span>1 条暂缓判断</span>
      <small>在首屏入口和整体氛围都还没站稳前，先不要急着补局部动效，否则很容易把注意力打散。</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/card-list-and-preview">
      <strong>我想先做卡片列表与内容预览 -&gt; 先不上 当前还没有补充</strong>
      <span>1 条暂缓判断</span>
      <small>当列表密度、摘要层级和图片比例还没稳定之前，先不要急着补局部动效，否则很容易让浏览节奏变乱。</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/reading-and-loading-feedback">
      <strong>我想先做阅读与加载反馈 -&gt; 先不上 当前还没有补充</strong>
      <span>1 条暂缓判断</span>
      <small>如果当前核心问题是阅读反馈或等待提示，先不要回头做过重的首屏氛围，否则会把注意力从反馈问题上拉走。</small>
    </a>
  </div>

## 从角色 / 阶段继续判断下一步

<div class="topic-card-grid">
    <a class="topic-card" href="/discover/quick-start/roles/component-experiment">
      <strong>组件试验 -&gt; 补内容入口</strong>
      <span>1 条起步线 · 2 类推进重点</span>
      <small>如果你更想把练手结果接进真实内容页面，再继续看卡片列表与预览会更贴近业务结构。</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/roles/content-experience">
      <strong>内容体验 -&gt; 补局部动效</strong>
      <span>1 条起步线 · 2 类推进重点</span>
      <small>如果你还想低成本补一点局部动效，再接轻量练手案例会更容易控制改造范围。</small>
    </a>
    <a class="topic-card" href="/discover/quick-start/stages/content-shaping">
      <strong>信息成型期 -&gt; 补反馈节奏</strong>
      <span>1 条起步线 · 2 类推进重点</span>
      <small>列表结构稳定之后，下一步通常要继续补阅读反馈、滚动反馈或资源进入节奏。</small>
    </a>
  </div>

## 内容入口

除了 demo 浏览，现在也可以从阶段笔记和专题发现进入站点内容。

<div class="topic-card-grid">
  <a class="topic-card" href="/journal/">
    <strong>开发笔记</strong>
    <span>26 篇记录</span>
    <small>回看每一轮重构为什么这样推进，以及当时的取舍和验证方式。</small>
  </a>
  <a class="topic-card" href="/discover/">
    <strong>专题发现</strong>
    <span>6 个场景入口</span>
    <small>按场景、精选和分类重新开始探索，而不只是按目录查找。</small>
  </a>
  <a class="topic-card" href="/discover/spotlights/">
    <strong>专题路线</strong>
    <span>6 条路线</span>
    <small>把相近 scene 和推荐 demo 串成更完整的问题入口，适合先建立整体判断。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/">
    <strong>快速开始</strong>
    <span>4 条起步线</span>
    <small>按“我现在想先做什么”组织入口，适合作为轻量检索替代方案。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/roles/">
    <strong>按角色开始</strong>
    <span>6 组角色入口</span>
    <small>从前端实现、视觉探索、内容策划等视角更快找到适合自己的起步线，并回看当前角色更常见的推进重点。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/stages/">
    <strong>按项目阶段开始</strong>
    <span>4 组阶段入口</span>
    <small>从验证期、打磨期和上线前切入，更快判断当前该先补什么，以及当前阶段更常见的继续推进类型。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/follow-up/">
    <strong>按下一步推进类型开始</strong>
    <span>4 组推进类型</span>
    <small>先判断现在更该补结构、补反馈、补首屏氛围还是补局部动效，再回看这一步更常见于哪些角色和阶段。</small>
  </a>
  <a class="topic-card" href="/explore/">
    <strong>多维导航</strong>
    <span>6 条快速入口</span>
    <small>按标签、场景和难度进入，更适合带着具体问题继续找案例。</small>
  </a>
</div>

## 下一步改造重点

1. 把更多历史 demo 补齐稳定标题、描述、标签与技术说明。
2. 继续把“静态页面集合”转成“可检索、可叙述、可维护”的内容体系。
3. 增强首页、分类页与 demo 页之间的内容联动，而不只是目录跳转。
4. 为后续 GitHub Pages 发布、SEO 和内容持续更新预留标准化入口。

## 使用方式

1. 从分类页进入目标 demo。
2. 在详情页中使用隔离预览检查效果。
3. 需要完整交互时，直接打开原始 Demo 页面。
4. 需要复用代码时，跳转到 GitHub 源码目录。

<nav class="home-nav">
  <a href="/demos/css-animation/" class="primary-button">开始探索 →</a>
  <a href="https://github.com/Fridolph/my-program" class="secondary-button">GitHub 仓库</a>
</nav>
