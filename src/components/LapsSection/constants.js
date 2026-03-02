import { formatTime } from "../../utils/formatTime";
export {
  getButtonThemeClasses,
  getTextThemeClasses,
  getContainerThemeClasses,
  getLapItemThemeClasses,
} from "../UI/constants";

// Constants
export const COPY_TIMEOUT = 2000;
export const COPY_KEYBOARD_KEY = "KeyC";
export const MAX_LAPS = 99;
export const LAPS_SCROLL_CLASS = "laps-scroll";

// Helper: Format lap text for clipboard
export const formatLapsForClipboard = (laps) => {
  return laps
    .map(
      (lap, index) =>
        `${String(index + 1).padStart(2, "0")} +${formatTime(lap.lapTime)} ${formatTime(lap.totalTime)}`
    )
    .join("\n");
};
