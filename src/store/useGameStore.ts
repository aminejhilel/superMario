import { create } from 'zustand';
import { GameState, GameSaveData } from '@/game/engine/Types';
import { SaveManager } from '@/game/systems/SaveManager';

interface GameStoreState {
  gameState: GameState;
  currentLevelId: number;
  score: number;
  coins: number;
  starsEarned: number;
  hp: number;
  maxHp: number;
  timeRemaining: number;
  levelCompletedData: {
    levelId: number;
    coinsCollected: number;
    enemiesDefeated: number;
    starsCollected: number;
    timeBonus: number;
    totalScore: number;
  } | null;
  saveData: GameSaveData;
  touchControlsActive: boolean;

  // Actions
  setGameState: (state: GameState) => void;
  startLevel: (levelId: number) => void;
  updateHUD: (hp: number, coins: number, score: number, time: number) => void;
  setSaveData: (data: GameSaveData) => void;
  updateSettings: (settings: Partial<GameSaveData['settings']>) => void;
  completeLevel: (coins: number, enemies: number, stars: number, timeBonus: number) => void;
  setTouchControlsActive: (active: boolean) => void;
}

const defaultSaveData: GameSaveData = {
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

export const useGameStore = create<GameStoreState>((set, get) => ({
  gameState: GameState.MENU,
  currentLevelId: 1,
  score: 0,
  coins: 0,
  starsEarned: 0,
  hp: 3,
  maxHp: 3,
  timeRemaining: 180,
  levelCompletedData: null,
  saveData: SaveManager.loadSaveData() || defaultSaveData,
  touchControlsActive: false,

  setGameState: (state) => set({ gameState: state }),

  startLevel: (levelId) => set({
    currentLevelId: levelId,
    gameState: GameState.PLAYING,
    score: 0,
    coins: 0,
    hp: 3,
    levelCompletedData: null,
  }),

  updateHUD: (hp, coins, score, time) => set({
    hp,
    coins,
    score,
    timeRemaining: Math.max(0, Math.ceil(time)),
  }),

  setSaveData: (data) => {
    SaveManager.writeSaveData(data);
    set({ saveData: data });
  },

  updateSettings: (newSettings) => {
    const current = get().saveData;
    const updated: GameSaveData = {
      ...current,
      settings: { ...current.settings, ...newSettings },
    };
    SaveManager.writeSaveData(updated);
    set({ saveData: updated });
  },

  completeLevel: (coins, enemies, stars, timeBonus) => {
    const { currentLevelId, saveData } = get();
    const totalScore = (coins * 50) + (enemies * 100) + (stars * 500) + timeBonus;

    const currentLevelStars = saveData.completedLevels[currentLevelId]?.stars || 0;
    const currentLevelScore = saveData.completedLevels[currentLevelId]?.highScore || 0;

    const newCompleted = {
      ...saveData.completedLevels,
      [currentLevelId]: {
        stars: Math.max(currentLevelStars, stars),
        highScore: Math.max(currentLevelScore, totalScore),
      },
    };

    // Calculate next unlocked world
    let newUnlockedWorld = saveData.unlockedWorld;
    if (currentLevelId === 1 && newUnlockedWorld < 2) newUnlockedWorld = 2;
    if (currentLevelId === 2 && newUnlockedWorld < 3) newUnlockedWorld = 3;
    if (currentLevelId === 3 && newUnlockedWorld < 4) newUnlockedWorld = 4;
    if (currentLevelId === 4 && newUnlockedWorld < 5) newUnlockedWorld = 5;

    const updatedSave: GameSaveData = {
      ...saveData,
      unlockedWorld: newUnlockedWorld,
      completedLevels: newCompleted,
      totalCoins: saveData.totalCoins + coins,
      totalStars: Object.values(newCompleted).reduce((acc, curr) => acc + curr.stars, 0),
    };

    SaveManager.writeSaveData(updatedSave);

    set({
      saveData: updatedSave,
      levelCompletedData: {
        levelId: currentLevelId,
        coinsCollected: coins,
        enemiesDefeated: enemies,
        starsCollected: stars,
        timeBonus,
        totalScore,
      },
      gameState: currentLevelId === 5 ? GameState.VICTORY : GameState.LEVEL_COMPLETE,
    });
  },

  setTouchControlsActive: (active) => set({ touchControlsActive: active }),
}));
