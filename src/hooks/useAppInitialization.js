import { useRef } from "react";
import runningSound from "../assets/stopwatch-running.m4a";
import { useAppState } from "./useAppState";
import { useSoundToggle } from "./useSoundToggle";
import { useTheme } from "./useTheme";
import { useLaps } from "./useLaps";
import { useTimer } from "./useTimer";
import { useSoundEffects } from "./useSoundEffects";

export function useAppInitialization() {
  const shortcutsGuideRef = useRef(null);

  // State
  const appState = useAppState();
  const sound = useSoundToggle();
  const theme = useTheme();
  const laps = useLaps();

  // Timer with completion handler
  const timer = useTimer(appState.setCount, (finalCount) => {
    appState.setCount(finalCount);
    appState.setIsRunning(false);
  });

  // Sound effects
  const soundEffects = useSoundEffects(sound.isSoundEnabled, runningSound);

  return {
    shortcutsGuideRef,
    state: {
      count: appState.count,
      setCount: appState.setCount,
      isRunning: appState.isRunning,
      setIsRunning: appState.setIsRunning,
      isSoundEnabled: sound.isSoundEnabled,
      toggleSound: sound.toggleSound,
      isDarkMode: theme.isDarkMode,
      toggleTheme: theme.toggleTheme,
      laps: laps.laps,
      addLap: laps.addLap,
      reset: laps.reset,
      isFull: laps.isFull,
    },
    services: {
      timer,
      soundEffects,
    },
  };
}
