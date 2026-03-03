# 📝 OpenClaw 折腾日记（一）- 整合版

> 历时一周，终于把 OpenClaw 搭建好了！从头开始踩坑，结合油管视频经验，记录完整过程👇

---

## 🖥️ 核心信息

| 项目 | 内容 |
|------|------|
| 系统 | Linux (Debian) |
| 安装 | 一条命令 |
| 平台 | Telegram |
| 模型 | MiniMax M2.5 + GPT-5.2 Codex |

---

## 一、为什么选择 OpenClaw？

OpenClaw 是一个强大的 AI 智能体框架，可以在服务器上帮你完成：

- ✅ 查资料，写代码
- ✅ 浏览器自动化控制
- ✅ 定时任务执行
- ✅ 多平台对接（Telegram、Discord等）

---

## 二、部署平台选择

根据油管视频经验和实测，有以下几种方案：

### 1. VPS（推荐）
- **优点**：成本低、可远程访问、7×24小时运行
- **推荐服务商**：腾讯云、Vultr、1Panel

### 2. Mac Mini
- **优点**：性能强、可控制本地硬件，安全隔离好
- **缺点**：成本较高

### 3. 腾讯云应用模板（新手推荐）
- **优点**：预置全套运行环境+OpenClaw核心程序
- **缺点**：需要手动配置

### 4. Vultr + Coolify
- **优点**：一站式开源应用部署平台
- **特点**：可扩展性强

---

## 三、环境准备

### 1. 服务器/VPS 配置推荐

| 配置项 | 推荐值 |
|--------|--------|
| 系统 | Debian/Ubuntu |
| 内存 | 2GB+ |
| 端口 | 18789 |

### 2. 需要的账号

- **Telegram Bot**：@BotFather 创建
- **模型API**：
  - 国内：MiniMax（推荐）、Moonshot、阿里百炼
  - 国外：OpenAI GPT、Claude、Gemini

---

## 四、安装过程

### Step 1：安装 Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
```

### Step 2：安装 OpenClaw

```bash
npm install -g openclaw@latest
```

### Step 3：初始化配置

```bash
openclaw setup
```

按提示选择：
- ✅ 模型：MiniMax / OpenAI
- ✅ 频道：Telegram
- ✅ 端口：18789

---

## 五、安装经验与教训（来自油管视频）

### 1. QuickStart 模式（推荐新手）
首次配置建议选择 **QuickStart 模式**：
- 最小配置 + 最快部署
- 跳过非必要配置项

### 2. 跳过模型配置
- 建议先选择 `Skip for now` 跳过大模型配置
- 后面再单独设置，避免接口地址错误
- 国内模型用国际版地址会导致报错

### 3. 选择 Hatch in TUI 模式
- 通过终端使用
- 后面也可以通过配置 Web UI 通过网页访问

### 4. 配置丢失怎么办？
- 执行 `openclaw configure` 重新配置

---

## 六、对接 Telegram

### 步骤

1. **创建机器人**
   - 打开 @BotFather
   - 发送 /newbot
   - 设置名称和用户名
   - 获取 Token

2. **配置 Token**

```bash
openclaw config set channels.telegram.config.token "你的Token"
```

3. **配对**

```bash
openclaw pairing approve telegram 你的UserID
```

---

## 七、模型接入

我们配置了两个模型：

### 1. MiniMax M2.5（国内）
- API 地址：https://api.minimax.chat/v1
- 优点：国内直连、免费额度

### 2. GPT-5.2 Codex（国外）
- 需要代理
- 优点：能力强

### 配置示例

```json
{
  "primary": "moonshot/kimi-k2.5",
  "baseUrl": "https://api.moonshot.cn/v1"
}
```

---

## 八、启动服务

```bash
openclaw gateway start
openclaw gateway status
```

访问：http://127.0.0.1:18789

---

## 九、公网访问方案

### 1. 域名绑定（推荐）
有域名建议使用域名绑定，比暴露端口更安全

### 2. WebSocket
需直接暴露 Gateway 端口，**仅建议临时测试使用**

### 3. 配置修改

```json
mode: "remote"
bind: "lan"
```

修改后记得重启 OpenClaw

---

## 十、我们踩过的坑（真实经验）

> 以下是我们实际部署中遇到的问题及解决方案，供大家参考

### ⚠️ 坑1：Linux 浏览器被限制

**问题**：
- 很多网站检测到 Linux headless 浏览器后拒绝访问
- 微信公众号、一些后台管理系统直接报错

**解决方案**：
```bash
# 使用 agent-browser 时设置 User-Agent 模拟 Mac
agent-browser set headers '{"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}'
```

**效果**：可以正常访问微信公众号等被限制的网站

---

### ⚠️ 坑2：Control UI 远程访问报错

**问题**：
- 通过 http://IP:端口 访问控制面板时报错：`control ui requires HTTPS or localhost`
- 切换 HTTPS 后又报错：`origin not allowed`

**解决方案**：
在 `~/.openclaw/openclaw.json` 中添加允许的域名：
```json
{
  "gateway": {
    "controlUi": {
      "allowedOrigins": ["https://你的域名:端口"]
    }
  }
}
```

---

### ⚠️ 坑3：Telegram Bot 连不上

**问题**：
- 机器人发消息返回 404 Not Found
- 检查发现是 Token 填写错误（占位符未替换）

**解决方案**：
1. 检查 Token 是否正确配置
2. 确保代理可以访问 Telegram API

---

### ⚠️ 坑4：服务端口冲突

**问题**：
- 曾存在 `openclaw.service` 与 `openclaw-gateway.service` 并存导致端口冲突

**解决方案**：
- 将多余的 service 处理为 masked：`systemctl mask openclaw.service`
- 仅保留 `openclaw-gateway.service`

---

### ⚠️ 坑5：频繁 fetch failed

**问题**：
- 运行时频繁出现 `fetch failed` 错误

**解决方案**：
- 官方重置恢复基线：`curl -fsSL https://openclaw.ai/install.sh | bash`
- 然后逐项最小改动排查

---

## 十一、常见问题

### Q1：发消息不回？
→ 检查模型API是否可用
→ 检查代理设置

### Q2：Telegram连不上？
→ 检查token是否正确
→ 检查代理

### Q3：端口访问不了？
→ 检查防火墙

### Q4：浏览器无法访问某些网站？
→ 设置 User-Agent 模拟 Mac（见上文坑1）

---

## 十二、总结

OpenClaw 确实强大，是 2026 年最强的 AI 智能体框架之一：

✅ 查资料
✅ 写代码
✅ 浏览器控制
✅ 定时任务
✅ 多平台对接

⚠️ **安全性要注意**：不要随便执行不明命令

---

> 📺 参考视频：YouTube - 安格视界《全能AI打工人 OpenClaw 精选案例 + 最佳部署架构》

**下篇预告**：远程访问配置 + 更多技能安装...
