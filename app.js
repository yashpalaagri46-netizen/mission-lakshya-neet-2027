/* =========================================================
   MISSION LAKSHYA NEET 2027
   COMPLETE APP.JS
   35 THEMES + DISPLAY MODES
========================================================= */

"use strict";

/* =========================================================
   PAGE NAVIGATION
========================================================= */

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

  if (pageId === "themes") {
    renderThemes();
    renderModes();
  }
}


/* =========================================================
   SIDEBAR
========================================================= */

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");

  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}


/* =========================================================
   35 THEMES
========================================================= */

const themes = [

  {
    name: "Ocean Blue",
    icon: "🌊",
    bg: "#06122f",
    bg2: "#0b1d46",
    accent: "#287cff",
    accent2: "#00c6ff"
  },

  {
    name: "Purple Galaxy",
    icon: "🌌",
    bg: "#16002b",
    bg2: "#2b075e",
    accent: "#9b5cff",
    accent2: "#e040fb"
  },

  {
    name: "Cyberpunk",
    icon: "⚡",
    bg: "#090014",
    bg2: "#21002f",
    accent: "#ff00d4",
    accent2: "#00f7ff"
  },

  {
    name: "Midnight",
    icon: "🌙",
    bg: "#030712",
    bg2: "#111827",
    accent: "#60a5fa",
    accent2: "#818cf8"
  },

  {
    name: "Royal",
    icon: "👑",
    bg: "#10002b",
    bg2: "#240046",
    accent: "#c77dff",
    accent2: "#7b2cbf"
  },

  {
    name: "Sunset",
    icon: "🌅",
    bg: "#2a0a18",
    bg2: "#5c1627",
    accent: "#ff7b54",
    accent2: "#ff3d81"
  },

  {
    name: "Fire",
    icon: "🔥",
    bg: "#200000",
    bg2: "#4a0808",
    accent: "#ff3d00",
    accent2: "#ffb300"
  },

  {
    name: "Ruby",
    icon: "♦️",
    bg: "#21000a",
    bg2: "#4c0519",
    accent: "#ef4444",
    accent2: "#f43f5e"
  },

  {
    name: "Rose",
    icon: "🌹",
    bg: "#2a0718",
    bg2: "#500724",
    accent: "#fb7185",
    accent2: "#f472b6"
  },

  {
    name: "Pink Neon",
    icon: "💗",
    bg: "#220016",
    bg2: "#4a0035",
    accent: "#ff2da6",
    accent2: "#ff6bd6"
  },

  {
    name: "Violet",
    icon: "🔮",
    bg: "#13001f",
    bg2: "#2e0647",
    accent: "#a855f7",
    accent2: "#d946ef"
  },

  {
    name: "Indigo",
    icon: "💠",
    bg: "#080b2e",
    bg2: "#151b5c",
    accent: "#6366f1",
    accent2: "#8b5cf6"
  },

  {
    name: "Sky",
    icon: "☁️",
    bg: "#031a2e",
    bg2: "#064e6f",
    accent: "#38bdf8",
    accent2: "#22d3ee"
  },

  {
    name: "Ice",
    icon: "❄️",
    bg: "#061b2a",
    bg2: "#0c4a6e",
    accent: "#67e8f9",
    accent2: "#38bdf8"
  },

  {
    name: "Aqua",
    icon: "💧",
    bg: "#002525",
    bg2: "#004d4d",
    accent: "#2dd4bf",
    accent2: "#22d3ee"
  },

  {
    name: "Emerald",
    icon: "💎",
    bg: "#022c22",
    bg2: "#064e3b",
    accent: "#34d399",
    accent2: "#10b981"
  },

  {
    name: "Forest",
    icon: "🌲",
    bg: "#071f13",
    bg2: "#123d25",
    accent: "#4ade80",
    accent2: "#22c55e"
  },

  {
    name: "Lime",
    icon: "🍋",
    bg: "#162000",
    bg2: "#304500",
    accent: "#a3e635",
    accent2: "#84cc16"
  },

  {
    name: "Mint",
    icon: "🌿",
    bg: "#04251c",
    bg2: "#064e3b",
    accent: "#6ee7b7",
    accent2: "#34d399"
  },

  {
    name: "Gold",
    icon: "🏆",
    bg: "#211600",
    bg2: "#4a3000",
    accent: "#facc15",
    accent2: "#f59e0b"
  },

  {
    name: "Amber",
    icon: "🟠",
    bg: "#271000",
    bg2: "#542300",
    accent: "#fbbf24",
    accent2: "#f97316"
  },

  {
    name: "Orange",
    icon: "🍊",
    bg: "#2b1000",
    bg2: "#5a2200",
    accent: "#fb923c",
    accent2: "#f97316"
  },

  {
    name: "Coffee",
    icon: "☕",
    bg: "#1c0f08",
    bg2: "#3b1f12",
    accent: "#d6a56d",
    accent2: "#a16207"
  },

  {
    name: "Chocolate",
    icon: "🍫",
    bg: "#1b0b05",
    bg2: "#3a170c",
    accent: "#d97706",
    accent2: "#92400e"
  },

  {
    name: "Slate",
    icon: "🪨",
    bg: "#0f172a",
    bg2: "#1e293b",
    accent: "#94a3b8",
    accent2: "#64748b"
  },

  {
    name: "Silver",
    icon: "⚙️",
    bg: "#111827",
    bg2: "#374151",
    accent: "#d1d5db",
    accent2: "#9ca3af"
  },

  {
    name: "Neon Blue",
    icon: "🔵",
    bg: "#00122b",
    bg2: "#002d62",
    accent: "#00aaff",
    accent2: "#00e5ff"
  },

  {
    name: "Neon Purple",
    icon: "🟣",
    bg: "#18002e",
    bg2: "#350061",
    accent: "#c026ff",
    accent2: "#7c3cff"
  },

  {
    name: "Neon Red",
    icon: "🔴",
    bg: "#210005",
    bg2: "#52000c",
    accent: "#ff1744",
    accent2: "#ff5252"
  },

  {
    name: "Neon Cyan",
    icon: "🩵",
    bg: "#001b22",
    bg2: "#003c48",
    accent: "#00ffff",
    accent2: "#00bcd4"
  },

  {
    name: "Space",
    icon: "🚀",
    bg: "#020617",
    bg2: "#172554",
    accent: "#818cf8",
    accent2: "#38bdf8"
  },

  {
    name: "Galaxy",
    icon: "🌠",
    bg: "#0b0220",
    bg2: "#240046",
    accent: "#7c3aed",
    accent2: "#ec4899"
  },

  {
    name: "Matrix",
    icon: "🖥️",
    bg: "#001005",
    bg2: "#002b0d",
    accent: "#00ff41",
    accent2: "#00c853"
  },

  {
    name: "Hologram",
    icon: "🪩",
    bg: "#03111f",
    bg2: "#082f49",
    accent: "#22d3ee",
    accent2: "#a78bfa"
  },

  {
    name: "Aurora",
    icon: "🌌",
    bg: "#061826",
    bg2: "#102a43",
    accent: "#34d399",
    accent2: "#818cf8"
  }

];


/* =========================================================
   THEME APPLY
========================================================= */

function applyTheme(theme) {

  if (!theme) return;

  const root = document.documentElement;

  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--bg2", theme.bg2);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--accent2", theme.accent2);

  localStorage.setItem(
    "mlTheme",
    theme.name
  );

  document.body.classList.remove("light");

  localStorage.setItem(
    "mlLightMode",
    "dark"
  );

  updateThemeStatus(theme);
}


/* =========================================================
   THEME STATUS
========================================================= */

function updateThemeStatus(theme) {

  const title =
    document.querySelector("#themes h2");

  if (title) {

    title.innerHTML =
      `🎨 Themes & Modes <small style="
        font-size:14px;
        color:var(--accent);
        display:block;
        margin-top:8px;
      ">Active: ${theme.icon} ${theme.name}</small>`;
  }
}


/* =========================================================
   RENDER 35 THEMES
========================================================= */

function renderThemes() {

  const container =
    document.getElementById("themeList");

  if (!container) return;

  container.innerHTML = "";

  themes.forEach((theme, index) => {

    const card =
      document.createElement("button");

    card.className = "theme-card";

    card.type = "button";

    card.style.background =
      `linear-gradient(135deg,
        ${theme.accent},
        ${theme.accent2})`;

    card.innerHTML = `
      <div style="font-size:28px;">
        ${theme.icon}
      </div>

      <div style="
        margin-top:7px;
        font-size:14px;
      ">
        ${index + 1}. ${theme.name}
      </div>
    `;

    card.onclick = function () {
      applyTheme(theme);
    };

    container.appendChild(card);
  });
}


/* =========================================================
   DISPLAY MODES
========================================================= */

const displayModes = [

  {
    name: "Dark",
    icon: "🌙",
    action: "dark"
  },

  {
    name: "Light",
    icon: "☀️",
    action: "light"
  },

  {
    name: "Auto",
    icon: "🌓",
    action: "auto"
  },

  {
    name: "Glass",
    icon: "🪟",
    action: "glass"
  },

  {
    name: "Neon",
    icon: "💡",
    action: "neon"
  },

  {
    name: "Focus",
    icon: "🎯",
    action: "focus"
  },

  {
    name: "Compact",
    icon: "📱",
    action: "compact"
  },

  {
    name: "Comfort",
    icon: "👓",
    action: "comfort"
  },

  {
    name: "3D",
    icon: "🧊",
    action: "3d"
  },

  {
    name: "Minimal",
    icon: "✨",
    action: "minimal"
  }

];


/* =========================================================
   RENDER MODES
========================================================= */

function renderModes() {

  const container =
    document.getElementById("modeList");

  if (!container) return;

  container.innerHTML = "";

  displayModes.forEach(mode => {

    const button =
      document.createElement("button");

    button.className = "theme-card";

    button.type = "button";

    button.style.background =
      "linear-gradient(135deg,var(--accent),var(--accent2))";

    button.innerHTML = `
      <div style="font-size:27px;">
        ${mode.icon}
      </div>

      <div style="
        margin-top:6px;
        font-size:14px;
      ">
        ${mode.name}
      </div>
    `;

    button.onclick = function () {
      applyDisplayMode(mode.action);
    };

    container.appendChild(button);
  });
}


/* =========================================================
   DISPLAY MODE APPLY
========================================================= */

function applyDisplayMode(mode) {

  document.body.classList.remove(
    "light",
    "glass-mode",
    "neon-mode",
    "focus-mode",
    "compact-mode",
    "comfort-mode",
    "mode-3d",
    "minimal-mode"
  );

  if (mode === "light") {

    document.body.classList.add("light");

  }

  else if (mode === "glass") {

    document.body.classList.add("glass-mode");

  }

  else if (mode === "neon") {

    document.body.classList.add("neon-mode");

  }

  else if (mode === "focus") {

    document.body.classList.add("focus-mode");

  }

  else if (mode === "compact") {

    document.body.classList.add("compact-mode");

  }

  else if (mode === "comfort") {

    document.body.classList.add("comfort-mode");

  }

  else if (mode === "3d") {

    document.body.classList.add("mode-3d");

  }

  else if (mode === "minimal") {

    document.body.classList.add("minimal-mode");

  }

  else if (mode === "auto") {

    const prefersLight =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

    if (prefersLight) {
      document.body.classList.add("light");
    }
  }

  localStorage.setItem(
    "mlDisplayMode",
    mode
  );
}


/* =========================================================
   LIGHT / DARK BUTTON
========================================================= */

function toggleLightDark() {

  const isLight =
    document.body.classList.toggle("light");

  localStorage.setItem(
    "mlLightMode",
    isLight ? "light" : "dark"
  );

  localStorage.setItem(
    "mlDisplayMode",
    isLight ? "light" : "dark"
  );
}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

function loadSavedTheme() {

  const savedTheme =
    localStorage.getItem("mlTheme");

  if (savedTheme) {

    const theme =
      themes.find(
        t => t.name === savedTheme
      );

    if (theme) {
      applyTheme(theme);
    }
  }
}


/* =========================================================
   LOAD SAVED MODE
========================================================= */

function loadSavedMode() {

  const savedMode =
    localStorage.getItem("mlDisplayMode");

  if (savedMode) {
    applyDisplayMode(savedMode);
  }
}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function globalSearch() {

  const input =
    document.getElementById("globalSearch");

  if (!input) return;

  const q =
    input.value.toLowerCase().trim();

  if (!q) return;

  if (
    q.includes("book") ||
    q.includes("notes") ||
    q.includes("किताब")
  ) {

    showPage("books");

  }

  else if (
    q.includes("video") ||
    q.includes("lecture") ||
    q.includes("वीडियो")
  ) {

    showPage("videos");

  }

  else if (
    q.includes("test") ||
    q.includes("mock") ||
    q.includes("टेस्ट")
  ) {

    showPage("tests");

  }

  else if (
    q.includes("dpp") ||
    q.includes("practice")
  ) {

    showPage("dpp");

  }

  else if (
    q.includes("quiz") ||
    q.includes("question")
  ) {

    showPage("questionbank");

  }

  else if (
    q.includes("ai") ||
    q.includes("doubt") ||
    q.includes("सवाल")
  ) {

    showPage("ai");

  }

  else if (
    q.includes("youtube") ||
    q.includes("live")
  ) {

    showPage("youtube");

  }

  else if (
    q.includes("theme") ||
    q.includes("mode") ||
    q.includes("थीम")
  ) {

    showPage("themes");

  }

  else {

    showPage("websites");
  }
}


/* =========================================================
   YOUTUBE SEARCH
========================================================= */

function youtubeSearch(query) {

  if (!query) {

    const input =
      document.getElementById("youtubeQuery");

    if (input) {
      query = input.value.trim();
    }
  }

  if (!query) {

    alert(
      "पहले YouTube search लिखें।"
    );

    return;
  }

  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(query);

  window.open(url, "_blank");
}


function searchYouTube() {
  youtubeSearch();
}


/* =========================================================
   YOUTUBE LIVE
========================================================= */

async function loadYouTubeLive() {

  const status =
    document.getElementById("liveStatus");

  const container =
    document.getElementById("liveVideos");

  if (!status || !container) return;

  status.innerText =
    "🔄 Live classes खोजी जा रही हैं...";

  container.innerHTML = "";

  try {

    const response =
      await fetch("/api/youtube-live");

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ||
        "YouTube API error"
      );
    }

    if (
      !data.liveClasses ||
      data.liveClasses.length === 0
    ) {

      status.innerText =
        "🔴 अभी कोई live class नहीं मिली।";

      return;
    }

    status.innerText =
      "🔴 " +
      data.liveClasses.length +
      " live classes";

    data.liveClasses.forEach(video => {

      const card =
        document.createElement("div");

      card.className =
        "live-card";

      card.innerHTML = `

        <img
          src="${escapeHTML(video.thumbnail || "")}"
          alt="YouTube Live"
        >

        <h3>
          ${escapeHTML(
            video.title ||
            "Live Class"
          )}
        </h3>

        <p>
          ${escapeHTML(
            video.channelTitle ||
            ""
          )}
        </p>

        <button
          class="main-btn"
          onclick="playLive('${escapeHTML(
            video.videoId || ""
          )}')"
        >
          ▶️ Play Live
        </button>

        <button
          class="secondary-btn"
          onclick="window.open(
            '${escapeHTML(video.url || "#")}',
            '_blank'
          )"
        >
          💬 YouTube
        </button>

      `;

      container.appendChild(card);
    });

  }

  catch (error) {

    console.error(error);

    status.innerText =
      "⚠️ YouTube Live load नहीं हो सकी।";
  }
}


/* =========================================================
   PLAY YOUTUBE
========================================================= */

function playLive(videoId) {

  const player =
    document.getElementById(
      "youtubePlayer"
    );

  if (!player || !videoId) return;

  player.src =
    "https://www.youtube.com/embed/" +
    encodeURIComponent(videoId) +
    "?autoplay=1";

  player.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHTML(text) {

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================================
   AI DOUBT SOLVER
========================================================= */

async function askAI() {

  const questionBox =
    document.getElementById(
      "aiQuestion"
    );

  const answerBox =
    document.getElementById(
      "aiAnswer"
    );

  if (!questionBox || !answerBox) return;

  const question =
    questionBox.value.trim();

  if (!question) {

    answerBox.innerText =
      "⚠️ पहले अपना सवाल लिखें।";

    return;
  }

  answerBox.innerText =
    "🤖 AI सोच रहा है...";

  try {

    const response =
      await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          message: question
        })

      });

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ||
        "AI error"
      );
    }

    answerBox.innerText =
      data.answer ||
      "AI response नहीं मिला।";

  }

  catch (error) {

    console.error(
      "AI Error:",
      error
    );

    answerBox.innerText =
      "❌ AI Error: " +
      (
        error.message ||
        "Unknown error"
      );
  }
}


/* =========================================================
   TELEGRAM
========================================================= */

function openTelegram() {

  window.open(
    "https://t.me/Yashpal_aagri",
    "_blank"
  );
}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

  const container =
    document.getElementById(
      "particles"
    );

  if (!container) return;

  container.innerHTML = "";

  for (
    let i = 0;
    i < 80;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";

    particle.style.left =
      Math.random() * 100 +
      "%";

    particle.style.animationDuration =
      6 +
      Math.random() * 10 +
      "s";

    particle.style.animationDelay =
      Math.random() * 8 +
      "s";

    container.appendChild(
      particle
    );
  }
}


/* =========================================================
   WEBSITE LIST
========================================================= */

const studyWebsites = [

  {
    name: "StudyRays",
    url: "https://studyrays.cc",
    icon: "📚"
  },

  {
    name: "StudyPanda",
    url: "https://studypanda.live/books",
    icon: "🐼"
  },

  {
    name: "Learnify",
    url: "https://learnify.deltaverse.site/",
    icon: "🎓"
  },

  {
    name: "PW Study",
    url: "https://pw.studyparcham.in/#home-view",
    icon: "📖"
  },

  {
    name: "AS Multiverse",
    url: "https://asmultiverse.com/?tab=home",
    icon: "🌐"
  },

  {
    name: "PrepPro Network",
    url: "https://preppronetwork.vercel.app/",
    icon: "🚀"
  },

  {
    name: "Ved Study",
    url: "https://vedstudy.com/",
    icon: "🧠"
  },

  {
    name: "StudyBee Pro",
    url: "http://studybeepro.site",
    icon: "🐝"
  },

  {
    name: "Learn By AKP",
    url: "https://learnbyakp.site",
    icon: "🎯"
  },

  {
    name: "Rolex CoderZ",
    url: "http://RolexCoderZ.in",
    icon: "💻"
  }

];


function renderWebsites() {

  const container =
    document.getElementById(
      "websiteList"
    );

  if (!container) return;

  container.innerHTML = "";

  studyWebsites.forEach(site => {

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "website-card";

    card.innerHTML = `

      <div style="
        font-size:40px;
        margin-bottom:10px;
      ">
        ${site.icon}
      </div>

      <h3>
        ${site.name}
      </h3>

      <p>
        Study resource
      </p>

      <button
        class="main-btn"
        onclick="window.open(
          '${site.url}',
          '_blank'
        )"
      >
        Open Website
      </button>

    `;

    container.appendChild(card);
  });
}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      const search =
        document.getElementById(
          "globalSearch"
        );

      if (search) {
        search.focus();
      }
    }

    if (event.key === "Escape") {

      const sidebar =
        document.getElementById(
          "sidebar"
        );

      if (sidebar) {
        sidebar.classList.remove(
          "open"
        );
      }
    }

  }
);


/* =========================================================
   START APP
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    createParticles();

    renderThemes();

    renderModes();

    renderWebsites();

    loadSavedTheme();

    loadSavedMode();

    console.log(
      "🚀 Mission Lakshya NEET 2027 loaded!"
    );

    console.log(
      "🎨 35 Themes Loaded!"
    );

    console.log(
      "⚙️ Display Modes Loaded!"
    );

  }
);
