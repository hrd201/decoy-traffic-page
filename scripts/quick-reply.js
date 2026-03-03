// 快速回复分类器 v2 - 实际可用版本

const COMPLEXITY_PATTERNS = {
  // Level 0: 直接回答 (< 50ms) - 无需任何检查
  level0: {
    patterns: [
      /^(你好|hi|hello|hey|嗨|哈喽|yo)/i,
      /^(谢谢|感谢|thx|thanks|感恩)/i,
      /^(OK|好|收到|明白|知道了)/i,
      /^(拜|再见|bye)/i,
      /^几点了/i,
      /^(HEARTBEAT_OK|no_reply)/i,
    ],
    response: 'direct'
  },
  
  // Level 1: 简单上下文 (< 200ms) - 查最近对话
  level1: {
    patterns: [
      /那个|之前|刚才|上次|现在怎|怎样|怎幺样/i,
      /怎幺|如何|进度|状态|完成了吗/i,
      /在吗|在不|有空/i,
    ],
    response: 'history'
  },
  
  // Level 2: 记忆检索 (< 1s) - 搜索长期记忆
  level2: {
    patterns: [
      /配置|服务器|项目|偏好|设置|记得|告诉我/i,
      /IP|端口|密码|凭证|账号|地址/i,
      /帮我查|查看|找一下/i,
      /OpenClaw|Open claw/i,
    ],
    response: 'memory'
  },
  
  // Level 3: 深度处理 (> 2s) - 搜索+推理+执行
  level3: {
    patterns: [
      /怎么|如何|帮我|设计|实现|写一个|创建|开发/i,
      /研究|搜索|查一下|看看/i,
      /为什么|为何|原因/i,
    ],
    response: 'deep'
  }
};

function classify(message) {
  const text = message.trim();
  
  // 特殊处理
  if (!text || text.length < 2) return { level: 'level0', action: 'direct' };
  
  for (const [level, config] of Object.entries(COMPLEXITY_PATTERNS)) {
    if (config.patterns.some(p => p.test(text))) {
      return { level, action: config.response };
    }
  }
  
  return { level: 'level1', action: 'history' };
}

// 快速响应表
const QUICK_RESPONSES = {
  '你好': '你好！有什么可以帮你的？',
  '嗨': '哈喽！需要帮忙吗？',
  'hey': 'hey！啥事儿？',
  '谢谢': '不客气～',
  'OK': '收到！',
  '好': '明白！',
  '收到': '👍',
  '拜': '拜拜，有事找我～',
  '再见': '再见！',
};

// 测试
console.log('🧪 测试分类器 v2:\n');
const tests = [
  "你好",
  "谢谢",
  "OK",
  "现在几点？",
  "那个任务完成了吗？",
  "之前配置的服务器IP是什么？",
  "OpenClaw 怎么安装？",
  "怎么实现语音输入？",
  "帮我写个脚本",
  "研究一下这个错误",
];

for (const t of tests) {
  const result = classify(t);
  const quick = QUICK_RESPONSES[t] || null;
  console.log(`"${t}"`);
  console.log(`  → ${result.level} (${result.action})${quick ? ' [快速回复]' : ''}\n`);
}

module.exports = { classify, COMPLEXITY_PATTERNS, QUICK_RESPONSES };
