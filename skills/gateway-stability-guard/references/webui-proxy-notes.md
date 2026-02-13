# WebUI Proxy Notes

For Nginx reverse proxy to OpenClaw:
- keep `proxy_http_version 1.1`
- keep websocket upgrade headers
- set long `proxy_read_timeout` / `proxy_send_timeout`
- disable `proxy_buffering`
- optional: disable `proxy_request_buffering` for smoother streaming

After changes:
- `nginx -t`
- `nginx -s reload`
- run a two-step message test: "处理中" then "最终结果"