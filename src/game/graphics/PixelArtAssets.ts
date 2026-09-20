export class PixelArtAssets {
  // Render Neo (Hero Player)
  public static drawPlayer(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    facingRight: boolean,
    animFrame: number,
    state: string,
    shieldActive: boolean = false,
    magnetTimer: number = 0
  ) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    if (!facingRight) {
      ctx.scale(-1, 1);
    }

    const pX = -width / 2;
    const pY = -height / 2;

    // Magnet Magnetic Ring Effect
    if (magnetTimer > 0) {
      ctx.strokeStyle = '#ff00ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, width * 1.1 + Math.sin(animFrame * 0.3) * 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Body suit (Neon Cyan / Gold adventurer suit)
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(pX + 8, pY + 12, 16, 14);

    // Head / Helmet (Bright Gold helmet with visor)
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(pX + 8, pY + 2, 16, 12);

    // Visor (Glowing Electric Blue)
    ctx.fillStyle = '#00d2ff';
    ctx.fillRect(pX + 16, pY + 5, 7, 4);

    // Red/Gold Cape (Moving dynamically)
    ctx.fillStyle = '#ff0055';
    const scarfOffset = Math.sin(animFrame * 0.3) * 3;
    ctx.fillRect(pX + 2, pY + 10 + scarfOffset, 8, 6);

    // Legs / Boots
    ctx.fillStyle = '#111827';
    if (state === 'RUN') {
      const legOffset = Math.sin(animFrame * 0.4) * 5;
      ctx.fillRect(pX + 8, pY + 24, 6, 8 + legOffset);
      ctx.fillRect(pX + 18, pY + 24, 6, 8 - legOffset);
      ctx.fillStyle = '#ff9900';
      ctx.fillRect(pX + 6, pY + 30 + legOffset, 8, 4);
      ctx.fillRect(pX + 18, pY + 30 - legOffset, 8, 4);
    } else if (state === 'JUMP' || state === 'FALL') {
      ctx.fillRect(pX + 8, pY + 24, 6, 6);
      ctx.fillRect(pX + 18, pY + 22, 6, 6);
      ctx.fillStyle = '#ff9900';
      ctx.fillRect(pX + 7, pY + 28, 8, 4);
      ctx.fillRect(pX + 17, pY + 26, 8, 4);
    } else {
      ctx.fillRect(pX + 8, pY + 24, 6, 8);
      ctx.fillRect(pX + 18, pY + 24, 6, 8);
      ctx.fillStyle = '#ff9900';
      ctx.fillRect(pX + 7, pY + 30, 8, 4);
      ctx.fillRect(pX + 17, pY + 30, 8, 4);
    }

    // Hands / Energy Gloves
    ctx.fillStyle = '#00ffff';
    if (state === 'ATTACK' || state === 'SUPER_ATTACK') {
      ctx.fillRect(pX + 22, pY + 10, 12, 8); // Arm blasting forward
    } else {
      ctx.fillRect(pX + 10, pY + 16, 6, 6);
    }

    // Shield Aura
    if (shieldActive) {
      ctx.strokeStyle = '#00ffff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(0, 255, 255, 0.15)';
      ctx.fill();
    }

    ctx.restore();
  }

  // Render Slime Enemy
  public static drawSlime(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    const squish = Math.sin(animFrame * 0.2) * 3;
    ctx.fillStyle = '#39ff14';
    ctx.beginPath();
    ctx.ellipse(x + width / 2, y + height / 2 + squish / 2, width / 2, height / 2 - squish / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 8, y + 8, 6, 6);
    ctx.fillRect(x + 18, y + 8, 6, 6);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 10, y + 10, 3, 3);
    ctx.fillRect(x + 20, y + 10, 3, 3);
  }

  // Render Flying Bat Enemy
  public static drawFlyingBat(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    const wingFlap = Math.sin(animFrame * 0.4) * 8;
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2, width / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + width / 2, y + height / 2);
    ctx.lineTo(x - 4, y + height / 2 - wingFlap);
    ctx.lineTo(x + width / 4, y + height / 2 + 4);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + width / 2, y + height / 2);
    ctx.lineTo(x + width + 4, y + height / 2 - wingFlap);
    ctx.lineTo(x + (width * 3) / 4, y + height / 2 + 4);
    ctx.fill();

    ctx.fillStyle = '#ff0055';
    ctx.fillRect(x + width / 2 - 5, y + height / 2 - 3, 3, 3);
    ctx.fillRect(x + width / 2 + 2, y + height / 2 - 3, 3, 3);
  }

  // Render Rock Monster Enemy
  public static drawRockMonster(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 4, y + 4, 12, 10);
    ctx.fillRect(x + 20, y + 18, 14, 14);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(x + 8, y + 10, 8, 4);
    ctx.fillRect(x + 24, y + 10, 8, 4);
  }

  // Render Fire Creature Enemy
  public static drawFireCreature(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    const flameHeight = Math.sin(animFrame * 0.3) * 4;
    ctx.fillStyle = '#ff4500';
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2 + 4, width / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2 - flameHeight, width / 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 10, y + 12, 4, 6);
    ctx.fillRect(x + 20, y + 12, 4, 6);
  }

  // Render Drako (Final Boss)
  public static drawDrako(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    phase: number,
    animFrame: number
  ) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);

    let primaryColor = '#800000';
    let auraColor = 'rgba(255, 0, 0, 0.3)';
    if (phase === 2) {
      primaryColor = '#990000';
      auraColor = 'rgba(255, 69, 0, 0.5)';
    } else if (phase === 3) {
      primaryColor = '#cc0000';
      auraColor = 'rgba(255, 215, 0, 0.7)';
    }

    ctx.fillStyle = auraColor;
    ctx.beginPath();
    ctx.arc(0, 0, width * 0.7 + Math.sin(animFrame * 0.2) * 5, 0, Math.PI * 2);
    ctx.fill();

    const dX = -width / 2;
    const dY = -height / 2;

    ctx.fillStyle = primaryColor;
    ctx.fillRect(dX + 10, dY + 20, width - 20, height - 30);

    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(dX + 8, dY + 2, 8, 18);
    ctx.fillRect(dX + width - 16, dY + 2, 8, 18);

    const wingFlap = Math.sin(animFrame * 0.2) * 10;
    ctx.fillStyle = '#4a0000';
    ctx.beginPath();
    ctx.moveTo(dX + 10, dY + 30);
    ctx.lineTo(dX - 25, dY + 10 - wingFlap);
    ctx.lineTo(dX + 10, dY + 60);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(dX + width - 10, dY + 30);
    ctx.lineTo(dX + width + 25, dY + 10 - wingFlap);
    ctx.lineTo(dX + width - 10, dY + 60);
    ctx.fill();

    ctx.fillStyle = phase === 3 ? '#ffff00' : '#ff0000';
    ctx.fillRect(dX + 18, dY + 25, 12, 8);
    ctx.fillRect(dX + width - 30, dY + 25, 12, 8);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(dX + 20, dY + 45, width - 40, 8);
    ctx.fillStyle = '#000000';
    ctx.fillRect(dX + 24, dY + 47, 4, 4);
    ctx.fillRect(dX + 36, dY + 47, 4, 4);
    ctx.fillRect(dX + 48, dY + 47, 4, 4);

    ctx.restore();
  }

  // Render Coins
  public static drawCoin(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, type: string, animFrame: number) {
    ctx.save();
    const spin = Math.sin(animFrame * 0.2);
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(spin, 1);

    if (type === 'COIN_CRYSTAL') {
      ctx.fillStyle = '#00ffff';
    } else if (type === 'COIN_GOLD') {
      ctx.fillStyle = '#ffe600';
    } else {
      ctx.fillStyle = '#ffaa00';
    }

    ctx.beginPath();
    ctx.arc(0, 0, width / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  // Render Crystal Star
  public static drawCrystalStar(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2 + Math.sin(animFrame * 0.1) * 4);
    ctx.rotate(animFrame * 0.05);

    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    const spikes = 5;
    const outerRadius = width / 2;
    const innerRadius = width / 4;
    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
      rot += step;
      ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  // Render Power-up
  public static drawPowerUp(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, type: string) {
    ctx.save();
    ctx.translate(x, y);

    let bgColor = '#00ffcc';
    let icon = '⚡';
    if (type === 'SHIELD') {
      bgColor = '#0099ff';
      icon = '🛡️';
    } else if (type === 'SPEED_BOOST') {
      bgColor = '#ffcc00';
      icon = '👟';
    } else if (type === 'DOUBLE_JUMP') {
      bgColor = '#ff00ff';
      icon = '🦘';
    } else if (type === 'HEALTH') {
      bgColor = '#ff3366';
      icon = '❤️';
    } else if (type === 'MAGNET') {
      bgColor = '#a855f7';
      icon = '🧲';
    }

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, width / 2, height / 2);

    ctx.restore();
  }

  // Render Checkpoint Flag
  public static drawCheckpoint(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, activated: boolean) {
    ctx.fillStyle = '#888888';
    ctx.fillRect(x + 4, y, 6, height);

    ctx.fillStyle = activated ? '#00ff66' : '#ff0055';
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 4);
    ctx.lineTo(x + width, y + 14);
    ctx.lineTo(x + 10, y + 24);
    ctx.closePath();
    ctx.fill();
  }
}
