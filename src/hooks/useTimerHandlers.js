import { useCallback } from "react";

export function useTimerHandlers(
  count,
  isRunning,
  isFull,
  timer,
  soundEffects,
  { setCount, setIsRunning, resetLaps }
) {
  const handleTimerComplete = useCallback(
    (finalCount) => {
      setCount(finalCount);
      setIsRunning(false);
      soundEffects.playCompletionSound();
    },
    [setCount, setIsRunning, soundEffects]
  );

  const handleToggleTimer = useCallback(() => {
    if (isRunning) {
      timer.pause();
      setIsRunning(false);
      soundEffects.playPauseSound();
    } else {
      timer.start(count);
      setIsRunning(true);
      soundEffects.playStartSound();
    }
  }, [isRunning, count, timer, soundEffects, setIsRunning]);

  const handleResetTimer = useCallback(() => {
    timer.clear();
    setCount(0);
    setIsRunning(false);
    resetLaps();
    localStorage.removeItem("stopwatch_count");
    soundEffects.playResetSound();
  }, [timer, resetLaps, soundEffects, setCount, setIsRunning]);

  const handleRecordLap = useCallback(() => {
    if (isRunning && !isFull()) {
      soundEffects.playLapSound();
      return true;
    }
    return false;
  }, [isRunning, isFull, soundEffects]);

  return {
    handleTimerComplete,
    handleToggleTimer,
    handleResetTimer,
    handleRecordLap,
  };
}
