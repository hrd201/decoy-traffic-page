#!/usr/bin/env python3
"""Edge TTS + Whisper STT 工具"""
import argparse
import asyncio
import os
import sys

async def tts(text: str, voice: str = "zh-CN-XiaoxiaoNeural", output: str = None):
    """文字转语音"""
    import edge_tts
    if not output:
        output = "/tmp/tts_output.mp3"
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output)
    return output

def stt(audio_path: str, model_size: str = "base"):
    """语音转文字"""
    from faster_whisper import WhisperModel
    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    segments, info = model.transcribe(audio_path, language="zh")
    results = [seg.text for seg in segments]
    return "".join(results)

def main():
    parser = argparse.ArgumentParser(description="Edge TTS + Whisper STT")
    parser.add_argument("--mode", choices=["tts", "stt"], required=True)
    parser.add_argument("--text", help="TTS: 输入文本")
    parser.add_argument("--voice", default="zh-CN-XiaoxiaoNeural", help="TTS: 语音选择")
    parser.add_argument("--output", help="TTS: 输出文件路径")
    parser.add_argument("--audio", help="STT: 输入音频文件")
    parser.add_argument("--model", default="base", help="STT: Whisper模型 (tiny/base/small)")
    args = parser.parse_args()
    
    if args.mode == "tts":
        if not args.text:
            print("Error: --text required for TTS", file=sys.stderr)
            sys.exit(1)
        output = asyncio.run(tts(args.text, args.voice, args.output))
        print(f"OK: {output}")
    elif args.mode == "stt":
        if not args.audio:
            print("Error: --audio required for STT", file=sys.stderr)
            sys.exit(1)
        text = stt(args.audio, args.model)
        print(text)

if __name__ == "__main__":
    main()
