import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import {Sun,Moon} from 'lucide-react'

const ThemeToggle = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 transition-colors rounded-full hover:bg-amber-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}

    </button>
  );
};

export default ThemeToggle;
