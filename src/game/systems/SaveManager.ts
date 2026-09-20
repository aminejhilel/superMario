import { GameSaveData } from '@/game/engine/Types';

const SAVE_KEY = 'pixel_quest_save_data_v1';

export class SaveManager {
  static loadSaveData(): GameSaveData | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error('Failed to load save data from localStorage:', e);
      return null;
    }
  }

  static writeSaveData(data: GameSaveData): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to write save data to localStorage:', e);
    }
  }

  static resetProgress(): GameSaveData {
    const defaultData: GameSaveData = {
      unlockedWorld: 1,
      completedLevels: {},
      totalCoins: 0,
      totalStars: 0,
      settings: {
        musicVolume: 0.7,
        sfxVolume: 0.8,
        showTouchControls: true,
      },
    };
    this.writeSaveData(defaultData);
    return defaultData;
  }
}
