# Skills Index

本目录包含 OpenClaw 可用的所有技能，每个技能提供特定领域的工具和最佳实践。

---

## 📚 技能分类

### 1. OpenClaw 运维

| 技能 | 描述 | 用途 | 状态 |
|------|------|------|------|
| [phoenix-ops](./phoenix-ops/SKILL.md) | Phoenix 专属执行规范与智能增强 | 日常运维、异常排障、新闻整理 | ✅ 完善 |
| [gateway-stability-guard](./gateway-stability-guard/SKILL.md) | Gateway 稳定性维护 | 通道可靠性问题诊断 | ✅ 完善 |

### 2. 内容运营

| 技能 | 描述 | 用途 | 状态 |
|------|------|------|------|
| [homepage-daily-ops](./homepage-daily-ops/SKILL.md) | 主页日常运营 | 每日内容更新、网站维护 | ✅ 完善 |
| [search-engine](./search-engine/SKILL.md) | 搜索引擎技能 | 搜索结果优化 | ✅ 完善 |

### 3. 合规监控

| 技能 | 描述 | 用途 | 状态 |
|------|------|------|------|
| [infringement-monitor-compliance](./infringement-monitor-compliance/SKILL.md) | 产品侵权监控 | 短视频/电商平台侵权监测 | ✅ 完善 |

### 4. 解决方案库

| 技能 | 描述 | 用途 | 状态 |
|------|------|------|------|
| [evomap-search](./evomap-search/SKILL.md) | EvoMap 解决方案搜索 | 从 AI 解决方案库查找思路 | ✅ 新增 |

### 5. 效率工具

| 技能 | 描述 | 用途 | 状态 |
|------|------|------|------|
| [notion](./notion/SKILL.md) | Notion API 操作 | 读写 Notion 页面/数据库 | ✅ 已配置 |
| [voice](./voice/SKILL.md) | 语音服务 (TTS/STT) | 文字转语音、语音转文字 | ✅ 已配置 |

---

## 📖 如何使用技能

### 方法 1: 告诉 AI 直接使用

直接告诉 AI：

```
"使用 phoenix-ops 技能排查问题"
"用 search-engine 搜索 xxx"
```

AI 会自动：
1. 读取对应的 SKILL.md 了解用法
2. 执行必要的脚本
3. 报告结果

### 方法 2: 直接读取文档

阅读每个技能的 `SKILL.md` 文件获取：
- 📋 前置条件和依赖
- 🔧 使用方法
- 📝 示例和注意事项

---

## ➕ 添加新技能

添加新技能时，创建以下结构：

```
skills/
└── your-skill-name/
    ├── SKILL.md        # 技能文档（必需）
    ├── scripts/         # 脚本目录（可选）
    │   ├── run.sh      # Linux/Mac
    │   └── run.ps1     # Windows
    └── README.md       # 说明（可选）
```

### SKILL.md 模板

```markdown
# 技能名称

## 用途
简短描述这个技能做什么

## 前置条件
- 需要什么工具/权限

## 使用方法
1. 步骤1
2. 步骤2

## 示例
```

---

## 🔗 相关文件

- [TOOLS.md](./TOOLS.md) - 本地工具笔记（SSH、摄像头等）
- [AGENTS.md](./AGENTS.md) - 核心协议
- [SOUL.md](./SOUL.md) - AI 人格
```

