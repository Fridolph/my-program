import { defineConfig } from 'vitepress'
import { generatedSidebar } from './generated/demo-sidebar.mjs'
import { pageOgImages } from './generated/page-seo.mjs'
import { pageToRoutePath, siteMetadata, toAbsoluteAssetUrl, toPageUrl } from '../scripts/site-seo.mjs'

type MarkdownHtmlToken = {
  type: string
  content?: string
  children?: MarkdownHtmlToken[]
}

const siteBase = process.env.NODE_ENV === 'production' ? `${siteMetadata.repoBase}/` : '/'

function withSiteBase(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return path
  }

  if (siteBase === '/') {
    return path
  }

  const normalizedBase = siteBase.endsWith('/') ? siteBase.slice(0, -1) : siteBase

  if (path === '/' || path.startsWith(`${normalizedBase}/`)) {
    return path === '/' ? `${normalizedBase}/` : path
  }

  return `${normalizedBase}${path}`
}

function rewriteRawHtmlBase(content: string) {
  return content
    .replace(/(\b(?:href|src|poster)=["'])(\/(?!\/)[^"']*)(["'])/g, (_match, prefix, path, suffix) => {
      return `${prefix}${withSiteBase(path)}${suffix}`
    })
    .replace(/(url\(["']?)(\/(?!\/)[^)"']*)(["']?\))/g, (_match, prefix, path, suffix) => {
      return `${prefix}${withSiteBase(path)}${suffix}`
    })
}

function rewriteHtmlTokens(tokens: MarkdownHtmlToken[] = []) {
  for (const token of tokens) {
    if ((token.type === 'html_block' || token.type === 'html_inline') && token.content) {
      token.content = rewriteRawHtmlBase(token.content)
    }

    if (token.children?.length) {
      rewriteHtmlTokens(token.children)
    }
  }
}

const guideSidebar = [
  {
    text: '项目指南',
    items: [
      { text: '进度总览', link: '/guide/progress' },
      { text: '里程碑规划', link: '/guide/roadmap' },
      { text: '发布状态', link: '/guide/release-status' },
      { text: '发布说明', link: '/guide/deployment' }
    ]
  }
]

const discoverSidebar = [
  {
    text: '专题发现',
    items: [
      { text: '发现入口', link: '/discover/' },
      { text: '快速开始', link: '/discover/quick-start/' },
      { text: '按角色开始', link: '/discover/quick-start/roles/' },
      { text: '按阶段开始', link: '/discover/quick-start/stages/' },
      { text: '专题路线', link: '/discover/spotlights/' }
    ]
  }
]

const exploreSidebar = [
  {
    text: '多维导航',
    items: [
      { text: '导航总览', link: '/explore/' },
      { text: '标签导航', link: '/explore/tags/' },
      { text: '场景导航', link: '/explore/scenes/' },
      { text: '难度导航', link: '/explore/difficulty/' }
    ]
  }
]

const journalSidebar = [
  {
    text: '开发笔记',
    items: [
      { text: '笔记总览', link: '/journal/' },
      { text: 'M20 开发笔记', link: '/journal/dao-m20-quick-start-follow-up' },
      { text: 'M19 开发笔记', link: '/journal/dao-m19-quick-start-segmentation' },
      { text: 'M18 开发笔记', link: '/journal/dao-m18-quick-start-decision' },
      { text: 'M17 开发笔记', link: '/journal/dao-m17-quick-start-playbook' },
      { text: 'M16 开发笔记', link: '/journal/dao-m16-quick-start' },
      { text: 'M15 开发笔记', link: '/journal/dao-m15-route-expansion' },
      { text: 'M14 开发笔记', link: '/journal/dao-m14-spotlight-feedback' },
      { text: 'M13 开发笔记', link: '/journal/dao-m13-spotlight-aggregation' },
      { text: 'M12 开发笔记', link: '/journal/dao-m12-visual-entry' },
      { text: 'M11 开发笔记', link: '/journal/dao-m11-build-performance' },
      { text: 'M10 开发笔记', link: '/journal/dao-m10-content-depth' },
      { text: 'M9 开发笔记', link: '/journal/dao-m9-release-observability' },
      { text: 'M8 开发笔记', link: '/journal/dao-m8-page-share-assets' },
      { text: 'M7 开发笔记', link: '/journal/dao-m7-release-convergence' },
      { text: 'M6 开发笔记', link: '/journal/dao-m6-seo-sharing' },
      { text: 'M5 开发笔记', link: '/journal/dao-m5-multi-dimensional-navigation' },
      { text: 'M4 开发笔记', link: '/journal/dao-m4-content-productization' },
      { text: 'M0 开发笔记', link: '/journal/dao-m0-planning' },
      { text: 'M1 内容治理收口', link: '/journal/dao-m1-content-governance' },
      { text: '人工 metadata 覆盖层', link: '/journal/metadata-overrides' },
      { text: '首页精选与封面策展', link: '/journal/featured-curation' }
    ]
  }
]

function resolveOgImage(page: string) {
  const route = pageToRoutePath(page)
  const pageAsset = pageOgImages[route]

  if (pageAsset) {
    return toAbsoluteAssetUrl(pageAsset)
  }

  return toAbsoluteAssetUrl(siteMetadata.defaultOgImage)
}

export default defineConfig({
  title: siteMetadata.title,
  description: siteMetadata.description,
  lang: siteMetadata.lang,
  ignoreDeadLinks: true,
  srcExclude: ['README.md'],
  head: [
    ['meta', { name: 'theme-color', content: siteMetadata.themeColor }],
    ['meta', { name: 'author', content: 'Fridolph' }],
    ['meta', { property: 'og:site_name', content: siteMetadata.title }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'manifest', href: withSiteBase('/manifest.webmanifest') }]
  ],
  markdown: {
    config(md) {
      md.core.ruler.push('rewrite-raw-html-base', (state) => {
        rewriteHtmlTokens(state.tokens as MarkdownHtmlToken[])
      })
    }
  },
  sitemap: {
    hostname: `${siteMetadata.siteUrl}/`
  },
  transformHead({ page, title, description }) {
    const pageTitle = title || siteMetadata.title
    const pageDescription = description || siteMetadata.description
    const canonicalUrl = toPageUrl(page)
    const ogImage = resolveOgImage(page)

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['meta', { name: 'twitter:image', content: ogImage }]
    ]
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '项目指南',
        items: [
          { text: '项目进度', link: '/guide/progress' },
          { text: '里程碑规划', link: '/guide/roadmap' },
          { text: '发布状态', link: '/guide/release-status' },
          { text: '发布说明', link: '/guide/deployment' }
        ]
      },
      {
        text: '内容入口',
        items: [
          { text: '专题发现', link: '/discover/' },
          { text: '快速开始', link: '/discover/quick-start/' },
          { text: '按角色开始', link: '/discover/quick-start/roles/' },
          { text: '按阶段开始', link: '/discover/quick-start/stages/' },
          { text: '专题路线', link: '/discover/spotlights/' },
          { text: '多维导航', link: '/explore/' },
          { text: '开发笔记', link: '/journal/' }
        ]
      },
      {
        text: 'Demo 分类',
        items: [
          { text: '动画效果', link: '/demos/css-animation/' },
          { text: 'CSS 过渡效果', link: '/demos/hover-transition/' },
          { text: 'Canvas 动画', link: '/demos/canvas/' },
          { text: 'jQuery 特效', link: '/demos/jquery/' },
          { text: '布局方案', link: '/demos/layout/' },
          { text: '其他效果', link: '/demos/other/' }
        ]
      },
      { text: 'GitHub', link: 'https://github.com/Fridolph/my-program' }
    ],
    sidebar: {
      '/guide/': guideSidebar,
      '/discover/': discoverSidebar,
      '/explore/': exploreSidebar,
      '/journal/': journalSidebar,
      ...generatedSidebar
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Fridolph/my-program' }
    ],
    footer: {
      message: '收集整理各种前端 demo，欢迎 Star 和 Fork。',
      copyright: 'Copyright © 2024-present Fridolph'
    },
    editLink: {
      pattern: 'https://github.com/Fridolph/my-program/edit/dev/docs-site/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: true
  },

  base: siteBase,

  vite: {
    plugins: [
      {
        name: 'dev-public-prefix-compat',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url?.startsWith('/public/')) {
              req.url = req.url.replace(/^\/public\//, '/')
            }

            next()
          })
        }
      }
    ],
    optimizeDeps: {
      include: ['vue']
    }
  }
})
