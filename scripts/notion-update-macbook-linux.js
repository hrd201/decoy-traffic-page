const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PAGE_ID = '3173d91f-2f00-8155-860a-d47fe5b66fe5';

const blocks = [
  // 标题
  {
    object: 'block',
    type: 'heading_1',
    heading_1: { rich_text: [{ text: { content: '🎯 MacBook + Linux 双节点自动化系统' } }] }
  },
  // 简介
  {
    object: 'block',
    type: 'callout',
    callout: {
      icon: { emoji: '💡' },
      rich_text: [{ text: { content: '利用 MacBook 作为 OpenClaw 节点，配合 Linux 服务器 7×24 小时运行，实现跨平台自动化协作' } }]
    }
  },
  // 系统架构
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '🏗️ 系统架构' } }] }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ text: { content: '双节点协作：Linux 负责主要任务处理，MacBook 处理浏览器和文件操作' } }] }
  },
  // Linux 节点
  {
    object: 'block',
    type: 'heading_3',
    heading_3: { rich_text: [{ text: { content: '🖥️ Linux 节点 (nf)' } }] }
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
    bulleted_list_item: { rich_text: [{ text: { content: '运行定时任务（如 GitHub Trending、记忆同步）' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '配置：端口 18789' } }] }
  },
  // MacBook 节点
  {
    object: 'block',
    type: 'heading_3',
    heading_3: { rich_text: [{ text: { content: '🍎 MacBook 节点' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '浏览器自动化控制（已登录状态）' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '截图、文件操作、剪贴板共享' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '配置 Chrome profile: Default（保持登录状态）' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '配置 CDP 端口: 19000' } }] }
  },
  // exec 白名单配置
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '🔐 MacBook exec 白名单配置' } }] }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ text: { content: '文件位置：~/.openclaw/exec-approvals.json' } }] }
  },
  {
    object: 'block',
    type: 'code',
    code: {
      language: 'json',
      rich_text: [{ text: { content: `{
  "version": 1,
  "defaults": {
    "security": "allowlist",
    "ask": "on-miss"
  },
  "agents": {
    "main": {
      "security": "allowlist",
      "allowlist": [
        { "pattern": "open *" },
        { "pattern": "mkdir *" },
        { "pattern": "cp * ~/Desktop/*" },
        { "pattern": "screencapture" },
        { "pattern": "pbcopy" },
        { "pattern": "pbpaste" },
        { "pattern": "pmset" },
        { "pattern": "system_profiler" },
        { "pattern": "curl *" },
        { "pattern": "git *" },
        { "pattern": "python3 *" },
        { "pattern": "node *" },
        { "pattern": "say *" }
      ]
    }
  }
}` } }]
    }
  },
  // 白名单说明
  {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ text: { content: '说明：' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: 'open * - 打开应用/文件' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: 'screencapture - 截图' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: 'pbcopy/pbpaste - 剪贴板' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: 'say * - 文字转语音' } }] }
  },
  // 协作场景
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '🤝 协作场景' } }] }
  },
  {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: { rich_text: [{ text: { content: 'Linux 执行主要 EvoMap 任务' } }] }
  },
  {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: { rich_text: [{ text: { content: '需要浏览器时交给 MacBook 处理' } }] }
  },
  {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: { rich_text: [{ text: { content: '文件互传、截图、剪贴板共享' } }] }
  },
  {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: { rich_text: [{ text: { content: '7×24 小时不间断运行' } }] }
  },
  // 赚积分策略
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '💰 赚积分策略' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '24小时在线 → 更多任务被分配' } }] }
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
  // 当前状态
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '📊 当前状态' } }] }
  },
  {
    object: 'block',
    type: 'to_do',
    to_do: { checked: false, rich_text: [{ text: { content: 'Linux 节点已配置' } }] }
  },
  {
    object: 'block',
    type: 'to_do',
    to_do: { checked: true, rich_text: [{ text: { content: 'MacBook 节点已连接' } }] }
  },
  {
    object: 'block',
    type: 'to_do',
    to_do: { checked: false, rich_text: [{ text: { content: 'exec 白名单待配置' } }] }
  },
  {
    object: 'block',
    type: 'to_do',
    to_do: { checked: true, rich_text: [{ text: { content: '已发布 EvoMap 胶囊' } }] }
  },
  // 下一步计划
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '🚀 下一步计划' } }] }
  },
  {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: { rich_text: [{ text: { content: '在 MacBook 上配置 exec-approvals.json' } }] }
  },
  {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: { rich_text: [{ text: { content: '测试双节点协作效果' } }] }
  },
  {
    object: 'block',
    type: 'numbered_list_item',
    numbered_list_item: { rich_text: [{ text: { content: '优化任务分配策略' } }] }
  },
  // 相关链接
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '🔗 相关链接' } }] }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ text: { content: 'EvoMap 胶囊: sha256:90bfddb3c70f...' } }] }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ text: { content: 'OpenClaw 文档: https://docs.openclaw.ai' } }] }
  },
  // 分割线
  {
    object: 'block',
    type: 'divider',
    divider: {}
  },
  // 状态标签
  {
    object: 'block',
    type: 'callout',
    callout: {
      icon: { emoji: '🔄' },
      rich_text: [{ text: { content: '最后更新: 2026-03-03' } }]
    }
  }
];

// 分批添加 blocks（每次最多 100 个）
const chunkSize = 100;
for (let i = 0; i < blocks.length; i += chunkSize) {
  const chunk = blocks.slice(i, i + chunkSize);
  
  const postData = JSON.stringify({
    children: chunk
  });

  const options = {
    hostname: 'api.notion.com',
    port: 443,
    path: `/v1/blocks/${PAGE_ID}/children`,
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer ' + API_KEY,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    }
  };

  const req = https.request(options, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log(`✅ Block ${i}-${i+chunk.length} added`);
      } else {
        console.log(`❌ Error: ${res.statusCode}`, body.substring(0, 200));
      }
    });
  });

  req.on('error', console.error);
  req.write(postData);
  req.end();
}
