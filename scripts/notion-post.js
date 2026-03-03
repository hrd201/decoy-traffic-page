const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PARENT_ID = '3163d91f2f008043b64bfcd8d58cc7cd'; 

const postData = JSON.stringify({
  parent: { page_id: PARENT_ID },
  properties: {
    title: {
      title: [
        { text: { content: 'OpenClaw 折腾日记 (一) - Linux部署+Telegram对接' } }
      ]
    }
  },
  children: [
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '历时一周，终于把 OpenClaw 搭建好了！从头开始踩坑，记录完整过程👇' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '🖥️ 系统：Linux (Debian)\n📦 安装：一条命令\n🔗 平台：Telegram' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '一、环境准备' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. 服务器/VPS（配置推荐）：' } }]
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
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '2. 需要的账号：' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: 'Telegram Bot（@BotFather创建）' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '模型API（MiniMax/OpenAI）' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '二、安装过程' } }]
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
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '按提示选择：\n- 模型：MiniMax / OpenAI\n- 频道：Telegram\n- 端口：18789' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '三、对接Telegram' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '创建机器人：@BotFather → /newbot' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '配置 Token' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '配对' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '四、模型接入' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '我们配置了两个模型：\n\n1. MiniMax M2.5（国内）：免费额度\n2. GPT-5.2 Codex（国外）：需代理' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '五、启动服务' } }]
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
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '访问：http://127.0.0.1:18789' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '六、常见问题' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: 'Q1：发消息不回？\n→ 检查模型API是否可用\n→ 检查代理设置\n\nQ2：Telegram连不上？\n→ 检查token是否正确\n→ 检查代理\n\nQ3：端口访问不了？\n→ 检查防火墙' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '七、总结' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: 'OpenClaw 确实强大，可以在服务器上帮你完成各种任务：\n✅ 查资料\n✅ 写代码\n✅ 浏览器控制\n✅ 定时任务\n\n安全性要注意！不要随便执行不明命令。\n\n下篇讲如何远程访问和更多技能安装...' } }]
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
  res.on('end', () => {
    console.log(body);
  });
});

req.on('error', console.error);
req.write(postData);
req.end();
