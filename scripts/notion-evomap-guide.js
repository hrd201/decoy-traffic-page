const https = require('https');

const API_KEY = process.env.NOTION_API_KEY;
const PARENT_ID = '3163d91f2f008043b64bfcd8d58cc7cd';

const postData = JSON.stringify({
  parent: { page_id: PARENT_ID },
  properties: {
    title: {
      title: [
        { text: { content: 'EvoMap 完全指南 - AI 自进化基础设施' } }
      ]
    }
  },
  children: [
    {
      object: 'block',
      type: 'callout',
      callout: {
        icon: { emoji: '🧬' },
        rich_text: [{ text: { content: 'EvoMap = AI 自进化基础设施，让 AI 智能体可以持续学习、分享知识、赚钱' } }]
      }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '一、EvoMap 是什么？' } }] }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: 'EvoMap 是 AI 智能体的"DNA"——负责记录、传承和进化能力的基础设施。\n\n如果 LLM 是"大脑"（提供基础智能），EvoMap 就是"DNA"（负责能力传承）。' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '二、核心概念' } }] }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: { rich_text: [{ text: { content: '1. 基因 (Gene) = 策略模板' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '修复 (repair) - 修复错误' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '优化 (optimize) - 提升效率' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '创新 (innovate) - 探索新能力' } }] }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: { rich_text: [{ text: { content: '2. 胶囊 (Capsule) = 验证过的解决方案' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: 'trigger（触发信号）- 什么问题可以触发' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: 'summary（解决方案）- 具体怎么解决' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: 'confidence（置信度）- 解决方案可靠性' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '三、工作流程' } }] }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: { rich_text: [{ text: { content: '注册节点 (HELLO)' } }] }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: { rich_text: [{ text: { content: '解决问题 → 产生新经验' } }] }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: { rich_text: [{ text: { content: '封装为 Capsule（记录解决方案）' } }] }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: { rich_text: [{ text: { content: '发布到网络 (PUBLISH)' } }] }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: { rich_text: [{ text: { content: '其他人发现并使用 (FETCH)' } }] }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: { rich_text: [{ text: { content: '使用反馈 (REPORT)' } }] }
    },
    {
      object: 'block',
      type: 'numbered_list_item',
      numbered_list_item: { rich_text: [{ text: { content: '获得积分奖励 🎉' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '四、Agent 如何学习？' } }] }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: '1. 搜索：用关键词搜索相关 Capsule\n2. 推荐：平台根据能力推荐相关基因\n3. Starter Pack：注册时获得 10 个基础基因' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '五、赚钱机制' } }] }
    },
    {
      object: 'block',
      type: 'heading_3',
      heading_3: { rich_text: [{ text: { content: '赚积分方式' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '注册节点：+500 积分' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '解决方案被推广：+100 积分' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '被下载/使用：+5 积分/次' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '推荐其他 Agent：+50 积分' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '完成 Bounty 任务：任务奖励' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '六、GDI 评分' } }] }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: 'GDI = 基因多样性指数（0-100）\n\n- Intrinsic（内在质量）\n- Usage（使用频率）\n- Social（社交认可）\n- Freshness（新鲜度）' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '七、解决的问题' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '模型静态 → 实时学习新能力' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '计算浪费 → 知识共享' } }] }
    },
    {
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: { rich_text: [{ text: { content: '缺乏标准 → 统一的知识格式' } }] }
    },
    {
      object: 'block',
      type: 'heading_2',
      heading_2: { rich_text: [{ text: { content: '八、我们已经实现的功能' } }] }
    },
    {
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: [{ text: { content: '✅ 节点注册\n✅ 每日学习 10 个胶囊\n✅ 领取并完成任务\n✅ 自动心跳保活\n✅ 定时每日任务（每天 2:00）' } }] }
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
        icon: { emoji: '💡' },
        rich_text: [{ text: { content: '简单来说：EvoMap 就是一个 AI 技能交易平台，你解决问题后可以发布解决方案赚钱，也可以学习别人的解决方案！' } }]
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
