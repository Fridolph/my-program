export const demoMetadataOverrides = {
  'animation-js/menu-circular-toggle/index.html': {
    title: '圆形展开菜单',
    description: '使用纯 CSS3 实现的圆形菜单展开效果，适合学习 transform 与过渡组合。',
    tags: ['CSS3', 'Menu', 'Transform'],
    scenes: ['导航交互'],
    difficulty: 'intermediate',
    whyRead: [
      '它把“菜单如何展开”这件事做成了非常直观的空间运动，适合作为导航动效入门案例。',
      '圆形排布的结构非常清楚，便于拆开观察 transform、延迟和层次关系是怎么配合的。'
    ],
    implementationNotes: [
      '先看触发按钮和菜单项之间的层级关系，理解谁负责状态切换、谁负责位置变化。',
      '再看菜单项如何沿圆周展开，这一部分最适合拿来练习 transform-origin 和位移组合。'
    ],
    adaptationTips: [
      '如果要迁移到业务项目，优先保留展开节奏，减少不必要的装饰层。',
      '如果导航项较多，记得控制按钮间距，避免移动端点击区域重叠。'
    ],
    featured: {
      priority: 92,
      reason: '造型辨识度高，适合作为首页展示交互型菜单的经典入口。'
    },
    cover: {
      type: 'gradient',
      label: 'CSS Menu',
      title: 'Radial Motion',
      palette: ['#0f172a', '#2563eb', '#22d3ee']
    }
  },
  'animation-js/scroll-timeline/index.html': {
    description: '时间线滚动动画示例，适合参考分段式内容展示与轴线排布。',
    tags: ['Timeline', 'Scroll', 'Animation'],
    scenes: ['阅读反馈'],
    difficulty: 'intermediate'
  },
  'animation-js/fullscreen-background-animation/index.html': {
    title: '全屏背景动画',
    description: '全屏背景动画示例，适合用于活动页或着陆页首屏氛围营造。',
    tags: ['Background', 'Fullscreen', 'CSS3'],
    scenes: ['首屏氛围'],
    difficulty: 'intermediate'
  },
  'animation-js/slide-animation/index.html': {
    description: '全屏栅格背景滑动动画，适合学习重复图形与节奏型动画组合。',
    tags: ['Grid', 'Animation', 'CSS3'],
    difficulty: 'intermediate'
  },
  'animation-js/chopper-animation/index.html': {
    description: '通过纯前端绘制与动画拼装角色形象，适合练习复杂图形组合。',
    tags: ['Illustration', 'CSS3', 'Animation'],
    difficulty: 'advanced'
  },
  'animation-js/text-animation/index.html': {
    title: '文字动画特效',
    description: '文字动画效果合集，适合参考标题入场与强调型文本表现。',
    tags: ['Typography', 'Animation', 'CSS3'],
    difficulty: 'beginner'
  },
  'animation-js/login-focus-line-animation/index.html': {
    description: '登录框焦点线条动画，适合参考表单输入态与聚焦反馈设计。',
    tags: ['Form', 'Input', 'Animation'],
    difficulty: 'beginner'
  },
  'animation-js/loading-love/index.html': {
    title: '爱心 Loading 动画',
    description: '爱心主题的 Loading 动画，适合作为节日或趣味场景的等待反馈。',
    tags: ['Loading', 'CSS3', 'Animation'],
    scenes: ['加载进度反馈', '首屏氛围'],
    difficulty: 'beginner',
    whyRead: [
      '这个案例把等待态做得很轻松，很适合用来判断“情绪化反馈”是否适合你的页面。',
      '它结构很小，但辨识度很高，非常适合作为 loading 类案例的第一条入口。'
    ],
    implementationNotes: [
      '先看爱心主体由哪些基础形状和动画节奏组成，再决定哪些部分需要保留。',
      '如果你只想借用等待态节奏，可以先抽离关键帧和缩放/透明度变化，不必整套照搬。'
    ],
    whenToUse: [
      '适合在节日页、轻松氛围产品页或需要弱提示 loading 的场景里做等待反馈。',
      '如果页面只需要一个轻量、带情绪的占位反馈，它比复杂进度条更容易落地。'
    ],
    adaptationTips: [
      '如果业务语气偏正式，建议保留节奏感，弱化爱心符号本身。',
      '上线前注意对比度和连续播放时长，避免等待态过于抢占注意力。'
    ],
    featured: {
      priority: 98,
      reason: '主题鲜明、轻量直观，适合做首页第一屏的情绪入口。'
    },
    cover: {
      type: 'gradient',
      label: 'Loading',
      title: 'Warm Heart',
      palette: ['#3f0d12', '#a71d31', '#ff9a8b']
    }
  },
  'animation-js/menu-toggle-animation/index.html': {
    title: 'CSS3 切换菜单',
    description: '菜单按钮切换动画示例，适合学习展开收起的动效组织。',
    tags: ['Menu', 'Toggle', 'CSS3'],
    scenes: ['导航交互'],
    difficulty: 'beginner'
  },
  'animation-js/icon-toggle-animation/index.html': {
    title: '图标切换动画',
    description: '通过图标形态切换表达状态变化，适合作为按钮反馈参考。',
    tags: ['Icon', 'Toggle', 'Animation'],
    difficulty: 'beginner'
  },
  'hover-transition/自制表情/index.html': {
    slug: 'emoji-face',
    description: '纯 CSS 绘制的表情符号效果，适合学习简单图形拼装与 hover 反馈。',
    tags: ['CSS3', 'Emoji', 'Hover'],
    difficulty: 'beginner',
    featured: {
      priority: 86,
      reason: '图形简洁、风格轻松，适合作为 CSS 创意类示例入口。'
    },
    cover: {
      type: 'gradient',
      label: 'CSS Emoji',
      title: 'Playful Faces',
      palette: ['#f59e0b', '#f97316', '#fb7185']
    }
  },
  'hover-transition/悬停菜单/index.html': {
    slug: 'faq-hover-menu',
    title: '问答式悬停菜单',
    description: '用悬停切换问答内容的交互菜单，适合做信息分层展示。',
    tags: ['Menu', 'Hover', 'Interaction'],
    difficulty: 'intermediate'
  },
  'hover-transition/tooltip/index.html': {
    title: 'Tooltip 提示层示例',
    description: '功能较完整的 Tooltip 演示，适合作为提示层定位与样式参考。',
    tags: ['Tooltip', 'Hover', 'CSS3'],
    difficulty: 'intermediate'
  },
  'hover-transition/linear-gradient/index.html': {
    slug: 'gradient-background-gallery',
    title: '渐变背景样式集',
    description: '多组 CSS3 渐变背景示例，适合参考卡片、区块和按钮的配色过渡。',
    tags: ['Gradient', 'Background', 'CSS3'],
    difficulty: 'beginner',
    scenes: ['首屏氛围', '按钮配色', '卡片背景样式'],
    whyRead: [
      '它适合拿来快速比较不同渐变方向、色带密度和氛围强度，不需要先写复杂结构就能建立视觉判断。',
      '如果你正在做首屏、卡片背景或按钮态，这类案例很适合作为“先看配色情绪，再决定结构”的入口。'
    ],
    implementationNotes: [
      '先按用途拆分渐变：背景铺陈、按钮强化和卡片装饰，这样更容易判断哪类写法能直接迁移。',
      '迁移时优先保留颜色关系和过渡方向，再根据业务容器尺寸调整 stop 与透明度。'
    ],
    whenToUse: [
      '适合 landing page 首屏、内容卡片封面、按钮强调态或需要弱装饰层的运营区块。',
      '当你只想先验证页面氛围，而不是立刻进入复杂动效时，这类案例最省成本。'
    ],
    adaptationTips: [
      '先确认文字承载区是否需要单独加遮罩，避免渐变直接影响可读性。',
      '如果项目已有品牌色，优先迁移色相关系，不要直接照搬饱和度很高的示例组合。'
    ]
  },
  'hover-transition/transform-effect/index.html': {
    slug: 'css-transform-gallery',
    title: 'CSS Transform 效果一览',
    description: '集中展示 rotate、scale 和 skew 等常见变形效果，适合作为 transform 速查示例。',
    tags: ['Transform', 'CSS3', 'Reference'],
    difficulty: 'beginner',
    scenes: ['动画基础教学', '变形效果速查'],
    whyRead: [
      '它把最常见的 transform 手法集中放在一个入口里，很适合做基础动画教学时的第一张速查表。',
      '相比直接看复杂组件，这类案例更容易帮助你判断“当前反馈问题到底该用 rotate、scale 还是 skew”。'
    ],
    implementationNotes: [
      '先把每种变形单独观察，再留意它们在 hover 和过渡里组合时会产生什么视觉差异。',
      '如果要迁移到业务组件，先确定是强调方向感、空间感还是点击反馈，再选对应变形方式。'
    ],
    whenToUse: [
      '适合动画教学、小型交互练习、图标按钮反馈和卡片 hover 微动效的前期选型。',
      '当你需要快速说明某类变形会带来什么视觉结果时，它也适合作为团队讨论样例。'
    ],
    adaptationTips: [
      '不要一次把多种 transform 叠太满，先用一种主变化验证交互是否成立。',
      '如果容器里还有文字或图标，记得检查 transform-origin，避免内容重心偏移得太突兀。'
    ]
  },
  'hover-transition/自制loading/index.html': {
    slug: 'single-element-loading',
    description: '单元素实现的 Loading 动画，适合练习伪元素与关键帧组合。',
    tags: ['Loading', 'CSS3', 'Pseudo Elements'],
    scenes: ['加载进度反馈'],
    difficulty: 'intermediate',
    whyRead: [
      '它用极少的 DOM 把等待态做出来，非常适合拿来练习“轻量反馈是不是足够”的判断。',
      '如果你正在做文档站、内容页或小型组件库，这种单元素写法往往比复杂插画 loading 更容易落地。'
    ],
    implementationNotes: [
      '先看主体元素与伪元素各自负责哪一层动画，再判断哪些关键帧可以直接抽到业务组件里。',
      '如果只需要节奏反馈，可以先保留缩放、透明度或位移中的一类，不必完整照搬。'
    ],
    whenToUse: [
      '适合局部异步加载、轻量数据刷新、按钮提交等待态和内容块占位反馈。',
      '当页面只需要告诉用户“还在处理中”，但不希望加载态抢走太多注意力时尤其合适。'
    ],
    adaptationTips: [
      '先测试在深浅两种背景下的可见度，避免单元素 loading 一换主题就丢失识别度。',
      '如果和真实骨架屏同时存在，尽量二选一，避免页面里出现两个不同层级的等待信号。'
    ]
  },
  'hover-transition/竖menubar/index.html': {
    slug: 'mirror-menu',
    title: '镜像导航菜单',
    description: '竖向镜像菜单效果，适合学习列表 hover 反馈与透视表现。',
    tags: ['Menu', 'Hover', 'Navigation'],
    scenes: ['导航交互'],
    difficulty: 'intermediate',
    whyRead: [
      '它把普通竖向菜单做出了镜像和纵深感，适合判断导航入口是否需要更强的展示性。',
      '如果你在做作品集、概念页或品牌型导航，这个案例能帮助你快速对比“基础列表”和“展示型入口”的差别。'
    ],
    implementationNotes: [
      '先拆出列表结构和 hover 位移，再看镜像反射或透视层是如何叠加上去的。',
      '迁移时可以先只保留纵向展开与选中反馈，等信息层次稳定后再决定是否加入镜像效果。'
    ],
    whenToUse: [
      '适合作品集导航、品牌概念页入口、活动页侧边导航和需要强调入口辨识度的列表区。',
      '当导航本身也承担展示任务，而不仅仅是跳转功能时，这类效果会更有价值。'
    ],
    adaptationTips: [
      '镜像和透视越强，越要优先检查文字可读性与移动端点击区域。',
      '如果页面整体设计更克制，可以只借用节奏和层次，不保留完整反射视觉。'
    ]
  },
  'hover-transition/里程图片/index.html': {
    slug: 'milestone-gallery-1',
    title: '里程图片展示 · 1',
    description: '里程图片系列的第一种展示方式，适合参考图文列表动效。',
    tags: ['Gallery', 'Image', 'Hover'],
    scenes: ['作品集列表', '图文悬停预览'],
    difficulty: 'intermediate',
    whyRead: [
      '它更像是“作品列表如何先把浏览节奏立住”的基础案例，适合用来观察图文入口的第一层反馈。',
      '如果你正在整理作品集、案例集或内容封面列表，这个版本很适合先看信息块与图片悬停之间的配合。'
    ],
    implementationNotes: [
      '先看列表项的基础布局，再观察 hover 时图片、文字和遮罩分别承担了什么角色。',
      '如果只是想借列表切换节奏，可以优先抽离悬停时的层次变化，而不是整套视觉一起搬。'
    ],
    whenToUse: [
      '适合作品集列表、图文目录页、案例封面墙和需要快速预览图片内容的入口区。',
      '当页面希望先给用户轻量预览，再决定是否进入详情时，这类结构最容易落地。'
    ],
    adaptationTips: [
      '先确认图片比例是否稳定，不然悬停切换时很容易出现列表高度抖动。',
      '如果真实文案更长，建议提前预留摘要高度，避免 hover 后内容密度失衡。'
    ]
  },
  'hover-transition/里程图片/index2.html': {
    slug: 'stacked-profile-gallery',
    title: '层叠式人物画廊',
    description: '层叠展开的人物图像画廊，适合参考纵向列表 hover 展开与图文层次切换。',
    tags: ['Gallery', 'Profile', 'Hover'],
    scenes: ['成员展示', '人物卡片入口'],
    difficulty: 'intermediate',
    whyRead: [
      '这个版本把人物入口做成层叠展开，非常适合观察“列表如何在有限空间里承接更多身份信息”。',
      '如果你正在做团队成员、嘉宾介绍或人物卡片入口，它能帮助你比较层叠结构是否比普通卡片更有记忆点。'
    ],
    implementationNotes: [
      '先看默认堆叠状态如何控制层级，再看 hover 后图片和文本是如何逐步展开的。',
      '迁移时可以先保留纵向展开关系，等信息密度跑通后，再决定是否保留完整层叠视觉。'
    ],
    whenToUse: [
      '适合成员展示、人物介绍、讲者列表或需要在小空间内承载多张人物卡的页面。',
      '当你希望入口既像列表，又带一点浏览式展开体验时，这类结构很有参考价值。'
    ],
    adaptationTips: [
      '人物类入口很依赖图片裁切，先统一头像比例和焦点区域，再迁移动效。',
      '如果卡片上要承载职位、标签等更多信息，记得先验证展开后的内容是否会互相遮挡。'
    ]
  },
  'hover-transition/里程图片/index3.html': {
    slug: 'split-panel-gallery',
    title: '分栏式人物画廊',
    description: '分栏式人物画廊效果，适合参考并列菜单与大图预览的组合布局。',
    tags: ['Gallery', 'Panel', 'Hover'],
    scenes: ['作品集导航', '大图预览入口'],
    difficulty: 'intermediate',
    whyRead: [
      '它同时处理了“列表怎么排”和“预览怎么切”两个问题，适合作为作品集导航类页面的中间态参考。',
      '如果你在做大图预览或专题入口，这类分栏写法很适合帮助你判断导航与展示区如何分工。'
    ],
    implementationNotes: [
      '先拆成并列导航区和主预览区两部分，分别看状态切换与大图展示的关系。',
      '如果只需要基本结构，可以先保留分栏骨架和 hover 切换，再按业务语气重做视觉层。'
    ],
    whenToUse: [
      '适合作品集导航、人物专题入口、大图预览区和需要左侧列表右侧展示的内容模块。',
      '当页面需要用户快速扫过多个入口，再停留到某一个重点内容时，这类布局会比较顺手。'
    ],
    adaptationTips: [
      '分栏布局对宽度更敏感，迁移到平板和移动端前要先确认是否需要改成纵向堆叠。',
      '如果预览区要承载真实内容，而不只是图片，记得提前验证切换时的文本重排成本。'
    ]
  },
  'hover-transition/card-op/index.html': {
    description: '卡片切换动效，适合参考内容卡 hover 态与层次切换。',
    tags: ['Card', 'Hover', 'Transition'],
    scenes: ['图文卡片展示'],
    difficulty: 'beginner'
  },
  'hover-transition/card-hover-anime/index.html': {
    description: '交通主题卡片 hover 动效，适合学习图片卡片的遮罩与动效叠加。',
    tags: ['Card', 'Hover', 'Animation'],
    scenes: ['图文卡片展示'],
    difficulty: 'intermediate'
  },
  'hover-transition/科技感炫酷menu/index.html': {
    slug: 'futuristic-3d-menu',
    description: '科技感 3D 菜单效果，适合参考带空间感的导航动效。',
    tags: ['Menu', '3D', 'Hover'],
    scenes: ['导航交互', '首屏氛围'],
    difficulty: 'advanced',
    whyRead: [
      '它很适合拿来判断“导航是否需要更强的品牌情绪和空间感”。',
      '这个案例不仅能看 3D 效果本身，也能看内容入口如何被包装成视觉展示。'
    ],
    implementationNotes: [
      '先拆分出菜单结构、3D 透视和 hover 反馈三层，不要一次把所有视觉细节一起迁移。',
      '如果只需要空间感，可以先抽透视和层次位移，再决定是否保留高对比配色。'
    ],
    whenToUse: [
      '适合用于品牌感较强的 landing page、作品集首页或概念型导航区。',
      '当页面首屏希望先给用户情绪冲击，再进入具体内容时，这类案例很有参考价值。'
    ],
    adaptationTips: [
      '空间感强的效果更容易吃掉可读性，迁移时要优先检查文字和交互命中区域。',
      '如果项目的设计语言偏克制，可以保留结构和动线，弱化颜色与透视幅度。'
    ],
    featured: {
      priority: 95,
      reason: '空间感和视觉冲击都很强，适合作为首页的高辨识度 showcase。'
    },
    cover: {
      type: 'gradient',
      label: '3D Hover',
      title: 'Future Menu',
      palette: ['#020617', '#312e81', '#22d3ee']
    }
  },
  'hover-transition/悬停卡片/index.html': {
    slug: 'ai-hover-card',
    title: 'AI 主题悬停卡片',
    description: 'AI 主题卡片 hover 动效，适合作为封面卡或内容入口视觉参考。',
    tags: ['Card', 'Hover', 'Visual'],
    scenes: ['图文卡片展示'],
    difficulty: 'beginner'
  },
  'hover-transition/buttons-box-shadow/index.html': {
    title: '按钮阴影交互动效',
    description: '通过 box-shadow 变化强化按钮 hover 态，适合做操作反馈参考。',
    tags: ['Button', 'Shadow', 'Hover'],
    difficulty: 'beginner'
  },
  'hover-transition/card-hover/index.html': {
    title: '卡片 Hover 展示',
    description: '信息卡片 hover 展示效果，适合学习图文卡片的动画组织。',
    tags: ['Card', 'Hover', 'Showcase'],
    scenes: ['图文卡片展示'],
    difficulty: 'beginner'
  },
  'hover-transition/transform-perspective/index.html': {
    title: '3D 视频透视展示',
    description: 'CSS3 3D 透视视频展示效果，适合作为空间感卡片与封面参考。',
    tags: ['3D', 'Perspective', 'Transform'],
    difficulty: 'advanced'
  },
  'hover-transition/css3-count-showtime/index.html': {
    title: '数字翻转计数展示',
    description: 'CSS3 计数展示效果，适合作为数据面板或统计卡片的视觉参考。',
    tags: ['Counter', 'Animation', 'CSS3'],
    difficulty: 'intermediate'
  },
  'hover-transition/iconHover效果/index.html': {
    slug: 'icon-hover-effects',
    title: '图标 Hover 动效',
    description: '图标 hover 动效合集，适合参考按钮与社交入口的反馈设计。',
    tags: ['Icon', 'Hover', 'Animation'],
    difficulty: 'beginner'
  },
  'hover-transition/text-hover/index.html': {
    title: '文字 Hover 效果集',
    description: '文字 hover 效果集合，适合做标题强调与链接状态设计。',
    tags: ['Text', 'Hover', 'Typography'],
    difficulty: 'beginner'
  },
  'canvas/colorful-gallery/index.html': {
    title: '图片取色氛围画廊',
    description: '根据图片主色生成背景氛围，适合学习图片取色与视觉呼应。',
    tags: ['Canvas', 'Color', 'Gallery'],
    scenes: ['首屏氛围', '图片浏览'],
    difficulty: 'advanced',
    whyRead: [
      '它把图片内容和页面氛围绑在了一起，特别适合参考“视觉如何围绕主内容变化”。',
      '如果你在做画廊、作品集或视觉展示页，这是非常适合借来做气氛层的案例。'
    ],
    implementationNotes: [
      '先看图片切换和背景取色之间的关系，再判断哪一层值得抽出来复用。',
      '如果业务项目不需要 Canvas 主导，也可以只借“主图驱动背景”的思路，用 CSS 或图片处理实现。'
    ],
    whenToUse: [
      '适合用于作品集、图片浏览、视觉导览页或需要首屏氛围跟随内容变化的页面。',
      '当你不满足于静态画廊，而希望背景也参与内容表达时，可以优先看这个案例。'
    ],
    adaptationTips: [
      '真实项目里要注意图片体积和切换频率，避免背景变化拖慢首屏感受。',
      '如果内容文字较多，记得控制背景亮度和饱和度，保证前景可读性。'
    ],
    featured: {
      priority: 90,
      reason: '能直接体现 Canvas 与图片取色能力，适合作为视觉氛围型案例入口。'
    },
    cover: {
      type: 'gradient',
      label: 'Canvas Color',
      title: 'Chromatic Mood',
      palette: ['#1d4ed8', '#7c3aed', '#f97316']
    }
  },
  'canvas/change-background/index.html': {
    slug: 'fireworks-background-switch',
    title: '烟花触发背景切换',
    description: '点击触发烟花并切换背景图，适合作为互动型视觉演示。',
    tags: ['Canvas', 'Fireworks', 'Interaction'],
    scenes: ['首屏氛围'],
    difficulty: 'advanced',
    featured: {
      priority: 94,
      reason: '交互反馈明确，最适合作为首页中的互动型视觉样例。'
    },
    cover: {
      type: 'gradient',
      label: 'Canvas Interaction',
      title: 'Fireworks Tap',
      palette: ['#111827', '#7c3aed', '#ec4899']
    }
  },
  'canvas/logo-animation/index.html': {
    title: 'Logo 动画演示',
    description: 'Canvas Logo 动画效果，适合作为品牌开场或加载动画参考。',
    tags: ['Canvas', 'Logo', 'Animation'],
    difficulty: 'advanced'
  },
  'canvas/walking-dog/index.html': {
    description: 'Walking Dog 动画演示，适合参考逐帧精灵与步行动作实现。',
    tags: ['Canvas', 'Sprite', 'Animation'],
    difficulty: 'advanced'
  },
  'layouts/base-layout/01base.html': {
    title: '基本网格布局',
    description: '基础网格布局示例，适合作为多栏结构与间距组织练习。',
    tags: ['Layout', 'Grid', 'CSS'],
    difficulty: 'beginner'
  },
  'layouts/base-layout/02percent.html': {
    title: '百分比布局',
    description: '使用百分比实现的基础布局示例，适合理解流式宽度分配。',
    tags: ['Layout', 'Percentage', 'CSS'],
    difficulty: 'beginner'
  },
  'layouts/base-layout/03grail.html': {
    title: '圣杯布局',
    description: '经典圣杯布局示例，适合作为多栏布局的历史参考。',
    tags: ['Layout', 'Holy Grail', 'CSS'],
    difficulty: 'beginner'
  },
  'layouts/base-layout/04input.html': {
    title: '输入框布局',
    description: '围绕输入框、按钮与对齐关系编排的基础布局示例。',
    tags: ['Layout', 'Form', 'CSS'],
    difficulty: 'beginner'
  },
  'layouts/base-layout/05suspend.html': {
    title: '悬挂式布局',
    description: '悬挂式布局练习，适合理解浮动和层次关系。',
    tags: ['Layout', 'Float', 'CSS'],
    difficulty: 'beginner'
  },
  'layouts/base-layout/06sticky-footer.html': {
    title: 'Sticky Footer 布局',
    description: '固定底栏布局示例，适合参考页面主体与底部贴边关系。',
    tags: ['Layout', 'Footer', 'CSS'],
    difficulty: 'beginner'
  },
  'layouts/base-layout/07fluid.html': {
    title: '流式布局',
    description: '基础流式布局示例，适合理解自适应宽度与容器关系。',
    tags: ['Layout', 'Fluid', 'CSS'],
    difficulty: 'beginner'
  },
  'css/background/1.html': {
    slug: 'background-pattern-1',
    title: '背景纹理效果',
    description: '背景纹理实验示例，可作为页面氛围层或装饰层参考。',
    tags: ['Background', 'Pattern', 'CSS'],
    difficulty: 'beginner'
  },
  'jquery/card-auto-generate/index.html': {
    slug: 'receipt-card-printer',
    title: '票据卡片生成动画',
    description: '模拟票据或卡片自动打印生成的过渡动画，适合作为账单或凭证展示参考。',
    tags: ['Card', 'Receipt', 'Animation'],
    difficulty: 'intermediate',
    scenes: ['账单展示', '凭证生成动效']
  },
  'other/card-change-layout/index.html': {
    title: '卡片详情切换布局',
    description: '卡片点击后切换布局与详情视图，适合作为列表转详情交互参考。',
    tags: ['Card', 'Layout', 'Interaction'],
    difficulty: 'intermediate',
    whyRead: [
      '它直接回答了“列表入口如何过渡到详情视图”这个真实业务问题，比只看 hover 卡片更接近内容型产品页面。',
      '如果你正在做文章列表、案例库或商品卡片，这个案例很适合帮助你判断信息流转是否自然。'
    ],
    implementationNotes: [
      '先看卡片列表态和详情态分别有哪些固定结构，再观察切换时哪些元素在重排、哪些元素只是补充显示。',
      '迁移时优先保留“入口到详情”的状态关系，不要先被示例里的具体样式牵着走。'
    ],
    whenToUse: [
      '适合案例列表转详情、内容卡片展开、商品卡片进入详情和轻量面板切换场景。',
      '当你希望用户不离开当前页面就看见更多内容时，这类布局很有参考价值。'
    ],
    adaptationTips: [
      '先确认详情态的信息量是否适合留在当前页面，否则可能应该跳到独立详情页。',
      '如果列表项很多，记得提前处理滚动位置和返回状态，不然切换后用户容易迷失。'
    ],
    featured: {
      priority: 70,
      reason: '从列表到详情的切换关系明确，适合作为内容流转型卡片交互示例。'
    },
    cover: {
      type: 'gradient',
      label: 'Interaction',
      title: 'Card Switch',
      palette: ['#134e4a', '#0f766e', '#99f6e4']
    }
  },
  'other/radio-buttons/index.html': {
    title: '单选按钮组件',
    description: '单选按钮样式与交互示例，适合作为表单控件视觉参考。',
    tags: ['Form', 'Radio', 'Component'],
    difficulty: 'beginner'
  },
  'other/pull-to-refresh/index.html': {
    title: '移动端下拉刷新',
    description: '移动端下拉刷新交互演示，适合参考触摸反馈与状态切换。',
    tags: ['Mobile', 'Refresh', 'Interaction'],
    difficulty: 'intermediate'
  },
  'other/scroll-progress-bar/index.html': {
    slug: 'scroll-reading-progress-bar',
    title: '滚动阅读进度条',
    description: '利用页面滚动进度驱动顶部进度条，适合作为长文阅读或滚动反馈参考。',
    tags: ['Scroll', 'Progress', 'Reading'],
    difficulty: 'beginner',
    scenes: ['阅读反馈', '长文阅读', '页面滚动反馈'],
    whyRead: [
      '它解决的是非常真实的内容问题：用户在长页面里需要知道自己已经读到哪里。',
      '结构简单、反馈明确，很适合作为“滚动行为转成 UI 提示”的基础案例。'
    ],
    implementationNotes: [
      '先看滚动进度是如何映射到顶部条宽度的，这部分最适合直接迁移。',
      '如果项目里已经有阅读容器或文章布局，通常只需要替换进度计算和样式层。'
    ],
    whenToUse: [
      '适合长文阅读、教程页、文档页或需要滚动反馈的移动端详情页。',
      '当页面滚动行为本身就是内容理解的一部分时，进度条会非常有帮助。'
    ],
    adaptationTips: [
      '如果页面结构不是单列长文，先确认进度提示是否真的能帮助用户，而不是制造额外噪音。',
      '在移动端要注意顶部条高度和颜色，避免压住系统状态栏或导航栏。'
    ]
  }
}
