// 设备性能检测工具
export class PerformanceDetector {
  private static instance: PerformanceDetector
  private performanceLevel: 'high' | 'medium' | 'low' = 'medium'

  private constructor() {
    this.detectPerformance()
  }

  static getInstance(): PerformanceDetector {
    if (!PerformanceDetector.instance) {
      PerformanceDetector.instance = new PerformanceDetector()
    }
    return PerformanceDetector.instance
  }

  private detectPerformance() {
    // 检测设备性能
    // 1. 检测设备内存
    const memory = (navigator as any).deviceMemory || 4
    
    // 2. 检测CPU核心数
    const cpuCores = navigator.hardwareConcurrency || 4
    
    // 3. 检测Canvas性能
    const canvasPerformance = this.detectCanvasPerformance()

    // 根据检测结果确定性能等级
    if (memory >= 8 && cpuCores >= 8 && canvasPerformance >= 60) {
      this.performanceLevel = 'high'
    } else if (memory >= 4 && cpuCores >= 4 && canvasPerformance >= 30) {
      this.performanceLevel = 'medium'
    } else {
      this.performanceLevel = 'low'
    }
  }

  private detectCanvasPerformance(): number {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return 30

      canvas.width = 100
      canvas.height = 100

      const startTime = performance.now()
      const iterations = 1000

      for (let i = 0; i < iterations; i++) {
        ctx.clearRect(0, 0, 100, 100)
        ctx.beginPath()
        ctx.arc(50, 50, 40, 0, Math.PI * 2)
        ctx.fillStyle = '#FF6A00'
        ctx.fill()
      }

      const endTime = performance.now()
      const duration = endTime - startTime
      const fps = Math.round((iterations / duration) * 1000)

      return fps
    } catch (e) {
      return 30
    }
  }

  getPerformanceLevel(): 'high' | 'medium' | 'low' {
    return this.performanceLevel
  }

  shouldDegrade(): boolean {
    return this.performanceLevel === 'low'
  }

  getRecommendedParticleCount(): number {
    switch (this.performanceLevel) {
      case 'high':
        return 80
      case 'medium':
        return 60
      case 'low':
        return 30
    }
  }

  getRecommendedFps(): number {
    switch (this.performanceLevel) {
      case 'high':
        return 60
      case 'medium':
        return 45
      case 'low':
        return 30
    }
  }
}
