import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level2: LevelConfig = {
  id: 2,
  world: 2,
  levelInWorld: 1,
  name: 'Crystal Cave',
  theme: 'crystal_cave',
  width: 2500,
  height: 600,
  timeLimit: 200,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 2380, y: 410, width: 48, height: 64 },

  platforms: [
    { x: 0, y: 500, width: 600, height: 100, type: PlatformType.SOLID, color: '#3a2e56' },
    { x: 700, y: 500, width: 700, height: 100, type: PlatformType.SOLID, color: '#3a2e56' },
    { x: 1500, y: 500, width: 1000, height: 100, type: PlatformType.SOLID, color: '#3a2e56' },

    { x: 200, y: 390, width: 120, height: 24, type: PlatformType.SOLID, color: '#5b4a80' },
    { x: 380, y: 310, width: 140, height: 24, type: PlatformType.SOLID, color: '#5b4a80' },
    { x: 610, y: 430, width: 100, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 70, moveSpeed: 1.2, color: '#9d4edd' },
    { x: 850, y: 360, width: 160, height: 24, type: PlatformType.SOLID, color: '#5b4a80' },
    { x: 1080, y: 280, width: 140, height: 24, type: PlatformType.SOLID, color: '#5b4a80' },
    { x: 1320, y: 350, width: 100, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 90, moveSpeed: 1.2, color: '#9d4edd' },
    { x: 1600, y: 380, width: 180, height: 24, type: PlatformType.SOLID, color: '#5b4a80' },
    { x: 1880, y: 300, width: 140, height: 24, type: PlatformType.SOLID, color: '#5b4a80' },
  ],

  coins: [
    { x: 220, y: 350, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 400, y: 270, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 440, y: 270, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 880, y: 320, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 920, y: 320, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1640, y: 340, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1900, y: 260, type: CollectibleType.COIN_GOLD, value: 5 },
  ],

  crystalStar: { x: 1120, y: 220, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 1100, y: 452 },
  ],

  enemies: [
    { x: 300, y: 460, type: EnemyType.ROCK_MONSTER, patrolRange: 80 },
    { x: 850, y: 320, type: EnemyType.FLYING_BAT },
    { x: 1000, y: 460, type: EnemyType.ROCK_MONSTER, patrolRange: 120 },
    { x: 1700, y: 460, type: EnemyType.ROCK_MONSTER, patrolRange: 100 },
  ],

  hazards: [
    { x: 600, y: 480, width: 100, height: 20, type: HazardType.SPIKES },
    { x: 1400, y: 480, width: 100, height: 20, type: HazardType.SPIKES },
  ],

  powerups: [
    { x: 410, y: 270, type: PowerUpType.DOUBLE_JUMP },
    { x: 1910, y: 260, type: PowerUpType.HEALTH },
  ],
};
