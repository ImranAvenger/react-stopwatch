import { FaKeyboard } from "react-icons/fa6";
import { getButtonThemeClasses } from "./constants";

export default function ShortcutsButton({ isDarkMode, shortcutsGuideRef }) {
  return (
    <button
      onClick={() => shortcutsGuideRef?.current?.toggleGuide()}
      className={`hidden lg:flex px-2 py-2 rounded-lg transition-all duration-300 enabled:cursor-pointer ${getButtonThemeClasses(isDarkMode)}`}
      title="Keyboard Shortcuts (Press ? or Click)"
      aria-label="Show keyboard shortcuts"
    >
      <FaKeyboard size={16} />
    </button>
  );
}
