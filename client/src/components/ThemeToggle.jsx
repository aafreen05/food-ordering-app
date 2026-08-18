// components/ThemeToggle.jsx
// A small sun/moon icon button that switches between light and dark mode.

import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-surface-alt)",
        border: "1px solid var(--color-border)",
        fontSize: "18px",
        transition: "background-color var(--transition-fast)",
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
