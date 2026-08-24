/* =========================================================
   MISSION LAKSHYA NEET 2027
   COMPLETE MAIN APP JAVASCRIPT
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {
  theme: "mlTheme",
  mode: "mlMode",
  lightDark: "mlLightMode",
  streak: "mlStudyStreak",
  progress: "mlProgress",
  bookmarks: "mlBookmarks",
  planner: "mlPlanner",
  revision: "mlRevision",
  tests: "mlTests"
};

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId, button = null) {

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
  }

  if (pageId === "dashboard") {
    updateDashboard();
  }

  if (pageId === "performance") {
    updatePerformance();
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

const THEMES = [

  {
    id: "default",
    name: "Mission Blue",
    icon: "🚀",
    primary: "#2563eb",
    secondary: "#06b6d4",
    background: "#07111f",
    card: "#101c2d",
    text: "#f8fafc"
  },

  {
    id: "ocean",
    name: "Ocean",
    icon: "🌊",
    primary: "#0284c7",
    secondary: "#14b8a6",
    background: "#031827",
    card: "#082f49",
    text: "#e0f2fe"
  },

  {
    id: "purple",
    name: "Royal Purple",
    icon: "💜",
    primary: "#8b5cf6",
    secondary: "#c026d3",
    background: "#160b25",
    card: "#27133d",
    text: "#faf5ff"
  },

  {
    id: "pink",
    name: "Pink Dream",
    icon: "🌸",
    primary: "#ec4899",
    secondary: "#f43f5e",
    background: "#250b18",
    card: "#3b1028",
    text: "#fff1f2"
  },

  {
    id: "red",
    name: "Red Power",
    icon: "❤️",
    primary: "#ef4444",
    secondary: "#f97316",
    background: "#250909",
    card: "#3b1111",
    text: "#fff1f2"
  },

  {
    id: "orange",
    name: "Orange Energy",
    icon: "🟠",
    primary: "#f97316",
    secondary: "#eab308",
    background: "#241005",
    card: "#3a1b08",
    text: "#fff7ed"
  },

  {
    id: "yellow",
    name: "Study Yellow",
    icon: "💛",
    primary: "#eab308",
    secondary: "#f59e0b",
    background: "#211a03",
    card: "#382d06",
    text: "#fefce8"
  },

  {
    id: "green",
    name: "Success Green",
    icon: "💚",
    primary: "#22c55e",
    secondary: "#10b981",
    background: "#061b10",
    card: "#0b2b1b",
    text: "#ecfdf5"
  },

  {
    id: "emerald",
    name: "Emerald",
    icon: "💎",
    primary: "#10b981",
    secondary: "#14b8a6",
    background: "#031914",
    card: "#073b32",
    text: "#ecfdf5"
  },

  {
    id: "lime",
    name: "Lime",
    icon: "🍀",
    primary: "#84cc16",
    secondary: "#22c55e",
    background: "#111b05",
    card: "#24310b",
    text: "#f7fee7"
  },

  {
    id: "teal",
    name: "Teal",
    icon: "🩵",
    primary: "#14b8a6",
    secondary: "#06b6d4",
    background: "#031a1a",
    card: "#083a3a",
    text: "#f0fdfa"
  },

  {
    id: "cyan",
    name: "Cyan",
    icon: "🔵",
    primary: "#06b6d4",
    secondary: "#3b82f6",
    background: "#031720",
    card: "#083344",
    text: "#ecfeff"
  },

  {
    id: "sky",
    name: "Sky Blue",
    icon: "☁️",
    primary: "#0ea5e9",
    secondary: "#38bdf8",
    background: "#061622",
    card: "#0c3048",
    text: "#f0f9ff"
  },

  {
    id: "indigo",
    name: "Indigo",
    icon: "🔷",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    background: "#0c0b24",
    card: "#1e1b4b",
    text: "#eef2ff"
  },

  {
    id: "violet",
    name: "Violet",
    icon: "🔮",
    primary: "#7c3aed",
    secondary: "#6366f1",
    background: "#12091f",
    card: "#2e1065",
    text: "#f5f3ff"
  },

  {
    id: "rose",
    name: "Rose",
    icon: "🌹",
    primary: "#e11d48",
    secondary: "#db2777",
    background: "#230812",
    card: "#4c0519",
    text: "#fff1f2"
  },

  {
    id: "fuchsia",
    name: "Fuchsia",
    icon: "🪄",
    primary: "#d946ef",
    secondary: "#ec4899",
    background: "#220b24",
    card: "#3b0a45",
    text: "#fdf4ff"
  },

  {
    id: "slate",
    name: "Slate",
    icon: "🩶",
    primary: "#64748b",
    secondary: "#94a3b8",
    background: "#0f172a",
    card: "#1e293b",
    text: "#f8fafc"
  },

  {
    id: "silver",
    name: "Silver",
    icon: "⚪",
    primary: "#94a3b8",
    secondary: "#cbd5e1",
    background: "#111827",
    card: "#374151",
    text: "#f9fafb"
  },

  {
    id: "gold",
    name: "Gold",
    icon: "🏆",
    primary: "#f59e0b",
    secondary: "#eab308",
    background: "#1c1404",
    card: "#3b2a08",
    text: "#fffbeb"
  },

  {
    id: "midnight",
    name: "Midnight",
    icon: "🌌",
    primary: "#3b82f6",
    secondary: "#6366f1",
    background: "#020617",
    card: "#0f172a",
    text: "#e2e8f0"
  },

  {
    id: "space",
    name: "Space",
    icon: "🚀",
    primary: "#8b5cf6",
    secondary: "#06b6d4",
    background: "#030014",
    card: "#11102b",
    text: "#f8fafc"
  },

  {
    id: "sunset",
    name: "Sunset",
    icon: "🌅",
    primary: "#f97316",
    secondary: "#ec4899",
    background: "#210b0b",
    card: "#3b1512",
    text: "#fff7ed"
  },

  {
    id: "forest",
    name: "Forest",
    icon: "🌲",
    primary: "#16a34a",
    secondary: "#84cc16",
    background: "#06150a",
    card: "#12351a",
    text: "#f0fdf4"
  },

  {
    id: "fire",
    name: "Fire",
    icon: "🔥",
    primary: "#ef4444",
    secondary: "#f59e0b",
    background: "#200604",
    card: "#3b0f08",
    text: "#fff7ed"
  },

  {
    id: "ice",
    name: "Ice",
    icon: "❄️",
    primary: "#38bdf8",
    secondary: "#a5f3fc",
    background: "#06141b",
    card: "#0c3040",
    text: "#ecfeff"
  },

  {
    id: "neon",
    name: "Neon",
    icon: "⚡",
    primary: "#22d3ee",
    secondary: "#f0abfc",
    background: "#05000d",
    card: "#130d22",
    text: "#f8fafc"
  },

  {
    id: "matrix",
    name: "Matrix",
    icon: "🟢",
    primary: "#22c55e",
    secondary: "#4ade80",
    background: "#000a03",
    card: "#051a0b",
    text: "#dcfce7"
  },

  {
    id: "coffee",
    name: "Coffee",
    icon: "☕",
    primary: "#d97706",
    secondary: "#a16207",
    background: "#170e08",
    card: "#2d1b12",
    text: "#fff7ed"
  },

  {
    id: "chocolate",
    name: "Chocolate",
    icon: "🍫",
    primary: "#a16207",
    secondary: "#92400e",
    background: "#160b06",
    card: "#32170d",
    text: "#fef3c7"
  },

  {
    id: "lavender",
    name: "Lavender",
    icon: "🌷",
    primary: "#a78bfa",
    secondary: "#c4b5fd",
    background: "#120f1f",
    card: "#28203d",
    text: "#faf5ff"
  },

  {
    id: "aqua",
    name: "Aqua",
    icon: "💧",
    primary: "#06b6d4",
    secondary: "#2dd4bf",
    background: "#021719",
    card: "#07383b",
    text: "#ecfeff"
  },

  {
    id: "study",
    name: "Study Pro",
    icon: "📚",
    primary: "#2563eb",
    secondary: "#22c55e",
    background: "#07130d",
    card: "#10251a",
    text: "#f0fdf4"
  },

  {
    id: "medical",
    name: "Medical",
    icon: "🩺",
    primary: "#0ea5e9",
    secondary: "#22c55e",
    background: "#04151b",
    card: "#0b3035",
    text: "#f0fdfa"
  },

  {
    id: "minimal",
    name: "Minimal",
    icon: "◻️",
    primary: "#64748b",
    secondary: "#3b82f6",
    background: "#111827",
    card: "#1f2937",
    text: "#f9fafb"
  }

];


/* =========================================================
   DISPLAY MODES
   ========================================================= */

const MODES = [

  {
    id: "normal",
    name: "Normal Mode",
    icon: "🖥️",
    description: "Normal interface"
  },

  {
    id: "light",
    name: "Light Mode",
    icon: "☀️",
    description: "Bright interface"
  },

  {
    id: "dark",
    name: "Dark Mode",
    icon: "🌙",
    description: "Dark interface"
  },

  {
    id: "focus",
    name: "Focus Mode",
    icon: "🎯",
    description: "Distraction-free study"
  },

  {
    id: "reading",
    name: "Reading Mode",
    icon: "📖",
    description: "Comfortable reading"
  },

  {
    id: "night",
    name: "Night Study",
    icon: "🌌",
    description: "Low-light study"
  },

  {
    id: "glass",
    name: "Glass Mode",
    icon: "💎",
    description: "Glass effect"
  },

  {
    id: "neon",
    name: "Neon Mode",
    icon: "⚡",
    description: "Bright neon effect"
  },

  {
    id: "compact",
    name: "Compact Mode",
    icon: "📱",
    description: "More content on screen"
  },

  {
    id: "study",
    name: "Study Mode",
    icon: "📚",
    description: "Study-focused interface"
  }

];


/* =========================================================
   APPLY THEME
   ========================================================= */

function applyTheme(themeId) {

  const theme =
    THEMES.find(item => item.id === themeId) ||
    THEMES[0];

  const root = document.documentElement;

  root.style.setProperty("--theme-primary", theme.primary);
  root.style.setProperty("--theme-secondary", theme.secondary);
  root.style.setProperty("--theme-background", theme.background);
  root.style.setProperty("--theme-card", theme.card);
  root.style.setProperty("--theme-text", theme.text);

  document.body.dataset.theme = theme.id;

  save(STORAGE.theme, theme.id);

  document.querySelectorAll(".theme-card").forEach(card => {
    card.classList.toggle(
      "selected",
      card.dataset.theme === theme.id
    );
  });
}


/* =========================================================
   APPLY DISPLAY MODE
   ========================================================= */

function applyMode(modeId) {

  document.body.classList.remove(
    "mode-normal",
    "mode-light",
    "mode-dark",
    "mode-focus",
    "mode-reading",
    "mode-night",
    "mode-glass",
    "mode-neon",
    "mode-compact",
    "mode-study"
  );

  document.body.classList.add(
    "mode-" + modeId
  );

  save(STORAGE.mode, modeId);

  document.querySelectorAll(".mode-card").forEach(card => {
    card.classList.toggle(
      "selected",
      card.dataset.mode === modeId
    );
  });

  if (modeId === "light") {
    document.body.classList.add("light");
    save(STORAGE.lightDark, "light");
  } else if (modeId === "dark" || modeId === "night") {
    document.body.classList.remove("light");
    save(STORAGE.lightDark, "dark");
  }
}


/* =========================================================
   RENDER THEMES
   ========================================================= */

function renderThemes() {

  const themeList =
    document.getElementById("themeList");

  const modeList =
    document.getElementById("modeList");

  if (modeList) {

    modeList.innerHTML = MODES.map(mode => `
      <button
        type="button"
        class="mode-card"
        data-mode="${escapeHTML(mode.id)}"
        onclick="selectMode('${escapeHTML(mode.id)}')"
      >
        <div class="theme-icon">
          ${mode.icon}
        </div>

        <h3>
          ${escapeHTML(mode.name)}
        </h3>

        <p>
          ${escapeHTML(mode.description)}
        </p>
      </button>
    `).join("");
  }


  if (themeList) {

    themeList.innerHTML = THEMES.map(theme => `
      <button
        type="button"
        class="theme-card"
        data-theme="${escapeHTML(theme.id)}"
        onclick="selectTheme('${escapeHTML(theme.id)}')"
        style="
          --preview-primary:${theme.primary};
          --preview-secondary:${theme.secondary};
          --preview-bg:${theme.background};
        "
      >
        <div
          class="theme-preview"
          aria-hidden="true"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="theme-icon">
          ${theme.icon}
        </div>

        <h3>
          ${escapeHTML(theme.name)}
        </h3>

        <p>
          Theme apply करें
        </p>
      </button>
    `).join("");
  }


  const savedTheme =
    load(STORAGE.theme, "default");

  const savedMode =
    load(STORAGE.mode, "normal");

  applyTheme(savedTheme);
  applyMode(savedMode);
}


function selectTheme(themeId) {

  applyTheme(themeId);

  const theme =
    THEMES.find(item => item.id === themeId);

  if (theme) {
    showToast(
      `${theme.icon} ${theme.name} Theme लागू हो गया।`
    );
  }
}


function selectMode(modeId) {

  applyMode(modeId);

  const mode =
    MODES.find(item => item.id === modeId);

  if (mode) {
    showToast(
      `${mode.icon} ${mode.name} चालू हो गया।`
    );
  }
}


/* =========================================================
   LIGHT / DARK BUTTON
   ========================================================= */

function toggleLightDark() {

  const isLight =
    document.body.classList.contains("light");

  if (isLight) {
    document.body.classList.remove("light");
    applyMode("dark");
  } else {
    document.body.classList.add("light");
    applyMode("light");
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

  if (!q) {
    showToast("🔍 पहले कुछ search करें।");
    return;
  }

  if (
    q.includes("book") ||
    q.includes("किताब") ||
    q.includes("notes") ||
    q.includes("नोट")
  ) {
    showPage("books");
  }

  else if (
    q.includes("video") ||
    q.includes("lecture") ||
    q.includes("वीडियो") ||
    q.includes("लेक्चर")
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
    q.includes("question") ||
    q.includes("mcq")
  ) {
    showPage("questionbank");
  }

  else if (
    q.includes("pyq")
  ) {
    showPage("pyq");
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

  else if (
    q.includes("planner") ||
    q.includes("plan") ||
    q.includes("प्लान")
  ) {
    showPage("planner");
  }

  else if (
    q.includes("revision") ||
    q.includes("revise") ||
    q.includes("रिविजन")
  ) {
    showPage("revision");
  }

  else if (
    q.includes("profile") ||
    q.includes("प्रोफाइल")
  ) {
    showPage("profile");
  }

  else if (
    q.includes("performance") ||
    q.includes("score") ||
    q.includes("परफॉर्मेंस")
  ) {
    showPage("performance");
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
    showToast("🔍 पहले YouTube search लिखें।");
    return;
  }

  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(query);

  window.open(url, "_blank", "noopener");
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
        data.error || "YouTube API error"
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

      card.className = "live-card";

      const thumbnail =
        escapeHTML(video.thumbnail || "");

      const title =
        escapeHTML(
          video.title || "Live Class"
        );

      const channel =
        escapeHTML(
          video.channelTitle || ""
        );

      const videoId =
        escapeHTML(
          video.videoId || ""
        );

      card.innerHTML = `
        <img
          src="${thumbnail}"
          alt="YouTube Live"
          loading="lazy"
        >

        <h3>
          ${title}
        </h3>

        <p>
          ${channel}
        </p>

        <button
          class="main-btn"
          onclick="playLive('${videoId}')"
        >
          ▶️ Play Live
        </button>

        <button
          class="secondary-btn"
          onclick="openYouTubeVideo('${videoId}')"
        >
          💬 YouTube
        </button>
      `;

      container.appendChild(card);
    });

  } catch (error) {

    console.error(
      "YouTube Live Error:",
      error
    );

    status.innerText =
      "⚠️ YouTube Live load नहीं हो सकी।";
  }
}


/* =========================================================
   PLAY YOUTUBE VIDEO
   ========================================================= */

function playLive(videoId) {

  const player =
    document.getElementById("youtubePlayer");

  if (!player || !videoId) return;

  player.src =
    "https://www.youtube.com/embed/" +
    encodeURIComponent(videoId) +
    "?autoplay=1";

  player.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  updateYouTubeChat(videoId);
}


function openYouTubeVideo(videoId) {

  if (!videoId) return;

  window.open(
    "https://www.youtube.com/watch?v=" +
      encodeURIComponent(videoId),
    "_blank",
    "noopener"
  );
}


/* =========================================================
   YOUTUBE CHAT
   ========================================================= */

function updateYouTubeChat(videoId) {

  const chat =
    document.getElementById("youtubeChat");

  if (!chat || !videoId) return;

  chat.innerHTML = `
    <h3>💬 Live Chat</h3>

    <p class="section-subtitle">
      Live chat YouTube stream के साथ उपलब्ध है।
    </p>

    <button
      class="main-btn"
      onclick="openYouTubeVideo('${escapeHTML(videoId)}')"
    >
      💬 Open YouTube Live Chat
    </button>
  `;
}


/* =========================================================
   AI DOUBT SOLVER
   ========================================================= */

async function askAI() {

  const questionBox =
    document.getElementById("aiQuestion");

  const answerBox =
    document.getElementById("aiAnswer");

  if (!questionBox || !answerBox) return;

  const question =
    questionBox.value.trim();

  if (!question) {

    answerBox.innerText =
      "⚠️ पहले अपना सवाल लिखें।";

    return;
  }

  answerBox.innerText =
    "🤖 Gemini AI सोच रहा है...";

  try {

    const response =
      await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: question
        })
      });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {

      throw new Error(
        data.error ||
        `Server Error (${response.status})`
      );
    }

    answerBox.innerText =
      data.answer ||
      "AI response नहीं मिला।";

  } catch (error) {

    console.error(
      "AI Error:",
      error
    );

    answerBox.innerText =
      "❌ AI से connection नहीं हो पाया।\n\n" +
      "कारण: " +
      (error.message || "Unknown error");
  }
}


/* =========================================================
   PROGRESS SYSTEM
   ========================================================= */

function getProgress() {

  return load(STORAGE.progress, {
    chapters: 0,
    lectures: 0,
    questions: 0,
    tests: 0
  });
}


function updateProgress(type, amount = 1) {

  const progress =
    getProgress();

  if (
    typeof progress[type] !== "number"
  ) {
    progress[type] = 0;
  }

  progress[type] += amount;

  save(
    STORAGE.progress,
    progress
  );

  updateDashboard();
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

  const progress =
    getProgress();

  const chapter =
    document.getElementById("chapterProgress");

  if (chapter) {
    chapter.innerText =
      `${progress.chapters || 0} Chapters Completed`;
  }

  const testHistory =
    document.getElementById("testHistory");

  if (testHistory) {
    testHistory.innerText =
      `${progress.tests || 0} Tests Attempted`;
  }

  const streak =
    document.getElementById("studyStreak");

  if (streak) {

    const value =
      load(STORAGE.streak, 0);

    streak.innerText =
      `${value} Days`;
  }
}


/* =========================================================
   PERFORMANCE
   ========================================================= */

function updatePerformance() {

  const progress =
    getProgress();

  const totalQuestions =
    progress.questions || 0;

  const tests =
    progress.tests || 0;

  console.log(
    "Performance:",
    {
      totalQuestions,
      tests
    }
  );
}


/* =========================================================
   STUDY STREAK
   ========================================================= */

function updateStudyStreak() {

  const today =
    new Date().toISOString().slice(0, 10);

  const streakData =
    load(STORAGE.streak, {
      count: 0,
      lastDate: null
    });

  if (
    typeof streakData === "number"
  ) {

    save(
      STORAGE.streak,
      {
        count: streakData,
        lastDate: today
      }
    );

    return;
  }

  if (
    streakData.lastDate === today
  ) {
    return;
  }

  let count =
    Number(streakData.count || 0);

  if (streakData.lastDate) {

    const previous =
      new Date(
        streakData.lastDate
      );

    const current =
      new Date(today);

    const difference =
      Math.floor(
        (current - previous) /
        86400000
      );

    if (difference === 1) {
      count++;
    } else if (difference > 1) {
      count = 1;
    }

  } else {
    count = 1;
  }

  save(
    STORAGE.streak,
    {
      count,
      lastDate: today
    }
  );
}


/* =========================================================
   BOOKMARK SYSTEM
   ========================================================= */

function addBookmark(item) {

  if (!item) return;

  const bookmarks =
    load(
      STORAGE.bookmarks,
      []
    );

  if (!bookmarks.includes(item)) {

    bookmarks.push(item);

    save(
      STORAGE.bookmarks,
      bookmarks
    );

    showToast(
      "🔖 Bookmark saved"
    );
  }
}


function removeBookmark(item) {

  let bookmarks =
    load(
      STORAGE.bookmarks,
      []
    );

  bookmarks =
    bookmarks.filter(
      value => value !== item
    );

  save(
    STORAGE.bookmarks,
    bookmarks
  );
}


/* =========================================================
   PLANNER
   ========================================================= */

function savePlannerData(data) {

  save(
    STORAGE.planner,
    data
  );

  showToast(
    "📅 Study plan saved"
  );
}


function getPlannerData() {

  return load(
    STORAGE.planner,
    []
  );
}


/* =========================================================
   REVISION
   ========================================================= */

function saveRevisionData(data) {

  save(
    STORAGE.revision,
    data
  );

  showToast(
    "🔄 Revision saved"
  );
}


function getRevisionData() {

  return load(
    STORAGE.revision,
    []
  );
}


/* =========================================================
   TEST HISTORY
   ========================================================= */

function saveTestResult(result) {

  const history =
    load(
      STORAGE.tests,
      []
    );

  history.push({
    ...result,
    date: new Date().toISOString()
  });

  save(
    STORAGE.tests,
    history
  );

  updateProgress(
    "tests",
    1
  );

  showToast(
    "📝 Test result saved"
  );
}


function getTestHistory() {

  return load(
    STORAGE.tests,
    []
  );
}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function checkAchievements() {

  const progress =
    getProgress();

  const streakData =
    load(
      STORAGE.streak,
      {
        count: 0
      }
    );

  if (
    progress.tests >= 1
  ) {
    showToast(
      "🏅 Achievement: First Test!"
    );
  }

  if (
    progress.chapters >= 5
  ) {
    showToast(
      "🏆 Achievement: 5 Chapters!"
    );
  }

  if (
    Number(streakData.count || 0) >= 7
  ) {
    showToast(
      "🔥 Achievement: 7 Day Streak!"
    );
  }
}


/* =========================================================
   STUDY WEBSITES
   ========================================================= */

const STUDY_WEBSITES = [

  {
    name: "NCERT",
    icon: "📚",
    description: "Official NCERT study resources",
    url: "https://ncert.nic.in/"
  },

  {
    name: "NEET",
    icon: "🎯",
    description: "NEET related official information",
    url: "https://neet.nta.nic.in/"
  },

  {
    name: "YouTube",
    icon: "▶️",
    description: "Video lectures and live classes",
    url: "https://www.youtube.com/"
  },

  {
    name: "Khan Academy",
    icon: "🎓",
    description: "Free educational resources",
    url: "https://www.khanacademy.org/"
  }

];


function renderWebsites() {

  const container =
    document.getElementById("websiteList");

  if (!container) return;

  container.innerHTML =
    STUDY_WEBSITES.map(site => `
      <div class="feature-card">

        <div>
          ${site.icon}
        </div>

        <h3>
          ${escapeHTML(site.name)}
        </h3>

        <p>
          ${escapeHTML(site.description)}
        </p>

        <button
          class="main-btn"
          onclick="openWebsite('${escapeHTML(site.url)}')"
        >
          Open
        </button>

      </div>
    `).join("");
}


function openWebsite(url) {

  if (!url) return;

  window.open(
    url,
    "_blank",
    "noopener"
  );
}


/* =========================================================
   TELEGRAM
   ========================================================= */

function openTelegram() {

  window.open(
    "https://t.me/Yashpal_aagri",
    "_blank",
    "noopener"
  );
}


/* =========================================================
   3D LIVE STUDY ANIMATION
   ========================================================= */

function createStudyAnimation() {

  const container =
    document.querySelector(
      ".study-animation"
    );

  if (!container) return;

  container.classList.add(
    "live-study-animation"
  );

  const core =
    container.querySelector(
      ".study-core"
    );

  if (core) {

    core.setAttribute(
      "title",
      "Mission Lakshya Study"
    );
  }
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
    i < 60;
    i++
  ) {

    const particle =
      document.createElement(
        "span"
      );

    particle.className =
      "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.top =
      Math.random() * 100 + "%";

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
   TOAST
   ========================================================= */

function showToast(message) {

  let toast =
    document.getElementById(
      "mlToast"
    );

  if (!toast) {

    toast =
      document.createElement(
        "div"
      );

    toast.id =
      "mlToast";

    toast.className =
      "ml-toast";

    document.body.appendChild(
      toast
    );
  }

  toast.innerText =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    window.mlToastTimer
  );

  window.mlToastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 2500);
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
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

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

    if (
      event.key === "Escape"
    ) {

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
   APP START
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    /* Saved theme */

    const savedTheme =
      load(
        STORAGE.theme,
        "default"
      );

    const savedMode =
      load(
        STORAGE.mode,
        "normal"
      );

    applyTheme(
      savedTheme
    );

    applyMode(
      savedMode
    );


    /* Render dynamic content */

    renderThemes();

    renderWebsites();

    createParticles();

    createStudyAnimation();

    updateStudyStreak();

    updateDashboard();

    updatePerformance();

    checkAchievements();


    console.log(
      "🚀 Mission Lakshya NEET 2027 loaded successfully!"
    );

  }
);
