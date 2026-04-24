export const journalEntries = [
  {
    slug: 'dao-m25-quick-start-overdoing-guardrails',
    title: 'M25 开发笔记：让 quick start 开始提醒哪里最容易做过头',
    date: '2026-03-28',
    description: '继续沿 quick start 主链路补“做过头”的提醒，让站点开始表达当前这条线最容易失控的地方。',
    highlights: ['quick start guardrails', 'overdoing', 'tradeoff', 'decision'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只告诉用户补什么 / 不补什么 / 为什么这样取舍，也开始提醒当前最容易做过头的地方。',
      '核心变化是补齐 overdoWarnings，并把这层 guardrail 提示接回 quick start 详情页、聚合页、首页与 discover。'
    ],
    sourcePath: 'docs/blog/2026-03-28-vitepress-dao-m25-quick-start-overdoing-guardrails.md'
  },
  {
    slug: 'dao-m24-quick-start-tradeoff-guidance',
    title: 'M24 开发笔记：让 quick start 开始解释为什么先补这一类',
    date: '2026-03-28',
    description: '继续沿 quick start 主链路补推进取舍说明，让站点开始回答为什么当前先补 A，而不是 B。',
    highlights: ['quick start tradeoff', 'follow-up', 'defer', 'decision'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只告诉用户下一步补什么、先不上什么，也开始回答为什么当前先补这一类。',
      '核心变化是补齐 tradeoffNotes，并把推进取舍说明接回 quick start 详情页、聚合页、首页与 discover。'
    ],
    sourcePath: 'docs/blog/2026-03-28-vitepress-dao-m24-quick-start-tradeoff-guidance.md'
  },
  {
    slug: 'dao-m23-quick-start-defer-guidance',
    title: 'M23 开发笔记：让 quick start 开始表达当前先不上什么',
    date: '2026-03-28',
    description: '为 quick start 补反向推进语义，让站点不只表达下一步该补什么，也开始表达当前先不上什么更稳。',
    highlights: ['quick start defer guidance', 'follow-up', 'discover', 'decision'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只告诉用户下一步该补哪一类，也开始回答当前先不上什么更稳。',
      '核心变化是补齐 deferTypes 与 deferReason，并把这层反向推进语义接回 quick start 详情页、聚合页、首页与 discover。'
    ],
    sourcePath: 'docs/blog/2026-03-28-vitepress-dao-m23-quick-start-defer-guidance.md'
  },
  {
    slug: 'dao-m22-quick-start-follow-up-segments',
    title: 'M22 开发笔记：让 quick start 的下一步开始对齐角色与阶段',
    date: '2026-03-28',
    description: '继续复用 quick start 主链路，把推进类型和角色 / 阶段交叉起来，让下一步建议更贴近当前视角与时机。',
    highlights: ['quick start follow-up', 'audiences', 'stages', 'discover'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只告诉用户下一步补哪一类，也开始回答这个判断对当前角色和当前阶段意味着什么。',
      '核心变化是把推进类型继续接回角色页、阶段页和推进类型页，并让 quick start 详情页开始表达角色 / 阶段视角下的继续推进判断。'
    ],
    sourcePath: 'docs/blog/2026-03-28-vitepress-dao-m22-quick-start-follow-up-segments.md'
  },
  {
    slug: 'dao-m21-quick-start-follow-up-types',
    title: 'M21 开发笔记：让 quick start 的下一步开始区分推进类型',
    date: '2026-03-21',
    description: '为 quick start 补推进类型元数据，并生成按推进类型回看的入口页，让下一步建议不只停在跳转链接。',
    highlights: ['quick start follow-up types', 'entry flow', 'discover', 'next step'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只告诉用户下一步去哪，也开始回答下一步是先补结构、反馈、氛围还是局部动效。',
      '核心变化是补齐 followUpTypes，并把推进类型入口接回 quick start 总览、详情页、首页与 discover。'
    ],
    sourcePath: 'docs/blog/2026-03-21-vitepress-dao-m21-quick-start-follow-up-types.md'
  },
  {
    slug: 'dao-m20-quick-start-follow-up',
    title: 'M20 开发笔记：让 quick start 开始接住第一版之后的下一步',
    date: '2026-03-21',
    description: '为 quick start 补下一步串联元数据，并让 quick start、首页与 discover 开始表达继续推进建议。',
    highlights: ['quick start follow-up', 'next step', 'discover', 'entry flow'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只帮助用户找到入口，也开始帮助用户在第一版之后知道下一步该往哪里接。',
      '核心变化是补齐 followUpSlugs 与 followUpReason，并把串联建议接回 quick start 详情页、总览页、首页与 discover。'
    ],
    sourcePath: 'docs/blog/2026-03-21-vitepress-dao-m20-quick-start-follow-up.md'
  },
  {
    slug: 'dao-m19-quick-start-segmentation',
    title: 'M19 开发笔记：让 quick start 开始按角色和阶段分层',
    date: '2026-03-20',
    description: '为 quick start 补角色与阶段元数据，生成分层页，并把分层入口接回 quick start 与 discover。',
    highlights: ['quick start segmentation', 'audiences', 'stages', 'discover'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只回答做什么和值不值得做，也开始回答不同角色和不同项目阶段该从哪里开始。',
      '核心变化是补齐 audiences 与 stages 字段，并生成按角色、按阶段聚合的入口页与详情页。'
    ],
    sourcePath: 'docs/blog/2026-03-20-vitepress-dao-m19-quick-start-segmentation.md'
  },
  {
    slug: 'dao-m18-quick-start-decision',
    title: 'M18 开发笔记：让 quick start 开始承担轻量决策辅助',
    date: '2026-03-16',
    description: '为 quick start 补决策摘要与改造成本提示，并让首页和 discover 的卡片开始表达投入感。',
    highlights: ['quick start decision', 'entry cost', 'discover', 'lightweight guidance'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'css-transform-gallery'],
    summary: [
      '这一轮继续深化 quick start，让它不只告诉用户怎么开始，也开始帮助用户判断这条线值不值得现在做。',
      '核心变化是补齐 fitFor、costLabel、firstWin 和 skipIf，并让首页与 discover 卡片开始表达成本感。'
    ],
    sourcePath: 'docs/blog/2026-03-16-vitepress-dao-m18-quick-start-decision.md'
  },
  {
    slug: 'dao-m17-quick-start-playbook',
    title: 'M17 开发笔记：让 quick start 不只告诉你去哪，也告诉你先怎么做',
    date: '2026-03-15',
    description: '为 quick start 补推荐步骤、选择建议和误区提醒，并让首页直接暴露具体问题入口。',
    highlights: ['quick start playbook', 'task guidance', 'home entry', 'discover'],
    relatedDemoIds: ['animation-js-loading-love', 'milestone-gallery-1', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮继续深化 quick start，让它不只告诉用户先去哪里，也开始告诉用户第一步怎么做、怎么选、先避开什么。',
      '核心变化是补齐任务型建议字段，并让首页开始直接展示具体 quick start 条目。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m17-quick-start-playbook.md'
  },
  {
    slug: 'dao-m16-quick-start',
    title: 'M16 开发笔记：让用户按当前问题直接开始',
    date: '2026-03-15',
    description: '新增 quick start 入口，作为轻量检索替代方案，让用户能直接从问题进入路线、场景与 demo。',
    highlights: ['quick start', 'discover', 'lightweight retrieval', 'entry design'],
    relatedDemoIds: ['animation-js-loading-love', 'other-card-change-layout', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮新增 quick start 总览页与详情页，把“我现在先做什么”直接变成入口，而不要求用户先理解站点结构。',
      '核心变化是建立问题起步线，并让其继续回流到 spotlight、scene、demo 与开发笔记。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m16-quick-start.md'
  },
  {
    slug: 'dao-m15-route-expansion',
    title: 'M15 开发笔记：继续扩路线密度，也把长尾场景讲清楚',
    date: '2026-03-15',
    description: '扩充专题路线，并为一批长尾 scene 补 narrative，让 scene 页和首页入口都更像真正的内容入口。',
    highlights: ['spotlight expansion', 'scene narrative', 'discover', 'entry density'],
    relatedDemoIds: ['milestone-gallery-1', 'stacked-profile-gallery', 'image-preload-gallery'],
    summary: [
      '这一轮继续扩充专题路线，并把一批长尾 scene 的 narrative 写回主链路，让 scene 页开始更稳定地解释为什么从这里进入。',
      '核心变化是新增两条 spotlight 路线、补齐多条长尾 scene narrative，并让首页开始承接更多路线入口。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m15-route-expansion.md'
  },
  {
    slug: 'dao-m14-spotlight-feedback',
    title: 'M14 开发笔记：让专题路线真正回流到 demo 详情页',
    date: '2026-03-15',
    description: '把专题路线从上层入口继续接回 demo 详情页，并补齐 spotlight 长尾 demo 的结构化深描内容。',
    highlights: ['spotlight feedback', 'demo detail', 'content depth', 'long-tail demos'],
    relatedDemoIds: ['milestone-gallery-1', 'single-element-loading', 'other-card-change-layout'],
    summary: [
      '这一轮把专题路线继续接回 demo 详情页，让路线不再只是入口层组织方式，而开始成为案例页的解释语境。',
      '核心变化是新增相关专题路线区块，并为一批 spotlight 内长尾 demo 补齐 whyRead、implementationNotes、whenToUse 和 adaptationTips。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m14-spotlight-feedback.md'
  },
  {
    slug: 'dao-m13-spotlight-aggregation',
    title: 'M13 开发笔记：让场景入口开始长成更完整的问题路线',
    date: '2026-03-15',
    description: '把相近 scene 聚成专题路线，并让首页与 discover 开始承接更高层的问题入口。',
    highlights: ['spotlight', 'discover', 'scene aggregation', 'content route'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'other-card-change-layout'],
    summary: [
      '这一轮把零散的 scene 入口进一步聚合成专题路线，让 discover 开始承接更完整的问题路线。',
      '核心变化是让站点不只支持按单个 scene 进入，也开始支持按更高层主题路线进入。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m13-spotlight-aggregation.md'
  },
  {
    slug: 'dao-m12-visual-entry',
    title: 'M12 开发笔记：让内容入口不只可用，也一眼更好判断',
    date: '2026-03-15',
    description: '为分类和场景建立统一入口封面，并把首页、discover、explore 改成更可视的封面卡片入口。',
    highlights: ['entry cover', 'discover', 'explore', 'visual navigation'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'flex-layout-guide'],
    summary: [
      '这一轮把分类与场景接入统一的入口封面生成链路，让首页和发现页不再只依赖文字卡片。',
      '核心变化是让内容入口从“结构可用”继续推进到“视觉上更容易判断从哪里开始”。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m12-visual-entry.md'
  },
  {
    slug: 'dao-m11-build-performance',
    title: 'M11 开发笔记：让站点回到内容入口优先的轻量构建状态',
    date: '2026-03-15',
    description: '收掉高成本本地搜索入口，收敛 header 信息优先级，并把 docs:dev / docs:preview 的职责明确写回文档。',
    highlights: ['build performance', 'preview', 'header', 'discover'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮先移除高成本低收益的本地搜索索引，让站点回到首页、discover、explore 和分类页承担主要发现职责。',
      '核心变化是让构建更轻、header 更聚焦，也让 docs:preview 的最终产物验证语义更清楚。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m11-build-performance.md'
  },
  {
    slug: 'dao-m10-content-depth',
    title: 'M10 开发笔记：让 demo 页开始真正承担内容解释职责',
    date: '2026-03-15',
    description: '为重点 demo 补结构化内容骨架，并补强公共场景与 scene narrative，让详情页和场景页都更像内容入口。',
    highlights: ['content depth', 'scene narrative', 'demo page', 'explore'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'canvas-colorful-gallery'],
    summary: [
      '这一轮把 demo 深描字段和场景 narrative 接入生成链路，让详情页与场景页都开始承接更多解释职责。',
      '核心变化是让 demo 页更像文档节点，也让场景页更像真实的进入入口。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m10-content-depth.md'
  },
  {
    slug: 'dao-m9-release-observability',
    title: 'M9 开发笔记：让发布结果开始拥有可回看的状态快照',
    date: '2026-03-15',
    description: '新增发布快照、站内发布状态页和 workflow 发布摘要，让发布结果开始具备可回看的状态表达。',
    highlights: ['release manifest', '发布状态', 'workflow', '回滚基线'],
    relatedDemoIds: ['animation-js-loading-love', 'scroll-reading-progress-bar', 'futuristic-3d-menu'],
    summary: [
      '这一轮把发布快照和状态页接入生成链路，让维护者可以直接回看当前构建状态。',
      '核心变化是让发布结果开始拥有可查看、可解释、可用于回滚判断的状态快照。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m9-release-observability.md'
  },
  {
    slug: 'dao-m8-page-share-assets',
    title: 'M8 开发笔记：让关键页面开始拥有自己的传播语义',
    date: '2026-03-15',
    description: '让页面级分享图进入生成链路，使首页、Demo 页、指南页和开发笔记页拥有各自的传播卡片。',
    highlights: ['页面级分享图', 'SEO', 'OG', '传播资产'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'canvas-colorful-gallery'],
    summary: [
      '这一轮把页面级分享图接入生成主链路，让 route 与分享图资源形成稳定映射。',
      '核心变化是让页面开始拥有自己的传播语义，而不再共用站点级默认分享图。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m8-page-share-assets.md'
  },
  {
    slug: 'dao-m7-release-convergence',
    title: 'M7 开发笔记：让发布链路可回看，让旧入口真正完成收敛',
    date: '2026-03-15',
    description: '把发布说明、workflow 校验和旧入口迁移说明统一收口，让发布链路更可回看、可验证。',
    highlights: ['发布说明', 'workflow', 'legacy entry'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮收紧了 GitHub Pages 发布校验链路，并把站内发布说明页补齐。',
      '核心变化是让发布成为可回看、可校验的一段工程流程，同时收敛旧入口语义。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m7-release-convergence.md'
  },
  {
    slug: 'dao-m6-seo-sharing',
    title: 'M6 开发笔记：让站点开始具备被搜索与被分享的基础能力',
    date: '2026-03-15',
    description: '补齐 canonical、OG、Twitter Card、robots、manifest 和 sitemap，让站点开始具备外部可见性基础设施。',
    highlights: ['SEO', '分享图', 'sitemap', 'robots'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'scroll-reading-progress-bar'],
    summary: [
      '这一轮补齐了站点级 SEO 与分享资产，让 build 产物开始具备外部可见性基础能力。',
      '核心变化是统一站点元信息、补静态 SEO 资产，并让 sitemap 稳定进入构建结果。'
    ],
    sourcePath: 'docs/blog/2026-03-15-vitepress-dao-m6-seo-sharing.md'
  },
  {
    slug: 'dao-m5-multi-dimensional-navigation',
    title: 'M5 开发笔记：让 metadata 真正长成站点导航',
    date: '2026-03-14',
    description: '把 tags、scenes 和 difficulty 从生成字段推进成可访问的站点导航结构。',
    highlights: ['多维导航', 'tags', 'scenes', 'difficulty'],
    relatedDemoIds: ['futuristic-3d-menu', 'scroll-reading-progress-bar', 'animation-js-loading-love'],
    summary: [
      '这一轮把标签、场景和难度从 metadata 字段推进成真正的浏览入口。',
      '核心变化是建立多维导航页，并让 demo 详情页也能回流到这些维度页。'
    ],
    sourcePath: 'docs/blog/2026-03-14-vitepress-dao-m5-multi-dimensional-navigation.md'
  },
  {
    slug: 'dao-m4-content-productization',
    title: 'M4 开发笔记：让展示站开始承载内容',
    date: '2026-03-14',
    description: '让开发笔记、专题发现和首页内容入口进入站点主路径，推动展示站向内容站演进。',
    highlights: ['journal', 'discover', '内容入口'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'gradient-background-gallery'],
    summary: [
      '这一轮让展示站开始同时承载 demo 与内容型页面。',
      '核心变化是建立开发笔记入口、专题发现入口和首页内容入口模块。'
    ],
    sourcePath: 'docs/blog/2026-03-14-vitepress-dao-m4-content-productization.md'
  },
  {
    slug: 'dao-m0-planning',
    title: 'M0 开发笔记：先把方法立住',
    date: '2026-03-14',
    description: '先把执行协议、业务流程和里程碑结构立住，让后续每轮开发都沿着同一条 Dao 链路推进。',
    highlights: ['执行协议', '业务流程', '里程碑基线'],
    relatedDemoIds: ['flex-layout-guide', 'animation-js-loading-love'],
    summary: [
      '这一轮先没有进入功能开发，而是先把治理基线立住。',
      '核心变化是把“规划、流程、设计、开发、自测、回写、提交”固定成统一节奏。'
    ],
    sourcePath: 'docs/blog/2026-03-14-vitepress-dao-m0-planning-note.md'
  },
  {
    slug: 'dao-m1-content-governance',
    title: 'M1 开发笔记：内容治理收口',
    date: '2026-03-14',
    description: '把 demo metadata、标题描述、标签场景和精选编排收口成稳定的内容治理机制。',
    highlights: ['metadata 分层', '内容质量基线', '生成校验'],
    relatedDemoIds: ['animation-js-loading-love', 'canvas-colorful-gallery', 'emoji-face'],
    summary: [
      '这一轮把展示站从“能生成”推进到“内容语义稳定、可持续维护”。',
      '核心动作是先定义质量标准，再把稳定规则回写到生成链路。'
    ],
    sourcePath: 'docs/blog/2026-03-14-vitepress-dao-m1-content-governance.md'
  },
  {
    slug: 'metadata-overrides',
    title: '阶段笔记：人工 metadata 覆盖层',
    date: '2026-03-12',
    description: '记录如何在自动扫描之外补一层人工覆盖，让标题、描述和 slug 更像内容，而不是文件名。',
    highlights: ['override 机制', 'slug 校对', '内容精修'],
    relatedDemoIds: ['emoji-face', 'faq-hover-menu', 'fireworks-background-switch'],
    summary: [
      '这一轮解决的是自动扫描链路下内容表达不稳定的问题。',
      '通过引入 override，关键 demo 开始具备更稳定的命名和描述。'
    ],
    sourcePath: 'docs/blog/2026-03-12-vitepress-metadata-overrides.md'
  },
  {
    slug: 'featured-curation',
    title: '阶段笔记：首页精选与封面策展',
    date: '2026-03-13',
    description: '记录首页如何从列表导航升级成 metadata 驱动的精选策展入口。',
    highlights: ['featured 编排', 'cover metadata', '封面资源'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'fireworks-background-switch'],
    summary: [
      '这一轮让首页不再只是分类目录，而开始具备内容入口和视觉策展能力。',
      '精选理由、优先级和封面资源都回到了 metadata 主链路。'
    ],
    sourcePath: 'docs/blog/2026-03-13-vitepress-featured-cover-assets.md'
  }
]

export const sceneNarratives = {
  '加载进度反馈': {
    description: '适合在等待态、异步加载和流程反馈里快速找到节奏明确的进度表现。',
    whenToUse: [
      '当页面需要告诉用户“正在处理，但还没结束”时优先从这里进入。',
      '当你需要区分轻量等待态和强提示进度条时，这个场景最适合作为第一批参考。'
    ],
    selectionTips: [
      '如果更偏情绪化等待态，优先看带角色感和趣味性的 loading 动画。',
      '如果更偏长文或页面进度反馈，优先看滚动驱动或顶部条形反馈。',
      '如果只想用最少 DOM 做轻量状态提示，优先看单元素 loading。'
    ]
  },
  '导航交互': {
    description: '适合在菜单、入口切换和导航强化场景里寻找更有辨识度的交互组织方式。',
    whenToUse: [
      '当一个页面不想继续使用普通列表导航，而是希望通过动效强化入口感时，可以从这里开始。',
      '当你想比较“轻量切换”和“空间感展示”两类导航手法时，这里最容易横向对比。'
    ],
    selectionTips: [
      '如果希望实现成本低、反馈清楚，先看基础 toggle 类菜单。',
      '如果更看重首屏氛围或品牌辨识度，再看 3D 或镜像风格菜单。',
      '如果内容层级较多，优先选能保留结构清晰度的导航样式。'
    ]
  },
  '图文卡片展示': {
    description: '适合在卡片入口、图文封面和内容列表中寻找 hover 与层次切换的参考。',
    whenToUse: [
      '当页面主结构由卡片承担信息入口时，可以先从这个场景挑案例。',
      '当你需要比较不同 hover 强度、遮罩方式和文案承载方式时，这里更容易找到相近解法。'
    ],
    selectionTips: [
      '如果只需要基础 hover 反馈，优先看结构简单的卡片示例。',
      '如果需要更强的情绪和视觉氛围，再看叠加动画和图像遮罩更重的案例。',
      '如果卡片还要承担封面职责，优先选择标题和摘要承载更清楚的样式。'
    ]
  },
  '阅读反馈': {
    description: '适合在长文、时间线和滚动驱动内容里寻找“读到哪里了”的反馈方式。',
    whenToUse: [
      '当页面内容高度较长，需要减轻用户阅读迷失感时，可以优先从这里进入。',
      '当你想把滚动行为转成内容反馈，而不是单纯页面位移时，这个场景很适合作为入口。'
    ],
    selectionTips: [
      '如果需求是最直观的阅读进度提示，先看顶部进度条类方案。',
      '如果更强调内容分段和叙事节奏，再看时间线或滚动驱动动画。',
      '如果页面滚动只是辅助反馈，选择更轻量的进度表现会更稳。'
    ]
  },
  '首屏氛围': {
    description: '适合在首页首屏、活动页头图和情绪化展示区寻找更有氛围感的视觉表达。',
    whenToUse: [
      '当页面需要先建立情绪和视觉记忆，再进入信息阅读时，优先看这个场景。',
      '当你想比较背景型动效和互动型氛围效果时，这里最容易找到不同方向的例子。'
    ],
    selectionTips: [
      '如果页面以背景烘托为主，优先看全屏背景和渐变氛围类案例。',
      '如果希望用户主动触发反馈，再看烟花或交互型视觉效果。',
      '如果页面还需要承载内容卡片，尽量选择不会过度抢占文字可读性的风格。'
    ]
  },
  '作品集列表': {
    description: '适合在作品集首页、案例集合页和封面列表中判断“列表入口怎样先把浏览节奏立住”。',
    whenToUse: [
      '当一个页面需要先承接多组作品或案例，再让用户决定进入哪一条时，可以从这里开始。',
      '当你希望封面列表既有预览感，又不想一开始就进入复杂卡片结构时，这个场景很适合先看。'
    ],
    selectionTips: [
      '如果更强调快速扫读，优先看列表结构和图文层次清楚的案例。',
      '如果还需要更强的品牌感或封面气质，再把它和首屏、导航类场景一起看。'
    ]
  },
  '图文悬停预览': {
    description: '适合在图文封面、案例缩略入口和 hover 预览里寻找更轻量的内容预览方式。',
    whenToUse: [
      '当页面需要先给用户一点内容感，再决定是否进入详情时，可以从这里开始。',
      '当你正在比较“只用静态缩略图”还是“加入悬停预览”两种入口方式时，这个场景最有帮助。'
    ],
    selectionTips: [
      '如果信息密度已经很高，优先选反馈轻一点的预览方式。',
      '如果图片本身就是内容重点，可以把预览强度适当拉高，但要先检查可读性。'
    ]
  },
  '成员展示': {
    description: '适合在团队成员、讲者介绍和人物集合入口里寻找更有层次的人物展示方式。',
    whenToUse: [
      '当页面需要同时展示多位人物，并且希望保留身份层级时，可以从这里进入。',
      '当你想比较“普通人物卡片”和“带展开感的人物入口”时，这个场景最适合作为参考。'
    ],
    selectionTips: [
      '如果成员数量多，优先看默认状态是否足够稳，不要先被展开动效吸引。',
      '如果人物是内容主角，优先选择头像、标题和辅助信息关系更清楚的结构。'
    ]
  },
  '人物卡片入口': {
    description: '适合在人物专题、讲者列表和角色入口中寻找“卡片既像入口又像内容摘要”的写法。',
    whenToUse: [
      '当每张卡片都需要同时承担人物识别和进入详情的双重职责时，可以从这里开始。',
      '当你希望入口既保留人物感，又不想立刻展开完整详情时，这个场景更有参考价值。'
    ],
    selectionTips: [
      '先判断卡片承担的是快速识别还是深度介绍，再决定信息密度。',
      '如果页面风格偏克制，优先保留层次关系，不必强行加入太多视觉装饰。'
    ]
  },
  '作品集导航': {
    description: '适合在作品集、专题集和多入口展示页中寻找“导航本身也承担展示”的组织方式。',
    whenToUse: [
      '当页面不只是让用户点击跳转，而是希望在导航层就建立内容印象时，可以从这里开始。',
      '当你想比较普通列表导航和更具展示感的作品集入口时，这个场景会很有帮助。'
    ],
    selectionTips: [
      '如果内容结构还不稳定，先用更清楚的导航骨架，再慢慢增加视觉层。',
      '如果展示和导航都很重要，优先选择能同时保留入口清晰度和预览感的布局。'
    ]
  },
  '大图预览入口': {
    description: '适合在大图展示、案例预览和封面切换场景中寻找“入口与预览并列”的组织方式。',
    whenToUse: [
      '当页面需要让用户快速扫过多个入口，并停留查看某一个重点预览时，可以从这里进入。',
      '当你正在做图库、专题页或视觉型目录页，这个场景很适合先看。'
    ],
    selectionTips: [
      '如果预览内容比入口更重要，优先保证主展示区的稳定性。',
      '如果入口项会很多，先确认布局在窄屏下是否还能保持切换效率。'
    ]
  },
  '图片浏览': {
    description: '适合在画廊、作品预览和大图切换场景里寻找更顺手的浏览节奏与预览结构。',
    whenToUse: [
      '当页面重点在于让用户持续浏览图片内容，而不是只做单次点击跳转时，可以从这里进入。',
      '当你想比较“轻量缩略图浏览”和“更沉浸的大图预览”两种方式时，这里更容易横向对比。'
    ],
    selectionTips: [
      '如果图片内容本身复杂，优先让浏览节奏清楚，再考虑是否增加装饰动效。',
      '如果需要承接到详情页，优先选择能保留上下文的浏览结构。'
    ]
  },
  '长文阅读': {
    description: '适合在教程、文档和长篇内容页中寻找“阅读过程如何被持续提示”的反馈方式。',
    whenToUse: [
      '当内容本身较长，用户容易失去阅读位置感时，可以先从这里开始。',
      '如果你正在做文档站、教程页或长篇文章，这个场景很适合优先看。'
    ],
    selectionTips: [
      '如果目标是降低阅读迷失感，优先看位置提示类反馈，而不是复杂动画。',
      '如果页面滚动只是辅助动作，尽量选择低打扰、持续存在的阅读提示。'
    ]
  },
  '页面滚动反馈': {
    description: '适合在滚动驱动页面、长屏内容和过渡式展示页里寻找更明确的滚动反馈。',
    whenToUse: [
      '当滚动本身就是页面体验的一部分，而不只是单纯位移时，可以从这里开始。',
      '当你希望用户知道自己滚到了哪里，或者当前切换处于什么阶段时，这个场景最有帮助。'
    ],
    selectionTips: [
      '如果页面内容以阅读为主，优先用轻量进度反馈。',
      '如果页面内容更偏展示或叙事，再考虑加入更强的滚动驱动动效。'
    ]
  },
  '动画基础教学': {
    description: '适合在基础动画教学、组件动效入门和轻量练习中寻找最容易拆解的案例。',
    whenToUse: [
      '当你需要先把某种动效原理讲清楚，而不是直接做复杂组件时，可以从这里进入。',
      '当团队或个人正处在“先练基础手感”的阶段，这个场景很适合作为起点。'
    ],
    selectionTips: [
      '优先选择单个原理足够清楚的案例，不要一开始就看叠了很多效果的示例。',
      '如果目标是迁移到业务组件，先确认哪一层反馈最值得保留。'
    ]
  },
  '变形效果速查': {
    description: '适合在 transform 选型和基础空间反馈判断中快速对比不同变形方式。',
    whenToUse: [
      '当你已经知道要加一点空间感或反馈，但还没想清楚具体用哪种变形时，可以从这里开始。',
      '当你需要和团队快速讨论某种 transform 会带来什么视觉结果时，这个场景很适合作为参考。'
    ],
    selectionTips: [
      '先决定你需要的是方向感、缩放感还是倾斜感，再选对应案例。',
      '如果组件里还有文字和图标，优先选对可读性影响更小的变形方式。'
    ]
  }
}

export const discoverSpotlights = [
  {
    slug: 'hero-brand-experience',
    title: '首屏与品牌感建立',
    description: '适合在首页首屏、作品集首页和品牌型着陆页里建立第一眼的氛围、导航感和视觉记忆。',
    cover: {
      label: 'Spotlight',
      title: 'Hero & Brand',
      accent: '首屏氛围 · 导航组织 · 作品集入口',
      palette: ['#020617', '#4338ca', '#22d3ee']
    },
    scenes: ['首屏氛围', '导航交互', '作品集导航', '作品集列表'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'animation-js-menu-circular-toggle'],
    whyStart: [
      '如果你的页面首先要解决“第一眼有没有气质和方向”，这条路线最适合先进入。',
      '它把首屏氛围、导航交互和作品集入口放在同一条线里，更容易判断视觉和结构该怎么配合。'
    ]
  },
  {
    slug: 'card-content-showcase',
    title: '卡片与内容展示入口',
    description: '适合在内容卡片、人物入口、图文悬停和图片浏览中寻找更完整的内容展示路线。',
    cover: {
      label: 'Spotlight',
      title: 'Card Showcase',
      accent: '图文卡片 · 人物入口 · 大图预览',
      palette: ['#111827', '#db2777', '#fb7185']
    },
    scenes: ['图文卡片展示', '图文悬停预览', '人物卡片入口', '大图预览入口', '图片浏览', '卡片背景样式'],
    relatedDemoIds: ['other-card-change-layout', 'canvas-colorful-gallery', 'emoji-face'],
    whyStart: [
      '如果你的页面主要依赖卡片承担内容入口，这条路线更适合作为第一批参考集合。',
      '它能同时回答“卡片长什么样”和“卡片如何承接内容流转”这两个问题。'
    ]
  },
  {
    slug: 'reading-progress-feedback',
    title: '阅读与进度反馈路线',
    description: '适合在长文、页面滚动、加载反馈和逐步资源进入中寻找更完整的节奏型反馈方案。',
    cover: {
      label: 'Spotlight',
      title: 'Reading Flow',
      accent: '阅读反馈 · 滚动进度 · 加载节奏',
      palette: ['#082f49', '#0ea5e9', '#67e8f9']
    },
    scenes: ['阅读反馈', '长文阅读', '页面滚动反馈', '加载进度反馈', '逐步资源加载', '资源批量加载', '轮播预加载'],
    relatedDemoIds: ['scroll-reading-progress-bar', 'animation-js-loading-love', 'single-element-loading'],
    whyStart: [
      '如果你正在做长内容、滚动反馈或等待态，这条路线能比单看某一个 scene 更快建立全局判断。',
      '它把阅读、滚动和加载反馈放在一起，适合比较不同节奏型提示到底该怎么选。'
    ]
  },
  {
    slug: 'lightweight-ui-practice',
    title: '轻量交互与基础练习路线',
    description: '适合在基础动画教学、轻量组件反馈和小型 UI 演示中快速找到容易上手的练习入口。',
    cover: {
      label: 'Spotlight',
      title: 'Light UI Practice',
      accent: '基础练习 · 轻量反馈 · 小型组件',
      palette: ['#1f2937', '#ea580c', '#f59e0b']
    },
    scenes: ['动画基础教学', '变形效果速查', '按钮配色', '凭证生成动效', '聊天表情面板', '成员展示', '账单展示'],
    relatedDemoIds: ['flex-layout-guide', 'css-transform-gallery', 'emoji-face'],
    whyStart: [
      '如果你更关心低成本实现和快速练习，这条路线能把轻量案例先聚在一起。',
      '它适合作为入门改造路线，先建立结构和反馈感，再决定是否继续上复杂视觉。'
    ]
  },
  {
    slug: 'portfolio-preview-entry',
    title: '作品集与人物预览入口',
    description: '适合在作品集列表、人物入口和大图预览之间寻找更完整的内容进入路线。',
    cover: {
      label: 'Spotlight',
      title: 'Portfolio Preview',
      accent: '作品集列表 · 人物入口 · 预览切换',
      palette: ['#0f172a', '#0f766e', '#7dd3fc']
    },
    scenes: ['作品集列表', '图文悬停预览', '成员展示', '人物卡片入口', '作品集导航', '大图预览入口', '图片浏览'],
    relatedDemoIds: ['milestone-gallery-1', 'stacked-profile-gallery', 'split-panel-gallery', 'canvas-colorful-gallery'],
    whyStart: [
      '如果你的页面在解决“用户先怎么浏览，再怎么点进具体内容”，这条路线更适合作为起点。',
      '它把作品集列表、人物入口和大图预览放在同一条线里，更容易判断入口层和预览层该如何分工。'
    ]
  },
  {
    slug: 'gallery-loading-flow',
    title: '图片浏览与资源进入节奏',
    description: '适合在图片浏览、预加载和资源逐步进入中寻找更顺手的浏览反馈路线。',
    cover: {
      label: 'Spotlight',
      title: 'Gallery Loading',
      accent: '图片浏览 · 预加载 · 进入节奏',
      palette: ['#111827', '#1d4ed8', '#93c5fd']
    },
    scenes: ['图片浏览', '逐步资源加载', '资源批量加载', '轮播预加载', '加载进度反馈'],
    relatedDemoIds: ['canvas-colorful-gallery', 'image-preload-gallery', 'ordered-image-preload-gallery', 'qq-emoji-preload-panel', 'single-element-loading'],
    whyStart: [
      '如果你的页面需要同时解决“图片怎么浏览”和“资源怎么自然进入”，这条路线会更有帮助。',
      '它把图片浏览和预加载放在一起，适合比较等待反馈、预览切换和进入节奏之间该怎么平衡。'
    ]
  }
]

export const quickStartGuides = [
  {
    slug: 'hero-first-screen',
    title: '我想先做首页首屏',
    description: '适合先判断首屏氛围、导航组织和第一眼品牌感该如何配合。',
    prompt: '如果你现在在做首页、landing page 或作品集首屏，可以先从这条起步线开始。',
    audiences: ['前端实现', '视觉探索'],
    stages: ['验证期', '打磨期'],
    followUpSlugs: ['card-list-and-preview', 'reading-and-loading-feedback'],
    followUpTypes: ['补内容入口', '补反馈节奏'],
    deferTypes: ['补局部动效'],
    followUpReason: [
      '首屏方向跑通之后，下一步通常要继续把卡片入口、内容预览或列表结构补稳。',
      '如果首页已经开始承接长内容或异步资源，再继续补阅读与加载反馈会更完整。'
    ],
    deferReason: [
      '在首屏入口和整体氛围都还没站稳前，先不要急着补局部动效，否则很容易把注意力打散。'
    ],
    tradeoffNotes: [
      {
        preferType: '补内容入口',
        deferType: '补局部动效',
        reason: '当首屏入口和主视觉关系还没站稳前，先补内容入口会比先补局部动效更容易守住第一眼判断。'
      },
      {
        preferType: '补反馈节奏',
        deferType: '补局部动效',
        reason: '如果首页已经开始承接真实内容或异步资源，先补反馈节奏会比先补局部动效更能降低用户的不确定感。'
      }
    ],
    overdoWarnings: [
      {
        type: '补首屏氛围',
        reason: '这一条线最容易做过头的，是在首屏里堆太多视觉元素，结果反而把第一条入口和品牌判断一起压掉。'
      },
      {
        type: '补局部动效',
        reason: '如果在入口结构还没稳之前就叠太多局部动效，很容易把页面做成“有气氛但不好进”。'
      }
    ],
    fitFor: ['品牌首页', 'Landing Page', '作品集首屏'],
    costLabel: '中等投入',
    firstWin: '当你能在第一屏同时保留清楚入口和稳定氛围感时，这条线就已经开始成立。',
    skipIf: [
      '如果当前页面更像功能后台或纯信息检索页，可以先不上这条线。',
      '如果项目时间非常紧，先保证入口结构清楚，再决定是否补更强的首屏氛围。'
    ],
    firstActions: [
      '先决定页面是要先给情绪冲击，还是先给清楚入口，这会直接影响你该先看首屏氛围还是导航交互。',
      '先挑一条路线里的代表案例做最小验证，不要一开始就把首屏背景、导航和卡片入口一起做满。'
    ],
    chooseTips: [
      '如果页面先强调品牌气质，优先看首屏氛围更强的案例。',
      '如果页面先强调进入效率，优先看导航组织更清楚的案例。'
    ],
    avoidPitfalls: [
      '不要为了首屏气氛牺牲首条入口的可读性和点击路径。',
      '不要在第一轮同时叠太多视觉元素，先验证最关键的一层印象是否成立。'
    ],
    spotlightSlugs: ['hero-brand-experience'],
    sceneLabels: ['首屏氛围', '导航交互'],
    relatedDemoIds: ['animation-js-loading-love', 'futuristic-3d-menu', 'animation-js-menu-circular-toggle']
  },
  {
    slug: 'card-list-and-preview',
    title: '我想先做卡片列表与内容预览',
    description: '适合先判断卡片入口、作品集列表、人物卡片和预览切换应该如何分层。',
    prompt: '如果你的页面主要依赖卡片、列表和封面预览来承接内容，这条起步线最适合作为第一批参考。',
    audiences: ['前端实现', '内容策划'],
    stages: ['验证期', '信息成型期'],
    followUpSlugs: ['reading-and-loading-feedback', 'hero-first-screen'],
    followUpTypes: ['补反馈节奏', '补首屏氛围'],
    deferTypes: ['补局部动效'],
    followUpReason: [
      '列表结构稳定之后，下一步通常要继续补阅读反馈、滚动反馈或资源进入节奏。',
      '如果列表页同时承担品牌入口职责，再回头补首屏氛围与导航组织会更完整。'
    ],
    deferReason: [
      '当列表密度、摘要层级和图片比例还没稳定之前，先不要急着补局部动效，否则很容易让浏览节奏变乱。'
    ],
    tradeoffNotes: [
      {
        preferType: '补反馈节奏',
        deferType: '补局部动效',
        reason: '当列表浏览节奏还在建立时，先补反馈节奏会比先补局部动效更能帮助用户保持阅读连续性。'
      },
      {
        preferType: '补首屏氛围',
        deferType: '补局部动效',
        reason: '如果列表页同时承担品牌入口职责，先补首屏氛围会比先堆局部动效更容易把整体层次拉开。'
      }
    ],
    overdoWarnings: [
      {
        type: '补局部动效',
        reason: '这一条线最容易做过头的，是在卡片密度、摘要长度和图片比例还没稳时就先堆 hover 与遮罩反馈。'
      },
      {
        type: '补反馈节奏',
        reason: '如果列表本身的浏览节奏还没清楚，就先做很重的反馈提示，也容易让阅读路径变碎。'
      }
    ],
    fitFor: ['内容列表页', '案例集', '人物展示页'],
    costLabel: '低到中等投入',
    firstWin: '当卡片信息密度稳定、预览切换不再打断浏览节奏时，这条线就有了第一版结果。',
    skipIf: [
      '如果当前页面核心不是浏览，而是一次性完成任务流程，可以先不上这条线。',
      '如果内容本身非常少，先用更直接的图文排版可能会更有效。'
    ],
    firstActions: [
      '先判断页面主要在解决“列表浏览”还是“内容预览”，这会直接决定你该先看卡片结构还是预览切换。',
      '先选一条最接近真实内容密度的案例，把标题、摘要和图片比例跑通。'
    ],
    chooseTips: [
      '如果入口项很多，优先选择浏览效率高的列表结构。',
      '如果封面和人物本身就是内容重点，优先选择预览感更强的案例。'
    ],
    avoidPitfalls: [
      '不要在真实内容密度还没跑通前，就先堆叠过重的 hover 和遮罩效果。',
      '不要忽略图片比例、摘要长度和卡片高度的一致性，这会直接破坏整体浏览节奏。'
    ],
    spotlightSlugs: ['card-content-showcase', 'portfolio-preview-entry'],
    sceneLabels: ['图文卡片展示', '作品集列表', '图文悬停预览', '成员展示', '人物卡片入口'],
    relatedDemoIds: ['other-card-change-layout', 'milestone-gallery-1', 'stacked-profile-gallery', 'split-panel-gallery']
  },
  {
    slug: 'reading-and-loading-feedback',
    title: '我想先做阅读与加载反馈',
    description: '适合先比较阅读进度、滚动反馈、加载节奏和资源进入提示。',
    prompt: '如果你正在做文档、教程或长内容页面，这条起步线能更快帮你判断反馈强度和节奏。',
    audiences: ['前端实现', '内容体验'],
    stages: ['打磨期', '上线前'],
    followUpSlugs: ['card-list-and-preview', 'lightweight-animation-practice'],
    followUpTypes: ['补内容入口', '补局部动效'],
    deferTypes: ['补首屏氛围'],
    followUpReason: [
      '反馈节奏跑通之后，下一步常常要回到内容入口本身，把卡片、摘要和预览层级一起整理稳定。',
      '如果你还想低成本补一点局部动效，再接轻量练手案例会更容易控制改造范围。'
    ],
    deferReason: [
      '如果当前核心问题是阅读反馈或等待提示，先不要回头做过重的首屏氛围，否则会把注意力从反馈问题上拉走。'
    ],
    tradeoffNotes: [
      {
        preferType: '补内容入口',
        deferType: '补首屏氛围',
        reason: '当反馈问题已经暴露出来时，先回到内容入口整理结构，会比先补首屏氛围更容易把问题收口。'
      },
      {
        preferType: '补局部动效',
        deferType: '补首屏氛围',
        reason: '如果只是想低成本增加一点反馈，先补局部动效会比重做首屏氛围更容易控制改造范围。'
      }
    ],
    overdoWarnings: [
      {
        type: '补反馈节奏',
        reason: '这一条线最容易做过头的，是同时把阅读反馈和加载反馈都做得很强，最后形成两套竞争提示。'
      },
      {
        type: '补首屏氛围',
        reason: '如果当前重点是反馈问题，却回头做过重的首屏氛围，很容易把真正的问题藏掉。'
      }
    ],
    fitFor: ['文档页', '教程页', '长内容页'],
    costLabel: '低投入',
    firstWin: '当用户能明显减少阅读迷失感，或等待时不再不确定当前状态，这条线就有了价值。',
    skipIf: [
      '如果页面本身很短，先不上复杂反馈会更轻。',
      '如果当前并没有真实等待过程，先不要预设很重的进度系统。'
    ],
    firstActions: [
      '先确认页面核心问题是阅读迷失感，还是等待焦虑感，再决定先看进度反馈还是加载提示。',
      '先挑一条最轻量的反馈方式做验证，确认用户真的需要额外提示。'
    ],
    chooseTips: [
      '如果页面以长文阅读为主，优先选持续存在、低打扰的反馈。',
      '如果页面资源进入节奏更明显，优先选能解释加载阶段的反馈方式。'
    ],
    avoidPitfalls: [
      '不要把阅读反馈和加载反馈同时做得很强，这会让页面出现两套竞争提示。',
      '不要在没有真实长内容或真实等待状态之前就预设复杂进度系统。'
    ],
    spotlightSlugs: ['reading-progress-feedback', 'gallery-loading-flow'],
    sceneLabels: ['阅读反馈', '长文阅读', '页面滚动反馈', '加载进度反馈', '图片浏览'],
    relatedDemoIds: ['scroll-reading-progress-bar', 'single-element-loading', 'image-preload-gallery', 'ordered-image-preload-gallery']
  },
  {
    slug: 'lightweight-animation-practice',
    title: '我想先找低成本练习案例',
    description: '适合先从轻量动画、基础 transform 和小型组件反馈开始练手。',
    prompt: '如果你现在更关心先做出一个稳定的小案例，而不是立刻进入复杂视觉，这条起步线更合适。',
    audiences: ['前端练手', '组件试验'],
    stages: ['验证期'],
    followUpSlugs: ['hero-first-screen', 'card-list-and-preview'],
    followUpTypes: ['补首屏氛围', '补内容入口'],
    deferTypes: ['补反馈节奏'],
    followUpReason: [
      '单点动效练熟之后，下一步通常会回到真实页面入口，比如首屏氛围或导航组织。',
      '如果你更想把练手结果接进真实内容页面，再继续看卡片列表与预览会更贴近业务结构。'
    ],
    deferReason: [
      '如果你现在还只是在做低成本练手，先不要急着补阅读或加载反馈，因为这类反馈更依赖真实内容和等待过程。'
    ],
    tradeoffNotes: [
      {
        preferType: '补首屏氛围',
        deferType: '补反馈节奏',
        reason: '当练手结果准备接回真实页面时，先补首屏氛围会比先补反馈节奏更容易建立整体方向。'
      },
      {
        preferType: '补内容入口',
        deferType: '补反馈节奏',
        reason: '如果你想把练手成果接进卡片或列表页面，先补内容入口会比先补反馈节奏更贴近真实业务结构。'
      }
    ],
    overdoWarnings: [
      {
        type: '补局部动效',
        reason: '这一条线最容易做过头的，是在还没弄清楚反馈服务什么内容之前，就不断叠视觉效果。'
      },
      {
        type: '补反馈节奏',
        reason: '如果当前还只是轻量练手，却过早补复杂反馈系统，很容易把练习范围做得失控。'
      }
    ],
    fitFor: ['动效练手', '组件试验', '低成本改造'],
    costLabel: '低投入',
    firstWin: '当你能稳定复现一个清楚的小反馈，并说清楚它服务的内容对象时，这条线就已经有效。',
    skipIf: [
      '如果当前项目需要强品牌视觉或复杂叙事，这条线可能只是前置练习，不是最终方向。',
      '如果你已经明确要做高复杂度视觉，就不要在这里停太久。'
    ],
    firstActions: [
      '先挑一个只包含单个动效原理的案例，把核心反馈拆清楚。',
      '先用最小结构把动效跑通，再决定是否继续加视觉层或业务语义。'
    ],
    chooseTips: [
      '如果目标是练习基础手感，优先选 transform 和基础 hover 这类更容易拆解的案例。',
      '如果目标是快速迁移到业务组件，优先选结构简单、改造成本低的案例。'
    ],
    avoidPitfalls: [
      '不要一开始就选择视觉很强但原理混杂的案例，那样反而不利于建立稳定手感。',
      '不要为了练习动效牺牲结构清晰度，最好始终保留“这段反馈是服务什么内容”的判断。'
    ],
    spotlightSlugs: ['lightweight-ui-practice'],
    sceneLabels: ['动画基础教学', '变形效果速查', '按钮配色'],
    relatedDemoIds: ['css-transform-gallery', 'gradient-background-gallery', 'emoji-face', 'flex-layout-guide']
  }
]
