import { useState, useEffect } from "react";

export function useSoundToggle() {
  // Initialize state from localStorage
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const savedSoundPreference = localStorage.getItem("stopwatch_sound");
    if (savedSoundPreference !== null) {
      try {
        return JSON.parse(savedSoundPreference);
      } catch (error) {
        console.error("Failed to load sound preference from localStorage:", error);
        return true;
      }
    }
    return true;
  });

  // Save sound preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("stopwatch_sound", JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = () => {
    setIsSoundEnabled((prev) => !prev);
  };

  return {
    isSoundEnabled,
    toggleSound,
  };
}
