import { Enemy } from './Enemy';
import { EnemyType } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';

export class FlyingBat extends Enemy {
  private startY: number;
  private time: number = 0;

  constructor(x: number, y: number) {
    super(x, y, 32, 28, 1, EnemyType.FLYING_BAT);
    this.startY = y;
  }

  public update(dt: number, playerX: number, playerY: number): {} {
    this.animFrame += dt * 60;
    this.time += dt * 3;

    // Sine wave flight pattern
    this.y = this.startY + Math.sin(this.time) * 30;

    // Move slightly toward player horizontally if within 250px
    const dx = playerX - this.x;
    if (Math.abs(dx) < 250) {
      this.x += (dx > 0 ? 1 : -1) * 1.2;
    }

    return {};
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    PixelArtAssets.drawFlyingBat(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height, this.animFrame);
  }
}
