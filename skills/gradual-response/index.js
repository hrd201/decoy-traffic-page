// 渐进式响应系统 - OpenClaw Skill
// 根据问题复杂程度选择处理深度

const QUICK_RESPONSES = {
  '你好': '你好！有什么可以帮你的？',
  '嗨': '哈喽！需要帮忙吗？',
  'hey': 'hey！啥事儿？',
  'yo': 'yo！',
  '谢谢': '不客气～',
  '感谢': '不客气！',
  'OK': '收到！',
  '好': '明白！',
  '收到': '👍',
  '明白': '👌',
  '拜': '拜拜，有事找我～',
  '再见': '再见！',
  'bye': 'bye！',
};

const COMPLEXITY_PATTERNS = {
  // L0: 直接回复
  level0: {
    patterns: [
      /^(你好|hi|hello|hey|嗨|哈喽|yo|yo)/i,
      /^(谢谢|感谢|thx|thanks|感恩)/i,
      /^(OK|好|收到|明白|知道了)/i,
      /^(拜|再见|bye)/i,
    ],
    maxTime: 50
  },
  // L1: 简单上下文
  level1: {
    patterns: [
      /那个|之前|刚才|上次|现在怎|怎样|怎幺样/i,
      /怎幺|进度|状态|完成了吗|在吗|在不|有空/i,
    ],
    maxTime: 200
  },
  // L2: 记忆检索
  level2: {
    patterns: [
      /配置|服务器|项目|偏好|设置|记得|告诉我/i,
      /IP|端口|密码|凭证|账号|地址/i,
      /帮我查|查看|找一下|OpenClaw/i,
    ],
    maxTime: 1000
  },
  // L3: 深度处理
  level3: {
    patterns: [
      /怎么|如何|帮我|设计|实现|写一个|创建|开发/i,
      /研究|搜索|查一下|看看|为什么|为何/i,
    ],
    maxTime: 5000
  }
};

/**
 * 分类消息复杂度
 * @param {string} message 
 * @returns {object} { level, maxTime }
 */
function classify(message) {
  const text = message.trim();
  
  if (!text || text.length < 2) {
    return { level: 'L0', maxTime: 50 };
  }
  
  for (const [level, config] of Object.entries(COMPLEXITY_PATTERNS)) {
    if (config.patterns.some(p => p.test(text))) {
      return { level, maxTime: config.maxTime };
    }
  }
  
  return { level: 'L1', maxTime: 200 };
}

/**
 * 处理消息
 * @param {string} message - 用户消息
 * @param {object} context - 上下文
 * @returns {object} 处理结果
 */
async function handleMessage(message, context = {}) {
  const { level, maxTime } = classify(message);
  const text = message.trim();
  
  // L0: 快速回复
  if (level === 'L0') {
    const quickResponse = QUICK_RESPONSES[text];
    if (quickResponse) {
      return {
        type: 'quick',
        response: quickResponse,
        level,
        action: 'respond'
      };
    }
    // L0 但没有预设回复，跳过处理
    return null;
  }
  
  // L1-L3: 继续正常处理流程
  return {
    type: 'continue',
    level,
    maxTime,
    action: level === 'L3' ? 'deep' : 'normal'
  };
}

module.exports = {
  classify,
  handleMessage,
  QUICK_RESPONSES,
  COMPLEXITY_PATTERNS
};
