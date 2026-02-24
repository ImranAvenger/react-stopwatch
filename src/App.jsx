import { useState, useEffect, useCallback, useRef } from "react";
import runningSound from "./assets/stopwatch-running.m4a";
import TimerDisplay from "./components/TimerDisplay";
import LapsSection from "./components/LapsSection";
import ControlPanel from "./components/ControlPanel";
import KeyboardShortcutsGuide from "./components/KeyboardShortcutsGuide";
import { useTimer } from "./hooks/useTimer";
import { useAudio } from "./hooks/useAudio";
import { useLaps } from "./hooks/useLaps";
import { useSoundToggle } from "./hooks/useSoundToggle";

export default function App() {
  // Initialize count from localStorage
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("stopwatch_count");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const shortcutsGuideRef = useRef(null);
  const { isSoundEnabled, toggleSound } = useSoundToggle();
  const { laps, addLap, reset: resetLaps, isFull } = useLaps();
  const timer = useTimer(setCount, handleTimerComplete);
  const { playSound, startRunningSound, stopRunningSound } =
    useAudio(runningSound);

  // Save count to localStorage when paused or before page unloads
  useEffect(() => {
    if (!isRunning && count > 0) {
      localStorage.setItem("stopwatch_count", count.toString());
    }
  }, [isRunning, count]);

  // Save count before page unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (count > 0) {
        localStorage.setItem("stopwatch_count", count.toString());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [count]);

  function handleTimerComplete(finalCount) {
    setCount(finalCount);
    setIsRunning(false);
    // Play completion sound
    if (isSoundEnabled) {
      playSound(1000, 0.15);
      playSound(1200, 0.15);
    }
  }

  // Handle running sound effect with seamless looping using Web Audio API
  useEffect(() => {
    if (isRunning && isSoundEnabled) {
      startRunningSound();
    } else {
      stopRunningSound();
    }
  }, [isRunning, isSoundEnabled, startRunningSound, stopRunningSound]);

  // Timer state management (pause/resume)
  const handleToggleTimer = useCallback(() => {
    if (isRunning) {
      timer.pause();
      setIsRunning(false);
      // Play pause sound
      if (isSoundEnabled) {
        playSound(600, 0.08);
      }
    } else {
      timer.start(count);
      setIsRunning(true);
      // Play start sound
      if (isSoundEnabled) {
        playSound(600, 0.08);
      }
    }
  }, [isRunning, count, timer, isSoundEnabled, playSound]);

  // Reset timer to initial state
  const handleResetTimer = useCallback(() => {
    timer.clear();
    setCount(0);
    setIsRunning(false);
    resetLaps();
    // Clear saved count from localStorage
    localStorage.removeItem("stopwatch_count");
    // Play reset sound
    if (isSoundEnabled) {
      playSound(400, 0.1);
    }
  }, [timer, isSoundEnabled, resetLaps, playSound]);

  // Record a lap with total time and delta
  const handleRecordLap = useCallback(() => {
    if (isRunning && !isFull()) {
      addLap(count);
      // Play lap sound effect (beep)
      if (isSoundEnabled) {
        playSound(800, 0.1);
      }
    }
  }, [isRunning, count, isFull, isSoundEnabled, addLap, playSound]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent conflicts with form inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handleToggleTimer();
          break;
        case "KeyL":
          handleRecordLap();
          break;
        case "KeyR":
          if (!isRunning && count > 0) {
            handleResetTimer();
          }
          break;
        case "KeyS": // Control + S
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleSound();
          }
          break;
        case "Slash": // Question mark key (Shift + /)
          if (e.shiftKey) {
            e.preventDefault();
            shortcutsGuideRef.current?.toggleGuide();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isRunning,
    count,
    handleToggleTimer,
    handleRecordLap,
    handleResetTimer,
    toggleSound,
    isFull,
  ]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full h-[90vh] grid grid-cols-1 grid-rows-2 gap-4 landscape:max-w-full landscape:h-[95vh] landscape:grid-cols-2 landscape:grid-rows-1">
        {/* Left side: Display and Controls */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-700 flex flex-col gap-4 landscape:justify-between landscape:min-h-0 w-full">
          <TimerDisplay count={count} />
          <ControlPanel
            isRunning={isRunning}
            onToggleTimer={handleToggleTimer}
            onRecordLap={handleRecordLap}
            onReset={handleResetTimer}
            canRecordLap={isRunning && !isFull()}
            canReset={!isRunning && count > 0}
          />
        </div>

        {/* Right side: Laps */}
        <div className="landscape:min-h-0 w-full">
          <LapsSection
            laps={laps}
            shortcutsGuideRef={shortcutsGuideRef}
            isSoundEnabled={isSoundEnabled}
            onToggleSound={toggleSound}
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Guide */}
      <KeyboardShortcutsGuide ref={shortcutsGuideRef} />
    </div>
  );
}
