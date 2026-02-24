import { formatTime } from "../utils/formatTime";

export default function LapStatistics({ laps }) {
  if (laps.length === 0) return null;

  const lapTimes = laps.map((lap) => lap.lapTime);
  const fastestLap = Math.min(...lapTimes);
  const slowestLap = Math.max(...lapTimes);
  const averageLap =
    lapTimes.reduce((acc, time) => acc + time, 0) / lapTimes.length;

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium mb-1">Fastest</p>
        <p className="text-sm font-bold text-green-400">
          {formatTime(fastestLap)}
        </p>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium mb-1">Average</p>
        <p className="text-sm font-bold text-blue-400">
          {formatTime(averageLap)}
        </p>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium mb-1">Slowest</p>
        <p className="text-sm font-bold text-red-400">
          {formatTime(slowestLap)}
        </p>
      </div>
    </div>
  );
}
