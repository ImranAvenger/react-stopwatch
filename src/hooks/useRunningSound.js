import { useEffect } from "react";

export function useRunningSound(isRunning, isSoundEnabled, soundEffects) {
  useEffect(() => {
    if (isRunning && isSoundEnabled) {
      soundEffects.startRunningSound();
    } else {
      soundEffects.stopRunningSound();
    }
  }, [isRunning, isSoundEnabled, soundEffects]);
}
