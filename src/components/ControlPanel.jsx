export default function ControlPanel({
  isRunning,
  onToggleTimer,
  onRecordLap,
  onReset,
  canRecordLap,
  canReset,
}) {
  return (
    <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 border border-slate-700 shrink-0">
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={onToggleTimer}
          className={`${
            isRunning
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-emerald-500 hover:bg-emerald-600"
          } text-white font-bold py-4 rounded-xl transition-all active:scale-95`}
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button
          onClick={onRecordLap}
          disabled={!canRecordLap}
          className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
        >
          Lap
        </button>
        <button
          onClick={onReset}
          disabled={!canReset}
          className="bg-rose-500 hover:bg-rose-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
