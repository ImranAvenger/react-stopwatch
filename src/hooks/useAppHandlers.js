import { useCallback } from "react";
import { useTimerHandlers } from "./useTimerHandlers";

export function useAppHandlers(appState, services) {
  // Timer handlers
  const handlers = useTimerHandlers(
    appState.count,
    appState.isRunning,
    appState.isFull,
    services.timer,
    services.soundEffects,
    {
      setCount: appState.setCount,
      setIsRunning: appState.setIsRunning,
      resetLaps: appState.reset,
    },
  );

  // Record lap with sound
  const handleRecordLap = useCallback(() => {
    if (handlers.handleRecordLap()) {
      appState.addLap(appState.count);
    }
  }, [appState, handlers]);

  return {
    ...handlers,
    handleRecordLap,
  };
}
