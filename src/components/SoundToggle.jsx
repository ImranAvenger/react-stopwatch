import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

export default function SoundToggle({ isSoundEnabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-12 rounded-full text-white text-lg flex items-center justify-center transition-all active:scale-95 hover:shadow-lg cursor-pointer ${
        isSoundEnabled
          ? "bg-purple-500 hover:bg-purple-600 hover:shadow-purple-500/50"
          : "bg-slate-600 hover:bg-slate-700 hover:shadow-slate-600/50"
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
      {isSoundEnabled ? <FaVolumeHigh /> : <FaVolumeXmark />}
    </button>
  );
}
