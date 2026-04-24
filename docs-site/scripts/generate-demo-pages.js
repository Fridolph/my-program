import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createSidebar, getDemoNeighbors, getFeaturedDemos, getRelatedDemos, getSceneEntries, groupDemosByCategory, scanDemos } from './demo-registry.mjs'
import { getSceneEntryVisual } from './entry-visuals.mjs'
import { discoverSpotlights, journalEntries, quickStartGuides, sceneNarratives } from './site-content.mjs'
import { generateCoverAssets } from './generate-cover-assets.mjs'
import { buildShareCardSvg, getDefaultOgSvg, normalizeRoutePath, siteMetadata, toAbsoluteUrl } from './site-seo.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '../..')
const docsSiteDir = path.join(rootDir, 'docs-site')
const demosDir = path.join(docsSiteDir, 'demos')
const generatedDir = path.join(docsSiteDir, '.vitepress/generated')
const publicDir = path.join(docsSiteDir, 'public')
const generatedOgDir = path.join(publicDir, 'og/generated')

function escapeYamlString(str = '') {
  const escaped = str.replace(/"/g, '\\"')
  return /[:\[\]&]/.test(escaped) ? `"${escaped}"` : escaped
}

function escapeHtml(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function xmlEscape(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

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

const quickStartAudienceMeta = {
  '前端实现': {
    slug: 'frontend-implementation',
    description: '更适合已经准备动手搭页面、搭交互，并希望先确认实现顺序和入口结构的同学。'
  },
  '视觉探索': {
    slug: 'visual-exploration',
    description: '更适合先判断氛围、品牌感和第一眼视觉层次，再决定如何收进真实页面结构。'
  },
  '内容策划': {
    slug: 'content-planning',
    description: '更适合需要先排清楚卡片信息层级、预览策略和内容组织方式的场景。'
  },
  '内容体验': {
    slug: 'content-experience',
    description: '更适合已经进入阅读体验、等待反馈和信息节奏打磨阶段的页面。'
  },
  '前端练手': {
    slug: 'frontend-practice',
    description: '更适合先做低成本练手案例，用最小反馈验证动效原理和交互手感。'
  },
  '组件试验': {
    slug: 'component-experiment',
    description: '更适合先把一个局部组件做稳定，再决定是否继续扩成更完整页面。'
  }
}

const quickStartStageMeta = {
  '验证期': {
    slug: 'validation',
    description: '先验证方向是否成立，优先追求最小可判断结果，而不是一次做满。'
  },
  '信息成型期': {
    slug: 'content-shaping',
    description: '页面结构已经出现雏形，更需要把卡片、摘要和预览层级整理稳定。'
  },
  '打磨期': {
    slug: 'polish',
    description: '主结构已经可用，当前更适合补反馈、首屏氛围和细节节奏。'
  },
  '上线前': {
    slug: 'pre-launch',
    description: '更适合回看加载、阅读提示和节奏说明，减少用户上线前的不确定感。'
  }
}

const quickStartFollowUpTypeMeta = {
  '补内容入口': {
    slug: 'content-entry',
    description: '更适合先把卡片、摘要、预览和列表层级补稳，再继续扩展页面内容入口。'
  },
  '补反馈节奏': {
    slug: 'feedback-flow',
    description: '更适合先补阅读反馈、滚动提示和资源进入节奏，减少用户浏览时的不确定感。'
  },
  '补首屏氛围': {
    slug: 'hero-atmosphere',
    description: '更适合回到首页首屏、导航组织和第一眼品牌感，把整体氛围层继续补强。'
  },
  '补局部动效': {
    slug: 'micro-motion',
    description: '更适合先用低成本动效补一点局部反馈，再决定是否继续扩成更完整的视觉层。'
  }
}

function createQuickStartMetaEntry(label, metaMap, fallbackDescription) {
  const meta = metaMap[label] ?? {
    slug: slugifyTerm(label),
    description: fallbackDescription
  }

  return {
    label,
    slug: meta.slug,
    description: meta.description,
    quickStartSlugs: new Set()
  }
}

function registerQuickStartMetaEntry(groupedMap, label, metaMap, quickStart, fallbackDescription) {
  if (!groupedMap.has(label)) {
    groupedMap.set(label, createQuickStartMetaEntry(label, metaMap, fallbackDescription))
  }

  groupedMap.get(label).quickStartSlugs.add(quickStart.slug)
}

function finalizeQuickStartMetaEntries(groupedMap) {
  return Array.from(groupedMap.values())
    .map(entry => ({
      label: entry.label,
      slug: entry.slug,
      description: entry.description,
      count: entry.quickStartSlugs.size
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN'))
}

function formatListLabels(items = [], limit = 2) {
  const labels = items
    .slice(0, limit)
    .map(item => {
      if (typeof item === 'string') {
        return item
      }

      return item?.label ?? item?.title ?? ''
    })
    .filter(Boolean)

  return labels.join(' / ')
}

function registerQuickStartTypeAggregate(groupedMap, type, reason) {
  const meta = quickStartFollowUpTypeMeta[type] ?? {
    slug: slugifyTerm(type),
    description: `适合按“${type}”继续回看 quick start 的推进判断。`
  }

  if (!groupedMap.has(type)) {
    groupedMap.set(type, {
      label: type,
      slug: meta.slug,
      description: meta.description,
      count: 0,
      sampleReason: reason
    })
  }

  const entry = groupedMap.get(type)
  entry.count += 1
  entry.sampleReason ??= reason
}

function resolveQuickStartTypeMeta(type = '') {
  const meta = quickStartFollowUpTypeMeta[type] ?? {
    slug: slugifyTerm(type),
    description: `适合按“${type}”继续回看 quick start 的推进判断。`
  }

  return {
    label: type,
    slug: meta.slug,
    description: meta.description
  }
}

function normalizeQuickStartTypeWarning(warning) {
  if (!warning?.type) {
    return null
  }

  const meta = resolveQuickStartTypeMeta(warning.type)

  return {
    type: warning.type,
    typeSlug: meta.slug,
    typeDescription: meta.description,
    reason: warning.reason ?? `当前最容易在“${warning.type}”这一步做过头。`
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function resetGeneratedMarkdown() {
  fs.rmSync(demosDir, { recursive: true, force: true })
  ensureDir(demosDir)
  ensureDir(generatedDir)
  ensureDir(publicDir)
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, content)
}

function buildSiteRoutes(
  groupedCategories,
  demos,
  tagEntries,
  sceneEntries,
  difficultyEntries,
  quickStartEntries = [],
  quickStartAudienceEntries = [],
  quickStartStageEntries = [],
  quickStartFollowUpTypeEntries = []
) {
  const staticRoutes = [
    '/',
    '/guide/progress',
    '/guide/roadmap',
    '/guide/release-status',
    '/guide/dao-core-theory',
    '/guide/dao-commit-spec',
    '/discover/',
    '/discover/quick-start/',
    '/discover/quick-start/follow-up/',
    '/discover/quick-start/roles/',
    '/discover/quick-start/stages/',
    '/discover/spotlights/',
    '/explore/',
    '/explore/tags/',
    '/explore/scenes/',
    '/explore/difficulty/',
    '/journal/'
  ]

  const categoryRoutes = groupedCategories.map(category => `/demos/${category.id}/`)
  const demoRoutes = demos.map(demo => `/demos/${demo.categoryId}/${demo.id}`)
  const journalRoutes = journalEntries.map(entry => `/journal/${entry.slug}`)
  const quickStartRoutes = quickStartEntries.map(entry => `/discover/quick-start/${entry.slug}`)
  const quickStartAudienceRoutes = quickStartAudienceEntries.map(entry => `/discover/quick-start/roles/${entry.slug}`)
  const quickStartStageRoutes = quickStartStageEntries.map(entry => `/discover/quick-start/stages/${entry.slug}`)
  const quickStartFollowUpTypeRoutes = quickStartFollowUpTypeEntries.map(entry => `/discover/quick-start/follow-up/${entry.slug}`)
  const spotlightRoutes = discoverSpotlights.map(entry => `/discover/spotlights/${entry.slug}`)
  const tagRoutes = tagEntries.map(entry => `/explore/tags/${entry.slug}`)
  const sceneRoutes = sceneEntries.map(entry => `/explore/scenes/${entry.slug}`)
  const difficultyRoutes = difficultyEntries.map(entry => `/explore/difficulty/${entry.slug}`)

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...demoRoutes,
    ...journalRoutes,
    ...quickStartRoutes,
    ...quickStartAudienceRoutes,
    ...quickStartStageRoutes,
    ...quickStartFollowUpTypeRoutes,
    ...spotlightRoutes,
    ...tagRoutes,
    ...sceneRoutes,
    ...difficultyRoutes
  ]
}

function buildOgAssetPath(route = '/') {
  const normalized = normalizeRoutePath(route)

  if (normalized === '/') {
    return '/og/generated/home.svg'
  }

  const name = normalized
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter(Boolean)
    .join('--')

  return `/og/generated/${name}.svg`
}

function getSeoPalette(kind = 'default') {
  const palettes = {
    default: ['#0F172A', '#102A43', '#111827'],
    guide: ['#172554', '#1D4ED8', '#0F172A'],
    journal: ['#1E293B', '#0F766E', '#111827'],
    discover: ['#312E81', '#1D4ED8', '#0F172A'],
    explore: ['#1F2937', '#0369A1', '#0F172A'],
    category: ['#1F2937', '#7C3AED', '#111827'],
    demo: ['#0F172A', '#0F766E', '#111827']
  }

  return palettes[kind] ?? palettes.default
}

function createSeoSpec({
  route,
  title,
  description,
  eyebrow,
  meta,
  accent,
  palette
}) {
  return {
    route: normalizeRoutePath(route),
    assetPath: buildOgAssetPath(route),
    title,
    description,
    eyebrow,
    meta,
    accent,
    palette
  }
}

function generateRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${siteMetadata.siteUrl}/sitemap.xml
`
}

function generateManifest() {
  return JSON.stringify({
    name: siteMetadata.title,
    short_name: 'MyProgram',
    description: siteMetadata.description,
    start_url: `${siteMetadata.repoBase}/`,
    scope: `${siteMetadata.repoBase}/`,
    display: 'standalone',
    background_color: '#07111f',
    theme_color: siteMetadata.themeColor,
    icons: [
      {
        src: `${siteMetadata.repoBase}${siteMetadata.defaultOgImage}`,
        sizes: '1200x630',
        type: 'image/svg+xml',
        purpose: 'any'
      }
    ]
  }, null, 2)
}

function generateSitemapXml(routes) {
  const now = new Date().toISOString()
  const items = routes.map(route => `  <url>
    <loc>${xmlEscape(toAbsoluteUrl(route))}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`
}

function writeSeoAssets(routes) {
  writeFile(path.join(publicDir, 'robots.txt'), generateRobotsTxt())
  writeFile(path.join(publicDir, 'manifest.webmanifest'), generateManifest())
  writeFile(path.join(publicDir, 'og/site-default.svg'), getDefaultOgSvg())
  writeFile(path.join(publicDir, 'sitemap.xml'), generateSitemapXml(routes))
}

function writePageSeoAssets(specs = []) {
  fs.rmSync(generatedOgDir, { recursive: true, force: true })
  ensureDir(generatedOgDir)

  const pageOgImages = {}

  for (const spec of specs) {
    const relativeAssetPath = spec.assetPath.replace(/^\//, '')
    const absolutePath = path.join(publicDir, relativeAssetPath)
    writeFile(absolutePath, buildShareCardSvg({
      eyebrow: spec.eyebrow,
      title: spec.title,
      description: spec.description,
      meta: spec.meta,
      accent: spec.accent,
      palette: spec.palette
    }))
    pageOgImages[spec.route] = spec.assetPath
  }

  const mapFile = `export const pageOgImages = ${JSON.stringify(pageOgImages, null, 2)}\n`
  writeFile(path.join(generatedDir, 'page-seo.mjs'), mapFile)
}

function renderDifficultyLabel(value) {
  const labels = {
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级'
  }

  return labels[value] || '中级'
}

function buildPageSeoSpecs(
  groupedCategories,
  demos,
  tagEntries,
  sceneEntries,
  difficultyEntries,
  spotlightEntries = [],
  quickStartEntries = [],
  quickStartAudienceEntries = [],
  quickStartStageEntries = [],
  quickStartFollowUpTypeEntries = []
) {
  const featuredDemos = getFeaturedDemos(demos, 3)
  const topTags = tagEntries.slice(0, 3).map(entry => entry.label).join(' · ')
  const topScenes = sceneEntries.slice(0, 3).map(entry => entry.label).join(' · ')
  const staticSpecs = [
    createSeoSpec({
      route: '/',
      title: 'My Program Demo Collection',
      description: '从 demo、开发笔记到多维导航的前端灵感站。',
      eyebrow: '首页',
      meta: 'Demo Collection',
      accent: featuredDemos.map(demo => demo.title).join(' · ') || '动画 · 交互 · 内容 · 导航 · 分享',
      palette: getSeoPalette('default')
    }),
    createSeoSpec({
      route: '/guide/progress',
      title: '项目进度',
      description: '回看仓库从历史 demo 静态集合演进到 VitePress 在线文档站的当前进展。',
      eyebrow: '项目指南',
      meta: '进度总览',
      accent: '重构进度 · 已完成能力 · 当前缺口',
      palette: getSeoPalette('guide')
    }),
    createSeoSpec({
      route: '/guide/roadmap',
      title: '里程碑规划',
      description: '按 Dao 节奏继续推进展示站重构，逐步完成内容、导航、发布与传播能力。',
      eyebrow: '项目指南',
      meta: '里程碑路线图',
      accent: '治理基线 · 内容治理 · 导航 · 发布 · 分享',
      palette: getSeoPalette('guide')
    }),
    createSeoSpec({
      route: '/guide/release-status',
      title: '发布状态',
      description: '回看当前站点构建快照、关键校验项和回滚判断线索。',
      eyebrow: '项目指南',
      meta: 'Release Snapshot',
      accent: '发布快照 · 关键产物 · 回滚基线',
      palette: getSeoPalette('guide')
    }),
    createSeoSpec({
      route: '/guide/deployment',
      title: '发布说明',
      description: '统一回看本地命令、GitHub Pages 工作流与旧入口迁移说明。',
      eyebrow: '项目指南',
      meta: '发布与校验',
      accent: 'docs:check · workflow · legacy entry',
      palette: getSeoPalette('guide')
    }),
    createSeoSpec({
      route: '/guide/dao-core-theory',
      title: 'Dao 核心理论',
      description: '从根、诊断、路径、实践与无限五层结构理解 Dao 理论。',
      eyebrow: 'Dao 理论',
      meta: '五层结构',
      accent: '根 · 诊断 · 路径 · 实践 · 无限',
      palette: getSeoPalette('guide')
    }),
    createSeoSpec({
      route: '/guide/dao-commit-spec',
      title: 'Dao Commit 规范',
      description: '用卦象、type 与沉淀机制记录系统状态变化与工程经验。',
      eyebrow: 'Dao Commit',
      meta: '工程规范',
      accent: '卦象 · type · #沉淀 · 系统状态',
      palette: getSeoPalette('guide')
    }),
    createSeoSpec({
      route: '/discover/',
      title: '专题发现',
      description: '从精选主题、内容入口和分类入口继续发现高价值 demo。',
      eyebrow: '专题发现',
      meta: '内容入口',
      accent: featuredDemos.map(demo => demo.title).join(' · ') || '精选主题 · 分类入口 · 内容发现',
      palette: getSeoPalette('discover')
    }),
    createSeoSpec({
      route: '/discover/quick-start/',
      title: '快速开始',
      description: '按“我现在想先解决什么问题”组织起步路线，适合作为轻量检索替代入口。',
      eyebrow: '专题发现',
      meta: 'Quick Start',
      accent: quickStartEntries.slice(0, 3).map(entry => entry.title).join(' · ') || '首屏 · 卡片 · 阅读',
      palette: getSeoPalette('discover')
    }),
    createSeoSpec({
      route: '/discover/quick-start/roles/',
      title: '快速开始 · 按角色开始',
      description: '按当前角色聚合 quick start 起步线，更快找到贴近自己视角的起步入口。',
      eyebrow: '专题发现',
      meta: 'Quick Start Roles',
      accent: quickStartAudienceEntries.slice(0, 3).map(entry => entry.label).join(' · ') || '前端实现 · 视觉探索 · 内容策划',
      palette: getSeoPalette('discover')
    }),
    createSeoSpec({
      route: '/discover/quick-start/stages/',
      title: '快速开始 · 按阶段开始',
      description: '按项目当前阶段聚合 quick start 起步线，帮助更快判断下一步先补什么。',
      eyebrow: '专题发现',
      meta: 'Quick Start Stages',
      accent: quickStartStageEntries.slice(0, 3).map(entry => entry.label).join(' · ') || '验证期 · 打磨期 · 上线前',
      palette: getSeoPalette('discover')
    }),
    createSeoSpec({
      route: '/discover/quick-start/follow-up/',
      title: '快速开始 · 按下一步推进类型开始',
      description: '按“先补结构、先补反馈还是先补首屏氛围”聚合 quick start 的下一步建议。',
      eyebrow: '专题发现',
      meta: 'Quick Start Follow-up Types',
      accent: quickStartFollowUpTypeEntries.slice(0, 3).map(entry => entry.label).join(' · ') || '补内容入口 · 补反馈节奏 · 补首屏氛围',
      palette: getSeoPalette('discover')
    }),
    createSeoSpec({
      route: '/discover/spotlights/',
      title: '专题路线',
      description: '按更完整的问题路线组织 scene 与 demo，适合从更高层主题继续进入站点。',
      eyebrow: '专题发现',
      meta: 'Spotlights',
      accent: spotlightEntries.slice(0, 3).map(entry => entry.title).join(' · ') || '首屏 · 卡片 · 阅读',
      palette: getSeoPalette('discover')
    }),
    createSeoSpec({
      route: '/explore/',
      title: '多维导航',
      description: '按标签、场景与难度重新组织 demo 浏览路径。',
      eyebrow: '多维导航',
      meta: 'Explore',
      accent: '标签 · 场景 · 难度',
      palette: getSeoPalette('explore')
    }),
    createSeoSpec({
      route: '/explore/tags/',
      title: '标签导航',
      description: '按实现方式聚合 demo，适合从相近技术思路继续找案例。',
      eyebrow: '多维导航',
      meta: '标签入口',
      accent: topTags || 'Animation · Canvas · Layout',
      palette: getSeoPalette('explore')
    }),
    createSeoSpec({
      route: '/explore/scenes/',
      title: '场景导航',
      description: '按实际落地场景聚合 demo，适合按问题和页面需求继续浏览。',
      eyebrow: '多维导航',
      meta: '场景入口',
      accent: topScenes || '首屏 · 卡片交互 · 导航',
      palette: getSeoPalette('explore')
    }),
    createSeoSpec({
      route: '/explore/difficulty/',
      title: '难度导航',
      description: '按实现复杂度组织案例，帮助控制学习和改造成本。',
      eyebrow: '多维导航',
      meta: '难度入口',
      accent: '初级 · 中级 · 高级',
      palette: getSeoPalette('explore')
    }),
    createSeoSpec({
      route: '/journal/',
      title: '开发笔记',
      description: '记录展示站重构、内容治理、发布标准化与传播资产化的阶段笔记。',
      eyebrow: '开发笔记',
      meta: 'Journal',
      accent: journalEntries.slice(0, 3).map(entry => entry.title).join(' · '),
      palette: getSeoPalette('journal')
    })
  ]

  const categorySpecs = groupedCategories.map(category => createSeoSpec({
    route: `/demos/${category.id}/`,
    title: category.name,
    description: category.description,
    eyebrow: 'Demo 分类',
    meta: `${category.demos.length} 个 demo`,
    accent: category.demos.slice(0, 3).map(demo => demo.title).join(' · '),
    palette: getSeoPalette('category')
  }))

  const demoSpecs = demos.map(demo => createSeoSpec({
    route: `/demos/${demo.categoryId}/${demo.id}`,
    title: demo.title,
    description: demo.description,
    eyebrow: demo.categoryName,
    meta: `${renderDifficultyLabel(demo.difficulty)} · ${(demo.tags ?? []).slice(0, 2).join(' / ') || 'Demo'}`,
    accent: (demo.scenes ?? []).slice(0, 3).join(' · ') || (demo.tags ?? []).slice(0, 3).join(' · ') || '在线预览 · 原始页面 · 源码目录',
    palette: getSeoPalette('demo')
  }))

  const journalSpecs = journalEntries.map(entry => createSeoSpec({
    route: `/journal/${entry.slug}`,
    title: entry.title,
    description: entry.description,
    eyebrow: '开发笔记',
    meta: entry.date,
    accent: (entry.highlights ?? []).slice(0, 4).join(' · ') || '重构过程 · 设计判断 · 自测记录',
    palette: getSeoPalette('journal')
  }))

  const spotlightSpecs = spotlightEntries.map(entry => createSeoSpec({
    route: `/discover/spotlights/${entry.slug}`,
    title: `专题路线 · ${entry.title}`,
    description: entry.description,
    eyebrow: '专题发现',
    meta: `${entry.sceneEntries.length} 个场景 · ${entry.demos.length} 个 demo`,
    accent: entry.sceneEntries.slice(0, 3).map(item => item.label).join(' · '),
    palette: getSeoPalette('discover')
  }))

  const quickStartSpecs = quickStartEntries.map(entry => createSeoSpec({
    route: `/discover/quick-start/${entry.slug}`,
    title: `快速开始 · ${entry.title}`,
    description: entry.description,
    eyebrow: '专题发现',
    meta: `${entry.spotlights.length} 条路线 · ${entry.relatedDemos.length} 个 demo`,
    accent: entry.scenes.slice(0, 3).map(item => item.label).join(' · '),
    palette: getSeoPalette('discover')
  }))

  const quickStartAudienceSpecs = quickStartAudienceEntries.map(entry => createSeoSpec({
    route: `/discover/quick-start/roles/${entry.slug}`,
    title: `快速开始 · 角色 · ${entry.label}`,
    description: entry.description,
    eyebrow: '专题发现',
    meta: `${entry.quickStarts.length} 条起步线 · ${entry.demos.length} 个 demo`,
    accent: entry.quickStarts.slice(0, 3).map(item => item.title).join(' · '),
    palette: getSeoPalette('discover')
  }))

  const quickStartStageSpecs = quickStartStageEntries.map(entry => createSeoSpec({
    route: `/discover/quick-start/stages/${entry.slug}`,
    title: `快速开始 · 阶段 · ${entry.label}`,
    description: entry.description,
    eyebrow: '专题发现',
    meta: `${entry.quickStarts.length} 条起步线 · ${entry.demos.length} 个 demo`,
    accent: entry.quickStarts.slice(0, 3).map(item => item.title).join(' · '),
    palette: getSeoPalette('discover')
  }))

  const quickStartFollowUpTypeSpecs = quickStartFollowUpTypeEntries.map(entry => createSeoSpec({
    route: `/discover/quick-start/follow-up/${entry.slug}`,
    title: `快速开始 · 推进类型 · ${entry.label}`,
    description: entry.description,
    eyebrow: '专题发现',
    meta: `${entry.quickStarts.length} 条起步线 · ${entry.plans.length} 条推进顺序`,
    accent: entry.quickStarts.slice(0, 3).map(item => item.title).join(' · '),
    palette: getSeoPalette('discover')
  }))

  const tagSpecs = tagEntries.map(entry => createSeoSpec({
    route: `/explore/tags/${entry.slug}`,
    title: `标签 · ${entry.label}`,
    description: entry.description,
    eyebrow: '标签导航',
    meta: `${entry.count} 个 demo`,
    accent: entry.demos.slice(0, 3).map(demo => demo.title).join(' · '),
    palette: getSeoPalette('explore')
  }))

  const sceneSpecs = sceneEntries.map(entry => createSeoSpec({
    route: `/explore/scenes/${entry.slug}`,
    title: `场景 · ${entry.label}`,
    description: entry.description,
    eyebrow: '场景导航',
    meta: `${entry.count} 个 demo`,
    accent: entry.demos.slice(0, 3).map(demo => demo.title).join(' · '),
    palette: getSeoPalette('explore')
  }))

  const difficultySpecs = difficultyEntries.map(entry => createSeoSpec({
    route: `/explore/difficulty/${entry.slug}`,
    title: `难度 · ${entry.label}`,
    description: entry.description,
    eyebrow: '难度导航',
    meta: `${entry.count} 个 demo`,
    accent: entry.demos.slice(0, 3).map(demo => demo.title).join(' · '),
    palette: getSeoPalette('explore')
  }))

  return [
    ...staticSpecs,
    ...categorySpecs,
    ...demoSpecs,
    ...journalSpecs,
    ...quickStartSpecs,
    ...quickStartAudienceSpecs,
    ...quickStartStageSpecs,
    ...quickStartFollowUpTypeSpecs,
    ...spotlightSpecs,
    ...tagSpecs,
    ...sceneSpecs,
    ...difficultySpecs
  ]
}

function buildReleaseManifest(
  groupedCategories,
  demos,
  tagEntries,
  sceneEntries,
  difficultyEntries,
  pageSeoSpecs,
  quickStartEntries = [],
  quickStartAudienceEntries = [],
  quickStartStageEntries = [],
  quickStartFollowUpTypeEntries = []
) {
  const featuredDemos = getFeaturedDemos(demos, 8)
  const siteRoutes = buildSiteRoutes(
    groupedCategories,
    demos,
    tagEntries,
    sceneEntries,
    difficultyEntries,
    quickStartEntries,
    quickStartAudienceEntries,
    quickStartStageEntries,
    quickStartFollowUpTypeEntries
  )
  const generatedOgCount = pageSeoSpecs.length
  const releaseChecks = [
    { label: '首页产物', path: 'index.html' },
    { label: 'sitemap', path: 'sitemap.xml' },
    { label: 'robots', path: 'robots.txt' },
    { label: 'manifest', path: 'manifest.webmanifest' },
    { label: '发布快照', path: 'release-manifest.json' },
    { label: '旧入口说明页', path: 'views/index.html' }
  ]

  return {
    generatedAt: new Date().toISOString(),
    site: {
      title: siteMetadata.title,
      siteUrl: siteMetadata.siteUrl,
      repoBase: siteMetadata.repoBase
    },
    snapshot: {
      demos: demos.length,
      categories: groupedCategories.length,
      tags: tagEntries.length,
      scenes: sceneEntries.length,
      difficultyBuckets: difficultyEntries.length,
      quickStarts: quickStartEntries.length,
      quickStartAudiences: quickStartAudienceEntries.length,
      quickStartStages: quickStartStageEntries.length,
      quickStartFollowUpTypes: quickStartFollowUpTypeEntries.length,
      journalEntries: journalEntries.length,
      featuredDemos: featuredDemos.length,
      routes: siteRoutes.length,
      pageOgImages: generatedOgCount
    },
    commands: ['pnpm docs:generate', 'pnpm docs:build', 'pnpm docs:check'],
    releaseChecks,
    rollbackBaseline: [
      '先确认本地 pnpm docs:check 是否通过。',
      '再比对 release-manifest.json 中的关键统计与本次预期是否一致。',
      '如果关键产物缺失，优先回看 workflow 校验与 generate 链路，而不是直接重新发布。',
      '如需回滚，以最近一个已知通过的主分支提交重新触发发布。'
    ],
    highlightedRoutes: [
      '/',
      '/guide/progress',
      '/guide/release-status',
      '/guide/deployment',
      `/demos/${featuredDemos[0]?.categoryId ?? groupedCategories[0]?.id}/${featuredDemos[0]?.id ?? groupedCategories[0]?.demos?.[0]?.id ?? ''}`.replace(/\/$/, ''),
      `/journal/${journalEntries[0]?.slug ?? ''}`.replace(/\/$/, '')
    ].filter(Boolean)
  }
}

function writeReleaseManifest(manifest) {
  writeFile(path.join(publicDir, 'release-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
}

function generateReleaseStatusPage(manifest) {
  const releaseCheckRows = manifest.releaseChecks
    .map(item => `| ${item.label} | \`${item.path}\` | 发布前后都应存在 |`)
    .join('\n')
  const highlightedRoutes = manifest.highlightedRoutes
    .map(route => `- \`${route}\``)
    .join('\n')
  const rollbackLines = manifest.rollbackBaseline
    .map(item => `- ${item}`)
    .join('\n')
  const commandLines = manifest.commands
    .map(item => `- \`${item}\``)
    .join('\n')

  return `---
layout: doc
title: 发布状态
description: 回看当前站点构建快照、关键校验项和回滚判断线索
---

# 发布状态

这一页用于回看当前构建的发布快照，让发布不只停留在 workflow 执行结果里。

## 当前快照

- 快照生成时间：${manifest.generatedAt}
- Demo 数量：**${manifest.snapshot.demos}**
- 分类数量：**${manifest.snapshot.categories}**
- 标签数量：**${manifest.snapshot.tags}**
- 场景数量：**${manifest.snapshot.scenes}**
- quick start 推进类型数量：**${manifest.snapshot.quickStartFollowUpTypes ?? 0}**
- 开发笔记数量：**${manifest.snapshot.journalEntries}**
- 页面级分享图数量：**${manifest.snapshot.pageOgImages}**
- 站点路由数量：**${manifest.snapshot.routes}**

## 当前发布命令

${commandLines}

## 关键发布校验项

| 校验项 | 目标文件 | 说明 |
| --- | --- | --- |
${releaseCheckRows}

## 重点回看路由

${highlightedRoutes}

## 回滚基线

${rollbackLines}

## 快照文件

- 当前发布快照：[\`/release-manifest.json\`](/release-manifest.json)
- 发布说明入口：[查看发布说明](/guide/deployment)
- 项目进度入口：[查看项目进度](/guide/progress)
`
}

function renderCodeTree(files = []) {
  if (!files.length) {
    return '```bash\n暂无额外文件\n```'
  }

  const lines = files.map((file, index) => {
    const prefix = index === files.length - 1 ? '└──' : '├──'
    return `${prefix} ${file}`
  })

  return `\`\`\`bash\n${lines.join('\n')}\n\`\`\``
}

function renderBulletSection(items = [], emptyText = '当前暂无补充说明') {
  if (!items.length) {
    return `- ${emptyText}`
  }

  return items.map(item => `- ${item}`).join('\n')
}

function buildDemoWhyRead(demo) {
  if (Array.isArray(demo.whyRead) && demo.whyRead.length) {
    return demo.whyRead
  }

  const reasons = [demo.description]

  if (demo.featured?.reason) {
    reasons.push(demo.featured.reason)
  }

  if ((demo.tags ?? []).length) {
    reasons.push(`它把 ${demo.tags.slice(0, 3).join(' / ')} 这类实现方式放在一个很容易上手的案例里。`)
  }

  return reasons.slice(0, 3)
}

function buildDemoImplementationNotes(demo) {
  if (Array.isArray(demo.implementationNotes) && demo.implementationNotes.length) {
    return demo.implementationNotes
  }

  return [
    `先看 ${demo.tags.slice(0, 2).join(' 与 ') || demo.categoryName} 在这个案例里分别承担了什么角色。`,
    `再观察它如何把 ${renderDifficultyLabel(demo.difficulty)} 难度下最关键的视觉或交互反馈组织起来。`,
    `最后结合原始入口和源码目录，判断哪些部分适合直接复用，哪些更适合只借结构思路。`
  ]
}

function buildDemoWhenToUse(demo) {
  if (Array.isArray(demo.whenToUse) && demo.whenToUse.length) {
    return demo.whenToUse
  }

  if ((demo.scenes ?? []).length) {
    return demo.scenes.map(scene => `适合在“${scene}”这类页面或模块里作为第一批参考案例。`)
  }

  return [
    `如果你正在做 ${demo.categoryName} 相关页面，可以先把它当成结构和反馈节奏的参考。`,
    '如果你只需要快速验证某种交互感觉，也适合先从这个案例抽最小可复用部分。'
  ]
}

function buildDemoAdaptationTips(demo) {
  if (Array.isArray(demo.adaptationTips) && demo.adaptationTips.length) {
    return demo.adaptationTips
  }

  return [
    '先保留原案例最有辨识度的一处动效或结构，不要一开始把所有细节一起搬过去。',
    '如果目标项目已有设计系统，优先迁移交互逻辑和层次关系，而不是照搬颜色和尺寸。',
    '上线前记得回看移动端、性能和可读性，避免视觉效果盖过真实内容。'
  ]
}

function renderBrowseChipList(items = [], emptyText = '当前暂无浏览线索') {
  if (!items.length) {
    return `<p class="browse-empty">${emptyText}</p>`
  }

  return `<div class="browse-chip-list">${items.map(item => `<span class="browse-chip">${escapeHtml(item)}</span>`).join('')}</div>`
}

function renderBrowseLinkChipList(items = [], emptyText = '当前暂无浏览线索') {
  if (!items.length) {
    return `<p class="browse-empty">${emptyText}</p>`
  }

  return `<div class="browse-chip-list">${items.map(item => `<a class="browse-chip" href="${item.href}">${escapeHtml(item.label)}</a>`).join('')}</div>`
}

function renderJournalCards(entries = []) {
  if (!entries.length) {
    return '<p class="browse-empty">当前还没有可展示的开发笔记。</p>'
  }

  return `<div class="journal-card-grid">${entries.map(entry => `
    <a class="journal-card" href="/journal/${entry.slug}">
      <span class="journal-card-date">${escapeHtml(entry.date)}</span>
      <strong>${escapeHtml(entry.title)}</strong>
      <p>${escapeHtml(entry.description)}</p>
    </a>`).join('')}
  </div>`
}

function renderMiniCards(demos = []) {
  if (!demos.length) {
    return '<p class="browse-empty">当前暂无推荐条目。</p>'
  }

  return `<div class="mini-card-grid">${demos.map(demo => `
    <a class="mini-card" href="/demos/${demo.categoryId}/${demo.id}">
      <strong>${escapeHtml(demo.title)}</strong>
      <span>${escapeHtml(demo.description)}</span>
    </a>`).join('')}
  </div>`
}

function renderTopicCards(entries = [], emptyText = '当前暂无可浏览的导航项。') {
  if (!entries.length) {
    return `<p class="browse-empty">${emptyText}</p>`
  }

  return `<div class="topic-card-grid">${entries.map(entry => `
    <a class="topic-card" href="${entry.href}">
      <strong>${escapeHtml(entry.title)}</strong>
      <span>${escapeHtml(entry.meta)}</span>
      <small>${escapeHtml(entry.description)}</small>
    </a>`).join('')}
  </div>`
}

function renderQuickStartFlowCards(entries = [], emptyText = '当前还没有可用的推进顺序。') {
  if (!entries.length) {
    return `<p class="browse-empty">${emptyText}</p>`
  }

  return `<div class="topic-card-grid">${entries.map(entry => `
    <a class="topic-card" href="/discover/quick-start/${entry.slug}">
      <strong>${escapeHtml(entry.title)}</strong>
      <span>${escapeHtml(entry.costLabel ?? '继续推进')}</span>
      <small>${escapeHtml((entry.followUpReason ?? [entry.description])[0] ?? entry.description)}</small>
    </a>`).join('')}
  </div>`
}

function renderEntryVisualCards(entries = [], emptyText = '当前暂无可浏览的入口卡片。') {
  if (!entries.length) {
    return `<p class="browse-empty">${emptyText}</p>`
  }

  return `<div class="entry-visual-grid">${entries.map(entry => `
    <a class="entry-visual-card" href="${entry.href}">
      <div class="entry-visual-media" style="background-image:url('${entry.image}')">
        <div class="entry-visual-overlay"></div>
        <div class="entry-visual-content">
          <span class="entry-visual-label">${escapeHtml(entry.label)}</span>
          <strong>${escapeHtml(entry.title)}</strong>
          <small>${escapeHtml(entry.accent)}</small>
        </div>
      </div>
      <div class="entry-visual-body">
        <span class="entry-visual-meta">${escapeHtml(entry.meta)}</span>
        <p>${escapeHtml(entry.description)}</p>
      </div>
    </a>`).join('')}
  </div>`
}

function sortDemosByCuratedPriority(demos = []) {
  return demos.slice().sort((a, b) => {
    const ap = a.featured?.priority ?? -1
    const bp = b.featured?.priority ?? -1

    if (bp !== ap) {
      return bp - ap
    }

    return a.title.localeCompare(b.title, 'zh-CN')
  })
}

function buildTagEntries(demos = []) {
  const tagMap = new Map()

  for (const demo of demos) {
    for (const tag of demo.tags ?? []) {
      const entry = tagMap.get(tag) ?? { label: tag, slug: slugifyTerm(tag), demos: [] }
      entry.demos.push(demo)
      tagMap.set(tag, entry)
    }
  }

  return Array.from(tagMap.values())
    .map(entry => {
      const rankedDemos = sortDemosByCuratedPriority(entry.demos)

      return {
        ...entry,
        count: entry.demos.length,
        representative: rankedDemos[0],
        description: `当前有 ${entry.demos.length} 个 demo 与“${entry.label}”相关，适合从相近实现方式继续找案例。`
      }
    })
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count
      }

      return a.label.localeCompare(b.label, 'zh-CN')
    })
}

function buildSceneEntries(demos = []) {
  const sceneMap = new Map()

  for (const demo of demos) {
    for (const scene of demo.scenes ?? []) {
      const entry = sceneMap.get(scene) ?? { label: scene, slug: slugifyTerm(scene), demos: [] }
      entry.demos.push(demo)
      sceneMap.set(scene, entry)
    }
  }

  return Array.from(sceneMap.values())
    .map(entry => {
      const rankedDemos = sortDemosByCuratedPriority(entry.demos)
      const narrative = sceneNarratives[entry.label]

      return {
        ...entry,
        count: entry.demos.length,
        representative: rankedDemos[0],
        description: narrative?.description ?? `当前有 ${entry.demos.length} 个 demo 可以作为“${entry.label}”场景的参考入口。`,
        narrative,
        entryVisual: getSceneEntryVisual(entry.label)
      }
    })
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count
      }

      return a.label.localeCompare(b.label, 'zh-CN')
    })
}

function buildDifficultyEntries(demos = []) {
  const configs = [
    {
      key: 'beginner',
      label: '初级',
      description: '适合快速浏览和低成本复用，优先承接基础结构和简单动效。'
    },
    {
      key: 'intermediate',
      label: '中级',
      description: '适合继续扩展交互与表现层，兼顾结构、动效和小型逻辑组合。'
    },
    {
      key: 'advanced',
      label: '高级',
      description: '适合参考复杂视觉、Canvas 或更高实现成本的案例。'
    }
  ]

  return configs
    .map(config => {
      const matched = demos.filter(demo => demo.difficulty === config.key)
      const rankedDemos = sortDemosByCuratedPriority(matched)

      return {
        slug: config.key,
        label: config.label,
        count: matched.length,
        demos: matched,
        representative: rankedDemos[0],
        description: config.description
      }
    })
    .filter(entry => entry.count > 0)
}

function buildSpotlightEntries(demos = [], sceneEntries = []) {
  const sceneMap = new Map(sceneEntries.map(entry => [entry.label, entry]))
  const demoMap = new Map(demos.map(demo => [demo.id, demo]))

  return discoverSpotlights.map(spotlight => {
    const matchedScenes = spotlight.scenes
      .map(label => sceneMap.get(label))
      .filter(Boolean)

    const sceneDemoMap = new Map()
    for (const sceneEntry of matchedScenes) {
      for (const demo of sceneEntry.demos) {
        sceneDemoMap.set(demo.id, demo)
      }
    }

    for (const demoId of spotlight.relatedDemoIds ?? []) {
      const demo = demoMap.get(demoId)
      if (demo) {
        sceneDemoMap.set(demo.id, demo)
      }
    }

    const demosByPriority = sortDemosByCuratedPriority(Array.from(sceneDemoMap.values()))

    return {
      ...spotlight,
      image: `/entry-covers/spotlights/${spotlight.slug}.svg`,
      sceneEntries: matchedScenes,
      demos: demosByPriority,
      featuredDemos: demosByPriority.slice(0, 6)
    }
  })
}

function buildQuickStartEntries(demos = [], sceneEntries = [], spotlightEntries = []) {
  const demoMap = new Map(demos.map(demo => [demo.id, demo]))
  const sceneMap = new Map(sceneEntries.map(entry => [entry.label, entry]))
  const spotlightMap = new Map(spotlightEntries.map(entry => [entry.slug, entry]))
  const entries = quickStartGuides.map(guide => {
    const spotlights = (guide.spotlightSlugs ?? [])
      .map(slug => spotlightMap.get(slug))
      .filter(Boolean)
    const scenes = (guide.sceneLabels ?? [])
      .map(label => sceneMap.get(label))
      .filter(Boolean)

    const relatedDemoMap = new Map()

    for (const spotlight of spotlights) {
      for (const demo of spotlight.featuredDemos) {
        relatedDemoMap.set(demo.id, demo)
      }
    }

    for (const demoId of guide.relatedDemoIds ?? []) {
      const demo = demoMap.get(demoId)
      if (demo) {
        relatedDemoMap.set(demo.id, demo)
      }
    }

    return {
      ...guide,
      spotlights,
      scenes,
      relatedDemos: sortDemosByCuratedPriority(Array.from(relatedDemoMap.values())).slice(0, 6)
    }
  })

  const entryMap = new Map(entries.map(entry => [entry.slug, entry]))

  return entries.map(entry => {
    const followUpPlans = (entry.followUpSlugs ?? [])
      .map((slug, index) => {
        const targetEntry = entryMap.get(slug)

        if (!targetEntry) {
          return null
        }

        const type = entry.followUpTypes?.[index] ?? '继续推进'
        const typeMeta = quickStartFollowUpTypeMeta[type] ?? {
          slug: slugifyTerm(type),
          description: `适合按“${type}”继续回看下一步推进顺序。`
        }

        return {
          slug,
          type,
          typeSlug: typeMeta.slug,
          typeDescription: typeMeta.description,
          reason: entry.followUpReason?.[index] ?? targetEntry.description,
          entry: targetEntry
        }
      })
      .filter(Boolean)

    const deferPlans = (entry.deferTypes ?? [])
      .map((type, index) => {
        const typeMeta = quickStartFollowUpTypeMeta[type] ?? {
          slug: slugifyTerm(type),
          description: `适合按“${type}”继续回看下一步推进顺序。`
        }

        return {
          type,
          typeSlug: typeMeta.slug,
          typeDescription: typeMeta.description,
          reason: entry.deferReason?.[index] ?? `当前先不急着补“${type}”。`
        }
      })
      .filter(Boolean)

    const tradeoffNotes = (entry.tradeoffNotes ?? [])
      .map(note => {
        if (!note?.preferType || !note?.deferType) {
          return null
        }

        const preferMeta = resolveQuickStartTypeMeta(note.preferType)
        const deferMeta = resolveQuickStartTypeMeta(note.deferType)

        return {
          preferType: note.preferType,
          preferSlug: preferMeta.slug,
          deferType: note.deferType,
          deferSlug: deferMeta.slug,
          reason: note.reason ?? `当前更适合先补${note.preferType}，而不是先补${note.deferType}。`
        }
      })
      .filter(Boolean)

    const overdoWarnings = (entry.overdoWarnings ?? [])
      .map(normalizeQuickStartTypeWarning)
      .filter(Boolean)

    return {
      ...entry,
      followUpEntries: followUpPlans.map(plan => plan.entry),
      followUpPlans,
      deferPlans,
      tradeoffNotes,
      overdoWarnings
    }
  })
}

function buildQuickStartSegmentEntries(quickStartEntries = [], field = 'audiences') {
  const metaMap = field === 'stages' ? quickStartStageMeta : quickStartAudienceMeta
  const grouped = new Map()

  for (const entry of quickStartEntries) {
    for (const label of entry[field] ?? []) {
      if (!grouped.has(label)) {
        const meta = metaMap[label] ?? {
          slug: slugifyTerm(label),
          description: `适合按${field === 'stages' ? '项目阶段' : '角色视角'}快速聚合起步线。`
        }
        grouped.set(label, {
          label,
          slug: meta.slug,
          description: meta.description,
          quickStarts: [],
          plans: [],
          followUpTypes: new Map(),
          deferTypes: new Map(),
          tradeoffs: [],
          overdoWarnings: new Map(),
          spotlights: new Map(),
          scenes: new Map(),
          demos: new Map()
        })
      }

      const groupedEntry = grouped.get(label)
      groupedEntry.quickStarts.push(entry)

      for (const spotlight of entry.spotlights ?? []) {
        groupedEntry.spotlights.set(spotlight.slug, spotlight)
      }

      for (const scene of entry.scenes ?? []) {
        groupedEntry.scenes.set(scene.slug, scene)
      }

      for (const demo of entry.relatedDemos ?? []) {
        groupedEntry.demos.set(demo.id, demo)
      }

      for (const plan of entry.followUpPlans ?? []) {
        const typeMeta = quickStartFollowUpTypeMeta[plan.type] ?? {
          slug: slugifyTerm(plan.type),
          description: `适合按“${plan.type}”继续回看 quick start 的下一步推进顺序。`
        }

        if (!groupedEntry.followUpTypes.has(plan.type)) {
          groupedEntry.followUpTypes.set(plan.type, {
            label: plan.type,
            slug: typeMeta.slug,
            description: typeMeta.description,
            count: 0,
            sampleReason: plan.reason
          })
        }

        const followUpTypeEntry = groupedEntry.followUpTypes.get(plan.type)
        followUpTypeEntry.count += 1
        followUpTypeEntry.sampleReason ??= plan.reason

        groupedEntry.plans.push({
          source: entry,
          target: plan.entry,
          reason: plan.reason,
          type: plan.type,
          typeSlug: typeMeta.slug
        })
      }

      for (const deferPlan of entry.deferPlans ?? []) {
        registerQuickStartTypeAggregate(groupedEntry.deferTypes, deferPlan.type, deferPlan.reason)
      }

      for (const tradeoffNote of entry.tradeoffNotes ?? []) {
        groupedEntry.tradeoffs.push({
          source: entry,
          ...tradeoffNote
        })
      }

      for (const warning of entry.overdoWarnings ?? []) {
        registerQuickStartTypeAggregate(groupedEntry.overdoWarnings, warning.type, warning.reason)
      }
    }
  }

  return Array.from(grouped.values())
    .map(entry => ({
      ...entry,
      plans: entry.plans.slice().sort((a, b) =>
        a.source.title.localeCompare(b.source.title, 'zh-CN') ||
        a.target.title.localeCompare(b.target.title, 'zh-CN')
      ),
      followUpTypes: Array.from(entry.followUpTypes.values())
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN')),
      deferTypes: Array.from(entry.deferTypes.values())
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN')),
      tradeoffs: entry.tradeoffs.slice().sort((a, b) =>
        a.preferType.localeCompare(b.preferType, 'zh-CN') ||
        a.deferType.localeCompare(b.deferType, 'zh-CN')
      ),
      overdoWarnings: Array.from(entry.overdoWarnings.values())
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN')),
      quickStarts: entry.quickStarts.slice().sort((a, b) => a.title.localeCompare(b.title, 'zh-CN')),
      spotlights: Array.from(entry.spotlights.values()).sort((a, b) => a.title.localeCompare(b.title, 'zh-CN')),
      scenes: Array.from(entry.scenes.values()).sort((a, b) => a.label.localeCompare(b.label, 'zh-CN')),
      demos: sortDemosByCuratedPriority(Array.from(entry.demos.values())).slice(0, 8)
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug, 'en'))
}

function buildQuickStartFollowUpTypeEntries(quickStartEntries = []) {
  const grouped = new Map()

  for (const entry of quickStartEntries) {
    for (const plan of entry.followUpPlans ?? []) {
      if (!grouped.has(plan.type)) {
        const meta = quickStartFollowUpTypeMeta[plan.type] ?? {
          slug: slugifyTerm(plan.type),
          description: `适合按“${plan.type}”继续回看 quick start 的下一步推进顺序。`
        }

        grouped.set(plan.type, {
          label: plan.type,
          slug: meta.slug,
          description: meta.description,
          plans: [],
          deferTypes: new Map(),
          tradeoffs: [],
          overdoWarnings: new Map(),
          quickStarts: new Map(),
          audiences: new Map(),
          stages: new Map(),
          spotlights: new Map(),
          scenes: new Map(),
          demos: new Map()
        })
      }

      const groupedEntry = grouped.get(plan.type)
      groupedEntry.plans.push({
        source: entry,
        target: plan.entry,
        reason: plan.reason,
        type: plan.type
      })
      groupedEntry.quickStarts.set(entry.slug, entry)
      groupedEntry.quickStarts.set(plan.entry.slug, plan.entry)

      for (const quickStart of [entry, plan.entry]) {
        for (const deferPlan of quickStart.deferPlans ?? []) {
          registerQuickStartTypeAggregate(groupedEntry.deferTypes, deferPlan.type, deferPlan.reason)
        }

        for (const tradeoffNote of quickStart.tradeoffNotes ?? []) {
          if (tradeoffNote.preferType === plan.type || tradeoffNote.deferType === plan.type) {
            groupedEntry.tradeoffs.push({
              source: quickStart,
              ...tradeoffNote
            })
          }
        }

        for (const warning of quickStart.overdoWarnings ?? []) {
          if (warning.type === plan.type) {
            registerQuickStartTypeAggregate(groupedEntry.overdoWarnings, warning.type, warning.reason)
          }
        }

        for (const audience of quickStart.audiences ?? []) {
          registerQuickStartMetaEntry(
            groupedEntry.audiences,
            audience,
            quickStartAudienceMeta,
            quickStart,
            '适合按角色视角回看当前推进类型。'
          )
        }

        for (const stage of quickStart.stages ?? []) {
          registerQuickStartMetaEntry(
            groupedEntry.stages,
            stage,
            quickStartStageMeta,
            quickStart,
            '适合按项目阶段回看当前推进类型。'
          )
        }

        for (const spotlight of quickStart.spotlights ?? []) {
          groupedEntry.spotlights.set(spotlight.slug, spotlight)
        }

        for (const scene of quickStart.scenes ?? []) {
          groupedEntry.scenes.set(scene.slug, scene)
        }

        for (const demo of quickStart.relatedDemos ?? []) {
          groupedEntry.demos.set(demo.id, demo)
        }
      }
    }
  }

  return Array.from(grouped.values())
    .map(entry => ({
      ...entry,
      plans: entry.plans.slice().sort((a, b) =>
        a.source.title.localeCompare(b.source.title, 'zh-CN') ||
        a.target.title.localeCompare(b.target.title, 'zh-CN')
      ),
      deferTypes: Array.from(entry.deferTypes.values())
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN')),
      tradeoffs: entry.tradeoffs.slice().sort((a, b) =>
        a.preferType.localeCompare(b.preferType, 'zh-CN') ||
        a.deferType.localeCompare(b.deferType, 'zh-CN')
      ),
      overdoWarnings: Array.from(entry.overdoWarnings.values())
        .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN')),
      audiences: finalizeQuickStartMetaEntries(entry.audiences),
      stages: finalizeQuickStartMetaEntries(entry.stages),
      quickStarts: Array.from(entry.quickStarts.values()).sort((a, b) => a.title.localeCompare(b.title, 'zh-CN')),
      spotlights: Array.from(entry.spotlights.values()).sort((a, b) => a.title.localeCompare(b.title, 'zh-CN')),
      scenes: Array.from(entry.scenes.values()).sort((a, b) => a.label.localeCompare(b.label, 'zh-CN')),
      demos: sortDemosByCuratedPriority(Array.from(entry.demos.values())).slice(0, 8)
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug, 'en'))
}

function getSpotlightEntriesForDemo(demo, spotlightEntries = []) {
  return spotlightEntries
    .map(entry => {
      const matchedScenes = (demo.scenes ?? []).filter(scene =>
        entry.sceneEntries.some(sceneEntry => sceneEntry.label === scene)
      )
      const listedDirectly = (entry.relatedDemoIds ?? []).includes(demo.id)
      const featuredInsideRoute = entry.featuredDemos.some(item => item.id === demo.id)
      const score = (listedDirectly ? 4 : 0) + matchedScenes.length * 2 + (featuredInsideRoute ? 1 : 0)

      return {
        entry,
        matchedScenes,
        listedDirectly,
        featuredInsideRoute,
        score
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'zh-CN'))
    .slice(0, 3)
}

function getJournalNeighbors(entry, entries = journalEntries) {
  const currentIndex = entries.findIndex(item => item.slug === entry.slug)

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null
    }
  }

  return {
    previous: currentIndex > 0 ? entries[currentIndex - 1] : null,
    next: currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null
  }
}

function getRelatedJournalEntries(entry, limit = 3, entries = journalEntries) {
  const currentDemoIds = new Set(entry.relatedDemoIds ?? [])
  const currentHighlights = new Set(entry.highlights ?? [])

  return entries
    .filter(candidate => candidate.slug !== entry.slug)
    .map(candidate => {
      const sharedDemoCount = (candidate.relatedDemoIds ?? []).filter(id => currentDemoIds.has(id)).length
      const sharedHighlightCount = (candidate.highlights ?? []).filter(tag => currentHighlights.has(tag)).length

      return {
        candidate,
        score: sharedDemoCount * 3 + sharedHighlightCount
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.candidate)
}

function getRelatedJournalEntriesByDemo(demo, limit = 3, entries = journalEntries) {
  return entries
    .filter(entry => (entry.relatedDemoIds ?? []).includes(demo.id))
    .slice(0, limit)
}

function getRelatedJournalEntriesByDemos(demos = [], limit = 3, entries = journalEntries) {
  const demoIds = new Set(demos.map(demo => demo.id))

  return entries
    .map(entry => ({
      entry,
      score: (entry.relatedDemoIds ?? []).filter(id => demoIds.has(id)).length
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.entry)
}

function generateCategoryIndex(category) {
  const highlighted = category.demos.filter(demo => demo.featured).slice(0, 3)
  const topTags = Array.from(new Map(
    category.demos.flatMap(demo => demo.tags).map(tag => [tag, (category.demos.filter(d => d.tags.includes(tag)).length)])
  ).entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag)
  const topScenes = Array.from(new Map(
    category.demos.flatMap(demo => demo.scenes ?? []).map(scene => [scene, (category.demos.filter(d => (d.scenes ?? []).includes(scene)).length)])
  ).entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([scene]) => scene)
  const cards = category.demos.map(demo => `
  <DemoCard
    title="${escapeHtml(demo.title)}"
    description="${escapeHtml(demo.description)}"
    demoUrl="${demo.publicUrl}"
    pageUrl="/demos/${category.id}/${demo.id}"
    tags="${demo.tags.join(',')}"
    difficulty="${demo.difficulty}"
  />`).join('\n')

  const tableRows = category.demos.map(demo => `| [${demo.title}](./${demo.id}) | ${demo.description} | ${renderDifficultyLabel(demo.difficulty)} | ${demo.tags.join(' / ')} |`).join('\n')

  return `---
layout: doc
title: ${escapeYamlString(category.name)}
description: ${escapeYamlString(category.description)}
---

# ${category.icon} ${category.name}

${category.description}

当前分类共收录 **${category.demos.length}** 个 demo，可直接在线预览，也可以跳转查看原始页面。

## 如何开始浏览

${highlighted.length ? `先从这几条更适合作为入口的 demo 开始：` : '当前分类还没有显式精选条目，可以直接从下方列表开始浏览。'}

${renderMiniCards(highlighted)}

### 高频标签

${renderBrowseChipList(topTags, '当前分类还没有稳定的高频标签。')}

### 常见场景

${renderBrowseChipList(topScenes, '当前分类还没有补足场景字段。')}

<div class="demo-grid">${cards}
</div>

## 列表总览

| Demo | 描述 | 难度 | 标签 |
|------|------|------|------|
${tableRows}
`
}

function generateDemoPage(demo, demos, spotlightEntries = []) {
  const neighbors = getDemoNeighbors(demo, demos)
  const relatedDemos = getRelatedDemos(demo, demos, 3)
  const relatedJournals = getRelatedJournalEntriesByDemo(demo)
  const relatedSpotlights = getSpotlightEntriesForDemo(demo, spotlightEntries)
  const categoryPageUrl = `/demos/${demo.categoryId}/`
  const tagLinks = (demo.tags ?? []).map(tag => ({
    label: tag,
    href: `/explore/tags/${slugifyTerm(tag)}`
  }))
  const sceneLinks = (demo.scenes ?? []).map(scene => ({
    label: scene,
    href: `/explore/scenes/${slugifyTerm(scene)}`
  }))
  const difficultyLinks = [
    {
      label: renderDifficultyLabel(demo.difficulty),
      href: `/explore/difficulty/${demo.difficulty}`
    }
  ]
  const neighborCards = [neighbors.previous, neighbors.next]
    .filter(Boolean)
    .map(item => `
    <a class="browse-nav-card" href="/demos/${item.categoryId}/${item.id}">
      <span>${item.id === neighbors.previous?.id ? '上一条' : '下一条'}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <small>${escapeHtml(item.description)}</small>
    </a>`).join('')

  const whyRead = buildDemoWhyRead(demo)
  const implementationNotes = buildDemoImplementationNotes(demo)
  const whenToUse = buildDemoWhenToUse(demo)
  const adaptationTips = buildDemoAdaptationTips(demo)
  const spotlightCards = relatedSpotlights.map(({ entry, matchedScenes, listedDirectly, featuredInsideRoute }) => {
    const metaParts = [
      `${entry.sceneEntries.length} 个场景`,
      `${entry.demos.length} 个 demo`
    ]

    if (matchedScenes.length) {
      metaParts.push(`命中 ${matchedScenes.length} 个当前场景`)
    }

    return {
      href: `/discover/spotlights/${entry.slug}`,
      title: entry.title,
      meta: metaParts.join(' · '),
      description: listedDirectly
        ? '当前案例已被这条路线直接点名，适合回到路线页继续看整体组织方式。'
        : featuredInsideRoute
          ? '当前案例已经进入这条路线的优先推荐区，适合回看它前后串联的案例。'
          : `这条路线覆盖 ${matchedScenes.join(' / ')} 等相关场景，适合继续向上看问题语境。`
    }
  })

  return `---
layout: doc
title: ${escapeYamlString(demo.title)}
description: ${escapeYamlString(demo.description)}
---

# ${demo.title}

<DemoPreview
  demoUrl="${demo.publicUrl}"
  title="${escapeHtml(demo.title)}"
  description="${escapeHtml(demo.description)}"
/>

## 效果说明

${demo.description}

## 为什么值得看

${renderBulletSection(whyRead, '当前还没有补充“为什么值得看”的说明。')}

## 技术要点

- 分类：${demo.categoryName}
- 标签：${demo.tags.join(' / ')}
- 场景：${demo.scenes?.length ? demo.scenes.join(' / ') : '未补充'}
- 难度：${renderDifficultyLabel(demo.difficulty)}
- 原始入口：
  - \`${demo.publicUrl}\`
  - \`${demo.sourceDir}\`

## 在线体验

- [查看 GitHub 源码目录](${demo.sourceUrl})
- [返回 ${demo.categoryName} 分类](${categoryPageUrl})

> 原始 Demo 页面可通过页面顶部的“在新窗口打开”按钮直接访问。

## 目录结构

${renderCodeTree(demo.sourceFiles)}

## 适用场景

${renderBulletSection(whenToUse, '当前尚未补充场景说明')}

## 实现拆解

${renderBulletSection(implementationNotes, '当前还没有补充实现拆解。')}

## 改造提醒

${renderBulletSection(adaptationTips, '当前还没有补充改造提醒。')}

## 多维入口

### 按标签继续找

${renderBrowseLinkChipList(tagLinks, '当前条目还没有可用的标签入口。')}

### 按场景继续找

${renderBrowseLinkChipList(sceneLinks, '当前条目还没有补充场景入口。')}

### 按难度继续找

${renderBrowseLinkChipList(difficultyLinks, '当前条目还没有可用的难度入口。')}

## 相关专题路线

如果你不是只想看单个案例，而是想继续判断“这一类页面问题还能往哪里看”，可以从这里回到专题路线。

${renderTopicCards(spotlightCards, '当前条目还没有进入可回流的专题路线。')}

## 继续浏览

### 邻接导航

${neighborCards ? `<div class="browse-nav-grid">${neighborCards}</div>` : '<p class="browse-empty">当前条目在本分类中没有可用的邻接导航。</p>'}

### 相关推荐

${renderMiniCards(relatedDemos)}

### 相关阅读

${renderJournalCards(relatedJournals)}

---

<nav class="demo-nav">
  <a href="${categoryPageUrl}">← 返回分类</a>
  <a href="/">返回首页</a>
</nav>
`
}

function renderFeaturedCover(demo) {
  const fallbackContent = `
    <div class="featured-cover-content">
      <span class="featured-cover-label">${escapeHtml(demo.categoryName)}</span>
      <strong class="featured-cover-title">${escapeHtml(demo.title)}</strong>
    </div>`

  if (!demo.cover) {
    return `<div class="featured-cover featured-cover-fallback">${fallbackContent}</div>`
  }

  const generatedCoverSrc = `/featured-covers/${demo.id}.svg`

  if (demo.cover.type === 'image' || demo.cover) {
    return `
    <div class="featured-cover featured-cover-image" style="background-image:url('${demo.cover?.src ?? generatedCoverSrc}')">
      <div class="featured-cover-overlay"></div>
      <div class="featured-cover-content">
        ${demo.cover.label ? `<span class="featured-cover-label">${escapeHtml(demo.cover.label)}</span>` : ''}
        ${demo.cover.title ? `<strong class="featured-cover-title">${escapeHtml(demo.cover.title)}</strong>` : ''}
      </div>
    </div>`
  }

  const palette = demo.cover.palette.join(', ')
  return `
  <div class="featured-cover featured-cover-gradient" style="background: linear-gradient(135deg, ${palette})">
    <div class="featured-cover-overlay"></div>
    <div class="featured-cover-content">
      ${demo.cover.label ? `<span class="featured-cover-label">${escapeHtml(demo.cover.label)}</span>` : ''}
      ${demo.cover.title ? `<strong class="featured-cover-title">${escapeHtml(demo.cover.title)}</strong>` : ''}
    </div>
  </div>`
}

function renderFeaturedCards(demos) {
  return demos.map(demo => `
  <div class="featured-card">
    ${renderFeaturedCover(demo)}
    <div class="featured-card-body">
      <div class="featured-card-meta">
        <span class="featured-badge">精选</span>
        <span class="featured-category">${demo.categoryName}</span>
      </div>
      <h3>${demo.title}</h3>
      <p>${demo.description}</p>
      ${demo.featured?.reason ? `<p class="featured-reason">推荐理由：${demo.featured.reason}</p>` : ''}
      <div class="tags">${demo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
      <a href="/demos/${demo.categoryId}/${demo.id}" class="button">查看详情</a>
    </div>
  </div>`).join('\n')
}

function generateDiscoverPage(groupedCategories, featuredDemos) {
  const demos = groupedCategories.flatMap(category => category.demos)
  const sceneEntries = buildSceneEntries(demos).slice(0, 12)
  const allSceneEntries = buildSceneEntries(demos)
  const spotlightEntries = buildSpotlightEntries(demos, allSceneEntries)
  const quickStartEntries = buildQuickStartEntries(demos, allSceneEntries, spotlightEntries)
  const quickStartAudienceEntries = buildQuickStartSegmentEntries(quickStartEntries, 'audiences')
  const quickStartStageEntries = buildQuickStartSegmentEntries(quickStartEntries, 'stages')
  const quickStartFollowUpTypeEntries = buildQuickStartFollowUpTypeEntries(quickStartEntries)
  const tagEntries = buildTagEntries(demos).slice(0, 6)
  const difficultyEntries = buildDifficultyEntries(demos)
  const categoryCards = groupedCategories.map(category => ({
    href: `/demos/${category.id}/`,
    image: `/entry-covers/categories/${category.id}.svg`,
    label: category.entryVisual.label,
    title: `${category.icon} ${category.name}`,
    accent: category.entryVisual.accent,
    meta: `${category.demos.length} 个 demo`,
    description: category.description
  }))
  const sceneCards = sceneEntries.map(entry => ({
    href: `/explore/scenes/${entry.slug}`,
    image: `/entry-covers/scenes/${entry.slug}.svg`,
    label: entry.entryVisual.label,
    title: entry.label,
    accent: entry.entryVisual.accent,
    meta: `${entry.count} 个案例`,
    description: entry.description
  }))
  const spotlightCards = spotlightEntries.map(entry => ({
    href: `/discover/spotlights/${entry.slug}`,
    image: entry.image,
    label: entry.cover.label,
    title: entry.title,
    accent: entry.cover.accent,
    meta: `${entry.sceneEntries.length} 个场景 · ${entry.demos.length} 个 demo`,
    description: entry.description
  }))
  const quickStartCards = quickStartEntries.map(entry => ({
    href: `/discover/quick-start/${entry.slug}`,
    title: entry.title,
    meta: `${entry.costLabel} · ${entry.spotlights.length} 条路线`,
    description: `${entry.description} 适合：${(entry.fitFor ?? []).slice(0, 2).join(' / ')}`
  }))
  const quickStartFlowCards = quickStartEntries
    .filter(entry => (entry.followUpEntries ?? []).length > 0)
    .slice(0, 3)
    .map(entry => ({
      href: `/discover/quick-start/${entry.slug}`,
      title: `${entry.title} -> ${(entry.followUpPlans ?? []).slice(0, 1).map(item => item.entry.title).join(' / ') || '继续推进'}`,
      meta: `${(entry.followUpPlans ?? []).slice(0, 1).map(item => item.type).join(' / ') || '继续推进'} · ${(entry.followUpEntries ?? []).length} 条下一步`,
      description: (entry.followUpPlans ?? []).slice(0, 1).map(item => item.reason)[0] ?? entry.description
    }))
  const quickStartDeferCards = quickStartEntries
    .filter(entry => (entry.deferPlans ?? []).length > 0)
    .slice(0, 3)
    .map(entry => ({
      href: `/discover/quick-start/${entry.slug}`,
      title: `${entry.title} -> 先不上 ${formatListLabels(entry.deferPlans, 1) || '当前还没有补充'}`,
      meta: `${(entry.deferPlans ?? []).length} 条暂缓判断`,
      description: (entry.deferPlans ?? []).slice(0, 1).map(item => item.reason)[0] ?? entry.description
    }))
  const quickStartTradeoffCards = quickStartEntries
    .filter(entry => (entry.tradeoffNotes ?? []).length > 0)
    .slice(0, 3)
    .map(entry => {
      const item = entry.tradeoffNotes[0]

      return {
        href: `/discover/quick-start/${entry.slug}`,
        title: `${item.preferType} > ${item.deferType}`,
        meta: entry.title,
        description: item.reason
      }
    })
  const quickStartOverdoCards = quickStartEntries
    .filter(entry => (entry.overdoWarnings ?? []).length > 0)
    .slice(0, 3)
    .map(entry => ({
      href: `/discover/quick-start/${entry.slug}`,
      title: `小心做过头：${entry.overdoWarnings?.[0]?.type || '当前还没有补充'}`,
      meta: entry.title,
      description: entry.overdoWarnings?.[0]?.reason ?? entry.description
    }))
  const quickStartFollowUpTypeCards = quickStartFollowUpTypeEntries.map(entry => ({
    href: `/discover/quick-start/follow-up/${entry.slug}`,
    title: entry.label,
    meta: `${entry.plans.length} 条推进顺序 · ${entry.audiences.length} 类角色`,
    description: `${entry.description} 常见角色：${formatListLabels(entry.audiences) || '当前还没有补充角色交叉。'}`
  }))

  return `---
layout: doc
title: 专题发现
description: 从场景、精选与分类入口探索 demo 与内容主题
---

# 专题发现

这一页把当前站点里更适合作为“开始探索”的线索收口到一起。你可以按场景、按精选，也可以按分类进入。

## 多维导航

如果你更习惯按问题类型而不是按目录浏览，可以直接进入多维导航页。

${renderTopicCards([
  {
    href: '/explore/',
    title: '多维导航总览',
    meta: '标签 / 场景 / 难度',
    description: '从三类维度统一进入站点，而不是先决定 demo 所属目录。'
  },
  ...tagEntries.slice(0, 2).map(entry => ({
    href: `/explore/tags/${entry.slug}`,
    title: `标签 · ${entry.label}`,
    meta: `${entry.count} 个 demo`,
    description: entry.description
  })),
  ...difficultyEntries.slice(0, 1).map(entry => ({
    href: `/explore/difficulty/${entry.slug}`,
    title: `难度 · ${entry.label}`,
    meta: `${entry.count} 个 demo`,
    description: entry.description
  }))
])}

## 快速开始

如果你现在不是想按目录逛，而是想先回答“我该从哪里开始”，可以先从问题起步页进入。

  ${renderTopicCards([
  {
    href: '/discover/quick-start/roles/',
    title: '按角色开始',
    meta: `${quickStartAudienceEntries.length} 组角色入口`,
    description: '适合先按前端实现、视觉探索、内容策划等视角找到更贴近自己的起步线，并回看当前角色更常见的下一步推进类型。'
  },
  {
    href: '/discover/quick-start/stages/',
    title: '按项目阶段开始',
    meta: `${quickStartStageEntries.length} 组阶段入口`,
    description: '适合先按验证期、打磨期和上线前回看当前更该先补哪一类反馈，并继续判断当前阶段更常见的推进重点。'
  },
  {
    href: '/discover/quick-start/follow-up/',
    title: '按下一步推进类型开始',
    meta: `${quickStartFollowUpTypeEntries.length} 组推进类型`,
    description: '适合先判断现在要补结构、补反馈、补首屏氛围还是补局部动效，并回看这一步更常见于哪些角色与阶段。'
  }
])}

${renderTopicCards(quickStartCards, '当前还没有可用的快速开始入口。')}

${renderTopicCards(quickStartFlowCards, '当前还没有可用的 quick start 推进表达。')}

${renderTopicCards(quickStartFollowUpTypeCards, '当前还没有可用的推进类型入口。')}

## 按角色 / 阶段理解下一步

${renderTopicCards([
  ...quickStartAudienceEntries.slice(0, 2).map(entry => ({
    href: `/discover/quick-start/roles/${entry.slug}`,
    title: `${entry.label} -> ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
    meta: `${entry.quickStarts.length} 条起步线 · ${entry.followUpTypes.length} 类推进重点`,
    description: entry.followUpTypes[0]?.sampleReason ?? entry.description
  })),
  ...quickStartStageEntries.slice(0, 1).map(entry => ({
    href: `/discover/quick-start/stages/${entry.slug}`,
    title: `${entry.label} -> ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
    meta: `${entry.quickStarts.length} 条起步线 · ${entry.followUpTypes.length} 类推进重点`,
    description: entry.followUpTypes[0]?.sampleReason ?? entry.description
  }))
], '当前还没有可用的交叉判断入口。')}

## 当前先不急着补什么

${renderTopicCards(quickStartDeferCards, '当前还没有可用的暂缓提示。')}

## 为什么当前先补这一类

${renderTopicCards(quickStartTradeoffCards, '当前还没有可用的取舍提示。')}

## 当前最容易做过头的地方

${renderTopicCards(quickStartOverdoCards, '当前还没有可用的 guardrail 提示。')}

## 专题路线

如果你现在面对的是一个更完整的页面问题，而不是单一 scene，可以先从路线级专题进入。

${renderEntryVisualCards(spotlightCards, '当前还没有可用的专题路线。')}

## 按场景开始

${renderEntryVisualCards(sceneCards, '当前还没有可用的场景入口。')}

## 精选策展

<div class="featured-demos">${renderFeaturedCards(featuredDemos.slice(0, 6))}
</div>

## 分类导览

${renderEntryVisualCards(categoryCards, '当前还没有可用的分类入口。')}
`
}

function generateSpotlightIndexPage(spotlightEntries = []) {
  const spotlightCards = spotlightEntries.map(entry => ({
    href: `/discover/spotlights/${entry.slug}`,
    image: entry.image,
    label: entry.cover.label,
    title: entry.title,
    accent: entry.cover.accent,
    meta: `${entry.sceneEntries.length} 个场景 · ${entry.demos.length} 个 demo`,
    description: entry.description
  }))

  return `---
layout: doc
title: 专题路线
description: 按更完整的问题路线组织 scene 与 demo，适合从高层主题进入站点
---

# 专题路线

这里不是只回答“我想看哪个 scene”，而是回答“我现在正在做哪一类页面或模块”。

每条路线都会把相近 scene 和推荐 demo 串起来，帮助你先建立整体判断，再进入具体案例。

${renderEntryVisualCards(spotlightCards, '当前还没有可用的专题路线。')}

## 延伸入口

- [返回专题发现](/discover/)
- [返回多维导航](/explore/)
`
}

function generateQuickStartIndexPage(entries = []) {
  const audienceEntries = buildQuickStartSegmentEntries(entries, 'audiences')
  const stageEntries = buildQuickStartSegmentEntries(entries, 'stages')
  const followUpTypeEntries = buildQuickStartFollowUpTypeEntries(entries)
  const followUpHighlights = entries.filter(entry => (entry.followUpEntries ?? []).length > 0)
  const deferHighlights = entries.filter(entry => (entry.deferPlans ?? []).length > 0)
  const tradeoffHighlights = entries.filter(entry => (entry.tradeoffNotes ?? []).length > 0)
  const overdoHighlights = entries.filter(entry => (entry.overdoWarnings ?? []).length > 0)

  return `---
layout: doc
title: 快速开始
description: 按“我现在想先解决什么问题”组织起步路线，适合作为轻量检索替代入口
---

# 快速开始

这里不是按目录找，也不是重搜索。

它更适合回答一个更直接的问题：

> 我现在正在做什么页面，应该先从哪里开始看？

## 按角色开始

${renderTopicCards(audienceEntries.map(entry => ({
  href: `/discover/quick-start/roles/${entry.slug}`,
  title: entry.label,
  meta: `${entry.quickStarts.length} 条起步线 · ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
  description: `${entry.description} 常见下一步：${formatListLabels(entry.followUpTypes) || '继续推进'}。`
})), '当前还没有可用的角色入口。')}

## 按项目阶段开始

${renderTopicCards(stageEntries.map(entry => ({
  href: `/discover/quick-start/stages/${entry.slug}`,
  title: entry.label,
  meta: `${entry.quickStarts.length} 条起步线 · ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
  description: `${entry.description} 常见下一步：${formatListLabels(entry.followUpTypes) || '继续推进'}。`
})), '当前还没有可用的阶段入口。')}

## 按下一步推进类型开始

${renderTopicCards(followUpTypeEntries.map(entry => ({
  href: `/discover/quick-start/follow-up/${entry.slug}`,
  title: entry.label,
  meta: `${entry.plans.length} 条推进顺序 · ${entry.audiences.length} 类角色`,
  description: `${entry.description} 常见角色：${formatListLabels(entry.audiences) || '当前还没有补充角色交叉。'}`
})), '当前还没有可用的推进类型入口。')}

## 按问题开始

${renderTopicCards(entries.map(entry => ({
  href: `/discover/quick-start/${entry.slug}`,
  title: entry.title,
  meta: `${entry.costLabel} · ${entry.spotlights.length} 条路线`,
  description: `${entry.description} 适合：${(entry.fitFor ?? []).slice(0, 2).join(' / ')}`
})), '当前还没有可用的快速开始入口。')}

## 做完第一步后继续去哪里

${renderTopicCards(followUpHighlights.map(entry => ({
  href: `/discover/quick-start/${entry.slug}`,
  title: `${entry.title} -> ${(entry.followUpPlans ?? []).slice(0, 1).map(item => item.entry.title).join(' / ') || '继续推进'}`,
  meta: `${entry.costLabel} · ${(entry.followUpPlans ?? []).slice(0, 1).map(item => item.type).join(' / ') || '继续推进'}`,
  description: (entry.followUpPlans ?? []).slice(0, 1).map(item => item.reason)[0] ?? entry.description
})), '当前还没有可用的推进顺序。')}

## 当前先不急着补什么

${renderTopicCards(deferHighlights.map(entry => ({
  href: `/discover/quick-start/${entry.slug}`,
  title: `${entry.title} -> 先不上 ${formatListLabels(entry.deferPlans, 1) || '当前还没有补充'}`,
  meta: `${entry.costLabel} · ${(entry.deferPlans ?? []).slice(0, 1).map(item => item.type).join(' / ') || '暂缓判断'}`,
  description: (entry.deferPlans ?? []).slice(0, 1).map(item => item.reason)[0] ?? entry.description
})), '当前还没有可用的暂缓判断。')}

## 为什么当前先补这一类

${renderTopicCards(tradeoffHighlights.map(entry => ({
  href: `/discover/quick-start/${entry.slug}`,
  title: `${entry.tradeoffNotes?.[0]?.preferType || '当前优先'} > ${entry.tradeoffNotes?.[0]?.deferType || '当前暂缓'}`,
  meta: entry.title,
  description: entry.tradeoffNotes?.[0]?.reason ?? entry.description
})), '当前还没有可用的取舍说明。')}

## 当前最容易做过头的地方

${renderTopicCards(overdoHighlights.map(entry => ({
  href: `/discover/quick-start/${entry.slug}`,
  title: `小心做过头：${entry.overdoWarnings?.[0]?.type || '当前还没有补充'}`,
  meta: entry.title,
  description: entry.overdoWarnings?.[0]?.reason ?? entry.description
})), '当前还没有可用的过度设计提醒。')}

## 按角色 / 阶段继续理解下一步

${renderTopicCards([
  ...audienceEntries.slice(0, 2).map(entry => ({
    href: `/discover/quick-start/roles/${entry.slug}`,
    title: `${entry.label} -> ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
    meta: `${entry.quickStarts.length} 条起步线 · ${entry.followUpTypes.length} 类推进重点`,
    description: entry.followUpTypes[0]?.sampleReason ?? entry.description
  })),
  ...stageEntries.slice(0, 1).map(entry => ({
    href: `/discover/quick-start/stages/${entry.slug}`,
    title: `${entry.label} -> ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
    meta: `${entry.quickStarts.length} 条起步线 · ${entry.followUpTypes.length} 类推进重点`,
    description: entry.followUpTypes[0]?.sampleReason ?? entry.description
  }))
], '当前还没有可用的交叉判断入口。')}

## 延伸入口

- [返回专题发现](/discover/)
- [按角色开始](/discover/quick-start/roles/)
- [按阶段开始](/discover/quick-start/stages/)
- [按下一步推进类型开始](/discover/quick-start/follow-up/)
- [返回专题路线](/discover/spotlights/)
- [返回多维导航](/explore/)
`
}

function generateQuickStartSegmentIndexPage({ title, description, intro, basePath, entries = [], emptyText }) {
  return `---
layout: doc
title: ${escapeYamlString(title)}
description: ${escapeYamlString(description)}
---

# ${title}

${intro}

${renderTopicCards(entries.map(entry => ({
  href: `${basePath}/${entry.slug}`,
  title: entry.label,
  meta: `${entry.quickStarts.length} 条起步线 · ${entry.demos.length} 个 demo`,
  description: entry.description
})), emptyText)}

## 延伸入口

- [返回快速开始总览](/discover/quick-start/)
- [返回专题发现](/discover/)
- [返回多维导航](/explore/)
`
}

function generateQuickStartDetailPage(entry) {
  const spotlightCards = entry.spotlights.map(item => ({
    href: `/discover/spotlights/${item.slug}`,
    title: item.title,
    meta: `${item.sceneEntries.length} 个场景 · ${item.demos.length} 个 demo`,
    description: item.description
  }))
  const sceneCards = entry.scenes.map(item => ({
    href: `/explore/scenes/${item.slug}`,
    title: item.label,
    meta: `${item.count} 个 demo`,
    description: item.description
  }))
  const relatedJournals = getRelatedJournalEntriesByDemos(entry.relatedDemos)
  const followUpTypeLabels = Array.from(new Set((entry.followUpPlans ?? []).map(item => item.type)))
  const audiencePerspectiveCards = (entry.audiences ?? []).map(label => ({
    href: `/discover/quick-start/roles/${(quickStartAudienceMeta[label] ?? { slug: slugifyTerm(label) }).slug}`,
    title: `${label} 视角`,
    meta: formatListLabels(followUpTypeLabels, 2) || '继续推进',
    description: `如果你主要从${label}视角继续推进，这一步更常见的是：${formatListLabels(followUpTypeLabels, 2) || '继续推进'}。`
  }))
  const stagePerspectiveCards = (entry.stages ?? []).map(label => ({
    href: `/discover/quick-start/stages/${(quickStartStageMeta[label] ?? { slug: slugifyTerm(label) }).slug}`,
    title: `${label}`,
    meta: formatListLabels(followUpTypeLabels, 2) || '继续推进',
    description: `如果你当前处在${label}，继续推进时更适合优先判断：${formatListLabels(followUpTypeLabels, 2) || '继续推进'}。`
  }))
  const deferCards = (entry.deferPlans ?? []).map(item => ({
    href: `/discover/quick-start/follow-up/${item.typeSlug}`,
    title: `先不上 ${item.type}`,
    meta: '当前先不急着补',
    description: item.reason
  }))
  const tradeoffCards = (entry.tradeoffNotes ?? []).map(item => ({
    href: `/discover/quick-start/follow-up/${item.preferSlug}`,
    title: `${item.preferType} > ${item.deferType}`,
    meta: '当前推进取舍',
    description: item.reason
  }))
  const overdoCards = (entry.overdoWarnings ?? []).map(item => ({
    href: `/discover/quick-start/follow-up/${item.typeSlug}`,
    title: `小心做过头：${item.type}`,
    meta: '当前 guardrail',
    description: item.reason
  }))

  return `---
layout: doc
title: ${escapeYamlString(`快速开始 · ${entry.title}`)}
description: ${escapeYamlString(entry.description)}
---

# 快速开始 · ${entry.title}

${entry.description}

## 决策摘要

- 角色：${(entry.audiences ?? []).join(' / ') || '当前还没有补充角色分层。'}
- 阶段：${(entry.stages ?? []).join(' / ') || '当前还没有补充阶段分层。'}
- 适合：${(entry.fitFor ?? []).join(' / ') || '当前还没有补充适用语义。'}
- 改造成本：${entry.costLabel ?? '当前还没有补充成本判断。'}
- 第一版预期：${entry.firstWin ?? '当前还没有补充第一版预期。'}

## 按角色 / 阶段回看

### 适合角色

${renderBrowseLinkChipList((entry.audiences ?? []).map(label => ({
  href: `/discover/quick-start/roles/${(quickStartAudienceMeta[label] ?? { slug: slugifyTerm(label) }).slug}`,
  label
})), '当前还没有可回看的角色入口。')}

### 当前阶段

${renderBrowseLinkChipList((entry.stages ?? []).map(label => ({
  href: `/discover/quick-start/stages/${(quickStartStageMeta[label] ?? { slug: slugifyTerm(label) }).slug}`,
  label
})), '当前还没有可回看的阶段入口。')}

## 为什么从这里开始

${entry.prompt}

## 推荐步骤

${renderBulletSection(entry.firstActions, '当前还没有补充推荐步骤。')}

## 怎么选

${renderBulletSection(entry.chooseTips, '当前还没有补充选择建议。')}

## 先避开什么

${renderBulletSection(entry.avoidPitfalls, '当前还没有补充误区提醒。')}

## 何时先不上

${renderBulletSection(entry.skipIf, '当前还没有补充“何时先不上”的提醒。')}

## 推荐先走的路线

${renderTopicCards(spotlightCards, '当前还没有可用的路线入口。')}

## 先看的场景

${renderTopicCards(sceneCards, '当前还没有可用的场景入口。')}

## 推荐先看的案例

${renderMiniCards(entry.relatedDemos)}

## 做完第一版后，下一步建议

${renderBulletSection(entry.followUpReason, '当前还没有补充下一步建议。')}

${renderTopicCards((entry.followUpPlans ?? []).map(item => ({
  href: `/discover/quick-start/${item.entry.slug}`,
  title: item.entry.title,
  meta: `${item.type} · ${formatListLabels(item.entry.audiences, 1) || '通用'} · ${formatListLabels(item.entry.stages, 1) || '当前阶段'}`,
  description: item.reason
})), '当前还没有可继续接的 quick start。')}

## 按推进类型继续回看

${renderBrowseLinkChipList((entry.followUpPlans ?? []).map(item => ({
  href: `/discover/quick-start/follow-up/${item.typeSlug}`,
  label: item.type
})), '当前还没有可回看的推进类型入口。')}

${deferCards.length ? `## 当前先不急着补什么

${renderTopicCards(deferCards, '当前还没有可用的暂缓判断。')}
` : ''}

${tradeoffCards.length ? `## 为什么当前先补这一类

${renderTopicCards(tradeoffCards, '当前还没有可用的取舍说明。')}
` : ''}

${overdoCards.length ? `## 当前最容易做过头的地方

${renderTopicCards(overdoCards, '当前还没有可用的过度设计提醒。')}
` : ''}

${audiencePerspectiveCards.length || stagePerspectiveCards.length ? `## 从角色 / 阶段继续判断

${audiencePerspectiveCards.length ? `### 角色视角

${renderTopicCards(audiencePerspectiveCards, '当前还没有可回看的角色视角。')}
` : ''}
${stagePerspectiveCards.length ? `### 项目阶段

${renderTopicCards(stagePerspectiveCards, '当前还没有可回看的项目阶段。')}
` : ''}` : ''}

## 相关开发笔记

${renderJournalCards(relatedJournals)}

## 延伸入口

- [返回快速开始总览](/discover/quick-start/)
- [按角色开始](/discover/quick-start/roles/)
- [按阶段开始](/discover/quick-start/stages/)
- [按下一步推进类型开始](/discover/quick-start/follow-up/)
- [返回专题发现](/discover/)
- [返回多维导航](/explore/)
`
}

function generateQuickStartSegmentDetailPage(entry, { titlePrefix, dimensionLabel, basePath }) {
  const spotlightCards = entry.spotlights.map(item => ({
    href: `/discover/spotlights/${item.slug}`,
    title: item.title,
    meta: `${item.sceneEntries.length} 个场景 · ${item.demos.length} 个 demo`,
    description: item.description
  }))
  const sceneCards = entry.scenes.map(item => ({
    href: `/explore/scenes/${item.slug}`,
    title: item.label,
    meta: `${item.count} 个 demo`,
    description: item.description
  }))
  const relatedJournals = getRelatedJournalEntriesByDemos(entry.demos)
  const followUpTypeCards = (entry.followUpTypes ?? []).map(item => ({
    href: `/discover/quick-start/follow-up/${item.slug}`,
    title: item.label,
    meta: `${item.count} 次被提到`,
    description: item.sampleReason ?? item.description
  }))
  const deferTypeCards = (entry.deferTypes ?? []).map(item => ({
    href: `/discover/quick-start/follow-up/${item.slug}`,
    title: `先不上 ${item.label}`,
    meta: `${item.count} 次被提到`,
    description: item.sampleReason ?? item.description
  }))
  const tradeoffCards = (entry.tradeoffs ?? []).map(item => ({
    href: `/discover/quick-start/${item.source.slug}`,
    title: `${item.preferType} > ${item.deferType}`,
    meta: item.source.title,
    description: item.reason
  }))
  const overdoCards = (entry.overdoWarnings ?? []).map(item => ({
    href: `/discover/quick-start/follow-up/${item.slug}`,
    title: `小心做过头：${item.label}`,
    meta: `${item.count} 次被提到`,
    description: item.sampleReason ?? item.description
  }))
  const audienceCards = (entry.audiences ?? []).map(item => ({
    href: `/discover/quick-start/roles/${item.slug}`,
    title: item.label,
    meta: `${item.count} 条关联起步线`,
    description: item.description
  }))
  const stageCards = (entry.stages ?? []).map(item => ({
    href: `/discover/quick-start/stages/${item.slug}`,
    title: item.label,
    meta: `${item.count} 条关联起步线`,
    description: item.description
  }))
  const planCards = (entry.plans ?? []).map(item => ({
    href: `/discover/quick-start/${item.source.slug}`,
    title: `${item.source.title} -> ${item.target.title}`,
    meta: `${item.type} · ${formatListLabels(item.target.audiences, 1) || '通用'} · ${formatListLabels(item.target.stages, 1) || '当前阶段'}`,
    description: item.reason
  }))
  const followUpTypeHeading = dimensionLabel === '下一步推进类型'
    ? '当前类型下更常见的后续推进类型'
    : `当前${dimensionLabel}更常见的下一步推进类型`
  const deferTypeHeading = dimensionLabel === '下一步推进类型'
    ? '当前类型下更适合暂缓的推进类型'
    : `当前${dimensionLabel}更适合暂缓的推进类型`

  return `---
layout: doc
title: ${escapeYamlString(`${titlePrefix} · ${entry.label}`)}
description: ${escapeYamlString(entry.description)}
---

# ${titlePrefix} · ${entry.label}

${entry.description}

## 当前聚合情况

- 维度：${dimensionLabel}
- 起步线：${entry.quickStarts.length} 条
- 相关路线：${entry.spotlights.length} 条
- 相关场景：${entry.scenes.length} 个
- 推荐案例：${entry.demos.length} 个

## 推荐先走的起步线

${renderTopicCards(entry.quickStarts.map(item => ({
  href: `/discover/quick-start/${item.slug}`,
  title: item.title,
  meta: `${item.costLabel} · ${(item.fitFor ?? []).slice(0, 2).join(' / ')}`,
  description: item.description
})), '当前还没有可用的起步线。')}

${followUpTypeCards.length ? `## ${followUpTypeHeading}

${renderTopicCards(followUpTypeCards, '当前还没有可用的推进类型。')}
` : ''}

${deferTypeCards.length ? `## ${deferTypeHeading}

${renderTopicCards(deferTypeCards, '当前还没有可用的暂缓判断。')}
` : ''}

${tradeoffCards.length ? `## 当前更常见的推进取舍

${renderTopicCards(tradeoffCards, '当前还没有可用的取舍说明。')}
` : ''}

${overdoCards.length ? `## 当前最容易做过头的地方

${renderTopicCards(overdoCards, '当前还没有可用的过度设计提醒。')}
` : ''}

${planCards.length ? `## 常见推进顺序

${renderTopicCards(planCards, '当前还没有可用的推进顺序。')}
` : ''}

${audienceCards.length ? `## 这类推进更常见的角色视角

${renderTopicCards(audienceCards, '当前还没有可用的角色视角。')}
` : ''}

${stageCards.length ? `## 这类推进更常见的项目阶段

${renderTopicCards(stageCards, '当前还没有可用的项目阶段。')}
` : ''}

## 推荐先走的路线

${renderTopicCards(spotlightCards, '当前还没有可用的路线入口。')}

## 推荐先看的场景

${renderTopicCards(sceneCards, '当前还没有可用的场景入口。')}

## 推荐先看的案例

${renderMiniCards(entry.demos)}

## 相关开发笔记

${renderJournalCards(relatedJournals)}

## 延伸入口

- [返回上一层总览](${basePath}/)
- [返回快速开始总览](/discover/quick-start/)
- [返回专题发现](/discover/)
- [返回多维导航](/explore/)
`
}

function generateSpotlightDetailPage(entry) {
  const sceneCards = entry.sceneEntries.map(sceneEntry => ({
    href: `/explore/scenes/${sceneEntry.slug}`,
    title: sceneEntry.label,
    meta: `${sceneEntry.count} 个 demo`,
    description: sceneEntry.description
  }))
  const relatedJournals = getRelatedJournalEntriesByDemos(entry.demos)

  return `---
layout: doc
title: ${escapeYamlString(`专题路线 · ${entry.title}`)}
description: ${escapeYamlString(entry.description)}
---

# 专题路线 · ${entry.title}

${entry.description}

## 为什么从这里开始

${renderBulletSection(entry.whyStart, '当前还没有补充路线进入说明。')}

## 这条路线包含什么

${renderTopicCards(sceneCards, '当前还没有可用的场景入口。')}

## 推荐先看

${renderMiniCards(entry.featuredDemos)}

## 全部相关案例

${renderMiniCards(entry.demos)}

## 相关开发笔记

${renderJournalCards(relatedJournals)}

## 延伸入口

- [返回专题路线总览](/discover/spotlights/)
- [返回专题发现](/discover/)
- [返回多维导航](/explore/)
`
}

function generateJournalIndex(entries = journalEntries) {
  return `---
layout: doc
title: 开发笔记
description: 记录展示站重构、内容治理和发布标准化的阶段笔记
---

# 开发笔记

这里收录当前项目的重要阶段笔记。它们不是代码清单，而是解释“为什么这样做”的内容入口。

## 最近更新

${renderJournalCards(entries)}
`
}

function generateExploreHomePage(demos) {
  const tagEntries = buildTagEntries(demos)
  const sceneEntries = buildSceneEntries(demos)
  const difficultyEntries = buildDifficultyEntries(demos)
  const narrativeSceneEntries = sceneEntries
    .filter(entry => entry.narrative)
    .slice(0, 6)
  const sceneCards = sceneEntries.slice(0, 12).map(entry => ({
    href: `/explore/scenes/${entry.slug}`,
    image: `/entry-covers/scenes/${entry.slug}.svg`,
    label: entry.entryVisual.label,
    title: entry.label,
    accent: entry.entryVisual.accent,
    meta: `${entry.count} 个 demo`,
    description: entry.description
  }))
  const narrativeSceneCards = narrativeSceneEntries.map(entry => ({
    href: `/explore/scenes/${entry.slug}`,
    image: `/entry-covers/scenes/${entry.slug}.svg`,
    label: entry.entryVisual.label,
    title: entry.label,
    accent: entry.entryVisual.accent,
    meta: `${entry.count} 个 demo`,
    description: entry.description
  }))

  return `---
layout: doc
title: 多维导航
description: 按标签、场景与难度重新组织 demo 浏览路径
---

# 多维导航

这里不是按目录找 demo，而是按“我现在想解决什么问题”来重新进入站点。

## 可以怎么用

1. 如果你已经知道实现方向，可以先看标签。
2. 如果你更关心落地场景，可以先看场景。
3. 如果你想控制复杂度，可以先按难度进入。

## 标签入口

${renderTopicCards(tagEntries.slice(0, 12).map(entry => ({
  href: `/explore/tags/${entry.slug}`,
  title: entry.label,
  meta: `${entry.count} 个 demo`,
  description: entry.description
})), '当前还没有可用的标签入口。')}

- [查看全部标签](/explore/tags/)

## 场景入口

${renderEntryVisualCards(sceneCards, '当前还没有可用的场景入口。')}

- [查看全部场景](/explore/scenes/)

## 优先看的公共场景

${renderEntryVisualCards(narrativeSceneCards, '当前还没有补到适合优先进入的公共场景。')}

## 难度入口

${renderTopicCards(difficultyEntries.map(entry => ({
  href: `/explore/difficulty/${entry.slug}`,
  title: entry.label,
  meta: `${entry.count} 个 demo`,
  description: entry.description
})), '当前还没有可用的难度入口。')}

- [查看全部难度](/explore/difficulty/)
`
}

function generateExploreIndexPage({ title, description, intro, entries, basePath, emptyText }) {
  const featuredEntries = basePath === '/explore/scenes'
    ? entries.filter(entry => entry.narrative).slice(0, 6)
    : []

  return `---
layout: doc
title: ${escapeYamlString(title)}
description: ${escapeYamlString(description)}
---

# ${title}

${intro}

${renderTopicCards(entries.map(entry => ({
  href: `${basePath}/${entry.slug}`,
  title: entry.label,
  meta: `${entry.count} 个 demo`,
  description: entry.description
})), emptyText)}

${featuredEntries.length ? `## 优先进入

${renderTopicCards(featuredEntries.map(entry => ({
  href: `${basePath}/${entry.slug}`,
  title: entry.label,
  meta: `${entry.count} 个 demo`,
  description: entry.description
})), '')}
` : ''}

## 延伸入口

- [返回多维导航总览](/explore/)
- [返回专题发现](/discover/)
`
}

function generateExploreDetailPage({ title, dimensionLabel, description, entry, basePath }) {
  const relatedJournals = getRelatedJournalEntriesByDemos(entry.demos)
  const categoryHints = Array.from(new Set(entry.demos.map(demo => demo.categoryName))).slice(0, 4)
  const featuredDemos = sortDemosByCuratedPriority(entry.demos).slice(0, 3)
  const narrative = entry.narrative

  return `---
layout: doc
title: ${escapeYamlString(title)}
description: ${escapeYamlString(description)}
---

# ${title}

- 维度：${dimensionLabel}
- 收录案例：${entry.count}
- 代表案例：${entry.representative ? `[${entry.representative.title}](/demos/${entry.representative.categoryId}/${entry.representative.id})` : '当前暂无'}

## 为什么从这里开始

${description}

${dimensionLabel === '场景' && narrative ? `## 什么时候从这里进入

${renderBulletSection(narrative.whenToUse, '当前还没有补充场景进入说明。')}

## 挑选建议

${renderBulletSection(narrative.selectionTips, '当前还没有补充场景挑选建议。')}
` : ''}

## 维度线索

${renderBrowseChipList(categoryHints, '当前还没有可用的分类线索。')}

## 推荐先看

${renderMiniCards(featuredDemos)}

## 全部案例

${renderMiniCards(entry.demos)}

## 相关开发笔记

${renderJournalCards(relatedJournals)}

## 延伸入口

- [返回 ${dimensionLabel} 总览](${basePath}/)
- [返回多维导航总览](/explore/)
- [返回专题发现](/discover/)
`
}

function generateJournalPage(entry, demos) {
  const relatedDemos = (entry.relatedDemoIds ?? [])
    .map(id => demos.find(demo => demo.id === id))
    .filter(Boolean)
  const relatedEntries = getRelatedJournalEntries(entry)
  const neighbors = getJournalNeighbors(entry)
  const neighborEntries = [neighbors.previous, neighbors.next].filter(Boolean)

  return `---
layout: doc
title: ${escapeYamlString(entry.title)}
description: ${escapeYamlString(entry.description)}
---

# ${entry.title}

- 日期：${entry.date}
- 类型：开发笔记
- 原始文档：\`${entry.sourcePath}\`

## 摘要

${entry.summary.map(item => `- ${item}`).join('\n')}

## 关键主题

${renderBrowseChipList(entry.highlights, '当前还没有补充关键主题。')}

## 相关 Demo

${renderMiniCards(relatedDemos)}

## 为什么值得读

${entry.description}

## 继续阅读

${renderJournalCards(relatedEntries)}

## 邻接笔记

${renderJournalCards(neighborEntries)}

## 延伸入口

- [返回开发笔记列表](/journal/)
- [查看项目进度](/guide/progress)
- [查看里程碑规划](/guide/roadmap)
`
}

function generateHomePage(groupedCategories, featuredDemos) {
  const totalCount = groupedCategories.reduce((sum, category) => sum + category.demos.length, 0)
  const curatedCount = featuredDemos.filter(demo => demo.featured).length
  const allDemos = groupedCategories.flatMap(category => category.demos)
  const sceneEntries = getSceneEntries(allDemos, 6)
  const fullSceneEntries = buildSceneEntries(allDemos)
  const allSpotlightEntries = buildSpotlightEntries(allDemos, fullSceneEntries)
  const quickStartEntries = buildQuickStartEntries(allDemos, fullSceneEntries, allSpotlightEntries)
  const quickStartAudienceEntries = buildQuickStartSegmentEntries(quickStartEntries, 'audiences')
  const quickStartStageEntries = buildQuickStartSegmentEntries(quickStartEntries, 'stages')
  const quickStartFollowUpTypeEntries = buildQuickStartFollowUpTypeEntries(quickStartEntries)
  const spotlightEntries = allSpotlightEntries.slice(0, 4)
  const quickStartCards = quickStartEntries.slice(0, 4).map(entry => ({
    href: `/discover/quick-start/${entry.slug}`,
    title: entry.title,
    meta: `${entry.costLabel} · ${entry.spotlights.length} 条路线`,
    description: `${entry.description} 适合：${(entry.fitFor ?? []).slice(0, 2).join(' / ')}`
  }))
  const quickStartFlowCards = quickStartEntries
    .filter(entry => (entry.followUpEntries ?? []).length > 0)
    .slice(0, 3)
    .map(entry => ({
      href: `/discover/quick-start/${entry.slug}`,
      title: `${entry.title} -> ${(entry.followUpPlans ?? []).slice(0, 1).map(item => item.entry.title).join(' / ') || '继续推进'}`,
      meta: `${(entry.followUpPlans ?? []).slice(0, 1).map(item => item.type).join(' / ') || '继续推进'} · ${(entry.followUpEntries ?? []).length} 条下一步`,
      description: (entry.followUpPlans ?? []).slice(0, 1).map(item => item.reason)[0] ?? entry.description
    }))
  const quickStartDeferCards = quickStartEntries
    .filter(entry => (entry.deferPlans ?? []).length > 0)
    .slice(0, 3)
    .map(entry => ({
      href: `/discover/quick-start/${entry.slug}`,
      title: `${entry.title} -> 先不上 ${formatListLabels(entry.deferPlans, 1) || '当前还没有补充'}`,
      meta: `${(entry.deferPlans ?? []).length} 条暂缓判断`,
      description: (entry.deferPlans ?? []).slice(0, 1).map(item => item.reason)[0] ?? entry.description
    }))
  const quickStartFollowUpTypeCards = quickStartFollowUpTypeEntries.slice(0, 3).map(entry => ({
    href: `/discover/quick-start/follow-up/${entry.slug}`,
    title: entry.label,
    meta: `${entry.plans.length} 条推进顺序 · ${entry.stages.length} 个阶段`,
    description: `${entry.description} 常见阶段：${formatListLabels(entry.stages) || '当前还没有补充阶段交叉。'}`
  }))
  const quickStartCrossCards = [
    ...quickStartAudienceEntries.slice(0, 2).map(entry => ({
      href: `/discover/quick-start/roles/${entry.slug}`,
      title: `${entry.label} -> ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
      meta: `${entry.quickStarts.length} 条起步线 · ${entry.followUpTypes.length} 类推进重点`,
      description: entry.followUpTypes[0]?.sampleReason ?? entry.description
    })),
    ...quickStartStageEntries.slice(0, 1).map(entry => ({
      href: `/discover/quick-start/stages/${entry.slug}`,
      title: `${entry.label} -> ${formatListLabels(entry.followUpTypes, 1) || '继续推进'}`,
      meta: `${entry.quickStarts.length} 条起步线 · ${entry.followUpTypes.length} 类推进重点`,
      description: entry.followUpTypes[0]?.sampleReason ?? entry.description
    }))
  ]
  const tagEntries = buildTagEntries(allDemos).slice(0, 3)
  const difficultyEntries = buildDifficultyEntries(allDemos)
  const categoryCards = groupedCategories.map(category => ({
    href: `/demos/${category.id}/`,
    image: `/entry-covers/categories/${category.id}.svg`,
    label: category.entryVisual.label,
    title: `${category.icon} ${category.name}`,
    accent: category.entryVisual.accent,
    meta: `${category.demos.length} 个 demo`,
    description: category.description
  }))
  const sceneCards = sceneEntries.map(entry => ({
    href: `/explore/scenes/${slugifyTerm(entry.scene)}`,
    image: `/entry-covers/scenes/${slugifyTerm(entry.scene)}.svg`,
    label: getSceneEntryVisual(entry.scene).label,
    title: entry.scene,
    accent: getSceneEntryVisual(entry.scene).accent,
    meta: `${entry.count} 个案例`,
    description: `先从 ${entry.representative.title} 这类案例进入，更容易建立直观判断。`
  }))
  const spotlightCards = spotlightEntries.map(entry => ({
    href: `/discover/spotlights/${entry.slug}`,
    image: entry.image,
    label: entry.cover.label,
    title: entry.title,
    accent: entry.cover.accent,
    meta: `${entry.sceneEntries.length} 个场景 · ${entry.demos.length} 个 demo`,
    description: entry.description
  }))

  return `---
layout: home
title: My Program Demo Collection
description: 收集整理各种前端 demo，支持分类浏览、详情页和隔离预览
---

# My Program Demo Collection

重构后的展示站点已经把原始 demo 统一整理为可搜索、可分类浏览的文档站。当前这一轮重构的重点，是把历史静态页面进一步沉淀成长期可维护的内容库。

- 当前已收录 **${totalCount}** 个 demo
- 覆盖 **${groupedCategories.length}** 个主分类
- 每个 demo 提供详情页、源码目录链接与原始页面入口
- 首页精选目前由 **${curatedCount}** 个 metadata 驱动条目参与编排
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

${renderEntryVisualCards(categoryCards, '当前还没有可用的分类入口。')}

## 精选 Demo

首页精选不再按顺序截取，而是优先展示显式标记的推荐 demo，并附带推荐理由与封面策展层。

<div class="featured-demos">${renderFeaturedCards(featuredDemos)}
</div>

## 按场景开始

如果你不是按技术栈找 demo，也可以从常见场景开始。

${renderEntryVisualCards(sceneCards, '当前还没有可用的场景入口。')}

## 专题路线

如果你面对的是一个更完整的页面问题，也可以先从专题路线进入。

${renderEntryVisualCards(spotlightCards, '当前还没有可用的专题路线。')}

## 按问题开始

如果你现在更关心“我该先做什么”，可以直接从具体问题起步线进入。

${renderTopicCards(quickStartCards, '当前还没有可用的问题起步入口。')}

## 做完第一步后继续推进

${renderTopicCards(quickStartFlowCards, '当前还没有可用的推进顺序。')}

## 按下一步推进类型继续看

${renderTopicCards(quickStartFollowUpTypeCards, '当前还没有可用的推进类型入口。')}

## 当前先不急着补什么

${renderTopicCards(quickStartDeferCards, '当前还没有可用的暂缓判断。')}

## 从角色 / 阶段继续判断下一步

${renderTopicCards(quickStartCrossCards, '当前还没有可用的交叉判断入口。')}

## 内容入口

除了 demo 浏览，现在也可以从阶段笔记和专题发现进入站点内容。

<div class="topic-card-grid">
  <a class="topic-card" href="/journal/">
    <strong>开发笔记</strong>
    <span>${journalEntries.length} 篇记录</span>
    <small>回看每一轮重构为什么这样推进，以及当时的取舍和验证方式。</small>
  </a>
  <a class="topic-card" href="/discover/">
    <strong>专题发现</strong>
    <span>${sceneEntries.length} 个场景入口</span>
    <small>按场景、精选和分类重新开始探索，而不只是按目录查找。</small>
  </a>
  <a class="topic-card" href="/discover/spotlights/">
    <strong>专题路线</strong>
    <span>${allSpotlightEntries.length} 条路线</span>
    <small>把相近 scene 和推荐 demo 串成更完整的问题入口，适合先建立整体判断。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/">
    <strong>快速开始</strong>
    <span>${quickStartEntries.length} 条起步线</span>
    <small>按“我现在想先做什么”组织入口，适合作为轻量检索替代方案。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/roles/">
    <strong>按角色开始</strong>
    <span>${quickStartAudienceEntries.length} 组角色入口</span>
    <small>从前端实现、视觉探索、内容策划等视角更快找到适合自己的起步线，并回看当前角色更常见的推进重点。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/stages/">
    <strong>按项目阶段开始</strong>
    <span>${quickStartStageEntries.length} 组阶段入口</span>
    <small>从验证期、打磨期和上线前切入，更快判断当前该先补什么，以及当前阶段更常见的继续推进类型。</small>
  </a>
  <a class="topic-card" href="/discover/quick-start/follow-up/">
    <strong>按下一步推进类型开始</strong>
    <span>${quickStartFollowUpTypeEntries.length} 组推进类型</span>
    <small>先判断现在更该补结构、补反馈、补首屏氛围还是补局部动效，再回看这一步更常见于哪些角色和阶段。</small>
  </a>
  <a class="topic-card" href="/explore/">
    <strong>多维导航</strong>
    <span>${tagEntries.length + difficultyEntries.length} 条快速入口</span>
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
`
}

function writeSidebarModule(sidebar) {
  const fileContent = `export const generatedSidebar = ${JSON.stringify(sidebar, null, 2)}\n`
  writeFile(path.join(generatedDir, 'demo-sidebar.mjs'), fileContent)
}

async function main() {
  resetGeneratedMarkdown()

  const demos = scanDemos()
  generateCoverAssets()
  const groupedCategories = groupDemosByCategory(demos)
  const sidebar = createSidebar(demos)
  const featuredDemos = getFeaturedDemos(demos, 8)
  const tagEntries = buildTagEntries(demos)
  const sceneEntries = buildSceneEntries(demos)
  const spotlightEntries = buildSpotlightEntries(demos, sceneEntries)
  const quickStartEntries = buildQuickStartEntries(demos, sceneEntries, spotlightEntries)
  const quickStartAudienceEntries = buildQuickStartSegmentEntries(quickStartEntries, 'audiences')
  const quickStartStageEntries = buildQuickStartSegmentEntries(quickStartEntries, 'stages')
  const quickStartFollowUpTypeEntries = buildQuickStartFollowUpTypeEntries(quickStartEntries)
  const difficultyEntries = buildDifficultyEntries(demos)
  const pageSeoSpecs = buildPageSeoSpecs(
    groupedCategories,
    demos,
    tagEntries,
    sceneEntries,
    difficultyEntries,
    spotlightEntries,
    quickStartEntries,
    quickStartAudienceEntries,
    quickStartStageEntries,
    quickStartFollowUpTypeEntries
  )
  const releaseManifest = buildReleaseManifest(
    groupedCategories,
    demos,
    tagEntries,
    sceneEntries,
    difficultyEntries,
    pageSeoSpecs,
    quickStartEntries,
    quickStartAudienceEntries,
    quickStartStageEntries,
    quickStartFollowUpTypeEntries
  )

  for (const category of groupedCategories) {
    const categoryDir = path.join(demosDir, category.id)
    ensureDir(categoryDir)
    writeFile(path.join(categoryDir, 'index.md'), generateCategoryIndex(category))

    for (const demo of category.demos) {
      writeFile(path.join(categoryDir, `${demo.id}.md`), generateDemoPage(demo, demos, spotlightEntries))
    }
  }

  writeFile(path.join(docsSiteDir, 'index.md'), generateHomePage(groupedCategories, featuredDemos))
  writeFile(path.join(docsSiteDir, 'discover/index.md'), generateDiscoverPage(groupedCategories, featuredDemos))
  writeFile(path.join(docsSiteDir, 'discover/quick-start/index.md'), generateQuickStartIndexPage(quickStartEntries))
  writeFile(path.join(docsSiteDir, 'discover/quick-start/roles/index.md'), generateQuickStartSegmentIndexPage({
    title: '快速开始 · 按角色开始',
    description: '按当前角色聚合 quick start 起步线，更快找到贴近自己视角的开始方式。',
    intro: '如果你已经知道自己更偏前端实现、视觉探索、内容策划或组件试验，可以先从角色视角聚合入口开始。',
    basePath: '/discover/quick-start/roles',
    entries: quickStartAudienceEntries,
    emptyText: '当前还没有可用的角色入口。'
  }))
  writeFile(path.join(docsSiteDir, 'discover/quick-start/stages/index.md'), generateQuickStartSegmentIndexPage({
    title: '快速开始 · 按阶段开始',
    description: '按项目当前阶段聚合 quick start 起步线，帮助更快判断下一步先补什么。',
    intro: '如果你已经知道项目还在验证期、信息成型期、打磨期或上线前，可以先从当前阶段视角聚合入口开始。',
    basePath: '/discover/quick-start/stages',
    entries: quickStartStageEntries,
    emptyText: '当前还没有可用的阶段入口。'
  }))
  writeFile(path.join(docsSiteDir, 'discover/quick-start/follow-up/index.md'), generateQuickStartSegmentIndexPage({
    title: '快速开始 · 按下一步推进类型开始',
    description: '按“先补结构、先补反馈还是先补首屏氛围”聚合 quick start 的下一步建议。',
    intro: '如果你已经知道第一版跑通之后更该补结构、补反馈、补首屏氛围还是补局部动效，可以先从推进类型入口开始。',
    basePath: '/discover/quick-start/follow-up',
    entries: quickStartFollowUpTypeEntries,
    emptyText: '当前还没有可用的推进类型入口。'
  }))
  writeFile(path.join(docsSiteDir, 'discover/spotlights/index.md'), generateSpotlightIndexPage(spotlightEntries))
  writeFile(path.join(docsSiteDir, 'guide/release-status.md'), generateReleaseStatusPage(releaseManifest))
  writeFile(path.join(docsSiteDir, 'explore/index.md'), generateExploreHomePage(demos))
  writeFile(path.join(docsSiteDir, 'explore/tags/index.md'), generateExploreIndexPage({
    title: '标签导航',
    description: '按标签聚合 demo，适合按实现方式继续浏览',
    intro: '标签更适合回答“我想找哪类实现方式”。这里把所有可用标签集中成入口页。',
    entries: tagEntries,
    basePath: '/explore/tags',
    emptyText: '当前还没有可用的标签入口。'
  }))
  writeFile(path.join(docsSiteDir, 'explore/scenes/index.md'), generateExploreIndexPage({
    title: '场景导航',
    description: '按应用场景聚合 demo，适合按落地问题继续浏览',
    intro: '场景更适合回答“我现在在做什么页面或模块”。这里把可复用场景集中成入口页。',
    entries: sceneEntries,
    basePath: '/explore/scenes',
    emptyText: '当前还没有可用的场景入口。'
  }))
  writeFile(path.join(docsSiteDir, 'explore/difficulty/index.md'), generateExploreIndexPage({
    title: '难度导航',
    description: '按实现复杂度聚合 demo，适合控制改造成本与学习节奏',
    intro: '难度更适合回答“我现在想找多复杂的案例”。这里把站点案例按复杂度重新组织。',
    entries: difficultyEntries,
    basePath: '/explore/difficulty',
    emptyText: '当前还没有可用的难度入口。'
  }))
  writeFile(path.join(docsSiteDir, 'journal/index.md'), generateJournalIndex())

  for (const entry of journalEntries) {
    writeFile(path.join(docsSiteDir, 'journal', `${entry.slug}.md`), generateJournalPage(entry, demos))
  }

  for (const entry of spotlightEntries) {
    writeFile(path.join(docsSiteDir, 'discover/spotlights', `${entry.slug}.md`), generateSpotlightDetailPage(entry))
  }

  for (const entry of quickStartEntries) {
    writeFile(path.join(docsSiteDir, 'discover/quick-start', `${entry.slug}.md`), generateQuickStartDetailPage(entry))
  }

  for (const entry of quickStartAudienceEntries) {
    writeFile(path.join(docsSiteDir, 'discover/quick-start/roles', `${entry.slug}.md`), generateQuickStartSegmentDetailPage(entry, {
      titlePrefix: '快速开始 · 角色',
      dimensionLabel: '角色',
      basePath: '/discover/quick-start/roles'
    }))
  }

  for (const entry of quickStartStageEntries) {
    writeFile(path.join(docsSiteDir, 'discover/quick-start/stages', `${entry.slug}.md`), generateQuickStartSegmentDetailPage(entry, {
      titlePrefix: '快速开始 · 阶段',
      dimensionLabel: '项目阶段',
      basePath: '/discover/quick-start/stages'
    }))
  }

  for (const entry of quickStartFollowUpTypeEntries) {
    writeFile(path.join(docsSiteDir, 'discover/quick-start/follow-up', `${entry.slug}.md`), generateQuickStartSegmentDetailPage(entry, {
      titlePrefix: '快速开始 · 推进类型',
      dimensionLabel: '下一步推进类型',
      basePath: '/discover/quick-start/follow-up'
    }))
  }

  for (const entry of tagEntries) {
    writeFile(path.join(docsSiteDir, 'explore/tags', `${entry.slug}.md`), generateExploreDetailPage({
      title: `标签 · ${entry.label}`,
      dimensionLabel: '标签',
      description: entry.description,
      entry,
      basePath: '/explore/tags'
    }))
  }

  for (const entry of sceneEntries) {
    writeFile(path.join(docsSiteDir, 'explore/scenes', `${entry.slug}.md`), generateExploreDetailPage({
      title: `场景 · ${entry.label}`,
      dimensionLabel: '场景',
      description: entry.description,
      entry,
      basePath: '/explore/scenes'
    }))
  }

  for (const entry of difficultyEntries) {
    writeFile(path.join(docsSiteDir, 'explore/difficulty', `${entry.slug}.md`), generateExploreDetailPage({
      title: `难度 · ${entry.label}`,
      dimensionLabel: '难度',
      description: entry.description,
      entry,
      basePath: '/explore/difficulty'
    }))
  }

  writeSeoAssets(buildSiteRoutes(
    groupedCategories,
    demos,
    tagEntries,
    sceneEntries,
    difficultyEntries,
    quickStartEntries,
    quickStartAudienceEntries,
    quickStartStageEntries
  ))
  writePageSeoAssets(pageSeoSpecs)
  writeReleaseManifest(releaseManifest)
  writeSidebarModule(sidebar)

  console.log(`Generated ${demos.length} demo pages across ${groupedCategories.length} categories.`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
