export enum GameState {
  MENU = 'MENU',
  LEVEL_SELECT = 'LEVEL_SELECT',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  VICTORY = 'VICTORY',
  SETTINGS = 'SETTINGS',
}

export enum PlayerState {
  IDLE = 'IDLE',
  RUN = 'RUN',
  JUMP = 'JUMP',
  FALL = 'FALL',
  ATTACK = 'ATTACK',
  SUPER_ATTACK = 'SUPER_ATTACK',
  HURT = 'HURT',
  DEAD = 'DEAD',
}

export enum EnemyType {
  SLIME = 'SLIME',
  FLYING_BAT = 'FLYING_BAT',
  ROCK_MONSTER = 'ROCK_MONSTER',
  FIRE_CREATURE = 'FIRE_CREATURE',
  DRAKO = 'DRAKO',
}

export enum CollectibleType {
  COIN_NORMAL = 'COIN_NORMAL',
  COIN_GOLD = 'COIN_GOLD',
  COIN_CRYSTAL = 'COIN_CRYSTAL',
  CRYSTAL_STAR = 'CRYSTAL_STAR',
}

export enum PowerUpType {
  SHIELD = 'SHIELD',
  SPEED_BOOST = 'SPEED_BOOST',
  DOUBLE_JUMP = 'DOUBLE_JUMP',
  HEALTH = 'HEALTH',
  MAGNET = 'MAGNET',
}

export enum PlatformType {
  SOLID = 'SOLID',
  ONE_WAY = 'ONE_WAY',
  MOVING_HORIZ = 'MOVING_HORIZ',
  MOVING_VERT = 'MOVING_VERT',
  CRUMBLING = 'CRUMBLING',
}

export enum HazardType {
  SPIKES = 'SPIKES',
  LAVA = 'LAVA',
  WATER = 'WATER',
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface Size2D {
  width: number;
  height: number;
}

export interface BoundingBox extends Vector2D, Size2D {}

export interface LevelConfig {
  id: number;
  world: number;
  levelInWorld: number;
  name: string;
  theme: 'green_valley' | 'crystal_cave' | 'sky_islands' | 'volcanic_land' | 'drako_castle';
  width: number;
  height: number;
  timeLimit: number;
  spawnPoint: Vector2D;
  finishPortal: BoundingBox;
  platforms: PlatformData[];
  coins: CollectibleData[];
  crystalStar: CollectibleData;
  checkpoints: Vector2D[];
  enemies: EnemyData[];
  hazards: HazardData[];
  powerups: PowerUpData[];
  boss?: BossConfig;
}

export interface PlatformData extends BoundingBox {
  type: PlatformType;
  moveDistance?: number;
  moveSpeed?: number;
  color?: string;
}

export interface CollectibleData extends Vector2D {
  type: CollectibleType;
  value: number;
}

export interface EnemyData extends Vector2D {
  type: EnemyType;
  patrolRange?: number;
}

export interface HazardData extends BoundingBox {
  type: HazardType;
}

export interface PowerUpData extends Vector2D {
  type: PowerUpType;
}

export interface BossConfig extends Vector2D {
  hp: number;
  name: string;
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  coins: number;
  stars: number;
  score: number;
  shieldActive: boolean;
  magnetTimer: number;
  speedBoostTimer: number;
  infiniteJumpTimer: number;
  comboMultiplier: number;
  superMeter: number;
}

export interface GameSaveData {
  unlockedWorld: number;
  completedLevels: Record<number, { stars: number; highScore: number }>;
  totalCoins: number;
  totalStars: number;
  settings: {
    musicVolume: number;
    sfxVolume: number;
    showTouchControls: boolean;
  };
}
