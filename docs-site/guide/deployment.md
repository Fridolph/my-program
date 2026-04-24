---
layout: doc
title: 发布说明
description: 记录 my-program 当前 VitePress 展示站的发布方式、校验步骤与旧入口迁移说明
---

# 发布说明

这一页用来收口当前展示站的发布方式、关键校验步骤和旧入口迁移策略。

## 默认发布事实

- 默认展示入口：`/`
- 旧入口说明页：`/views/index.html`
- 默认站点源码入口：`docs-site/`
- GitHub Pages 工作流：`.github/workflows/static.yml`

## 本地发布前检查

推荐始终在仓库根目录执行下面这组三步：

```bash
pnpm docs:generate
pnpm docs:build
pnpm docs:check
```

其中：

- `pnpm docs:generate` 负责生成 demo 页、内容页和站点级静态资产。
- `pnpm docs:build` 负责构建 VitePress 站点产物。
- `pnpm docs:check` 用于执行生成 + 构建的完整最小闭环检查。

## 本地预览建议

当前建议把本地验证分成两层：

1. 开发态预览：`pnpm docs:dev`
2. 产物态预览：`pnpm docs:preview`

其中：

- `pnpm docs:dev` 更适合快速改样式、改内容和即时回看。
- `pnpm docs:preview` 会先构建并同步静态资源，再基于最终产物启动预览，更适合发布前确认真实访问结果。

## 当前构建判断

当前站点已经具备首页、discover、多维导航、分类页和 demo 回流入口。

因此这一轮不再默认依赖 VitePress 本地搜索，而是优先保持：

- 更轻的构建产物
- 更稳定的 header 空间
- 更清晰的内容入口结构

如果后续需要更强搜索能力，再单独评估更适合当前站点规模的搜索方案。

## GitHub Pages 发布链路

当前 GitHub Pages 工作流会按下面的顺序执行：

1. 安装依赖。
2. 运行 `pnpm docs:check`。
3. 将 `public/` 资源复制到构建产物。
4. 将 `views/` 旧入口说明页复制到构建产物。
5. 校验关键文件是否存在。
6. 上传 Pages artifact 并发布。

## 当前关键校验项

发布前，工作流会校验这些关键文件：

- `docs-site/.vitepress/dist/index.html`
- `docs-site/.vitepress/dist/sitemap.xml`
- `docs-site/.vitepress/dist/robots.txt`
- `docs-site/.vitepress/dist/manifest.webmanifest`
- `docs-site/.vitepress/dist/views/index.html`

这组校验的目标不是增加流程复杂度，而是确保站点最基础的入口、SEO 资产和旧入口说明都已经进入发布产物。

## 旧入口迁移说明

`views/index.html` 当前不再是默认首页，但仍然保留两个作用：

- 承接历史链接
- 明确提示默认入口已迁移到新的 VitePress 展示站

这意味着旧入口不是“继续承担主入口角色”，而是“作为历史兜底入口存在”。

## 遇到发布问题时先看什么

如果发布异常，建议按这个顺序检查：

1. `pnpm docs:check` 本地是否通过。
2. `/release-manifest.json` 与 `/guide/release-status` 中的当前快照是否符合预期。
3. `docs-site/public/` 中的 `robots.txt`、`manifest.webmanifest`、`sitemap.xml`、`release-manifest.json` 是否存在。
4. `.github/workflows/static.yml` 的 artifact 校验与发布摘要输出是否通过。
5. `views/index.html` 是否仍然保持迁移说明与 noindex 配置。

## 延伸入口

- [查看发布状态](/guide/release-status)
- [查看项目进度](/guide/progress)
- [查看里程碑规划](/guide/roadmap)
- [返回首页](/)
