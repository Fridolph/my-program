# VitePress 目录级 Metadata 预设任务拆解

## 背景

人工 metadata 覆盖层已经解决了“关键 demo 可以精修”的问题，但随着覆盖项增加，另一个问题开始出现：

- 同一目录下的 demo 往往共享相同主题、标签和难度。
- 现在这些重复信息仍然散落在多个 override 项里。
- 一旦同系列 demo 继续增加，覆盖文件会越来越长，维护成本会上升。

所以这一轮不再继续堆更多单条 overrides，而是往前走一步，补“目录级 metadata 预设”。

## 本轮目标

- 让同目录 demo 可以共享一套基础 metadata。
- 保留单文件 override 作为更高优先级的精修层。
- 把目前重复较多的目录迁移到 preset 机制上。
- 保持生成链路和校验机制稳定。

## 任务拆解

### T1：识别适合抽成 preset 的目录

优先处理这些重复明显的目录：

- `animation-js/progress-demo`
- `hover-transition/hover卡片2`
- `hover-transition/里程图片`
- `layouts/base-layout`
- `layouts/flex`

这些目录具备明显的系列性，适合共享：

- tags
- difficulty
- 目录级描述基调
- 局部 slug / title 规则

### T2：设计目录级 preset 数据结构

要求：

- 以目录路径作为 key。
- 支持目录级默认字段。
- 支持对目录内单文件做局部补充配置。
- 和现有单条 override 保持清晰优先级。

### T3：接入 registry 合并逻辑

合并顺序应明确为：

1. 自动提取默认 metadata。
2. 目录级 preset。
3. 单文件 override。

这样目录 preset 负责“系列共性”，单文件 override 负责“最终精修”。

### T4：补校验

- preset 指向不存在目录时，生成阶段报错。
- preset 内的文件配置如果找不到真实 HTML，也应报错。
- preset 和 override 叠加后仍要检查 slug 冲突。

### T5：迁移重复配置

优先把重复率最高的一批从 override 中收敛到 preset：

- 进度条系列
- Caption Hover 系列
- 里程图片系列
- Flex 布局系列
- 基础布局系列中的通用标签和难度

### T6：沉淀文档与开发记录

- 说明为什么 metadata 层继续拆分为 preset + override 两层。
- 说明这两层各自的职责边界。
- 记录迁移重复配置后的收益和限制。

## 验收标准

- 同目录 demo 可共享 preset 元数据。
- 单文件 override 仍然可以覆盖 preset。
- 重复配置明显减少。
- 生成和构建通过。
- 文档与博客同步补齐。
