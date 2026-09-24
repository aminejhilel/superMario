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
  text?: string;
  isRing?: boolean;
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
      if (p.text) {
        ctx.fillStyle = p.color;
        ctx.font = '12px var(--font-pixel), sans-serif';
        ctx.fillText(p.text, p.x - cameraX, p.y - cameraY);
      } else if (p.isRing) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x - cameraX, p.y - cameraY, p.size, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - cameraX, p.y - cameraY, p.size, p.size);
      }
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

  public addAmbientParticles(theme: string, camX: number, camY: number, width: number, height: number) {
    if (this.particles.length > 120) return;

    if (theme === 'green_valley') {
      // Petals & Pollen
      this.particles.push({
        x: camX + Math.random() * width,
        y: camY + Math.random() * height * 0.7,
        vx: (Math.random() - 0.3) * 1.5,
        vy: Math.random() * 0.8 + 0.2,
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#f472b6' : '#fef08a',
        alpha: 0.8,
        decay: 0.005,
      });
    } else if (theme === 'crystal_cave') {
      // Bioluminescent Crystal Dust
      this.particles.push({
        x: camX + Math.random() * width,
        y: camY + Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 0.6 - 0.2,
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#a855f7' : '#38bdf8',
        alpha: 0.9,
        decay: 0.008,
      });
    } else if (theme === 'volcanic_land') {
      // Fiery Embers
      this.particles.push({
        x: camX + Math.random() * width,
        y: camY + height + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 2.5 - 1.0,
        size: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? '#f97316' : '#ef4444',
        alpha: 1.0,
        decay: 0.01,
      });
    } else if (theme === 'sky_islands') {
      // Floating Stars / Clouds
      this.particles.push({
        x: camX + Math.random() * width,
        y: camY + Math.random() * (height * 0.5),
        vx: (Math.random() - 0.2) * 1.2,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 2,
        color: '#ffffff',
        alpha: 0.85,
        decay: 0.006,
      });
    } else if (theme === 'drako_castle') {
      // Crimson Gothic Embers
      this.particles.push({
        x: camX + Math.random() * width,
        y: camY + Math.random() * height,
        vx: (Math.random() - 0.5) * 1.0,
        vy: -Math.random() * 1.2 - 0.3,
        size: Math.random() * 3 + 2,
        color: '#e11d48',
        alpha: 0.9,
        decay: 0.008,
      });
    }
  }

  public addJumpDust(x: number, y: number) {
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + 2,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -Math.random() * 2.0,
        size: Math.random() * 4 + 2,
        color: '#cbd5e1',
        alpha: 0.9,
        decay: 0.04,
      });
    }
  }

  public addCoinSparkle(x: number, y: number) {
    // Ring shockwave
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      size: 4,
      color: '#fde047',
      alpha: 1.0,
      decay: 0.05,
      isRing: true,
    });

    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 3.5,
        vy: (Math.random() - 0.5) * 3.5 - 1.5,
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#fbbf24' : '#ffffff',
        alpha: 1,
        decay: 0.03,
      });
    }
  }

  public addExplosion(x: number, y: number, color: string = '#ef4444', count: number = 22) {
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      size: 6,
      color,
      alpha: 1.0,
      decay: 0.06,
      isRing: true,
    });

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 1.5;
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
      color: '#38bdf8',
      alpha: 0.9,
      decay: 0.06,
    });
  }

  public addComboTextParticle(x: number, y: number, text: string, color: string = '#fbbf24') {
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: -1.5,
      size: 14,
      color,
      alpha: 1,
      decay: 0.02,
      text,
    });
  }
}
