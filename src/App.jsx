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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Timer Display */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 mb-8 border border-slate-700">
          <h1 className="text-6xl font-mono font-bold text-center text-cyan-400 py-8 bg-slate-900 rounded-2xl">
            {formatTime(count)}
          </h1>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-3 mt-8">
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

        {/* Laps Section */}
        {laps.length > 0 && (
          <div className="bg-slate-800 rounded-3xl shadow-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-cyan-400 mr-2">📋</span> Laps ({laps.length}
              /99)
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {laps.map((lap, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-700 p-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <span className="text-cyan-400 font-semibold">
                    Lap {index + 1}
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
