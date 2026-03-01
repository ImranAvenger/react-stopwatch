import {
  FaStopwatch,
  FaCirclePause,
  FaCirclePlay,
  FaRotateLeft,
} from "react-icons/fa6";

export default function ControlPanel({
  isRunning,
  onToggleTimer,
  onRecordLap,
  onReset,
  canRecordLap,
  canReset,
  isDarkMode,
}) {
  return (
    <div className="flex items-center justify-center gap-6 landscape:gap-4">
      <button
        onClick={onReset}
        disabled={!canReset}
        className={`w-14 h-14 rounded-full text-white text-xl flex items-center justify-center transition-all active:scale-95 hover:shadow-lg enabled:cursor-pointer font-semibold ${
          isDarkMode
            ? "bg-gradient-to-br from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 disabled:bg-slate-700 disabled:text-slate-500 hover:shadow-rose-400/50"
            : "bg-gradient-to-br from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 disabled:bg-slate-300 disabled:text-slate-400 hover:shadow-rose-400/50"
        }`}
        title="Reset (R)"
        aria-label="Reset stopwatch (Keyboard: R)"
      >
        <FaRotateLeft />
      </button>
      <button
        onClick={onToggleTimer}
        className={`w-20 h-20 rounded-full text-white text-3xl flex items-center justify-center transition-all active:scale-95 hover:shadow-xl cursor-pointer font-semibold shadow-lg ${
          isRunning
            ? "bg-linear-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 hover:shadow-amber-400/50"
            : "bg-linear-to-br from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 hover:shadow-emerald-400/50"
        }`}
        title={isRunning ? "Pause (Space)" : "Resume (Space)"}
        aria-label={
          isRunning
            ? "Pause stopwatch (Keyboard: Space)"
            : "Resume stopwatch (Keyboard: Space)"
        }
      >
        {isRunning ? <FaCirclePause /> : <FaCirclePlay />}
      </button>
      <button
        onClick={onRecordLap}
        disabled={!canRecordLap}
        className={`w-14 h-14 rounded-full text-white text-xl flex items-center justify-center transition-all active:scale-95 hover:shadow-lg enabled:cursor-pointer font-semibold ${
          isDarkMode
            ? "bg-linear-to-br from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600 disabled:bg-slate-700 disabled:text-slate-500 hover:shadow-violet-400/50"
            : "bg-linear-to-br from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-600 disabled:bg-slate-300 disabled:text-slate-400 hover:shadow-violet-400/50"
        }`}
        title="Record Lap (L)"
        aria-label="Record lap (Keyboard: L)"
      >
        <FaStopwatch />
      </button>
    </div>
  );
}
