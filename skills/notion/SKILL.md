# Notion 操作技能

## 用途
通过 Notion API 读写 Notion 页面，自动整理标签分类

## 前置条件
- Notion API Key: $NOTION_API_KEY

## 固定配置

| 项目 | ID | 说明 |
|------|-----|------|
| 主页面 | 30c3d91f2f008014bbcedf406ce05eec | open-claw |
| 运维笔记数据库 | 30f3d91f2f0081e79b9af318c93807d1 | OpenClaw 运维笔记 |

## 数据库字段

| 字段 | 类型 | 选项 |
|------|------|------|
| 标签 | multi_select | 问题, 配置, 脚本, 教程, 优化 |
| 分类 | select | 服务器, RDP, 网络, 自动化, Notion |
| 状态 | select | 进行中, 已完成, 待处理 |
| 日期 | date | - |

## 自动标签规则

根据内容关键词自动推荐标签和分类：

| 关键词 | 推荐标签 | 推荐分类 |
|--------|----------|----------|
| RDP, 远程桌面, xrdp, sesman | 问题, 配置 | RDP |
| 滇池, KDocs, 填报, 脚本 | 配置, 脚本 | 自动化 |
| SSH, 服务器, 服务器 | 配置 | 服务器 |
| 网络, 防火墙, 端口 | 问题 | 网络 |
| 教程, 文档, 指南 | 教程 | - |
| 优化, 性能, 改进 | 优化 | - |

## 使用方法

### 1. 创建运维笔记（自动打标签）
```bash
# 根据内容自动选择标签和分类
标题: "RDP 连接问题"
内容: "xrdp-sesman 服务启动失败"

→ 自动打标签: ["问题", "配置"]
→ 自动选分类: "RDP"
```

### 2. 查询运维数据库
```bash
curl -s -X POST -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "filter": {"property": "状态", "select": {"equals": "进行中"}}
  }' \
  "https://api.notion.com/v1/databases/30f3d91f2f0081e79b9af318c93807d1/query"
```

### 3. 创建带完整信息的笔记
```bash
curl -s -X POST -H "Authorization: Bearer $NOTION_API_KEY" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "parent": {"database_id": "30f3d91f2f0081e79b9af318c93807d1"},
    "properties": {
      "名称": {"title": [{"text": {"content": "页面标题"}}]},
      "标签": {"multi_select": [{"name": "问题"}]},
      "分类": {"select": {"name": "RDP"}},
      "状态": {"select": {"name": "进行中"}},
      "日期": {"date": {"start": "2026-02-22"}}
    }
  }' \
  "https://api.notion.com/v1/pages"
```

## 示例对话

- "记一个 RDP 问题" → 自动创建，标签[问题+配置]，分类[RDP]
- "创建一个滇池填报脚本笔记" → 自动创建，标签[配置+脚本]，分类[自动化]
- "查看进行中的问题" → 查询数据库返回列表
