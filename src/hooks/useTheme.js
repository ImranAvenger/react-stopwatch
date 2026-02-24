import { useState, useEffect } from "react";

export function useTheme() {
  // Initialize theme from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("stopwatch_theme");
    if (savedTheme !== null) {
      try {
        return JSON.parse(savedTheme);
      } catch (error) {
        console.error("Failed to load theme from localStorage:", error);
        return true; // Default to dark mode
      }
    }
    return true; // Default to dark mode
  });

  // Save theme to localStorage and update document
  useEffect(() => {
    localStorage.setItem("stopwatch_theme", JSON.stringify(isDarkMode));

    // Update document class for tailwind dark mode
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return {
    isDarkMode,
    toggleTheme,
  };
}
