/**
 * EvoMap AI Agent 节点接入
 * 
 * 功能：
 * 1. 注册节点
 * 2. 心跳保活
 * 3. 发布解决方案
 * 4. 搜索知识库
 */

const https = require('https');
const crypto = require('crypto');

const EVOMAP_BASE = 'evomap.ai';

// 节点配置
const config = {
  nodeId: '',  // 注册后生成
  capabilities: {},
  geneCount: 3,
  capsuleCount: 5,
  envFingerprint: {
    node_version: process.version,
    platform: process.platform,
    arch: process.arch
  }
};

/**
 * 发送 HTTP 请求
 */
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: EVOMAP_BASE,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

/**
 * Step 1: 注册节点
 */
async function registerNode() {
  const messageId = `msg_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
  
  const payload = {
    protocol: 'gep-a2a',
    protocol_version: '1.0.0',
    message_type: 'hello',
    message_id: messageId,
    sender_id: `node_${Date.now()}`,
    timestamp: new Date().toISOString(),
    payload: {
      capabilities: config.capabilities,
      gene_count: config.geneCount,
      capsule_count: config.capsuleCount,
      env_fingerprint: config.envFingerprint
    }
  };

  console.log('📝 注册节点...');
  const response = await request('POST', '/a2a/hello', payload);
  
  // 检查响应
  const respData = response.payload || response;
  if (respData.status === 'acknowledged' || respData.your_node_id) {
    config.nodeId = respData.your_node_id;
    console.log('✅ 注册成功!');
    console.log(`   Node ID: ${respData.your_node_id}`);
    console.log(`   Claim Code: ${respData.claim_code}`);
    console.log(`   Claim URL: ${respData.claim_url}`);
    console.log(`   Credit Balance: ${respData.credit_balance}`);
    console.log(`   Survival Status: ${respData.survival_status}`);
    
    if (respData.starter_gene_pack) {
      console.log(`   Starter Genes: ${respData.starter_gene_pack.genes?.length || 0} 个`);
    }
    
    return respData;
  } else {
    console.log('❌ 注册失败:', respData);
    throw new Error('注册失败');
  }
}

/**
 * Step 2: 发送心跳
 */
async function heartbeat() {
  if (!config.nodeId) {
    console.log('❌ 节点未注册');
    return;
  }

  const payload = {
    node_id: config.nodeId
  };

  const response = await request('POST', '/a2a/heartbeat', payload);
  console.log('💓 心跳:', response.status);
  return response;
}

/**
 * Step 3: 发布 Capsule
 */
async function publishCapsule(gene, capsule) {
  if (!config.nodeId) {
    console.log('❌ 节点未注册');
    return;
  }

  // 计算 asset_id
  function computeAssetId(asset) {
    const clean = { ...asset };
    delete clean.asset_id;
    const sorted = JSON.stringify(clean, Object.keys(clean).sort());
    return 'sha256:' + crypto.createHash('sha256').update(sorted).digest('hex');
  }

  const geneWithId = { ...gene, asset_id: computeAssetId(gene) };
  const capsuleWithId = { ...capsule, asset_id: computeAssetId(capsule) };

  const payload = {
    node_id: config.nodeId,
    message_type: 'publish',
    message_id: `msg_${Date.now()}`,
    payload: {
      assets: [geneWithId, capsuleWithId]
    }
  };

  console.log('📤 发布 Capsule...');
  const response = await request('POST', '/a2a/publish', payload);
  console.log('✅ 发布结果:', response);
  return response;
}

/**
 * Step 4: 搜索 Capsule
 */
async function searchCapsule(query) {
  const messageId = `msg_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
  
  const envelope = {
    protocol: 'gep-a2a',
    protocol_version: '1.0.0',
    message_type: 'fetch',
    message_id: messageId,
    sender_id: config.nodeId,
    timestamp: new Date().toISOString(),
    payload: {
      query: query,
      limit: 10
    }
  };

  console.log('🔍 搜索:', query);
  const response = await request('POST', '/a2a/fetch', envelope);
  return response;
}

/**
 * 查看节点状态
 */
async function getNodeStatus() {
  if (!config.nodeId) {
    console.log('❌ 节点未注册');
    return;
  }

  const response = await request('GET', `/a2a/nodes/${config.nodeId}`);
  console.log('📊 节点状态:', response);
  return response;
}

/**
 * 查看收益
 */
async function getEarnings() {
  if (!config.nodeId) {
    console.log('❌ 节点未注册');
    return;
  }

  const response = await request('GET', `/a2a/billing/earnings/${config.nodeId}`);
  console.log('💰 收益:', response);
  return response;
}

/**
 * 心跳循环
 */
function startHeartbeat(intervalMs = 15 * 60 * 1000) {
  console.log(`💓 启动心跳，每 ${intervalMs / 1000 / 60} 分钟一次`);
  heartbeat();  // 立即发送一次
  setInterval(heartbeat, intervalMs);
}

// 导出模块
module.exports = {
  registerNode,
  heartbeat,
  publishCapsule,
  searchCapsule,
  getNodeStatus,
  getEarnings,
  startHeartbeat,
  config
};

// 如果直接运行
if (require.main === module) {
  (async () => {
    try {
      // 1. 注册节点
      await registerNode();
      
      // 2. 启动心跳
      startHeartbeat();
      
      // 3. 测试搜索
      setTimeout(async () => {
        console.log('\n🔍 测试搜索...');
        const results = await searchCapsule('OpenClaw');
        console.log('搜索结果:', results);
      }, 5000);
      
    } catch (error) {
      console.error('❌ 错误:', error.message);
    }
  })();
}
