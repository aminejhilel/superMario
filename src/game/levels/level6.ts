import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level6: LevelConfig = {
  id: 6,
  world: 6,
  levelInWorld: 1,
  name: 'Volcano Inferno',
  theme: 'volcanic_land',
  width: 2800,
  height: 600,
  timeLimit: 240,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 2680, y: 390, width: 48, height: 64 },

  platforms: [
    // Start safe ground
    { x: 0, y: 500, width: 450, height: 100, type: PlatformType.SOLID, color: '#3d1a00' },
    // Mid section ground pieces
    { x: 550, y: 500, width: 300, height: 100, type: PlatformType.SOLID, color: '#3d1a00' },
    { x: 950, y: 500, width: 350, height: 100, type: PlatformType.SOLID, color: '#3d1a00' },
    { x: 1400, y: 500, width: 300, height: 100, type: PlatformType.SOLID, color: '#3d1a00' },
    { x: 1800, y: 500, width: 300, height: 100, type: PlatformType.SOLID, color: '#3d1a00' },
    { x: 2200, y: 500, width: 600, height: 100, type: PlatformType.SOLID, color: '#3d1a00' },

    // Floating volcanic platforms
    { x: 200, y: 380, width: 130, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
    { x: 420, y: 420, width: 100, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 80, moveSpeed: 1.8, color: '#ff5500' },
    { x: 650, y: 350, width: 150, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
    { x: 860, y: 280, width: 140, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
    { x: 1070, y: 380, width: 100, height: 20, type: PlatformType.MOVING_VERT, moveDistance: 100, moveSpeed: 1.8, color: '#ff5500' },
    { x: 1250, y: 310, width: 160, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
    { x: 1500, y: 370, width: 130, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
    { x: 1700, y: 300, width: 110, height: 20, type: PlatformType.MOVING_HORIZ, moveDistance: 70, moveSpeed: 2, color: '#ff5500' },
    { x: 1910, y: 360, width: 150, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
    { x: 2100, y: 280, width: 140, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
    { x: 2350, y: 380, width: 180, height: 24, type: PlatformType.SOLID, color: '#6b2600' },
  ],

  coins: [
    { x: 220, y: 340, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 680, y: 310, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 720, y: 310, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 890, y: 240, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1290, y: 270, type: CollectibleType.COIN_NORMAL, value: 1 },
    { x: 1540, y: 330, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1950, y: 320, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 2130, y: 240, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 2390, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
  ],

  crystalStar: { x: 870, y: 200, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 1100, y: 452 },
    { x: 2000, y: 452 },
  ],

  enemies: [
    { x: 280, y: 464, type: EnemyType.FIRE_CREATURE },
    { x: 700, y: 464, type: EnemyType.ROCK_MONSTER, patrolRange: 100 },
    { x: 900, y: 244, type: EnemyType.FIRE_CREATURE },
    { x: 1100, y: 464, type: EnemyType.FIRE_CREATURE },
    { x: 1560, y: 464, type: EnemyType.ROCK_MONSTER, patrolRange: 80 },
    { x: 1940, y: 330, type: EnemyType.FLYING_BAT },
    { x: 2150, y: 244, type: EnemyType.FIRE_CREATURE },
    { x: 2400, y: 464, type: EnemyType.ROCK_MONSTER, patrolRange: 120 },
  ],

  hazards: [
    { x: 450, y: 550, width: 100, height: 50, type: HazardType.LAVA },
    { x: 855, y: 550, width: 95, height: 50, type: HazardType.LAVA },
    { x: 1305, y: 550, width: 95, height: 50, type: HazardType.LAVA },
    { x: 1705, y: 550, width: 95, height: 50, type: HazardType.LAVA },
    { x: 2105, y: 550, width: 95, height: 50, type: HazardType.LAVA },
  ],

  powerups: [
    { x: 660, y: 310, type: PowerUpType.SHIELD },
    { x: 1540, y: 330, type: PowerUpType.HEALTH },
    { x: 2130, y: 240, type: PowerUpType.SPEED_BOOST },
  ],
};
