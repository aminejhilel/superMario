import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level3: LevelConfig = {
  id: 3,
  world: 3,
  levelInWorld: 1,
  name: 'Sky Islands',
  theme: 'sky_islands',
  width: 2600,
  height: 600,
  timeLimit: 210,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 2480, y: 390, width: 48, height: 64 },

  platforms: [
    { x: 0, y: 500, width: 400, height: 100, type: PlatformType.SOLID, color: '#e0f7fa' },
    { x: 480, y: 440, width: 140, height: 24, type: PlatformType.SOLID, color: '#b2ebf2' },
    { x: 700, y: 380, width: 160, height: 24, type: PlatformType.SOLID, color: '#b2ebf2' },
    { x: 940, y: 320, width: 120, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 100, moveSpeed: 1.5, color: '#00bcd4' },
    { x: 1200, y: 420, width: 220, height: 24, type: PlatformType.SOLID, color: '#b2ebf2' },
    { x: 1500, y: 360, width: 120, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 100, moveSpeed: 1.5, color: '#00bcd4' },
    { x: 1750, y: 300, width: 180, height: 24, type: PlatformType.SOLID, color: '#b2ebf2' },
    { x: 2050, y: 400, width: 160, height: 24, type: PlatformType.SOLID, color: '#b2ebf2' },
    { x: 2350, y: 450, width: 250, height: 150, type: PlatformType.SOLID, color: '#e0f7fa' },
  ],

  coins: [
    { x: 500, y: 400, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 730, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 770, y: 340, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1240, y: 380, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 1280, y: 380, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1800, y: 260, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 2080, y: 360, type: CollectibleType.COIN_GOLD, value: 5 },
  ],

  crystalStar: { x: 1790, y: 220, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 1300, y: 372 },
  ],

  enemies: [
    { x: 520, y: 410, type: EnemyType.FLYING_BAT },
    { x: 750, y: 350, type: EnemyType.FLYING_BAT },
    { x: 1280, y: 390, type: EnemyType.SLIME, patrolRange: 80 },
    { x: 1800, y: 270, type: EnemyType.FLYING_BAT },
    { x: 2090, y: 370, type: EnemyType.FLYING_BAT },
  ],

  hazards: [
    { x: 400, y: 580, width: 1950, height: 50, type: HazardType.WATER },
  ],

  powerups: [
    { x: 750, y: 340, type: PowerUpType.SPEED_BOOST },
    { x: 2090, y: 360, type: PowerUpType.SHIELD },
  ],
};
