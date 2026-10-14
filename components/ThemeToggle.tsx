"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : preferredTheme;

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-indicator" aria-hidden="true" />
      <span>{theme === "dark" ? "DARK" : "LIGHT"}</span>
    </button>
  );
}