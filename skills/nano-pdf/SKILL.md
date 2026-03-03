# Nano Pdf - PDF 处理

使用自然语言处理 PDF 文件。

## 功能

- PDF 文字提取
- PDF 内容总结
- PDF 问题解答

## 现有替代方案

### 1. 使用 browser 工具

通过浏览器打开 PDF 并读取内容：
```
使用 browser 打开 PDF 文件 URL
```

### 2. 使用 web_fetch

提取网页 PDF 内容：
```
web_fetch 读取 PDF URL
```

### 3. 使用 OCR (图片转文字)

如果 PDF 是扫描件，使用 nf 服务器的 OCR：

```bash
# 在 nf 服务器上安装 tesseract
sudo apt-get install tesseract-ocr tesseract-ocr-chi-sim

# 转换 PDF 为图片
pdftoppm -r 300 input.pdf page

# OCR 识别
tesseract page.png output
```

## 完整 PDF 处理方案

### 安装 nano-pdf (可选)

```bash
npm install -g nano-pdf
```

### 使用

```bash
nano-pdf summarize file.pdf
nano-pdf extract "问题" file.pdf
```

## 推荐工作流

1. **文字PDF**: 使用 `web_fetch` 直接读取
2. **扫描PDF**: 先转换为图片，再 OCR
3. **需要交互**: 使用 `browser` 打开 PDF

## Tushare 配置

如需使用 tushare 获取金融数据，需要：
1. 在 nf 服务器上 `pip install tushare`
2. 配置 TUSHARE_TOKEN
