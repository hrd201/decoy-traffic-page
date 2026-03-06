# MEMORY.md - 长期记忆

## 用户信息

- **名字**: 达哥
- **地点**: 云南
- **时区**: Asia/Shanghai

## 重要配置

### RDP 服务器
- **IP**: 61.138.213.163
- **SSH 端口**: 8877
- **用户名**: openclaw
- **密码**: hrd!188789 (已记录在 TOOLS.md)

### KDocs 填表
- **脚本**: /home/openclaw/kdocs-fill.sh
- **定时**: 工作日 7:00 和 17:30
- **DISPLAY**: :24 (重要！)
- **窗口ID**: 14680125
- **数字**: 820121000

### mihomo 配置
- **MiniMax 直连规则**: api.minimax.chat, minimaxi.com, account.minimax.com
- **代理端口**: 7890

## 已安装技能

| 技能 | 用途 |
|------|------|
| http-retry | HTTP 重试 |
| reddit-readonly | Reddit 搜索 |
| model-router-premium | 分级模型选择 |
| ai-image-generation | AI 画图 |
| agent-browser | 浏览器自动化 |

## Agent Reach 渠道状态

| 渠道 | 状态 |
|------|------|
| 微信公众号 | ✅ |
| 全网搜索 | ✅ |
| GitHub | ✅ |
| YouTube | ✅ |
| B站 | ✅ |
| RSS | ✅ |
| 小红书 | ⚠️ 需扫码 |
| 抖音 | ⚠️ 需配置 |

## 重要提醒

1. **RDP Firefox ESR 必须保持打开**，否则填表脚本无法运行
2. 使用 agent-browser 访问公众号时需要用 `--user-agent` 模拟 Mac
3. 代理配置：MiniMax 走直连，OpenAI 走代理
4. 浏览器用完后要关闭 chrome-headless-shell

---

## 历史问题记录

### 2026-03-06 记忆系统修复

**发现的问题：**
1. ❌ MEMORY.md 不存在 - 只有 daily memory 文件
2. ❌ IDENTITY.md 未填写 - 只有模板
3. ❌ USER.md 未填写完整
4. ❌ 空的 entities/ 和 episodes/ 目录存在
5. ❌ 无明确的记忆调用顺序文档

**修复内容：**
1. ✅ 创建了 MEMORY.md（长期记忆）
2. ✅ 更新了 IDENTITY.md（填写 Tifa 身份）
3. ✅ 更新了 USER.md（填写达哥信息）
4. ✅ 删除了空的 entities/ 和 episodes/ 目录
5. ✅ 更新了 AGENTS.md（添加记忆调用顺序）
6. ✅ 创建了 docs/MEMORY_SYSTEM.md（记忆系统文档）

**正确的调用顺序：**
```
1. USER.md → 了解用户偏好
2. IDENTITY.md → 了解自己是谁
3. SOUL.md → 了解行为方式
4. memory/YYYY-MM-DD.md (今天+昨天) → 了解最近工作
5. MEMORY.md (仅主会话) → 了解重要长期记忆
```

## 偏好

- 默认搜索引擎：Google
- 禁用 360 搜索
- Reddit 搜索结果要翻译成中文
- RDP 中 ESR 浏览器不关闭（用于定时填表）
- 其他浏览器使用完成后关闭，减少资源占用
- 除 RDP 中 ESR 外，其他搜索方式都按 Agent-Reach 项目方法执行
- 说话简洁，不要太多废话
