# Notion 操作技能

## 用途
通过 Notion API 读写 Notion 页面

## 前置条件
- Notion API Key (已在环境变量 NOTION_API_KEY)

## 使用方法

### 1. 查询 Notion 页面
```bash
curl -s -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/databases/{database_id}/query"
```

### 2. 获取页面内容
```bash
curl -s -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  "https://api.notion.com/v1/pages/{page_id}"
```

### 3. 创建页面
```bash
curl -s -X POST -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": {"database_id": "你的数据库ID"},
    "properties": {
      "名称": {"title": [{"text": {"content": "页面标题"}}]}
    }
  }' \
  "https://api.notion.com/v1/pages"
```

## 示例
- "查询 Notion 数据库 XXX 的内容"
- "在 Notion 创建一个新页面，标题是 XXX"
- "读取 Notion 页面 XXX 的内容"
