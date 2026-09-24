'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Heart, Coins, Pause, Timer, Sparkles, Zap } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';

export const GameHUD: React.FC = () => {
  const { hp, maxHp, coins, score, timeRemaining, setGameState } = useGameStore();

  const handlePause = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.PAUSED);
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-30 p-4 pointer-events-none flex items-start justify-between">
      {/* Top Left Stats */}
      <div className="flex flex-col items-start gap-2">
        {/* Title Badge */}
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-sparkle" />
          <span className="font-pixel text-[10px] text-amber-300 tracking-wider">AMINE JHILEL QUEST</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* HP Hearts */}
          <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-rose-500/40 backdrop-blur-md shadow-lg">
            {Array.from({ length: maxHp }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-all duration-300 ${
                  i < hp
                    ? 'fill-rose-500 text-rose-500 animate-heart-beat drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                    : 'text-slate-700 opacity-35'
                }`}
              />
            ))}
          </div>

          {/* Coins Count */}
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 border border-amber-500/40 backdrop-blur-md shadow-lg font-pixel text-xs text-amber-300">
            <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{coins.toString().padStart(3, '0')}</span>
          </div>
        </div>
      </div>

      {/* Top Right Stats & Pause Button */}
      <div className="flex items-center gap-3">
        {/* Score & Timer */}
        <div className="pointer-events-auto hidden sm:flex items-center gap-4 px-4 py-1.5 rounded-xl bg-slate-900/85 border border-cyan-500/40 backdrop-blur-md shadow-lg font-pixel text-xs text-cyan-300">
          <div className="flex items-center gap-1.5">
            <Timer className="w-4 h-4 text-cyan-400" />
            <span>TIME: {timeRemaining}s</span>
          </div>
          <div className="border-l border-slate-700 pl-4 text-amber-300 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>SCORE: {score}</span>
          </div>
        </div>

        {/* Pause Button */}
        <button
          onClick={handlePause}
          className="pointer-events-auto glass-button p-2.5 rounded-xl text-slate-200 border-slate-600/50 shadow-xl"
        >
          <Pause className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
