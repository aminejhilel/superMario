export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  run: boolean;
  attack: boolean;
  pause: boolean;
}

export class InputManager {
  private keys: Record<string, boolean> = {};
  private touchState: Partial<InputState> = {};
  private onPauseCallback?: () => void;

  constructor(onPause?: () => void) {
    this.onPauseCallback = onPause;
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
    }
  }

  public destroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    this.keys[e.key.toLowerCase()] = true;
    this.keys[e.code] = true;

    if (e.key === 'Escape' && this.onPauseCallback) {
      this.onPauseCallback();
    }
  };

  private handleKeyUp = (e: KeyboardEvent) => {
    this.keys[e.key.toLowerCase()] = false;
    this.keys[e.code] = false;
  };

  public setTouchInput(key: keyof InputState, active: boolean) {
    this.touchState[key] = active;
  }

  public getInput(): InputState {
    const left = !!(this.keys['a'] || this.keys['arrowleft'] || this.touchState.left);
    const right = !!(this.keys['d'] || this.keys['arrowright'] || this.touchState.right);
    const up = !!(this.keys['w'] || this.keys['arrowup'] || this.touchState.up);
    const down = !!(this.keys['s'] || this.keys['arrowdown'] || this.touchState.down);
    const jump = !!(this.keys[' '] || this.keys['space'] || this.keys['w'] || this.keys['arrowup'] || this.touchState.jump);
    const run = !!(this.keys['shift'] || this.keys['shiftleft'] || this.keys['shiftright'] || this.touchState.run);
    const attack = !!(this.keys['x'] || this.keys['j'] || this.touchState.attack);
    const pause = !!(this.keys['escape'] || this.touchState.pause);

    return { left, right, up, down, jump, run, attack, pause };
  }
}
