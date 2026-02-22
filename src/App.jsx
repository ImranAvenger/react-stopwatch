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
      <div className="w-full max-w-md h-[90vh] max-h-200 flex flex-col">
        <TimerDisplay count={count} />
        <LapsSection laps={laps} />
        <ControlPanel
          isRunning={isRunning}
          onToggleTimer={handleToggleTimer}
          onRecordLap={handleRecordLap}
          onReset={handleResetTimer}
          canRecordLap={isRunning && !isFull()}
          canReset={!isRunning || count === 0}
        />
      </div>
    </div>
  );
}
