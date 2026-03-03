const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PARENT_ID = '3163d91f2f008043b64bfcd8d58cc7cd';

const postData = JSON.stringify({
  parent: { page_id: PARENT_ID },
  properties: {
    title: {
      title: [
        { text: { content: 'OpenClaw 折腾日记（一）- 完整版' } }
      ]
    }
  },
  children: [
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '历时一周，终于把 OpenClaw 搭建好了！从头开始踩坑，结合油管视频经验，记录完整过程👇' } }]
      }
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '🖥️' },
        rich_text: [{ text: { content: '系统：Linux (Debian)\n安装：一条命令\n平台：Telegram\n模型：MiniMax M2.5 + GPT-5.2 Codex' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '一、为什么选择 OpenClaw？' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '查资料、写代码' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '浏览器自动化控制' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '定时任务执行' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '多平台对接（Telegram、Discord等）' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '二、部署平台选择' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. VPS（推荐）' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '优点：成本低、可远程访问、7×24小时运行' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '推荐：腾讯云、Vultr、1Panel' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '2. Mac Mini' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '优点：性能强、可控制本地硬件' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '三、环境准备' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '系统：Debian/Ubuntu' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '内存：2GB+' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '端口：18789' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '四、安装过程' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: 'Step 1：安装 Node.js' } }]
      }
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'bash',
        rich_text: [{ text: { content: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash\nnvm install 22' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: 'Step 2：安装 OpenClaw' } }]
      }
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'bash',
        rich_text: [{ text: { content: 'npm install -g openclaw@latest' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: 'Step 3：初始化配置' } }]
      }
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'bash',
        rich_text: [{ text: { content: 'openclaw setup' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '五、安装经验与教训' } }]
      }
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '⚡' },
        rich_text: [{ text: { content: '来自油管视频经验总结' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: 'QuickStart 模式：最小配置+最快部署' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '跳过模型配置，后面单独设置' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '选择 Hatch in TUI 模式' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '六、对接 Telegram' } }]
      }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ text: { content: '创建机器人：@BotFather → /newbot' } }]
      }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ text: { content: '配置 Token' } }]
      }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: {
        rich_text: [{ text: { content: '配对' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '七、模型接入' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: 'MiniMax M2.5（国内）：https://api.minimax.chat/v1' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: 'GPT-5.2 Codex（国外）：需要代理' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '八、启动服务' } }]
      }
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'bash',
        rich_text: [{ text: { content: 'openclaw gateway start\nopenclaw gateway status' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '九、我们踩过的坑（真实经验）' } }]
      }
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '⚠️' },
        rich_text: [{ text: { content: '坑1：Linux 浏览器被限制\n解决：设置 User-Agent 模拟 Mac' } }]
      }
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '⚠️' },
        rich_text: [{ text: { content: '坑2：Control UI 远程访问报错\n解决：添加 allowedOrigins' } }]
      }
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '⚠️' },
        rich_text: [{ text: { content: '坑3：Telegram Bot 404\n解决：检查 Token 配置' } }]
      }
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '⚠️' },
        rich_text: [{ text: { content: '坑4：服务端口冲突\n解决：mask 多余 service' } }]
      }
    },
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '⚠️' },
        rich_text: [{ text: { content: '坑5：频繁 fetch failed\n解决：官方重置恢复' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '十、配图（待添加）' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '📷 请手动添加以下配图：\n1. 安装过程截图\n2. Telegram 对话截图\n3. 配置文件截图' } }]
      }
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
        icon: { emoji: '📌' },
        rich_text: [{ text: { content: '下篇预告：远程访问配置 + 更多技能安装...' } }]
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
