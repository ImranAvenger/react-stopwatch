import { useState, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  function toggleTimer() {
    if (isRunning) {
      // Pause the timer
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    } else {
      // Resume the timer
      timerRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
      setIsRunning(true);
    }
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setCount(0);
    setIsRunning(false);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Resume"}</button>
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
}

export default App;
