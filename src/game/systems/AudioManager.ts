export class AudioManager {
  private static ctx: AudioContext | null = null;
  private static musicNode: OscillatorNode | null = null;
  private static musicGainNode: GainNode | null = null;
  private static musicInterval: any = null;
  private static musicVolume: number = 0.7;
  private static sfxVolume: number = 0.8;
  private static isMuted: boolean = false;

  private static initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public static setVolumes(musicVol: number, sfxVol: number) {
    this.musicVolume = musicVol;
    this.sfxVolume = sfxVol;
    if (this.musicGainNode) {
      this.musicGainNode.gain.value = this.musicVolume * 0.15;
    }
  }

  public static playSFX(type: 'jump' | 'doublejump' | 'coin' | 'star' | 'laser' | 'hit' | 'damage' | 'powerup' | 'checkpoint' | 'win' | 'boss_roar') {
    this.initContext();
    if (!this.ctx || this.isMuted || this.sfxVolume <= 0) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const masterSfx = this.sfxVolume * 0.25;

    switch (type) {
      case 'jump':
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.12);
        gain.gain.setValueAtTime(masterSfx, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
        break;

      case 'doublejump':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.15);
        gain.gain.setValueAtTime(masterSfx, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;

      case 'coin':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(masterSfx, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;

      case 'star':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(masterSfx * 1.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
        break;

      case 'laser':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
        gain.gain.setValueAtTime(masterSfx * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
        break;

      case 'hit':
        osc.type = 'square';
        osc.frequency.setValueAtTime(250, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
        gain.gain.setValueAtTime(masterSfx, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;

      case 'damage':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(40, now + 0.25);
        gain.gain.setValueAtTime(masterSfx * 1.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;

      case 'powerup':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(masterSfx, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;

      case 'checkpoint':
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        gain.gain.setValueAtTime(masterSfx, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;

      case 'win':
        osc.type = 'triangle';
        const freqs = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        freqs.forEach((f, idx) => {
          osc.frequency.setValueAtTime(f, now + idx * 0.1);
        });
        gain.gain.setValueAtTime(masterSfx * 1.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
        break;

      case 'boss_roar':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.2);
        osc.frequency.linearRampToValueAtTime(50, now + 0.6);
        gain.gain.setValueAtTime(masterSfx * 1.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;
    }
  }

  public static playMusic(theme: 'green_valley' | 'crystal_cave' | 'sky_islands' | 'volcanic_land' | 'drako_castle' | 'menu') {
    this.stopMusic();
    this.initContext();
    if (!this.ctx || this.isMuted || this.musicVolume <= 0) return;

    let melody: number[];
    let tempo = 220; // ms per note

    switch (theme) {
      case 'menu':
      case 'green_valley':
        melody = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 349.23, 440.00, 587.33, 440.00, 349.23];
        tempo = 200;
        break;
      case 'crystal_cave':
        melody = [196.00, 246.94, 293.66, 392.00, 293.66, 246.94, 174.61, 220.00, 261.63, 349.23];
        tempo = 300;
        break;
      case 'sky_islands':
        melody = [329.63, 392.00, 493.88, 659.25, 493.88, 392.00, 349.23, 440.00, 523.25, 698.46];
        tempo = 180;
        break;
      case 'volcanic_land':
        melody = [146.83, 174.61, 220.00, 293.66, 220.00, 174.61, 130.81, 164.81, 196.00, 261.63];
        tempo = 220;
        break;
      case 'drako_castle':
        melody = [110.00, 130.81, 164.81, 220.00, 164.81, 130.81, 123.47, 146.83, 185.00, 246.94];
        tempo = 160;
        break;
    }

    let noteIdx = 0;
    this.musicInterval = setInterval(() => {
      if (!this.ctx || this.musicVolume <= 0) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const freq = melody[noteIdx % melody.length];
      osc.frequency.setValueAtTime(freq, now);

      const vol = this.musicVolume * 0.08;
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (tempo / 1000) * 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + (tempo / 1000) * 0.9);

      noteIdx++;
    }, tempo);
  }

  public static stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}
