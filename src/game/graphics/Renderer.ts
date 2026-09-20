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

    // 1. Draw Parallax Backgrounds based on Level Theme
    this.drawParallaxBackground(ctx, canvasWidth, canvasHeight, camera.x, camera.y, level.theme);

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
    this.drawFinishPortal(ctx, level.finishPortal.x - camera.x, level.finishPortal.y - camera.y, level.finishPortal.width, level.finishPortal.height, player.animFrame);

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

    // 11. Draw Boss HUD Bar if active in arena
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
      // Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#1c92d2');
      skyGrad.addColorStop(1, '#f2fcfe');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Distant Mountains (0.2x speed)
      ctx.fillStyle = '#689d6a';
      for (let i = -1; i < 4; i++) {
        const mX = i * 600 - camX * 0.2;
        ctx.beginPath();
        ctx.moveTo(mX, height);
        ctx.lineTo(mX + 300, height - 220);
        ctx.lineTo(mX + 600, height);
        ctx.fill();
      }

      // Layer 3: Clouds (0.3x speed)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      for (let i = -1; i < 6; i++) {
        const cX = i * 400 - camX * 0.3;
        ctx.beginPath();
        ctx.arc(cX, 100, 35, 0, Math.PI * 2);
        ctx.arc(cX + 30, 90, 45, 0, Math.PI * 2);
        ctx.arc(cX + 70, 100, 35, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (theme === 'crystal_cave') {
      // Dark Cave Background
      const caveGrad = ctx.createLinearGradient(0, 0, 0, height);
      caveGrad.addColorStop(0, '#0f0c29');
      caveGrad.addColorStop(1, '#24243e');
      ctx.fillStyle = caveGrad;
      ctx.fillRect(0, 0, width, height);

      // Glowing Background Crystals
      ctx.fillStyle = 'rgba(157, 78, 221, 0.3)';
      for (let i = -1; i < 8; i++) {
        const cryX = i * 350 - camX * 0.25;
        ctx.beginPath();
        ctx.moveTo(cryX, height - 80);
        ctx.lineTo(cryX + 20, height - 220);
        ctx.lineTo(cryX + 40, height - 80);
        ctx.fill();
      }
    } else if (theme === 'sky_islands') {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#4a00e0');
      skyGrad.addColorStop(1, '#8e2de2');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Floating Cloud Islands
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = -1; i < 6; i++) {
        const islX = i * 450 - camX * 0.2;
        ctx.fillRect(islX, 180, 200, 40);
      }
    } else if (theme === 'volcanic_land') {
      const lavaGrad = ctx.createLinearGradient(0, 0, 0, height);
      lavaGrad.addColorStop(0, '#200112');
      lavaGrad.addColorStop(1, '#4f000b');
      ctx.fillStyle = lavaGrad;
      ctx.fillRect(0, 0, width, height);

      // Glowing Lava Horizon
      ctx.fillStyle = 'rgba(255, 69, 0, 0.25)';
      ctx.fillRect(0, height - 200, width, 200);
    } else if (theme === 'drako_castle') {
      const castleGrad = ctx.createLinearGradient(0, 0, 0, height);
      castleGrad.addColorStop(0, '#0b0c10');
      castleGrad.addColorStop(1, '#1f2833');
      ctx.fillStyle = castleGrad;
      ctx.fillRect(0, 0, width, height);

      // Pillars / Gothic Windows in background
      ctx.fillStyle = 'rgba(255, 0, 85, 0.15)';
      for (let i = -1; i < 6; i++) {
        const pX = i * 400 - camX * 0.3;
        ctx.fillRect(pX, 80, 60, 280);
      }
    }

    ctx.restore();
  }

  private static drawFinishPortal(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(animFrame * 0.05);

    const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, width / 2);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#00ffff');
    grad.addColorStop(1, '#8a2be2');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  private static drawBossHealthBar(ctx: CanvasRenderingContext2D, canvasWidth: number, boss: Drako) {
    ctx.save();
    const barWidth = Math.min(400, canvasWidth - 80);
    const barHeight = 22;
    const barX = (canvasWidth - barWidth) / 2;
    const barY = 24;

    // Outer Frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(barX - 4, barY - 4, barWidth + 8, barHeight + 8);
    ctx.strokeStyle = '#ff0055';
    ctx.lineWidth = 2;
    ctx.strokeRect(barX - 4, barY - 4, barWidth + 8, barHeight + 8);

    // HP Fill
    const hpRatio = Math.max(0, boss.hp / boss.maxHp);
    const fillWidth = barWidth * hpRatio;
    ctx.fillStyle = boss.phase === 3 ? '#ff0000' : boss.phase === 2 ? '#ff6600' : '#ffcc00';
    ctx.fillRect(barX, barY, fillWidth, barHeight);

    // Boss Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px var(--font-pixel), sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`DRAKO (PHASE ${boss.phase}) - ${boss.hp} HP`, canvasWidth / 2, barY + 16);

    ctx.restore();
  }
}
