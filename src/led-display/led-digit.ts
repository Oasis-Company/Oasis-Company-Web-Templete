import { getDotMatrix } from './types'
import { LedConfig } from './types'

export class LedDigit {
  private element: HTMLElement
  private config: LedConfig
  private dots: HTMLElement[][] = []

  constructor(config: LedConfig) {
    this.config = config
    this.element = this.createDigitElement()
  }

  private createDigitElement(): HTMLElement {
    const digit = document.createElement('div')
    digit.className = 'led-digit'
    digit.setAttribute('role', 'img')
    digit.style.display = 'flex'
    digit.style.flexDirection = 'column'
    digit.style.gap = this.config.dotGap + 'px'
    digit.style.padding = '4px'

    for (let row = 0; row < 7; row++) {
      const rowEl = document.createElement('div')
      rowEl.className = 'led-row'
      rowEl.style.display = 'flex'
      rowEl.style.gap = this.config.dotGap + 'px'

      const rowDots: HTMLElement[] = []
      for (let col = 0; col < 5; col++) {
        const dot = document.createElement('div')
        dot.className = 'led-dot'
        dot.style.width = this.config.dotSize + 'px'
        dot.style.height = this.config.dotSize + 'px'
        dot.style.borderRadius = '4px'
        dot.style.backgroundColor = this.config.colorInactive
        dot.style.transition = 'background-color 0.15s ease, box-shadow 0.15s ease'
        rowDots.push(dot)
        rowEl.appendChild(dot)
      }
      this.dots.push(rowDots)
      digit.appendChild(rowEl)
    }

    return digit
  }

  setChar(char: string): void {
    const matrix = getDotMatrix(char)

    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        const active = matrix[row][col]
        const dot = this.dots[row][col]
        if (active) {
          dot.style.backgroundColor = this.config.colorActive
          dot.style.boxShadow = '0 0 12px ' + this.config.colorActive + ', 0 0 24px ' + this.config.colorActive + '66, inset 0 0 6px ' + this.config.colorActive + '44'
        } else {
          dot.style.backgroundColor = this.config.colorInactive
          dot.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.5)'
        }
      }
    }

    this.element.setAttribute('aria-label', char === ' ' ? 'space' : char)
  }

  getElement(): HTMLElement {
    return this.element
  }

  destroy(): void {
    this.element.remove()
  }
}
