import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level1: LevelConfig = {
  id: 1,
  world: 1,
  levelInWorld: 1,
  name: 'Green Valley',
  theme: 'green_valley',
  width: 2400,
  height: 600,
  timeLimit: 180,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 2280, y: 410, width: 48, height: 64 },

  platforms: [
    // Main Ground sections
    { x: 0, y: 500, width: 700, height: 100, type: PlatformType.SOLID, color: '#3bb54a' },
    { x: 800, y: 500, width: 650, height: 100, type: PlatformType.SOLID, color: '#3bb54a' },
    { x: 1550, y: 500, width: 850, height: 100, type: PlatformType.SOLID, color: '#3bb54a' },

    // Floating Platforms
    { x: 250, y: 380, width: 140, height: 24, type: PlatformType.SOLID, color: '#48c75a' },
    { x: 450, y: 300, width: 140, height: 24, type: PlatformType.SOLID, color: '#48c75a' },
    { x: 720, y: 420, width: 100, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 60, moveSpeed: 1, color: '#ffcc00' },
    { x: 950, y: 380, width: 160, height: 24, type: PlatformType.SOLID, color: '#48c75a' },
    { x: 1180, y: 310, width: 140, height: 24, type: PlatformType.SOLID, color: '#48c75a' },
    { x: 1450, y: 420, width: 120, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 80, moveSpeed: 1, color: '#ffcc00' },
    { x: 1700, y: 380, width: 180, height: 24, type: PlatformType.SOLID, color: '#48c75a' },
    { x: 1950, y: 320, width: 140, height: 24, type: PlatformType.SOLID, color: '#48c75a' },
  ],

  coins: [
    { x: 270, y: 340, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 310, y: 340, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 350, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 480, y: 260, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 520, y: 260, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 980, y: 340, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 1020, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1740, y: 340, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1780, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
  ],

  crystalStar: { x: 1210, y: 250, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 1000, y: 452 },
  ],

  enemies: [
    { x: 350, y: 476, type: EnemyType.SLIME, patrolRange: 100 },
    { x: 920, y: 476, type: EnemyType.SLIME, patrolRange: 120 },
    { x: 1200, y: 282, type: EnemyType.FLYING_BAT },
    { x: 1750, y: 476, type: EnemyType.SLIME, patrolRange: 150 },
  ],

  hazards: [
    { x: 700, y: 550, width: 100, height: 50, type: HazardType.WATER },
    { x: 1450, y: 550, width: 100, height: 50, type: HazardType.WATER },
  ],

  powerups: [
    { x: 500, y: 260, type: PowerUpType.SHIELD },
    { x: 1980, y: 280, type: PowerUpType.SPEED_BOOST },
  ],
};
