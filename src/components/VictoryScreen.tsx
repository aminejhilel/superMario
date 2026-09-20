'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Trophy, Star, Home, RotateCcw } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';
import confetti from 'canvas-confetti';

export const VictoryScreen: React.FC = () => {
  const { setGameState, saveData, startLevel } = useGameStore();

  useEffect(() => {
    AudioManager.playSFX('win');
    // Epic victory fireworks confetti sequence
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handleMainMenu = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.MENU);
  };

  const handlePlayAgain = () => {
    AudioManager.playSFX('coin');
    startLevel(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 text-center animate-fade-in overflow-y-auto">
      <div className="glass-panel w-full max-w-lg p-8 rounded-3xl border border-amber-400/50 shadow-2xl my-auto">
        <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4 animate-bounce drop-shadow-[0_0_20px_rgba(255,215,0,0.8)]" />

        <h1 className="text-3xl md:text-5xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 mb-2">
          VICTORY!
        </h1>
        <p className="text-sm font-sans-app text-cyan-300 font-semibold mb-6">
          Drako has been defeated! Neo has recovered all Crystal Stars and saved the kingdom!
        </p>

        {/* Quest Summary */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6 text-left font-pixel text-xs">
          <div>
            <span className="text-slate-400">TOTAL STARS:</span>
            <div className="text-amber-300 text-lg flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-amber-400" /> {saveData.totalStars}
            </div>
          </div>
          <div>
            <span className="text-slate-400">TOTAL COINS:</span>
            <div className="text-amber-300 text-lg mt-1">🪙 {saveData.totalCoins}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handlePlayAgain}
            className="glass-button w-full py-4 rounded-xl font-pixel text-xs text-amber-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> REPLAY FROM WORLD 1
          </button>

          <button
            onClick={handleMainMenu}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-cyan-300 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 text-cyan-400" /> MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};
