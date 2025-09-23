// utils/theme.js
const THEME_KEY = "theme";

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "auto";
}

export function applyTheme(theme = getTheme()) {
  const root = document.documentElement;
  root.dataset.theme = theme; // keeps it simple for future theming
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === "dark" ? "light" : current === "light" ? "auto" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
  return next;
}
