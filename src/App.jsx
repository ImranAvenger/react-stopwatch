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
    <div>
      <h1>{formatTime(count)}</h1>
      <button onClick={handleToggleTimer}>
        {isRunning ? "Pause" : "Resume"}
      </button>
      <button
        onClick={handleRecordLap}
        disabled={!isRunning || laps.length >= 99}
      >
        Lap
      </button>
      <button onClick={handleResetTimer} disabled={isRunning}>
        Reset Timer
      </button>
      {laps.length > 0 && (
        <div>
          <h2>Laps</h2>
          <ol>
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lap.totalTime)} (Difference:{" "}
                {formatTime(lap.lapTime)})
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
