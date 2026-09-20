'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Star, ArrowRight, Map, Trophy } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';
import confetti from 'canvas-confetti';

export const LevelCompleteModal: React.FC = () => {
  const { levelCompletedData, setGameState, startLevel, currentLevelId } = useGameStore();

  useEffect(() => {
    // Trigger celebration confetti on level clear
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  if (!levelCompletedData) return null;

  const handleNextLevel = () => {
    AudioManager.playSFX('coin');
    const nextId = currentLevelId < 5 ? currentLevelId + 1 : 1;
    startLevel(nextId);
  };

  const handleLevelSelect = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.LEVEL_SELECT);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-amber-500/40 text-center shadow-2xl">
        <h2 className="text-2xl md:text-3xl font-pixel text-amber-400 mb-2 drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]">
          LEVEL COMPLETE!
        </h2>

        {/* Stars Breakdown */}
        <div className="flex items-center justify-center gap-3 my-6">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              className={`w-10 h-10 ${
                s <= levelCompletedData.starsCollected
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.9)] animate-bounce'
                  : 'text-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Stats Table */}
        <div className="space-y-2 text-xs font-pixel text-slate-300 p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6 text-left">
          <div className="flex justify-between">
            <span>COINS COLLECTED:</span>
            <span className="text-amber-300">+{levelCompletedData.coinsCollected * 50}</span>
          </div>
          <div className="flex justify-between">
            <span>ENEMIES DEFEATED:</span>
            <span className="text-cyan-300">+{levelCompletedData.enemiesDefeated * 100}</span>
          </div>
          <div className="flex justify-between">
            <span>TIME BONUS:</span>
            <span className="text-emerald-300">+{levelCompletedData.timeBonus}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-sm text-amber-400 font-bold">
            <span>TOTAL SCORE:</span>
            <span>{levelCompletedData.totalScore}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNextLevel}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-amber-300 flex items-center justify-center gap-2"
          >
            NEXT LEVEL <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleLevelSelect}
            className="glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-cyan-300 flex items-center justify-center gap-2"
          >
            <Map className="w-4 h-4" /> LEVEL SELECT
          </button>
        </div>
      </div>
    </div>
  );
};
