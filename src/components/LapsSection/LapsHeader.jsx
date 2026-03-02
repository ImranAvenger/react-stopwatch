import SoundToggle from "../SoundToggle";
import ThemeToggle from "../ThemeToggle";
import CopyButton from "./CopyButton";
import ShortcutsButton from "./ShortcutsButton";
import { MAX_LAPS, getTextThemeClasses } from "./constants";

export default function LapsHeader({
  laps,
  isCopied,
  isDarkMode,
  onCopyLaps,
  shortcutsGuideRef,
  isSoundEnabled,
  onToggleSound,
  onToggleTheme,
}) {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <CopyButton
          isCopied={isCopied}
          isDarkMode={isDarkMode}
          lapsCount={laps.length}
          onCopy={onCopyLaps}
        />
        <ShortcutsButton
          isDarkMode={isDarkMode}
          shortcutsGuideRef={shortcutsGuideRef}
        />
        <SoundToggle
          isSoundEnabled={isSoundEnabled}
          onToggle={onToggleSound}
          isDarkMode={isDarkMode}
        />
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
      </div>
      <div
        className={`text-sm font-normal transition-colors duration-300 ${getTextThemeClasses(isDarkMode)}`}
      >
        {laps.length} / {MAX_LAPS}
      </div>
    </div>
  );
}
