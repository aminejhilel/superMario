export class Camera {
  public x: number = 0;
  public y: number = 0;
  public width: number;
  public height: number;
  private lerpSpeed: number = 0.1;

  constructor(viewportWidth: number, viewportHeight: number) {
    this.width = viewportWidth;
    this.height = viewportHeight;
  }

  public update(targetX: number, targetY: number, levelWidth: number, levelHeight: number, shakeOffset: { x: number; y: number } = { x: 0, y: 0 }) {
    const desiredX = targetX - this.width / 2;
    const desiredY = targetY - this.height / 2;

    this.x += (desiredX - this.x) * this.lerpSpeed;
    this.y += (desiredY - this.y) * this.lerpSpeed;

    // Clamp camera within level bounds
    this.x = Math.max(0, Math.min(this.x, levelWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, levelHeight - this.height));

    // Apply screen shake
    this.x += shakeOffset.x;
    this.y += shakeOffset.y;
  }
}
