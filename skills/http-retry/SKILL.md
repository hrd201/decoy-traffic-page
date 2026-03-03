# http-retry

> HTTP 请求失败自动重试，使用指数退避算法

## 功能

- 网络不稳定时自动重试
- 指数退避：1s → 2s → 4s
- 可配置重试次数和超时

## 安装

```bash
npm install axios retry-requests
# 或
pip install requests urllib3
```

## 使用

### Python

```python
import requests
import time
import random

def http_retry(url, max_retries=3, timeout=5):
    """HTTP 请求带指数退避重试"""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            if attempt == max_retries - 1:
                raise e
            # 指数退避 + 随机 jitter
            wait = (2 ** attempt) + random.uniform(0, 1)
            print(f"重试 {attempt+1}/{max_retries}, 等待 {wait:.1f}s...")
            time.sleep(wait)

# 使用
response = http_retry("https://api.example.com/data")
print(response.json())
```

### Node.js

```javascript
const axios = require('axios');

async function httpRetry(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      const wait = Math.pow(2, attempt) + Math.random();
      console.log(`重试 ${attempt+1}/${maxRetries}, 等待 ${wait.toFixed(1)}s...`);
      await new Promise(r => setTimeout(r, wait * 1000));
    }
  }
}

// 使用
const response = await httpRetry('https://api.example.com/data');
console.log(response.data);
```

## 配置参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| max_retries | 3 | 最大重试次数 |
| timeout | 5 | 请求超时(秒) |
| base_delay | 1 | 基础延迟(秒) |
| max_delay | 30 | 最大延迟(秒) |

## 适用场景

- 网络不稳定
- API 限流 (429)
- 临时超时
- 微服务调用

## 注意事项

1. **幂等请求**：只对 GET/HEAD 等幂等请求使用重试
2. **超时设置**：避免无限等待
3. **日志记录**：记录重试便于排查问题
