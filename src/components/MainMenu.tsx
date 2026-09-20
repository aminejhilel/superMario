'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Play, Map, Settings, HelpCircle, Info, Sparkles, Zap, Shield, Magnet } from 'lucide-react';
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
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between py-10 px-6 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
      {/* Dynamic Animated Background Aura */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-12 w-80 h-40 bg-cyan-500 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-16 right-16 w-96 h-48 bg-purple-600 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-40 bg-amber-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Main Header / Game Title */}
      <div className="relative z-10 flex flex-col items-center text-center mt-4">
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 backdrop-blur-md mb-3 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-pixel text-amber-300 tracking-wider">OFFICIAL PLATFORMER GAME</span>
        </div>

        {/* Rebranded Game Name */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500 drop-shadow-[0_10px_25px_rgba(255,215,0,0.5)] tracking-wide">
          AMINE JHILEL
        </h1>
        <div className="font-pixel text-sm md:text-lg text-cyan-400 mt-2 tracking-widest drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">
          ★ PIXEL QUEST EDITION ★
        </div>

        <p className="mt-3 text-sm md:text-base font-sans-app font-semibold text-slate-300 max-w-md">
          Join <span className="text-cyan-400 font-bold">Neo</span> on an epic adventure through 5 worlds to defeat <span className="text-rose-400 font-bold">Drako</span>!
        </p>
      </div>

      {/* Action Buttons Container */}
      <div className="relative z-10 flex flex-col gap-3.5 w-full max-w-xs sm:max-w-sm my-auto">
        <button
          onClick={handlePlayClick}
          className="glass-button w-full py-4 rounded-xl flex items-center justify-center gap-3 font-pixel text-sm text-amber-300 border-amber-400/60 shadow-xl group"
        >
          <Play className="w-5 h-5 fill-amber-300 group-hover:scale-110 transition-transform" />
          START GAME
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

      {/* Footer Info */}
      <div className="relative z-10 text-xs text-slate-400 font-pixel">
        CREATED BY AMINE JHILEL • NEXT.JS & CANVAS ENGINE
      </div>

      {/* How To Play Modal */}
      {activeModal === 'HOW_TO_PLAY' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-cyan-500/40 text-slate-200">
            <h2 className="text-xl font-pixel text-cyan-400 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> GAME CONTROLS & FEATURES
            </h2>
            <div className="space-y-3 text-sm font-sans-app leading-relaxed">
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="font-bold text-amber-400">Desktop Keys:</span>
                <ul className="list-disc list-inside mt-1 space-y-1 text-xs text-slate-300 font-pixel">
                  <li>A / D / Left / Right : Move Neo</li>
                  <li>W / Space / Up : Jump & Double Jump</li>
                  <li>Shift : Sprint / Run</li>
                  <li>X : Energy Blast Attack</li>
                  <li>Z : Super Beam Wave (Requires Super Meter)</li>
                  <li>ESC : Pause Game</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="font-bold text-purple-400">Power-ups & Bonuses:</span>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-cyan-400" /> Shield Protection</div>
                  <div className="flex items-center gap-1.5"><Magnet className="w-4 h-4 text-purple-400" /> Coin Magnet</div>
                  <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Multiplier Combo</div>
                  <div className="flex items-center gap-1.5">🦘 Double Jump Boost</div>
                </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-amber-500/40 text-center">
            <h2 className="text-xl font-pixel text-amber-400 mb-2">AMINE JHILEL</h2>
            <p className="text-xs font-pixel text-cyan-400 mb-4">LEAD CREATOR & DEVELOPER</p>
            <p className="text-sm text-slate-300 font-sans-app mb-4">
              Built with Next.js, HTML5 Canvas game engine, Tailwind CSS, Zustand state management, and Web Audio API Synthesizer.
            </p>
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
