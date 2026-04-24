import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'

// 导入自定义组件
import DemoPreview from './components/DemoPreview.vue'
import DemoCard from './components/DemoCard.vue'

// 导入自定义样式
import './styles/custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('DemoPreview', DemoPreview)
    app.component('DemoCard', DemoCard)
  },

  // 可以覆盖布局组件
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 可以在这里插入自定义插槽内容
    })
  }
} satisfies Theme