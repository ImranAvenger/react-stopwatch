import { useState, useRef, useEffect, memo } from "react";

// Memoized to prevent unnecessary re-renders of digits that haven't changed
const DigitDisplay = memo(({ value }) => {
  const prevValueRef = useRef(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [value]);

  return (
    <span className={animate ? "animate-digit-slide" : ""}>
      {value}
    </span>
  );
});

export default function Stopwatch() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(0); // For precision tracking

  // Formatting Logic
  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  }

  // Accurate Timer Logic
  function handleToggleTimer() {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      // Logic: Subtract the current 'count' from NOW to get the original start point
      startTimeRef.current = Date.now() - count;

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const nextCount = now - startTimeRef.current;

        if (nextCount >= 3600000) { // 60-minute cap
          setCount(3600000);
          setIsRunning(false);
          clearInterval(timerRef.current);
        } else {
          setCount(nextCount);
        }
      }, 10);
    }
  }

  function handleResetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setCount(0);
    setIsRunning(false);
    setLaps([]);
  }

  function handleRecordLap() {
    if (isRunning && laps.length < 99) {
      const lastLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
      const lapTime = count - lastLapTime;
      const newLap = {
        id: crypto.randomUUID(), // More robust than Date.now()
        totalTime: count,
        lapTime: lapTime,
      };
      setLaps((prev) => [...prev, newLap]);
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[90vh] max-h-[800px] flex flex-col">
        
        {/* Timer Display */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 mb-4 border border-slate-700 shrink-0">
          <div className="bg-slate-900 rounded-2xl py-10 flex justify-center items-center">
            <h1 className="text-6xl font-mono font-bold text-cyan-400 tabular-numbers">
              {formatTime(count).split("").map((char, idx) => (
                // Only animate characters that aren't separators
                (/[0-9]/).test(char) 
                  ? <DigitDisplay key={idx} value={char} /> 
                  : <span key={idx}>{char}</span>
              ))}
            </h1>
          </div>
        </div>

        {/* Laps Section */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 mb-4 border border-slate-700 flex-1 overflow-hidden flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4 flex justify-between items-center">
            <span>📋 Laps</span>
            <span className="text-sm text-slate-400 font-normal">{laps.length} / 99</span>
          </h2>
          
          <div className="overflow-y-auto flex-1 pr-2 space-y-2">
            {laps.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                <span className="text-4xl mb-2">⏱️</span>
                <p>Ready for your first lap?</p>
              </div>
            ) : (
              [...laps].reverse().map((lap, index) => {
                // Efficiently calculate lap index for display
                const lapNumber = laps.length - index;
                return (
                  <div key={lap.id} className="animate-waterfall">
                    <div className="waterfall-content">
                      <div className="flex justify-between items-center bg-slate-700/50 p-4 rounded-xl border border-slate-600/50 hover:bg-slate-700 transition-colors">
                        <span className="text-cyan-400 font-bold">Lap {lapNumber}</span>
                        <div className="text-right">
                          <div className="text-white font-mono text-sm">
                            {formatTime(lap.totalTime)}
                          </div>
                          <div className="text-slate-400 font-mono text-xs">
                            + {formatTime(lap.lapTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-700 shrink-0">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={handleToggleTimer}
              className={`${
                isRunning ? "bg-amber-500 hover:bg-amber-600" : "bg-emerald-500 hover:bg-emerald-600"
              } text-white font-bold py-4 rounded-xl transition-all active:scale-95`}
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button
              onClick={handleRecordLap}
              disabled={!isRunning || laps.length >= 99}
              className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
            >
              Lap
            </button>
            <button
              onClick={handleResetTimer}
              disabled={isRunning && count !== 0}
              className="bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
            >
              Reset
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}