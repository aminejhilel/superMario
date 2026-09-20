'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { RotateCcw, Map, Home } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';

export const GameOverModal: React.FC = () => {
  const { setGameState, startLevel, currentLevelId } = useGameStore();

  const handleRetry = () => {
    AudioManager.playSFX('coin');
    startLevel(currentLevelId);
  };

  const handleLevelSelect = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.LEVEL_SELECT);
  };

  const handleMainMenu = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.MENU);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-sm p-6 rounded-2xl border border-rose-500/40 text-center shadow-2xl">
        <h2 className="text-3xl font-pixel text-rose-500 mb-2 drop-shadow-[0_0_12px_rgba(255,0,85,0.6)]">
          GAME OVER
        </h2>
        <p className="text-sm font-sans-app text-slate-300 mb-6">Neo ran out of health! Don't give up!</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleRetry}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-amber-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> TRY AGAIN
          </button>

          <button
            onClick={handleLevelSelect}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-cyan-300 flex items-center justify-center gap-2"
          >
            <Map className="w-4 h-4" /> LEVEL SELECT
          </button>

          <button
            onClick={handleMainMenu}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-slate-400 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};
