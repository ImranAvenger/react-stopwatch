import { useState, useRef, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  }

  function handleToggleTimer() {
    if (isRunning) {
      // Pause the timer
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    } else {
      // Resume the timer
      timerRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 10);
      }, 10);
      setIsRunning(true);
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
        id: Date.now(),
        totalTime: count,
        lapTime: lapTime,
      };
      setLaps([...laps, newLap]);
    }
  }

  useEffect(() => {
    // This cleanup function runs when the component is destroyed
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-screen max-h-175 flex flex-col">
        {/* Timer Display */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 mb-4 border border-slate-700 shrink-0">
          <h1 className="text-6xl font-mono font-bold text-center text-cyan-400 py-8 bg-slate-900 rounded-2xl">
            {formatTime(count)}
          </h1>
        </div>

        {/* Laps Section */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 mb-4 border border-slate-700 flex-1 overflow-hidden flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center shrink-0">
            <span className="text-cyan-400 mr-2">📋</span> Laps ({laps.length}
            /99)
          </h2>
          <div className="space-y-2 overflow-y-auto flex-1">
            {laps.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No laps recorded yet
              </p>
            ) : (
              [...laps].reverse().map((lap, index) => (
                <div
                  key={lap.id}
                  className="flex justify-between items-center bg-slate-700 p-4 rounded-lg hover:bg-slate-600 overflow-hidden"
                  style={{
                    animation: `slideDown 0.5s ease-out ${index * 0.08}s backwards`,
                  }}
                >
                  <span className="text-cyan-400 font-semibold">
                    Lap {laps.findIndex((l) => l.id === lap.id) + 1}
                  </span>
                  <div className="text-right">
                    <div className="text-white font-mono text-sm">
                      {formatTime(lap.totalTime)}
                    </div>
                    <div className="text-gray-400 font-mono text-xs">
                      Δ {formatTime(lap.lapTime)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-700 flex-shrink-0">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleToggleTimer}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>
            <button
              onClick={handleRecordLap}
              disabled={!isRunning || laps.length >= 99}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Lap
            </button>
            <button
              onClick={handleResetTimer}
              disabled={isRunning}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
