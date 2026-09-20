'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { GameState } from '@/game/engine/Types';
import { Volume2, VolumeX, ArrowLeft, RefreshCw, Smartphone } from 'lucide-react';
import { AudioManager } from '@/game/systems/AudioManager';
import { SaveManager } from '@/game/systems/SaveManager';

export const SettingsModal: React.FC = () => {
  const { setGameState, saveData, updateSettings, setSaveData } = useGameStore();

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const musicVolume = parseFloat(e.target.value);
    updateSettings({ musicVolume });
    AudioManager.setVolumes(musicVolume, saveData.settings.sfxVolume);
  };

  const handleSfxVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sfxVolume = parseFloat(e.target.value);
    updateSettings({ sfxVolume });
    AudioManager.setVolumes(saveData.settings.musicVolume, sfxVolume);
    AudioManager.playSFX('coin');
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all game progress and high scores?')) {
      const resetData = SaveManager.resetProgress();
      setSaveData(resetData);
      AudioManager.playSFX('damage');
    }
  };

  const handleBack = () => {
    AudioManager.playSFX('jump');
    setGameState(GameState.MENU);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-700 text-slate-200">
        <h2 className="text-xl font-pixel text-cyan-400 mb-6 flex items-center gap-2">
          SETTINGS
        </h2>

        <div className="space-y-6 text-sm font-sans-app">
          {/* Music Volume */}
          <div>
            <div className="flex justify-between items-center mb-2 font-pixel text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-400" /> MUSIC VOLUME
              </span>
              <span>{Math.round(saveData.settings.musicVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={saveData.settings.musicVolume}
              onChange={handleMusicVolumeChange}
              className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* SFX Volume */}
          <div>
            <div className="flex justify-between items-center mb-2 font-pixel text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" /> SFX VOLUME
              </span>
              <span>{Math.round(saveData.settings.sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={saveData.settings.sfxVolume}
              onChange={handleSfxVolumeChange}
              className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Reset Progress */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleResetProgress}
              className="glass-button w-full py-3 rounded-xl font-pixel text-xs text-rose-400 border-rose-500/30 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> RESET ALL PROGRESS
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mt-6 glass-button w-full py-3.5 rounded-xl font-pixel text-xs text-slate-300 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO MENU
        </button>
      </div>
    </div>
  );
};
