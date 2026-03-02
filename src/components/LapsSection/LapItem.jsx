import { formatTime } from "../../utils/formatTime";
import { getTextThemeClasses, getLapItemThemeClasses } from "./constants";

export default function LapItem({ lap, lapNumber, isDarkMode }) {
  return (
    <div className="animate-waterfall">
      <div className="waterfall-content">
        <div
          className={`flex justify-between items-center p-5 rounded-xl border transition-all ${getLapItemThemeClasses(isDarkMode)}`}
        >
          <span
            className={`text-xl font-bold ${getTextThemeClasses(isDarkMode, "cyan")}`}
          >
            {lapNumber}
          </span>
          <div
            className={`font-mono font-semibold text-lg ${getTextThemeClasses(isDarkMode, "amber")}`}
          >
            +{formatTime(lap.lapTime)}
          </div>
          <div
            className={`font-mono font-semibold text-lg ${getTextThemeClasses(isDarkMode, "emerald")}`}
          >
            {formatTime(lap.totalTime)}
          </div>
        </div>
      </div>
    </div>
  );
}
