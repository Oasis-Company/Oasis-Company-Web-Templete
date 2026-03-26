// Easing函数实现
export const easing = {
  // primary_easing: cubic-bezier(0.22, 1, 0.36, 1)
  primary: (t: number): number => {
    // 简化的三次贝塞尔曲线实现
    // 实际项目中可以使用更精确的实现
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  },

  // ignition_easing: cubic-bezier(0.2, 0.8, 0.2, 1.2)
  ignition: (t: number): number => {
    // 简化的三次贝塞尔曲线实现
    return t < 0.5 ? 4 * t * t * t * 1.2 : 1.2 - Math.pow(-2 * t + 2, 3) / 2
  },

  // 线性插值
  linear: (t: number): number => {
    return t
  },

  // 缓入
  easeIn: (t: number): number => {
    return t * t
  },

  // 缓出
  easeOut: (t: number): number => {
    return 1 - Math.pow(1 - t, 2)
  },

  // 缓入缓出
  easeInOut: (t: number): number => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  }
}
