export const siteMetadata = {
  title: 'My Program Demo Collection',
  description: '收集整理各种前端 demo，包括动画、Canvas、jQuery 与布局方案。',
  lang: 'zh-CN',
  siteUrl: 'https://fridolph.github.io/my-program',
  repoBase: '/my-program',
  defaultOgImage: '/og/site-default.svg',
  themeColor: '#2563eb'
}

export function trimTrailingSlash(value = '') {
  return value.endsWith('/') ? value.slice(0, -1) : value
}

export function normalizeRoutePath(route = '/') {
  if (!route || route === '/') {
    return '/'
  }

  const normalized = route.startsWith('/') ? route : `/${route}`
  return normalized.endsWith('/') ? normalized : `${normalized}/`
}

export function toAbsoluteUrl(route = '/') {
  const base = trimTrailingSlash(siteMetadata.siteUrl)
  const normalized = normalizeRoutePath(route)

  if (normalized === '/') {
    return `${base}/`
  }

  return `${base}${normalized}`
}

export function toAbsoluteAssetUrl(assetPath = '/') {
  const base = trimTrailingSlash(siteMetadata.siteUrl)
  const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`
  return `${base}${normalized}`
}

export function toPageUrl(page = '/') {
  const withoutIndex = page.replace(/index\.md$/, '')
  const withoutExt = withoutIndex.replace(/\.md$/, '')
  const normalized = withoutExt || '/'
  return toAbsoluteUrl(normalized)
}

export function pageToRoutePath(page = '/') {
  const withoutIndex = page.replace(/index\.md$/, '')
  const withoutExt = withoutIndex.replace(/\.md$/, '')
  return normalizeRoutePath(withoutExt || '/')
}

export function escapeSvgText(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function splitLongWord(word = '', size = 14) {
  const segments = []

  for (let index = 0; index < word.length; index += size) {
    segments.push(word.slice(index, index + size))
  }

  return segments
}

export function wrapSvgText(text = '', maxChars = 20, maxLines = 3) {
  const words = String(text).trim().split(/\s+/).filter(Boolean)

  if (!words.length) {
    return ['']
  }

  const lines = []
  let currentLine = ''

  for (const word of words) {
    if (word.length > maxChars) {
      const chunks = splitLongWord(word, maxChars)

      for (const chunk of chunks) {
        if (currentLine) {
          lines.push(currentLine)
          currentLine = ''
        }

        lines.push(chunk)
      }

      continue
    }

    const nextLine = currentLine ? `${currentLine} ${word}` : word
    if (nextLine.length <= maxChars) {
      currentLine = nextLine
      continue
    }

    lines.push(currentLine)
    currentLine = word
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  const limited = lines.slice(0, maxLines)

  if (lines.length > maxLines) {
    limited[maxLines - 1] = `${limited[maxLines - 1].replace(/[.。…]+$/, '')}…`
  }

  return limited
}

function renderSvgTextLines(lines = [], x = 0, y = 0, fontSize = 16, color = '#F8FAFC', fontWeight = 400, lineHeight = 1.25) {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * fontSize * lineHeight}" fill="${color}" font-size="${fontSize}" font-family="Inter, Arial, sans-serif" font-weight="${fontWeight}">${escapeSvgText(line)}</text>`)
    .join('\n')
}

export function buildShareCardSvg({
  eyebrow = 'MY PROGRAM',
  title = siteMetadata.title,
  description = siteMetadata.description,
  meta = 'VitePress · Dao',
  accent = '动画 · 交互 · 内容 · 导航 · 分享',
  palette = ['#0F172A', '#102A43', '#111827'],
  chip = '#2563EB'
} = {}) {
  const [start, mid, end] = [palette[0], palette[1] ?? palette[0], palette[2] ?? palette[1] ?? palette[0]]
  const titleLines = wrapSvgText(title, 18, 3)
  const descriptionLines = wrapSvgText(description, 30, 3)

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="72" y1="52" x2="1110" y2="582" gradientUnits="userSpaceOnUse">
      <stop stop-color="${escapeSvgText(start)}"/>
      <stop offset="0.5" stop-color="${escapeSvgText(mid)}"/>
      <stop offset="1" stop-color="${escapeSvgText(end)}"/>
    </linearGradient>
    <radialGradient id="orbA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 110) rotate(128.2) scale(190 250)">
      <stop stop-color="rgba(255,255,255,0.36)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <radialGradient id="orbB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(190 540) rotate(32.6) scale(220 180)">
      <stop stop-color="rgba(255,255,255,0.18)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" rx="36" fill="#07111F"/>
  <rect x="30" y="30" width="1140" height="570" rx="28" fill="url(#bg)"/>
  <circle cx="1020" cy="110" r="190" fill="url(#orbA)"/>
  <circle cx="190" cy="540" r="220" fill="url(#orbB)"/>
  <path d="M120 454C222 342 302 286 398 286C490 286 566 356 638 356C726 356 814 260 938 180" stroke="rgba(255,255,255,0.14)" stroke-width="20" stroke-linecap="round"/>
  <rect x="108" y="108" width="288" height="44" rx="22" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)"/>
  <text x="140" y="136" fill="#BFDBFE" font-size="22" font-family="Inter, Arial, sans-serif" letter-spacing="1.5">${escapeSvgText(eyebrow)}</text>
  ${renderSvgTextLines(titleLines, 108, 244, 64, '#F8FAFC', 800, 1.1)}
  ${renderSvgTextLines(descriptionLines, 108, 356, 28, '#CBD5E1', 500, 1.4)}
  <rect x="108" y="474" width="342" height="58" rx="18" fill="${escapeSvgText(chip)}"/>
  <text x="144" y="511" fill="#EFF6FF" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="700">${escapeSvgText(meta)}</text>
  <text x="108" y="574" fill="#94A3B8" font-size="24" font-family="Inter, Arial, sans-serif">${escapeSvgText(accent)}</text>
</svg>`
}

export function getDefaultOgSvg() {
  return buildShareCardSvg({
    eyebrow: 'MY PROGRAM',
    title: 'Demo Collection',
    description: '从 demo、开发笔记到多维导航的前端灵感站',
    meta: 'VitePress · Dao',
    accent: '动画 · 交互 · 内容 · 导航 · 分享'
  })
}
