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
}) {
  return (
    <div className="flex items-center justify-center gap-6 landscape:gap-4">
      <button
        onClick={onReset}
        disabled={!canReset}
        className="w-16 h-16 rounded-full bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-2xl flex items-center justify-center transition-all active:scale-95 hover:shadow-lg hover:shadow-rose-500/50"
        title="Reset"
      >
        <FaRotateLeft />
      </button>
      <button
        onClick={onToggleTimer}
        className={`w-16 h-16 rounded-full text-white text-2xl flex items-center justify-center transition-all active:scale-95 hover:shadow-lg ${
          isRunning
            ? "bg-amber-500 hover:bg-amber-600 hover:shadow-amber-500/50"
            : "bg-emerald-500 hover:bg-emerald-600 hover:shadow-emerald-500/50"
        }`}
        title={isRunning ? "Pause" : "Resume"}
      >
        {isRunning ? <FaCirclePause /> : <FaCirclePlay />}
      </button>
      <button
        onClick={onRecordLap}
        disabled={!canRecordLap}
        className="w-16 h-16 rounded-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-2xl flex items-center justify-center transition-all active:scale-95 hover:shadow-lg hover:shadow-sky-500/50"
        title="Record Lap"
      >
        <FaStopwatch />
      </button>
    </div>
  );
}
