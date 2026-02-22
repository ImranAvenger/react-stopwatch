import DigitDisplay from "./DigitDisplay";
import { formatTime } from "../utils/formatTime";

export default function TimerDisplay({ count }) {
  return (
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
  );
}
