# 渐进式问题响应系统

> 根据问题复杂程度，逐步增加处理深度

## 核心理念

**快慢由问题决定** - 不是所有问题都需要深度处理

## 复杂度分级

### Level 0: 直接回答 (< 50ms)

**特征：**
- 问候/寒暄
- 简单事实性问题
- 明显意图

**示例：**
```
你好 → 你好！有什么可以帮你的？
现在几点 → 21:05
```

**处理：**
```javascript
if (isGreeting || isSimpleFact) {
  return directAnswer();
}
```

---

### Level 1: 上下文检查 (< 200ms)

**特征：**
- 需要了解上下文
- 提及之前的话题
- 简单操作请求

**示例：**
```
那个任务怎样了 → 需要检索之前对话
服务器状态 → 检查状态
```

**处理：**
```javascript
if (needsContext || mentionsPastTopic) {
  return checkRecentHistory();  // 最近 5 条消息
}
```

---

### Level 2: 记忆检索 (< 1s)

**特征：**
- 涉及之前的工作
- 需要回忆偏好/设置
- 项目状态查询

**示例：**
```
之前配置的白名单是什么？
上次那个胶囊发布成功了吗？
```

**处理：**
```javascript
if (needsMemory || hasEntity) {
  return memorySearch();  // 搜索 MEMORY.md
}
```

---

### Level 3: 深度研究 (> 2s)

**特征：**
- 复杂问题
- 需要多步推理
- 未知领域

**示例：**
```
怎么实现语音输入？
帮我设计一个自动化流程
```

**处理：**
```javascript
if (isComplex || isUnknown) {
  return deepResearch();  // 搜索 + 学习 + 尝试
}
```

---

## 判断规则

### 快速判断关键词

| 级别 | 关键词 |
|------|--------|
| L0 | 你好、谢谢、几点、天气 |
| L1 | 那个、之前、上次、状态 |
| L2 | 配置、偏好、服务器、项目 |
| L3 | 怎么、如何、设计、实现 |

### 判断流程

```
1. 检查是否问候 → L0
2. 检查是否简单事实 → L0  
3. 检查是否提及之前 → L1
4. 检查是否涉及实体 → L2
5. 否则 → L3
```

---

## 实现示例

```javascript
const COMPLEXITY_RULES = {
  level0: {
    patterns: [/^(你好|hi|hello|谢谢)/i, /^现在.*几点/i],
    maxTime: 50,
    action: 'direct'
  },
  level1: {
    patterns: [/那个|之前|上次|怎样|状态/i],
    maxTime: 200,
    action: 'history'
  },
  level2: {
    patterns: [/配置|服务器|项目|偏好|记得/i],
    maxTime: 1000,
    action: 'memory'
  }
};

function classifyComplexity(message) {
  for (const [level, config] of Object.entries(COMPLEXITY_RULES)) {
    if (config.patterns.some(p => p.test(message))) {
      return { level, ...config };
    }
  }
  return { level: 'level3', maxTime: 5000, action: 'deep' };
}
```

---

## 优化效果

| 级别 | 响应时间 | 适用场景 |
|------|----------|----------|
| L0 | < 50ms | 50% 简单问题 |
| L1 | < 200ms | 20% 上下文问题 |
| L2 | < 1s | 15% 记忆问题 |
| L3 | > 2s | 15% 复杂问题 |

**预期提升：**
- 70% 问题在 200ms 内响应
- 减少不必要的记忆检索
- 用户体验显著提升
