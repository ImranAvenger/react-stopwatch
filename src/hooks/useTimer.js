import { useCallback, useEffect, useRef } from "react";

export function useTimer(onTick, onComplete) {
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const isVisibleRef = useRef(true);

  // Detect when tab is backgrounded/foregrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      isVisibleRef.current = isVisible;

      // When tab becomes visible again, update the start time to prevent drift
      if (isVisible && timerRef.current) {
        const currentCount = Date.now() - startTimeRef.current;
        startTimeRef.current = Date.now() - currentCount;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const start = useCallback(
    (currentCount) => {
      // Calculate the original start point based on current count
      startTimeRef.current = Date.now() - currentCount;

      const tick = () => {
        // Only update if tab is visible to prevent drift from background throttling
        if (isVisibleRef.current) {
          const now = Date.now();
          const nextCount = now - startTimeRef.current;

          if (nextCount >= 3600000) {
            // 60-minute cap
            if (timerRef.current) {
              cancelAnimationFrame(timerRef.current);
              timerRef.current = null;
            }
            onComplete(3600000);
            return;
          }

          onTick(nextCount);
        }

        timerRef.current = requestAnimationFrame(tick);
      };

      timerRef.current = requestAnimationFrame(tick);
    },
    [onTick, onComplete]
  );

  const pause = useCallback(() => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
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
