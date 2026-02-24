import { useState, useEffect, useCallback } from "react";
import { FaCopy, FaCheck, FaKeyboard } from "react-icons/fa6";
import { formatTime } from "../utils/formatTime";
import LapStatistics from "./LapStatistics";
import SoundToggle from "./SoundToggle";
import ThemeToggle from "./ThemeToggle";

export default function LapsSection({
  laps,
  shortcutsGuideRef,
  isSoundEnabled,
  onToggleSound,
  isDarkMode,
  onToggleTheme,
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLaps = useCallback(() => {
    if (laps.length === 0) return;

    const lapText = laps
      .map((lap, index) => {
        return `${index < 9 ? "0" + (index + 1) : index + 1} +${formatTime(lap.lapTime)} ${formatTime(lap.totalTime)}`;
      })
      .join("\n");

    navigator.clipboard.writeText(lapText);
    setIsCopied(true);

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [laps]);

  // Handle keyboard shortcut for copy
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent conflicts with form inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      if (e.code === "KeyC" && laps.length > 0) {
        e.preventDefault();
        handleCopyLaps();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [laps, handleCopyLaps]);

  return (
    <div
      className={`rounded-3xl shadow-2xl p-6 mb-0 overflow-hidden flex flex-col landscape:mb-0 h-full transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-800 border border-slate-700"
          : "bg-white border border-slate-300"
      }`}
    >
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLaps}
            disabled={laps.length === 0}
            className={`px-2 py-2 rounded-lg transition-all duration-300 enabled:cursor-pointer flex items-center justify-center ${
              isCopied
                ? "bg-emerald-500/20 text-emerald-400"
                : isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-slate-700/50 disabled:text-slate-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200 disabled:text-slate-400"
            }`}
            title={
              laps.length === 0 ? "No laps to copy" : "Copy lap records (C)"
            }
            aria-label={
              laps.length === 0
                ? "No laps to copy"
                : "Copy lap records (Keyboard: C)"
            }
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
          <button
            onClick={() => shortcutsGuideRef?.current?.toggleGuide()}
            className={`hidden lg:flex px-2 py-2 rounded-lg transition-all duration-300 enabled:cursor-pointer ${
              isDarkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-700/50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            }`}
            title="Keyboard Shortcuts (Press ? or Click)"
            aria-label="Show keyboard shortcuts"
          >
            <FaKeyboard size={16} />
          </button>
          <SoundToggle
            isSoundEnabled={isSoundEnabled}
            onToggle={onToggleSound}
            isDarkMode={isDarkMode}
          />
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        </div>
        <span
          className={`text-sm font-normal transition-colors duration-300 ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {laps.length} / 99
        </span>
      </div>

      <LapStatistics laps={laps} isDarkMode={isDarkMode} />

      <div className="overflow-y-auto flex-1 min-h-0 pr-2 space-y-2 laps-scroll">
        {laps.length === 0 ? (
          <div
            className={`h-full flex flex-col items-center justify-center opacity-50 transition-colors duration-300 ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
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
                  <div className="flex justify-between items-center bg-linear-to-r from-slate-700/30 to-slate-700/50 p-5 rounded-xl border border-slate-600/30 hover:border-slate-500/50 hover:bg-linear-to-r hover:from-slate-700/50 hover:to-slate-700/70 transition-all">
                    <span className="text-xl font-bold text-cyan-400">
                      {lapNumber}
                    </span>
                    <div className="text-amber-400 font-mono font-semibold text-lg">
                      +{formatTime(lap.lapTime)}
                    </div>
                    <div className="text-emerald-400 font-mono font-semibold text-lg">
                      {formatTime(lap.totalTime)}
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
