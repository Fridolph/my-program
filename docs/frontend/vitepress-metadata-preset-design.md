# VitePress 目录级 Metadata 预设详细设计

## 设计目标

metadata 覆盖层已经存在，但现在需要再向前收一层，把“系列共性”和“单项精修”分开。

这次设计的核心目标是：

- 用目录级 preset 表达系列共性。
- 用单文件 override 表达最终精修。
- 保持自动扫描为基础，不让 metadata 系统失控扩张。

## 为什么要拆成两层

如果只保留单文件 override，会出现两个问题：

1. 同一目录下的 tags、difficulty、描述基调会重复写很多次。
2. 一旦某个系列需要统一调整，会变成批量改很多对象。

目录级 preset 正好适合承接“共享默认值”，而单文件 override 继续负责最具体的差异项。

## 数据结构

新增 `docs-site/scripts/demo-metadata-presets.mjs`。

结构采用目录路径作为 key：

```js
export const demoMetadataDirectoryPresets = {
  'animation-js/progress-demo': {
    defaults: {
      tags: ['CSS3', 'Progress', 'JavaScript'],
      difficulty: 'beginner'
    },
    entries: {
      'demo1.html': {
        title: '定时器进度条 · 基础版'
      }
    }
  }
}
```

## 字段职责

### `defaults`

目录级通用配置，适合承接：

- `tags`
- `difficulty`
- 通用描述风格
- 系列 slug 前缀

### `entries`

目录内单文件差异项，适合承接：

- 具体标题
- 具体描述
- 单文件 slug
- 少量特殊 tags

## 合并顺序

最终 metadata 的合并顺序为：

1. 自动提取默认 metadata。
2. 目录 preset 的 `defaults`。
3. 目录 preset 的 `entries[fileName]`。
4. 单文件 override。

这个顺序的含义是：

- 自动提取永远是兜底。
- preset 负责目录级公共语义。
- override 保留最高优先级，专门处理个别 demo 的最终修正。

## 校验机制

### 1. preset 目录必须存在

如果 preset key 指向的目录在 `public/` 下不存在，直接报错。

### 2. preset entries 必须命中真实文件

如果 `entries` 中配置了一个当前目录不存在的 HTML 文件，也直接报错。

### 3. 最终 slug 仍需唯一

不管 slug 来自默认规则、preset 还是 override，最终生成出的 `id` 都必须唯一。

## 迁移策略

本轮不追求把全部 overrides 都挪进 preset，而是优先迁移最能体现“目录共性”的几组：

- 进度条系列
- Caption Hover 系列
- 里程图片系列
- Flex 布局系列

对于像 `layouts/base-layout` 这类虽然在同目录，但每个页面主题仍然相对独立的情况，本轮只抽取共性的 tags 和 difficulty，不强行统一标题策略。

## 预期收益

- metadata 文件结构更清晰。
- 同系列 demo 的配置更集中。
- 后续新增同目录 demo 时，只需要补最少量差异配置。
- preset 和 override 分层后，更容易继续扩展目录级截图、推荐权重等能力。
