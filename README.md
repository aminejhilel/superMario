# 🎮 AMINE JHILEL — Pixel Quest Edition

> **A custom-built 2D side-scrolling platformer**, inspired by Super Mario, powered by Next.js, HTML5 Canvas 2D, and a hand-crafted game engine — all in the browser.

![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178c6?style=for-the-badge&logo=typescript)
![Zustand](https://img.shields.io/badge/Zustand-5.x-orange?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?style=for-the-badge&logo=tailwindcss)

---

## ✨ Features

- 🕹️ **Custom HTML5 Canvas 2D Game Engine** — built entirely from scratch with no third-party game library
- 🌍 **8 Unique Levels** across themed worlds: Grasslands, Desert, Ice Cave, Sky Kingdom, Volcano Inferno, Shadow Realm (with boss fight) and more
- 🎨 **Pixel Art Assets** — procedurally drawn characters, enemies, and environments using the Canvas API
- 🌌 **Parallax Scrolling Backgrounds** — multi-layer depth for each world theme
- ✨ **Particle System** — visual effects for jumps, hits, coin pickups, and explosions
- 🔊 **Web Audio Synthesizer** — generated sound effects and music using the Web Audio API (no audio files needed)
- 📱 **Mobile-Friendly** — on-screen touch controls with virtual D-pad and action buttons
- 💾 **Persistent Save System** — progress, high scores, and stars saved to `localStorage`
- 🏆 **Scoring System** — coins × 50 + enemies × 100 + stars × 500 + time bonus
- 🎭 **Glassmorphic UI** — modern, dark glassmorphism design for all menus and HUD elements

---

## 🕹️ Controls

### Desktop
| Key | Action |
|-----|--------|
| `A` / `D` / `←` `→` | Move left / right |
| `W` / `Space` / `↑` | Jump (double jump supported) |
| `Shift` | Sprint |
| `X` | Energy Blast Attack |
| `Z` | Super Beam Blast *(requires Super Gauge)* |
| `ESC` | Pause game |

### Mobile
Use the on-screen virtual D-pad and action buttons (auto-detected).

---

## ⚡ Power-Ups

| Power-Up | Effect |
|----------|--------|
| 🛡️ **Shield** | Absorbs one hit from enemies or hazards |
| 🧲 **Coin Magnet** | Automatically attracts nearby coins |
| ⚡ **Combo Multiplier** | Multiplies score for consecutive actions |
| 🦘 **Infinite Jump** | Allows unlimited jumps for a short duration |
| ❤️ **Health** | Restores one HP |
| 💨 **Speed Boost** | Temporarily increases movement speed |

---

## 🗺️ Levels

| # | Name | Theme | Enemies |
|---|------|-------|---------|
| 1 | Grasslands | 🌿 Green meadows | Slimes, Bats |
| 2 | Desert Dunes | 🏜️ Sandy terrain | Slimes, Rock Monsters |
| 3 | Ice Cave | 🧊 Frozen platforms | Bats, Rock Monsters |
| 4 | Crystal Mines | 💎 Underground crystals | Mixed |
| 5 | Sky Kingdom | ☁️ Floating islands | Flying Bats |
| 6 | Volcano Inferno | 🌋 Lava pits & moving platforms | Fire Creatures, Rock Monsters |
| 7 | Sky Kingdom (High) | 🌤️ High altitude | Flying Bats, Fire Creatures |
| 8 | Shadow Realm | 🌑 Final boss level | Drako (Boss), all enemy types |

---

## 👾 Enemies

| Enemy | Behavior |
|-------|----------|
| **Slime** | Ground patrol |
| **Flying Bat** | Aerial patrol |
| **Rock Monster** | Heavy ground patrol with wider range |
| **Fire Creature** | Ground patrol, fire-themed |
| **Drako** | Final boss — multi-phase, projectile attacks |

---

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router (layout, page, globals.css)
├── components/             # React UI components
│   ├── MainMenu.tsx        # Animated main menu with hero canvas
│   ├── GameCanvas.tsx      # Canvas mount point
│   ├── GameHUD.tsx         # In-game heads-up display (HP, coins, score, time)
│   ├── LevelSelector.tsx   # World/level selection screen
│   ├── PauseMenu.tsx       # Pause overlay
│   ├── GameOverModal.tsx   # Game over screen
│   ├── LevelCompleteModal.tsx
│   ├── VictoryScreen.tsx   # Final victory after level 8
│   ├── MobileControls.tsx  # Touch controls overlay
│   └── SettingsModal.tsx   # Volume and display settings
├── game/
│   ├── engine/             # Core engine: Types, GameLoop, Physics, Camera
│   ├── entities/           # Game entities: Player, Enemy, Drako, Projectile...
│   ├── graphics/           # PixelArtAssets, ParticleSystem, Background renderers
│   ├── levels/             # Level configs: level1.ts → level8.ts + levelData.ts
│   ├── objects/            # Game objects: Platform, Collectible, Hazard, PowerUp, Checkpoint
│   └── systems/            # AudioManager, SaveManager
└── store/
    └── useGameStore.ts     # Zustand global state (score, HP, coins, level, save data)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 18`
- npm

### Install & Run

```bash
# Clone the repository
git clone https://github.com/aminejhilel/superMario.git
cd superMario

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🧰 Tech Stack

| Technology | Role |
|------------|------|
| **Next.js 16** | App framework & routing |
| **React 19** | UI component layer |
| **TypeScript 7** | Type-safe game logic |
| **HTML5 Canvas 2D** | Game rendering engine |
| **Zustand 5** | Global state management |
| **Web Audio API** | Synthesized SFX & music |
| **Tailwind CSS 4** | UI styling & glassmorphism |
| **canvas-confetti** | Victory celebration effects |
| **lucide-react** | Icon library |

---

## 💾 Save System

Progress is automatically saved to `localStorage` after each completed level:
- ✅ Unlocked worlds
- ⭐ Stars earned per level (max 3)
- 🏆 High score per level
- 💰 Total coins collected

---

## 📜 License

ISC © [Amine Jhilel](https://github.com/aminejhilel)

---

<img width="1917" height="893" alt="image" src="https://github.com/user-attachments/assets/f65890db-94d4-4a41-8bf3-539eeaaff5c3" />


<div align="center">
  <strong>CREATED BY AMINE JHILEL • CANVAS 2D ENGINE • PIXEL QUEST EDITION</strong>
</div>
