import { BoundingBox, PlatformData, PlatformType } from '@/game/engine/Types';

export class Platform implements BoundingBox {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public type: PlatformType;
  public color: string;
  private startX: number;
  private startY: number;
  private moveDistance: number;
  private moveSpeed: number;
  private time: number = 0;

  constructor(data: PlatformData) {
    this.x = data.x;
    this.y = data.y;
    this.width = data.width;
    this.height = data.height;
    this.type = data.type;
    this.color = data.color || '#44aa44';
    this.startX = data.x;
    this.startY = data.y;
    this.moveDistance = data.moveDistance || 100;
    this.moveSpeed = data.moveSpeed || 1;
  }

  public update(dt: number) {
    if (this.type === PlatformType.MOVING_HORIZ) {
      this.time += dt * this.moveSpeed * 2;
      this.x = this.startX + Math.sin(this.time) * this.moveDistance;
    } else if (this.type === PlatformType.MOVING_VERT) {
      this.time += dt * this.moveSpeed * 2;
      this.y = this.startY + Math.sin(this.time) * this.moveDistance;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    const renderX = this.x - cameraX;
    const renderY = this.y - cameraY;

    // Platform Base Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(renderX + 2, renderY + 4, this.width, this.height);

    // Platform Body Fill
    ctx.fillStyle = this.color;
    ctx.fillRect(renderX, renderY, this.width, this.height);

    // Inner Brick Grid Pattern for Large Platforms
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1;
    const tileSize = 24;
    for (let bx = 0; bx < this.width; bx += tileSize) {
      for (let by = 0; by < this.height; by += tileSize) {
        ctx.strokeRect(renderX + bx, renderY + by, tileSize, tileSize);
      }
    }

    // Top Highlight Fringe (Grass / Crystals / Gold Trim based on color)
    if (this.color.includes('22c55e') || this.color.includes('44aa44') || this.color.includes('green') || this.color === '#2e7d32') {
      // Grass Top
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(renderX, renderY, this.width, 6);
      ctx.fillStyle = '#16a34a';
      // Little grass blades along top
      for (let g = 0; g < this.width; g += 8) {
        ctx.fillRect(renderX + g, renderY - 2, 4, 4);
      }
    } else if (this.color.includes('9333ea') || this.color.includes('purple') || this.color.includes('cave')) {
      // Crystal Edge
      ctx.fillStyle = '#c084fc';
      ctx.fillRect(renderX, renderY, this.width, 6);
      ctx.fillStyle = '#38bdf8';
      for (let c = 0; c < this.width; c += 16) {
        ctx.fillRect(renderX + c, renderY - 3, 5, 5);
      }
    } else if (this.color.includes('b91c1c') || this.color.includes('lava') || this.color.includes('volcanic')) {
      // Volcanic Lava Edge
      ctx.fillStyle = '#f97316';
      ctx.fillRect(renderX, renderY, this.width, 6);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(renderX, renderY + 6, this.width, 3);
    } else {
      // General Bevel Highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.fillRect(renderX, renderY, this.width, 4);
    }

    // Platform Outer Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(renderX, renderY, this.width, this.height);

    // One-Way Indicator Dots / Arrows
    if (this.type === PlatformType.ONE_WAY) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      for (let i = 8; i < this.width - 8; i += 20) {
        ctx.beginPath();
        ctx.moveTo(renderX + i, renderY + 8);
        ctx.lineTo(renderX + i + 4, renderY + 4);
        ctx.lineTo(renderX + i + 8, renderY + 8);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}
