# Oasis Web Template

Oasis Web Template is a unified motion and initialization system for all Oasis applications.

It defines how an application is "born" on screen.

---

## ✨ Core Concept

Every Oasis app must start with a **Boot Sequence**.

This is not a loading screen.

It is a **visual instantiation process**.

---

## 🧩 Motion Primitives

All animations are built from:

- Attraction Field (particles converge)
- Noise Field (random drift)
- Formation (shape stabilization)

---

## 🎬 Animation Variants

| Name | Description |
|------|------------|
| Ember Birth | deterministic generation |
| Dreambase | unstable emergence |

---

## ⚙️ How to Use

### Installation

```bash
# Install dependencies
npm install
```

### Basic Usage

```typescript
import { playOasisBoot } from './src/core/boot'

// Call the function with your configuration
playOasisBoot({
  container: document.getElementById('app'),
  logoShape: 'circle', // Options: 'circle', 'square', 'custom_svg'
  config: {
    particleBehavior: {
      chaosLevel: 'medium' // Options: 'low', 'medium', 'high'
    },
    attractionStrength: 1.0,
    ignitionStyle: 'flicker', // Options: 'stable', 'flicker', 'pulse'
    colorVariant: 'orange_default' // Options: 'orange_default', 'amber', 'deep_orange'
  }
})
```

### Using Dreambase Variant

```typescript
import { playOasisBoot } from './src/core/boot'
import { dreambaseConfig } from './src/config/dreambase'

// Call the function with dreambase configuration
playOasisBoot({
  container: document.getElementById('app'),
  logoShape: 'square',
  config: dreambaseConfig
})
```

---

## 🎛 API

### `playOasisBoot(config)`

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `container` | `HTMLElement` | The DOM element where the animation will be rendered | Yes |
| `logoShape` | `'circle' \| 'square' \| 'custom_svg'` | The shape that particles will form | Yes |
| `config` | `Partial<Config>` | Configuration options for the animation | No |

#### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `durationTotal` | `number` | 1.6 | Total animation duration in seconds |
| `fpsTarget` | `number` | 60 | Target frames per second |
| `particleCount` | `number` | 60 | Number of particles |
| `particleSize` | `number` | 2 | Average particle size in pixels |
| `particleBlur` | `number` | 4 | Particle blur radius in pixels |
| `particleBehavior.chaosLevel` | `'low' \| 'medium' \| 'high'` | 'medium' | Level of chaos in particle movement |
| `attractionStrength` | `number` | 1.0 | Strength of particle attraction to center |
| `ignitionStyle` | `'stable' \| 'flicker' \| 'pulse'` | 'flicker' | Style of the ignition phase |
| `colorVariant` | `'orange_default' \| 'amber' \| 'deep_orange'` | 'orange_default' | Color scheme for particles |
| `colorPrimary` | `string` | '#FF6A00' | Primary particle color |
| `colorHighlight` | `string` | '#FFD166' | Highlight particle color |
| `colorSecondary` | `string` | '#FFB347' | Secondary particle color |

#### Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `particleSystem` | `ParticleSystem` | The particle system instance |
| `timeline` | `AnimationTimeline` | The animation timeline instance |
| `stop` | `() => void` | Function to stop the animation |

---

## 📁 Project Structure

```
Oasis-Company-Web-Template/
 │ 
 ├── README.md                ← Core documentation
 │ 
 ├── specs/                   ← All specifications
 │   ├── animation-core.md
 │   ├── ember-birth.md
 │   ├── dreambase-variant.md
 │ 
 ├── primitives/              ← Animation primitives
 │   ├── attraction-field.md
 │   ├── noise-field.md
 │ 
 ├── configs/                 ← App configurations
 │   ├── default.json
 │   ├── dreambase.json
 │ 
 ├── examples/                ← Usage examples
 │   ├── basic-app/           ← Basic usage example
 │   ├── dreambase-app/       ← Dreambase variant example
 │ 
 ├── assets/                  ← Logo / SVG / Particle textures
 │
 ├── src/                     ← Source code
 │   ├── core/                ← Core animation system
 │   │   ├── boot.ts          ← Main boot function
 │   │   └── timeline.ts      ← Animation timeline
 │   ├── particles/           ← Particle system
 │   │   ├── particle.ts      ← Particle class
 │   │   └── particle-system.ts ← Particle system manager
 │   ├── config/              ← Configuration
 │   │   ├── default.ts       ← Default configuration
 │   │   └── dreambase.ts     ← Dreambase configuration
 │   ├── utils/               ← Utility functions
 │   │   ├── easing.ts        ← Easing functions
 │   │   └── performance.ts   ← Performance detection
 │   └── main.ts              ← Main entry point
 │
 ├── index.html               ← Demo HTML file
 ├── package.json             ← Project configuration
 ├── tsconfig.json            ← TypeScript configuration
 └── vite.config.ts           ← Vite configuration
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Oasis-Company/Oasis-Company-Web-Templete.git
cd Oasis-Company-Web-Templete
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🧠 Philosophy

Oasis apps are not opened.

They are instantiated.

The boot sequence is a ritual that celebrates the birth of the application, creating a memorable first impression for users.

---

## 📝 License

ISC


