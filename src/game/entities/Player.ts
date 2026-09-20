import { BoundingBox, PlayerState, Vector2D } from '@/game/engine/Types';
import { AudioManager } from '@/game/systems/AudioManager';
import { ParticleSystem } from '@/game/graphics/ParticleSystem';
import { InputState } from '@/game/systems/InputManager';

export class Player implements BoundingBox {
  public x: number;
  public y: number;
  public width: number = 32;
  public height: number = 36;
  public vx: number = 0;
  public vy: number = 0;

  public grounded: boolean = false;
  public facingRight: boolean = true;
  public state: PlayerState = PlayerState.IDLE;
  public animFrame: number = 0;

  public hp: number = 3;
  public maxHp: number = 3;
  public isHurt: boolean = false;
  public hurtTimer: number = 0;
  public attackTimer: number = 0;

  // Double jump tracking
  public jumpsRemaining: number = 2;
  private jumpKeyPressed: boolean = false;

  // Powerups
  public shieldActive: boolean = false;
  public speedBoostTimer: number = 0;
  public infiniteJumpTimer: number = 0;

  // Checkpoint respawn position
  public respawnPoint: Vector2D;

  constructor(startX: number, startY: number) {
    this.x = startX;
    this.y = startY;
    this.respawnPoint = { x: startX, y: startY };
  }

  public update(dt: number, input: InputState, particles: ParticleSystem): { shootProjectile: boolean } {
    this.animFrame += dt * 60;
    let shoot = false;

    // Powerup Timers
    if (this.speedBoostTimer > 0) this.speedBoostTimer -= dt;
    if (this.infiniteJumpTimer > 0) {
      this.infiniteJumpTimer -= dt;
      this.jumpsRemaining = 2;
    }

    // Hurt Cooldown
    if (this.isHurt) {
      this.hurtTimer -= dt;
      if (this.hurtTimer <= 0) {
        this.isHurt = false;
      }
    }

    if (this.attackTimer > 0) {
      this.attackTimer -= dt;
    }

    // Horizontal Movement
    const speed = this.speedBoostTimer > 0 ? 8 : input.run ? 6.5 : 4.5;
    if (input.left) {
      this.vx = -speed;
      this.facingRight = false;
    } else if (input.right) {
      this.vx = speed;
      this.facingRight = true;
    } else {
      this.vx *= 0.75; // Friction
    }

    // Jump & Double Jump Logic
    if (input.jump && !this.jumpKeyPressed) {
      if (this.grounded) {
        this.vy = -11.5;
        this.grounded = false;
        this.jumpsRemaining = 1;
        particles.addJumpDust(this.x + this.width / 2, this.y + this.height);
        AudioManager.playSFX('jump');
      } else if (this.jumpsRemaining > 0) {
        this.vy = -10.5;
        this.jumpsRemaining--;
        particles.addJumpDust(this.x + this.width / 2, this.y + this.height);
        AudioManager.playSFX('doublejump');
      }
      this.jumpKeyPressed = true;
    } else if (!input.jump) {
      this.jumpKeyPressed = false;
    }

    // Gravity
    this.vy += 0.48;
    if (this.vy > 14) this.vy = 14;

    // Attack (Energy Blast)
    if (input.attack && this.attackTimer <= 0) {
      this.attackTimer = 0.25; // Cooldown
      shoot = true;
      AudioManager.playSFX('laser');
      particles.addEnergyTrail(this.facingRight ? this.x + this.width + 5 : this.x - 5, this.y + 12);
    }

    // Position updates
    this.x += this.vx;
    this.y += this.vy;

    // Determine state
    if (this.isHurt) {
      this.state = PlayerState.HURT;
    } else if (this.attackTimer > 0.1) {
      this.state = PlayerState.ATTACK;
    } else if (!this.grounded) {
      this.state = this.vy < 0 ? PlayerState.JUMP : PlayerState.FALL;
    } else if (Math.abs(this.vx) > 0.5) {
      this.state = PlayerState.RUN;
    } else {
      this.state = PlayerState.IDLE;
    }

    // Reset grounded flag for next frame physics check
    if (this.grounded) {
      this.jumpsRemaining = this.infiniteJumpTimer > 0 ? 2 : 2;
    }

    return { shootProjectile: shoot };
  }

  public takeDamage(amount: number = 1, particles?: ParticleSystem): boolean {
    if (this.isHurt) return false;

    if (this.shieldActive) {
      this.shieldActive = false;
      this.isHurt = true;
      this.hurtTimer = 1.0;
      if (particles) particles.addExplosion(this.x + this.width / 2, this.y + this.height / 2, '#00ffff', 12);
      AudioManager.playSFX('powerup');
      return false;
    }

    this.hp = Math.max(0, this.hp - amount);
    this.isHurt = true;
    this.hurtTimer = 1.5;
    this.vy = -6; // Knockback jump
    AudioManager.playSFX('damage');

    if (particles) {
      particles.addExplosion(this.x + this.width / 2, this.y + this.height / 2, '#ff0055', 15);
      particles.triggerScreenShake(0.2, 6);
    }

    return this.hp <= 0;
  }

  public respawn() {
    this.x = this.respawnPoint.x;
    this.y = this.respawnPoint.y;
    this.vx = 0;
    this.vy = 0;
    this.hp = this.maxHp;
    this.isHurt = false;
    this.hurtTimer = 0;
  }
}
