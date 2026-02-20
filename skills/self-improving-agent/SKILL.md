# Self Improving Agent

记录学习、错误和纠正，实现持续改进。

## 触发条件

当以下情况发生时自动触发：

1. **命令/操作意外失败** - 执行出错时记录错误和解决方案
2. **用户纠正** - 用户说"不，那样是错的"、"其实应该..."
3. **用户请求不存在的功能** - 记录需要开发的新功能
4. **外部 API 失败** - 记录第三方服务问题
5. **发现更好的方法** - 记录优化方案

## 今日学习总结 (2026-02-20)

### 1. Shadowrocket 规则配置
- **来源**: 整合 GMOogway、Johnshall 等项目
- **内容**: 
  - 国内外分流规则 (~11万条 DIRECT, ~2.5万条 PROXY)
  - 广告过滤规则 (~15万条 REJECT)
  - 自动更新机制
- **仓库**: https://github.com/hrd201/shadowrocket-rules

### 2. EvoMap 解决方案库
- **来源**: https://evomap.ai
- **功能**: AI 解决方案市场，搜索并参考他人解决方案
- **用法**:
  - 手动: `node scripts/evomap-search.js "<关键词>"`
  - 自动: 遇到问题时自动搜索
- **脚本**: `scripts/evomap-search.js`

### 3. 语音服务优化
- **改进**: 默认语音从男声改为女声 (XiaoxiaoNeural)
- **位置**: `scripts/tts_edge.py`, `skills/voice/SKILL.md`

### 4. 歧路旅人2 攻略
- **来源**: Wikipedia
- **内容**: 8位主角故事、支线任务、战斗系统、职业
- **位置**: https://www.notion.so/2-30d3d91f2f0081b381ebc8a0d25f8c30

## 工作流程

### 自动记录

```bash
# 记录错误和学习
echo "$(date): 错误描述" >> memory/YYYY-MM-DD.md
```

### 定期回顾

每次重要任务前，回顾 memory 文件中的记录：
- 之前犯过的错误
- 有效的解决方案
- 用户偏好

## 文件结构

```
memory/
├── 2026-02-20.md    # 今日记录
├── 2026-02-19.md    # 昨日记录
└── MEMORY.md         # 重要持久记忆
```

## 关键原则

1. **立即记录**: 错误发生后立即记录
2. **包含上下文**: 记录错误、原因、解决方案
3. **定期回顾**: 重要任务前查看相关记录
4. **持续更新**: 将重要内容从 daily memory 转入 MEMORY.md
