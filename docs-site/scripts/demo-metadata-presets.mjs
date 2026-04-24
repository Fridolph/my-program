export const demoMetadataDirectoryPresets = {
  'animation-js/progress-demo': {
    defaults: {
      tags: ['CSS3', 'Progress', 'JavaScript'],
      difficulty: 'beginner'
    },
    entries: {
      'demo1.html': {
        title: '定时器进度条 · 基础版',
        description: '基础进度条动画，演示定时驱动的宽度变化与视觉反馈。'
      },
      'demo2.html': {
        title: '定时器进度条 · 变体二',
        description: '定时器进度条的第二种实现方式，适合对比动画节奏与样式写法。'
      },
      'demo3.html': {
        title: '定时器进度条 · 变体三',
        description: '通过第三种进度条样式演示相同交互需求下的不同视觉表达。'
      },
      'demo4.html': {
        title: 'CSS3 进度条 · 手写实现',
        description: '从零实现简单的 CSS3 进度条，适合作为动画入门示例。',
        tags: ['CSS3', 'Progress', 'Animation']
      },
      'demo5.html': {
        title: '顶部吸附进度条',
        description: '将进度条固定在页面顶部，适合模拟阅读进度或加载反馈。',
        tags: ['CSS3', 'Progress', 'Sticky']
      }
    }
  },
  'hover-transition/hover卡片2': {
    defaults: {
      tags: ['Card', 'Caption', 'Hover'],
      difficulty: 'beginner'
    },
    entries: {
      'index.html': {
        slug: 'caption-hover-demo-1',
        title: 'Caption Hover 卡片 · 1',
        description: 'Caption Hover Effects 系列第一张演示卡片。'
      },
      'index2.html': {
        slug: 'caption-hover-demo-2',
        title: 'Caption Hover 卡片 · 2',
        description: 'Caption Hover Effects 系列第二张演示卡片。'
      },
      'index3.html': {
        slug: 'caption-hover-demo-3',
        title: 'Caption Hover 卡片 · 3',
        description: 'Caption Hover Effects 系列第三张演示卡片。'
      },
      'index4.html': {
        slug: 'caption-hover-demo-4',
        title: 'Caption Hover 卡片 · 4',
        description: 'Caption Hover Effects 系列第四张演示卡片。'
      },
      'index5.html': {
        slug: 'caption-hover-demo-5',
        title: 'Caption Hover 卡片 · 5',
        description: 'Caption Hover Effects 系列第五张演示卡片。'
      },
      'index6.html': {
        slug: 'caption-hover-demo-6',
        title: 'Caption Hover 卡片 · 6',
        description: 'Caption Hover Effects 系列第六张演示卡片。'
      },
      'index7.html': {
        slug: 'caption-hover-demo-7',
        title: 'Caption Hover 卡片 · 7',
        description: 'Caption Hover Effects 系列第七张演示卡片。'
      }
    }
  },
  'hover-transition/里程图片': {
    defaults: {
      tags: ['Gallery', 'Image', 'Hover'],
      difficulty: 'intermediate'
    },
    entries: {
      'index.html': {
        slug: 'milestone-gallery-1',
        title: '里程图片展示 · 1',
        description: '里程图片系列的第一种展示方式，适合参考图文列表动效。',
        scenes: ['作品集列表', '图文悬停预览']
      },
      'index2.html': {
        slug: 'stacked-profile-gallery',
        title: '层叠式人物画廊',
        description: '层叠展开的人物图像画廊，适合参考纵向列表 hover 展开与图文层次切换。',
        tags: ['Gallery', 'Profile', 'Hover'],
        scenes: ['成员展示', '人物卡片入口']
      },
      'index3.html': {
        slug: 'split-panel-gallery',
        title: '分栏式人物画廊',
        description: '分栏式人物画廊效果，适合参考并列菜单与大图预览的组合布局。',
        tags: ['Gallery', 'Panel', 'Hover'],
        scenes: ['作品集导航', '大图预览入口']
      }
    }
  },
  'jquery/image-preloading': {
    entries: {
      'index.html': {
        slug: 'image-preload-gallery',
        title: '图片预加载画廊',
        description: '基础图片预加载示例，适合学习加载进度反馈与上一张下一张切换。',
        tags: ['Image', 'Preload', 'Gallery'],
        difficulty: 'beginner',
        scenes: ['图片浏览', '加载进度反馈']
      },
      'index2.html': {
        slug: 'qq-emoji-preload-panel',
        title: 'QQ 表情预加载面板',
        description: '无序预加载 QQ 表情资源，适合作为表情面板或资源批量加载参考。',
        tags: ['Emoji', 'Preload', 'Panel'],
        difficulty: 'intermediate',
        scenes: ['聊天表情面板', '资源批量加载']
      },
      'index3.html': {
        slug: 'ordered-image-preload-gallery',
        title: '顺序图片预加载画廊',
        description: '按顺序预加载图片并切换展示，适合对比不同图片加载策略。',
        tags: ['Image', 'Preload', 'Sequence'],
        difficulty: 'beginner',
        scenes: ['轮播预加载', '逐步资源加载']
      }
    }
  },
  'layouts/flex': {
    defaults: {
      tags: ['Flex', 'Layout'],
      difficulty: 'beginner'
    },
    entries: {
      '01_yufa.html': {
        slug: 'flex-layout-guide',
        title: 'Flex 语法示例',
        description: 'Flex 布局语法演示页，适合作为基础属性学习索引。',
        tags: ['Flex', 'Layout', 'Guide'],
        featured: {
          priority: 74,
          reason: '适合作为布局类 demo 的导航入口，帮助快速进入基础排版主题。'
        },
        cover: {
          type: 'gradient',
          label: 'Layout Guide',
          title: 'Flex Basics',
          palette: ['#0f172a', '#334155', '#38bdf8']
        }
      },
      '02_demo.html': {
        title: '骰子布局 · 1 到 3 点',
        description: '使用 Flex 实现 1 到 3 点骰子排布，适合作为对齐练习。',
        tags: ['Flex', 'Layout', 'Dice']
      },
      '03_demo.html': {
        title: '骰子布局 · 多点版',
        description: '多个骰子点位布局练习，适合学习更复杂的 Flex 排版。',
        tags: ['Flex', 'Layout', 'Dice']
      },
      'flex.html': {
        title: 'Flex 布局总览',
        description: '汇总常见 Flex 布局语法和排版示例，适合用作速查页。',
        tags: ['Flex', 'Layout', 'Reference']
      }
    }
  },
  'layouts/base-layout': {
    defaults: {
      tags: ['Layout', 'CSS'],
      difficulty: 'beginner'
    }
  }
}
