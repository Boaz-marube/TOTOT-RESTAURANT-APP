import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

const ThemeToggle = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 transition-colors rounded-full hover:bg-amber-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
    >
      {isDarkMode ? "☀️ Light Mode" : "🌙 DarkMode"}
    </button>
  );
};

export default ThemeToggle;
