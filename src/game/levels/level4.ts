import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level4: LevelConfig = {
  id: 4,
  world: 4,
  levelInWorld: 1,
  name: 'Volcanic Land',
  theme: 'volcanic_land',
  width: 2700,
  height: 600,
  timeLimit: 220,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 2580, y: 410, width: 48, height: 64 },

  platforms: [
    { x: 0, y: 500, width: 500, height: 100, type: PlatformType.SOLID, color: '#331a00' },
    { x: 600, y: 500, width: 600, height: 100, type: PlatformType.SOLID, color: '#331a00' },
    { x: 1300, y: 500, width: 600, height: 100, type: PlatformType.SOLID, color: '#331a00' },
    { x: 2000, y: 500, width: 700, height: 100, type: PlatformType.SOLID, color: '#331a00' },

    { x: 250, y: 390, width: 120, height: 24, type: PlatformType.SOLID, color: '#552b00' },
    { x: 520, y: 420, width: 100, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 60, moveSpeed: 1.5, color: '#ff4500' },
    { x: 750, y: 350, width: 140, height: 24, type: PlatformType.SOLID, color: '#552b00' },
    { x: 1000, y: 280, width: 140, height: 24, type: PlatformType.SOLID, color: '#552b00' },
    { x: 1220, y: 380, width: 100, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 80, moveSpeed: 1.5, color: '#ff4500' },
    { x: 1450, y: 340, width: 160, height: 24, type: PlatformType.SOLID, color: '#552b00' },
    { x: 1750, y: 290, width: 140, height: 24, type: PlatformType.SOLID, color: '#552b00' },
    { x: 2150, y: 380, width: 180, height: 24, type: PlatformType.SOLID, color: '#552b00' },
  ],

  coins: [
    { x: 270, y: 350, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 780, y: 310, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1030, y: 240, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1490, y: 300, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 1780, y: 250, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 2190, y: 340, type: CollectibleType.COIN_CRYSTAL, value: 10 },
  ],

  crystalStar: { x: 1040, y: 190, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 1350, y: 452 },
  ],

  enemies: [
    { x: 300, y: 464, type: EnemyType.FIRE_CREATURE },
    { x: 780, y: 464, type: EnemyType.ROCK_MONSTER, patrolRange: 100 },
    { x: 1020, y: 244, type: EnemyType.FIRE_CREATURE },
    { x: 1500, y: 464, type: EnemyType.FIRE_CREATURE },
    { x: 2200, y: 464, type: EnemyType.ROCK_MONSTER, patrolRange: 120 },
  ],

  hazards: [
    { x: 500, y: 550, width: 100, height: 50, type: HazardType.LAVA },
    { x: 1200, y: 550, width: 100, height: 50, type: HazardType.LAVA },
    { x: 1900, y: 550, width: 100, height: 50, type: HazardType.LAVA },
  ],

  powerups: [
    { x: 1040, y: 240, type: PowerUpType.HEALTH },
    { x: 2200, y: 340, type: PowerUpType.SHIELD },
  ],
};
