const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PARENT_ID = '3163d91f2f008043b64bfcd8d58cc7cd'; 

const postData = JSON.stringify({
  parent: { page_id: PARENT_ID },
  properties: {
    title: {
      title: [
        { text: { content: 'OpenClaw 部署平台选择经验总结 - 来自油管视频' } }
      ]
    }
  },
  children: [
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '📺 视频来源：全能AI打工人 OpenClaw 精选案例 + 最佳部署架构' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '来源：YouTube - 安格视界\n时长：20分钟31秒\n发布日期：2026年2月23日' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '一、部署平台选择' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. VPS vs 本地电脑' } }]
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
        rich_text: [{ text: { content: '本地电脑（Mac Mini）：性能强、可控制本地硬件、安全隔离' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '2. 推荐平台' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '腾讯云应用模板（推荐）：预置全套运行环境+OpenClaw核心程序' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: 'Vultr VPS + Coolify：一站式开源应用部署平台' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '1Panel 应用商店：一键安装 Moltbot（OpenClaw）' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '二、安装经验与教训' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '1. 快速配置建议' } }]
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
        rich_text: [{ text: { content: '跳过模型配置，后面单独设置' } }]
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
        rich_text: [{ text: { content: '2. 常见问题' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '模型接口地址错误：国内模型用国际版地址会导致报错' } }]
      }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ text: { content: '配置丢失：可执行 openclaw configure 重新配置' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '三、公网访问方案' } }]
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
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '有域名建议使用域名绑定，而不是暴露端口的方式' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: {
        rich_text: [{ text: { content: '2. WebSocket 方案' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '需直接暴露 Gateway 端口，安全性较低，仅建议用于临时测试' } }]
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
        rich_text: [{ text: { content: '将 ~/.openclaw/openclaw.json 里的:\n- mode 改成 "remote"\n- bind 改成 "lan"\n然后重启 OpenClaw' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '四、模型选择' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '国内推荐：\n- Moonshot（月之暗面）\n- MiniMax\n- 阿里百炼\n\n国外推荐：\n- OpenAI (GPT-5.2 Codex)\n- Anthropic (Claude)\n- Google (Gemini)' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ text: { content: '五、我们的方案总结' } }]
      }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: [{ text: { content: '✅ 当前方案：Debian VPS + npm 安装\n✅ 模型：MiniMax M2.5（国内）+ GPT-5.2 Codex（国外）\n✅ 平台对接：Telegram\n\n📌 可借鉴：\n- 使用 QuickStart 模式快速部署\n- 域名绑定代替端口暴露\n- 模型分开配置避免地址错误' } }]
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
