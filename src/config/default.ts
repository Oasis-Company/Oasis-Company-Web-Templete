export const defaultConfig = {
  // 全局参数
  durationTotal: 1.6,
  fpsTarget: 60,
  backgroundColor: "#0B0B0D",
  colorPrimary: "#FF6A00",
  colorHighlight: "#FFD166",
  colorSecondary: "#FFB347",
  particleCount: 60,
  particleSize: 2,
  particleBlur: 4,
  motionStyle: "organic",
  symmetry: "low",
  randomness: "medium",

  // 粒子行为
  particleBehavior: {
    chaosLevel: "medium" as const
  },

  // 吸引力强度
  attractionStrength: 1.0,

  // 点火风格
  ignitionStyle: "flicker" as const,

  // 颜色变体
  colorVariant: "orange_default" as const
}

export type Config = typeof defaultConfig
