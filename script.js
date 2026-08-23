/* =========================================
   MISSION LAKSHYA NEET 2027
   MAIN JAVASCRIPT
========================================= */

"use strict";

/* =========================================
   PAGE NAVIGATION
========================================= */

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
}


/* =========================================
   MOBILE SIDEBAR
========================================= */

function toggleSidebar() {

  const sidebar = document.getElementById("sidebar");

  if (!sidebar) return;

  sidebar.classList.toggle("open");
}


/* =========================================
   LIGHT / DARK MODE
========================================= */

function toggleLightDark() {

  document.body.classList.toggle("light");

  const mode =
    document.body.classList.contains("light")
      ? "light"
      : "dark";

  localStorage.setItem("mlMode", mode);
}


/* =========================================
   LOAD SAVED MODE
========================================= */

function loadSavedMode() {

  const mode = localStorage.getItem("mlMode");

  if (mode === "light") {
    document.body.classList.add("light");
  }
}


/* =========================================
   GLOBAL SEARCH
========================================= */

function globalSearch() {

  const input =
    document.getElementById("globalSearch");

  if (!input) return;

  const query =
    input.value
      .toLowerCase()
      .trim();

  if (!query) return;

  if (
    query.includes("book") ||
    query.includes("pdf") ||
    query.includes(" किताब")
  ) {
    showPage("books");
    return;
  }

  if (
    query.includes("video") ||
    query.includes("lecture")
  ) {
    showPage("videos");
    return;
  }

  if (
    query.includes("test") ||
    query.includes("mock")
  ) {
    showPage("tests");
    return;
  }

  if (query.includes("dpp")) {
    showPage("dpp");
    return;
  }

  if (
    query.includes("quiz") ||
    query.includes("question")
  ) {
    showPage("quiz");
    return;
  }

  if (
    query.includes("ai") ||
    query.includes("doubt")
  ) {
    showPage("ai");
    return;
  }

  if (
    query.includes("youtube") ||
    query.includes("live")
  ) {
    showPage("youtube");
    return;
  }

  if (
    query.includes("theme") ||
    query.includes("color")
  ) {
    showPage("themes");
    return;
  }

  showPage("websites");
}


/* =========================================
   YOUTUBE SEARCH
========================================= */

function youtubeSearch(query = "") {

  if (!query) {

    const input =
      document.getElementById("youtubeQuery");

    if (input) {
      query = input.value.trim();
    }
  }

  if (!query) {
    alert("पहले YouTube पर कुछ search करें।");
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

    const videos =
      data.liveClasses || [];

    if (!videos.length) {

      status.innerText =
        "🔴 अभी कोई live class नहीं मिली।";

      return;
    }

    status.innerText =
      "🔴 " +
      videos.length +
      " Live Classes";

    videos.forEach(video => {

      const card =
        document.createElement("div");

      card.className = "live-card";

      const title =
        escapeHTML(
          video.title || "Live Class"
        );

      const channel =
        escapeHTML(
          video.channelTitle || ""
        );

      const thumbnail =
        video.thumbnail || "";

      const videoId =
        encodeURIComponent(
          video.videoId || ""
        );

      const url =
        video.url ||
        "https://www.youtube.com/watch?v=" +
        video.videoId;

      card.innerHTML = `

        <img
          src="${thumbnail}"
          alt="YouTube Live"
          loading="lazy"
        >

        <h3>${title}</h3>

        <p>${channel}</p>

        <button
          class="main-btn"
          onclick="playLive('${videoId}')"
        >
          ▶️ Play Live
        </button>

        <button
          class="secondary-btn"
          onclick="openYouTube('${url}')"
        >
          💬 Comments
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
      "⚠️ YouTube Live अभी उपलब्ध नहीं है। " +
      "API configuration check करें।";
  }
}


/* =========================================
   PLAY YOUTUBE LIVE
========================================= */

function playLive(videoId) {

  const player =
    document.getElementById(
      "youtubePlayer"
    );

  if (!player || !videoId) return;

  player.src =
    "https://www.youtube.com/embed/" +
    videoId +
    "?autoplay=1";

  player.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}


/* =========================================
   OPEN YOUTUBE
========================================= */

function openYouTube(url) {

  if (!url) return;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =========================================
   AI DOUBT SOLVER
========================================= */

async function askAI() {

  const input =
    document.getElementById(
      "aiQuestion"
    );

  const output =
    document.getElementById(
      "aiAnswer"
    );

  if (!input || !output) return;

  const question =
    input.value.trim();

  if (!question) {

    output.innerText =
      "⚠️ पहले अपना सवाल लिखें।";

    return;
  }

  output.innerText =
    "🤖 AI सोच रहा है...";

  try {

    const response =
      await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            message: question
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.error ||
        "AI server error"
      );
    }

    output.innerText =
      data.answer ||
      data.output ||
      "AI ने कोई जवाब नहीं दिया।";

  } catch (error) {

    console.error(
      "AI Error:",
      error
    );

    output.innerText =
      "❌ AI से connection नहीं हो पाया। " +
      "अगले Step में API configuration ठीक करेंगे।";
  }
}


/* =========================================
   QUIZ
========================================= */

function quizAnswer(correct) {

  const result =
    document.getElementById(
      "quizResult"
    );

  if (!result) return;

  if (correct) {

    result.innerHTML =
      "✅ सही उत्तर! बहुत बढ़िया।";

  } else {

    result.innerHTML =
      "❌ गलत उत्तर। दोबारा कोशिश करें।";
  }
}


/* =========================================
   STUDY WEBSITES
========================================= */

const studyWebsites = [

  {
    name: "StudyBee Pro",
    url: "http://studybeepro.site/"
  },

  {
    name: "RolexCoderZ",
    url: "http://RolexCoderZ.in/"
  },

  {
    name: "VedStudy",
    url: "https://vedstudy.com/"
  },

  {
    name: "PrepPro Network",
    url: "https://preppronetwork.vercel.app/"
  },

  {
    name: "StudyPanda Books",
    url: "https://studypanda.live/books"
  },

  {
    name: "Learnify",
    url: "https://learnify.deltaverse.site/"
  },

  {
    name: "PW StudyParcham",
    url: "https://pw.studyparcham.in/"
  },

  {
    name: "AS Multiverse",
    url: "https://asmultiverse.com/"
  },

  {
    name: "StudyRays",
    url: "http://studyrays.cc/"
  },

  {
    name: "LearnTopper",
    url: "http://learntopper.in/"
  },

  {
    name: "StudySpark",
    url: "http://studyspark.pro/"
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
      document.createElement("div");

    card.className =
      "website-card";

    card.innerHTML = `

      <h3>🌐 ${escapeHTML(site.name)}</h3>

      <p>
        NEET Study Resource
      </p>

      <button
        class="main-btn"
        onclick="openYouTube('${site.url}')"
      >
        🌐 Open Website
      </button>

    `;

    container.appendChild(card);
  });
}


/* =========================================
   35 THEMES
========================================= */

const themes = [

  ["Ocean","#06122f","#287cff","#7c3cff"],
  ["Purple","#16072e","#a855f7","#ec4899"],
  ["Emerald","#031d18","#10b981","#34d399"],
  ["Crimson","#240608","#ef4444","#fb7185"],
  ["Sunset","#281003","#f97316","#facc15"],
  ["Sky","#041b2e","#0ea5e9","#38bdf8"],
  ["Pink","#25071b","#ec4899","#f472b6"],
  ["Gold","#241b02","#eab308","#fde047"],
  ["Galaxy","#09051f","#6366f1","#a855f7"],
  ["Forest","#031a08","#16a34a","#4ade80"],
  ["Arctic","#031d2b","#06b6d4","#67e8f9"],
  ["Midnight","#020617","#334155","#6366f1"],
  ["Solar","#211000","#f59e0b","#fde68a"],
  ["Diamond","#0b1620","#67e8f9","#e0f2fe"],
  ["Cyber","#030712","#00ffcc","#ff00ff"],
  ["Medical","#061a19","#14b8a6","#22d3ee"],
  ["Space","#03051a","#3b82f6","#8b5cf6"],
  ["Neon","#090909","#39ff14","#00ffff"],
  ["Atomic","#071a29","#22d3ee","#60a5fa"],
  ["Electric","#050d22","#2563eb","#38bdf8"],
  ["Chemistry","#10100a","#eab308","#84cc16"],
  ["Biology","#03190c","#22c55e","#a3e635"],
  ["Doctor","#07111f","#38bdf8","#60a5fa"],
  ["Rocket","#1d0903","#f97316","#ef4444"],
  ["Aurora","#04151a","#14b8a6","#a855f7"],
  ["Royal","#10051f","#8b5cf6","#c084fc"],
  ["Matrix","#001005","#22c55e","#4ade80"],
  ["Sapphire","#020d2b","#2563eb","#60a5fa"],
  ["Amber","#1b0e00","#f59e0b","#fb923c"],
  ["Cosmic","#0b0320","#9333ea","#ec4899"],
  ["Oceanic","#031b2a","#0284c7","#06b6d4"],
  ["Lime","#071a00","#84cc16","#bef264"],
  ["Ruby","#240006","#e11d48","#fb7185"],
  ["Violet","#12052a","#7c3aed","#c4b5fd"],
  ["Aqua","#001c1c","#14b8a6","#67e8f9"]

];


function applyTheme(theme) {

  if (!theme) return;

  document.documentElement.style
    .setProperty(
      "--bg",
      theme[1]
    );

  document.documentElement.style
    .setProperty(
      "--accent",
      theme[2]
    );

  document.documentElement.style
    .setProperty(
      "--accent2",
      theme[3]
    );

  localStorage.setItem(
    "mlTheme",
    JSON.stringify(theme)
  );
}


function renderThemes() {

  const container =
    document.getElementById(
      "themeList"
    );

  if (!container) return;

  container.innerHTML = "";

  themes.forEach((theme, index) => {

    const button =
      document.createElement("button");

    button.className =
      "theme-card";

    button.innerText =
      (index + 1) +
      ". " +
      theme[0];

    button.style.background =
      `linear-gradient(
        135deg,
        ${theme[1]},
        ${theme[2]}
      )`;

    button.addEventListener(
      "click",
      () => applyTheme(theme)
    );

    container.appendChild(button);

  });
}


/* =========================================
   LOAD SAVED THEME
========================================= */

function loadSavedTheme() {

  const saved =
    localStorage.getItem(
      "mlTheme"
    );

  if (!saved) return;

  try {

    const theme =
      JSON.parse(saved);

    applyTheme(theme);

  } catch (error) {

    console.log(
      "Saved theme unavailable"
    );
  }
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
      document.createElement("span");

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
   HTML SECURITY
========================================= */

function escapeHTML(value) {

  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    )

    .replaceAll(
      "'",
      "&#039;"
    );
}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadSavedMode();

    loadSavedTheme();

    renderWebsites();

    renderThemes();

    createParticles();

  }
);
