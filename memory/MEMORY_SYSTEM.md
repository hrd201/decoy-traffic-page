# 记忆系统架构 (Memory OS)

> 基于 EverMemOS 理念设计的本地记忆系统

---

## 核心理念

**不只是记忆——是预见。**

- 记住发生了什么
- 理解记忆背后的意义
- 用记忆指导当前决策

---

## 三层记忆架构

### 🧩 第一层：情景记忆 (Episodes)

**定义**：完整的对话/事件记录

**存储位置**：`memory/episodes/`

**文件格式**：
```
memory/episodes/2026-02-27-macbook-browser-control.md
```

**内容**：
- 原始对话摘要
- 关键决策点
- 执行结果
- 时间戳
- 错误和教训

**触发条件**：
- 每次重要任务完成时
- 每次学到新技能时
- 每次犯错误后

---

### 👤 第二层：实体记忆 (Entities)

**定义**：人物、事物、概念的结构化记录

**子类型**：
| 类型 | 说明 | 存储位置 |
|------|------|----------|
| **人物** | 用户、相关人员信息 | `memory/entities/people/` |
| **服务器** | IP、端口、凭证 | `memory/entities/servers/` |
| **项目** | 任务、项目进度 | `memory/entities/projects/` |
| **技能** | 已安装的技能、工具 | `memory/entities/skills/` |
| **文档** | 重要参考文档 | `memory/entities/docs/` |

**文件格式**：
```markdown
# 实体：达哥

## 基础信息
- 称呼：达哥
- 用途：写代码、运维、搜索

## 偏好
- 喜欢：夸克搜索
- 不喜欢：360搜索

## 历史交互
- 2026-02-24：配置 MacBook 节点
```

---

### 💡 第三层：偏好记忆 (Preferences)

**定义**：用户偏好、风格、习惯的动态记录

**存储位置**：`memory/preferences/`

**内容**：
- 沟通偏好（简洁/详细）
- 技术偏好（工具、命令风格）
- 生活偏好（待补充）

---

## 检索系统

### 自动检索

当用户提问时，自动检索相关记忆：

1. **关键词匹配** → 搜索文件名和标签
2. **语义检索** → 理解问题意图
3. **多源融合** → 合并结果，优先显示最相关的

### 手动检索

```bash
# 搜索特定实体
memory_search --entity servers

# 搜索特定日期范围
memory_search --date 2026-02

# 搜索特定主题
memory_search --topic macbook
```

---

## 记忆更新流程

### 自动提取

每次对话后，自动提取：

1. **实体更新** - 新出现的服务器、工具、项目
2. **偏好更新** - 用户表达的新偏好
3. **事件记录** - 重要决策和结果

### 手动固化

定期（每次会话结束）将重要信息固化到长期记忆：

```
固化检查清单：
□ 今天有哪些新实体需要记录？
□ 用户有哪些新偏好？
□ 有哪些重要决策需要记住？
```

---

## 文件结构

```
~/.openclaw/workspace/memory/
├── MEMORY.md              # 索引入口（快速查看）
├── episodes/              # 情景记忆
│   └── YYYY-MM-DD-*.md
├── entities/              # 实体记忆
│   ├── people/
│   │   └── 达哥.md
│   ├── servers/
│   │   └── nf-gateway.md
│   ├── projects/
│   │   └── macbook-node.md
│   ├── skills/
│   │   └── macbook-browser.md
│   └── docs/
│       └── openclaw-docs.md
├── preferences/           # 偏好记忆
│   └── user-preferences.md
└── search-index.json     # 快速检索索引
```

---

## 使用指南

### 读取记忆

```python
# 读取实体
memory_get(path="memory/entities/servers/nf-server.md")

# 搜索记忆
memory_search(query="MacBook 节点配置")
```

### 写入记忆

```python
# 写入新实体
write_entity(
    type="server",
    name="nf-server",
    data={
        "ip": "182.245.242.50",
        "domain": "nf.u2000.win"
    }
)

# 写入偏好
update_preference(key="search_engine", value="夸克")
```

---

## 演进原则

1. **从事件到洞察** - 不仅记录，还提取规律
2. **从被动到主动** - 不是简单存储，而是理解后应用
3. **从碎片到叙事** - 连接相关信息，形成连贯理解

---

## 定时任务

### 每日进化报告

- **时间**：每天 23:00
- **任务ID**：e030ee51-b25b-418a-9f42-58a7d2221d76
- **功能**：
  1. 回顾今日所有会话
  2. 提取要点压缩整理
  3. 分析学会的新东西、犯的错误、解决方案
  4. 生成进化报告
  5. 发送报告到达哥

---

_这个文件由你来进化，当你逐渐了解自己是谁时，请更新它✨_
