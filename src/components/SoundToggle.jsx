import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

export default function SoundToggle({ isSoundEnabled, onToggle, isDarkMode }) {
  return (
    <button
      onClick={onToggle}
      className={`px-2 py-2 rounded-lg transition-all duration-300 enabled:cursor-pointer flex items-center justify-center ${
        isSoundEnabled
          ? isDarkMode
            ? "text-slate-400 hover:text-white hover:bg-slate-700/50"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
          : isDarkMode
            ? "text-slate-600 hover:text-slate-400 hover:bg-slate-700/50"
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
      }`}
      title={
        isSoundEnabled
          ? "Sound On (Mute: Ctrl+S)"
          : "Sound Off (Unmute: Ctrl+S)"
      }
      aria-label={
        isSoundEnabled ? "Disable sound effects" : "Enable sound effects"
      }
    >
      {isSoundEnabled ? (
        <FaVolumeHigh size={16} />
      ) : (
        <FaVolumeXmark size={16} />
      )}
    </button>
  );
}
