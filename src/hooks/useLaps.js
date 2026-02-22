import { useState } from "react";

export function useLaps() {
  const [laps, setLaps] = useState([]);

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
