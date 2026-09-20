'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { ALL_LEVELS } from '@/game/levels/levelData';
import { Lock, Star, ArrowLeft, Trophy, Play } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';

export const LevelSelector: React.FC = () => {
  const { setGameState, startLevel, saveData } = useGameStore();

  const handleLevelClick = (levelId: number, isLocked: boolean) => {
    if (isLocked) {
      AudioManager.playSFX('damage');
      return;
    }
    AudioManager.playSFX('coin');
    startLevel(levelId);
  };

  const handleBack = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.MENU);
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto py-10 px-6 bg-slate-950 flex flex-col items-center justify-between">
      {/* Header */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="glass-button px-4 py-2 rounded-xl flex items-center gap-2 font-pixel text-xs text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> MAIN MENU
        </button>

        <h1 className="text-2xl md:text-4xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
          SELECT LEVEL
        </h1>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 font-pixel text-xs">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          {saveData.totalStars}
        </div>
      </div>

      {/* Level Grid */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-auto">
        {Object.values(ALL_LEVELS).map((lvl) => {
          const isLocked = lvl.world > saveData.unlockedWorld;
          const completedInfo = saveData.completedLevels[lvl.id];
          const starsCount = completedInfo?.stars || 0;
          const highScore = completedInfo?.highScore || 0;

          return (
            <div
              key={lvl.id}
              onClick={() => handleLevelClick(lvl.id, isLocked)}
              className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border cursor-pointer ${
                isLocked
                  ? 'bg-slate-900/40 border-slate-800 opacity-60'
                  : 'glass-panel border-amber-500/30 hover:scale-105 hover:border-amber-400 shadow-xl'
              }`}
            >
              {/* Theme Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-pixel text-xs text-cyan-400">WORLD {lvl.world}</span>
                {isLocked ? (
                  <Lock className="w-5 h-5 text-rose-500" />
                ) : (
                  <Play className="w-5 h-5 fill-amber-400 text-amber-400" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-pixel text-white mb-2">{lvl.name}</h3>

              {/* Stars Earned */}
              <div className="flex items-center gap-1.5 my-3">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-5 h-5 ${
                      starIdx <= starsCount
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* High Score / Locked Status */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-pixel text-slate-400">
                {isLocked ? (
                  <span className="text-rose-400">LOCKED</span>
                ) : (
                  <>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" /> BEST:
                    </span>
                    <span className="text-amber-300">{highScore}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="relative z-10 text-xs text-slate-500 font-pixel mt-8">
        COMPLETE LEVELS TO UNLOCK NEW WORLDS
      </div>
    </div>
  );
};
