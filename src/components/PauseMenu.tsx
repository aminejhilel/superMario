'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Play, RotateCcw, Settings, Home } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';

export const PauseMenu: React.FC = () => {
  const { setGameState, startLevel, currentLevelId } = useGameStore();

  const handleResume = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.PLAYING);
  };

  const handleRestart = () => {
    AudioManager.playSFX('coin');
    startLevel(currentLevelId);
  };

  const handleSettings = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.SETTINGS);
  };

  const handleMainMenu = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.MENU);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-sm p-6 rounded-2xl border border-cyan-500/40 text-center shadow-2xl">
        <h2 className="text-2xl font-pixel text-cyan-400 mb-6 tracking-wide">GAME PAUSED</h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleResume}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-amber-300 flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-amber-300" /> RESUME
          </button>

          <button
            onClick={handleRestart}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-cyan-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> RESTART LEVEL
          </button>

          <button
            onClick={handleSettings}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-slate-300 flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4 text-slate-400" /> SETTINGS
          </button>

          <button
            onClick={handleMainMenu}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-rose-300 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-rose-400" /> MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};
