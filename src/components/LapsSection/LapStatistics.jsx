import { formatTime } from "../../utils/formatTime";

export default function LapStatistics({ laps, isDarkMode }) {
  if (laps.length === 0) return null;

  const lapTimes = laps.map((lap) => lap.lapTime);
  const fastestLap = Math.min(...lapTimes);
  const slowestLap = Math.max(...lapTimes);
  const averageLap =
    lapTimes.reduce((acc, time) => acc + time, 0) / lapTimes.length;

  return (
    <div
      className={`grid grid-cols-3 gap-2 p-4 rounded-xl border transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-700/30 border-slate-600/30"
          : "bg-slate-100 border-slate-300/50"
      }`}
    >
      <div className="text-center">
        <p
          className={`text-xs font-medium mb-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          Fastest
        </p>
        <p
          className={`text-sm font-bold transition-colors duration-300 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
        >
          {formatTime(fastestLap)}
        </p>
      </div>
      <div className="text-center">
        <p
          className={`text-xs font-medium mb-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          Average
        </p>
        <p
          className={`text-sm font-bold transition-colors duration-300 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
        >
          {formatTime(averageLap)}
        </p>
      </div>
      <div className="text-center">
        <p
          className={`text-xs font-medium mb-1 transition-colors duration-300 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          Slowest
        </p>
        <p
          className={`text-sm font-bold transition-colors duration-300 ${isDarkMode ? "text-red-400" : "text-red-600"}`}
        >
          {formatTime(slowestLap)}
        </p>
      </div>
    </div>
  );
}
