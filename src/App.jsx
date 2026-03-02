import { useRef } from "react";
import runningSound from "./assets/stopwatch-running.m4a";
import KeyboardShortcutsGuide from "./components/UI/KeyboardShortcutsGuide";
import TimerSection from "./components/TimerSection";
import LapsPanel from "./components/LapsPanel";
import { useTimer } from "./hooks/useTimer";
import { useLaps } from "./hooks/useLaps";
import { useSoundToggle } from "./hooks/useSoundToggle";
import { useTheme } from "./hooks/useTheme";
import { useAppState } from "./hooks/useAppState";
import { useStorageSync } from "./hooks/useStorageSync";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { useTimerHandlers } from "./hooks/useTimerHandlers";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useRunningSound } from "./hooks/useRunningSound";
import { getPageBgClass, getLayoutGridClass } from "./utils/styleHelpers";

export default function App() {
  const shortcutsGuideRef = useRef(null);

  // State management
  const { count, setCount, isRunning, setIsRunning } = useAppState();
  const { isSoundEnabled, toggleSound } = useSoundToggle();
  const { isDarkMode, toggleTheme } = useTheme();
  const { laps, addLap, reset: resetLaps, isFull } = useLaps();

  // Timer and sound initialization
  const timer = useTimer(setCount, (finalCount) => {
    setCount(finalCount);
    setIsRunning(false);
  });
  const soundEffects = useSoundEffects(isSoundEnabled, runningSound);

  // Persist state
  useStorageSync(count, isRunning);

  // Timer handlers
  const handlers = useTimerHandlers(
    count,
    isRunning,
    isFull,
    timer,
    soundEffects,
    { setCount, setIsRunning, resetLaps },
  );

  // Record lap with sound
  const handleRecordLap = () => {
    if (handlers.handleRecordLap()) {
      addLap(count);
    }
  };

  // Running sound loop
  useRunningSound(isRunning, isSoundEnabled, soundEffects);

  // Keyboard shortcuts
  useKeyboardShortcuts(
    isRunning,
    count,
    shortcutsGuideRef,
    {
      ...handlers,
      handleRecordLap,
    },
    { toggleSound, toggleTheme },
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${getPageBgClass(isDarkMode)}`}
    >
      <div className={getLayoutGridClass()}>
        <TimerSection
          count={count}
          isRunning={isRunning}
          isDarkMode={isDarkMode}
          isFull={isFull}
          handlers={handlers}
          handleRecordLap={handleRecordLap}
        />

        <LapsPanel
          laps={laps}
          shortcutsGuideRef={shortcutsGuideRef}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={toggleSound}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
      </div>

      <KeyboardShortcutsGuide ref={shortcutsGuideRef} isDarkMode={isDarkMode} />
    </div>
  );
}
