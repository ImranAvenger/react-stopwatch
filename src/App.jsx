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

  function toggleTimer() {
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

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setCount(0);
    setIsRunning(false);
    setLaps([]);
  }

  function recordLap() {
    if (isRunning || count > 0) {
      setLaps([...laps, count]);
    }
  }

  useEffect(() => {
    // This cleanup function runs when the component is destroyed
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      <h1>{formatTime(count)}</h1>
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Resume"}</button>
      <button onClick={recordLap}>Lap</button>
      <button onClick={resetTimer}>Reset Timer</button>
      
      {laps.length > 0 && (
        <div>
          <h2>Laps</h2>
          <ol>
            {laps.map((lap, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lap)}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
