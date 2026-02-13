---
name: phoenix-ops
description: Phoenix 专属执行规范与智能增强技能。用于 OpenClaw 日常运维、复杂任务双阶段回复（先处理中后结果）、异常排障、新闻整理、主页日更、以及高频 fetch failed 场景下的官方重置恢复流程。
---

# Phoenix Ops

## 核心执行规则
1. 复杂任务先发“处理中（预计时间）”，完成后再发“最终结果”。
2. 禁止只回复 `fetch failed`，必须包含：结果、原因、下一步。
3. 优先稳定性：先观测再改动，每次只改一项并验证。

## 故障优先级
1. **高频异常快速恢复（优先）**
   - 执行官方重置：`curl -fsSL https://openclaw.ai/install.sh | bash`
   - 重置后先做短消息+复杂消息双测试。
2. **恢复后最小改动排查**
   - 仅调整一处参数，观察至少一个监测窗口再继续。

## 回包规范
- 标准结构：
  - 结论（已修复/监控中/未修复）
  - 原因（当前最佳判断）
  - 下一步（明确动作）

## 任务模板
- 新闻整理：先抓官方来源，再补行业媒体；输出“动态+影响分析+行动建议”。
- 主页日更：按固定模板生成“标题/三条重点/正文/CTA/今日变更摘要”。

## 参考文档
- `references/recovery-playbook.md`
- `references/reply-contract.md`
- `references/news-brief-template.md`
