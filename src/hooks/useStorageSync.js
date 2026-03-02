import { useEffect } from "react";

export function useStorageSync(count, isRunning) {
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
}
