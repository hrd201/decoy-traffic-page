# gradual-response

> 根据问题复杂程度渐进式处理：简单问题快答，复杂问题深究

## 功能

- **L0 (<50ms)**: 问候、感谢直接回复
- **L1 (<200ms)**: 需要上下文的查最近对话
- **L2 (<1s)**: 需要记忆的搜索长期记忆
- **L3 (>2s)**: 复杂问题深度处理

## 触发

自动应用于所有消息

## 使用

```javascript
const { handleMessage } = require('./gradual-response.js');
```
