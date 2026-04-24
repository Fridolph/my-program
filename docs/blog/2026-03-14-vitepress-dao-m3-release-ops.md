# 2026-03-14 · 用 Dao 流程把 VitePress 展示站的发布与运维链路收口

## 背景

M1 解决了内容治理，M2 解决了浏览流转，但如果发布链路、本地命令和旧入口还各走各的，站点依然很难真正成为仓库默认入口。

所以 M3 的目标不是加页面，而是先把这几个问题收口：

- 本地到底从哪里进入文档站工作区
- GitHub Pages 到底走哪套安装和构建链路
- 旧 `views/index.html` 到底还算不算默认首页

## 这轮判断

这轮我没有把重点放在“能不能发布”，因为它原本就已经能发布。

我更在意的是：

> 本地、CI 和仓库对外入口，是否在说同一件事。

如果这三层还不一致，后面无论做内容还是做体验，都还会持续出现认知分叉。

## 我怎么做的

### 1. 先统一根目录命令

我先把根目录命令补齐到可以完整覆盖文档站日常操作：

- `pnpm docs:dev`
- `pnpm docs:generate`
- `pnpm docs:build`
- `pnpm docs:preview`
- `pnpm docs:check`

这样以后默认工作方式就不需要先切到 `docs-site/` 再想脚本名了。

### 2. 再统一 GitHub Pages 工作流

仓库本身是 pnpm workspace，但原来的 GitHub Actions 还在 `docs-site` 里走 npm。

这会带来两个问题：

- 本地和 CI 的安装路径不一致
- 根目录 `pnpm-lock.yaml` 和 `docs-site/package-lock.json` 长期并存

所以这轮我把工作流改成了：

- `pnpm/action-setup`
- `actions/setup-node` + pnpm cache
- 根目录 `pnpm install --frozen-lockfile`
- 根目录 `pnpm docs:build`

同时删除了 `docs-site/package-lock.json`，让锁文件语义回到根目录。

### 3. 最后收口旧入口

旧 `views/index.html` 之前还像一个可直接进入的首页。

这轮我没有直接删掉它，而是把它改成一个迁移说明页：

- 自动跳转到新的展示站首页
- 保留手动入口
- 明确说明它已经不是默认入口

这一步比直接删除更稳，因为历史外链仍然有缓冲空间。

## 代码与文档落点

这轮主要改动落在下面几个地方：

- `package.json`
- `.github/workflows/static.yml`
- `views/index.html`
- `README.md`
- `docs/frontend/vitepress-dao-m3-release-ops-design.md`
- `docs/frontend/vitepress-dao-m3-release-ops-tasks.md`

这一轮的变化很“基础设施”，但正因为如此，它更适合被写进里程碑文档，而不是只散落在 commit message 里。

## 自测

这轮每个子任务完成后都执行：

```bash
pnpm docs:check
```

它实际上覆盖了：

```bash
pnpm docs:generate
pnpm docs:build
```

所以至少可以确认两件事：

- 根目录命令已经能稳定承接文档站的生成与构建
- M3 的入口收口和 CI 调整没有破坏现有主链路

## 这轮最重要的变化

M3 完成后，项目的默认入口语义终于开始统一：

- 开发入口：根目录 pnpm 命令
- 构建入口：根目录 pnpm 命令
- 发布入口：GitHub Pages 工作流调用根目录 pnpm 命令
- 展示入口：VitePress 站点首页
- 旧入口：仅保留迁移说明

这一步看起来不像首页精选那样“显眼”，但它其实是在给后面的长期维护减阻。

## 下一步

M3 完成后，下一步自然进入 M4：内容产品化演进。

重点会更偏向：

1. demo 之外的文章与专题内容
2. 多维导航与内容组织方式
3. 站点从“展示站”继续向“内容型项目”推进
