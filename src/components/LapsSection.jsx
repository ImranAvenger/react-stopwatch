import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa6";
import { formatTime } from "../utils/formatTime";

export default function LapsSection({ laps }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLaps = () => {
    if (laps.length === 0) return;

    const lapText = laps
      .map((lap, index) => {
        return `Lap ${index + 1}: ${formatTime(lap.totalTime)} (+${formatTime(lap.lapTime)})`;
      })
      .join("\n");

    navigator.clipboard.writeText(lapText);
    setIsCopied(true);

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 mb-0 border border-slate-700 overflow-hidden flex flex-col landscape:mb-0 h-full">
      <h2 className="text-xl font-bold text-white mb-4 flex justify-between items-center">
        <span>📋 Laps</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLaps}
            disabled={laps.length === 0}
            className={`px-2 py-2 rounded-lg transition-all duration-300 enabled:cursor-pointer flex items-center justify-center ${
              isCopied
                ? "px-3 bg-emerald-500/20 text-emerald-400"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50 disabled:text-slate-600 disabled:cursor-not-allowed"
            }`}
            title={laps.length === 0 ? "No laps to copy" : "Copy lap records"}
          >
            {isCopied ? <FaCheck size={16} /> : <FaCopy size={16} />}
            <span
              className={`text-sm font-medium transition-all duration-300 ${
                isCopied
                  ? "opacity-100 w-auto ml-2"
                  : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              Copied
            </span>
          </button>
          <span className="text-sm text-slate-400 font-normal">
            {laps.length} / 99
          </span>
        </div>
      </h2>

      <div className="overflow-y-auto flex-1 min-h-0 pr-2 space-y-2 laps-scroll">
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
  );
}
