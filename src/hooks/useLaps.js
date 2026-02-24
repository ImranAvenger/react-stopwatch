import { useState, useEffect } from "react";

export function useLaps() {
  // Initialize state from localStorage
  const [laps, setLaps] = useState(() => {
    const savedLaps = localStorage.getItem("stopwatch_laps");
    if (savedLaps) {
      try {
        return JSON.parse(savedLaps);
      } catch (error) {
        console.error("Failed to load laps from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Save laps to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("stopwatch_laps", JSON.stringify(laps));
  }, [laps]);

  const addLap = (count) => {
    const lastLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
    const lapTime = count - lastLapTime;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;

    const newLap = {
      id,
      totalTime: count,
      lapTime: lapTime,
    };

    setLaps((prev) => [...prev, newLap]);
  };

  const reset = () => {
    setLaps([]);
  };

  const isFull = () => laps.length >= 99;

  return {
    laps,
    addLap,
    reset,
    isFull,
  };
}
