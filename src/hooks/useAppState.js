import { useState } from "react";

export function useAppState() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("stopwatch_count");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const [isRunning, setIsRunning] = useState(false);

  return {
    count,
    setCount,
    isRunning,
    setIsRunning,
  };
}
