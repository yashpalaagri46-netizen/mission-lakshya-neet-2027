"use strict";

/* =========================================
   MISSION LAKSHYA NEET 2027
   MAIN APP JAVASCRIPT
========================================= */


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

  if (pageId === "themes") {
    renderThemes();
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
   35 THEMES
========================================= */

const themes = [

  {
    name: "Midnight",
    className: "theme-midnight",
    icon: "🌌"
  },

  {
    name: "Ocean",
    className: "theme-ocean",
    icon: "🌊"
  },

  {
    name: "Purple",
    className: "theme-purple",
    icon: "💜"
  },

  {
    name: "Cyber",
    className: "theme-cyber",
    icon: "⚡"
  },

  {
    name: "Rose",
    className: "theme-rose",
    icon: "🌹"
  },

  {
    name: "Sunset",
    className: "theme-sunset",
    icon: "🌅"
  },

  {
    name: "Orange",
    className: "theme-orange",
    icon: "🟠"
  },

  {
    name: "Red",
    className: "theme-red",
    icon: "🔴"
  },

  {
    name: "Gold",
    className: "theme-gold",
    icon: "🏆"
  },

  {
    name: "Sky",
    className: "theme-sky",
    icon: "☁️"
  },

  {
    name: "Violet",
    className: "theme-violet",
    icon: "🔮"
  },

  {
    name: "Indigo",
    className: "theme-indigo",
    icon: "🔵"
  },

  {
    name: "Blue",
    className: "theme-blue",
    icon: "💙"
  },

  {
    name: "Aqua",
    className: "theme-aqua",
    icon: "💧"
  },

  {
    name: "Turquoise",
    className: "theme-turquoise",
    icon: "🩵"
  },

  {
    name: "Lavender",
    className: "theme-lavender",
    icon: "🪻"
  },

  {
    name: "Plum",
    className: "theme-plum",
    icon: "🍇"
  },

  {
    name: "Crimson",
    className: "theme-crimson",
    icon: "❤️"
  },

  {
    name: "Cherry",
    className: "theme-cherry",
    icon: "🍒"
  },

  {
    name: "Coffee",
    className: "theme-coffee",
    icon: "☕"
  },

  {
    name: "Chocolate",
    className: "theme-chocolate",
    icon: "🍫"
  },

  {
    name: "Silver",
    className: "theme-silver",
    icon: "⚪"
  },

  {
    name: "Steel",
    className: "theme-steel",
    icon: "🔩"
  },

  {
    name: "Neon Blue",
    className: "theme-neon-blue",
    icon: "🔷"
  },

  {
    name: "Neon Purple",
    className: "theme-neon-purple",
    icon: "🟣"
  },

  {
    name: "Neon Pink",
    className: "theme-neon-pink",
    icon: "💗"
  },

  {
    name: "Neon Orange",
    className: "theme-neon-orange",
    icon: "🟧"
  },

  {
    name: "Ice",
    className: "theme-ice",
    icon: "❄️"
  },

  {
    name: "Space",
    className: "theme-space",
    icon: "🚀"
  },

  {
    name: "Galaxy",
    className: "theme-galaxy",
    icon: "🌌"
  },

  {
    name: "Matrix",
    className: "theme-matrix",
    icon: "🟢"
  },

  {
    name: "Diamond",
    className: "theme-diamond",
    icon: "💎"
  },

  {
    name: "Fire",
    className: "theme-fire",
    icon: "🔥"
  },

  {
    name: "Aurora",
    className: "theme-aurora",
    icon: "🌈"
  }

];


/* =========================================
   THEME SELECTOR
========================================= */

function applyTheme(themeClass) {

  themes.forEach(theme => {
    document.body.classList.remove(theme.className);
  });

  if (themeClass) {
    document.body.classList.add(themeClass);

    localStorage.setItem(
      "mlTheme",
      themeClass
    );
  }

  updateThemeButtons();
}


/* =========================================
   RENDER 35 THEMES
========================================= */

function renderThemes() {

  const themeList =
    document.getElementById("themeList");

  if (!themeList) return;

  themeList.innerHTML = "";

  themes.forEach(theme => {

    const button =
      document.createElement("button");

    button.className =
      "theme-card " +
      theme.className;

    button.type = "button";

    button.dataset.theme =
      theme.className;

    button.innerHTML = `
      <span class="theme-name">
        ${theme.icon} ${theme.name}
      </span>

      <span class="theme-description">
        Apply Theme
      </span>
    `;

    button.addEventListener(
      "click",
      function () {

        applyTheme(theme.className);

      }
    );

    themeList.appendChild(button);

  });

  renderModes();

  updateThemeButtons();
}


/* =========================================
   THEME ACTIVE BUTTON
========================================= */

function updateThemeButtons() {

  const currentTheme =
    localStorage.getItem("mlTheme") ||
    "theme-midnight";

  document
    .querySelectorAll(".theme-card")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.theme === currentTheme
      );

    });
}


/* =========================================
   DISPLAY MODES
========================================= */

const displayModes = [

  {
    name: "🌙 Dark",
    type: "dark"
  },

  {
    name: "☀️ Light",
    type: "light"
  },

  {
    name: "🖤 AMOLED",
    type: "amoled"
  },

  {
    name: "✨ Glass",
    type: "glass"
  },

  {
    name: "⚡ Neon",
    type: "neon"
  },

  {
    name: "🎯 Focus",
    type: "focus"
  },

  {
    name: "🧘 Calm",
    type: "calm"
  }

];


/* =========================================
   RENDER MODES
========================================= */

function renderModes() {

  const modeList =
    document.getElementById("modeList");

  if (!modeList) return;

  modeList.innerHTML = "";

  displayModes.forEach(mode => {

    const button =
      document.createElement("button");

    button.type = "button";

    button.className =
      "mode-card";

    button.dataset.mode =
      mode.type;

    button.textContent =
      mode.name;

    button.addEventListener(
      "click",
      function () {

        applyMode(mode.type);

      }
    );

    modeList.appendChild(button);

  });

  updateModeButtons();
}


/* =========================================
   APPLY MODE
========================================= */

function applyMode(mode) {

  document.body.classList.remove(
    "light",
    "amoled-mode",
    "glass-mode",
    "neon-mode",
    "focus-mode",
    "calm-mode"
  );

  if (mode === "light") {
    document.body.classList.add("light");
  }

  if (mode === "amoled") {
    document.body.classList.add("amoled-mode");
  }

  if (mode === "glass") {
    document.body.classList.add("glass-mode");
  }

  if (mode === "neon") {
    document.body.classList.add("neon-mode");
  }

  if (mode === "focus") {
    document.body.classList.add("focus-mode");
  }

  if (mode === "calm") {
    document.body.classList.add("calm-mode");
  }

  localStorage.setItem(
    "mlMode",
    mode
  );

  updateModeButtons();
}


/* =========================================
   MODE ACTIVE BUTTON
========================================= */

function updateModeButtons() {

  const currentMode =
    localStorage.getItem("mlMode") ||
    "dark";

  document
    .querySelectorAll(".mode-card")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.mode === currentMode
      );

    });
}


/* =========================================
   LIGHT / DARK BUTTON
========================================= */

function toggleLightDark() {

  const current =
    localStorage.getItem("mlMode") ||
    "dark";

  if (current === "light") {

    applyMode("dark");

  } else {

    applyMode("light");

  }
}


/* =========================================
   LOAD SAVED THEME
========================================= */

function loadSavedTheme() {

  const savedTheme =
    localStorage.getItem("mlTheme") ||
    "theme-midnight";

  applyTheme(savedTheme);

  const savedMode =
    localStorage.getItem("mlMode") ||
    "dark";

  applyMode(savedMode);
}


/* =========================================
   GLOBAL SEARCH
========================================= */

function globalSearch() {

  const input =
    document.getElementById("globalSearch");

  if (!input) return;

  const q =
    input.value.toLowerCase().trim();

  if (!q) return;

  if (
    q.includes("book") ||
    q.includes("किताब") ||
    q.includes("notes")
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
    q.includes("mode")
  ) {

    showPage("themes");

  }

  else {

    showPage("websites");

  }
}


/* =========================================
   YOUTUBE SEARCH
========================================= */

function youtubeSearch(query) {

  if (!query) {

    const input =
      document.getElementById("youtubeQuery");

    if (input) {
      query = input.value.trim();
    }

  }

  if (!query) {

    alert("पहले YouTube search लिखें।");

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


/* =========================================
   YOUTUBE LIVE
========================================= */

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
          onclick="window.open('${escapeHTML(
            video.url || "#"
          )}', '_blank')"
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


/* =========================================
   PLAY YOUTUBE
========================================= */

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


/* =========================================
   HTML SECURITY
========================================= */

function escapeHTML(text) {

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================
   AI DOUBT SOLVER
========================================= */

async function askAI() {

  const questionBox =
    document.getElementById(
      "aiQuestion"
    );

  const answerBox =
    document.getElementById(
      "aiAnswer"
    );

  if (!questionBox || !answerBox)
    return;

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


/* =========================================
   TELEGRAM
========================================= */

function openTelegram() {

  window.open(
    "https://t.me/Yashpal_aagri",
    "_blank"
  );
}


/* =========================================
   PARTICLES
========================================= */

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


/* =========================================
   START APP
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    createParticles();

    renderThemes();

    loadSavedTheme();

    console.log(
      "🚀 Mission Lakshya NEET 2027 loaded successfully!"
    );

  }
);
