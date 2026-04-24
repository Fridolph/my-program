# VitePress 重构里程碑与任务拆解

## 目标

把当前 demo 仓库的展示站，从“已有页面集合”推进到“可持续生成、可稳定维护、可继续扩展”的状态。

## 里程碑顺序

### 里程碑 1：内容资产编目

先回答一个基本问题：仓库里到底有多少可展示 demo。

任务：

- 遍历 `public/` 下所有分类目录。
- 识别 `index.html` 与多页面 demo。
- 为每个 demo 生成稳定 ID、标题、描述、标签、难度。
- 把扫描结果统一收敛为站点数据源。

交付物：

- 统一 demo registry。
- 可复用的分类映射和扫描规则。

### 里程碑 2：页面生成自动化

在编目结果稳定后，再把它转换成页面。

任务：

- 自动生成首页。
- 自动生成分类页。
- 自动生成详情页。
- 输出侧边栏配置供 VitePress 直接消费。

交付物：

- `docs-site/demos/**` 生成结果。
- `.vitepress/generated/demo-sidebar.mjs`。

### 里程碑 3：预览能力补强

页面生成解决的是“找得到”，预览能力解决的是“看得准”。

任务：

- 修复 Shadow DOM 重复挂载。
- 重写 demo 内相对路径资源。
- 尽量恢复脚本型 demo 的执行。
- 保留原始页面跳转兜底。

交付物：

- 更稳定的 `DemoPreview.vue`。

### 里程碑 4：构建与发布闭环

生成链路只有接到构建里，才不会长期漂移。

任务：

- 把 `generate` 接入 `predev` / `prebuild`。
- 调整 CI，让安装、生成、构建顺序固定。
- 明确本地开发和 GitHub Pages 的职责边界。

交付物：

- 更新后的 `docs-site/package.json`。
- 更新后的 GitHub Actions 工作流。

### 里程碑 5：沉淀文档和后续 backlog

把当前阶段做清楚，也把下阶段入口留出来。

任务：

- 输出重构进度盘点。
- 输出详细设计文档。
- 输出开发过程技术博客。
- 记录后续可选增强项。

交付物：

- `docs/frontend/` 规划与设计文档。
- `docs/blog/` 开发记录。

## 实施优先级

1. 先做编目与生成链路。
2. 再做导航和预览稳定性。
3. 然后接入构建流程。
4. 最后统一整理文档和经验。

## 本轮范围

本轮直接实现里程碑 1 到里程碑 4 的核心部分，并补齐里程碑 5 的文档输出。

## 当前追加里程碑：Metadata 精修层

在里程碑 1 到 4 跑通后，补一个内容质量导向的小里程碑。

任务：

- 新增人工 metadata override 机制。
- 优先修标题、描述、标签和 slug 质量较差的 demo。
- 为覆盖层增加路径与 slug 冲突校验。

交付物：

- `docs-site/scripts/demo-metadata-overrides.mjs`
- registry 中的 override 合并与校验逻辑
- 对应的任务拆解、设计文档和开发博客

## 当前追加里程碑：目录级 Metadata 预设

在单文件 metadata 覆盖层跑通后，再向前补一层目录级 preset。

任务：

- 识别系列化目录并提取共享 metadata。
- 建立 preset 与 override 的分层合并顺序。
- 给 preset 增加目录和文件命中校验。

交付物：

- `docs-site/scripts/demo-metadata-presets.mjs`
- registry 中的 preset 合并逻辑
- 对应任务拆解、设计文档与开发博客

## 当前追加里程碑：首页精选编排

在 metadata 分层稳定后，把首页精选切换为 metadata 驱动。

任务：

- 给 demo 增加 featured 优先级与推荐理由。
- 让首页精选按 metadata 编排。
- 为首页卡片补精选语义和推荐说明。

交付物：

- registry 中的 featured 合并与校验逻辑
- 首页生成规则调整
- 对应任务拆解、设计文档与开发博客

## 当前追加里程碑：首页精选封面策展

在首页精选编排稳定后，再补一层轻量 cover metadata。

任务：

- 给精选 demo 增加 cover 字段。
- 让首页精选卡片支持封面图或渐变封面。
- 为封面结构增加基础校验与兜底样式。

交付物：

- registry 中的 cover 合并与校验逻辑
- 首页精选卡片封面展示
- 对应任务拆解、设计文档与开发博客

## 当前追加里程碑：首页精选封面资源化

在 cover metadata 稳定后，把首页封面继续推进成可复用资源。

任务：

- 为精选 demo 生成 SVG 封面资源。
- 让首页优先使用 image cover。
- 保留 gradient cover 作为兜底能力。

交付物：

- `docs-site/scripts/generate-cover-assets.mjs`
- `public/featured-covers/` 资源目录
- 对应任务拆解、设计文档与开发博客
