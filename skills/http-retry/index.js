/**
 * HTTP Retry - 指数退避重试
 * 
 * @param {string} url - 请求 URL
 * @param {object} options - 配置选项
 * @param {number} options.maxRetries - 最大重试次数 (默认 3)
 * @param {number} options.timeout - 超时时间 (默认 5000ms)
 * @param {number} options.baseDelay - 基础延迟 (默认)
 * @returns 1000ms {Promise} axios response
 */
async function httpRetry(url, options = {}) {
  const {
    maxRetries = 3,
    timeout = 5000,
    baseDelay = 1000
  } = options;

  const axios = require('axios');
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(url, { timeout });
      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      
      // 指数退避 + 随机 jitter
      const delay = Math.pow(2, attempt) * baseDelay + Math.random() * baseDelay;
      console.log(`[HTTP Retry] ${attempt + 1}/${maxRetries} 失败, ${(delay/1000).toFixed(1)}s 后重试...`);
      
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

/**
 * Python 版本 (返回代码字符串)
 */
const pythonCode = `
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
            wait = (2 ** attempt) + random.uniform(0, 1)
            print(f"重试 {attempt+1}/{max_retries}, 等待 {wait:.1f}s...")
            time.sleep(wait)
`;

module.exports = {
  httpRetry,
  pythonCode
};
