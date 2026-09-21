import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level8: LevelConfig = {
  id: 8,
  world: 8,
  levelInWorld: 1,
  name: 'Shadow Realm',
  theme: 'drako_castle',
  width: 2600,
  height: 600,
  timeLimit: 360,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 2480, y: 380, width: 48, height: 64 },

  platforms: [
    // Dark entrance corridor
    { x: 0, y: 500, width: 500, height: 100, type: PlatformType.SOLID, color: '#0a0010' },

    // Shadow stepping platforms
    { x: 580, y: 440, width: 130, height: 22, type: PlatformType.SOLID, color: '#1a0030' },
    { x: 780, y: 380, width: 150, height: 22, type: PlatformType.SOLID, color: '#1a0030' },
    { x: 1000, y: 420, width: 110, height: 22, type: PlatformType.MOVING_HORIZ, moveDistance: 90, moveSpeed: 2, color: '#7b00ff' },
    { x: 1200, y: 340, width: 180, height: 22, type: PlatformType.SOLID, color: '#1a0030' },
    { x: 1450, y: 400, width: 120, height: 22, type: PlatformType.MOVING_VERT, moveDistance: 120, moveSpeed: 2, color: '#7b00ff' },
    { x: 1650, y: 320, width: 200, height: 22, type: PlatformType.SOLID, color: '#1a0030' },
    { x: 1920, y: 380, width: 110, height: 22, type: PlatformType.MOVING_HORIZ, moveDistance: 70, moveSpeed: 2.5, color: '#7b00ff' },
    { x: 2100, y: 310, width: 180, height: 22, type: PlatformType.SOLID, color: '#1a0030' },
    // Pre-boss platform
    { x: 2350, y: 460, width: 250, height: 22, type: PlatformType.SOLID, color: '#1a0030' },

    // FINAL BOSS ARENA
    { x: 2000, y: 500, width: 600, height: 100, type: PlatformType.SOLID, color: '#050020' },
    // Arena elevated platforms
    { x: 2100, y: 380, width: 120, height: 18, type: PlatformType.SOLID, color: '#2d0050' },
    { x: 2320, y: 350, width: 120, height: 18, type: PlatformType.SOLID, color: '#2d0050' },

    // Upper secret area
    { x: 800, y: 240, width: 140, height: 20, type: PlatformType.SOLID, color: '#2d0050' },
    { x: 1230, y: 200, width: 160, height: 20, type: PlatformType.SOLID, color: '#2d0050' },
    { x: 1680, y: 200, width: 150, height: 20, type: PlatformType.SOLID, color: '#2d0050' },
  ],

  coins: [
    { x: 610, y: 400, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 810, y: 340, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 840, y: 200, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1240, y: 300, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1280, y: 160, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1680, y: 280, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1720, y: 160, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 2130, y: 340, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 2350, y: 310, type: CollectibleType.COIN_CRYSTAL, value: 10 },
  ],

  crystalStar: { x: 1260, y: 120, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 1300, y: 310 },
    { x: 2050, y: 464 },
  ],

  enemies: [
    { x: 280, y: 464, type: EnemyType.ROCK_MONSTER, patrolRange: 120 },
    { x: 620, y: 410, type: EnemyType.FIRE_CREATURE },
    { x: 820, y: 350, type: EnemyType.FLYING_BAT },
    { x: 1100, y: 390, type: EnemyType.ROCK_MONSTER, patrolRange: 80 },
    { x: 1270, y: 310, type: EnemyType.FIRE_CREATURE },
    { x: 1480, y: 370, type: EnemyType.FLYING_BAT },
    { x: 1700, y: 290, type: EnemyType.ROCK_MONSTER, patrolRange: 100 },
    { x: 1940, y: 350, type: EnemyType.FIRE_CREATURE },
    { x: 2120, y: 280, type: EnemyType.FLYING_BAT },
  ],

  hazards: [
    { x: 500, y: 560, width: 80, height: 40, type: HazardType.SPIKES },
    { x: 1380, y: 560, width: 70, height: 40, type: HazardType.SPIKES },
    { x: 1820, y: 560, width: 80, height: 40, type: HazardType.SPIKES },
    { x: 2280, y: 560, width: 70, height: 40, type: HazardType.SPIKES },
  ],

  powerups: [
    { x: 620, y: 400, type: PowerUpType.DOUBLE_JUMP },
    { x: 1290, y: 160, type: PowerUpType.SHIELD },
    { x: 2050, y: 460, type: PowerUpType.HEALTH },
    { x: 2360, y: 310, type: PowerUpType.SPEED_BOOST },
  ],

  boss: {
    x: 2430,
    y: 420,
    hp: 30,
    name: 'Void Emperor',
  },
};
