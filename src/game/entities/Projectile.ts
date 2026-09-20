import { BoundingBox } from '@/game/engine/Types';

export class Projectile implements BoundingBox {
  public x: number;
  public y: number;
  public width: number = 12;
  public height: number = 12;
  public vx: number;
  public vy: number;
  public isPlayerProjectile: boolean;
  public isSuperBeam: boolean;
  public active: boolean = true;
  public lifetime: number = 2.5;

  constructor(x: number, y: number, vx: number, vy: number, isPlayer: boolean, isSuperBeam: boolean = false) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.isPlayerProjectile = isPlayer;
    this.isSuperBeam = isSuperBeam;
    if (isSuperBeam) {
      this.width = 36;
      this.height = 36;
    }
  }

  public update(dt: number) {
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
    this.lifetime -= dt;

    if (this.lifetime <= 0) {
      this.active = false;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    ctx.translate(this.x - cameraX + this.width / 2, this.y - cameraY + this.height / 2);

    if (this.isSuperBeam) {
      // Mega Super Beam Blast
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else if (this.isPlayerProjectile) {
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#ff3300';
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffcc00';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}
