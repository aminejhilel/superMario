'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, Zap, ZapOff } from 'lucide-react';
import { InputManager } from '@/game/systems/InputManager';

interface MobileControlsProps {
  inputManager?: InputManager;
}

export const MobileControls: React.FC<MobileControlsProps> = () => {
  const handleTouchStart = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key, code: key }));
  };

  const handleTouchEnd = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key, code: key }));
  };

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex justify-between items-end p-6 select-none">
      {/* Left / Right D-Pad */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onTouchStart={() => handleTouchStart('a')}
          onTouchEnd={() => handleTouchEnd('a')}
          onMouseDown={() => handleTouchStart('a')}
          onMouseUp={() => handleTouchEnd('a')}
          className="w-16 h-16 rounded-2xl bg-slate-900/80 border-2 border-slate-700 active:bg-cyan-500/40 flex items-center justify-center text-slate-200 shadow-xl backdrop-blur-md"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>

        <button
          onTouchStart={() => handleTouchStart('d')}
          onTouchEnd={() => handleTouchEnd('d')}
          onMouseDown={() => handleTouchStart('d')}
          onMouseUp={() => handleTouchEnd('d')}
          className="w-16 h-16 rounded-2xl bg-slate-900/80 border-2 border-slate-700 active:bg-cyan-500/40 flex items-center justify-center text-slate-200 shadow-xl backdrop-blur-md"
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      </div>

      {/* Action Buttons (Attack, Run, Jump) */}
      <div className="pointer-events-auto flex items-center gap-3">
        {/* Attack Button */}
        <button
          onTouchStart={() => handleTouchStart('x')}
          onTouchEnd={() => handleTouchEnd('x')}
          onMouseDown={() => handleTouchStart('x')}
          onMouseUp={() => handleTouchEnd('x')}
          className="w-14 h-14 rounded-2xl bg-slate-900/80 border-2 border-amber-500/50 active:bg-amber-500/40 flex items-center justify-center text-amber-400 font-pixel text-xs shadow-xl backdrop-blur-md"
        >
          <Zap className="w-6 h-6" />
        </button>

        {/* Jump Button */}
        <button
          onTouchStart={() => handleTouchStart(' ')}
          onTouchEnd={() => handleTouchEnd(' ')}
          onMouseDown={() => handleTouchStart(' ')}
          onMouseUp={() => handleTouchEnd(' ')}
          className="w-18 h-18 rounded-2xl bg-slate-900/80 border-2 border-cyan-400 active:bg-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-xl backdrop-blur-md"
        >
          <ArrowUp className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};
