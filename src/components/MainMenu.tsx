'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Play, Map, Settings, HelpCircle, Info, Sparkles } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';

export const MainMenu: React.FC = () => {
  const { setGameState, startLevel } = useGameStore();
  const [activeModal, setActiveModal] = useState<'NONE' | 'HOW_TO_PLAY' | 'CREDITS'>('NONE');

  const handlePlayClick = () => {
    AudioManager.playSFX('coin');
    startLevel(1);
  };

  const handleLevelSelect = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.LEVEL_SELECT);
  };

  const handleSettings = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.SETTINGS);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between py-12 px-6 bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950">
      {/* Dynamic Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-12 w-64 h-32 bg-sky-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-16 w-80 h-40 bg-purple-600 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-36 bg-amber-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Main Header / Logo */}
      <div className="relative z-10 flex flex-col items-center text-center mt-6">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md mb-4 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-pixel text-cyan-300 tracking-wider">RETRO 2D PLATFORMER</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_8px_16px_rgba(255,215,0,0.4)] tracking-wide">
          PIXEL QUEST
        </h1>

        <p className="mt-3 text-sm md:text-base font-sans-app font-semibold text-slate-300 max-w-md">
          Join <span className="text-cyan-400 font-bold">Neo</span> on an epic journey to reclaim the Crystal Stars from <span className="text-rose-400 font-bold">Drako</span>!
        </p>
      </div>

      {/* Action Buttons Container */}
      <div className="relative z-10 flex flex-col gap-4 w-full max-w-xs sm:max-w-sm my-auto">
        <button
          onClick={handlePlayClick}
          className="glass-button w-full py-4 rounded-xl flex items-center justify-center gap-3 font-pixel text-sm text-amber-300 border-amber-400/50 shadow-lg group"
        >
          <Play className="w-5 h-5 fill-amber-300 group-hover:scale-110 transition-transform" />
          PLAY GAME
        </button>

        <button
          onClick={handleLevelSelect}
          className="glass-button w-full py-3.5 rounded-xl flex items-center justify-center gap-3 font-pixel text-xs text-cyan-300 border-cyan-400/30"
        >
          <Map className="w-4 h-4 text-cyan-400" />
          SELECT LEVEL
        </button>

        <button
          onClick={() => setActiveModal('HOW_TO_PLAY')}
          className="glass-button w-full py-3.5 rounded-xl flex items-center justify-center gap-3 font-pixel text-xs text-purple-300 border-purple-400/30"
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          HOW TO PLAY
        </button>

        <button
          onClick={handleSettings}
          className="glass-button w-full py-3.5 rounded-xl flex items-center justify-center gap-3 font-pixel text-xs text-slate-300 border-slate-400/30"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          SETTINGS
        </button>

        <button
          onClick={() => setActiveModal('CREDITS')}
          className="glass-button w-full py-3 rounded-xl flex items-center justify-center gap-3 font-pixel text-xs text-slate-400 border-slate-600/30"
        >
          <Info className="w-4 h-4 text-slate-500" />
          CREDITS
        </button>
      </div>

      {/* Footer info */}
      <div className="relative z-10 text-xs text-slate-500 font-pixel">
        v1.0.0 • POWERED BY NEXT.JS & CANVAS
      </div>

      {/* How To Play Modal */}
      {activeModal === 'HOW_TO_PLAY' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-cyan-500/30 text-slate-200">
            <h2 className="text-xl font-pixel text-cyan-400 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> HOW TO PLAY
            </h2>
            <div className="space-y-3 text-sm font-sans-app leading-relaxed">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-amber-400">Desktop Controls:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-xs text-slate-300 font-pixel">
                  <li>A / D / Left / Right : Move Neo</li>
                  <li>W / Space / Up : Jump / Double Jump</li>
                  <li>Shift : Run</li>
                  <li>X : Energy Blast Attack</li>
                  <li>ESC : Pause Game</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-cyan-400">Mobile Controls:</span>
                <p className="text-xs text-slate-300 mt-1">Use on-screen Touch D-Pad, Jump, Run, and Attack buttons.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-rose-400">Objective:</span>
                <p className="text-xs text-slate-300 mt-1">Defeat enemies, collect coins & Crystal Stars, activate checkpoints, reach portals, and defeat the final boss Drako!</p>
              </div>
            </div>
            <button
              onClick={() => setActiveModal('NONE')}
              className="mt-6 glass-button w-full py-3 rounded-xl font-pixel text-xs text-cyan-300"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Credits Modal */}
      {activeModal === 'CREDITS' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-amber-500/30 text-center">
            <h2 className="text-xl font-pixel text-amber-400 mb-4">PIXEL QUEST CREDITS</h2>
            <p className="text-sm text-slate-300 font-sans-app mb-2">Developed with Next.js, Canvas Engine & Web Audio API Synthesizer.</p>
            <p className="text-xs font-pixel text-cyan-400 my-4">HERO: NEO • ANTAGONIST: DRAKO</p>
            <button
              onClick={() => setActiveModal('NONE')}
              className="glass-button w-full py-3 rounded-xl font-pixel text-xs text-amber-300"
            >
              BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
