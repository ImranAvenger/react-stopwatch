import { useCallback } from "react";
import { useAudio } from "./useAudio";

export function useSoundEffects(isSoundEnabled, runningSound) {
  const { playSound, startRunningSound, stopRunningSound } = useAudio(runningSound);

  const playResetSound = useCallback(() => {
    if (isSoundEnabled) playSound(400, 0.1);
  }, [isSoundEnabled, playSound]);

  const playStartSound = useCallback(() => {
    if (isSoundEnabled) playSound(600, 0.08);
  }, [isSoundEnabled, playSound]);

  const playPauseSound = useCallback(() => {
    if (isSoundEnabled) playSound(600, 0.08);
  }, [isSoundEnabled, playSound]);

  const playLapSound = useCallback(() => {
    if (isSoundEnabled) playSound(800, 0.1);
  }, [isSoundEnabled, playSound]);

  const playCompletionSound = useCallback(() => {
    if (isSoundEnabled) {
      playSound(1000, 0.15);
      playSound(1200, 0.15);
    }
  }, [isSoundEnabled, playSound]);

  return {
    playResetSound,
    playStartSound,
    playPauseSound,
    playLapSound,
    playCompletionSound,
    startRunningSound,
    stopRunningSound,
  };
}
