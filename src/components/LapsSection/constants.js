import { formatTime } from "../../utils/formatTime";

// Constants
export const COPY_TIMEOUT = 2000;
export const COPY_KEYBOARD_KEY = "KeyC";
export const MAX_LAPS = 99;
export const LAPS_SCROLL_CLASS = "laps-scroll";

// Helper: Format lap text for clipboard
export const formatLapsForClipboard = (laps) => {
  return laps
    .map(
      (lap, index) =>
        `${String(index + 1).padStart(2, "0")} +${formatTime(lap.lapTime)} ${formatTime(lap.totalTime)}`
    )
    .join("\n");
};

// Helper: Get button theme classes
export const getButtonThemeClasses = (isDarkMode, isActive = false) => {
  if (isActive) {
    return "bg-emerald-500/20 text-emerald-400";
  }
  return isDarkMode
    ? "text-slate-400 hover:text-white hover:bg-slate-700/50 disabled:text-slate-600"
    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:text-slate-400";
};

// Helper: Get text theme classes
export const getTextThemeClasses = (isDarkMode, color = "slate") => {
  const colorMap = {
    slate: isDarkMode ? "text-slate-400" : "text-slate-600",
    cyan: isDarkMode ? "text-cyan-400" : "text-cyan-600",
    amber: isDarkMode ? "text-amber-400" : "text-amber-600",
    emerald: isDarkMode ? "text-emerald-400" : "text-emerald-600",
  };
  return colorMap[color] || colorMap.slate;
};

// Helper: Get container theme classes
export const getContainerThemeClasses = (isDarkMode) => {
  return isDarkMode
    ? "bg-slate-800 border border-slate-700"
    : "bg-white border border-slate-300";
};

// Helper: Get lap item theme classes
export const getLapItemThemeClasses = (isDarkMode) => {
  return isDarkMode
    ? "bg-linear-to-r from-slate-700/30 to-slate-700/50 border-slate-600/30 hover:border-slate-500/50 hover:bg-linear-to-r hover:from-slate-700/50 hover:to-slate-700/70"
    : "bg-linear-to-r from-slate-200/50 to-slate-300/50 border-slate-300/50 hover:border-slate-400/50 hover:bg-linear-to-r hover:from-slate-200/70 hover:to-slate-300/70";
};
