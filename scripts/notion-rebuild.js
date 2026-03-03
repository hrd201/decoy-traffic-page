const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PAGE_ID = '3173d91f-2f00-8155-860a-d47fe5b66fe5'; // 要删除重建的页面

// 1. 删除页面所有 blocks
function deleteAllBlocks(blockId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/blocks/${blockId}/children?block_id=${blockId}`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Notion-Version': '2022-06-28'
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', async () => {
        try {
          const data = JSON.parse(body);
          const blocks = data.results || [];
          
          console.log(`Found ${blocks.length} blocks to delete...`);
          
          // 删除每个 block
          for (const block of blocks) {
            await deleteBlock(block.id);
          }
          
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function deleteBlock(blockId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1/blocks/${blockId}`,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Notion-Version': '2022-06-28'
      }
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve();
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// 2. 重新添加内容
const newBlocks = [
  {
    object: 'block',
    type: 'heading_1',
    heading_1: { rich_text: [{ text: { content: '🎯 MacBook + Linux 双节点自动化系统' } }] }
  },
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
    bulleted_list_item: { rich_text: [{ text: { content: '7×24 小时运行，处理 EvoMap 任务' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '运行定时任务（GitHub Trending、记忆同步）' } }] }
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
    bulleted_list_item: { rich_text: [{ text: { content: '配置 Chrome profile: Default' } }] }
  },
  // exec 白名单
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '🔐 MacBook exec 白名单' } }] }
  },
  {
    object: 'block',
    type: 'code',
    code: {
      language: 'json',
      rich_text: [{ text: { content: `{
  "version": 1,
  "agents": {
    "main": {
      "security": "allowlist",
      "allowlist": [
        { "pattern": "open *" },
        { "pattern": "screencapture" },
        { "pattern": "pbcopy" },
        { "pattern": "pbpaste" },
        { "pattern": "curl *" }
      ]
    }
  }
}` } }]
    }
  },
  // 赚积分
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '💰 赚积分策略' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '24小时在线 → 更多任务分配' } }] }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: { rich_text: [{ text: { content: '双节点协作 → 解决复杂问题' } }] }
  },
  // 状态
  {
    object: 'block',
    type: 'heading_2',
    heading_2: { rich_text: [{ text: { content: '📊 当前状态' } }] }
  },
  {
    object: 'block',
    type: 'to_do',
    to_do: { checked: true, rich_text: [{ text: { content: 'Linux 节点已配置' } }] }
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
  // 更新日期
  {
    object: 'block',
    type: 'divider',
    divider: {}
  },
  {
    object: 'block',
    type: 'callout',
    callout: {
      icon: { emoji: '🔄' },
      rich_text: [{ text: { content: '最后更新: 2026-03-03' } }]
    }
  }
];

function addNewBlocks() {
  return new Promise((resolve, reject) => {
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

    const postData = JSON.stringify({ children: newBlocks });

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ New content added!');
          resolve();
        } else {
          console.log('❌ Error:', body.substring(0, 200));
          reject(new Error('Failed to add blocks'));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('🗑️ Deleting old blocks...');
  await deleteAllBlocks(PAGE_ID);
  
  console.log('➕ Adding new blocks...');
  await addNewBlocks();
  
  console.log('✅ Done!');
}

main().catch(console.error);
