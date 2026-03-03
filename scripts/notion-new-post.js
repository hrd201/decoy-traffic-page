const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PARENT_ID = '3163d91f2f008043b64bfcd8d58cc7cd';

const postData = JSON.stringify({
  parent: { page_id: PARENT_ID },
  properties: {
    title: {
      title: [
        { text: { content: 'OpenClaw 折腾日记（一） - 最全部署指南' } }
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
        rich_text: [{ text: { content: '优点：性能强、可控制本地硬件、安全隔离好' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '缺点：成本较高' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '3. 腾讯云应用模板（新手推荐）' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '优点：预置全套运行环境+OpenClaw核心程序' } }]
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
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. 服务器/VPS 配置' } }]
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
        rich_text: [{ text: { content: '2. 需要的账号' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: 'Telegram Bot：@BotFather 创建' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '模型API：MiniMax / Moonshot / OpenAI / Claude' } }]
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
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '按提示选择：\n- 模型：MiniMax / OpenAI\n- 频道：Telegram\n- 端口：18789' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '五、安装经验与教训（必看）' } }]
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
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. QuickStart 模式（新手推荐）' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '首次配置建议选择 QuickStart 模式' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '最小配置 + 最快部署，跳过非必要配置项' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '2. 跳过模型配置' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '建议先选择 Skip for now 跳过大模型配置' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '后面再单独设置，避免接口地址错误' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '国内模型用国际版地址会导致报错' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '3. 选择 Hatch in TUI 模式' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '通过终端使用' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '后面也可以通过配置 Web UI 通过网页访问' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '4. 配置丢失怎么办？' } }]
      }
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'bash',
        rich_text: [{ text: { content: 'openclaw configure' } }]
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
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '步骤' } }]
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
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. MiniMax M2.5（国内）' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: 'API 地址：https://api.minimax.chat/v1' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '优点：国内直连、免费额度' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '2. GPT-5.2 Codex（国外）' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '需要代理' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '优点：能力强' } }]
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
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '访问：http://127.0.0.1:18789' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '九、公网访问方案' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. 域名绑定（推荐）' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '有域名建议使用域名绑定' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '比暴露端口更安全' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '2. WebSocket' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '需直接暴露 Gateway 端口' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '仅建议临时测试使用' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '3. 配置修改' } }]
      }
    },
    {
      object: 'block',
      type: 'code',
      code: {
        language: 'json',
        rich_text: [{ text: { content: 'mode: "remote"\nbind: "lan"' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '十、常见问题' } }]
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
        rich_text: [{ text: { content: '十一、总结' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: 'OpenClaw 是 2026 年最强的 AI 智能体框架之一：\n\n✅ 查资料\n✅ 写代码\n✅ 浏览器控制\n✅ 定时任务\n✅ 多平台对接\n\n⚠️ 安全性要注意：不要随便执行不明命令' } }]
      }
    },
    {
      object: 'block',
      type: 'divider',
      divider: {}
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '📺 参考视频：YouTube - 安格视界《全能AI打工人 OpenClaw 精选案例 + 最佳部署架构》' } }]
      }
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
