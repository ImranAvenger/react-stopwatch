import { useCallback, useRef } from "react";

export function useTimer(onTick, onComplete) {
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  const start = useCallback(
    (currentCount) => {
      // Subtract the current count from NOW to get the original start point
      startTimeRef.current = Date.now() - currentCount;

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const nextCount = now - startTimeRef.current;

        if (nextCount >= 3600000) {
          // 60-minute cap
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          onComplete(3600000);
        } else {
          onTick(nextCount);
        }
      }, 10);
    },
    [onTick, onComplete]
  );

  const pause = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const isRunning = useCallback(() => timerRef.current !== null, []);

  return {
    start,
    pause,
    clear,
    isRunning,
    timerRef,
  };
}
