// 消息处理器 - 根据复杂度自动选择处理方式

const { classify, QUICK_RESPONSES } = require('./quick-reply.js');

/**
 * 处理入口
 * @param {string} message - 用户消息
 * @param {object} context - 上下文（最近对话等）
 * @returns {Promise<object>} - { type, response, action }
 */
async function handleMessage(message, context = {}) {
  const { level, action } = classify(message);
  
  // Level 0: 快速回复
  if (level === 'level0') {
    const quickResponse = QUICK_RESPONSES[message.trim()] || null;
    if (quickResponse) {
      return { 
        type: 'quick', 
        response: quickResponse,
        action: 'direct',
        level: 'L0'
      };
    }
    // 无需处理，让系统自然响应
    return { type: 'passthrough', action: 'direct', level: 'L0' };
  }
  
  // Level 1: 检查上下文
  if (level === 'level1') {
    // 可以在这里快速检查最近对话
    return { type: 'context', action: 'history', level: 'L1' };
  }
  
  // Level 2: 搜索记忆
  if (level === 'level2') {
    return { type: 'memory', action: 'memory', level: 'L2' };
  }
  
  // Level 3: 深度处理
  return { type: 'deep', action: 'deep', level: 'L3' };
}

// 模拟测试
async function test() {
  console.log('📨 消息处理测试:\n');
  
  const messages = [
    "你好",
    "谢谢",
    "那个任务怎样了",
    "之前配置的代理端口是多少？",
    "怎么实现语音输入？",
  ];
  
  for (const msg of messages) {
    const result = await handleMessage(msg);
    console.log(`"${msg}"`);
    console.log(`  → ${result.level} | ${result.action} | ${result.type}\n`);
  }
}

test();

module.exports = { handleMessage };
