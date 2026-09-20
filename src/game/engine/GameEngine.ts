import { LevelConfig, CollectibleType, GameState } from './Types';
import { getLevelConfig } from '@/game/levels/levelData';
import { Camera } from './Camera';
import { Physics } from './Physics';
import { Player } from '@/game/entities/Player';
import { Enemy } from '@/game/entities/Enemy';
import { Slime } from '@/game/entities/Slime';
import { FlyingBat } from '@/game/entities/FlyingBat';
import { RockMonster } from '@/game/entities/RockMonster';
import { FireCreature } from '@/game/entities/FireCreature';
import { Drako } from '@/game/entities/Drako';
import { Projectile } from '@/game/entities/Projectile';
import { Platform } from '@/game/objects/Platform';
import { Hazard } from '@/game/objects/Hazard';
import { Collectible } from '@/game/objects/Collectible';
import { PowerUp } from '@/game/objects/PowerUp';
import { Checkpoint } from '@/game/objects/Checkpoint';
import { ParticleSystem } from '@/game/graphics/ParticleSystem';
import { Renderer } from '@/game/graphics/Renderer';
import { InputManager } from '@/game/systems/InputManager';
import { AudioManager } from '@/game/systems/AudioManager';
import { useGameStore } from '@/store/useGameStore';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animFrameId: number | null = null;
  private lastTime: number = 0;

  public level!: LevelConfig;
  public camera!: Camera;
  public player!: Player;
  public inputManager!: InputManager;
  public particleSystem!: ParticleSystem;

  public platforms: Platform[] = [];
  public hazards: Hazard[] = [];
  public collectibles: Collectible[] = [];
  public powerups: PowerUp[] = [];
  public checkpoints: Checkpoint[] = [];
  public enemies: Enemy[] = [];
  public projectiles: Projectile[] = [];
  public boss?: Drako;

  private score: number = 0;
  private coins: number = 0;
  private starsCollected: number = 0;
  private enemiesDefeatedCount: number = 0;
  private timeRemaining: number = 180;
  private isPaused: boolean = false;

  constructor(canvas: HTMLCanvasElement, levelId: number) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.particleSystem = new ParticleSystem();
    this.inputManager = new InputManager(() => this.togglePause());

    this.loadLevel(levelId);
  }

  public loadLevel(levelId: number) {
    this.level = getLevelConfig(levelId);
    this.camera = new Camera(this.canvas.width, this.canvas.height);

    this.player = new Player(this.level.spawnPoint.x, this.level.spawnPoint.y);
    this.platforms = this.level.platforms.map((p) => new Platform(p));
    this.hazards = this.level.hazards.map((h) => new Hazard(h));
    this.collectibles = this.level.coins.map((c) => new Collectible(c.x, c.y, c.type, c.value));
    if (this.level.crystalStar) {
      this.collectibles.push(new Collectible(this.level.crystalStar.x, this.level.crystalStar.y, this.level.crystalStar.type, 100));
    }

    this.powerups = this.level.powerups.map((pw) => new PowerUp(pw.x, pw.y, pw.type));
    // Add a Magnet powerup in every level for extra fun!
    this.powerups.push(new PowerUp(this.level.spawnPoint.x + 180, this.level.spawnPoint.y - 40, 'MAGNET' as any));

    this.checkpoints = this.level.checkpoints.map((cp) => new Checkpoint(cp.x, cp.y));

    this.enemies = this.level.enemies.map((e) => {
      switch (e.type) {
        case 'SLIME': return new Slime(e.x, e.y, e.patrolRange);
        case 'FLYING_BAT': return new FlyingBat(e.x, e.y);
        case 'ROCK_MONSTER': return new RockMonster(e.x, e.y, e.patrolRange);
        case 'FIRE_CREATURE': return new FireCreature(e.x, e.y);
        default: return new Slime(e.x, e.y);
      }
    });

    if (this.level.boss) {
      this.boss = new Drako(this.level.boss.x, this.level.boss.y);
      this.enemies.push(this.boss);
    } else {
      this.boss = undefined;
    }

    this.projectiles = [];
    this.score = 0;
    this.coins = 0;
    this.starsCollected = 0;
    this.enemiesDefeatedCount = 0;
    this.timeRemaining = this.level.timeLimit;

    AudioManager.playMusic(this.level.theme);
  }

  public start() {
    this.lastTime = performance.now();
    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
      this.lastTime = timestamp;

      if (!this.isPaused && useGameStore.getState().gameState === GameState.PLAYING) {
        this.update(dt);
        this.render();
      }

      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  public stop() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    this.inputManager.destroy();
    AudioManager.stopMusic();
  }

  public togglePause() {
    this.isPaused = !this.isPaused;
    useGameStore.getState().setGameState(this.isPaused ? GameState.PAUSED : GameState.PLAYING);
  }

  private update(dt: number) {
    this.timeRemaining -= dt;
    if (this.timeRemaining <= 0) {
      this.handleGameOver();
      return;
    }

    const input = this.inputManager.getInput();

    // Player Update & Attacks
    const playerResult = this.player.update(dt, input, this.particleSystem);
    if (playerResult.shootSuperBeam) {
      const vx = this.player.facingRight ? 16 : -16;
      const pX = this.player.facingRight ? this.player.x + this.player.width : this.player.x - 36;
      this.projectiles.push(new Projectile(pX, this.player.y, vx, 0, true, true));
    } else if (playerResult.shootProjectile) {
      const vx = this.player.facingRight ? 10 : -10;
      const pX = this.player.facingRight ? this.player.x + this.player.width : this.player.x - 12;
      this.projectiles.push(new Projectile(pX, this.player.y + 12, vx, 0, true, false));
    }

    // Magnet Coin Attraction Physics
    if (this.player.magnetTimer > 0) {
      for (const c of this.collectibles) {
        if (!c.active) continue;
        const dx = (this.player.x + this.player.width / 2) - (c.x + c.width / 2);
        const dy = (this.player.y + this.player.height / 2) - (c.y + c.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          c.x += (dx / dist) * 7;
          c.y += (dy / dist) * 7;
        }
      }
    }

    this.platforms.forEach((p) => p.update(dt));
    this.hazards.forEach((h) => h.update(dt));
    this.collectibles.forEach((c) => c.update(dt));
    this.powerups.forEach((pw) => pw.update(dt));

    // Enemy Updates & Player Stomp / Collision
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      if (!enemy.active) continue;

      let enemyRes: any;
      if (enemy instanceof Drako) {
        enemyRes = enemy.update(dt, this.player.x, this.player.y, this.particleSystem);
        if (enemyRes.spawnProjectiles) {
          this.projectiles.push(...enemyRes.spawnProjectiles);
        }
      } else {
        enemyRes = enemy.update(dt, this.player.x, this.player.y);
        if (enemyRes.spawnProjectile) {
          this.projectiles.push(enemyRes.spawnProjectile);
        }
      }

      if (Physics.checkAABB(this.player, enemy)) {
        if (this.player.vy > 0 && this.player.y + this.player.height - this.player.vy <= enemy.y + 12) {
          this.player.vy = -9.5;
          this.particleSystem.addExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#39ff14', 10);
          AudioManager.playSFX('hit');

          const killed = enemy.takeDamage(1);
          if (killed) {
            this.enemiesDefeatedCount++;
            this.player.registerEnemyKill(this.particleSystem);
            this.score += 100 * this.player.comboMultiplier;
          }
        } else {
          const isDead = this.player.takeDamage(enemy.damage, this.particleSystem);
          if (isDead) {
            this.handlePlayerDeath();
          }
        }
      }
    }

    // Projectiles Updates
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.update(dt);
      if (!proj.active) {
        this.projectiles.splice(i, 1);
        continue;
      }

      if (proj.isPlayerProjectile) {
        for (const enemy of this.enemies) {
          if (enemy.active && Physics.checkAABB(proj, enemy)) {
            if (!proj.isSuperBeam) proj.active = false;
            const damageAmount = proj.isSuperBeam ? 3 : 1;
            this.particleSystem.addExplosion(proj.x, proj.y, proj.isSuperBeam ? '#a855f7' : '#00ffff', 10);
            AudioManager.playSFX('hit');
            const killed = enemy.takeDamage(damageAmount);
            if (killed) {
              this.enemiesDefeatedCount++;
              this.player.registerEnemyKill(this.particleSystem);
              this.score += 150 * this.player.comboMultiplier;
            }
            if (!proj.isSuperBeam) break;
          }
        }
      } else {
        if (Physics.checkAABB(proj, this.player)) {
          proj.active = false;
          const isDead = this.player.takeDamage(1, this.particleSystem);
          if (isDead) {
            this.handlePlayerDeath();
          }
        }
      }
    }

    // Tile Collisions
    this.player.grounded = false;
    for (const platform of this.platforms) {
      Physics.resolveTileCollision(this.player, {
        ...platform,
        isOneWay: platform.type === 'ONE_WAY',
      });
    }

    // Hazards
    for (const hazard of this.hazards) {
      if (Physics.checkAABB(this.player, hazard)) {
        const isDead = this.player.takeDamage(1, this.particleSystem);
        if (isDead || hazard.type === 'LAVA' || hazard.type === 'WATER') {
          this.handlePlayerDeath();
        }
      }
    }

    // Collectibles
    for (const c of this.collectibles) {
      if (c.active && Physics.checkAABB(this.player, c)) {
        c.active = false;
        this.player.superMeter = Math.min(100, this.player.superMeter + 5);
        if (c.type === CollectibleType.CRYSTAL_STAR) {
          this.starsCollected = 1;
          this.score += 500 * this.player.comboMultiplier;
          this.particleSystem.addCoinSparkle(c.x, c.y);
          AudioManager.playSFX('star');
        } else {
          this.coins += c.value;
          this.score += c.value * 50 * this.player.comboMultiplier;
          this.particleSystem.addCoinSparkle(c.x, c.y);
          AudioManager.playSFX('coin');
        }
      }
    }

    // Powerups
    for (const pw of this.powerups) {
      if (pw.active && Physics.checkAABB(this.player, pw)) {
        pw.active = false;
        AudioManager.playSFX('powerup');
        if (pw.type === 'SHIELD') this.player.shieldActive = true;
        if (pw.type === 'SPEED_BOOST') this.player.speedBoostTimer = 8.0;
        if (pw.type === 'DOUBLE_JUMP') this.player.infiniteJumpTimer = 8.0;
        if (pw.type === 'HEALTH') this.player.hp = Math.min(this.player.maxHp, this.player.hp + 1);
        if (pw.type === 'MAGNET') this.player.magnetTimer = 10.0;
      }
    }

    // Checkpoints
    for (const cp of this.checkpoints) {
      if (Physics.checkAABB(this.player, cp)) {
        if (cp.activate()) {
          this.player.respawnPoint = { x: cp.x, y: cp.y };
        }
      }
    }

    // Finish Portal
    if (Physics.checkAABB(this.player, this.level.finishPortal)) {
      if (this.boss && this.boss.active) {
        // Boss still alive
      } else {
        this.handleLevelComplete();
        return;
      }
    }

    // Fall Bounds
    if (this.player.y > this.level.height + 100) {
      this.handlePlayerDeath();
    }

    this.particleSystem.update(dt);
    this.camera.update(
      this.player.x + this.player.width / 2,
      this.player.y + this.player.height / 2,
      this.level.width,
      this.level.height,
      this.particleSystem.getScreenShakeOffset()
    );

    useGameStore.getState().updateHUD(this.player.hp, this.coins, this.score, this.timeRemaining);
  }

  private handlePlayerDeath() {
    this.player.respawn();
    if (this.player.hp <= 0) {
      AudioManager.playSFX('damage');
      useGameStore.getState().setGameState(GameState.GAME_OVER);
    }
  }

  private handleLevelComplete() {
    AudioManager.playSFX('win');
    const timeBonus = Math.floor(this.timeRemaining) * 10;
    const stars = this.starsCollected > 0 ? (this.coins >= 10 ? 3 : 2) : 1;
    useGameStore.getState().completeLevel(this.coins, this.enemiesDefeatedCount, stars, timeBonus);
  }

  private handleGameOver() {
    useGameStore.getState().setGameState(GameState.GAME_OVER);
  }

  private render() {
    Renderer.render(
      this.ctx,
      this.canvas.width,
      this.canvas.height,
      this.level,
      this.camera,
      this.player,
      this.platforms,
      this.hazards,
      this.collectibles,
      this.powerups,
      this.checkpoints,
      this.enemies,
      this.projectiles,
      this.particleSystem,
      this.boss
    );
  }
}
