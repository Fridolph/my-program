import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { demoMetadataOverrides } from './demo-metadata-overrides.mjs'
import { demoMetadataDirectoryPresets } from './demo-metadata-presets.mjs'
import { getCategoryEntryVisual } from './entry-visuals.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '../..')
const publicDir = path.join(rootDir, 'public')

const rawCategoryConfigs = [
  {
    sourceDir: 'animation-js',
    routeDir: 'css-animation',
    name: '动画效果',
    icon: '🎨',
    description: '收录 CSS 与 JavaScript 驱动的动画演示。',
    order: 1,
    featured: true
  },
  {
    sourceDir: 'hover-transition',
    routeDir: 'hover-transition',
    name: 'CSS 过渡效果',
    icon: '✨',
    description: '聚合 hover、transition 与交互反馈类效果。',
    order: 2,
    featured: true
  },
  {
    sourceDir: 'canvas',
    routeDir: 'canvas',
    name: 'Canvas 动画',
    icon: '🖌️',
    description: '收录基于 Canvas 的视觉与图形动画案例。',
    order: 3,
    featured: true
  },
  {
    sourceDir: 'jquery',
    routeDir: 'jquery',
    name: 'jQuery 特效',
    icon: '⚡',
    description: '保留历史 jQuery 交互效果，方便检索和复用。',
    order: 4,
    featured: true
  },
  {
    sourceDir: 'layouts',
    routeDir: 'layout',
    name: '布局方案',
    icon: '📐',
    description: '聚合常见布局练习和基础结构示例。',
    order: 5,
    featured: true
  },
  {
    sourceDir: 'other',
    routeDir: 'other',
    name: '其他效果',
    icon: '🔧',
    description: '放置暂未归类但仍有参考价值的效果示例。',
    order: 6,
    featured: true
  },
  {
    sourceDir: 'css',
    routeDir: 'other',
    name: '其他效果',
    icon: '🔧',
    description: '放置暂未归类但仍有参考价值的效果示例。',
    order: 7,
    featured: false
  }
]

const categoryMap = new Map(rawCategoryConfigs.map(item => [item.sourceDir, item]))

export const demoCategories = rawCategoryConfigs
  .filter(item => item.featured)
  .map(({ routeDir, name, icon, description, order }) => ({
    id: routeDir,
    name,
    icon,
    description,
    order,
    entryVisual: getCategoryEntryVisual(routeDir)
  }))

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/')
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function encodeSegment(value) {
  const normalized = slugify(value)
  if (normalized) return normalized

  return Array.from(value)
    .map(char => `u${char.codePointAt(0).toString(16)}`)
    .join('-')
}

function ensureArray(values) {
  return Array.from(new Set(values.filter(Boolean)))
}

function findHtmlFiles(dir) {
  const entries = []

  for (const item of fs.readdirSync(dir)) {
    const itemPath = path.join(dir, item)
    const stats = fs.statSync(itemPath)

    if (stats.isDirectory()) {
      entries.push(...findHtmlFiles(itemPath))
      continue
    }

    if (item.endsWith('.html')) {
      entries.push(itemPath)
    }
  }

  return entries
}

function extractTitle(htmlContent, fallback) {
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/is)
  if (titleMatch?.[1]?.trim()) {
    return titleMatch[1].trim()
  }

  const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/is)
  if (h1Match?.[1]?.trim()) {
    return h1Match[1].replace(/<[^>]+>/g, '').trim()
  }

  return fallback
}

function extractDescription(htmlContent, fallback) {
  const metaMatch = htmlContent.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
  if (metaMatch?.[1]?.trim()) {
    return metaMatch[1].trim()
  }

  const paragraphMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/is)
  if (paragraphMatch?.[1]?.trim()) {
    return paragraphMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120)
  }

  return fallback
}

function inferTags(routeDir, htmlContent, relativeDir, fileName) {
  const defaultTagByCategory = {
    'css-animation': 'Animation',
    'hover-transition': 'Hover',
    canvas: 'Canvas',
    jquery: 'jQuery',
    layout: 'Layout',
    other: 'Example'
  }

  const source = `${routeDir} ${relativeDir} ${fileName} ${htmlContent}`.toLowerCase()
  const tags = [defaultTagByCategory[routeDir] ?? routeDir]

  if (source.includes('jquery')) tags.push('jQuery')
  if (source.includes('canvas')) tags.push('Canvas')
  if (source.includes('flex')) tags.push('Flex')
  if (source.includes('animation')) tags.push('Animation')
  if (source.includes('hover')) tags.push('Hover')
  if (source.includes('transform')) tags.push('Transform')
  if (source.includes('layout')) tags.push('Layout')
  if (source.includes('css')) tags.push('CSS')
  if (source.includes('javascript') || source.includes('<script')) tags.push('JavaScript')

  return ensureArray(tags).slice(0, 4)
}

function inferDifficulty(routeDir, htmlContent) {
  if (routeDir === 'canvas') return 'advanced'
  if (routeDir === 'layout') return 'beginner'
  if (htmlContent.toLowerCase().includes('jquery')) return 'intermediate'
  return 'intermediate'
}

function formatFallbackTitle(relativeDir, fileName) {
  const baseName = fileName === 'index.html' ? path.basename(relativeDir) : fileName.replace(/\.html$/, '')
  return baseName.replace(/[-_]+/g, ' ').trim() || '未命名 Demo'
}

function buildDemoId(relativeDir, fileName, customSlug) {
  if (customSlug) {
    return slugify(customSlug)
  }

  const seed = fileName === 'index.html'
    ? relativeDir
    : path.join(relativeDir, fileName.replace(/\.html$/, ''))

  const slug = toPosixPath(seed)
    .split('/')
    .filter(Boolean)
    .map(encodeSegment)
    .join('-')

  return slug || 'demo'
}

function listSourceFiles(relativeDir) {
  const sourceDir = path.join(publicDir, relativeDir)
  return fs.readdirSync(sourceDir).sort((a, b) => a.localeCompare(b, 'zh-CN'))
}

function mergeMetadata(base, patch) {
  if (!patch) return base

  return {
    ...base,
    ...patch,
    tags: patch.tags ? ensureArray(patch.tags) : base.tags,
    scenes: patch.scenes ? ensureArray(patch.scenes) : base.scenes,
    difficulty: patch.difficulty ?? base.difficulty,
    featured: patch.featured ?? base.featured,
    cover: patch.cover ?? base.cover
  }
}

function getDirectoryPreset(relativeDir, fileName) {
  const preset = demoMetadataDirectoryPresets[relativeDir]
  if (!preset) {
    return null
  }

  const defaults = preset.defaults ?? {}
  const entry = preset.entries?.[fileName] ?? null

  return { defaults, entry }
}

function applyMetadataLayers(relativeDir, fileName, relativePath, baseDemo) {
  const preset = getDirectoryPreset(relativeDir, fileName)
  const override = demoMetadataOverrides[relativePath]

  let merged = mergeMetadata(baseDemo, preset?.defaults)
  merged = mergeMetadata(merged, preset?.entry)
  merged = mergeMetadata(merged, override)

  return {
    ...merged,
    id: buildDemoId(relativeDir, fileName, merged.slug)
  }
}

function validateDirectoryPresets() {
  const presetDirs = Object.keys(demoMetadataDirectoryPresets)

  for (const presetDir of presetDirs) {
    const absoluteDir = path.join(publicDir, presetDir)
    if (!fs.existsSync(absoluteDir) || !fs.statSync(absoluteDir).isDirectory()) {
      throw new Error(`Unknown metadata preset directory: ${presetDir}`)
    }

    const entries = demoMetadataDirectoryPresets[presetDir].entries ?? {}
    for (const fileName of Object.keys(entries)) {
      const absoluteFile = path.join(absoluteDir, fileName)
      if (!fs.existsSync(absoluteFile)) {
        throw new Error(`Unknown metadata preset file: ${presetDir}/${fileName}`)
      }
    }
  }
}

function validateCoverMetadata(demos) {
  for (const demo of demos) {
    if (!demo.cover) continue

    if (!['gradient', 'image'].includes(demo.cover.type)) {
      throw new Error(`Invalid cover type for ${demo.relativePath}`)
    }

    if (demo.cover.type === 'image' && !demo.cover.src) {
      throw new Error(`Missing cover src for ${demo.relativePath}`)
    }

    if (demo.cover.type === 'gradient' && (!Array.isArray(demo.cover.palette) || demo.cover.palette.length < 2)) {
      throw new Error(`Invalid cover palette for ${demo.relativePath}`)
    }

    for (const key of ['label', 'title']) {
      if (demo.cover[key] != null && typeof demo.cover[key] !== 'string') {
        throw new Error(`Invalid cover ${key} for ${demo.relativePath}`)
      }
    }
  }
}

function validateFeaturedMetadata(demos) {
  for (const demo of demos) {
    if (!demo.featured) continue

    if (!Number.isFinite(demo.featured.priority)) {
      throw new Error(`Invalid featured priority for ${demo.relativePath}`)
    }

    if (typeof demo.featured.reason !== 'string' || !demo.featured.reason.trim()) {
      throw new Error(`Missing featured reason for ${demo.relativePath}`)
    }
  }
}

function validateSceneMetadata(demos) {
  for (const demo of demos) {
    if (demo.scenes == null) continue

    if (!Array.isArray(demo.scenes) || demo.scenes.some(scene => typeof scene !== 'string' || !scene.trim())) {
      throw new Error(`Invalid scenes metadata for ${demo.relativePath}`)
    }
  }
}

function validateOverrides(demos) {
  const demoPaths = new Set(demos.map(demo => demo.relativePath))
  const unknownOverridePaths = Object.keys(demoMetadataOverrides).filter(relativePath => !demoPaths.has(relativePath))

  if (unknownOverridePaths.length > 0) {
    throw new Error(`Unknown metadata override paths: ${unknownOverridePaths.join(', ')}`)
  }

  const duplicateIds = demos.reduce((map, demo) => {
    map.set(demo.id, (map.get(demo.id) ?? 0) + 1)
    return map
  }, new Map())

  const conflicts = Array.from(duplicateIds.entries()).filter(([, count]) => count > 1)
  if (conflicts.length > 0) {
    throw new Error(`Duplicate demo ids detected: ${conflicts.map(([id]) => id).join(', ')}`)
  }
}

function validateContentMetadata(demos) {
  const difficultyValues = new Set(['beginner', 'intermediate', 'advanced'])

  for (const demo of demos) {
    if (typeof demo.id !== 'string' || !demo.id.trim()) {
      throw new Error(`Missing demo id for ${demo.relativePath}`)
    }

    if (typeof demo.title !== 'string' || !demo.title.trim()) {
      throw new Error(`Missing title for ${demo.relativePath}`)
    }

    if (typeof demo.description !== 'string' || !demo.description.trim()) {
      throw new Error(`Missing description for ${demo.relativePath}`)
    }

    if (!Array.isArray(demo.tags) || demo.tags.length === 0 || demo.tags.some(tag => typeof tag !== 'string' || !tag.trim())) {
      throw new Error(`Invalid tags for ${demo.relativePath}`)
    }

    if (!difficultyValues.has(demo.difficulty)) {
      throw new Error(`Invalid difficulty for ${demo.relativePath}`)
    }

    for (const fieldName of ['whyRead', 'implementationNotes', 'whenToUse', 'adaptationTips']) {
      const value = demo[fieldName]
      if (value == null) continue

      if (!Array.isArray(value) || value.some(item => typeof item !== 'string' || !item.trim())) {
        throw new Error(`Invalid ${fieldName} for ${demo.relativePath}`)
      }
    }
  }
}

export function scanDemos() {
  validateDirectoryPresets()

  const demos = []

  for (const sourceDirName of fs.readdirSync(publicDir).sort((a, b) => a.localeCompare(b, 'zh-CN'))) {
    const absoluteSourceDir = path.join(publicDir, sourceDirName)
    if (!fs.statSync(absoluteSourceDir).isDirectory()) continue

    const category = categoryMap.get(sourceDirName)
    if (!category) continue

    for (const htmlFilePath of findHtmlFiles(absoluteSourceDir)) {
      const relativePath = toPosixPath(path.relative(publicDir, htmlFilePath))
      const relativeDir = toPosixPath(path.dirname(relativePath))
      const fileName = path.basename(relativePath)
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf8')
      const fallbackTitle = formatFallbackTitle(relativeDir, fileName)
      const routeDir = category.routeDir
      const sourceDirPath = fileName === 'index.html' ? relativeDir : toPosixPath(path.dirname(relativePath))

      const demo = applyMetadataLayers(relativeDir, fileName, relativePath, {
        title: extractTitle(htmlContent, fallbackTitle),
        description: extractDescription(htmlContent, `${category.description}示例。`),
        categoryId: routeDir,
        categoryName: category.name,
        categoryIcon: category.icon,
        publicUrl: `/${relativePath}`,
        sourceDir: sourceDirPath,
        sourceUrl: `https://github.com/Fridolph/my-program/tree/main/public/${sourceDirPath}`,
        relativePath,
        fileName,
        tags: inferTags(routeDir, htmlContent, relativeDir, fileName),
        scenes: [],
        difficulty: inferDifficulty(routeDir, htmlContent),
        sourceFiles: listSourceFiles(sourceDirPath)
      })

      demos.push(demo)
    }
  }

  validateOverrides(demos)
  validateContentMetadata(demos)
  validateFeaturedMetadata(demos)
  validateCoverMetadata(demos)
  validateSceneMetadata(demos)

  return demos.sort((a, b) => {
    const categoryOrder = demoCategories.find(item => item.id === a.categoryId)?.order ?? 999
    const nextCategoryOrder = demoCategories.find(item => item.id === b.categoryId)?.order ?? 999
    if (categoryOrder !== nextCategoryOrder) return categoryOrder - nextCategoryOrder
    return a.title.localeCompare(b.title, 'zh-CN')
  })
}

export function groupDemosByCategory(demos = scanDemos()) {
  return demoCategories.map(category => ({
    ...category,
    demos: demos.filter(demo => demo.categoryId === category.id)
  }))
}

export function getCategoryDemos(categoryId, demos = scanDemos()) {
  return demos.filter(demo => demo.categoryId === categoryId)
}

export function getDemoNeighbors(targetDemo, demos = scanDemos()) {
  const categoryDemos = getCategoryDemos(targetDemo.categoryId, demos)
  const index = categoryDemos.findIndex(demo => demo.id === targetDemo.id)

  return {
    previous: index > 0 ? categoryDemos[index - 1] : null,
    next: index >= 0 && index < categoryDemos.length - 1 ? categoryDemos[index + 1] : null
  }
}

export function getRelatedDemos(targetDemo, demos = scanDemos(), limit = 3) {
  return demos
    .filter(demo => demo.id !== targetDemo.id && demo.categoryId === targetDemo.categoryId)
    .map(demo => {
      const sharedTags = demo.tags.filter(tag => targetDemo.tags.includes(tag)).length
      const sharedScenes = (demo.scenes ?? []).filter(scene => (targetDemo.scenes ?? []).includes(scene)).length
      const featuredBoost = demo.featured ? 1 : 0
      const score = sharedTags * 3 + sharedScenes * 4 + featuredBoost

      return { demo, score, sharedTags, sharedScenes }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.demo.title.localeCompare(b.demo.title, 'zh-CN')
    })
    .slice(0, limit)
    .map(item => item.demo)
}

export function getSceneEntries(demos = scanDemos(), limit = 6) {
  const sceneMap = new Map()

  for (const demo of demos) {
    for (const scene of demo.scenes ?? []) {
      const entry = sceneMap.get(scene) ?? { scene, count: 0, demos: [] }
      entry.count += 1
      entry.demos.push(demo)
      sceneMap.set(scene, entry)
    }
  }

  return Array.from(sceneMap.values())
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count
      return a.scene.localeCompare(b.scene, 'zh-CN')
    })
    .slice(0, limit)
    .map(entry => {
      const representative = entry.demos
        .slice()
        .sort((a, b) => {
          const ap = a.featured?.priority ?? -1
          const bp = b.featured?.priority ?? -1
          if (bp !== ap) return bp - ap
          return a.title.localeCompare(b.title, 'zh-CN')
        })[0]

      return {
        scene: entry.scene,
        count: entry.count,
        representative
      }
    })
}

export function createSidebar(demos = scanDemos()) {
  const grouped = groupDemosByCategory(demos)
  const sidebar = {}

  for (const category of grouped) {
    sidebar[`/demos/${category.id}/`] = [
      {
        text: `${category.icon} ${category.name}`,
        items: [
          { text: `概览 (${category.demos.length})`, link: `/demos/${category.id}/` },
          ...category.demos.map(demo => ({
            text: demo.title,
            link: `/demos/${category.id}/${demo.id}`
          }))
        ]
      }
    ]
  }

  return sidebar
}


export function getFeaturedDemos(demos = scanDemos(), limit = 8) {
  const explicitFeatured = demos
    .filter(demo => demo.featured)
    .sort((a, b) => {
      if (b.featured.priority !== a.featured.priority) return b.featured.priority - a.featured.priority
      return a.title.localeCompare(b.title, 'zh-CN')
    })

  const selectedIds = new Set(explicitFeatured.slice(0, limit).map(demo => demo.id))
  const fallback = demos.filter(demo => !selectedIds.has(demo.id)).slice(0, Math.max(limit - selectedIds.size, 0))

  return [...explicitFeatured.slice(0, limit), ...fallback].slice(0, limit)
}
