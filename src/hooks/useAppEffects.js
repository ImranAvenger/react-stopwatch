import { useStorageSync } from "./useStorageSync";
import { useRunningSound } from "./useRunningSound";
import { useKeyboardShortcuts } from "./useKeyboardShortcuts";

export function useAppEffects(appState, handlers, shortcutsGuideRef, services) {
  // Persist state to localStorage
  useStorageSync(appState.count, appState.isRunning);

  // Running sound loop
  useRunningSound(appState.isRunning, appState.isSoundEnabled, services.soundEffects);

  // Keyboard shortcuts
  useKeyboardShortcuts(
    appState.isRunning,
    appState.count,
    shortcutsGuideRef,
    handlers,
    {
      toggleSound: appState.toggleSound,
      toggleTheme: appState.toggleTheme,
    },
  );
}
