import { BoundingBox, PowerUpType } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';

export class PowerUp implements BoundingBox {
  public x: number;
  public y: number;
  public width: number = 28;
  public height: number = 28;
  public type: PowerUpType;
  public active: boolean = true;
  private animFrame: number = 0;

  constructor(x: number, y: number, type: PowerUpType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  public update(dt: number) {
    this.animFrame += dt * 60;
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    if (!this.active) return;
    const floatY = Math.sin(this.animFrame * 0.1) * 3;
    PixelArtAssets.drawPowerUp(ctx, this.x - cameraX, this.y - cameraY + floatY, this.width, this.height, this.type);
  }
}
