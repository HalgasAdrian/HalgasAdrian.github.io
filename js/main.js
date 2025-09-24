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

// Expand/collapse project details on the projects page. Each project card toggles its "expanded" state when clicked.
// If the page is loaded with a hash corresponding to a project ID, that project will be automatically expanded and scrolled into view.
function initProjectExpand() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  cards.forEach((card) => {
    card.addEventListener('click', (event) => {
      // Prevent toggling when clicking links inside the card
      if (event.target && event.target.closest('a')) return;
      // Collapse all other cards first so only one card is expanded at a time
      cards.forEach((c) => {
        if (c !== card) {
          c.classList.remove('expanded');
          c.setAttribute('aria-expanded', 'false');
        }
      });
      // Toggle the clicked card's expanded state
      const shouldExpand = !card.classList.contains('expanded');
      card.classList.toggle('expanded', shouldExpand);
      card.setAttribute('aria-expanded', shouldExpand);
    });
  });

  // Auto-expand based on location hash
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const target = document.getElementById(id);
    if (target && target.classList.contains('project-card')) {
      // Collapse all cards first
      cards.forEach((c) => {
        c.classList.remove('expanded');
        c.setAttribute('aria-expanded', 'false');
      });
      target.classList.add('expanded');
      target.setAttribute('aria-expanded', 'true');
      // Scroll into view after a short delay to ensure layout is ready
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

function init() {
  initThemeToggle();
  initYear();
  initTagFilter();
  initProjectExpand();
}
init();
