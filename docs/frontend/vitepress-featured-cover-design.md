# VitePress 首页精选封面策展详细设计

## 设计目标

首页精选已经具备了“为什么推荐”的语义层，但还缺少“视觉上先抓住人”的能力。

这一轮设计的目标是：

- 让精选 demo 具备轻量封面表达。
- 保持实现成本可控，不引入复杂截图流水线。
- 让 metadata 不只驱动排序和文案，也驱动首页视觉组织。

## 为什么先做 cover metadata，而不是先做截图系统

完整截图系统当然更理想，但它会立刻引入：

- 截图生成和存储流程。
- 本地与 CI 的一致性问题。
- 截图过期和内容漂移的维护问题。

所以本轮先做更轻量的 cover metadata：

- 支持直接引用图片。
- 支持纯 metadata 驱动的渐变封面。
- 先把首页视觉层建立起来，再考虑后续截图自动化。

## 数据结构

在 metadata 中新增 `cover` 字段。

推荐结构：

```js
cover: {
  type: 'gradient',
  label: 'Canvas Demo',
  title: 'Fireworks',
  palette: ['#111827', '#7c3aed', '#22d3ee']
}
```

或：

```js
cover: {
  type: 'image',
  src: '/public/demo/example/cover.png',
  label: 'Featured Demo',
  title: 'Gallery'
}
```

## 字段职责

- `type`：`gradient` 或 `image`
- `src`：图片型封面地址
- `label`：封面小标签
- `title`：封面中的短标题
- `palette`：渐变型封面的颜色数组

## 合并顺序

`cover` 与 `featured` 一样，继续走 metadata 分层：

1. 默认提取
2. 目录 preset
3. 单文件 override

目录 preset 可为整个系列提供统一风格，override 继续负责单 demo 定制。

## 校验规则

- `cover.type` 只能是 `gradient` 或 `image`
- `image` 类型必须提供 `src`
- `gradient` 类型必须提供至少两个颜色值
- `label` / `title` 如果存在，必须是字符串

## 首页渲染策略

### 1. 精选卡片顶部加入封面区

封面区只用于首页精选，不立即扩散到分类卡片和详情页。

### 2. 渐变封面优先走 CSS 变量

这样封面不需要额外静态资源，也便于快速调整。

### 3. 无封面时保留统一兜底

兜底样式仍然提供：

- 分类名
- Demo 标题首字信息
- 统一轻量背景

这样可以保证新 featured demo 不会因为没有 cover 而破坏布局。

## 首批封面策略

本轮只给首页精选那批 demo 补 cover metadata。

原则：

- 尽量让不同分类的封面风格有区分。
- 封面内容尽量简短，不与正文重复。
- 视觉层只负责增强识别，不承担完整说明责任。

## 后续扩展方向

如果 cover metadata 跑稳，下一步可以继续做：

1. 接入真实截图资源。
2. 给分类页也增加推荐封面卡。
3. 支持封面上的关键词、推荐标签和主题色同步。
