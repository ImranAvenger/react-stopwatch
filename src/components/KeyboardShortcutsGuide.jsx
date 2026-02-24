import { useState, useImperativeHandle, forwardRef } from "react";
import { FaKeyboard, FaX } from "react-icons/fa6";

const KeyboardShortcutsGuide = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggleGuide: () => setIsOpen((prev) => !prev),
    openGuide: () => setIsOpen(true),
    closeGuide: () => setIsOpen(false),
  }));

  const shortcuts = [
    { key: "Space", action: "Start / Pause the timer" },
    { key: "L", action: "Record a lap" },
    { key: "R", action: "Reset the stopwatch" },
    { key: "C", action: "Copy all lap records" },
    { key: "? (Shift + /)", action: "Show this guide" },
  ];

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <FaKeyboard className="text-indigo-400" />
                Pro Tips
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close shortcuts guide"
              >
                <FaX size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-slate-300 text-sm mb-4">
                Use these keyboard shortcuts for faster control:
              </p>

              {shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-all"
                >
                  <div className="shrink-0">
                    <kbd className="px-3 py-2 bg-slate-600 text-white rounded-lg font-semibold text-sm border border-slate-500 shadow-md">
                      {shortcut.key}
                    </kbd>
                  </div>
                  <p className="text-slate-300 text-sm flex-1">
                    {shortcut.action}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-slate-600">
              <p className="text-slate-400 text-xs text-center mb-4">
                💡 Hover over buttons to see shortcuts
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-all active:scale-95"
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
