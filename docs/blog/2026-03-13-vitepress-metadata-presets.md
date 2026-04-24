# 2026-03-13 · 把 demo 元数据从单条覆盖推进到目录级预设

## 背景

上一轮我给 demo 站加了人工 metadata 覆盖层，解决了标题、描述和 slug 的可读性问题。

但一边补数据，一边也暴露了新的模式：

- 同目录 demo 往往属于一个系列。
- 它们共享类似的标签、难度和描述风格。
- 如果继续只靠单条 override，配置会越来越长，重复会越来越多。

所以这轮的重点不是再补更多单条内容，而是把 metadata 结构继续向前整理。

## 这次判断

这次最重要的判断是：

> metadata 不是只有“默认值”和“最终值”两层，它还需要一层“系列共性”。

也就是说，目录级 preset 负责表达一个系列的共同语义，单文件 override 负责最后的精修。

这样系统才会从“能修内容”变成“能规模化维护内容”。

## 我怎么做的

### 1. 新增目录级 preset 文件

我加了 `docs-site/scripts/demo-metadata-presets.mjs`，让目录路径作为 key。

这个文件主要承接两类信息：

- 同目录 demo 共享的 tags、difficulty 等默认值。
- 目录内每个 HTML 文件的局部差异配置。

### 2. 调整 registry 的合并顺序

现在 registry 的 metadata 合并顺序是：

1. 自动提取默认 metadata
2. 目录 preset
3. 单文件 override

这样目录 preset 成了中间层，override 继续保留最高优先级。

### 3. 给 preset 补校验

为了保证这层长期可维护，我继续保留“生成阶段直接失败”的策略：

- preset 指向不存在目录，报错。
- preset entries 指向不存在文件，报错。
- preset 和 override 合并后 slug 冲突，照样报错。

我更希望这类配置问题在开发阶段立刻暴露，而不是等页面生成后才慢慢发现链接错了。

## 这轮迁移了哪些系列

这次重点迁移了重复最明显的几组：

- `animation-js/progress-demo`
- `hover-transition/hover卡片2`
- `hover-transition/里程图片`
- `layouts/flex`

这些系列最适合抽出公共 metadata，因为它们天然就是“同主题、多变体”的结构。

## 结果

做完之后，我最大的感受是：metadata 层终于开始像一个真正的系统，而不是越来越长的配置表。

目录 preset 和单文件 override 分开之后：

- 系列信息集中在一起，更好读。
- 重复字段明显减少。
- 后续给同目录新增 demo 时，能少写很多重复配置。

## 自测

这轮我还是按生成和构建两层验证：

```bash
cd docs-site
node scripts/generate-demo-pages.js
npm run build
```

重点检查：

- preset 路径与文件是否都能命中。
- 目录级默认值是否正确生效。
- override 是否还能正常覆盖 preset。
- 最终生成路由是否保持唯一。

## 后续

如果这层继续稳定，下一步就可以继续往下做：

1. 给目录 preset 增加截图、推荐权重和精选规则。
2. 把精选 demo 的首页展示从“按顺序截取”升级成“按 metadata 编排”。
