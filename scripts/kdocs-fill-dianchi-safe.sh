#!/usr/bin/env bash
set -euo pipefail

LOCK=/tmp/kdocs-fill-dianchi.lock
LAST_DATE_FILE=/tmp/kdocs-fill-dianchi-lastdate
TODAY=$(date +%Y-%m-%d)

DISPLAY_VAL=${DISPLAY_VAL:-:24}
XAUTH=${XAUTH:-/home/openclaw/.Xauthority}
USER_NAME=${USER_NAME:-openclaw}
AUTO_LOCATE=${AUTO_LOCATE:-1}

# ========== 增强防重复机制 ==========
# 1. 进程锁（防止并发执行）
if [ -e "$LOCK" ]; then
  LOCK_PID=$(cat "$LOCK" 2>/dev/null || echo "unknown")
  # 检查锁进程是否还活着
  if [ -n "$LOCK_PID" ] && [ "$LOCK_PID" != "unknown" ] && kill -0 "$LOCK_PID" 2>/dev/null; then
    echo "LOCKED_BY_RUNNING_PROCESS"
    exit 3
  fi
  # 锁进程已死，清理旧锁
  rm -f "$LOCK"
fi
echo $$ > "$LOCK"
trap 'rm -f "$LOCK"' EXIT

# 2. 日期检查（防止同一天重复填写）
if [ -f "$LAST_DATE_FILE" ]; then
  LAST_DATE=$(cat "$LAST_DATE_FILE")
  if [ "$LAST_DATE" = "$TODAY" ]; then
    echo "ALREADY_FILLED_TODAY"
    exit 4
  fi
fi

run_xdotool() {
  sudo -u "$USER_NAME" env DISPLAY="$DISPLAY_VAL" XAUTHORITY="$XAUTH" xdotool "$@"
}

WIN=$(run_xdotool search --onlyvisible --name "2026年 "春节"网络通信保障日报" | head -n1 || true)
if [ -z "${WIN:-}" ]; then
  WIN=$(run_xdotool getactivewindow 2>/dev/null || true)
fi
if [ -z "${WIN:-}" ]; then
  echo "NO_ACTIVE_WINDOW"
  exit 2
fi

run_xdotool windowactivate --sync "$WIN"
sleep 0.3

if [ "$AUTO_LOCATE" = "1" ]; then
  # 搜索"滇池分公司"定位到该行
  run_xdotool key --window "$WIN" ctrl+f
  sleep 0.3
  run_xdotool type --window "$WIN" --delay 100 "滇池分公司"
  run_xdotool key --window "$WIN" Return
  sleep 0.5
  # 多按几次 Escape 确保完全退出搜索/高亮模式
  run_xdotool key --window "$WIN" Escape Escape Escape
  sleep 0.3
  # 使用 Tab 跳到数值列
  run_xdotool key --window "$WIN" Tab
  sleep 0.2
fi
for _ in {1..10}; do
  run_xdotool key --window "$WIN" Delete
  run_xdotool key --window "$WIN" Tab
  sleep 0.05
done
for _ in {1..10}; do
  run_xdotool key --window "$WIN" Shift+Tab
  sleep 0.03
done

# 填写 B-K 列（10个值）
for v in 6 2 0 1 1 0 0 0 0 0; do
  run_xdotool type --window "$WIN" --delay 60 "$v"
  run_xdotool key --window "$WIN" Tab
  sleep 0.06
done

run_xdotool key --window "$WIN" ctrl+s

# 4. 成功后记录日期
echo "$TODAY" > "$LAST_DATE_FILE"

echo "OK_FILLED_ONCE"
