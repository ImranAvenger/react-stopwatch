import { formatTime } from "../utils/formatTime";

export default function LapsSection({ laps }) {
  return (
    <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 mb-4 border border-slate-700 flex-1 overflow-hidden flex flex-col landscape:mb-0 landscape:h-full">
      <h2 className="text-xl font-bold text-white mb-4 flex justify-between items-center">
        <span>📋 Laps</span>
        <span className="text-sm text-slate-400 font-normal">
          {laps.length} / 99
        </span>
      </h2>

      <div className="overflow-y-auto flex-1 pr-2 space-y-2 laps-scroll">
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
