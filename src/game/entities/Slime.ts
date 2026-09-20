import { Enemy } from './Enemy';
import { EnemyType } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';

export class Slime extends Enemy {
  private startX: number;
  private patrolDistance: number;
  private direction: number = 1;

  constructor(x: number, y: number, patrolRange: number = 120) {
    super(x, y, 32, 24, 1, EnemyType.SLIME);
    this.startX = x;
    this.patrolDistance = patrolRange;
    this.vx = 1.5;
  }

  public update(dt: number): {} {
    this.animFrame += dt * 60;
    this.x += this.vx * this.direction;

    if (this.x > this.startX + this.patrolDistance) {
      this.direction = -1;
    } else if (this.x < this.startX - this.patrolDistance) {
      this.direction = 1;
    }

    return {};
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    PixelArtAssets.drawSlime(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height, this.animFrame);
  }
}
