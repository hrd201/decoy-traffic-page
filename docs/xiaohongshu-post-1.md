# 📝 OpenClaw 折腾日记 (一) - 详细版

## 标题
OpenClaw 折腾日记 一：Linux服务器部署+Telegram对接全流程

---

## 正文

```
历时一周，终于把 OpenClaw 搭建好了！从头开始踩坑，记录完整过程👇

🖥️ 系统：Linux (Debian)
📦 安装：一条命令
🔗 平台：Telegram

【一、环境准备】

1. 服务器/VPS（配置推荐）：
   - 系统：Debian/Ubuntu
   - 内存：2GB+
   - 端口：18789

2. 需要的账号：
   - Telegram Bot（@BotFather创建）
   - 模型API（MiniMax/OpenAI）

【二、安装过程】

Step 1：安装 Node.js
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
$ nvm install 22

Step 2：安装 OpenClaw
$ npm install -g openclaw@latest

Step 3：初始化配置
$ openclaw setup

按提示选择：
- 模型：MiniMax / OpenAI
- 频道：Telegram
- 端口：18789

【三、对接Telegram】

1. 创建机器人：
   - 找 @BotFather
   - /newbot
   - 设置名称和用户名
   - 获取 Token

2. 配置 Token：
$ openclaw config set channels.telegram.config.token "你的Token"

3. 配对：
$ openclaw pairing approve telegram 你的UserID

【四、模型接入】

我们配置了两个模型：

1. MiniMax M2.5（国内）：
   - 模型：minimax-cn/MiniMax-M2.5
   - API地址：https://api.minimax.chat/v1
   - 优点：国内直连，便宜

2. GPT-5.2 Codex（国外）：
   - 模型：openai/gpt-5.2-codex
   - 需要代理
   - 优点：能力强

【五、启动服务】

$ openclaw gateway start
$ openclaw gateway status

访问：http://127.0.0.1:18789

【六、效果展示】
（P2放成功对话截图）

【七、常见问题】

Q1：发消息不回？
→ 检查模型API是否可用
→ 检查代理设置

Q2：Telegram连不上？
→ 检查token是否正确
→ 检查代理

Q3：端口访问不了？
→ 检查防火墙

【总结】
OpenClaw 确实强大，可以在服务器上帮你完成各种任务：
✅ 查资料
✅ 写代码
✅ 浏览器控制
✅ 定时任务

安全性要注意！不要随便执行不明命令。

下篇讲如何远程访问和更多技能安装...
