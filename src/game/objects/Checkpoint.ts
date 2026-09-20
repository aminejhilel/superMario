import { BoundingBox } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';
import { AudioManager } from '@/game/systems/AudioManager';

export class Checkpoint implements BoundingBox {
  public x: number;
  public y: number;
  public width: number = 32;
  public height: number = 48;
  public activated: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public activate(): boolean {
    if (!this.activated) {
      this.activated = true;
      AudioManager.playSFX('checkpoint');
      return true;
    }
    return false;
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    PixelArtAssets.drawCheckpoint(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height, this.activated);
  }
}
