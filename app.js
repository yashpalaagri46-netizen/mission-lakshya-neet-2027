/* =========================================
   MISSION LAKSHYA NEET 2027
   MAIN APP JAVASCRIPT
========================================= */

"use strict";

/* =========================
   PAGE NAVIGATION
========================= */

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


/* =========================
   SIDEBAR
========================= */

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");

  if (sidebar) {
    sidebar.classList.toggle("open");
  }
}


/* =========================
   LIGHT / DARK MODE
========================= */

function toggleLightDark() {
  document.body.classList.toggle("light");

  localStorage.setItem(
    "mlLightMode",
    document.body.classList.contains("light")
      ? "light"
      : "dark"
  );
}


/* Load saved mode */

if (localStorage.getItem("mlLightMode") === "light") {
  document.body.classList.add("light");
}


/* =========================
   GLOBAL SEARCH
========================= */

function globalSearch() {
  const input = document.getElementById("globalSearch");

  if (!input) return;

  const q = input.value.toLowerCase().trim();

  if (!q) return;

  if (
    q.includes("book") ||
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
    showPage("quiz");
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


/* =========================
   YOUTUBE SEARCH
========================= */

function youtubeSearch(query) {

  if (!query) {
    const input = document.getElementById("youtubeQuery");

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


/* =========================
   YOUTUBE LIVE
========================= */

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

      card.innerHTML = `
        <img
          src="${escapeHTML(video.thumbnail || "")}"
          alt="YouTube Live"
        >

        <h3>
          ${escapeHTML(video.title || "Live Class")}
        </h3>

        <p>
          ${escapeHTML(video.channelTitle || "")}
        </p>

        <button
          class="main-btn"
          onclick="playLive('${escapeHTML(video.videoId || "")}')"
        >
          ▶️ Play Live
        </button>

        <button
          class="secondary-btn"
          onclick="window.open('${escapeHTML(video.url || "#")}', '_blank')"
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


/* =========================
   PLAY YOUTUBE VIDEO
========================= */

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
}


/* =========================
   HTML SECURITY
========================= */

function escapeHTML(text) {

  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================
   AI DOUBT SOLVER
========================= */

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
    "🤖 AI सोच रहा है...";

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

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "AI error"
      );
    }

    answerBox.innerText =
      data.answer ||
      "AI response नहीं मिला।";

  }

catch (error) {

  console.error("AI Error:", error);

  answerBox.innerText =
    "❌ AI Error: " + (error.message || "Unknown error");
}
}


/* =========================
   TELEGRAM
========================= */

function openTelegram() {

  window.open(
    "https://t.me/Yashpal_aagri",
    "_blank"
  );
}


/* =========================
   PARTICLES
========================= */

function createParticles() {

  const container =
    document.getElementById("particles");

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 60; i++) {

    const particle =
      document.createElement("span");

    particle.className =
      "particle";

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDuration =
      6 + Math.random() * 10 + "s";

    particle.style.animationDelay =
      Math.random() * 8 + "s";

    container.appendChild(particle);
  }
}


/* =========================
   START APP
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    createParticles();

    console.log(
      "🚀 Mission Lakshya NEET 2027 loaded successfully!"
    );

  }
);
