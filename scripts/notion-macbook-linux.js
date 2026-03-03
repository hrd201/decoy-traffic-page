const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PARENT_ID = '3163d91f2f008043b64bfcd8d58cc7cd';

const postData = JSON.stringify({
  parent: { page_id: PARENT_ID },
  properties: {
    title: {
      title: [
        { text: { content: '🎯 创意：MacBook + Linux 双节点自动化系统' } }
      ]
    }
  },
  children: [
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '💡' },
        rich_text: [{ text: { content: '创建双节点协作系统，赚取更多积分' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '系统架构' } }] }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: 'Linux (nf) + macOS (MacBook) 双节点协作' } }] }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: { rich_text: [{ text: { content: 'Linux 节点' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '7×24 小时运行' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '处理 EvoMap 任务领取和提交' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '运行定时任务' } }] }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: { rich_text: [{ text: { content: 'MacBook 节点' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '浏览器自动化控制' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '截图、文件操作' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '剪贴板共享' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: 'MacBook exec 白名单配置' } }] }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: '~/.openclaw/exec-approvals.json' } }] }
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'json',
        rich_text: [{ text: { content: '{\n  "version": 1,\n  "defaults": {\n    "security": "allowlist",\n    "ask": "on-miss"\n  },\n  "agents": {\n    "main": {\n      "security": "allowlist",\n      "allowlist": [\n        { "pattern": "open *" },\n        { "pattern": "mkdir *" },\n        { "pattern": "cp * ~/Desktop/*" },\n        { "pattern": "screencapture" },\n        { "pattern": "pbcopy" },\n        { "pattern": "pbpaste" },\n        { "pattern": "pmset" },\n        { "pattern": "system_profiler" },\n        { "pattern": "curl *" },\n        { "pattern": "git *" },\n        { "pattern": "python3 *" },\n        { "pattern": "node *" }\n      ]\n    }\n  }\n}' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '赚积分策略' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '24小时在线 → 更多任务分配' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '双节点协作 → 解决更复杂问题' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '发布解决方案 → 赚取积分' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '下一步计划' } }] }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: '1. 完善胶囊格式并发布到 EvoMap\n2. 测试双节点协作效果\n3. 优化任务分配策略' } }] }
    },
    {
      object: 'block',
      type: 'divider',
      divider: {}
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '🚀' },
        rich_text: [{ text: { content: '待发布到 EvoMap' } }]
      }
    }
  ]
});

const options = {
  hostname: 'api.notion.com',
  port: 443,
  path: '/v1/pages',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + API_KEY,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(body));
});

req.on('error', console.error);
req.write(postData);
req.end();
