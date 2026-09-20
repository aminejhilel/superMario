import { BoundingBox, CollectibleType } from '@/game/engine/Types';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';

export class Collectible implements BoundingBox {
  public x: number;
  public y: number;
  public width: number = 24;
  public height: number = 24;
  public type: CollectibleType;
  public value: number;
  public active: boolean = true;
  public animFrame: number = 0;

  constructor(x: number, y: number, type: CollectibleType, value: number = 1) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.value = value;
    if (type === 'CRYSTAL_STAR') {
      this.width = 32;
      this.height = 32;
    }
  }

  public update(dt: number) {
    this.animFrame += dt * 60;
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    if (!this.active) return;
    if (this.type === CollectibleType.CRYSTAL_STAR) {
      PixelArtAssets.drawCrystalStar(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height, this.animFrame);
    } else {
      PixelArtAssets.drawCoin(ctx, this.x - cameraX, this.y - cameraY, this.width, this.height, this.type, this.animFrame);
    }
  }
}
