// main.js
import { applyTheme, toggleTheme } from "./utils/theme.js";

function initThemeToggle() {
  applyTheme();
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const mode = toggleTheme();
      btn.setAttribute("aria-label", `Theme: ${mode}`);
    });
  }
}

function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear().toString();
}

function initTagFilter() {
  const grid = document.getElementById("project-grid");
  const tags = document.querySelectorAll(".tag");
  if (!grid || !tags.length) return;

  tags.forEach((t) =>
    t.addEventListener("click", () => {
      tags.forEach((x) => x.classList.remove("is-active"));
      t.classList.add("is-active");
      const tag = t.dataset.tag;
      [...grid.children].forEach((card) => {
        const itemTags = (card.getAttribute("data-tags") || "").split(/\s+/);
        card.style.display = tag === "all" || itemTags.includes(tag) ? "" : "none";
      });
    }),
  );
}

function init() {
  initThemeToggle();
  initYear();
  initTagFilter();
}
init();
