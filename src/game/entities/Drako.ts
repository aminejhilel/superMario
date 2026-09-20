import { Enemy } from './Enemy';
import { EnemyType } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';
import { Projectile } from './Projectile';
import { ParticleSystem } from '@/game/graphics/ParticleSystem';
import { AudioManager } from '@/game/systems/AudioManager';

export class Drako extends Enemy {
  public phase: number = 1;
  private attackCooldown: number = 2.0;
  private jumpCooldown: number = 3.5;
  private direction: number = -1;

  constructor(x: number, y: number) {
    super(x, y, 72, 72, 20, EnemyType.DRAKO); // 20 HP Boss
    this.damage = 2;
  }

  public update(dt: number, playerX: number, playerY: number, particles?: ParticleSystem): { spawnProjectiles?: Projectile[] } {
    this.animFrame += dt * 60;
    this.attackCooldown -= dt;
    this.jumpCooldown -= dt;

    // Update Phase based on HP percentage
    const hpRatio = this.hp / this.maxHp;
    if (hpRatio <= 0.3 && this.phase < 3) {
      this.phase = 3;
      AudioManager.playSFX('boss_roar');
      if (particles) particles.triggerScreenShake(0.5, 12);
    } else if (hpRatio <= 0.7 && this.phase < 2) {
      this.phase = 2;
      AudioManager.playSFX('boss_roar');
      if (particles) particles.triggerScreenShake(0.3, 8);
    }

    // Movement speeds based on phase
    const moveSpeed = this.phase === 3 ? 3.2 : this.phase === 2 ? 2.2 : 1.5;
    this.x += moveSpeed * this.direction;

    // Turn around at arena edges
    if (this.x < 300) this.direction = 1;
    if (this.x > 1100) this.direction = -1;

    // Phase 2 & 3 Jump attacks
    if (this.phase >= 2 && this.jumpCooldown <= 0) {
      this.vy = -12;
      this.jumpCooldown = this.phase === 3 ? 2.5 : 4.0;
    }

    // Apply gravity
    this.vy += 0.5;
    this.y += this.vy;

    // Floor collision in boss arena (y = 480)
    if (this.y > 440) {
      if (this.vy > 3 && particles) {
        particles.triggerScreenShake(0.25, 8);
        particles.addExplosion(this.x + 36, this.y + 72, '#ffaa00', 10);
      }
      this.y = 440;
      this.vy = 0;
    }

    const projectiles: Projectile[] = [];

    // Projectile attacks
    if (this.attackCooldown <= 0) {
      this.attackCooldown = this.phase === 3 ? 1.2 : this.phase === 2 ? 1.8 : 2.5;

      const pX = this.x + (this.direction > 0 ? 70 : -10);
      const pY = this.y + 30;

      if (this.phase === 1) {
        // Single fireball
        const angle = Math.atan2(playerY - pY, playerX - pX);
        projectiles.push(new Projectile(pX, pY, Math.cos(angle) * 5, Math.sin(angle) * 5, false));
      } else if (this.phase === 2) {
        // Dual fireballs
        projectiles.push(new Projectile(pX, pY, this.direction * 5, 0, false));
        projectiles.push(new Projectile(pX, pY, this.direction * 4, -2, false));
      } else if (this.phase === 3) {
        // 3-way spread barrage
        [-0.3, 0, 0.3].forEach((offset) => {
          const angle = Math.atan2(playerY - pY, playerX - pX) + offset;
          projectiles.push(new Projectile(pX, pY, Math.cos(angle) * 6, Math.sin(angle) * 6, false));
        });
      }
    }

    return { spawnProjectiles: projectiles.length > 0 ? projectiles : undefined };
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    PixelArtAssets.drawDrako(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height, this.phase, this.animFrame);
  }
}
