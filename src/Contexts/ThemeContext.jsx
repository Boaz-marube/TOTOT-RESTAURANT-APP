import React, { createContext, useState, useEffect } from "react";

// 1️⃣ Create the context
export const ThemeContext = createContext();

// 2️⃣ Create the provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 3️⃣ Load saved theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  // 4️⃣ Toggle theme and update localStorage
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
