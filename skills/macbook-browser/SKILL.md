# MacBook Browser Control

控制 MacBook 节点上的浏览器进行自动化操作。

## 适用场景

- 需要登录态或 Cookie 的浏览器操作
- 需要控制 MacBook 本地 Chrome 浏览器
- 数据抓取、页面自动化测试

## 前置条件

1. MacBook 已配对到 nf Gateway
2. MacBook SSH 隧道已建立：
   ```bash
   ssh -N -L 18789:127.0.0.1:18789 -L 19000:127.0.0.1:18789 openclaw@61.138.213.163 -p 8877
   ```
3. MacBook 上的 OpenClaw 插件已配置端口为 18789

## 命令格式

使用 `openclaw browser --browser-profile openclaw` 命令：

| 操作 | 命令 |
|------|------|
| 查看浏览器状态 | `openclaw browser --browser-profile openclaw status` |
| 启动浏览器 | `openclaw browser --browser-profile openclaw start` |
| 打开网页 | `openclaw browser --browser-profile openclaw open <URL>` |
| 获取页面快照 | `openclaw browser --browser-profile openclaw snapshot` |
| 截屏 | `openclaw browser --browser-profile openclaw screenshot` |
| 关闭浏览器 | `openclaw browser --browser-profile openclaw stop` |

## 使用示例

### 打开网页并获取数据

```bash
# 打开天天基金 588000 页面
openclaw browser --browser-profile openclaw open https://fund.eastmoney.com/588000.html

# 获取页面结构
openclaw browser --browser-profile openclaw snapshot

# 截屏
openclaw browser --browser-profile openclaw screenshot
```

## 鼠标操作命令

```bash
openclaw browser --browser-profile openclaw click <ref>        # 点击
openclaw browser --browser-profile openclaw click <ref> --double  # 双击
openclaw browser --browser-profile openclaw type <ref> "文本"  # 输入
openclaw browser --browser-profile openclaw hover <ref>       # 悬停
openclaw browser --browser-profile openclaw drag <ref>        # 拖拽
openclaw browser --browser-profile openclaw select <ref> A B  # 选择
openclaw browser --browser-profile openclaw press Enter       # 按键
```

**注意：** `<ref>` 是页面元素的引用 ID，通过 `snapshot` 获取。

## 注意事项

1. **不要与 nf 内置浏览器混淆**：nf 内置浏览器使用 `openclaw` profile (18800)，MacBook 节点使用 `openclaw` profile 但指向节点
2. **SSH 隧道必须保持运行**：否则无法控制 MacBook 浏览器
3. **MacBook 屏幕不能休眠**：否则浏览器操作可能失败

## 故障排查

### 浏览器无响应

```bash
# 重启浏览器
openclaw browser --browser-profile openclaw stop
openclaw browser --browser-profile openclaw start
```

### SSH 隧道断开

检查隧道是否正常运行：
```bash
ps aux | grep ssh
```

重新建立隧道：
```bash
ssh -N -L 18789:127.0.0.1:18789 -L 19000:127.0.0.1:18789 openclaw@61.138.213.163 -p 8877
```

### 端口冲突

如果 19000 被占用，修改 MacBook 插件配置使用其他端口，并相应调整 SSH 隧道映射。

## 浏览器自动切换规则

**主浏览器**：MacBook 节点 (profile: openclaw)  
**备用浏览器**：nf 内置浏览器 (CLI: openclaw browser --browser-profile openclaw)

**切换条件**：MacBook 节点状态为 "disconnected"

**检测命令**：
```bash
openclaw nodes status
```

**备用方案**：
```bash
# 使用 nf 内置浏览器
openclaw browser --browser-profile openclaw open <URL>
```
