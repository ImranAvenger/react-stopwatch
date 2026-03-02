import { useRef, useEffect } from "react";
import runningSound from "./assets/stopwatch-running.m4a";
import TimerDisplay from "./components/Timer/TimerDisplay";
import LapsSection from "./components/LapsSection";
import ControlPanel from "./components/Timer/ControlPanel";
import KeyboardShortcutsGuide from "./components/UI/KeyboardShortcutsGuide";
import { useTimer } from "./hooks/useTimer";
import { useLaps } from "./hooks/useLaps";
import { useSoundToggle } from "./hooks/useSoundToggle";
import { useTheme } from "./hooks/useTheme";
import { useAppState } from "./hooks/useAppState";
import { useStorageSync } from "./hooks/useStorageSync";
import { useSoundEffects } from "./hooks/useSoundEffects";
import { useTimerHandlers } from "./hooks/useTimerHandlers";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

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
  useEffect(() => {
    if (isRunning && isSoundEnabled) {
      soundEffects.startRunningSound();
    } else {
      soundEffects.stopRunningSound();
    }
  }, [isRunning, isSoundEnabled, soundEffects]);

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
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}
    >
      <div className="w-full h-[90vh] grid grid-cols-1 grid-rows-2 gap-4 landscape:max-w-full landscape:h-[95vh] landscape:grid-cols-2 landscape:grid-rows-1">
        {/* Timer Display & Controls */}
        <section
          className={`rounded-3xl shadow-2xl p-6 border flex flex-col gap-4 landscape:justify-between landscape:min-h-0 w-full transition-colors duration-300 ${isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300"}`}
        >
          <TimerDisplay count={count} isDarkMode={isDarkMode} />
          <ControlPanel
            isRunning={isRunning}
            onToggleTimer={handlers.handleToggleTimer}
            onRecordLap={handleRecordLap}
            onReset={handlers.handleResetTimer}
            canRecordLap={isRunning && !isFull()}
            canReset={!isRunning && count > 0}
            isDarkMode={isDarkMode}
          />
        </section>

        {/* Laps Section */}
        <section className="landscape:min-h-0 w-full">
          <LapsSection
            laps={laps}
            shortcutsGuideRef={shortcutsGuideRef}
            isSoundEnabled={isSoundEnabled}
            onToggleSound={toggleSound}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        </section>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsGuide ref={shortcutsGuideRef} isDarkMode={isDarkMode} />
    </div>
  );
}
