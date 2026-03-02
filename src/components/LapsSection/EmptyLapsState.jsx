import { getTextThemeClasses } from "./constants";

export default function EmptyLapsState({ isDarkMode }) {
  return (
    <div
      className={`h-full flex flex-col items-center justify-center opacity-50 transition-colors duration-300 ${getTextThemeClasses(isDarkMode)}`}
    >
      <span className="text-4xl mb-2">⏱️</span>
      <p>Ready for your first lap?</p>
    </div>
  );
}
