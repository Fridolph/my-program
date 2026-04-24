---
layout: doc
title: 开发笔记
description: 记录展示站重构、内容治理和发布标准化的阶段笔记
---

# 开发笔记

这里收录当前项目的重要阶段笔记。它们不是代码清单，而是解释“为什么这样做”的内容入口。

## 最近更新

<div class="journal-card-grid">
    <a class="journal-card" href="/journal/dao-m25-quick-start-overdoing-guardrails">
      <span class="journal-card-date">2026-03-28</span>
      <strong>M25 开发笔记：让 quick start 开始提醒哪里最容易做过头</strong>
      <p>继续沿 quick start 主链路补“做过头”的提醒，让站点开始表达当前这条线最容易失控的地方。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m24-quick-start-tradeoff-guidance">
      <span class="journal-card-date">2026-03-28</span>
      <strong>M24 开发笔记：让 quick start 开始解释为什么先补这一类</strong>
      <p>继续沿 quick start 主链路补推进取舍说明，让站点开始回答为什么当前先补 A，而不是 B。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m23-quick-start-defer-guidance">
      <span class="journal-card-date">2026-03-28</span>
      <strong>M23 开发笔记：让 quick start 开始表达当前先不上什么</strong>
      <p>为 quick start 补反向推进语义，让站点不只表达下一步该补什么，也开始表达当前先不上什么更稳。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m22-quick-start-follow-up-segments">
      <span class="journal-card-date">2026-03-28</span>
      <strong>M22 开发笔记：让 quick start 的下一步开始对齐角色与阶段</strong>
      <p>继续复用 quick start 主链路，把推进类型和角色 / 阶段交叉起来，让下一步建议更贴近当前视角与时机。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m21-quick-start-follow-up-types">
      <span class="journal-card-date">2026-03-21</span>
      <strong>M21 开发笔记：让 quick start 的下一步开始区分推进类型</strong>
      <p>为 quick start 补推进类型元数据，并生成按推进类型回看的入口页，让下一步建议不只停在跳转链接。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m20-quick-start-follow-up">
      <span class="journal-card-date">2026-03-21</span>
      <strong>M20 开发笔记：让 quick start 开始接住第一版之后的下一步</strong>
      <p>为 quick start 补下一步串联元数据，并让 quick start、首页与 discover 开始表达继续推进建议。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m19-quick-start-segmentation">
      <span class="journal-card-date">2026-03-20</span>
      <strong>M19 开发笔记：让 quick start 开始按角色和阶段分层</strong>
      <p>为 quick start 补角色与阶段元数据，生成分层页，并把分层入口接回 quick start 与 discover。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m18-quick-start-decision">
      <span class="journal-card-date">2026-03-16</span>
      <strong>M18 开发笔记：让 quick start 开始承担轻量决策辅助</strong>
      <p>为 quick start 补决策摘要与改造成本提示，并让首页和 discover 的卡片开始表达投入感。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m17-quick-start-playbook">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M17 开发笔记：让 quick start 不只告诉你去哪，也告诉你先怎么做</strong>
      <p>为 quick start 补推荐步骤、选择建议和误区提醒，并让首页直接暴露具体问题入口。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m16-quick-start">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M16 开发笔记：让用户按当前问题直接开始</strong>
      <p>新增 quick start 入口，作为轻量检索替代方案，让用户能直接从问题进入路线、场景与 demo。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m15-route-expansion">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M15 开发笔记：继续扩路线密度，也把长尾场景讲清楚</strong>
      <p>扩充专题路线，并为一批长尾 scene 补 narrative，让 scene 页和首页入口都更像真正的内容入口。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m14-spotlight-feedback">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M14 开发笔记：让专题路线真正回流到 demo 详情页</strong>
      <p>把专题路线从上层入口继续接回 demo 详情页，并补齐 spotlight 长尾 demo 的结构化深描内容。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m13-spotlight-aggregation">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M13 开发笔记：让场景入口开始长成更完整的问题路线</strong>
      <p>把相近 scene 聚成专题路线，并让首页与 discover 开始承接更高层的问题入口。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m12-visual-entry">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M12 开发笔记：让内容入口不只可用，也一眼更好判断</strong>
      <p>为分类和场景建立统一入口封面，并把首页、discover、explore 改成更可视的封面卡片入口。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m11-build-performance">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M11 开发笔记：让站点回到内容入口优先的轻量构建状态</strong>
      <p>收掉高成本本地搜索入口，收敛 header 信息优先级，并把 docs:dev / docs:preview 的职责明确写回文档。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m10-content-depth">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M10 开发笔记：让 demo 页开始真正承担内容解释职责</strong>
      <p>为重点 demo 补结构化内容骨架，并补强公共场景与 scene narrative，让详情页和场景页都更像内容入口。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m9-release-observability">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M9 开发笔记：让发布结果开始拥有可回看的状态快照</strong>
      <p>新增发布快照、站内发布状态页和 workflow 发布摘要，让发布结果开始具备可回看的状态表达。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m8-page-share-assets">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M8 开发笔记：让关键页面开始拥有自己的传播语义</strong>
      <p>让页面级分享图进入生成链路，使首页、Demo 页、指南页和开发笔记页拥有各自的传播卡片。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m7-release-convergence">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M7 开发笔记：让发布链路可回看，让旧入口真正完成收敛</strong>
      <p>把发布说明、workflow 校验和旧入口迁移说明统一收口，让发布链路更可回看、可验证。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m6-seo-sharing">
      <span class="journal-card-date">2026-03-15</span>
      <strong>M6 开发笔记：让站点开始具备被搜索与被分享的基础能力</strong>
      <p>补齐 canonical、OG、Twitter Card、robots、manifest 和 sitemap，让站点开始具备外部可见性基础设施。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m5-multi-dimensional-navigation">
      <span class="journal-card-date">2026-03-14</span>
      <strong>M5 开发笔记：让 metadata 真正长成站点导航</strong>
      <p>把 tags、scenes 和 difficulty 从生成字段推进成可访问的站点导航结构。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m4-content-productization">
      <span class="journal-card-date">2026-03-14</span>
      <strong>M4 开发笔记：让展示站开始承载内容</strong>
      <p>让开发笔记、专题发现和首页内容入口进入站点主路径，推动展示站向内容站演进。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m0-planning">
      <span class="journal-card-date">2026-03-14</span>
      <strong>M0 开发笔记：先把方法立住</strong>
      <p>先把执行协议、业务流程和里程碑结构立住，让后续每轮开发都沿着同一条 Dao 链路推进。</p>
    </a>
    <a class="journal-card" href="/journal/dao-m1-content-governance">
      <span class="journal-card-date">2026-03-14</span>
      <strong>M1 开发笔记：内容治理收口</strong>
      <p>把 demo metadata、标题描述、标签场景和精选编排收口成稳定的内容治理机制。</p>
    </a>
    <a class="journal-card" href="/journal/metadata-overrides">
      <span class="journal-card-date">2026-03-12</span>
      <strong>阶段笔记：人工 metadata 覆盖层</strong>
      <p>记录如何在自动扫描之外补一层人工覆盖，让标题、描述和 slug 更像内容，而不是文件名。</p>
    </a>
    <a class="journal-card" href="/journal/featured-curation">
      <span class="journal-card-date">2026-03-13</span>
      <strong>阶段笔记：首页精选与封面策展</strong>
      <p>记录首页如何从列表导航升级成 metadata 驱动的精选策展入口。</p>
    </a>
  </div>
