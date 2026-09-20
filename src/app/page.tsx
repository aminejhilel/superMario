'use client';

import React, { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { MainMenu } from '@/components/MainMenu';
import { LevelSelector } from '@/components/LevelSelector';
import { GameCanvas } from '@/components/GameCanvas';
import { GameHUD } from '@/components/GameHUD';
import { PauseMenu } from '@/components/PauseMenu';
import { LevelCompleteModal } from '@/components/LevelCompleteModal';
import { GameOverModal } from '@/components/GameOverModal';
import { VictoryScreen } from '@/components/VictoryScreen';
import { SettingsModal } from '@/components/SettingsModal';
import { MobileControls } from '@/components/MobileControls';

export default function Home() {
  const gameState = useGameStore((state) => state.gameState);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-capable devices
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans-app select-none">
      {gameState === GameState.MENU && <MainMenu />}
      {gameState === GameState.LEVEL_SELECT && <LevelSelector />}
      {gameState === GameState.SETTINGS && (
        <>
          <MainMenu />
          <SettingsModal />
        </>
      )}

      {(gameState === GameState.PLAYING ||
        gameState === GameState.PAUSED ||
        gameState === GameState.GAME_OVER ||
        gameState === GameState.LEVEL_COMPLETE) && (
        <div className="relative w-full h-full">
          <GameCanvas />
          <GameHUD />

          {/* Show mobile touch overlay on touch devices during gameplay */}
          {isTouchDevice && gameState === GameState.PLAYING && <MobileControls />}

          {gameState === GameState.PAUSED && <PauseMenu />}
          {gameState === GameState.GAME_OVER && <GameOverModal />}
          {gameState === GameState.LEVEL_COMPLETE && <LevelCompleteModal />}
        </div>
      )}

      {gameState === GameState.VICTORY && <VictoryScreen />}
    </main>
  );
}
