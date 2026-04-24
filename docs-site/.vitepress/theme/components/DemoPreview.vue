<template>
  <div class="demo-preview">
    <div class="preview-header">
      <h3>{{ title }}</h3>
      <div class="preview-actions">
        <button @click="toggleViewMode" class="view-mode-btn">
          {{ viewMode === 'shadow' ? '切换至链接模式' : '切换至预览模式' }}
        </button>
        <a :href="resolvedDemoUrl" target="_blank" rel="noreferrer" class="external-link">
          在新窗口打开
        </a>
        <button @click="refresh" class="refresh-btn">
          刷新
        </button>
      </div>
    </div>

    <div v-if="viewMode === 'shadow'" class="shadow-container">
      <div ref="shadowHost" class="shadow-host"></div>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-if="error" class="error">
        加载失败: {{ error }}
        <a :href="resolvedDemoUrl" target="_blank" rel="noreferrer">直接访问原始页面</a>
      </div>
    </div>

    <div v-else class="link-preview">
      <div class="screenshot-placeholder">
        <div class="placeholder-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p>点击下方链接查看完整效果</p>
        </div>
      </div>
      <div class="direct-link">
        <a :href="resolvedDemoUrl" target="_blank" rel="noreferrer" class="direct-link-btn">
          {{ title }} - 查看完整演示
        </a>
      </div>
    </div>

    <div class="preview-footer">
      <div class="demo-info">
        <span class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
          </svg>
          Shadow DOM 预览
        </span>
        <span class="info-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          完全样式隔离
        </span>
      </div>
      <div class="demo-url">
        <code>{{ resolvedDemoUrl }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  demoUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Demo 预览'
  },
  description: {
    type: String,
    default: ''
  }
})

const shadowHost = ref(null)
const loading = ref(false)
const error = ref('')
const viewMode = ref('shadow')
const resolvedDemoUrl = computed(() => withBase(props.demoUrl))

let abortController = null

function isAbsoluteResource(value) {
  return /^(?:[a-z]+:|\/\/|#|data:|mailto:|tel:)/i.test(value)
}

function resolveAssetUrl(value, baseUrl) {
  if (!value || isAbsoluteResource(value)) {
    return value
  }

  return new URL(value, baseUrl).toString()
}

function rewriteResourceAttributes(root, baseUrl) {
  for (const node of root.querySelectorAll('[src], [href]')) {
    if (node.hasAttribute('src')) {
      node.setAttribute('src', resolveAssetUrl(node.getAttribute('src'), baseUrl))
    }

    if (node.hasAttribute('href')) {
      node.setAttribute('href', resolveAssetUrl(node.getAttribute('href'), baseUrl))
    }
  }

  for (const node of root.querySelectorAll('[style]')) {
    const inlineStyle = node.getAttribute('style')
    if (!inlineStyle) continue

    node.setAttribute(
      'style',
      inlineStyle.replace(/url\((['"]?)(.*?)\1\)/g, (_, quote, assetPath) => {
        return `url(${quote}${resolveAssetUrl(assetPath, baseUrl)}${quote})`
      })
    )
  }

  for (const styleNode of root.querySelectorAll('style')) {
    styleNode.textContent = styleNode.textContent?.replace(/url\((['"]?)(.*?)\1\)/g, (_, quote, assetPath) => {
      return `url(${quote}${resolveAssetUrl(assetPath, baseUrl)}${quote})`
    }) ?? ''
  }
}

async function runScripts(root) {
  const scripts = Array.from(root.querySelectorAll('script'))

  for (const script of scripts) {
    const replacement = document.createElement('script')

    for (const attribute of script.attributes) {
      if (attribute.name === 'src') {
        replacement.setAttribute('src', script.src)
      } else {
        replacement.setAttribute(attribute.name, attribute.value)
      }
    }

    if (!script.src) {
      replacement.textContent = script.textContent
    }

    script.replaceWith(replacement)

    if (replacement.src) {
      await new Promise((resolve, reject) => {
        replacement.onload = resolve
        replacement.onerror = () => reject(new Error(`脚本加载失败: ${replacement.src}`))
      })
    }
  }
}

function getShadowRoot() {
  if (!shadowHost.value) {
    return null
  }

  if (!shadowHost.value.shadowRoot) {
    shadowHost.value.attachShadow({ mode: 'open' })
  }

  return shadowHost.value.shadowRoot
}

async function loadDemo() {
  if (!resolvedDemoUrl.value) return

  if (abortController) {
    abortController.abort()
  }

  loading.value = true
  error.value = ''
  abortController = new AbortController()

  try {
    const response = await fetch(resolvedDemoUrl.value, {
      signal: abortController.signal
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const html = await response.text()
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const baseUrl = new URL(resolvedDemoUrl.value, window.location.origin).toString()
    const shadowRoot = getShadowRoot()

    if (!shadowRoot) {
      throw new Error('预览容器未就绪')
    }

    shadowRoot.replaceChildren()

    const style = document.createElement('style')
    style.textContent = `
      :host {
        display: block;
      }

      .demo-container {
        width: 100%;
        min-height: 320px;
        background: white;
        color: #111827;
      }

      .demo-container *,
      .demo-container *::before,
      .demo-container *::after {
        box-sizing: border-box;
      }

      .demo-container body {
        margin: 0;
      }
    `

    const container = document.createElement('div')
    container.className = 'demo-container'
    container.innerHTML = doc.body.innerHTML

    rewriteResourceAttributes(doc.head, baseUrl)
    rewriteResourceAttributes(container, baseUrl)

    for (const headNode of Array.from(doc.head.children)) {
      shadowRoot.appendChild(headNode.cloneNode(true))
    }

    shadowRoot.appendChild(style)
    shadowRoot.appendChild(container)

    await nextTick()
    await runScripts(container)
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('加载 demo 失败:', err)
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
}

function toggleViewMode() {
  viewMode.value = viewMode.value === 'shadow' ? 'link' : 'shadow'
  if (viewMode.value === 'shadow') {
    loadDemo()
  }
}

function refresh() {
  if (viewMode.value === 'shadow') {
    loadDemo()
  }
}

watch(resolvedDemoUrl, () => {
  if (viewMode.value === 'shadow') {
    loadDemo()
  }
})

onMounted(() => {
  if (viewMode.value === 'shadow') {
    loadDemo()
  }
})

onUnmounted(() => {
  if (abortController) {
    abortController.abort()
  }
})
</script>

<style scoped>
.demo-preview {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
  background: var(--vp-c-bg);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
}

.preview-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.view-mode-btn,
.refresh-btn,
.external-link {
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.view-mode-btn,
.refresh-btn {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.external-link {
  background: var(--vp-c-brand);
  color: white;
  border: 1px solid var(--vp-c-brand);
}

.view-mode-btn:hover,
.refresh-btn:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.external-link:hover {
  background: var(--vp-c-brand-dark);
}

.shadow-container {
  position: relative;
  min-height: 400px;
}

.shadow-host {
  min-height: 400px;
}

.loading,
.error {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.92);
  padding: 1.5rem;
  text-align: center;
}

.error {
  color: #dc2626;
  gap: 0.75rem;
}

.link-preview {
  padding: 2rem;
}

.screenshot-placeholder {
  border: 1px dashed var(--vp-c-border);
  border-radius: 8px;
  min-height: 240px;
  display: grid;
  place-items: center;
  background: var(--vp-c-bg-soft);
}

.placeholder-content {
  text-align: center;
  color: var(--vp-c-text-2);
}

.direct-link {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.direct-link-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  background: var(--vp-c-brand);
  color: white;
  text-decoration: none;
}

.preview-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
}

.demo-info {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.info-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.demo-url code {
  font-size: 0.8125rem;
}

@media (max-width: 768px) {
  .preview-header,
  .preview-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .preview-actions {
    flex-wrap: wrap;
  }

  .view-mode-btn,
  .refresh-btn,
  .external-link,
  .direct-link-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
