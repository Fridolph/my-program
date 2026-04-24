---
layout: doc
title: 发布状态
description: 回看当前站点构建快照、关键校验项和回滚判断线索
---

# 发布状态

这一页用于回看当前构建的发布快照，让发布不只停留在 workflow 执行结果里。

## 当前快照

- 快照生成时间：2026-04-24T14:57:53.490Z
- Demo 数量：**74**
- 分类数量：**6**
- 标签数量：**67**
- 场景数量：**24**
- quick start 推进类型数量：**4**
- 开发笔记数量：**26**
- 页面级分享图数量：**242**
- 站点路由数量：**241**

## 当前发布命令

- `pnpm docs:generate`
- `pnpm docs:build`
- `pnpm docs:check`

## 关键发布校验项

| 校验项 | 目标文件 | 说明 |
| --- | --- | --- |
| 首页产物 | `index.html` | 发布前后都应存在 |
| sitemap | `sitemap.xml` | 发布前后都应存在 |
| robots | `robots.txt` | 发布前后都应存在 |
| manifest | `manifest.webmanifest` | 发布前后都应存在 |
| 发布快照 | `release-manifest.json` | 发布前后都应存在 |
| 旧入口说明页 | `views/index.html` | 发布前后都应存在 |

## 重点回看路由

- `/`
- `/guide/progress`
- `/guide/release-status`
- `/guide/deployment`
- `/demos/css-animation/animation-js-loading-love`
- `/journal/dao-m25-quick-start-overdoing-guardrails`

## 回滚基线

- 先确认本地 pnpm docs:check 是否通过。
- 再比对 release-manifest.json 中的关键统计与本次预期是否一致。
- 如果关键产物缺失，优先回看 workflow 校验与 generate 链路，而不是直接重新发布。
- 如需回滚，以最近一个已知通过的主分支提交重新触发发布。

## 快照文件

- 当前发布快照：[`/release-manifest.json`](/release-manifest.json)
- 发布说明入口：[查看发布说明](/guide/deployment)
- 项目进度入口：[查看项目进度](/guide/progress)
