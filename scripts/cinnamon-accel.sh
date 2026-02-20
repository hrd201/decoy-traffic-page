# Cinnamon 硬件加速优化

# 启用 GLX
export LIBGL_ALWAYS_INDIRECT=1

# 启用硬件加速
export MUFFIN_NO_SHADOWS=1
export CLUTTER_BACKEND=glx

# RDP 优化
export XRDP_SOCKET=/tmp/.rdp_lock
