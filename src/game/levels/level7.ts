import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level7: LevelConfig = {
  id: 7,
  world: 7,
  levelInWorld: 1,
  name: 'Sky Kingdom',
  theme: 'sky_islands',
  width: 2900,
  height: 600,
  timeLimit: 260,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 2780, y: 370, width: 48, height: 64 },

  platforms: [
    // Starting cloud island
    { x: 0, y: 500, width: 350, height: 80, type: PlatformType.SOLID, color: '#cce8ff' },

    // Cloud stepping stones (no main ground - sky only!)
    { x: 400, y: 440, width: 130, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 60, moveSpeed: 1.5, color: '#99d6ff' },
    { x: 590, y: 380, width: 150, height: 20, type: PlatformType.SOLID, color: '#b3e0ff' },
    { x: 800, y: 430, width: 120, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 90, moveSpeed: 1.5, color: '#66c2ff' },
    { x: 980, y: 350, width: 170, height: 20, type: PlatformType.SOLID, color: '#b3e0ff' },
    { x: 1200, y: 400, width: 110, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 100, moveSpeed: 2, color: '#66c2ff' },
    { x: 1380, y: 310, width: 200, height: 20, type: PlatformType.SOLID, color: '#b3e0ff' },
    { x: 1640, y: 390, width: 120, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 110, moveSpeed: 1.8, color: '#66c2ff' },
    { x: 1820, y: 330, width: 160, height: 20, type: PlatformType.SOLID, color: '#b3e0ff' },
    { x: 2050, y: 420, width: 110, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 80, moveSpeed: 2.2, color: '#66c2ff' },
    { x: 2220, y: 350, width: 180, height: 20, type: PlatformType.SOLID, color: '#b3e0ff' },
    { x: 2460, y: 400, width: 110, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 80, moveSpeed: 2, color: '#66c2ff' },
    // Final island
    { x: 2650, y: 430, width: 300, height: 80, type: PlatformType.SOLID, color: '#cce8ff' },

    // Upper tier platforms
    { x: 620, y: 260, width: 120, height: 20, type: PlatformType.SOLID, color: '#e6f4ff' },
    { x: 1010, y: 240, width: 140, height: 20, type: PlatformType.SOLID, color: '#e6f4ff' },
    { x: 1420, y: 200, width: 150, height: 20, type: PlatformType.SOLID, color: '#e6f4ff' },
    { x: 1860, y: 230, width: 130, height: 20, type: PlatformType.SOLID, color: '#e6f4ff' },
    { x: 2260, y: 250, width: 140, height: 20, type: PlatformType.SOLID, color: '#e6f4ff' },
  ],

  coins: [
    { x: 420, y: 400, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 620, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 660, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 650, y: 220, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1020, y: 310, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1060, y: 200, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1450, y: 270, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 1490, y: 160, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1880, y: 290, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 2270, y: 310, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 2700, y: 390, type: CollectibleType.COIN_GOLD, value: 5 },
  ],

  crystalStar: { x: 1460, y: 140, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 1100, y: 320 },
    { x: 2100, y: 390 },
  ],

  enemies: [
    { x: 640, y: 340, type: EnemyType.FLYING_BAT },
    { x: 850, y: 400, type: EnemyType.FLYING_BAT },
    { x: 1040, y: 320, type: EnemyType.FLYING_BAT },
    { x: 1430, y: 280, type: EnemyType.FLYING_BAT },
    { x: 1680, y: 360, type: EnemyType.FLYING_BAT },
    { x: 1870, y: 300, type: EnemyType.FLYING_BAT },
    { x: 2080, y: 390, type: EnemyType.SLIME, patrolRange: 60 },
    { x: 2270, y: 320, type: EnemyType.FLYING_BAT },
    { x: 2700, y: 400, type: EnemyType.SLIME, patrolRange: 80 },
  ],

  hazards: [
    // Endless void below - water as stand-in
    { x: 350, y: 580, width: 2300, height: 40, type: HazardType.WATER },
  ],

  powerups: [
    { x: 420, y: 400, type: PowerUpType.DOUBLE_JUMP },
    { x: 1470, y: 270, type: PowerUpType.SPEED_BOOST },
    { x: 2270, y: 310, type: PowerUpType.SHIELD },
    { x: 2710, y: 390, type: PowerUpType.HEALTH },
  ],
};
