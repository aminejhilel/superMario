'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { ALL_LEVELS } from '@/game/levels/levelData';
import { Lock, Star, ArrowLeft, Trophy, Play, Sparkles } from 'lucide-react';
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

  const getThemeBadgeColor = (theme: string) => {
    switch (theme) {
      case 'green_valley': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'crystal_cave': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'sky_islands': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'volcanic_land': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'drako_castle': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-y-auto py-8 px-6 bg-slate-950 flex flex-col items-center justify-between">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between mb-6">
        <button
          onClick={handleBack}
          className="glass-button px-4 py-2.5 rounded-xl flex items-center gap-2 font-pixel text-xs text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" /> MAIN MENU
        </button>

        <h1 className="text-2xl md:text-4xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
          WORLD MAP
        </h1>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-300 font-pixel text-xs backdrop-blur-md shadow-lg">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
          <span>{saveData.totalStars} STARS</span>
        </div>
      </div>

      {/* Level Grid */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-auto">
        {Object.values(ALL_LEVELS).map((lvl) => {
          const isLocked = lvl.world > saveData.unlockedWorld;
          const completedInfo = saveData.completedLevels[lvl.id];
          const starsCount = completedInfo?.stars || 0;
          const highScore = completedInfo?.highScore || 0;
          const themeStyle = getThemeBadgeColor(lvl.theme);

          return (
            <div
              key={lvl.id}
              onClick={() => handleLevelClick(lvl.id, isLocked)}
              className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border cursor-pointer ${
                isLocked
                  ? 'bg-slate-900/40 border-slate-800 opacity-50 grayscale'
                  : 'glass-panel border-amber-500/30 hover:scale-105 hover:border-amber-400 shadow-2xl group'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`font-pixel text-[10px] px-2.5 py-1 rounded-lg border ${themeStyle}`}>
                  WORLD {lvl.world}
                </span>
                {isLocked ? (
                  <Lock className="w-5 h-5 text-rose-500" />
                ) : (
                  <Play className="w-5 h-5 fill-amber-400 text-amber-400 group-hover:scale-125 transition-transform" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-pixel text-white mb-3 group-hover:text-amber-300 transition-colors">
                {lvl.name}
              </h3>

              {/* Stars Earned */}
              <div className="flex items-center gap-2 my-4">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-6 h-6 transition-all ${
                      starIdx <= starsCount
                        ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]'
                        : 'text-slate-800'
                    }`}
                  />
                ))}
              </div>

              {/* High Score / Status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-pixel text-slate-400">
                {isLocked ? (
                  <span className="text-rose-400">LOCKED</span>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" /> BEST SCORE:
                    </span>
                    <span className="text-amber-300 font-bold">{highScore}</span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-xs text-slate-400 font-pixel mt-6 tracking-wider flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400" />
        COMPLETE LEVELS TO UNLOCK NEW WORLDS & CRYSTAL STARS
      </div>
    </div>
  );
};
