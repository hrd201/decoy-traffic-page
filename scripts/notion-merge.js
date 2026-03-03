const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PAGE_ID = '3163d91f2f008135ae0ff263c1cb96f8'; // 第一篇日记的ID

const blocksToAdd = [
  {
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ text: { content: '八、油管视频经验总结' } }]
    }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ text: { content: '来源：YouTube - 安格视界《全能AI打工人 OpenClaw 精选案例 + 最佳部署架构》' } }]
    }
  },
  {
    object: 'block',
    type: 'heading_3',
    heading_3: {
      rich_text: [{ text: { content: '1. 部署平台选择' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: 'VPS：低成本、可远程访问、7x24小时运行' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: '本地电脑（Mac Mini）：性能强、可控制本地硬件' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: '腾讯云应用模板（推荐）：预置全套运行环境' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: 'Vultr VPS + Coolify：一站式开源应用部署' } }]
    }
  },
  {
    object: 'block',
    type: 'heading_3',
    heading_3: {
      rich_text: [{ text: { content: '2. 安装经验与教训' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: '首次配置建议选择 QuickStart 模式：最小配置+最快部署' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: '跳过模型配置，后面单独设置，避免地址错误' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: '选择 Hatch in TUI 模式：通过终端使用' } }]
    }
  },
  {
    object: 'block',
    type: 'heading_3',
    heading_3: {
      rich_text: [{ text: { content: '3. 公网访问方案' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: '域名绑定（推荐）：比暴露端口更安全' } }]
    }
  },
  {
    object: 'block',
    type: 'bulleted_list_item',
    bulleted_list_item: {
      rich_text: [{ text: { content: 'WebSocket：仅建议临时测试使用' } }]
    }
  },
  {
    object: 'block',
    type: 'code',
    code: {
      language: 'json',
      rich_text: [{ text: { content: '配置修改：\nmode: "remote"\nbind: "lan"' } }]
    }
  },
  {
    object: 'block',
    type: 'heading_3',
    heading_3: {
      rich_text: [{ text: { content: '4. 模型选择建议' } }]
    }
  },
  {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ text: { content: '国内推荐：Moonshot、MiniMax、阿里百炼\n国外推荐：OpenAI、Anthropic Claude、Google Gemini' } }]
    }
  }
];

// 分块添加blocks（每次最多添加100个）
async function addBlocks() {
  const postData = JSON.stringify({ children: blocksToAdd });
  
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

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(body);
        resolve(body);
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

addBlocks();
