import DigitDisplay from "./DigitDisplay";
import { formatTime } from "../utils/formatTime";

export default function TimerDisplay({ count }) {
  return (
    <div className="bg-slate-900 rounded-2xl py-10 flex justify-center items-center flex-1 landscape:py-6">
      <h1 className="timer-digits font-mono font-bold text-cyan-400 tabular-numbers">
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
  );
}
