import { defaultConfig } from './default'

export const dreambaseConfig = {
  ...defaultConfig,
  // 全局参数
  particleCount: 80,
  particleSize: 1.5,
  particleBlur: 6,
  randomness: "high",

  // 粒子行为
  particleBehavior: {
    chaosLevel: "high" as const
  },

  // 吸引力强度
  attractionStrength: 0.8,

  // 点火风格
  ignitionStyle: "pulse" as const,

  // 颜色变体
  colorVariant: "amber" as const,
  colorPrimary: "#FFB347",
  colorHighlight: "#FFD700",
  colorSecondary: "#FFA07A"
}
