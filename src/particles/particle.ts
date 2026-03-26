import { Config } from '../config/default'

export class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  age: number
  maxAge: number
  seed: number

  constructor(
    x: number,
    y: number,
    config: Config,
    seed: number = Math.random() * 10000
  ) {
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * 2
    this.vy = (Math.random() - 0.5) * 2
    this.size = Math.random() * 2 + 1 // 1px - 3px
    this.opacity = Math.random() * 0.4 + 0.6 // 0.6 - 1
    this.color = this.interpolateColor(
      config.colorPrimary,
      config.colorHighlight,
      Math.random()
    )
    this.age = 0
    this.maxAge = Math.random() * 1 + 1.5 // 1.5s - 2.5s
    this.seed = seed
  }

  update(deltaTime: number) {
    this.age += deltaTime
    this.x += this.vx
    this.y += this.vy
  }

  isAlive(): boolean {
    return this.age < this.maxAge
  }

  private interpolateColor(color1: string, color2: string, factor: number): string {
    const parseColor = (color: string) => {
      const hex = color.replace('#', '')
      return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      }
    }

    const c1 = parseColor(color1)
    const c2 = parseColor(color2)

    const r = Math.round(c1.r + (c2.r - c1.r) * factor)
    const g = Math.round(c1.g + (c2.g - c1.g) * factor)
    const b = Math.round(c1.b + (c2.b - c1.b) * factor)

    return `rgb(${r}, ${g}, ${b})`
  }
}
