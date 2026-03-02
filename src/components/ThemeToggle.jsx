import { FaMoon } from "react-icons/fa6";
import { MdSunny } from "react-icons/md";

export default function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`px-2 py-2 rounded-lg transition-all duration-300 enabled:cursor-pointer flex items-center justify-center ${
        isDarkMode
          ? "text-blue-400 hover:text-blue-300 hover:bg-slate-700/50"
          : "text-amber-500 hover:text-amber-600 hover:bg-slate-200"
      }`}
      title={isDarkMode ? "Light Mode (Shift+T)" : "Dark Mode (Shift+T)"}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <FaMoon size={16} /> : <MdSunny size={16} />}
    </button>
  );
}
