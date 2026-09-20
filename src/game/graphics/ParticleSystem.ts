export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity?: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  public screenShakeTimer: number = 0;
  public screenShakeIntensity: number = 0;

  public update(dt: number) {
    if (this.screenShakeTimer > 0) {
      this.screenShakeTimer -= dt;
      if (this.screenShakeTimer <= 0) {
        this.screenShakeIntensity = 0;
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      if (p.gravity) {
        p.vy += p.gravity * dt * 60;
      }
      p.alpha -= p.decay * dt * 60;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number) {
    ctx.save();
    for (const p of this.particles) {
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - cameraX, p.y - cameraY, p.size, p.size);
    }
    ctx.restore();
  }

  public triggerScreenShake(duration: number = 0.3, intensity: number = 8) {
    this.screenShakeTimer = duration;
    this.screenShakeIntensity = intensity;
  }

  public getScreenShakeOffset(): { x: number; y: number } {
    if (this.screenShakeTimer <= 0) return { x: 0, y: 0 };
    return {
      x: (Math.random() - 0.5) * this.screenShakeIntensity * 2,
      y: (Math.random() - 0.5) * this.screenShakeIntensity * 2,
    };
  }

  public addJumpDust(x: number, y: number) {
    for (let i = 0; i < 8; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + 2,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 1.5,
        size: Math.random() * 4 + 2,
        color: '#ffffff',
        alpha: 0.8,
        decay: 0.04,
      });
    }
  }

  public addCoinSparkle(x: number, y: number) {
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1,
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#ffe600' : '#ffffff',
        alpha: 1,
        decay: 0.03,
      });
    }
  }

  public addExplosion(x: number, y: number, color: string = '#ff0055', count: number = 18) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 3,
        color,
        alpha: 1,
        decay: 0.03,
        gravity: 0.15,
      });
    }
  }

  public addEnergyTrail(x: number, y: number) {
    this.particles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 2,
      color: '#00ffff',
      alpha: 0.9,
      decay: 0.06,
    });
  }
}
