import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { demoCategories, getFeaturedDemos, scanDemos } from './demo-registry.mjs'
import { getSceneEntryVisual, slugifyTerm } from './entry-visuals.mjs'
import { discoverSpotlights } from './site-content.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '../..')
const coverDir = path.join(rootDir, 'public', 'featured-covers')
const entryCoverDir = path.join(rootDir, 'public', 'entry-covers')

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function escapeXml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function chunkTags(tags = [], max = 3) {
  return tags.slice(0, max)
}

function buildCoverSvg(demo) {
  const palette = demo.cover?.palette ?? ['#0f172a', '#334155', '#64748b']
  const [start, mid, end] = [palette[0], palette[1] ?? palette[0], palette[2] ?? palette[1] ?? palette[0]]
  const label = demo.cover?.label ?? demo.categoryName
  const heroTitle = demo.cover?.title ?? demo.title
  const tags = chunkTags(demo.tags)

  const tagNodes = tags.map((tag, index) => {
    const x = 72 + index * 152
    return `
      <g transform="translate(${x}, 460)">
        <rect width="132" height="34" rx="17" fill="rgba(255,255,255,0.14)" />
        <text x="66" y="22" text-anchor="middle" font-size="16" fill="#f8fafc" font-family="Inter, Arial, sans-serif">${escapeXml(tag)}</text>
      </g>`
  }).join('')

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="coverGradient" x1="82" y1="76" x2="1120" y2="560" gradientUnits="userSpaceOnUse">
      <stop stop-color="${escapeXml(start)}" />
      <stop offset="0.52" stop-color="${escapeXml(mid)}" />
      <stop offset="1" stop-color="${escapeXml(end)}" />
    </linearGradient>
    <radialGradient id="orbA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 110) rotate(128.2) scale(190 250)">
      <stop stop-color="rgba(255,255,255,0.38)" />
      <stop offset="1" stop-color="rgba(255,255,255,0)" />
    </radialGradient>
    <radialGradient id="orbB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(190 540) rotate(32.6) scale(220 180)">
      <stop stop-color="rgba(255,255,255,0.18)" />
      <stop offset="1" stop-color="rgba(255,255,255,0)" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" rx="36" fill="url(#coverGradient)" />
  <rect x="32" y="32" width="1136" height="566" rx="28" fill="rgba(15,23,42,0.18)" stroke="rgba(255,255,255,0.16)" />
  <circle cx="1020" cy="110" r="190" fill="url(#orbA)" />
  <circle cx="190" cy="540" r="220" fill="url(#orbB)" />
  <rect x="72" y="76" width="190" height="42" rx="21" fill="rgba(255,255,255,0.16)" />
  <text x="167" y="103" text-anchor="middle" font-size="18" font-weight="700" fill="#F8FAFC" font-family="Inter, Arial, sans-serif">${escapeXml(label)}</text>
  <text x="72" y="220" font-size="62" font-weight="800" fill="#F8FAFC" font-family="Inter, Arial, sans-serif">${escapeXml(heroTitle)}</text>
  <text x="72" y="302" font-size="30" font-weight="700" fill="rgba(248,250,252,0.96)" font-family="Inter, Arial, sans-serif">${escapeXml(demo.title)}</text>
  <foreignObject x="72" y="334" width="860" height="92">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Inter,Arial,sans-serif;font-size:24px;line-height:1.45;color:rgba(248,250,252,0.88);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
      ${escapeXml(demo.featured?.reason ?? demo.description)}
    </div>
  </foreignObject>${tagNodes}
  <text x="72" y="560" font-size="18" fill="rgba(248,250,252,0.72)" font-family="Inter, Arial, sans-serif">fridolph / my-program showcase</text>
</svg>`.trimStart()
}

function buildEntryCoverSvg({ label, title, accent, palette, eyebrow }) {
  const [start, mid, end] = [palette[0], palette[1] ?? palette[0], palette[2] ?? palette[1] ?? palette[0]]

  return `
<svg width="1200" height="720" viewBox="0 0 1200 720" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="entryGradient" x1="108" y1="64" x2="1090" y2="660" gradientUnits="userSpaceOnUse">
      <stop stop-color="${escapeXml(start)}" />
      <stop offset="0.55" stop-color="${escapeXml(mid)}" />
      <stop offset="1" stop-color="${escapeXml(end)}" />
    </linearGradient>
    <radialGradient id="entryOrbA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 140) rotate(128.2) scale(220 260)">
      <stop stop-color="rgba(255,255,255,0.3)" />
      <stop offset="1" stop-color="rgba(255,255,255,0)" />
    </radialGradient>
    <radialGradient id="entryOrbB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 610) rotate(12) scale(280 180)">
      <stop stop-color="rgba(255,255,255,0.18)" />
      <stop offset="1" stop-color="rgba(255,255,255,0)" />
    </radialGradient>
  </defs>
  <rect width="1200" height="720" rx="40" fill="url(#entryGradient)" />
  <rect x="36" y="36" width="1128" height="648" rx="28" fill="rgba(15,23,42,0.18)" stroke="rgba(255,255,255,0.14)" />
  <circle cx="1020" cy="140" r="220" fill="url(#entryOrbA)" />
  <circle cx="180" cy="610" r="260" fill="url(#entryOrbB)" />
  <rect x="84" y="86" width="240" height="46" rx="23" fill="rgba(255,255,255,0.16)" />
  <text x="204" y="116" text-anchor="middle" font-size="18" font-weight="700" fill="#F8FAFC" font-family="Inter, Arial, sans-serif">${escapeXml(label)}</text>
  <text x="84" y="254" font-size="72" font-weight="800" fill="#F8FAFC" font-family="Inter, Arial, sans-serif">${escapeXml(title)}</text>
  <text x="84" y="336" font-size="30" font-weight="700" fill="rgba(248,250,252,0.94)" font-family="Inter, Arial, sans-serif">${escapeXml(accent)}</text>
  <text x="84" y="624" font-size="18" fill="rgba(248,250,252,0.72)" font-family="Inter, Arial, sans-serif">${escapeXml(eyebrow)}</text>
</svg>`.trimStart()
}

export function generateCoverAssets() {
  ensureDir(coverDir)
  ensureDir(path.join(entryCoverDir, 'categories'))
  ensureDir(path.join(entryCoverDir, 'scenes'))
  ensureDir(path.join(entryCoverDir, 'spotlights'))
  const demos = getFeaturedDemos(scanDemos(), 8).filter(demo => demo.cover?.type === 'gradient' || demo.cover?.type === 'image')

  for (const demo of demos) {
    const svgPath = path.join(coverDir, `${demo.id}.svg`)
    fs.writeFileSync(svgPath, buildCoverSvg(demo))
  }

  for (const category of demoCategories) {
    const visual = category.entryVisual
    const svgPath = path.join(entryCoverDir, 'categories', `${category.id}.svg`)
    fs.writeFileSync(svgPath, buildEntryCoverSvg({
      label: visual.label,
      title: category.name,
      accent: visual.accent,
      palette: visual.palette,
      eyebrow: `${category.icon} ${category.description}`
    }))
  }

  const sceneLabels = Array.from(new Set(scanDemos().flatMap(demo => demo.scenes ?? [])))
  for (const sceneLabel of sceneLabels) {
    const visual = getSceneEntryVisual(sceneLabel)
    const svgPath = path.join(entryCoverDir, 'scenes', `${slugifyTerm(sceneLabel)}.svg`)
    fs.writeFileSync(svgPath, buildEntryCoverSvg({
      label: visual.label,
      title: sceneLabel,
      accent: visual.accent,
      palette: visual.palette,
      eyebrow: 'scene entry / content discovery'
    }))
  }

  for (const spotlight of discoverSpotlights) {
    const svgPath = path.join(entryCoverDir, 'spotlights', `${spotlight.slug}.svg`)
    fs.writeFileSync(svgPath, buildEntryCoverSvg({
      label: spotlight.cover.label,
      title: spotlight.title,
      accent: spotlight.cover.accent,
      palette: spotlight.cover.palette,
      eyebrow: spotlight.description
    }))
  }

  return demos.map(demo => `/featured-covers/${demo.id}.svg`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const generated = generateCoverAssets()
  console.log(`Generated ${generated.length} cover assets.`)
}
