# My Program

[![Deploy VitePress site to Pages](https://github.com/Fridolph/my-program/actions/workflows/static.yml/badge.svg?branch=main)](https://github.com/Fridolph/my-program/actions/workflows/static.yml)
[![GitHub Pages](https://img.shields.io/badge/site-online-2563eb?logo=githubpages&logoColor=white)](https://fridolph.github.io/my-program/)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-646cff?logo=vite&logoColor=white)](https://vitepress.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-8.15.9-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License: ISC](https://img.shields.io/badge/license-ISC-0f172a)](./package.json)

一个以 **VitePress** 为核心的前端 Demo 展示站与内容化整理仓库。

这个项目最初是一个静态 Demo 集合，当前已经逐步重构为一个可在线访问的展示站：它不只保留原始示例代码，也补充了分类、标签、场景、难度、专题路线、开发笔记与发布说明，方便把历史 Demo 变成更易浏览、可复用、可持续维护的内容资产。

## 在线体验

- 站点首页：[https://fridolph.github.io/my-program/](https://fridolph.github.io/my-program/)
- 项目进度：[项目进度页](https://fridolph.github.io/my-program/guide/progress/)
- 发布说明：[发布说明页](https://fridolph.github.io/my-program/guide/deployment/)
- 多维导航：[Explore 导航页](https://fridolph.github.io/my-program/explore/)
- 专题发现：[Discover 页面](https://fridolph.github.io/my-program/discover/)
- 历史入口说明：[views/index.html](https://fridolph.github.io/my-program/views/index.html)

## 项目定位

这个仓库不只是“放了一堆 HTML 文件”的 Demo 仓库，而是在做三件事：

1. **保留原始 Demo 资产**：历史静态示例仍然放在 `public/` 中，便于直接访问和二次改造。
2. **把 Demo 产品化整理**：通过脚本扫描、元数据覆盖、页面生成和内容编排，把 Demo 变成可检索、可浏览、可串联的内容站点。
3. **建立可持续发布链路**：通过 GitHub Actions + GitHub Pages，把 `main` 分支的更新自动构建并发布为静态网站。

## 当前亮点

- 基于 VitePress 的在线展示站
- 已自动生成 **74** 个 Demo 详情页
- 已整理 **6** 大分类：动画、过渡、Canvas、jQuery、布局、其他效果
- 支持按 **分类 / 标签 / 场景 / 难度** 多维浏览
- 提供 **专题路线（Spotlights）**，把零散 Demo 串成更有上下文的问题路径
- 提供 **Quick Start / Discover / Journal** 等内容入口
- 提供 **发布状态页** 与 **部署说明页**，便于回看构建与发布情况
- 默认通过 GitHub Pages 对外提供静态访问

## 适合谁

这个项目适合以下几类使用者：

- 想找前端交互、动画、布局、视觉小效果参考的人
- 需要快速借用一个静态 Demo 做原型或演示的人
- 想把历史 Demo 仓库升级为“可访问的文档 / 博客 / 展示站”的开发者
- 想参考 VitePress 内容化改造、自动生成页面、静态站发布流程的人

## 技术栈

| 类别 | 技术 |
| --- | --- |
| 站点框架 | `VitePress` |
| 前端基础 | `Vue 3`、`Vite` |
| 包管理 | `pnpm@8.15.9` |
| 构建方式 | 静态生成 |
| 发布方式 | `GitHub Actions` + `GitHub Pages` |
| 资产来源 | `public/` 历史 Demo 静态资源 |
| 页面生成 | `docs-site/scripts/` 下的扫描与生成脚本 |

## 快速开始

### 环境要求

- Node.js 20+
- pnpm 8.15.9

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm docs:dev
```

该命令会启动 VitePress 本地开发服务，适合修改文案、结构、样式后快速查看效果。

### 生成站点内容

```bash
pnpm docs:generate
```

该命令会扫描 `public/` 中的 Demo 资源，并根据当前元数据和生成规则产出文档页面、聚合页和相关静态资产。

### 构建产物

```bash
pnpm docs:build
```

### 发布前自检

```bash
pnpm docs:check
```

该命令会执行“生成 + 构建”的完整最小闭环，是当前最推荐的发布前校验命令。

### 产物态预览

```bash
pnpm docs:preview
```

该命令更适合在发布前验证最终产物的真实访问效果。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm docs:dev` | 启动 VitePress 本地开发环境 |
| `pnpm docs:generate` | 生成 Demo 页面、聚合页与静态内容 |
| `pnpm docs:build` | 构建文档站点 |
| `pnpm docs:check` | 执行生成 + 构建的完整自检 |
| `pnpm docs:preview` | 预览最终构建产物 |
| `pnpm dev:fe` | 启动 `packages/frontend` |
| `pnpm dev:admin` | 启动 `packages/admin` |

## 仓库结构

```text
my-program/
├─ docs-site/                  # VitePress 站点源码
│  ├─ .vitepress/              # 站点配置、主题组件、生成产物索引
│  ├─ demos/                   # 自动生成的 Demo 文档页
│  ├─ discover/                # 专题发现入口
│  ├─ explore/                 # 标签 / 场景 / 难度聚合页
│  ├─ guide/                   # 项目进度、路线图、部署说明等
│  ├─ journal/                 # 开发笔记
│  ├─ public/                  # 站点公开静态资源
│  └─ scripts/                 # Demo 扫描、页面生成、内容编排脚本
├─ public/                     # 历史静态 Demo 原始资源
├─ scripts/                    # 根级开发与预览辅助脚本
├─ views/                      # 历史入口说明页
├─ packages/
│  ├─ frontend/                # 历史或附属前端工程
│  ├─ admin/                   # 历史或附属后台工程
│  └─ tailwind-config/         # 共享 Tailwind 配置
├─ logs/                       # 本地开发日志与交接记录
├─ package.json
└─ pnpm-workspace.yaml
```

## 内容生成方式

当前站点的核心思路是：

`public/` 中的原始 Demo 资源不直接暴露为“只有目录的静态站”，而是通过脚本转换成更友好的内容结构。

大致流程如下：

1. 扫描 `public/` 目录中的 HTML Demo 资源。
2. 读取并合并分类、标签、场景、难度等元数据。
3. 自动生成：
   - Demo 详情页
   - 分类聚合页
   - 标签页 / 场景页 / 难度页
   - Discover / Spotlights / Quick Start 相关内容页
   - 分享图与发布快照等静态资产
4. 交由 VitePress 构建为最终可发布站点。

如果你想新增一个 Demo，通常可以按下面的方式操作：

1. 将原始示例放入 `public/` 对应分类目录。
2. 如有必要，在 `docs-site/scripts/` 的元数据覆盖层中补充标题、描述、标签、场景等信息。
3. 运行 `pnpm docs:generate`。
4. 运行 `pnpm docs:check`，确认页面生成与构建通过。

## 当前内容入口

你可以从不同入口进入这个仓库：

- **首页**：快速了解仓库定位和当前重点内容
- **Demo 分类**：按效果类型查看
- **Discover**：按“问题 / 主题 / 路线”进入
- **Explore**：按标签、场景、难度进入
- **Journal**：查看每一轮开发演进的背景与记录
- **Guide**：查看进度、路线图、发布与构建说明

## 部署说明

当前仓库已经接入 GitHub Pages 自动发布链路：

- 发布分支：`main`
- 工作流文件：`./.github/workflows/static.yml`
- 发布方式：GitHub Actions 构建后部署到 GitHub Pages

当前发布链路会执行以下步骤：

1. 安装依赖
2. 执行 `pnpm docs:check`
3. 同步站点所需静态资源
4. 上传 Pages artifact
5. 发布为 GitHub Pages 静态站点

如果你需要了解更完整的发布细节，可以直接查看：

- [`docs-site/guide/deployment.md`](./docs-site/guide/deployment.md)
- [`docs-site/guide/release-status.md`](./docs-site/guide/release-status.md)

## 开发现状

当前仓库已经完成从“静态 Demo 集合”到“内容化展示站”的一轮重构闭环。  
现阶段的重点不再只是继续堆 Demo，而是持续增强以下能力：

- 内容入口的清晰度
- Demo 页面解释力
- 发布链路稳定性
- 多维导航与专题路线的承接能力
- Quick Start 与内容消费路径的完整度

如果你想了解最近一轮里程碑推进情况，推荐先看：

- [`docs-site/guide/progress.md`](./docs-site/guide/progress.md)
- [`docs-site/guide/roadmap.md`](./docs-site/guide/roadmap.md)

## 贡献方式

欢迎通过以下方式参与：

- 提交 Issue，反馈页面问题、死链、内容建议或想补充的 Demo 类型
- 提交 Pull Request，补充 Demo、修正文案、优化生成脚本或改进部署链路
- Star / Fork 仓库，作为后续迭代的反馈支持

建议在提交前至少执行一次：

```bash
pnpm docs:check
```

## Roadmap

接下来的工作会继续围绕这几个方向推进：

- 提升 Demo 内容说明的完整度
- 优化专题路线与 Quick Start 的承接关系
- 补齐线上预览、链接生成与发布细节的一致性
- 持续治理历史 Demo 资产，降低“能看但不好用”的比例
- 优化公开仓库的文档门面与贡献体验

## 致谢

感谢所有被保留、整理和重新组织进这个仓库的历史 Demo。  
也感谢每一位愿意 Star、Fork、提建议或直接参与改造的人。

如果这个项目对你有帮助，欢迎点一个 Star ⭐
