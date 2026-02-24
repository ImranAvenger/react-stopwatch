import {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect as React_useEffect,
} from "react";
import { FaKeyboard, FaX } from "react-icons/fa6";

const KeyboardShortcutsGuide = forwardRef(({ isDarkMode }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleGuide: () => setIsOpen((prev) => !prev),
    openGuide: () => setIsOpen(true),
    closeGuide: () => setIsOpen(false),
  }));

  // Handle Escape key to close the modal
  React_useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const shortcuts = [
    { key: "Space", action: "Start / Pause the timer" },
    { key: "L", action: "Record a lap" },
    { key: "R", action: "Reset the stopwatch" },
    { key: "C", action: "Copy all lap records" },
    { key: "Ctrl + S", action: "Toggle sound on/off" },
    { key: "Shift + T", action: "Toggle dark/light mode" },
    { key: "? (Shift + /)", action: "Show this guide" },
    { key: "Esc", action: "Close this guide" },
  ];

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className={`rounded-2xl border shadow-2xl max-w-md w-full p-6 animate-fadeIn transition-colors duration-300 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-300"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`text-2xl font-bold flex items-center gap-2 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                <FaKeyboard className="text-indigo-400" />
                Pro Tips
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`transition-colors duration-200 cursor-pointer p-1 rounded ${
                  isDarkMode
                    ? "text-slate-500 hover:text-slate-300 hover:bg-slate-700/30"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                }`}
                aria-label="Close shortcuts guide"
                title="Close (Esc)"
              >
                <FaX size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p
                className={`text-sm mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Use these keyboard shortcuts for faster control:
              </p>

              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                    isDarkMode
                      ? "bg-slate-700/50 border-slate-600/50 hover:border-slate-500/50"
                      : "bg-slate-100 border-slate-300/50 hover:border-slate-400/50"
                  }`}
                >
                  <div className="shrink-0">
                    <kbd
                      className={`px-3 py-2 rounded-lg font-semibold text-sm border shadow-md transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-slate-600 text-white border-slate-500"
                          : "bg-slate-200 text-slate-900 border-slate-400"
                      }`}
                    >
                      {shortcut.key}
                    </kbd>
                  </div>
                  <p
                    className={`text-sm flex-1 transition-colors duration-300 ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {shortcut.action}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className={`mt-6 pt-6 border-t transition-colors duration-300 ${
                isDarkMode ? "border-slate-600" : "border-slate-300"
              }`}
            >
              {" "}
              <p
                className={`text-xs text-center mb-4 transition-colors duration-300 ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                💡 Hover over buttons to see shortcuts
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className={`w-full font-semibold py-2 px-4 rounded-lg transition-all active:scale-95 cursor-pointer ${
                  isDarkMode
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcut to open/close modal */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
});

KeyboardShortcutsGuide.displayName = "KeyboardShortcutsGuide";
export default KeyboardShortcutsGuide;
