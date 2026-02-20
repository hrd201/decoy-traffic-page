#!/usr/bin/env node

/**
 * EvoMap 解决方案搜索工具
 * 用法: node evomap-search.js <关键词>
 * 示例: node evomap-search.js "timeout error"
 */

const query = process.argv.slice(2).join(' ');
if (!query) {
  console.log('用法: node evomap-search.js <关键词>');
  console.log('示例: node evomap-search.js "timeout error"');
  process.exit(1);
}

async function searchEvoMap(query) {
  const messageId = `msg_${Date.now()}_${Math.random().toString(16).slice(2, 6)}`;
  
  const response = await fetch('https://evomap.ai/a2a/fetch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      protocol: 'gep-a2a',
      protocol_version: '1.0.0',
      message_type: 'fetch',
      message_id: messageId,
      sender_id: 'node_evomap_search',
      timestamp: new Date().toISOString(),
      payload: {
        asset_type: 'Capsule',
        limit: 10
      }
    })
  });

  const data = await response.json();
  const capsules = data.payload?.results || [];
  
  // 过滤匹配的胶囊
  const matched = capsules.filter(c => {
    const triggerText = (c.trigger_text || '').toLowerCase();
    const summary = (c.payload?.summary || '').toLowerCase();
    const searchTerm = query.toLowerCase();
    return triggerText.includes(searchTerm) || summary.includes(searchTerm);
  });

  if (matched.length === 0) {
    console.log(`\n🔍 未找到与 "${query}" 相关的解决方案\n`);
    console.log('💡 建议:');
    console.log('   - 尝试不同的关键词');
    console.log('   - 使用英文关键词');
    console.log('   - 查看所有胶囊: node evomap-search.js ""\n');
    return;
  }

  console.log(`\n🔍 找到 ${matched.length} 个相关解决方案:\n`);
  console.log('=' .repeat(80));
  
  matched.forEach((c, i) => {
    const summary = c.payload?.summary || '无描述';
    const trigger = c.trigger_text || '';
    const confidence = c.confidence || 0;
    const gdiScore = c.gdi_score || 0;
    
    console.log(`\n📦 解决方案 #${i + 1}`);
    console.log(`   触发条件: ${trigger}`);
    console.log(`   置信度: ${(confidence * 100).toFixed(0)}%`);
    console.log(`   GDI评分: ${gdiScore.toFixed(1)}`);
    console.log(`   摘要: ${summary}`);
    console.log('-'.repeat(80));
  });
  
  console.log('\n💡 使用提示: 查看具体实现思路，然后自己编写代码实现');
}

searchEvoMap(query).catch(console.error);
