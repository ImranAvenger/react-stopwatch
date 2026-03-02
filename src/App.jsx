import KeyboardShortcutsGuide from "./components/UI/KeyboardShortcutsGuide";
import TimerSection from "./components/TimerSection";
import LapsPanel from "./components/LapsPanel";
import { useAppInitialization } from "./hooks/useAppInitialization";
import { useAppHandlers } from "./hooks/useAppHandlers";
import { useAppEffects } from "./hooks/useAppEffects";
import { getPageBgClass, getLayoutGridClass } from "./utils/styleHelpers";

export default function App() {
  // Initialize all state and services
  const { shortcutsGuideRef, state, services } = useAppInitialization();

  // Setup all handlers
  const handlers = useAppHandlers(state, services);

  // Setup all side effects (events, persistence, etc)
  useAppEffects(state, handlers, shortcutsGuideRef, services);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${getPageBgClass(state.isDarkMode)}`}
    >
      <div className={getLayoutGridClass()}>
        <TimerSection
          count={state.count}
          isRunning={state.isRunning}
          isDarkMode={state.isDarkMode}
          isFull={state.isFull}
          handlers={handlers}
          handleRecordLap={handlers.handleRecordLap}
        />

        <LapsPanel
          laps={state.laps}
          shortcutsGuideRef={shortcutsGuideRef}
          isSoundEnabled={state.isSoundEnabled}
          onToggleSound={state.toggleSound}
          isDarkMode={state.isDarkMode}
          onToggleTheme={state.toggleTheme}
        />
      </div>

      <KeyboardShortcutsGuide
        ref={shortcutsGuideRef}
        isDarkMode={state.isDarkMode}
      />
    </div>
  );
}
