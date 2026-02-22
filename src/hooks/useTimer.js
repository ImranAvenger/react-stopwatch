import { useRef } from "react";

export function useTimer(onTick, onComplete) {
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  const start = (currentCount) => {
    // Subtract the current count from NOW to get the original start point
    startTimeRef.current = Date.now() - currentCount;

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const nextCount = now - startTimeRef.current;

      if (nextCount >= 3600000) {
        // 60-minute cap
        clear();
        onComplete(3600000);
      } else {
        onTick(nextCount);
      }
    }, 10);
  };

  const pause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const clear = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const isRunning = () => timerRef.current !== null;

  return {
    start,
    pause,
    clear,
    isRunning,
    timerRef,
  };
}
