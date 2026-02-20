# Voice Skill - 语音服务 (TTS + STT)

基于微软 Edge TTS 和 Faster Whisper 的语音服务，用于文字转语音和语音转文字。

## 功能

| 功能 | 描述 | 命令 |
|------|------|------|
| **TTS** | 文字转语音 (Text-to-Speech) | `tts_edge.py --mode tts --text "内容" --voice zh-CN-XiaoxiaoNeural` |
| **STT** | 语音转文字 (Speech-to-Text) | `tts_edge.py --mode stt --audio /path/to/audio.ogg` |

## 环境要求

- Python 3.11+
- nf 服务器 (61.138.213.163, SSH 端口 8877)

## 安装步骤

### 1. 安装依赖

```bash
pip3 install --break-system-packages edge-tts faster-whisper
```

### 2. 部署脚本

将 `scripts/tts_edge.py` 部署到 nf 服务器：
```bash
scp scripts/tts_edge.py openclaw@61.138.213.163:/home/openclaw/.openclaw/workspace/scripts/
```

### 3. 常用语音 (Edge TTS)

| 语音 | 语言 | 风格 |
|------|------|------|
| zh-CN-XiaoxiaoNeural | 中文女声 | 新闻、朗读 |
| zh-CN-YunxiNeural | 中文男声 | 活泼、阳光 |
| zh-CN-YunyangNeural | 中文男声 | 专业、可靠 |
| zh-CN-YunjianNeural | 中文男声 | 运动、激情 |

更多语音：`edge-tts --list-voices | grep -i 'zh-'`

### 4. Whisper 模型

| 模型 | 大小 | 速度 |
|------|------|------|
| tiny | ~75MB | 最快 |
| base | ~150MB | 快 |
| small | ~500MB | 中等 |

## 使用方法

### TTS (文字转语音)

```bash
python3 tts_edge.py --mode tts \
  --text "你好，我是AI助手" \
  --voice zh-CN-YunxiNeural \
  --output /tmp/output.mp3
```

参数：
- `--text`: 要转换的文字（必填）
- `--voice`: 语音选择，默认 `zh-CN-YunxiNeural`
- `--output`: 输出文件路径，默认 `/tmp/tts_output.mp3`

### STT (语音转文字)

```bash
python3 tts_edge.py --mode stt \
  --audio /path/to/voice.ogg \
  --model base
```

参数：
- `--audio`: 音频文件路径（必填，支持 mp3/ogg/wav）
- `--model`: Whisper 模型，默认 `base`

## 集成到 OpenClaw

### TTS 工具

在 nf 服务器上运行 TTS 后，通过 SCP 下载到本地：

```bash
# nf 服务器生成语音
ssh openclaw@61.138.213.163 -p 8877 \
  "python3 ~/.openclaw/workspace/scripts/tts_edge.py --mode tts --text '$TEXT' --output /tmp/reply.mp3"

# 下载到本地
scp openclaw@61.138.213.163:/tmp/reply.mp3 /tmp/reply.mp3

# 发送语音
message --action send --media /tmp/reply.mp3
```

### STT 工具

用户发送语音时，OpenClaw 会自动处理（通过 webhook 或 media 处理）。

## 文件位置

- 脚本：`/home/openclaw/.openclaw/workspace/scripts/tts_edge.py`
- 临时输出：`/tmp/tts_output.mp3`

## 注意事项

1. Edge TTS 需要网络连接（调用微软 API）
2. Whisper 首次加载模型较慢（约 10-30 秒），后续使用会缓存
3. 推荐使用 `base` 模型，兼顾速度和准确率
