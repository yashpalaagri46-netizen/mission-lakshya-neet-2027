/* =========================================
   MISSION LAKSHYA NEET 2027
   COMPLETE APP.JS
   35 THEMES + MODES + ALL FEATURES
========================================= */

"use strict";

/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId, button) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
  }

  document.querySelectorAll(".nav").forEach(nav => {
    nav.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  const sidebar = document.getElementById("sidebar");

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (pageId === "youtube") {
    loadYouTubeLive();
  }
}


/* =========================================
   SIDEBAR
========================================= */

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");

  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}


/* =========================================
   LIGHT / DARK MODE
========================================= */

function toggleLightDark() {
  const isLight =
    document.body.classList.toggle("light");

  localStorage.setItem(
    "mlLightMode",
    isLight ? "light" : "dark"
  );
}


/* =========================================
   35 THEMES
========================================= */

const themes = [

  {
    name: "Ocean Blue",
    icon: "🌊",
    accent: "#287cff",
    accent2: "#7c3cff",
    bg: "#06122f",
    bg2: "#0b1d46"
  },

  {
    name: "Purple",
    icon: "💜",
    accent: "#8b5cf6",
    accent2: "#c026d3",
    bg: "#18052f",
    bg2: "#2d0b46"
  },

  {
    name: "Cyber",
    icon: "⚡",
    accent: "#00f5ff",
    accent2: "#ff00d4",
    bg: "#020617",
    bg2: "#111827"
  },

  {
    name: "Midnight",
    icon: "🌙",
    accent: "#6366f1",
    accent2: "#312e81",
    bg: "#020617",
    bg2: "#0f172a"
  },

  {
    name: "Royal",
    icon: "👑",
    accent: "#a855f7",
    accent2: "#ec4899",
    bg: "#17052f",
    bg2: "#3b0764"
  },

  {
    name: "Sunset",
    icon: "🌅",
    accent: "#f97316",
    accent2: "#ef4444",
    bg: "#2b0b05",
    bg2: "#451a03"
  },

  {
    name: "Fire",
    icon: "🔥",
    accent: "#ef4444",
    accent2: "#f97316",
    bg: "#260505",
    bg2: "#451a03"
  },

  {
    name: "Rose",
    icon: "🌹",
    accent: "#f43f5e",
    accent2: "#ec4899",
    bg: "#2b0612",
    bg2: "#4a044e"
  },

  {
    name: "Pink",
    icon: "🩷",
    accent: "#ec4899",
    accent2: "#f472b6",
    bg: "#2a061c",
    bg2: "#500724"
  },

  {
    name: "Neon",
    icon: "💡",
    accent: "#22d3ee",
    accent2: "#a3e635",
    bg: "#061c20",
    bg2: "#132e18"
  },

  {
    name: "Electric",
    icon: "⚡",
    accent: "#38bdf8",
    accent2: "#2563eb",
    bg: "#031525",
    bg2: "#0c2d52"
  },

  {
    name: "Sky",
    icon: "☁️",
    accent: "#0ea5e9",
    accent2: "#38bdf8",
    bg: "#052235",
    bg2: "#0c4a6e"
  },

  {
    name: "Aqua",
    icon: "💧",
    accent: "#06b6d4",
    accent2: "#14b8a6",
    bg: "#03252b",
    bg2: "#064e3b"
  },

  {
    name: "Emerald",
    icon: "💚",
    accent: "#10b981",
    accent2: "#22c55e",
    bg: "#022c22",
    bg2: "#064e3b"
  },

  {
    name: "Forest",
    icon: "🌲",
    accent: "#16a34a",
    accent2: "#65a30d",
    bg: "#071f0d",
    bg2: "#173b12"
  },

  {
    name: "Lime",
    icon: "🍋",
    accent: "#84cc16",
    accent2: "#22c55e",
    bg: "#172005",
    bg2: "#365314"
  },

  {
    name: "Gold",
    icon: "🥇",
    accent: "#f59e0b",
    accent2: "#eab308",
    bg: "#241400",
    bg2: "#422006"
  },

  {
    name: "Amber",
    icon: "🟠",
    accent: "#f59e0b",
    accent2: "#f97316",
    bg: "#271000",
    bg2: "#431407"
  },

  {
    name: "Silver",
    icon: "🥈",
    accent: "#94a3b8",
    accent2: "#64748b",
    bg: "#111827",
    bg2: "#1e293b"
  },

  {
    name: "Slate",
    icon: "🪨",
    accent: "#64748b",
    accent2: "#475569",
    bg: "#0f172a",
    bg2: "#1e293b"
  },

  {
    name: "Ice",
    icon: "❄️",
    accent: "#bae6fd",
    accent2: "#38bdf8",
    bg: "#082f49",
    bg2: "#0c4a6e"
  },

  {
    name: "Lavender",
    icon: "🪻",
    accent: "#a78bfa",
    accent2: "#818cf8",
    bg: "#1e1b4b",
    bg2: "#312e81"
  },

  {
    name: "Violet",
    icon: "🔮",
    accent: "#7c3aed",
    accent2: "#4f46e5",
    bg: "#1e0745",
    bg2: "#312e81"
  },

  {
    name: "Plasma",
    icon: "🧬",
    accent: "#d946ef",
    accent2: "#8b5cf6",
    bg: "#2e0635",
    bg2: "#4c1d95"
  },

  {
    name: "Neon Pink",
    icon: "💗",
    accent: "#fb7185",
    accent2: "#e879f9",
    bg: "#2a0615",
    bg2: "#4a044e"
  },

  {
    name: "Red",
    icon: "❤️",
    accent: "#dc2626",
    accent2: "#f43f5e",
    bg: "#2a0505",
    bg2: "#450a0a"
  },

  {
    name: "Crimson",
    icon: "🟥",
    accent: "#be123c",
    accent2: "#e11d48",
    bg: "#2b0610",
    bg2: "#4c0519"
  },

  {
    name: "Cyan",
    icon: "🔵",
    accent: "#06b6d4",
    accent2: "#3b82f6",
    bg: "#03252b",
    bg2: "#082f49"
  },

  {
    name: "Blue Night",
    icon: "🌌",
    accent: "#3b82f6",
    accent2: "#6366f1",
    bg: "#020617",
    bg2: "#172554"
  },

  {
    name: "Galaxy",
    icon: "🌌",
    accent: "#8b5cf6",
    accent2: "#06b6d4",
    bg: "#090014",
    bg2: "#1e1b4b"
  },

  {
    name: "Space",
    icon: "🚀",
    accent: "#6366f1",
    accent2: "#06b6d4",
    bg: "#020617",
    bg2: "#172554"
  },

  {
    name: "Aurora",
    icon: "🌈",
    accent: "#22d3ee",
    accent2: "#a78bfa",
    bg: "#042f2e",
    bg2: "#172554"
  },

  {
    name: "Tropical",
    icon: "🌴",
    accent: "#14b8a6",
    accent2: "#f59e0b",
    bg: "#042f2e",
    bg2: "#164e63"
  },

  {
    name: "Ocean Purple",
    icon: "🌊",
    accent: "#06b6d4",
    accent2: "#8b5cf6",
    bg: "#07152f",
    bg2: "#24104f"
  },

  {
    name: "Neon Galaxy",
    icon: "✨",
    accent: "#00f5ff",
    accent2: "#a855f7",
    bg: "#020617",
    bg2: "#1e1045"
  }

];


/* =========================================
   APPLY THEME
========================================= */

function applyTheme(theme) {

  if (!theme) return;

  const root =
    document.documentElement;

  root.style.setProperty(
    "--accent",
    theme.accent
  );

  root.style.setProperty(
    "--accent2",
    theme.accent2
  );

  root.style.setProperty(
    "--bg",
    theme.bg
  );

  root.style.setProperty(
    "--bg2",
    theme.bg2
  );

  document.body.classList.remove(
    "light"
  );

  localStorage.setItem(
    "mlTheme",
    theme.name
  );

  localStorage.setItem(
    "mlLightMode",
    "dark"
  );

  updateSelectedTheme(theme.name);
}


/* =========================================
   SELECTED THEME UI
========================================= */

function updateSelectedTheme(name) {

  document
    .querySelectorAll(".theme-card")
    .forEach(card => {

      if (
        card.dataset.theme === name
      ) {

        card.style.outline =
          "3px solid var(--accent)";

        card.style.transform =
          "translateY(-5px) scale(1.03)";

      } else {

        card.style.outline =
          "none";

        card.style.transform =
          "";

      }

    });
}


/* =========================================
   CREATE 35 THEME CARDS
========================================= */

function createThemeCards() {

  const container =
    document.getElementById("themeList");

  if (!container) return;

  container.innerHTML = "";

  themes.forEach(theme => {

    const card =
      document.createElement("button");

    card.className =
      "theme-card";

    card.dataset.theme =
      theme.name;

    card.innerHTML = `
      <div style="font-size:30px;margin-bottom:6px;">
        ${theme.icon}
      </
