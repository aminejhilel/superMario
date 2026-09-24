export class PixelArtAssets {
  // Render Neo (Hero Player) with rich pixel details, armor glow, flowing scarf, visor shine & thruster flame
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

    // Magnet Magnetic Pulse Aura
    if (magnetTimer > 0) {
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, width * 1.15 + Math.sin(animFrame * 0.3) * 5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(236, 72, 153, 0.12)';
      ctx.fill();
    }

    // Shadow drop beneath player
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.beginPath();
    ctx.ellipse(0, height / 2 - 2, width * 0.4, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. Dynamic Flowing Scarf / Cape (Red with Gold Edge)
    const scarfWave = Math.sin(animFrame * 0.35) * 6;
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.moveTo(pX + 6, pY + 12);
    ctx.lineTo(pX - 10 + scarfWave, pY + 14 + scarfWave);
    ctx.lineTo(pX - 12 + scarfWave, pY + 22 + scarfWave);
    ctx.lineTo(pX + 8, pY + 18);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(pX - 11 + scarfWave, pY + 18 + scarfWave, 4, 3);

    // 2. Body Armor Suit (Cyan/Indigo Cyber Suit)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(pX + 8, pY + 12, 16, 13);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(pX + 11, pY + 13, 10, 11);

    // Glowing Chest Emblem Core
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(pX + 14, pY + 16, 4, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pX + 15, pY + 17, 2, 2);

    // 3. Helmet & Visor (Golden Hero Helmet with Neon Visor)
    ctx.fillStyle = '#d97706';
    ctx.fillRect(pX + 7, pY + 2, 18, 11);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(pX + 9, pY + 3, 14, 9);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(pX + 10, pY + 2, 8, 2); // Top helmet shine

    // Visor (Glowing Cyan/Electric Blue with diagonal glint)
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(pX + 14, pY + 5, 10, 5);
    ctx.fillStyle = '#a5f3fc';
    ctx.fillRect(pX + 16, pY + 6, 4, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pX + 22, pY + 5, 2, 2);

    // 4. Thruster Flames on Boots (JUMP / FALL state)
    if (state === 'JUMP' || state === 'FALL') {
      const flameHeight = Math.random() * 8 + 4;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(pX + 8, pY + 29, 4, flameHeight);
      ctx.fillRect(pX + 18, pY + 29, 4, flameHeight);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(pX + 9, pY + 29, 2, flameHeight * 0.7);
      ctx.fillRect(pX + 19, pY + 29, 2, flameHeight * 0.7);
    }

    // 5. Legs & Armored Boots
    ctx.fillStyle = '#0f172a';
    if (state === 'RUN') {
      const legOffset = Math.sin(animFrame * 0.45) * 6;
      ctx.fillRect(pX + 8, pY + 24, 6, 7 + legOffset);
      ctx.fillRect(pX + 18, pY + 24, 6, 7 - legOffset);
      // Golden boot caps
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(pX + 6, pY + 29 + legOffset, 8, 4);
      ctx.fillRect(pX + 18, pY + 29 - legOffset, 8, 4);
    } else if (state === 'JUMP' || state === 'FALL') {
      ctx.fillRect(pX + 8, pY + 24, 6, 6);
      ctx.fillRect(pX + 18, pY + 22, 6, 6);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(pX + 7, pY + 28, 8, 4);
      ctx.fillRect(pX + 17, pY + 26, 8, 4);
    } else {
      ctx.fillRect(pX + 8, pY + 24, 6, 7);
      ctx.fillRect(pX + 18, pY + 24, 6, 7);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(pX + 7, pY + 29, 8, 4);
      ctx.fillRect(pX + 17, pY + 29, 8, 4);
    }

    // 6. Gauntlets & Arm Attacks
    if (state === 'ATTACK' || state === 'SUPER_ATTACK') {
      // Extended Energy Arm
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(pX + 20, pY + 11, 14, 7);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(pX + 22, pY + 12, 10, 5);

      // Plasma Blast Energy Ring at hand
      ctx.fillStyle = state === 'SUPER_ATTACK' ? '#c084fc' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(pX + 34, pY + 14, 7 + Math.sin(animFrame * 0.5) * 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(pX + 10, pY + 16, 6, 6);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(pX + 10, pY + 20, 6, 3);
    }

    // 7. Shield Energy Bubble
    if (shieldActive) {
      const shieldGlow = Math.sin(animFrame * 0.25) * 3;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.72 + shieldGlow, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.fill();

      // Hexagon grid lines on shield
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Render Slime Enemy with jelly translucent effect & cute glowing eyes
  public static drawSlime(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    const squish = Math.sin(animFrame * 0.25) * 4;
    const sX = x;
    const sY = y + squish;
    const sW = width;
    const sH = height - squish;

    ctx.save();
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x + width / 2, y + height - 2, width / 2, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Outer Slime Body
    const slimeGrad = ctx.createLinearGradient(sX, sY, sX, sY + sH);
    slimeGrad.addColorStop(0, '#86efac');
    slimeGrad.addColorStop(0.5, '#22c55e');
    slimeGrad.addColorStop(1, '#15803d');
    ctx.fillStyle = slimeGrad;
    ctx.beginPath();
    ctx.ellipse(sX + sW / 2, sY + sH / 2, sW / 2, sH / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Gloss Shine Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    ctx.ellipse(sX + sW * 0.35, sY + sH * 0.3, sW * 0.2, sH * 0.12, -Math.PI / 6, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (Big Anime Style)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sX + 8, sY + 8, 6, 7);
    ctx.fillRect(sX + 18, sY + 8, 6, 7);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(sX + 10, sY + 10, 4, 4);
    ctx.fillRect(sX + 20, sY + 10, 4, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sX + 10, sY + 10, 2, 2);
    ctx.fillRect(sX + 20, sY + 10, 2, 2);

    ctx.restore();
  }

  // Render Flying Bat Enemy with wing membrane detail
  public static drawFlyingBat(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    const wingFlap = Math.sin(animFrame * 0.45) * 10;
    const bX = x + width / 2;
    const bY = y + height / 2;

    ctx.save();

    // Wings (Dark Violet with Glowing Edge)
    ctx.fillStyle = '#6b21a8';
    ctx.beginPath();
    ctx.moveTo(bX, bY);
    ctx.lineTo(bX - width * 0.7, bY - wingFlap);
    ctx.lineTo(bX - width * 0.3, bY + 8);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(bX, bY);
    ctx.lineTo(bX + width * 0.7, bY - wingFlap);
    ctx.lineTo(bX + width * 0.3, bY + 8);
    ctx.closePath();
    ctx.fill();

    // Body
    const bodyGrad = ctx.createRadialGradient(bX, bY, 2, bX, bY, width / 3);
    bodyGrad.addColorStop(0, '#c084fc');
    bodyGrad.addColorStop(1, '#581c87');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.arc(bX, bY, width / 3, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.fillStyle = '#581c87';
    ctx.beginPath();
    ctx.moveTo(bX - 6, bY - 6);
    ctx.lineTo(bX - 10, bY - 16);
    ctx.lineTo(bX - 2, bY - 8);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(bX + 6, bY - 6);
    ctx.lineTo(bX + 10, bY - 16);
    ctx.lineTo(bX + 2, bY - 8);
    ctx.fill();

    // Glowing Crimson Eyes & Fangs
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(bX - 6, bY - 3, 4, 4);
    ctx.fillRect(bX + 2, bY - 3, 4, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bX - 3, bY + 4, 2, 3);
    ctx.fillRect(bX + 1, bY + 4, 2, 3);

    ctx.restore();
  }

  // Render Rock Monster Enemy with cracked magma veins
  public static drawRockMonster(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.save();
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(x + 2, y + height - 3, width - 4, 4);

    // Stone Body
    ctx.fillStyle = '#475569';
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = '#334155';
    ctx.fillRect(x + 3, y + 3, width - 6, height - 6);

    // Jagged Rock Highlights
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x + 2, y + 2, 12, 10);
    ctx.fillRect(x + 22, y + 16, 12, 12);

    // Magma Veins
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 6, y + 14);
    ctx.lineTo(x + 14, y + 22);
    ctx.lineTo(x + 24, y + 18);
    ctx.stroke();

    // Glowing Yellow Eyes
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(x + 8, y + 8, 8, 5);
    ctx.fillRect(x + 24, y + 8, 8, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 10, y + 9, 3, 3);
    ctx.fillRect(x + 26, y + 9, 3, 3);

    ctx.restore();
  }

  // Render Fire Creature Enemy with multi-layer flames
  public static drawFireCreature(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    const flameHeight = Math.sin(animFrame * 0.35) * 6;
    const fX = x + width / 2;
    const fY = y + height / 2;

    ctx.save();

    // Outer Red Flame Aura
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.beginPath();
    ctx.arc(fX, fY, width / 2 + 4, 0, Math.PI * 2);
    ctx.fill();

    // Main Orange Flame Core
    const fireGrad = ctx.createRadialGradient(fX, fY, 2, fX, fY, width / 2);
    fireGrad.addColorStop(0, '#fef08a');
    fireGrad.addColorStop(0.4, '#f97316');
    fireGrad.addColorStop(1, '#dc2626');
    ctx.fillStyle = fireGrad;
    ctx.beginPath();
    ctx.ellipse(fX, fY - flameHeight / 2, width / 2 - 2, height / 2 + flameHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flame Tongue Top
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(fX - 8, fY - 6);
    ctx.lineTo(fX, fY - height / 2 - flameHeight);
    ctx.lineTo(fX + 8, fY - 6);
    ctx.fill();

    // Angry Dark Eyes
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(fX - 10, fY - 4, 6, 8);
    ctx.fillRect(fX + 4, fY - 4, 6, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fX - 8, fY - 2, 3, 3);
    ctx.fillRect(fX + 6, fY - 2, 3, 3);

    ctx.restore();
  }

  // Render Drako (Final Boss) with wings, scales, crown horns, & phase aura
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

    let primaryColor = '#991b1b';
    let secondaryColor = '#7f1d1d';
    let auraColor = 'rgba(239, 68, 68, 0.35)';
    let eyeColor = '#ef4444';

    if (phase === 2) {
      primaryColor = '#c2410c';
      secondaryColor = '#9a3412';
      auraColor = 'rgba(249, 115, 22, 0.5)';
      eyeColor = '#facc15';
    } else if (phase === 3) {
      primaryColor = '#7e22ce';
      secondaryColor = '#581c87';
      auraColor = 'rgba(168, 85, 247, 0.7)';
      eyeColor = '#38bdf8';
    }

    // Outer Boss Power Pulse Aura
    const pulseSize = Math.sin(animFrame * 0.25) * 8;
    ctx.fillStyle = auraColor;
    ctx.beginPath();
    ctx.arc(0, 0, width * 0.72 + pulseSize, 0, Math.PI * 2);
    ctx.fill();

    const dX = -width / 2;
    const dY = -height / 2;

    // Wing Flap Physics
    const wingFlap = Math.sin(animFrame * 0.25) * 12;
    ctx.fillStyle = secondaryColor;

    // Left Wing
    ctx.beginPath();
    ctx.moveTo(dX + 15, dY + 30);
    ctx.lineTo(dX - 35, dY + 5 - wingFlap);
    ctx.lineTo(dX - 15, dY + 45);
    ctx.lineTo(dX + 15, dY + 60);
    ctx.closePath();
    ctx.fill();

    // Right Wing
    ctx.beginPath();
    ctx.moveTo(dX + width - 15, dY + 30);
    ctx.lineTo(dX + width + 35, dY + 5 - wingFlap);
    ctx.lineTo(dX + width + 15, dY + 45);
    ctx.lineTo(dX + width - 15, dY + 60);
    ctx.closePath();
    ctx.fill();

    // Main Dragon Body
    ctx.fillStyle = primaryColor;
    ctx.fillRect(dX + 12, dY + 18, width - 24, height - 26);

    // Scales Belly Overlay
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(dX + 22, dY + 32, width - 44, height - 42);

    // Golden Horns
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(dX + 12, dY + 18);
    ctx.lineTo(dX + 2, dY - 8);
    ctx.lineTo(dX + 22, dY + 12);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(dX + width - 12, dY + 18);
    ctx.lineTo(dX + width - 2, dY - 8);
    ctx.lineTo(dX + width - 22, dY + 12);
    ctx.fill();

    // Fiery Eyes
    ctx.fillStyle = eyeColor;
    ctx.fillRect(dX + 20, dY + 22, 14, 9);
    ctx.fillRect(dX + width - 34, dY + 22, 14, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(dX + 24, dY + 24, 4, 4);
    ctx.fillRect(dX + width - 30, dY + 24, 4, 4);

    // Sharp Teeth Mouth
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(dX + 20, dY + 44, width - 40, 10);
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(dX + 22 + i * 10, dY + 44, 4, 5);
      ctx.fillRect(dX + 26 + i * 10, dY + 49, 4, 5);
    }

    ctx.restore();
  }

  // Render 3D Gold / Crystal Coins with specular glint & metallic spin
  public static drawCoin(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, type: string, animFrame: number) {
    ctx.save();
    const spin = Math.sin(animFrame * 0.22);
    ctx.translate(x + width / 2, y + height / 2);
    ctx.scale(Math.max(0.15, Math.abs(spin)), 1);

    let coinColor = '#f59e0b';
    let innerColor = '#fbbf24';
    if (type === 'COIN_CRYSTAL') {
      coinColor = '#0284c7';
      innerColor = '#38bdf8';
    } else if (type === 'COIN_GOLD') {
      coinColor = '#d97706';
      innerColor = '#fef08a';
    }

    // Outer Ring
    ctx.fillStyle = coinColor;
    ctx.beginPath();
    ctx.arc(0, 0, width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Inner Specular Face
    ctx.fillStyle = innerColor;
    ctx.beginPath();
    ctx.arc(0, 0, width / 2 - 3, 0, Math.PI * 2);
    ctx.fill();

    // Coin Symbol / Star Stamping
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-2, -5, 4, 10);

    ctx.restore();
  }

  // Render Glowing 5-pointed Crystal Star with outer neon halo
  public static drawCrystalStar(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, animFrame: number) {
    ctx.save();
    const floatY = Math.sin(animFrame * 0.12) * 5;
    ctx.translate(x + width / 2, y + height / 2 + floatY);
    ctx.rotate(animFrame * 0.04);

    // Glowing Halo
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.beginPath();
    ctx.arc(0, 0, width * 0.75, 0, Math.PI * 2);
    ctx.fill();

    // Star Geometry
    ctx.fillStyle = '#38bdf8';
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

    // White Core Highlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Render Power-up container box with rotating holographic icon
  public static drawPowerUp(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, type: string) {
    ctx.save();
    ctx.translate(x, y);

    let bgColor = '#0ea5e9';
    let icon = '⚡';
    if (type === 'SHIELD') {
      bgColor = '#0284c7';
      icon = '🛡️';
    } else if (type === 'SPEED_BOOST') {
      bgColor = '#eab308';
      icon = '⚡';
    } else if (type === 'DOUBLE_JUMP') {
      bgColor = '#a855f7';
      icon = '🦘';
    } else if (type === 'HEALTH') {
      bgColor = '#f43f5e';
      icon = '❤️';
    } else if (type === 'MAGNET') {
      bgColor = '#ec4899';
      icon = '🧲';
    }

    // Outer Glass Container
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, width, height);

    // Top Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(2, 2, width - 4, 4);

    // Hovering Icon
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, width / 2, height / 2);

    ctx.restore();
  }

  // Render Checkpoint Flag with metal pole and animated flag wave
  public static drawCheckpoint(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, activated: boolean) {
    ctx.save();

    // Metal Pole
    ctx.fillStyle = '#64748b';
    ctx.fillRect(x + 4, y, 6, height);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(x + 5, y, 2, height);

    // Pole Top Ornament
    ctx.fillStyle = activated ? '#22c55e' : '#f43f5e';
    ctx.beginPath();
    ctx.arc(x + 7, y, 5, 0, Math.PI * 2);
    ctx.fill();

    // Waving Flag Banner
    const flagGrad = ctx.createLinearGradient(x + 10, y, x + width, y);
    if (activated) {
      flagGrad.addColorStop(0, '#22c55e');
      flagGrad.addColorStop(1, '#4ade80');
    } else {
      flagGrad.addColorStop(0, '#e11d48');
      flagGrad.addColorStop(1, '#fb7185');
    }

    ctx.fillStyle = flagGrad;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 4);
    ctx.lineTo(x + width + 4, y + 14);
    ctx.lineTo(x + 10, y + 24);
    ctx.closePath();
    ctx.fill();

    // Star Symbol on Flag
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 14, y + 12, 4, 4);

    ctx.restore();
  }
}
