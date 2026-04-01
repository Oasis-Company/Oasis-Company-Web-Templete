# World Domination Index LED Display Specification

## Overview

The World Domination Index is an LED-style digital counter display that shows the global user registration count for Oasis applications.

## Requirements

### Visual Design
- **Style**: Classic 7-segment LED display
- **Colors**:
  - Active (on): Green
  - Inactive (off): Gray
- **Background**: Dark/Black to match Oasis theme
- **Digits**: 11 digits (supports up to 10 billion)

### Functionality
- Display global registration count (number of users)
- Place in footer of every Oasis website
- Default mock data: `20211102`
- Configurable colors and digit count
- Optional animation effects
- Easy to integrate into any Oasis website

## Architecture

### Component Structure
```
src/
├── led-display/
│   ├── index.ts           # Main export
│   ├── led-digit.ts       # Single LED digit component
│   ├── led-display.ts     # Full LED display component
│   └── types.ts           # Type definitions
└── config/
    └── led-config.ts      # Configuration
```

### API Design

#### `initLedDisplay(config)`

Initializes the LED display in a container element.

**Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `container` | `HTMLElement` | Yes | - | Container element to render the display |
| `value` | `number \| string` | No | `20211102` | Initial number to display |
| `digitCount` | `number` | No | `11` | Number of digits to show |
| `config` | `Partial<LedConfig>` | No | `{}` | Additional configuration |

**LedConfig Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `colorActive` | `string` | `'#00FF00'` | Color of active segments (green) |
| `colorInactive` | `string` | `'#333333'` | Color of inactive segments (gray) |
| `colorBackground` | `string` | `'#0B0B0D'` | Background color |
| `segmentGap` | `number` | `2` | Gap between segments in pixels |
| `digitGap` | `number` | `8` | Gap between digits in pixels |
| `animation` | `boolean` | `false` | Enable digit transition animation |

**Return Value:**
```typescript
{
  setValue: (value: number | string) => void
  getValue: () => string
  destroy: () => void
}
```

### Segment Mapping (7-segment display)

```
 a
f b
 g
e c
 d
```

Each digit is composed of 7 segments: a, b, c, d, e, f, g

## Usage Example

```typescript
import { initLedDisplay } from './src/led-display'

// Initialize in footer
const footer = document.getElementById('footer')
const display = initLedDisplay({
  container: footer,
  value: 20211102,
  digitCount: 11,
  config: {
    colorActive: '#00FF00',
    colorInactive: '#333333',
    animation: true
  }
})

// Later: update the value
display.setValue(20211103)

// Get current value
console.log(display.getValue())

// Clean up
display.destroy()
```

## Implementation Notes

- Use pure CSS + JavaScript (no external libraries)
- Semantic HTML structure
- Accessible (ARIA labels for screen readers)
- Responsive design
- Tested across modern browsers
