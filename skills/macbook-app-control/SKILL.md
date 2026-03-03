# MacBook 应用控制

通过 SSH 节点远程控制 MacBook 上的应用程序。

## 前置条件

1. MacBook 已配对到 nf Gateway
2. SSH 隧道已建立
3. system.run 命令已配置（exec-approvals.json 中添加 open/osascript）

## 命令格式

```bash
openclaw nodes invoke --node macbook-pro --command system.run --params '{"command": ["命令"], "timeoutMs": 30000}'
```

## 常用操作

### 打开应用
```bash
# 打开微信
["open", "-a", "WeChat"]

# 打开浏览器
["open", "-a", "Safari"]
["open", "-a", "Google Chrome"]
```

### 激活应用（置顶）
```json
["osascript", "-e", "tell application \"System Events\" to tell process \"WeChat\" to set frontmost to true"]
```

### 输入文字
```json
["osascript", "-e", "tell application \"System Events\" to tell process \"WeChat\" to keystroke \"你好\""]
```

### ⚠️ 中文输入必须用剪贴板！
```bash
# 错误：直接 keystroke 无法输入中文
keystroke "你好"

# 正确：先复制到剪贴板，再粘贴
set the clipboard to "你好"
keystroke "v" using command down
```

### 按键
```json
["osascript", "-e", "tell application \"System Events\" to tell process \"WeChat\" to key code 36"]
```

### 常用按键代码
| 按键 | key code |
|------|----------|
| 回车 | 36 |
| 空格 | 49 |
| ESC | 53 |
| Command+F | 3 |

### 组合键
["osascript
```json", "-e", "tell application \"System Events\" to tell process \"WeChat\" to keystroke \"f\" using command down"]
```

## 微信操作流程

1. 打开微信：`open -a WeChat`
2. 等待 3-5 秒让应用完全启动
3. 激活微信：`set frontmost to true`
4. 使用 Command+F 打开搜索框
5. 输入联系人名字
6. 按回车打开聊天窗口
7. 输入消息
8. 按回车发送

## 注意事项

- 微信自动化较复杂，UI 元素定位困难
- 需要给 OpenClaw 辅助功能权限（系统偏好设置 → 隐私与安全性 → 辅助功能）
- 屏幕不能休眠
- 可能需要先点击搜索框再输入

## 故障排查

### 命令执行成功但无效果
- 检查应用是否完全启动
- 增加等待时间
- 检查辅助功能权限

### 权限问题
- 系统偏好设置 → 隐私与安全性 → 辅助功能
- 添加 OpenClaw 或 terminal 到辅助功能列表
