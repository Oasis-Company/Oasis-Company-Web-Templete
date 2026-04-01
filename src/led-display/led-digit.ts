import { SEGMENT_MAP } from './types'
import { LedConfig } from './types'

export class LedDigit {
  private element: HTMLElement
  private config: LedConfig
  private segments: HTMLElement[] = []

  constructor(config: LedConfig) {
    this.config = config
    this.element = this.createDigitElement()
  }

  private createDigitElement(): HTMLElement {
    const digit = document.createElement('div')
    digit.className = 'led-digit'
    digit.setAttribute('role', 'img')

    const segmentNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

    segmentNames.forEach((name) => {
      const segment = document.createElement('div')
      segment.className = `led-segment segment-${name}`
      segment.style.backgroundColor = this.config.colorInactive
      this.segments.push(segment)
      digit.appendChild(segment)
    })

    this.applyStyles(digit)

    return digit
  }

  private applyStyles(digit: HTMLElement): void {
    const style = document.createElement('style')
    style.textContent = `
      .led-digit {
        position: relative;
        width: 32px;
        height: 56px;
        display: inline-block;
      }
      .led-segment {
        position: absolute;
        border-radius: 2px;
        transition: background-color 0.1s ease;
      }
      .segment-a {
        top: 0;
        left: 4px;
        width: 24px;
        height: 6px;
      }
      .segment-b {
        top: 6px;
        right: 0;
        width: 6px;
        height: 20px;
      }
      .segment-c {
        top: 30px;
        right: 0;
        width: 6px;
        height: 20px;
      }
      .segment-d {
        bottom: 0;
        left: 4px;
        width: 24px;
        height: 6px;
      }
      .segment-e {
        top: 30px;
        left: 0;
        width: 6px;
        height: 20px;
      }
      .segment-f {
        top: 6px;
        left: 0;
        width: 6px;
        height: 20px;
      }
      .segment-g {
        top: 25px;
        left: 4px;
        width: 24px;
        height: 6px;
      }
    `
    digit.appendChild(style)
  }

  setChar(char: string): void {
    const segments = SEGMENT_MAP[char] || SEGMENT_MAP[' ']

    segments.forEach((active, index) => {
      this.segments[index].style.backgroundColor = active
        ? this.config.colorActive
        : this.config.colorInactive
    })

    this.element.setAttribute('aria-label', char === ' ' ? 'space' : char)
  }

  getElement(): HTMLElement {
    return this.element
  }

  destroy(): void {
    this.element.remove()
  }
}
