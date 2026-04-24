<template>
  <div class="demo-card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-tags">
        <span v-for="tag in tagArray" :key="tag" class="tag">
          {{ tag }}
        </span>
        <span class="difficulty" :class="difficultyClass">
          {{ difficultyText }}
        </span>
      </div>
    </div>

    <div class="card-content">
      <p class="card-description">{{ description }}</p>
    </div>

    <div class="card-footer">
      <a :href="pageUrl" class="card-button primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        查看详情
      </a>
      <a :href="resolvedDemoUrl" target="_blank" rel="noreferrer" class="card-button secondary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 3 21 3 21 9"></polyline>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        独立查看
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: '一个前端效果演示'
  },
  demoUrl: {
    type: String,
    required: true
  },
  pageUrl: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    default: 'intermediate'
  }
})

const tagArray = computed(() => {
  if (!props.tags) return []
  return props.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
})

const difficultyText = computed(() => {
  const map = {
    'beginner': '初级',
    'intermediate': '中级',
    'advanced': '高级'
  }
  return map[props.difficulty] || '中级'
})

const difficultyClass = computed(() => `difficulty-${props.difficulty}`)
const resolvedDemoUrl = computed(() => withBase(props.demoUrl))
</script>

<style scoped>
.demo-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.demo-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.tag {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--vp-c-border);
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.difficulty-beginner {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.difficulty-intermediate {
  background: rgba(234, 88, 12, 0.1);
  color: #ea580c;
  border: 1px solid rgba(234, 88, 12, 0.2);
}

.difficulty-advanced {
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

.card-content {
  flex: 1;
  margin-bottom: 1.5rem;
}

.card-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  gap: 0.75rem;
}

.card-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  flex: 1;
}

.card-button svg {
  width: 16px;
  height: 16px;
}

.card-button.primary {
  background: var(--vp-c-brand);
  color: white;
  border: 1px solid var(--vp-c-brand);
}

.card-button.primary:hover {
  background: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
}

.card-button.secondary {
  background: transparent;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
}

.card-button.secondary:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .demo-card {
    padding: 1rem;
  }

  .card-footer {
    flex-direction: column;
  }

  .card-button {
    width: 100%;
  }
}
</style>
