# Recovery Playbook

## 高频 fetch failed 处理
1. 先确认是否出现“连续无回复/复杂任务无输出”。
2. 若是，优先执行官方重置：
   ```bash
   curl -fsSL https://openclaw.ai/install.sh | bash
   ```
3. 重置后执行验证：
   - 短消息测试
   - 复杂消息测试
4. 若恢复，进入“最小改动策略”（一次一改，逐项验证）。
