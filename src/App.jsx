import { useState, useRef, useEffect, memo } from "react";
import runningSound from "./assets/stopwatch-running.m4a";

// Memoized to prevent unnecessary re-renders of digits that haven't changed
const DigitDisplay = memo(({ value }) => {
  const spanRef = useRef(null);
  const prevValueRef = useRef(value);
  const timerRef = useRef(null);

  useEffect(() => {
    if (prevValueRef.current !== value && spanRef.current) {
      prevValueRef.current = value;
      spanRef.current.classList.add("animate-digit-slide");

      timerRef.current = setTimeout(() => {
        spanRef.current?.classList.remove("animate-digit-slide");
      }, 300);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value]);

  return <span ref={spanRef}>{value}</span>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const timerRef = useRef(null);
  const startTimeRef = useRef(0); // For precision tracking
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const audioSourceRef = useRef(null);

  // Initialize Web Audio API for sound effects
  const playSound = (frequency, duration) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }

      const ctx = audioContextRef.current;

      // Resume context if suspended (user interaction requirement)
      if (ctx.state === "suspended") {
        ctx
          .resume()
          .catch((e) => console.error("Failed to resume context:", e));
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + duration,
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio playback error:", e);
    }
  };

  // Preload running sound into Web Audio API for seamless looping
  useEffect(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
        console.log("Audio context created");
      }

      if (!audioBufferRef.current) {
        fetch(runningSound)
          .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch audio");
            return response.arrayBuffer();
          })
          .then((arrayBuffer) => {
            console.log("Audio file loaded, decoding...");
            audioContextRef.current.decodeAudioData(
              arrayBuffer,
              (buffer) => {
                audioBufferRef.current = buffer;
                console.log("Audio decoded successfully");
              },
              (e) => {
                console.error("Failed to decode audio:", e);
              },
            );
          })
          .catch((e) => console.error("Failed to load sound:", e));
      }
    } catch (e) {
      console.error("Audio context error:", e);
    }
  }, []);

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

  // Timer state management (pause/resume)
  function handleToggleTimer() {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      // Play pause sound
      playSound(600, 0.08);
    } else {
      // Logic: Subtract the current 'count' from NOW to get the original start point
      startTimeRef.current = Date.now() - count;

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const nextCount = now - startTimeRef.current;

        if (nextCount >= 3600000) {
          // 60-minute cap - play completion sound
          setCount(3600000);
          setIsRunning(false);
          clearInterval(timerRef.current);
          playSound(1000, 0.15);
          playSound(1200, 0.15);
        } else {
          setCount(nextCount);
        }
      }, 10);

      setIsRunning(true);
      // Play start sound
      playSound(600, 0.08);
    }
  }

  // Reset timer to initial state
  function handleResetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setCount(0);
    setIsRunning(false);
    setLaps([]);
    // Play reset sound
    playSound(400, 0.1);
  }

  // Record a lap with total time and delta
  function handleRecordLap() {
    if (isRunning && laps.length < 99) {
      const lastLapTime = laps.length > 0 ? laps[laps.length - 1].totalTime : 0;
      const lapTime = count - lastLapTime;
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;
      const newLap = {
        id,
        totalTime: count,
        lapTime: lapTime,
      };
      setLaps((prev) => [...prev, newLap]);
      // Play lap sound effect (beep)
      playSound(800, 0.1);
    }
  }

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (audioSourceRef.current) {
        try {
          audioSourceRef.current.stop();
          console.log("Audio source cleaned up");
        } catch (e) {
          console.warn("Audio source was already stopped:", e);
        }
      }
    };
  }, []);

  // Handle running sound effect with seamless looping using Web Audio API
  useEffect(() => {
    if (isRunning && audioBufferRef.current && audioContextRef.current) {
      // Resume context if suspended
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch((e) => {
          console.error("Failed to resume audio context:", e);
        });
      }

      try {
        // Stop any existing source
        if (audioSourceRef.current) {
          audioSourceRef.current.stop();
        }

        // Create new source for seamless loop
        const ctx = audioContextRef.current;
        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.start(ctx.currentTime);
        audioSourceRef.current = source;
        console.log("Running sound started");
      } catch (e) {
        console.error("Failed to start running sound:", e);
      }
    } else if (!isRunning && audioSourceRef.current) {
      try {
        audioSourceRef.current.stop();
        console.log("Running sound stopped");
      } catch (e) {
        console.warn("Audio source was already stopped:", e);
      }
      audioSourceRef.current = null;
    }
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[90vh] max-h-200 flex flex-col">
        {/* Timer Display */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 mb-4 border border-slate-700 shrink-0">
          <div className="bg-slate-900 rounded-2xl py-10 flex justify-center items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-mono font-bold text-cyan-400 tabular-numbers">
              {formatTime(count)
                .split("")
                .map((char, idx) =>
                  // Only animate characters that aren't separators
                  /[0-9]/.test(char) ? (
                    <DigitDisplay key={idx} value={char} />
                  ) : (
                    <span key={idx}>{char}</span>
                  ),
                )}
            </h1>
          </div>
        </div>

        {/* Laps Section */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 mb-4 border border-slate-700 flex-1 overflow-hidden flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4 flex justify-between items-center">
            <span>📋 Laps</span>
            <span className="text-sm text-slate-400 font-normal">
              {laps.length} / 99
            </span>
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
                        <span className="text-cyan-400 font-bold">
                          Lap {lapNumber}
                        </span>
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
                isRunning
                  ? "bg-amber-500 hover:bg-amber-600"
                  : "bg-emerald-500 hover:bg-emerald-600"
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
