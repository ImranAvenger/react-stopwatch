import { useState, useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  function startTimer() {
    if (timerRef.current) return; // Prevent multiple timers
    timerRef.current = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function resetTimer() {
    stopTimer();
    setCount(0);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
}

export default App;
