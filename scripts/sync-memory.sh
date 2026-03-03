#!/bin/bash
# 每日记忆同步脚本
# 从当日工作日志提取关键信息，更新到长期记忆

DATE=$(date +%Y-%m-%d)
WORKSPACE="/root/.openclaw/workspace"
MEMORY_DIR="$WORKSPACE/memory"
TODAY_LOG="$MEMORY_DIR/$DATE.md"
EPISODES_DIR="$MEMORY_DIR/episodes"

# 创建 episodes 目录
mkdir -p "$EPISODES_DIR"

# 检查今日日志是否存在
if [ ! -f "$TODAY_LOG" ]; then
    echo "NO_LOG: 今日无工作日志"
    exit 0
fi

# 读取今日日志内容
CONTENT=$(cat "$TODAY_LOG")

# 提取关键信息
NEW_SERVERS=$(echo "$CONTENT" | grep -E "IP|服务器|节点" | head -3)
NEW_SKILLS=$(echo "$CONTENT" | grep -E "技能|Skill" | head -3)
ISSUES=$(echo "$CONTENT" | grep -E "问题|解决|修复" | head -5)

# 生成情景记忆
EPISODE_FILE="$EPISODES_DIR/$DATE-summary.md"
cat > "$EPISODE_FILE" << EOF
# 情景记忆：$DATE

## 概述
$(head -20 "$TODAY_LOG" | grep -E "^## " | head -5)

## 关键事件
$ISSUES

## 新增信息
### 服务器/节点
$NEW_SERVERS

### 技能
$NEW_SKILLS

## 错误与教训
$(echo "$CONTENT" | grep -E "错误|失败|SIGTERM|fetch failed" | head -5)
EOF

# 重新索引记忆
cd "$WORKSPACE" && openclaw memory index --force 2>/dev/null

echo "SYNC_OK: 记忆已同步 ($DATE)"
echo "- 情景记忆: $EPISODE_FILE"
