import { BoundingBox, HazardData, HazardType } from '@/game/engine/Types';

export class Hazard implements BoundingBox {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public type: HazardType;
  private animFrame: number = 0;

  constructor(data: HazardData) {
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.type = data.type;
  }

  public update(dt: number) {
    this.animFrame += dt * 60;
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    const renderX = this.x - cameraX;
    const renderY = this.y - cameraY;

    if (this.type === HazardType.SPIKES) {
      ctx.fillStyle = '#aa0033';
      const spikeCount = Math.floor(this.width / 12);
      for (let i = 0; i < spikeCount; i++) {
        ctx.beginPath();
        ctx.moveTo(renderX + i * 12, renderY + this.height);
        ctx.lineTo(renderX + i * 12 + 6, renderY);
        ctx.lineTo(renderX + i * 12 + 12, renderY + this.height);
        ctx.closePath();
        ctx.fill();
      }
    } else if (this.type === HazardType.LAVA) {
      const lavaWave = Math.sin(this.animFrame * 0.1) * 3;
      ctx.fillStyle = '#ff3300';
      ctx.fillRect(renderX, renderY + lavaWave, this.width, this.height);
      ctx.fillStyle = '#ffcc00';
      ctx.fillRect(renderX, renderY + lavaWave, this.width, 4);
    } else if (this.type === HazardType.WATER) {
      const waterWave = Math.sin(this.animFrame * 0.1) * 2;
      ctx.fillStyle = 'rgba(0, 150, 255, 0.7)';
      ctx.fillRect(renderX, renderY + waterWave, this.width, this.height);
    }

    ctx.restore();
  }
}
