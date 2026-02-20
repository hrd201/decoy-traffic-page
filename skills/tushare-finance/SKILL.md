# Tushare Finance - 中国金融数据

获取中国金融市场数据（A 股、港股、美股、基金、期货、债券）。

## 功能

- A 股行情数据
- 港股/美股数据
- 基金净值
- 期货/债券行情
- 财务报表
- 宏观经济指标 (GDP/CPI)

## 前置要求

1. 注册 Tushare Pro账号：https://tushare.pro
2. 获取 API Token
3. 安装 tushare: `pip install tushare`

## 使用方法

### 获取股票数据

```bash
# 安装
pip install tushare

# 使用
python3 -c "
import tushare as ts
pro = ts.pro_api('YOUR_TOKEN')
df = pro.daily(ts_code='000001.SZ')
print(df)
"
```

### 在 OpenClaw 中使用

通过 exec 调用 nf 服务器上的 Python 脚本：

```bash
ssh openclaw@61.138.213.163 -p 8877 "python3 -c \"import tushare as ts; ...\""
```

## 常用接口

| 接口 | 说明 |
|------|------|
| daily | 每日行情 |
| stock_basic | 股票基本信息 |
| income | 利润表 |
| balance_sheet | 资产负债表 |
| cashflow | 现金流量表 |
| macro_cn_gdp | GDP 数据 |
| macro_cn_cpi | CPI 数据 |

## 笔记

- 需要 Tushare Pro token
- 部分接口需要积分权限
- A股数据最全
