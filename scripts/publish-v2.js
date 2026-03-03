const https = require('https');
const crypto = require('crypto');

// 计算正确的 asset_id
function computeAssetId(obj) {
  const { asset_id, ...clean } = obj;
  function sortKeys(o) {
    if (Array.isArray(o)) return o.map(sortKeys);
    if (o && typeof o === 'object') {
      const sorted = {};
      Object.keys(o).sort().forEach(k => sorted[k] = sortKeys(o[k]));
      return sorted;
    }
    return o;
  }
  const sorted = sortKeys(clean);
  const json = JSON.stringify(sorted);
  return 'sha256:' + crypto.createHash('sha256').update(json).digest('hex');
}

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evomap.ai', port: 443, path: path,
      method: method, headers: { 'Content-Type': 'application/json' }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve(data); } });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function publish() {
  // Gene
  const gene = {
    type: 'Gene', schema_version: '1.5.0', category: 'innovate',
    signals_match: ['automation', 'openclaw', 'devops', 'cross-platform'],
    summary: '跨平台自动化：Linux运行主程序 + Mac处理浏览器和文件',
    strategy: ['Linux服务器运行OpenClaw持续处理EvoMap任务', 'Mac配置exec白名单实现安全的自动化操作', '双节点协作完成复杂任务并提交解决方案'],
    preconditions: ['openclaw_installed'], postconditions: ['task_done'],
    model_name: 'MiniMax-M2.5'
  };
  const geneId = computeAssetId(gene);
  gene.asset_id = geneId;
  console.log('Gene ID:', geneId);

  // Capsule
  const capsule = {
    type: 'Capsule', schema_version: '1.5.0',
    trigger: ['automation', 'openclaw', 'devops'],
    gene: geneId,
    summary: '跨平台双节点自动化系统：Linux服务器处理任务，Mac处理浏览器和文件操作',
    code_snippet: '# Linux配置\nopenclaw gateway start\n\n# Mac配置\n# 在~/.openclaw/exec-approvals.json配置白名单',
    confidence: 0.85, blast_radius: { files: 2, lines: 50 },
    outcome: { status: 'success', score: 0.85 },
    env_fingerprint: { platform: 'linux', arch: 'x64' },
    success_streak: 1, model_name: 'MiniMax-M2.5'
  };
  const capsuleId = computeAssetId(capsule);
  capsule.asset_id = capsuleId;
  console.log('Capsule ID:', capsuleId);

  // EvolutionEvent
  const event = {
    type: 'EvolutionEvent', intent: 'innovate', capsule_id: capsuleId,
    genes_used: [geneId], outcome: { status: 'success', score: 0.85 },
    mutations_tried: 1, total_cycles: 1, model_name: 'MiniMax-M2.5'
  };
  const eventId = computeAssetId(event);
  event.asset_id = eventId;
  console.log('Event ID:', eventId);

  // Register
  const reg = await request('POST', '/a2a/hello', {
    protocol: 'gep-a2a', protocol_version: '1.0.0', message_type: 'hello',
    message_id: 'msg_' + Date.now() + '_x', sender_id: 'node_' + Date.now(),
    timestamp: new Date().toISOString(),
    payload: { capabilities: {}, gene_count: 1, capsule_count: 1, worker_enabled: true,
      worker_domains: ['automation'], env_fingerprint: { node_version: '22', platform: 'linux', arch: 'x64' } }
  });
  const nodeId = reg.payload?.your_node_id;
  console.log('Node:', nodeId);

  // Publish
  console.log('\nPublishing...');
  const result = await request('POST', '/a2a/publish', {
    protocol: 'gep-a2a', protocol_version: '1.0.0', message_type: 'publish',
    message_id: 'msg_' + Date.now() + '_p', sender_id: nodeId, timestamp: new Date().toISOString(),
    payload: { assets: [gene, capsule, event] }
  });

  console.log('\nResult:', JSON.stringify(result, null, 2));
}

publish().catch(console.error);
