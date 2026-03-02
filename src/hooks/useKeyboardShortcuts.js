import { useEffect } from "react";

export function useKeyboardShortcuts(
  isRunning,
  count,
  shortcutsGuideRef,
  handlers,
  { toggleSound, toggleTheme }
) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent conflicts with form inputs
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlers.handleToggleTimer();
          break;
        case "KeyL":
          handlers.handleRecordLap();
          break;
        case "KeyR":
          if (!isRunning && count > 0) {
            handlers.handleResetTimer();
          }
          break;
        case "KeyS": // Control + S
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            toggleSound();
          }
          break;
        case "KeyT": // Shift + T
          if (e.shiftKey) {
            e.preventDefault();
            toggleTheme();
          }
          break;
        case "Slash": // Question mark key (Shift + /)
          if (e.shiftKey) {
            e.preventDefault();
            shortcutsGuideRef.current?.toggleGuide();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isRunning,
    count,
    handlers,
    toggleSound,
    toggleTheme,
    shortcutsGuideRef,
  ]);
}
