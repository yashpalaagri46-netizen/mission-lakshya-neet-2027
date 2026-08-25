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
/* =========================================
   35 THEMES SYSTEM
========================================= */

const themes = [
  {name:"Ocean", accent:"#287cff", accent2:"#00c6ff", bg:"#06122f", bg2:"#0b1d46"},
  {name:"Purple", accent:"#7c3cff", accent2:"#c026ff", bg:"#17052f", bg2:"#2b0b46"},
  {name:"Cyber", accent:"#00f5ff", accent2:"#ff00e5", bg:"#050510", bg2:"#10102b"},
  {name:"Sunset", accent:"#ff6b35", accent2:"#ff006e", bg:"#2b0b12", bg2:"#461b0b"},
  {name:"Royal", accent:"#8b5cf6", accent2:"#ec4899", bg:"#10072b", bg2:"#241044"},
  {name:"Sky", accent:"#38bdf8", accent2:"#2563eb", bg:"#071a2f", bg2:"#0b2d50"},
  {name:"Rose", accent:"#fb7185", accent2:"#e11d48", bg:"#2b0713", bg2:"#4a0b20"},
  {name:"Gold", accent:"#fbbf24", accent2:"#f97316", bg:"#211505", bg2:"#3b2307"},
  {name:"Emerald", accent:"#10b981", accent2:"#22c55e", bg:"#031f18", bg2:"#073b2c"},
  {name:"Ruby", accent:"#ef4444", accent2:"#be123c", bg:"#280608", bg2:"#450a12"},
  {name:"Neon Blue", accent:"#00e5ff", accent2:"#2979ff", bg:"#020d1c", bg2:"#061d3a"},
  {name:"Neon Green", accent:"#39ff14", accent2:"#00c853", bg:"#031405", bg2:"#082d0d"},
  {name:"Neon Pink", accent:"#ff1493", accent2:"#ff00ff", bg:"#1f0317", bg2:"#3d062f"},
  {name:"Neon Purple", accent:"#b026ff", accent2:"#7c00ff", bg:"#12021f", bg2:"#270744"},
  {name:"Midnight", accent:"#6366f1", accent2:"#312e81", bg:"#020617", bg2:"#0f172a"},
  {name:"Forest", accent:"#16a34a", accent2:"#15803d", bg:"#041b0b", bg2:"#092e14"},
  {name:"Lavender", accent:"#a78bfa", accent2:"#c084fc", bg:"#170d2b", bg2:"#28164a"},
  {name:"Mint", accent:"#2dd4bf", accent2:"#34d399", bg:"#031c1a", bg2:"#073b35"},
  {name:"Fire", accent:"#f97316", accent2:"#dc2626", bg:"#210704", bg2:"#42100a"},
  {name:"Ice", accent:"#67e8f9", accent2:"#38bdf8", bg:"#031722", bg2:"#082d40"},
  {name:"Matrix", accent:"#22c55e", accent2:"#84cc16", bg:"#020b04", bg2:"#071a09"},
  {name:"Galaxy", accent:"#8b5cf6", accent2:"#3b82f6", bg:"#09051c", bg2:"#171044"},
  {name:"Deep Sea", accent:"#06b6d4", accent2:"#0e7490", bg:"#02151d", bg2:"#06313e"},
  {name:"Cherry", accent:"#f43f5e", accent2:"#be185d", bg:"#22040d", bg2:"#430819"},
  {name:"Coffee", accent:"#d6a66a", accent2:"#92400e", bg:"#160d07", bg2:"#2d180c"},
  {name:"Silver", accent:"#94a3b8", accent2:"#64748b", bg:"#0f172a", bg2:"#1e293b"},
  {name:"Platinum", accent:"#e2e8f0", accent2:"#94a3b8", bg:"#111827", bg2:"#273449"},
  {name:"Electric", accent:"#2563eb", accent2:"#9333ea", bg:"#030712", bg2:"#111827"},
  {name:"Tropical", accent:"#14b8a6", accent2:"#f59e0b", bg:"#05201d", bg2:"#14351e"},
  {name:"Aurora", accent:"#4ade80", accent2:"#a855f7", bg:"#06120f", bg2:"#18102e"},
  {name:"Cosmic", accent:"#ec4899", accent2:"#6366f1", bg:"#14051c", bg2:"#24104a"},
  {name:"Royal Blue", accent:"#3b82f6", accent2:"#1d4ed8", bg:"#04102b", bg2:"#0b2050"},
  {name:"Orange", accent:"#fb923c", accent2:"#ea580c", bg:"#241005", bg2:"#421d09"},
  {name:"Teal", accent:"#14b8a6", accent2:"#0f766e", bg:"#031c1b", bg2:"#063633"},
  {name:"Violet", accent:"#8b5cf6", accent2:"#6d28d9", bg:"#10051f", bg2:"#251044"}
];


/* CREATE THEME BUTTONS */

function loadThemes(){

  const container =
    document.getElementById("themeList");

  if(!container) return;

  container.innerHTML = "";

  themes.forEach((theme,index)=>{

    const button =
      document.createElement("button");

    button.className = "theme-card";

    button.innerHTML = `
      🎨 ${index + 1}. ${theme.name}
    `;

    button.style.background =
      `linear-gradient(135deg,
        ${theme.accent},
        ${theme.accent2})`;

    button.onclick = () => {
      applyTheme(theme,index);
    };

    container.appendChild(button);

  });

}


/* APPLY THEME */

function applyTheme(theme,index){

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

  document.body.classList.remove("light");

  localStorage.setItem(
    "mlThemeIndex",
    index
  );

  localStorage.setItem(
    "mlTheme",
    JSON.stringify(theme)
  );

}


/* LOAD SAVED THEME */

function loadSavedTheme(){

  const saved =
    localStorage.getItem("mlTheme");

  if(!saved) return;

  try{

    const theme =
      JSON.parse(saved);

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

  }catch(error){

    console.error(
      "Theme load error:",
      error
    );

  }

}


/* =========================================
   DISPLAY MODE
========================================= */

function setDisplayMode(mode){

  if(mode === "light"){

    document.body.classList.add("light");

    localStorage.setItem(
      "mlLightMode",
      "light"
    );

  }

  else{

    document.body.classList.remove("light");

    localStorage.setItem(
      "mlLightMode",
      "dark"
    );

  }

}


/* CREATE DARK / LIGHT BUTTONS */

function loadModes(){

  const container =
    document.getElementById("modeList");

  if(!container) return;

  container.innerHTML = "";

  const dark =
    document.createElement("button");

  dark.className = "theme-card";

  dark.innerHTML =
    "🌙 Dark";

  dark.style.background =
    "linear-gradient(135deg,#111827,#312e81)";

  dark.onclick = () =>
    setDisplayMode("dark");


  const light =
    document.createElement("button");

  light.className = "theme-card";

  light.innerHTML =
    "☀️ Light";

  light.style.background =
    "linear-gradient(135deg,#dbeafe,#ffffff)";

  light.style.color =
    "#172033";

  light.onclick = () =>
    setDisplayMode("light");


  container.appendChild(dark);
  container.appendChild(light);

}


/* =========================================
   START THEME SYSTEM
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    loadThemes();
    loadModes();
    loadSavedTheme();

  }
);
