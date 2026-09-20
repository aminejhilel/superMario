import { Enemy } from './Enemy';
import { EnemyType } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';
import { Projectile } from './Projectile';

export class FireCreature extends Enemy {
  private shootCooldown: number = 2.0;

  constructor(x: number, y: number) {
    super(x, y, 36, 36, 2, EnemyType.FIRE_CREATURE);
  }

  public update(dt: number, playerX: number, playerY: number): { spawnProjectile?: Projectile } {
    this.animFrame += dt * 60;
    this.shootCooldown -= dt;

    let proj: Projectile | undefined = undefined;

    // Shoot fireball towards player position periodically
    if (this.shootCooldown <= 0 && Math.abs(playerX - this.x) < 400) {
      this.shootCooldown = 2.5;
      const angle = Math.atan2(playerY - this.y, playerX - this.x);
      const speed = 4;
      proj = new Projectile(this.x + 18, this.y + 18, Math.cos(angle) * speed, Math.sin(angle) * speed, false);
    }

    return { spawnProjectile: proj };
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    PixelArtAssets.drawFireCreature(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height, this.animFrame);
  }
}
