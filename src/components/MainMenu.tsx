'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Play, Map, Settings, HelpCircle, Info, Sparkles, Zap, Shield, Magnet } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';
import { PixelArtAssets } from '@/game/graphics/PixelArtAssets';

export const MainMenu: React.FC = () => {
  const { setGameState, startLevel } = useGameStore();
  const [activeModal, setActiveModal] = useState<'NONE' | 'HOW_TO_PLAY' | 'CREDITS'>('NONE');
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated Hero Preview Canvas
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame = 0;
    let animId: number;

    const renderHero = () => {
      animFrame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Hero Neo centered
      PixelArtAssets.drawPlayer(
        ctx,
        (canvas.width - 32) / 2,
        (canvas.height - 40) / 2,
        32,
        40,
        true,
        animFrame,
        'IDLE',
        true,
        0
      );

      animId = requestAnimationFrame(renderHero);
    };

    renderHero();
    return () => cancelAnimationFrame(animId);
  }, []);

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
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between py-8 px-6 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950">
      {/* Background Animated Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-12 w-96 h-48 bg-cyan-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-16 right-16 w-[30rem] h-56 bg-purple-600/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-48 bg-amber-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2.5s' }}></div>
      </div>

      {/* Main Header / Game Title */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2">
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 backdrop-blur-md mb-3 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400 animate-sparkle" />
          <span className="text-xs font-pixel text-amber-300 tracking-wider">SUPER MARIO QUEST</span>
        </div>

        {/* Title Card */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 drop-shadow-[0_12px_30px_rgba(245,158,11,0.6)] tracking-wide animate-shimmer">
          AMINE JHILEL
        </h1>
        <div className="font-pixel text-xs sm:text-base text-cyan-400 mt-2 tracking-[0.2em] drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]">
          ★ PIXEL QUEST EDITION ★
        </div>

        {/* Animated Hero Avatar Container */}
        <div className="mt-4 p-2 rounded-2xl bg-slate-900/80 border border-cyan-500/40 backdrop-blur-md shadow-2xl flex items-center justify-center">
          <canvas ref={heroCanvasRef} width={80} height={70} className="w-20 h-16" />
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="relative z-10 flex flex-col gap-3.5 w-full max-w-xs sm:max-w-sm my-auto">
        <button
          onClick={handlePlayClick}
          className="glass-button w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-pixel text-sm text-amber-300 border-amber-400/60 shadow-2xl group"
        >
          <Play className="w-5 h-5 fill-amber-300 group-hover:scale-110 transition-transform" />
          START GAME
        </button>

        <button
          onClick={handleLevelSelect}
          className="glass-button w-full py-3.5 rounded-2xl flex items-center justify-center gap-3 font-pixel text-xs text-cyan-300 border-cyan-400/40"
        >
          <Map className="w-4 h-4 text-cyan-400" />
          SELECT LEVEL
        </button>

        <button
          onClick={() => setActiveModal('HOW_TO_PLAY')}
          className="glass-button w-full py-3.5 rounded-2xl flex items-center justify-center gap-3 font-pixel text-xs text-purple-300 border-purple-400/40"
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          HOW TO PLAY
        </button>

        <button
          onClick={handleSettings}
          className="glass-button w-full py-3.5 rounded-2xl flex items-center justify-center gap-3 font-pixel text-xs text-slate-300 border-slate-400/40"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          SETTINGS
        </button>

        <button
          onClick={() => setActiveModal('CREDITS')}
          className="glass-button w-full py-3 rounded-2xl flex items-center justify-center gap-3 font-pixel text-xs text-slate-400 border-slate-600/40"
        >
          <Info className="w-4 h-4 text-slate-500" />
          CREDITS
        </button>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-[10px] sm:text-xs text-slate-400 font-pixel tracking-wider">
        CREATED BY AMINE JHILEL • CANVAS 2D ENGINE
      </div>

      {/* How To Play Modal */}
      {activeModal === 'HOW_TO_PLAY' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-cyan-500/40 text-slate-200">
            <h2 className="text-lg font-pixel text-cyan-400 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" /> CONTROLS & POWER-UPS
            </h2>
            <div className="space-y-3 text-sm font-sans-app leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-amber-400">Desktop Controls:</span>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-xs text-slate-300 font-pixel">
                  <li>A / D / Arrow Keys : Move Neo</li>
                  <li>W / Space / Up Arrow : Jump & Double Jump</li>
                  <li>Shift : Sprint / Speed Run</li>
                  <li>X : Energy Blast Attack</li>
                  <li>Z : Super Beam Blast (Requires Super Gauge)</li>
                  <li>ESC : Pause Game</li>
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-bold text-purple-400">Power-ups:</span>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-cyan-400" /> Shield Protection</div>
                  <div className="flex items-center gap-2"><Magnet className="w-4 h-4 text-pink-400" /> Coin Magnet</div>
                  <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Combo Multiplier</div>
                  <div className="flex items-center gap-2">🦘 Infinite Jump</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveModal('NONE')}
              className="mt-6 glass-button w-full py-3.5 rounded-2xl font-pixel text-xs text-cyan-300"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Credits Modal */}
      {activeModal === 'CREDITS' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-amber-500/40 text-center">
            <h2 className="text-xl font-pixel text-amber-400 mb-1">AMINE JHILEL</h2>
            <p className="text-xs font-pixel text-cyan-400 mb-4">LEAD GAME CREATOR</p>
            <p className="text-sm text-slate-300 font-sans-app mb-5 leading-relaxed">
              Super Mario: Amine Jhilel Edition is custom built with Next.js, HTML5 Canvas 2D Engine, Web Audio Synthesizer, Zustand, and Tailwind CSS.
            </p>
            <button
              onClick={() => setActiveModal('NONE')}
              className="glass-button w-full py-3.5 rounded-2xl font-pixel text-xs text-amber-300"
            >
              BACK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
