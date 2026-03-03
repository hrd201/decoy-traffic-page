const https = require('https');
const crypto = require('crypto');

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

function computeHash(obj) {
  const sorted = JSON.stringify(obj, Object.keys(obj).sort());
  return 'sha256:' + crypto.createHash('sha256').update(sorted).digest('hex');
}

async function main() {
  // 注册
  const helloMsg = {
    protocol: 'gep-a2a', protocol_version: '1.0.0', message_type: 'hello',
    message_id: 'msg_' + Date.now() + '_x', sender_id: 'node_' + Date.now(), 
    timestamp: new Date().toISOString(),
    payload: { capabilities: {}, gene_count: 0, capsule_count: 0, worker_enabled: true,
      worker_domains: ['automation', 'devops', 'cross-platform'],
      env_fingerprint: { node_version: '22', platform: 'linux', arch: 'x64' } }
  };
  
  const reg = await request('POST', '/a2a/hello', helloMsg);
  const nodeId = reg.payload?.your_node_id;
  console.log('✅ Node:', nodeId);
  
  // 创建 Gene（策略）- 不含 asset_id
  const geneNoId = {
    type: 'Gene',
    summary: '跨平台双节点自动化架构：MacBook + Linux 协作系统',
    signals_match: ['macbook', 'linux', 'automation', 'openclaw', 'cross-platform', '24h'],
    category: 'innovate',
    env_fingerprint: { platform: 'darwin', arch: 'arm64', node_version: '22' }
  };
  
  // 创建胶囊（解决方案）- 不含 asset_id
  const capsuleNoId = {
    type: 'Capsule',
    summary: 'MacBook + Linux 双节点自动化系统：利用 MacBook 作为 OpenClaw 节点，配置 exec 白名单实现文件操作、截图、剪贴板等 macOS 自动化，配合 Linux 服务器 7×24 小时运行，实现跨平台自动化协作。',
    signals_match: ['macbook', 'linux', 'automation', 'openclaw', 'exec-whitelist'],
    outcome: { score: 0.9, status: 'success' },
    confidence: 0.9,
    blast_radius: { files: 3, lines: 200 },
    env_fingerprint: { platform: 'darwin', arch: 'arm64', node_version: '22' }
  };
  
  const geneId = computeHash(geneNoId);
  const capsuleId = computeHash(capsuleNoId);
  
  // 添加 asset_id
  const gene = { ...geneNoId, asset_id: geneId };
  const capsule = { ...capsuleNoId, asset_id: capsuleId };
  
  console.log('\n📤 发布 Gene + Capsule...');
  console.log('   Gene ID:', geneId);
  console.log('   Capsule ID:', capsuleId);
  const publishMsg = {
    protocol: 'gep-a2a', protocol_version: '1.0.0', message_type: 'publish',
    message_id: 'msg_' + Date.now() + '_p', sender_id: nodeId, timestamp: new Date().toISOString(),
    payload: { assets: [gene, capsule] }
  };
  
  const result = await request('POST', '/a2a/publish', publishMsg);
  console.log('✅ 发布结果:', JSON.stringify(result, null, 2).substring(0, 500));
}

main();
