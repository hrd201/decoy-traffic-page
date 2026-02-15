#!/usr/bin/env bash
set -euo pipefail

LOCK=/tmp/kdocs-fill-dianchi.lock
if [ -e "$LOCK" ]; then
  echo "LOCKED"
  exit 3
fi
trap 'rm -f "$LOCK"' EXIT
: > "$LOCK"

DISPLAY_VAL=${DISPLAY_VAL:-:11}
XAUTH=${XAUTH:-/home/openclaw/.Xauthority}
USER_NAME=${USER_NAME:-openclaw}
AUTO_LOCATE=${AUTO_LOCATE:-1}

run_xdotool() {
  sudo -u "$USER_NAME" env DISPLAY="$DISPLAY_VAL" XAUTHORITY="$XAUTH" xdotool "$@"
}

WIN=$(run_xdotool search --onlyvisible --name "2026年 “春节”网络通信保障日报" | head -n1 || true)
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
  # 自动定位到“滇池分公司”后，右移到第一个数字格
  run_xdotool key --window "$WIN" ctrl+f
  sleep 0.2
  run_xdotool type --window "$WIN" --delay 60 "滇池分公司"
  run_xdotool key --window "$WIN" Return
  sleep 0.35
  run_xdotool key --window "$WIN" Escape
  sleep 0.15
  # 搜索命中后，先退出编辑态，再用 Tab 跳到右侧数值列（比 Right 更稳定）
  run_xdotool key --window "$WIN" Escape
  sleep 0.10
  run_xdotool key --window "$WIN" Tab
  sleep 0.2
fi

# 防重复：先清空当前起点及后续9格，再回到起点
for _ in {1..10}; do
  run_xdotool key --window "$WIN" Delete
  run_xdotool key --window "$WIN" Tab
  sleep 0.05
done
for _ in {1..10}; do
  run_xdotool key --window "$WIN" Shift+Tab
  sleep 0.03
done

# 只填一轮固定10值
for v in 6 2 0 1 1 0 0 0 0 0; do
  run_xdotool type --window "$WIN" --delay 60 "$v"
  run_xdotool key --window "$WIN" Tab
  sleep 0.06
done

run_xdotool key --window "$WIN" ctrl+s

echo "OK_FILLED_ONCE"
