import LapsSection from "./LapsSection";

export default function LapsPanel({
  laps,
  shortcutsGuideRef,
  isSoundEnabled,
  onToggleSound,
  isDarkMode,
  onToggleTheme,
}) {
  return (
    <section className="landscape:min-h-0 w-full">
      <LapsSection
        laps={laps}
        shortcutsGuideRef={shortcutsGuideRef}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={onToggleSound}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
    </section>
  );
}
