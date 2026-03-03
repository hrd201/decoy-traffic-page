---
name: phoenix-ops
description: Phoenix 专属执行规范与智能增强技能。用于 OpenClaw 日常运维、复杂任务双阶段回复（先处理中后结果）、异常排障、新闻整理、主页日更、以及高频 fetch failed 场景下的官方重置恢复流程。
---

# Phoenix Ops

## 核心执行规则
1. 复杂任务先发"处理中（预计时间）"，完成后再发"最终结果"。
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
- 新闻整理：默认浏览器 + Google，若遇验证码/阻断则按后备方案切换；输出"动态+影响分析+行动建议"。
- 主页日更：按固定模板生成"标题/三条重点/正文/CTA/今日变更摘要"。

---

# 远程桌面 (RDP) 运维手册

## 服务器信息
> 注意：敏感信息存储在 TOOLS.md 中

- **SSH 隧道命令**：`ssh -N -L 13389:127.0.0.1:3389 <用户名>@<服务器IP> -p <SSH端口>`

## 常见问题排查

### RDP 黑屏
**原因**：xrdp-sesman 未启动

**检查命令**：
```bash
ps aux | grep xrdp | grep -v grep
```
需要同时看到 `xrdp` 和 `xrdp-sesman` 运行。

**启动命令**：
```bash
sudo killall -9 xrdp xrdp-sesman Xorg xrdp-chansrv 2>/dev/null
sudo rm -f /var/run/xrdp/*.pid
sudo /usr/sbin/xrdp-sesman
sudo /usr/sbin/xrdp
```

### 切换桌面环境
- **XFCE**：`sudo sed -i 's/cinnamon-session/startxfce4/' /etc/xrdp/startwm.sh`
- **Cinnamon**：`sudo sed -i 's/startxfce4/cinnamon-session/' /etc/xrdp/startwm.sh`
- 改完后重启：`sudo killall -HUP xrdp`

### 注意事项
- Cinnamon 在 RDP 上有时不稳定，XFCE 更可靠
- 每次修改配置后建议完全重启 xrdp 和 sesman

---

# KDocs 定时填表

## 脚本位置
> 注意：敏感配置存储在脚本中或通过环境变量传递

## 填表条件
1. **Firefox 必须在运行**且**窗口可见**（不能最小化到托盘）
2. 文档名称包含："2026年 春节网络通信保障日报"
3. 需要正确的 DISPLAY 环境变量

## 手动执行
```bash
# 先确认 Firefox 窗口和 DISPLAY
sudo -u <用户名> env DISPLAY=<显示编号> XAUTHORITY=/home/<用户名>/.Xauthority xdotool search --name firefox

# 运行填表脚本
DISPLAY_VAL=<显示编号> XAUTHORITY=/home/<用户名>/.Xauthority bash /home/openclaw/.openclaw/workspace/scripts/kdocs-fill-dianchi-safe.sh
```

## 定时任务状态
- 07:30 滇池填报
- 17:00 滇池填报

## 注意事项
- xdotool 需要窗口在前台/激活状态才能操作
- 不能最小化 Firefox 窗口到托盘
- 保持窗口可见即可（可以缩小）
