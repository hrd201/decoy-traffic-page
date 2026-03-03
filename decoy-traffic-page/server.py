#!/usr/bin/env python3
"""
伪装流量计数器后端
支持：
1. 网页显示实时计数
2. API 调用增加计数
"""

import json
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import random
from datetime import datetime

DATA_FILE = '/tmp/decoy_stats.json'

def load_stats():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return {
        'today': random.randint(15000, 25000),
        'total': random.randint(1500000, 2500000),
        'pv': random.randint(80000, 150000),
        'ip': random.randint(25000, 45000),
        'online': random.randint(30, 80),
        'last_updated': datetime.now().isoformat()
    }

def save_stats(stats):
    stats['last_updated'] = datetime.now().isoformat()
    with open(DATA_FILE, 'w') as f:
        json.dump(stats, f)

HTML_TEMPLATE = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人主页 - 站点统计</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
        .container {
            text-align: center;
            padding: 40px;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            max-width: 600px;
            width: 90%;
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #00d4ff, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .subtitle { color: #888; margin-bottom: 40px; font-size: 1.1em; }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: rgba(255,255,255,0.05);
            padding: 25px;
            border-radius: 15px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #00d4ff;
            font-family: 'Courier New', monospace;
        }
        .stat-label { color: #888; margin-top: 5px; font-size: 0.9em; }
        .online-users {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            padding: 15px 30px;
            background: rgba(0,255,0,0.1);
            border-radius: 50px;
            border: 1px solid rgba(0,255,0,0.3);
        }
        .pulse {
            width: 10px;
            height: 10px;
            background: #00ff00;
            border-radius: 50%;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }
        .activity-bar {
            width: 100%;
            height: 4px;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            overflow: hidden;
            margin-top: 20px;
        }
        .activity-fill {
            height: 100%;
            background: linear-gradient(90deg, #00d4ff, #7c3aed);
            width: 0%;
            animation: fill 2s ease-in-out infinite;
        }
        @keyframes fill {
            0% { width: 20%; }
            50% { width: 80%; }
            100% { width: 20%; }
        }
        .counter-tag {
            display: inline-block;
            background: rgba(124, 58, 237, 0.3);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8em;
            margin-top: 10px;
        }
        .footer { color: #555; font-size: 0.8em; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 站点统计</h1>
        <p class="subtitle">实时流量监控面板</p>
        <div class="online-users">
            <div class="pulse"></div>
            <span id="online">正在连接...</span>
        </div>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number" id="today">0</div>
                <div class="stat-label">今日访问量</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="total">0</div>
                <div class="stat-label">总访问量</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="pv">0</div>
                <div class="stat-label">页面浏览</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="ip">0</div>
                <div class="stat-label">独立IP</div>
            </div>
        </div>
        <div class="activity-bar">
            <div class="activity-fill"></div>
        </div>
        <div class="counter-tag">🔄 实时更新中</div>
        <div class="footer">
            <p>服务器运行时间: <span id="uptime">计算中...</span></p>
            <p>最后更新: <span id="lastUpdate">--</span></p>
        </div>
    </div>
    <script>
        async function loadStats() {
            try {
                const res = await fetch('/api/stats');
                const stats = await res.json();
                document.getElementById('today').textContent = formatNumber(stats.today);
                document.getElementById('total').textContent = formatNumber(stats.total);
                document.getElementById('pv').textContent = formatNumber(stats.pv);
                document.getElementById('ip').textContent = formatNumber(stats.ip);
                document.getElementById('online').textContent = '🟢 ' + stats.online + ' 人正在访问';
                document.getElementById('lastUpdate').textContent = stats.last_updated;
            } catch(e) { console.error(e); }
        }
        
        function formatNumber(num) {
            if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
            return num.toString();
        }
        
        setInterval(loadStats, 3000);
        loadStats();
        
        const startTime = Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000);
        setInterval(() => {
            const diff = Date.now() - startTime;
            const days = Math.floor(diff / (24 * 60 * 60 * 1000));
            const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            document.getElementById('uptime').textContent = days + '天 ' + hours + '小时';
        }, 1000);
    </script>
</body>
</html>'''

class DecoyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/stats':
            stats = load_stats()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(stats).encode())
        elif self.path == '/api/ping':
            # 代理访问时调用此接口增加计数
            stats = load_stats()
            inc = random.randint(1, 3)
            stats['today'] += inc
            stats['total'] += inc
            stats['pv'] += random.randint(1, 2)
            stats['online'] = max(10, stats['online'] + random.randint(-2, 5))
            save_stats(stats)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'ok': True, 'added': inc}).encode())
        else:
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(HTML_TEMPLATE.encode('utf-8'))
    
    def log_message(self, format, *args):
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {args[0]}")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    server = HTTPServer(('0.0.0.0', port), DecoyHandler)
    print(f"🚀 伪装流量服务启动: http://0.0.0.0:{port}")
    print(f"📊 统计API: http://0.0.0.0:{port}/api/stats")
    print(f"📡 代理触发: http://0.0.0.0:{port}/api/ping")
    server.serve_forever()
