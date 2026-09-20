'use client';

import React, { useEffect, useRef } from 'react';
import { GameEngine } from '@/game/engine/GameEngine';
import { useGameStore } from '@/store/useGameStore';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const currentLevelId = useGameStore((state) => state.currentLevelId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Responsive Canvas Resize
    const updateSize = () => {
      canvas.width = Math.min(window.innerWidth, 1280);
      canvas.height = Math.min(window.innerHeight, 720);
      if (gameEngineRef.current) {
        gameEngineRef.current.camera.width = canvas.width;
        gameEngineRef.current.camera.height = canvas.height;
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Initialize Game Engine
    const engine = new GameEngine(canvas, currentLevelId);
    gameEngineRef.current = engine;
    engine.start();

    return () => {
      window.removeEventListener('resize', updateSize);
      engine.stop();
      gameEngineRef.current = null;
    };
  }, [currentLevelId]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[1280px] max-h-[720px] object-contain shadow-2xl border-2 border-slate-800 rounded-lg"
      />
    </div>
  );
};
