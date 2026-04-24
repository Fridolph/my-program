---
layout: doc
title: Dao Commit 规范
description: Dao Commit Specification 的阅读入口与工程定位说明
---

# Dao Commit 规范

这份文档定义了 Dao 工程体系里的 commit 语义层。它保留 Angular Commit 的工具链兼容性，同时增加卦象、卦名、踩坑记录和知识沉淀语义。

## 文档定位

- 文档名称：Dao Commit Specification
- 版本：v1.1
- 创建日期：2026 年 3 月 9 日
- 文档位置：`docs/dao-commit-spec.md`
- 仓库主文档：`docs/dao-commit-spec.md`

## 核心格式

```text
[上卦下卦][卦名] type(scope): 简短描述
```

## 这份规范解决什么问题

- 让提交记录不只描述“做了什么”，也描述“系统发生了什么本质变化”。
- 让 commit history 从时间线升级为带语义的演进网络。
- 让踩坑记录和经验沉淀可以被后续开发和 AI 工具复用。
- 让工程体系具备更高的知识密度和可追溯性。

## 工程中的关键价值

| 维度 | Angular Commit | Dao Commit |
| --- | --- | --- |
| 做了什么 | 有 | 有 |
| 变化方向 | 弱 | 强 |
| 状态本质 | 弱 | 强 |
| 知识沉淀 | 弱 | 强 |
| AI 可检索语义 | 低 | 高 |

## 为什么先补这份文档

接下来如果我们继续推进项目开发、重构、知识沉淀和内容产品化，这份规范可以作为工程协作的统一记录方式。这样后面无论是代码提交、阶段报告还是经验归档，都会有同一套语言。

## 主文档位置

完整原文保存在 `/Users/fridolph/Desktop/github/my-program/docs/dao-commit-spec.md`。
