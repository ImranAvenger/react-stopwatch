import TimerDisplay from "./Timer/TimerDisplay";
import ControlPanel from "./Timer/ControlPanel";
import { getTimerSectionClass } from "../utils/styleHelpers";

export default function TimerSection({
  count,
  isRunning,
  isDarkMode,
  isFull,
  handlers,
  handleRecordLap,
}) {
  return (
    <section className={getTimerSectionClass(isDarkMode)}>
      <TimerDisplay count={count} isDarkMode={isDarkMode} />
      <ControlPanel
        isRunning={isRunning}
        onToggleTimer={handlers.handleToggleTimer}
        onRecordLap={handleRecordLap}
        onReset={handlers.handleResetTimer}
        canRecordLap={isRunning && !isFull()}
        canReset={!isRunning && count > 0}
        isDarkMode={isDarkMode}
      />
    </section>
  );
}
