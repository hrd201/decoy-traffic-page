#!/bin/bash
# 搜索工具 - 支持多引擎搜索

ENGINE=${1:-夸克}
QUERY=${2:-""}

if [ -z "$QUERY" ]; then
    echo "用法: $0 <引擎> <搜索内容>"
    echo "引擎: 360, 夸克, 纳米, bing"
    exit 1
fi

case $ENGINE in
    360)
        URL="https://www.so.com/s?q=$(echo "$QUERY" | sed 's/ /+/g')"
        ;;
    夸克|quark)
        URL="https://quark.sm.cn/search?query=$(echo "$QUERY" | sed 's/ /+/g')"
        ;;
    纳米|n)
        URL="https://www.n.cn/search?query=$(echo "$QUERY" | sed 's/ /+/g')"
        ;;
    bing)
        URL="https://www.bing.com/search?q=$(echo "$QUERY" | sed 's/ /+/g')"
        ;;
    *)
        echo "未知引擎: $ENGINE"
        exit 1
        ;;
esac

echo "正在打开: $URL"
xdg-open "$URL" 2>/dev/null || echo "$URL"
