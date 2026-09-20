import { BoundingBox, EnemyType } from '@/game/engine/Types';
import { Projectile } from './Projectile';
import { ParticleSystem } from '@/game/graphics/ParticleSystem';

export abstract class Enemy implements BoundingBox {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public vx: number = 0;
  public vy: number = 0;
  public hp: number;
  public maxHp: number;
  public damage: number = 1;
  public type: EnemyType;
  public active: boolean = true;
  public animFrame: number = 0;
  public isGrounded: boolean = false;

  constructor(x: number, y: number, width: number, height: number, hp: number, type: EnemyType) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hp = hp;
    this.maxHp = hp;
    this.type = type;
  }

  public abstract update(
    dt: number,
    playerX: number,
    playerY: number,
    particles?: ParticleSystem
  ): { spawnProjectile?: Projectile; spawnProjectiles?: Projectile[] };

  public abstract draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number): void;

  public takeDamage(amount: number): boolean {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.active = false;
      return true;
    }
    return false;
  }
}
