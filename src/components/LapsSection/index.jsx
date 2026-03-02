import { useState, useEffect, useCallback } from "react";
import LapStatistics from "../LapStatistics";
import LapsHeader from "./LapsHeader";
import LapsList from "./LapsList";
import {
  COPY_TIMEOUT,
  COPY_KEYBOARD_KEY,
  formatLapsForClipboard,
  getContainerThemeClasses,
} from "./constants";

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

    const lapText = formatLapsForClipboard(laps);
    navigator.clipboard.writeText(lapText);
    setIsCopied(true);

    const timer = setTimeout(() => setIsCopied(false), COPY_TIMEOUT);
    return () => clearTimeout(timer);
  }, [laps]);

  // Handle keyboard shortcut for copy
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent conflicts with form inputs
      const isFormInput =
        e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
      if (isFormInput) return;

      if (e.code === COPY_KEYBOARD_KEY && laps.length > 0) {
        e.preventDefault();
        handleCopyLaps();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [laps, handleCopyLaps]);

  return (
    <div
      className={`rounded-3xl shadow-2xl p-6 mb-0 overflow-hidden flex flex-col landscape:mb-0 h-full transition-colors duration-300 ${getContainerThemeClasses(isDarkMode)}`}
    >
      <LapsHeader
        laps={laps}
        isCopied={isCopied}
        isDarkMode={isDarkMode}
        onCopyLaps={handleCopyLaps}
        shortcutsGuideRef={shortcutsGuideRef}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={onToggleSound}
        onToggleTheme={onToggleTheme}
      />

      <div className="mb-2">
        <LapStatistics laps={laps} isDarkMode={isDarkMode} />
      </div>

      <LapsList laps={laps} isDarkMode={isDarkMode} />
    </div>
  );
}
