import { FaCopy, FaCheck } from "react-icons/fa6";
import { getButtonThemeClasses } from "./constants";

export default function CopyButton({ isCopied, isDarkMode, lapsCount, onCopy }) {
  const isDisabled = lapsCount === 0;

  return (
    <button
      onClick={onCopy}
      disabled={isDisabled}
      className={`px-2 py-2 rounded-lg transition-all duration-300 enabled:cursor-pointer flex items-center justify-center ${getButtonThemeClasses(isDarkMode, isCopied)}`}
      title={isDisabled ? "No laps to copy" : "Copy lap records (C)"}
      aria-label={
        isDisabled ? "No laps to copy" : "Copy lap records (Keyboard: C)"
      }
    >
      {isCopied ? <FaCheck size={16} /> : <FaCopy size={16} />}
      <span
        className={`text-sm font-medium transition-all duration-300 ${
          isCopied ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        Copied
      </span>
    </button>
  );
}
