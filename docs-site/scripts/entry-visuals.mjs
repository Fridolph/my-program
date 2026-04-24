function slugifyTerm(value = '') {
  const normalized = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (normalized) {
    return normalized
  }

  return Array.from(value)
    .map(char => `u${char.codePointAt(0).toString(16)}`)
    .join('-')
}

export const categoryEntryVisuals = {
  'css-animation': {
    label: 'Animation',
    title: 'Motion Library',
    palette: ['#0f172a', '#2563eb', '#22d3ee'],
    accent: '关键帧 · 节奏 · 入场反馈'
  },
  'hover-transition': {
    label: 'Hover',
    title: 'Interactive Layers',
    palette: ['#111827', '#7c3aed', '#ec4899'],
    accent: '悬停反馈 · 卡片层次 · 导航切换'
  },
  canvas: {
    label: 'Canvas',
    title: 'Atmosphere Engine',
    palette: ['#0b1120', '#0f766e', '#38bdf8'],
    accent: '氛围画面 · 取色 · 图形动画'
  },
  jquery: {
    label: 'Legacy Interaction',
    title: 'Classic Effects',
    palette: ['#172554', '#1d4ed8', '#f59e0b'],
    accent: '历史交互 · 旧项目复用 · 快速检索'
  },
  layout: {
    label: 'Layout',
    title: 'Structure First',
    palette: ['#111827', '#334155', '#94a3b8'],
    accent: '排版骨架 · 页面结构 · 基础练习'
  },
  other: {
    label: 'Mixed Cases',
    title: 'Pattern Archive',
    palette: ['#1f2937', '#ea580c', '#fb7185'],
    accent: '混合案例 · 交互样式 · 长尾参考'
  }
}

export const sceneEntryVisuals = {
  '首屏氛围': {
    label: 'Hero Mood',
    title: 'Landing Atmosphere',
    palette: ['#020617', '#7c3aed', '#22d3ee'],
    accent: '首屏气质 · 品牌氛围 · 视觉记忆'
  },
  '导航交互': {
    label: 'Navigation',
    title: 'Entry Motion',
    palette: ['#0f172a', '#2563eb', '#38bdf8'],
    accent: '入口组织 · 空间动线 · 切换反馈'
  },
  '图文卡片展示': {
    label: 'Cards',
    title: 'Content Showcase',
    palette: ['#111827', '#db2777', '#fb7185'],
    accent: '图文封面 · 内容入口 · 层次切换'
  },
  '加载进度反馈': {
    label: 'Loading',
    title: 'Waiting Signals',
    palette: ['#3f0d12', '#a71d31', '#ff9a8b'],
    accent: '等待态 · 节奏提示 · 轻量反馈'
  },
  '阅读反馈': {
    label: 'Reading',
    title: 'Scroll Guidance',
    palette: ['#082f49', '#0ea5e9', '#67e8f9'],
    accent: '阅读进度 · 滚动定位 · 长文反馈'
  },
  '长文阅读': {
    label: 'Longform',
    title: 'Reading Flow',
    palette: ['#172554', '#4338ca', '#a78bfa'],
    accent: '长内容 · 时间线 · 节奏引导'
  },
  '页面滚动反馈': {
    label: 'Scroll',
    title: 'Page Progress',
    palette: ['#0f172a', '#0f766e', '#5eead4'],
    accent: '滚动反馈 · 进度感知 · 页面导航'
  }
}

export function getCategoryEntryVisual(categoryId) {
  return categoryEntryVisuals[categoryId] ?? {
    label: 'Category',
    title: 'Content Entry',
    palette: ['#0f172a', '#334155', '#64748b'],
    accent: '内容分类 · 结构入口 · 浏览起点'
  }
}

export function getSceneEntryVisual(sceneLabel) {
  const visual = sceneEntryVisuals[sceneLabel]
  return {
    slug: slugifyTerm(sceneLabel),
    ...(visual ?? {
      label: 'Scene',
      title: sceneLabel,
      palette: ['#0f172a', '#475569', '#94a3b8'],
      accent: '场景入口 · 浏览线索 · 案例聚合'
    })
  }
}

export { slugifyTerm }
