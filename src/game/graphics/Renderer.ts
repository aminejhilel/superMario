import { LevelConfig } from '@/game/engine/Types';
import { Camera } from '@/game/engine/Camera';
import { Player } from '@/game/entities/Player';
import { Enemy } from '@/game/entities/Enemy';
import { Drako } from '@/game/entities/Drako';
import { Projectile } from '@/game/entities/Projectile';
import { Platform } from '@/game/objects/Platform';
import { Hazard } from '@/game/objects/Hazard';
import { Collectible } from '@/game/objects/Collectible';
import { PowerUp } from '@/game/objects/PowerUp';
import { Checkpoint } from '@/game/objects/Checkpoint';
import { ParticleSystem } from './ParticleSystem';
import { PixelArtAssets } from './PixelArtAssets';

export class Renderer {
  public static render(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    level: LevelConfig,
    camera: Camera,
    player: Player,
    platforms: Platform[],
    hazards: Hazard[],
    collectibles: Collectible[],
    powerups: PowerUp[],
    checkpoints: Checkpoint[],
    enemies: Enemy[],
    projectiles: Projectile[],
    particles: ParticleSystem,
    boss?: Drako
  ) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 1. Draw Multi-layered Parallax Background
    this.drawParallaxBackground(ctx, canvasWidth, canvasHeight, camera.x, camera.y, level.theme);

    // Update ambient environment particles
    particles.addAmbientParticles(level.theme, camera.x, camera.y, canvasWidth, canvasHeight);

    // 2. Draw Hazards (Spikes, Lava, Water)
    hazards.forEach((h) => h.draw(ctx, camera.x, camera.y));

    // 3. Draw Platforms
    platforms.forEach((p) => p.draw(ctx, camera.x, camera.y));

    // 4. Draw Checkpoints
    checkpoints.forEach((c) => c.draw(ctx, camera.x, camera.y));

    // 5. Draw Collectibles & Powerups
    collectibles.forEach((c) => c.draw(ctx, camera.x, camera.y));
    powerups.forEach((pw) => pw.draw(ctx, camera.x, camera.y));

    // 6. Draw Finish Portal
    this.drawFinishPortal(
      ctx,
      level.finishPortal.x - camera.x,
      level.finishPortal.y - camera.y,
      level.finishPortal.width,
      level.finishPortal.height,
      player.animFrame
    );

    // 7. Draw Enemies & Boss
    enemies.forEach((e) => e.draw(ctx, camera.x, camera.y));

    // 8. Draw Projectiles
    projectiles.forEach((pr) => pr.draw(ctx, camera.x, camera.y));

    // 9. Draw Player Neo
    if (player.state !== 'DEAD') {
      PixelArtAssets.drawPlayer(
        ctx,
        player.x - camera.x,
        player.y - camera.y,
        player.width,
        player.height,
        player.facingRight,
        player.animFrame,
        player.state,
        player.shieldActive,
        player.magnetTimer
      );
    }

    // 10. Draw Particles
    particles.draw(ctx, camera.x, camera.y);

    // 11. Draw Atmospheric Lighting Overlay (Vignette & Ambient Glow)
    this.drawAtmosphericOverlay(ctx, canvasWidth, canvasHeight, level.theme);

    // 12. Draw Boss HUD Bar if active
    if (boss && boss.active) {
      this.drawBossHealthBar(ctx, canvasWidth, boss);
    }
  }

  private static drawParallaxBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    camX: number,
    camY: number,
    theme: string
  ) {
    ctx.save();

    if (theme === 'green_valley') {
      // Dynamic Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0284c7');
      skyGrad.addColorStop(0.6, '#38bdf8');
      skyGrad.addColorStop(1, '#bae6fd');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Sun God-Rays
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(width * 0.7, 0);
      ctx.lineTo(width * 0.4, height);
      ctx.lineTo(width * 0.9, height);
      ctx.fill();

      // Layer 1: Distant Snow Peaks (0.15x speed)
      ctx.fillStyle = '#475569';
      for (let i = -1; i < 4; i++) {
        const mX = i * 700 - camX * 0.15;
        ctx.beginPath();
        ctx.moveTo(mX, height);
        ctx.lineTo(mX + 350, height - 280);
        ctx.lineTo(mX + 700, height);
        ctx.fill();

        // Snow Cap
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(mX + 350, height - 280);
        ctx.lineTo(mX + 290, height - 210);
        ctx.lineTo(mX + 410, height - 210);
        ctx.fill();
        ctx.fillStyle = '#475569';
      }

      // Layer 2: Mid-ground Pine Hills (0.3x speed)
      ctx.fillStyle = '#15803d';
      for (let i = -1; i < 5; i++) {
        const hX = i * 500 - camX * 0.3;
        ctx.beginPath();
        ctx.arc(hX + 250, height + 80, 260, 0, Math.PI * 2);
        ctx.fill();
      }

      // Layer 3: Fluffy Clouds (0.4x speed)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      for (let i = -1; i < 6; i++) {
        const cX = i * 420 - camX * 0.4;
        ctx.beginPath();
        ctx.arc(cX, 90, 35, 0, Math.PI * 2);
        ctx.arc(cX + 30, 75, 45, 0, Math.PI * 2);
        ctx.arc(cX + 75, 90, 35, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (theme === 'crystal_cave') {
      // Dark Cave Gradient
      const caveGrad = ctx.createLinearGradient(0, 0, 0, height);
      caveGrad.addColorStop(0, '#090514');
      caveGrad.addColorStop(0.5, '#1e1b4b');
      caveGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = caveGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 1: Ceiling Stalactites (0.2x speed)
      ctx.fillStyle = '#312e81';
      for (let i = -1; i < 10; i++) {
        const stX = i * 180 - camX * 0.2;
        ctx.beginPath();
        ctx.moveTo(stX, 0);
        ctx.lineTo(stX + 30, 140);
        ctx.lineTo(stX + 60, 0);
        ctx.fill();
      }

      // Layer 2: Glowing Purple Crystal Pillars (0.3x speed)
      for (let i = -1; i < 8; i++) {
        const cryX = i * 380 - camX * 0.3;
        const cryGrad = ctx.createLinearGradient(cryX, height - 250, cryX + 50, height);
        cryGrad.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
        cryGrad.addColorStop(1, 'rgba(88, 28, 135, 0.2)');
        ctx.fillStyle = cryGrad;

        ctx.beginPath();
        ctx.moveTo(cryX, height - 60);
        ctx.lineTo(cryX + 25, height - 260);
        ctx.lineTo(cryX + 50, height - 60);
        ctx.fill();
      }
    } else if (theme === 'sky_islands') {
      // Sunset Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#312e81');
      skyGrad.addColorStop(0.5, '#7e22ce');
      skyGrad.addColorStop(1, '#c084fc');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Twinkling Stars Background
      ctx.fillStyle = '#ffffff';
      for (let s = 0; s < 40; s++) {
        const sX = (s * 87) % width;
        const sY = (s * 43) % (height * 0.6);
        ctx.fillRect(sX, sY, 2, 2);
      }

      // Distant Sky Islands (0.2x speed)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      for (let i = -1; i < 6; i++) {
        const islX = i * 460 - camX * 0.2;
        ctx.beginPath();
        ctx.ellipse(islX + 100, 190, 110, 25, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (theme === 'volcanic_land') {
      // Fiery Crimson Sky
      const lavaGrad = ctx.createLinearGradient(0, 0, 0, height);
      lavaGrad.addColorStop(0, '#180206');
      lavaGrad.addColorStop(0.6, '#450a0a');
      lavaGrad.addColorStop(1, '#7f1d1d');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(0, 0, width, height);

      // Jagged Volcano Peak Silhouettes (0.2x speed)
      ctx.fillStyle = '#1c1917';
      for (let i = -1; i < 5; i++) {
        const vX = i * 600 - camX * 0.2;
        ctx.beginPath();
        ctx.moveTo(vX, height);
        ctx.lineTo(vX + 300, height - 240);
        ctx.lineTo(vX + 600, height);
        ctx.fill();
      }

      // Glowing Magma Horizon Line
      ctx.fillStyle = 'rgba(249, 115, 22, 0.4)';
      ctx.fillRect(0, height - 160, width, 160);
    } else if (theme === 'drako_castle') {
      // Gothic Hall
      const castleGrad = ctx.createLinearGradient(0, 0, 0, height);
      castleGrad.addColorStop(0, '#09090b');
      castleGrad.addColorStop(1, '#18181b');
      ctx.fillStyle = castleGrad;
      ctx.fillRect(0, 0, width, height);

      // Stained Glass Windows & Columns (0.3x speed)
      ctx.fillStyle = 'rgba(225, 29, 72, 0.2)';
      for (let i = -1; i < 6; i++) {
        const pX = i * 380 - camX * 0.3;
        ctx.fillRect(pX, 70, 70, 300);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(pX + 85, 40, 40, 360);
        ctx.fillStyle = 'rgba(225, 29, 72, 0.2)';
      }
    }

    ctx.restore();
  }

  private static drawFinishPortal(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(animFrame * 0.06);

    // Swirling Outer Galaxy Portal Rings
    const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, width / 2 + 8);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, '#38bdf8');
    grad.addColorStop(0.8, '#a855f7');
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, width / 2 + 8, height / 2 + 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Swirling Star Arms
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, width * 0.4, 0, Math.PI * 1.5);
    ctx.stroke();

    ctx.restore();
  }

  private static drawAtmosphericOverlay(ctx: CanvasRenderingContext2D, width: number, height: number, theme: string) {
    ctx.save();
    // Edge Vignette
    const vigGrad = ctx.createRadialGradient(width / 2, height / 2, Math.max(width, height) * 0.4, width / 2, height / 2, Math.max(width, height) * 0.75);
    vigGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vigGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');

    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  private static drawBossHealthBar(ctx: CanvasRenderingContext2D, canvasWidth: number, boss: Drako) {
    ctx.save();
    const barWidth = Math.min(460, canvasWidth - 60);
    const barHeight = 24;
    const barX = (canvasWidth - barWidth) / 2;
    const barY = 28;

    // Outer Cyber Glass Frame
    ctx.fillStyle = 'rgba(9, 9, 11, 0.9)';
    ctx.fillRect(barX - 6, barY - 6, barWidth + 12, barHeight + 12);
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX - 6, barY - 6, barWidth + 12, barHeight + 12);

    // HP Fill Gradient
    const hpRatio = Math.max(0, boss.hp / boss.maxHp);
    const fillWidth = barWidth * hpRatio;

    const hpGrad = ctx.createLinearGradient(barX, 0, barX + barWidth, 0);
    if (boss.phase === 3) {
      hpGrad.addColorStop(0, '#c084fc');
      hpGrad.addColorStop(1, '#a855f7');
    } else if (boss.phase === 2) {
      hpGrad.addColorStop(0, '#f97316');
      hpGrad.addColorStop(1, '#ea580c');
    } else {
      hpGrad.addColorStop(0, '#f43f5e');
      hpGrad.addColorStop(1, '#e11d48');
    }

    ctx.fillStyle = hpGrad;
    ctx.fillRect(barX, barY, fillWidth, barHeight);

    // Top Gloss Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.fillRect(barX, barY, fillWidth, 4);

    // Boss Title & HP text
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px var(--font-pixel), sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`DRAKO (PHASE ${boss.phase}) - ${boss.hp} HP`, canvasWidth / 2, barY + 17);

    ctx.restore();
  }
}
