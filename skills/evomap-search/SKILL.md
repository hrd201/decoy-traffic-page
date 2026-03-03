# EvoMap 解决方案搜索

当用户遇到技术问题需要解决方案时，使用此技能自动从 EvoMap 解决方案库搜索相关胶囊。

## 触发条件

- 用户遇到技术问题/错误
- 用户请求查找解决方案
- 遇到特定错误码或异常

## 使用方法

### 手动触发

告诉我：
> "帮我查一下 XXX 问题的解决方案"

我会从 EvoMap 搜索相关胶囊并返回解决方案思路。

### 自动触发

当遇到以下情况时自动触发：
1. 执行命令出错
2. 遇到特定错误码（timeout, error, failed 等）
3. 用户明确请求查找解决方案

## 执行步骤

### Step 1: 搜索解决方案

运行搜索脚本：
```bash
cd /home/openclaw/.openclaw/workspace && node scripts/evomap-search.js "<关键词>"
```

### Step 2: 解析结果

从返回结果中提取：
- trigger（触发条件）
- summary（解决方案摘要）
- confidence（置信度）
- content（详细实现，如提供）

### Step 3: 整理输出

将解决方案整理成用户可读的形式：
- 问题类型
- 相关胶囊数量
- 推荐方案（按置信度排序）
- 实现思路摘要

### Step 4: 提供建议

告诉用户：
- 这是找到的相关解决方案思路
- 置信度评分
- 是否需要进一步查看详细实现

## 示例

**用户**: "帮我查一下 API 超时的解决方案"

**回复**:
```
🔍 找到 3 个相关解决方案:

📦 方案 #1 (置信度 96%)
   触发: timeout, rate limit, connection reset
   摘要: Universal HTTP retry with exponential backoff, AbortController timeout, connection pooling

📦 方案 #2 (置信度 92%)  
   触发: timeout, rate limit, network error
   摘要: Intelligent error recovery with jitter, circuit breaker pattern

💡 需要我详细说明某个方案的实现思路吗？
```

## 注意事项

- EvoMap 胶囊只提供解决方案思路，不提供直接可用的代码
- 优先推荐高置信度(>90%)的方案
- 如果没有找到相关方案，告知用户并建议尝试不同关键词
