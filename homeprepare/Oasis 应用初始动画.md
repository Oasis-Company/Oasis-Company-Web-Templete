🟠 Oasis Animation Spec v1
「Ember Birth / 粒子聚合启动动画」
一、目标定义（必须统一认知）

动画类型： App 启动 / 冷启动
设计目标：

传达：被唤醒 / 被生成
避免：loading / spinner 感
风格：温暖科技（Warm Tech）
二、全局参数（所有 App 必须一致）
duration_total: 1.6s
fps_target: 60fps

background_color: "#0B0B0D"

color_primary: "#FF6A00"
color_highlight: "#FFD166"
color_secondary: "#FFB347"

particle_count: 40 - 80
particle_size: 1px - 3px
particle_blur: 2px - 6px

motion_style: organic
symmetry: low
randomness: medium
三、时间轴（核心执行逻辑）
⏱ Timeline Breakdown
Phase 1 — Idle Seed
time: 0.0s - 0.3s

state:
  particles: hidden (opacity 0)
  center_noise: very subtle

animation:
  opacity: 0 → 0.1 (noise only)

👉 实现要求：

不允许完全静止（必须有微弱噪声/抖动）
Phase 2 — Ignition（点燃）
time: 0.3s - 0.7s

center_particle:
  scale: 0.2 → 1.2 → 0.9
  opacity: 0 → 1
  jitter: small random

spawn_particles:
  count: 5 - 10
  radius: 10px - 30px

👉 easing：

cubic-bezier(0.2, 0.8, 0.2, 1.2)

👉 关键：

必须有“不稳定感”（不要平滑）
Phase 3 — Attraction Field（聚合）
time: 0.7s - 1.2s

particles:
  spawn_total: up to 80
  start_position: random (screen or radius 150px)

motion:
  path: curved (bezier / noise-based)
  speed: varied (0.5x - 1.5x)

trail:
  enabled: true
  fade_out: 0.3s

👉 行为规则：

每个粒子：
不同步开始
不同速度
不同路径

👉 吸引函数（逻辑层）：

force = direction_to_center * strength * randomness
Phase 4 — Formation（成形）
time: 1.2s - 1.5s

target_shape:
  type: svg_path / logo_points

snap:
  particles → target positions

flash:
  opacity: +20% peak
  duration: 0.08s

👉 要求：

禁止“直接切换”
必须有“吸附 / 收敛”过程
Phase 5 — Stabilization（稳定）
time: 1.5s - 1.8s

particles:
  opacity: 1 → 0

logo:
  opacity: 0 → 1
  scale: 1.05 → 1

ui:
  fade_in: 0.2s

👉 最终状态：

无粒子残留
仅保留 logo / UI
四、动效函数（统一）
Easing（必须使用）
primary_easing: cubic-bezier(0.22, 1, 0.36, 1)
ignition_easing: cubic-bezier(0.2, 0.8, 0.2, 1.2)
随机函数（必须存在）
rand(min, max)
noise(x, y, time)

👉 用途：

粒子路径
jitter
延迟
五、粒子系统规则
Particle Object
particle:
  position: (x, y)
  velocity: (vx, vy)
  size: random(1, 3)
  opacity: random(0.6, 1)
  color: interpolate(primary → highlight)
行为约束
❌ 不允许完全直线运动
❌ 不允许统一速度
❌ 不允许同时启动
✅ 必须有：
延迟差
速度差
轨迹差
六、视觉层级（防止“廉价感”）
layer_1: background (dark)
layer_2: blurred particles (glow)
layer_3: sharp particles
layer_4: logo
layer_5: UI

👉 规则：

至少 2 层粒子（模糊 + 清晰）
七、App 可配置项（给 Trae / 开发）

每个 App 只允许改这些：

app_config:

  shape:
    type: circle | square | custom_svg

  particle_behavior:
    chaos_level: low | medium | high

  attraction_strength:
    value: 0.8 - 1.5

  ignition_style:
    stable | flicker | pulse

  color_variant:
    orange_default | amber | deep_orange
八、性能约束（非常重要）
max_particles: 80
max_duration: 2s

fallback:
  device_low_perf:
    particle_count: 30
    disable_trail: true

👉 必须：

在低性能设备降级
不影响主线程（尽量）
九、验收标准（你用来判断好不好）

满足以下才算通过：

 看起来像“生成”，不是“加载”
 每次启动略微不同（随机性）
 没有机械同步感
 视觉中心明确（不会乱）
 1.5s 内完成
十、一句话接口定义（给开发）
playOasisBoot({
  container,
  logoShape,
  config
})
最后一句（很关键）

这个规范本质不是动画规范，而是：

🟠 “Oasis 应用被实例化的统一仪式”