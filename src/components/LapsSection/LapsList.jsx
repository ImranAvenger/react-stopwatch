import { LAPS_SCROLL_CLASS } from "./constants";
import LapItem from "./LapItem";
import EmptyLapsState from "./EmptyLapsState";

export default function LapsList({ laps, isDarkMode }) {
  if (laps.length === 0) {
    return (
      <div
        className={`overflow-y-auto flex-1 min-h-0 space-y-2 ${LAPS_SCROLL_CLASS}`}
      >
        <EmptyLapsState isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div
      className={`overflow-y-auto flex-1 min-h-0 space-y-2 ${LAPS_SCROLL_CLASS}`}
    >
      {[...laps].reverse().map((lap, index) => {
        const lapNumber = laps.length - index;
        return (
          <LapItem
            key={lap.id}
            lap={lap}
            lapNumber={lapNumber}
            isDarkMode={isDarkMode}
          />
        );
      })}
    </div>
  );
}
