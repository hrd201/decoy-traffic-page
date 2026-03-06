# 记忆系统梳理

## 当前记忆文件结构

### 1. 核心记忆文件 (workspace 根目录)

| 文件 | 用途 | 优先级 |
|------|------|--------|
| `MEMORY.md` | 长期记忆（重要内容） | 最高 |
| `USER.md` | 用户偏好和配置 | 高 |
| `IDENTITY.md` | AI 身份设定 | 高 |
| `AGENTS.md` | AI 行为规范 | 高 |
| `SOUL.md` | AI 性格设定 | 中 |
| `TOOLS.md` | 工具配置 | 中 |

### 2. 每日日志 (memory/ 目录)

| 文件 | 用途 |
|------|------|
| `memory/YYYY-MM-DD.md` | 每日工作日志 |

### 3. 文档参考 (docs/ 目录)

| 文件 | 用途 |
|------|------|
| `docs/*.md` | 各类技术文档 |

---

## 正确的调用顺序

根据 AGENTS.md，正确的调用顺序应该是：

```
1. 读取 USER.md - 了解用户偏好
2. 读取 IDENTITY.md - 了解自己是谁
3. 读取 SOUL.md - 了解自己的行为方式
4. 读取 memory/YYYY-MM-DD.md (今天 + 昨天) - 了解最近工作
5. 读取 MEMORY.md (仅主会话) - 了解重要长期记忆
```

---

## 错误的记忆文件

以下文件是错误的或重复的，应该清理或整合：

| 错误文件 | 问题 | 建议 |
|----------|------|------|
| `memory/entities/` | 空目录 | 删除 |
| `memory/episodes/` | 空目录 | 删除 |
| `docs/MULTI_MODEL_CONFIG.md` | 与 MEMORY.md 重复 | 整合到 MEMORY.md |

---

## 正确的存储路径

| 类型 | 路径 |
|------|------|
| 核心记忆 | `~/.openclaw/workspace/` |
| 每日日志 | `~/.openclaw/workspace/memory/` |
| 文档 | `~/.openclaw/workspace/docs/` |
| 技能 | `~/.openclaw/workspace/skills/` |

---

## 搜索方法

当需要回忆时，应该：

1. **memory_search** - 搜索 `MEMORY.md` + `memory/*.md`
2. 直接读取 - 当知道具体文件名时

---

## 同步到 GitHub

| 内容 | GitHub 仓库 |
|------|-------------|
| 记忆文件 | hrd201/openclaw-memory |
| 配置文件 | hrd201/openclaw-config |
| 技能 | 各自独立的仓库 |

---

## 修复计划

1. [ ] 删除空的 entities/ 和 episodes/ 目录
2. [ ] 整合 docs/MULTI_MODEL_CONFIG.md 到 MEMORY.md
3. [ ] 更新 AGENTS.md 确认正确的调用顺序
4. [ ] 创建 MEMORY.md（如果不存在）
5. [ ] 确认所有核心文件都在正确位置
