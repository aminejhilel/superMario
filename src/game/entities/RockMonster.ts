import { Enemy } from './Enemy';
import { EnemyType } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';

export class RockMonster extends Enemy {
  private startX: number;
  private patrolRange: number;
  private direction: number = 1;

  constructor(x: number, y: number, patrolRange: number = 100) {
    super(x, y, 40, 40, 3, EnemyType.ROCK_MONSTER); // High HP (3)
    this.startX = x;
    this.patrolRange = patrolRange;
    this.damage = 2; // Causes heavy damage
  }

  public update(dt: number): {} {
    this.animFrame += dt * 60;
    this.x += 0.8 * this.direction; // Slow movement

    if (this.x > this.startX + this.patrolRange) {
      this.direction = -1;
    } else if (this.x < this.startX - this.patrolRange) {
      this.direction = 1;
    }

    return {};
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    PixelArtAssets.drawRockMonster(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height);
  }
}
