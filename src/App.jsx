import { useState, useEffect } from "react";
import runningSound from "./assets/stopwatch-running.m4a";
import TimerDisplay from "./components/TimerDisplay";
import LapsSection from "./components/LapsSection";
import ControlPanel from "./components/ControlPanel";
import { useTimer } from "./hooks/useTimer";
import { useAudio } from "./hooks/useAudio";
import { useLaps } from "./hooks/useLaps";

export default function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { laps, addLap, reset: resetLaps, isFull } = useLaps();
  const timer = useTimer(setCount, handleTimerComplete);
  const { playSound, startRunningSound, stopRunningSound } =
    useAudio(runningSound);

  function handleTimerComplete(finalCount) {
    setCount(finalCount);
    setIsRunning(false);
    // Play completion sound
    playSound(1000, 0.15);
    playSound(1200, 0.15);
  }

  // Handle running sound effect with seamless looping using Web Audio API
  useEffect(() => {
    if (isRunning) {
      startRunningSound();
    } else {
      stopRunningSound();
    }
  }, [isRunning, startRunningSound, stopRunningSound]);

  // Timer state management (pause/resume)
  function handleToggleTimer() {
    if (isRunning) {
      timer.pause();
      setIsRunning(false);
      // Play pause sound
      playSound(600, 0.08);
    } else {
      timer.start(count);
      setIsRunning(true);
      // Play start sound
      playSound(600, 0.08);
    }
  }

  // Reset timer to initial state
  function handleResetTimer() {
    timer.clear();
    setCount(0);
    setIsRunning(false);
    resetLaps();
    // Play reset sound
    playSound(400, 0.1);
  }

  // Record a lap with total time and delta
  function handleRecordLap() {
    if (isRunning && !isFull()) {
      addLap(count);
      // Play lap sound effect (beep)
      playSound(800, 0.1);
    }
  }

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
            canReset={!isRunning || count === 0}
          />
        </div>

        {/* Right side: Laps */}
        <div className="landscape:min-h-0 w-full">
          <LapsSection laps={laps} />
        </div>
      </div>
    </div>
  );
}
