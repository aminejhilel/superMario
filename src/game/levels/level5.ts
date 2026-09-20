import { CollectibleType, EnemyType, HazardType, LevelConfig, PlatformType, PowerUpType } from '@/game/engine/Types';

export const level5: LevelConfig = {
  id: 5,
  world: 5,
  levelInWorld: 1,
  name: "Drako's Castle",
  theme: 'drako_castle',
  width: 2000,
  height: 600,
  timeLimit: 300,
  spawnPoint: { x: 80, y: 440 },
  finishPortal: { x: 1900, y: 390, width: 48, height: 64 },

  platforms: [
    // Entrance corridor
    { x: 0, y: 500, width: 400, height: 100, type: PlatformType.SOLID, color: '#1a1a2e' },
    // Platform jump section
    { x: 480, y: 420, width: 140, height: 24, type: PlatformType.SOLID, color: '#16213e' },
    { x: 700, y: 350, width: 140, height: 24, type: PlatformType.SOLID, color: '#16213e' },
    // Checkpoint platform before boss
    { x: 920, y: 500, width: 250, height: 100, type: PlatformType.SOLID, color: '#1a1a2e' },
    // BOSS ARENA FLOOR (Massive castle floor)
    { x: 1200, y: 500, width: 800, height: 100, type: PlatformType.SOLID, color: '#0f3460' },

    // Elevated platforms inside boss arena
    { x: 1350, y: 380, width: 120, height: 20, type: PlatformType.SOLID, color: '#16213e' },
    { x: 1650, y: 380, width: 120, height: 20, type: PlatformType.SOLID, color: '#16213e' },
  ],

  coins: [
    { x: 500, y: 380, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 720, y: 310, type: CollectibleType.COIN_CRYSTAL, value: 10 },
    { x: 1370, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
    { x: 1670, y: 340, type: CollectibleType.COIN_GOLD, value: 5 },
  ],

  crystalStar: { x: 720, y: 260, type: CollectibleType.CRYSTAL_STAR, value: 100 },

  checkpoints: [
    { x: 980, y: 452 },
  ],

  enemies: [
    { x: 250, y: 460, type: EnemyType.FIRE_CREATURE },
    { x: 520, y: 380, type: EnemyType.FLYING_BAT },
    { x: 740, y: 310, type: EnemyType.ROCK_MONSTER, patrolRange: 60 },
  ],

  hazards: [
    { x: 400, y: 550, width: 520, height: 50, type: HazardType.SPIKES },
  ],

  powerups: [
    { x: 990, y: 450, type: PowerUpType.HEALTH },
    { x: 1380, y: 340, type: PowerUpType.SHIELD },
  ],

  boss: {
    x: 1700,
    y: 420,
    hp: 20,
    name: 'Drako the Dark Lord',
  },
};
