#!/bin/bash
kill -9 1581055 2>/dev/null
sleep 2
openclaw gateway --bind lan &
sleep 6
ss -tlnp | grep 18789
