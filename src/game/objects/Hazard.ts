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
      // Metallic Spikes with Tip Shimmer
      const spikeWidth = 14;
      const spikeCount = Math.floor(this.width / spikeWidth);

      for (let i = 0; i < spikeCount; i++) {
        const sX = renderX + i * spikeWidth;

        // Shadow behind spike
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(sX + 2, renderY + this.height);
        ctx.lineTo(sX + spikeWidth / 2 + 2, renderY + 2);
        ctx.lineTo(sX + spikeWidth + 2, renderY + this.height);
        ctx.fill();

        // Main Metallic Spike Body
        const spikeGrad = ctx.createLinearGradient(sX, renderY, sX + spikeWidth, renderY + this.height);
        spikeGrad.addColorStop(0, '#f43f5e');
        spikeGrad.addColorStop(0.5, '#be123c');
        spikeGrad.addColorStop(1, '#881337');
        ctx.fillStyle = spikeGrad;

        ctx.beginPath();
        ctx.moveTo(sX, renderY + this.height);
        ctx.lineTo(sX + spikeWidth / 2, renderY);
        ctx.lineTo(sX + spikeWidth, renderY + this.height);
        ctx.closePath();
        ctx.fill();

        // Tip Glint Highlight
        ctx.fillStyle = '#fecdd3';
        ctx.beginPath();
        ctx.moveTo(sX + spikeWidth / 2 - 1, renderY + 2);
        ctx.lineTo(sX + spikeWidth / 2, renderY);
        ctx.lineTo(sX + spikeWidth / 2 + 1, renderY + 5);
        ctx.fill();
      }
    } else if (this.type === HazardType.LAVA) {
      // Multi-layer Glowing Lava Surface
      const lavaWave = Math.sin(this.animFrame * 0.12) * 4;

      // Base Lava Gradient
      const lavaGrad = ctx.createLinearGradient(renderX, renderY, renderX, renderY + this.height);
      lavaGrad.addColorStop(0, '#ef4444');
      lavaGrad.addColorStop(0.3, '#dc2626');
      lavaGrad.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(renderX, renderY + lavaWave, this.width, this.height);

      // Glowing Magma Surface Line
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(renderX, renderY + lavaWave, this.width, 5);

      // Bubbling Lava Circles
      const bubbleOffset = (this.animFrame * 2) % 30;
      ctx.fillStyle = '#f97316';
      for (let b = 10; b < this.width; b += 40) {
        ctx.beginPath();
        ctx.arc(renderX + b, renderY + lavaWave + 12 - (bubbleOffset % 8), 4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (this.type === HazardType.WATER) {
      // Semi-transparent Cresting Ocean/Lake Water
      const waterWave = Math.sin(this.animFrame * 0.1) * 3;

      const waterGrad = ctx.createLinearGradient(renderX, renderY, renderX, renderY + this.height);
      waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.75)');
      waterGrad.addColorStop(1, 'rgba(3, 105, 161, 0.85)');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(renderX, renderY + waterWave, this.width, this.height);

      // White Water Foam Line on top
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(renderX, renderY + waterWave, this.width, 3);
    }

    ctx.restore();
  }
}
