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

    // Platform Body
    ctx.fillStyle = this.color;
    ctx.fillRect(renderX, renderY, this.width, this.height);

    // Platform Top Bevel Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(renderX, renderY, this.width, 4);

    // Platform Outline
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(renderX, renderY, this.width, this.height);

    ctx.restore();
  }
}
