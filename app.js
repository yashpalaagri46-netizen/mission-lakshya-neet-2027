/* =========================================================
   MISSION LAKSHYA NEET 2027
   Corrected app.js
   Compatible with current index.html
========================================================= */

"use strict";

/* =========================
   STORAGE
========================= */

const STORAGE = {
  theme: "ml_theme",
  mode: "ml_mode",
  language: "ml_language",
  profile: "ml_profile",
  bookmarks: "ml_bookmarks"
};

/* =========================
   GLOBAL STATE
========================= */

let currentPage = "home";
let currentTheme = localStorage.getItem(STORAGE.theme) || "purple";
let currentMode = localStorage.getItem(STORAGE.mode) || "dark";
let currentLanguage = localStorage.getItem(STORAGE.language) || "hi";

let testQuestions = [];
let testIndex = 0;
let testAnswers = {};
let testTimer = null;
let testSeconds = 0;

let dppQuestions = [];
let dppIndex = 0;
let dppAnswers = {};

let bookmarks = JSON.parse(
  localStorage.getItem(STORAGE.bookmarks) || "[]"
);

/* =========================
   THEMES
========================= */

const THEMES = [
  ["purple", "Purple"],
  ["violet", "Violet"],
  ["indigo", "Indigo"],
  ["blue", "Blue"],
  ["sky", "Sky"],
  ["cyan", "Cyan"],
  ["teal", "Teal"],
  ["green", "Green"],
  ["emerald", "Emerald"],
  ["lime", "Lime"],
  ["yellow", "Yellow"],
  ["amber", "Amber"],
  ["orange", "Orange"],
  ["red", "Red"],
  ["rose", "Rose"],
  ["pink", "Pink"],
  ["fuchsia", "Fuchsia"],
  ["magenta", "Magenta"],
  ["crimson", "Crimson"],
  ["coral", "Coral"],
  ["gold", "Gold"],
  ["bronze", "Bronze"],
  ["brown", "Brown"],
  ["slate", "Slate"],
  ["gray", "Gray"],
  ["zinc", "Zinc"],
  ["neutral", "Neutral"],
  ["stone", "Stone"],
  ["aqua", "Aqua"],
  ["turquoise", "Turquoise"],
  ["mint", "Mint"],
  ["forest", "Forest"],
  ["ocean", "Ocean"],
  ["midnight", "Midnight"],
  ["sunset", "Sunset"],
  ["cyber", "Cyber"],
  ["rose-gold", "Rose Gold"],
  ["neon", "Neon"]
];

/* =========================
   SAFE HELPERS
========================= */

function $(id) {
  return document.getElementById(id);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.classList.remove("active");
    page.style.display = "none";
  });

  const target = $(pageId);

  if (!target) {
    console.warn("Page not found:", pageId);
    return;
  }

  target.classList.add("active");
  target.style.display = "block";

  currentPage = pageId;

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.page === pageId
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeSidebar();

  if (pageId === "youtube") {
    loadYouTubeLive();
  }

  if (pageId === "performance") {
    updatePerformance();
  }

  if (pageId === "themes") {
    renderThemes();
  }
}

window.showPage = showPage;

/* =========================
   SIDEBAR
========================= */

function toggleSidebar() {
  const sidebar = $("sidebar");

  if (!sidebar) return;

  sidebar.classList.toggle("open");
}

window.toggleSidebar = toggleSidebar;

function closeSidebar() {
  const sidebar = $("sidebar");

  if (sidebar) {
    sidebar.classList.remove("open");
  }
}

/* =========================
   LIGHT / DARK
========================= */

function toggleLightDark() {
  const nextMode =
    currentMode === "light" ? "dark" : "light";

  setMode(nextMode);
}

window.toggleLightDark = toggleLightDark;

function setMode(mode) {
  currentMode = mode;

  document.documentElement.dataset.mode = mode;
  document.body.dataset.mode = mode;

  document.body.classList.toggle(
    "dark",
    mode !== "light"
  );

  localStorage.setItem(STORAGE.mode, mode);

  const modeButtons =
    document.querySelectorAll("[data-mode]");

  modeButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.mode === mode
    );
  });
}

window.setMode = setMode;

/* =========================
   THEME
========================= */

function setTheme(theme) {
  currentTheme = theme;

  document.documentElement.dataset.theme = theme;
  document.body.dataset.theme = theme;

  localStorage.setItem(STORAGE.theme, theme);

  document
    .querySelectorAll("[data-theme]")
    .forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.theme === theme
      );
    });
}

window.setTheme = setTheme;

function renderThemes() {
  const container =
    $("themeGrid") ||
    $("themesGrid") ||
    $("themeOptions");

  if (!container) return;

  container.innerHTML = THEMES.map(
    ([value, name]) => `
      <button
        class="theme-card ${
          value === currentTheme ? "active" : ""
        }"
        data-theme="${escapeAttribute(value)}"
        onclick="setTheme('${escapeAttribute(value)}')"
      >
        <span class="theme-dot theme-${escapeAttribute(value)}"></span>
        <span>${escapeHTML(name)}</span>
      </button>
    `
  ).join("");
}

/* =========================
   LANGUAGE
========================= */

function setLanguage(language) {
  currentLanguage = language;

  localStorage.setItem(
    STORAGE.language,
    language
  );

  document.documentElement.lang =
    language === "hi" ? "hi" : "en";

  document
    .querySelectorAll("[data-language]")
    .forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.language === language
      );
    });
}

window.setLanguage = setLanguage;

/* =========================
   GLOBAL SEARCH
========================= */

function globalSearch() {
  const input =
    $("globalSearchInput");

  if (!input) return;

  const query =
    input.value.trim().toLowerCase();

  if (!query) return;

  const map = [
    ["book", "books"],
    ["note", "books"],
    ["pdf", "books"],
    ["video", "videos"],
    ["lecture", "videos"],
    ["youtube", "youtube"],
    ["live", "youtube"],
    ["ai", "ai"],
    ["doubt", "ai"],
    ["question", "questionbank"],
    ["mcq", "questionbank"],
    ["pyq", "pyq"],
    ["test", "tests"],
    ["mock", "tests"],
    ["dpp", "dpp"],
    ["planner", "planner"],
    ["revision", "revision"],
    ["performance", "performance"],
    ["analytics", "performance"],
    ["achievement", "achievements"],
    ["community", "community"],
    ["notification", "notifications"],
    ["website", "websites"],
    ["theme", "themes"],
    ["support", "support"]
  ];

  const found = map.find(([keyword]) =>
    query.includes(keyword)
  );

  if (found) {
    showPage(found[1]);
    return;
  }

  alert(
    "Search: " +
      input.value +
      "\n\nIs topic ke liye relevant section nahi mila."
  );
}

window.globalSearch = globalSearch;

/* =========================
   YOUTUBE SEARCH
========================= */

function searchYouTube(queryFromButton) {
  const input = $("videoSearchInput");

  const query =
    queryFromButton ||
    (input ? input.value.trim() : "");

  if (!query) {
    alert("YouTube par search karne ke liye topic likho.");
    return;
  }

  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(
      query + " NEET Physics Chemistry Biology"
    );

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

window.searchYouTube = searchYouTube;

function youtubeSearch() {
  const input = $("youtubeSearchInput");

  const query =
    input ? input.value.trim() : "";

  if (!query) {
    alert("Search ke liye topic likho.");
    return;
  }

  const results =
    $("liveVideos");

  if (results) {
    results.innerHTML = `
      <div class="video-card">
        <div class="video-card-body">
          <h3>🔎 YouTube Search</h3>
          <p>
            "${escapeHTML(query)}" ke results YouTube par
            open kiye ja rahe hain.
          </p>
          <button
            class="primary-btn"
            onclick="searchYouTube('${escapeAttribute(query)}')"
          >
            ▶️ Open YouTube
          </button>
        </div>
      </div>
    `;
  }

  searchYouTube(query);
}

window.youtubeSearch = youtubeSearch;

/* =========================
   YOUTUBE LIVE API
========================= */

async function loadYouTubeLive() {
  const status = $("liveStatus");
  const container = $("liveVideos");

  if (!container) return;

  if (status) {
    status.textContent =
      "🔄 Live classes loading...";
  }

  try {
    const response =
      await fetch("/api/youtube-live");

    if (!response.ok) {
      throw new Error(
        "YouTube API request failed"
      );
    }

    const data =
      await response.json();

    const videos =
      Array.isArray(data.videos)
        ? data.videos
        : Array.isArray(data.items)
        ? data.items
        : [];

    if (!videos.length) {
      if (status) {
        status.textContent =
          "ℹ️ Abhi koi live class available nahi mili.";
      }

      container.innerHTML = `
        <div class="empty-state">
          <h3>📺 No Live Class</h3>
          <p>
            Abhi live class available nahi hai.
          </p>
        </div>
      `;

      return;
    }

    if (status) {
      status.textContent =
        `🔴 ${videos.length} live class${videos.length > 1 ? "es" : ""} मिली`;
    }

    container.innerHTML =
      videos.map((video) => {
        const id =
          video.id?.videoId ||
          video.videoId ||
          video.id;

        const title =
          video.snippet?.title ||
          video.title ||
          "YouTube Live Class";

        const thumbnail =
          video.snippet?.thumbnails?.medium?.url ||
          video.thumbnail ||
          "";

        if (!id) return "";

        return `
          <div class="video-card">
            ${
              thumbnail
                ? `
                  <img
                    src="${escapeAttribute(thumbnail)}"
                    alt="${escapeAttribute(title)}"
                    loading="lazy"
                  >
                `
                : ""
            }

            <div class="video-card-body">
              <h3>${escapeHTML(title)}</h3>

              <button
                class="primary-btn"
                onclick="playYouTube('${escapeAttribute(id)}')"
              >
                ▶️ Watch Live
              </button>
            </div>
          </div>
        `;
      }).join("");

  } catch (error) {
    console.error(error);

    if (status) {
      status.textContent =
        "⚠️ Live classes load nahi ho paayi.";
    }

    container.innerHTML = `
      <div class="empty-state">
        <h3>📡 YouTube Live unavailable</h3>
        <p>
          YouTube API key / channel configuration
          check karo.
        </p>

        <button
          class="primary-btn"
          onclick="window.open(
            'https://www.youtube.com/results?search_query=NEET+live+class',
            '_blank',
            'noopener,noreferrer'
          )"
        >
          🔎 YouTube par Live Search
        </button>
      </div>
    `;
  }
}

window.loadYouTubeLive = loadYouTubeLive;

/* =========================
   YOUTUBE PLAYER
========================= */

function playYouTube(videoId) {
  const player =
    $("youtubePlayer");

  if (!player || !videoId) return;

  player.innerHTML = `
    <iframe
      width="100%"
      height="420"
      src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}"
      title="YouTube Player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `;

  player.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

window.playYouTube = playYouTube;

/* =========================
   AI DOUBT SOLVER
========================= */

async function askAI() {
  const input =
    $("aiQuestion");

  if (!input) return;

  const question =
    input.value.trim();

  if (!question) {
    alert("Pehle apna doubt likho.");
    return;
  }

  const result =
    $("aiAnswer") ||
    $("aiResponse") ||
    $("aiResult");

  if (result) {
    result.innerHTML = `
      <div class="loading">
        🤖 Gemini AI soch raha hai...
      </div>
    `;
  }

  try {
    const response =
      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          message: question,
          question: question
        })
      });

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
        "AI request failed"
      );
    }

    const answer =
      data.answer ||
      data.text ||
      data.response ||
      "AI ne answer nahi diya.";

    if (result) {
      result.innerHTML = `
        <div class="ai-answer">
          <h3>🤖 Mission Lakshya AI</h3>
          <div>
            ${formatAIAnswer(answer)}
          </div>
        </div>
      `;
    }

  } catch (error) {
    console.error(error);

    if (result) {
      result.innerHTML = `
        <div class="error-box">
          ❌ AI अभी उपलब्ध नहीं है।
          <br><br>
          Gemini API key aur
          <code>/api/chat</code>
          configuration check karo.
        </div>
      `;
    }
  }
}

window.askAI = askAI;

function formatAIAnswer(text) {
  return escapeHTML(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

/* =========================
   RESOURCE / WEBSITE
========================= */

function openResource(url) {
  if (!url) return;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

window.openResource = openResource;

/* =========================
   BOOKMARKS
========================= */

function toggleBookmark(id) {
  if (!id) return;

  const index =
    bookmarks.indexOf(id);

  if (index === -1) {
    bookmarks.push(id);
  } else {
    bookmarks.splice(index, 1);
  }

  localStorage.setItem(
    STORAGE.bookmarks,
    JSON.stringify(bookmarks)
  );
}

window.toggleBookmark = toggleBookmark;

function isBookmarked(id) {
  return bookmarks.includes(id);
}

window.isBookmarked = isBookmarked;

/* =========================
   NEET MOCK TEST
========================= */

const BASE_TEST_QUESTIONS = [
  {
    subject: "Physics",
    question:
      "SI unit of force is?",
    options: [
      "Joule",
      "Newton",
      "Watt",
      "Pascal"
    ],
    answer: 1,
    explanation:
      "Force ka SI unit Newton (N) hai."
  },
  {
    subject: "Physics",
    question:
      "Velocity is a?",
    options: [
      "Scalar quantity",
      "Vector quantity",
      "Constant quantity",
      "Dimensionless quantity"
    ],
    answer: 1,
    explanation:
      "Velocity magnitude ke saath direction bhi rakhti hai, isliye vector quantity hai."
  },
  {
    subject: "Chemistry",
    question:
      "Atomic number represents?",
    options: [
      "Number of neutrons",
      "Number of protons",
      "Mass number",
      "Number of molecules"
    ],
    answer: 1,
    explanation:
      "Atomic number nucleus mein protons ki sankhya hoti hai."
  },
  {
    subject: "Chemistry",
    question:
      "pH of neutral water at 25°C is approximately?",
    options: [
      "0",
      "5",
      "7",
      "14"
    ],
    answer: 2,
    explanation:
      "25°C par pure water ka pH approximately 7 hota hai."
  },
  {
    subject: "Biology",
    question:
      "Basic unit of life is?",
    options: [
      "Tissue",
      "Organ",
      "Cell",
      "Organ system"
    ],
    answer: 2,
    explanation:
      "Cell life ki basic structural aur functional unit hai."
  },
  {
    subject: "Biology",
    question:
      "Photosynthesis mainly occurs in?",
    options: [
      "Mitochondria",
      "Chloroplast",
      "Nucleus",
      "Ribosome"
    ],
    answer: 1,
    explanation:
      "Plants mein photosynthesis chloroplasts mein hota hai."
  }
];

function generateMockTest() {
  const questions = [];

  // Physics = 45
  for (let i = 0; i < 45; i++) {
    const base =
      BASE_TEST_QUESTIONS[
        i % BASE_TEST_QUESTIONS.length
      ];

    if (base.subject !== "Physics") {
      const physics =
        BASE_TEST_QUESTIONS.find(
          q => q.subject === "Physics"
        );

      questions.push({
        ...physics,
        question:
          `${physics.question} (Q${i + 1})`
      });
    } else {
      questions.push({
        ...base,
        question:
          `${base.question} (Q${i + 1})`
      });
    }
  }

  // Chemistry = 45
  for (let i = 0; i < 45; i++) {
    const chemistry =
      BASE_TEST_QUESTIONS.find(
        q => q.subject === "Chemistry"
      );

    questions.push({
      ...chemistry,
      question:
        `${chemistry.question} (Q${i + 46})`
    });
  }

  // Biology = 90
  for (let i = 0; i < 90; i++) {
    const biology =
      BASE_TEST_QUESTIONS.find(
        q => q.subject === "Biology"
      );

    questions.push({
      ...biology,
      question:
        `${biology.question} (Q${i + 91})`
    });
  }

  return questions;
}

function startTest() {
  testQuestions =
    generateMockTest();

  testIndex = 0;
  testAnswers = {};

  // NEET 3 hours = 10800 sec
  testSeconds = 10800;

  clearInterval(testTimer);

  testTimer =
    setInterval(() => {
      testSeconds--;

      updateTestTimer();

      if (testSeconds <= 0) {
        clearInterval(testTimer);
        finishTest();
      }
    }, 1000);

  renderTestQuestion();

  const area =
    $("testArea") ||
    $("testContainer") ||
    $("testContent");

  if (area) {
    area.scrollIntoView({
      behavior: "smooth"
    });
  }
}

window.startTest = startTest;

function updateTestTimer() {
  const timer =
    $("testTimer");

  if (!timer) return;

  const hours =
    Math.floor(testSeconds / 3600);

  const minutes =
    Math.floor(
      (testSeconds % 3600) / 60
    );

  const seconds =
    testSeconds % 60;

  timer.textContent =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function renderTestQuestion() {
  const container =
    $("testArea") ||
    $("testContainer") ||
    $("testContent");

  if (!container) return;

  const q =
    testQuestions[testIndex];

  if (!q) return;

  const selected =
    testAnswers[testIndex];

  container.innerHTML = `
    <div class="question-card">
      <div class="question-meta">
        <span>${escapeHTML(q.subject)}</span>
        <span>
          Q${testIndex + 1}/${testQuestions.length}
        </span>
      </div>

      <h2>${escapeHTML(q.question)}</h2>

      <div class="options">
        ${q.options.map(
          (option, index) => `
            <button
              class="option ${
                selected === index
                  ? "selected"
                  : ""
              }"
              onclick="selectTestAnswer(${index})"
            >
              <strong>
                ${String.fromCharCode(
                  65 + index
                )}.
              </strong>
              ${escapeHTML(option)}
            </button>
          `
        ).join("")}
      </div>

      <div class="question-actions">
        <button
          class="btn"
          onclick="previousTestQuestion()"
          ${testIndex === 0 ? "disabled" : ""}
        >
          ◀️ Previous
        </button>

        ${
          testIndex <
          testQuestions.length - 1
            ? `
              <button
                class="primary-btn"
                onclick="nextTestQuestion()"
              >
                Next ▶️
              </button>
            `
            : `
              <button
                class="primary-btn"
                onclick="finishTest()"
              >
                🏁 Submit Test
              </button>
            `
        }
      </div>
    </div>
  `;
}

function selectTestAnswer(answer) {
  testAnswers[testIndex] =
    answer;

  renderTestQuestion();
}

window.selectTestAnswer =
  selectTestAnswer;

function nextTestQuestion() {
  if (
    testIndex <
    testQuestions.length - 1
  ) {
    testIndex++;
    renderTestQuestion();
  }
}

window.nextTestQuestion =
  nextTestQuestion;

function previousTestQuestion() {
  if (testIndex > 0) {
    testIndex--;
    renderTestQuestion();
  }
}

window.previousTestQuestion =
  previousTestQuestion;

function finishTest() {
  clearInterval(testTimer);

  let score = 0;

  testQuestions.forEach(
    (question, index) => {
      if (
        testAnswers[index] ===
        question.answer
      ) {
        score++;
      }
    }
  );

  const attempted =
    Object.keys(testAnswers).length;

  const percentage =
    testQuestions.length
      ? (
          (score /
            testQuestions.length) *
          100
        ).toFixed(2)
      : "0.00";

  localStorage.setItem(
    "ml_last_test_score",
    String(score)
  );

  localStorage.setItem(
    "ml_last_test_attempted",
    String(attempted)
  );

  const container =
    $("testArea") ||
    $("testContainer") ||
    $("testContent");

  if (!container) return;

  container.innerHTML = `
    <div class="result-card">
      <h2>🎉 Test Complete</h2>

      <div class="result-stats">
        <div>
          <strong>${score}</strong>
          <span>Correct</span>
        </div>

        <div>
          <strong>${attempted}</strong>
          <span>Attempted</span>
        </div>

        <div>
          <strong>${percentage}%</strong>
          <span>Percentage</span>
        </div>
      </div>

      <button
        class="primary-btn"
        onclick="startTest()"
      >
        🔄 Retake Test
      </button>
    </div>
  `;

  updatePerformance();
}

window.finishTest = finishTest;

/* =========================
   DPP
========================= */

function generateDPP() {
  const questions = [];

  for (let i = 0; i < 90; i++) {
    const subject =
      i < 30
        ? "Physics"
        : i < 60
        ? "Chemistry"
        : "Biology";

    questions.push({
      subject,
      question:
        `${subject} DPP Question ${i + 1}`,
      options: [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      answer: i % 4,
      explanation:
        "DPP explanation yahan available hogi."
    });
  }

  return questions;
}

function startDPP() {
  dppQuestions =
    generateDPP();

  dppIndex = 0;
  dppAnswers = {};

  renderDPPQuestion();
}

window.startDPP = startDPP;

function renderDPPQuestion() {
  const container =
    $("dppArea") ||
    $("dppContainer") ||
    $("dppContent");

  if (!container) return;

  const q =
    dppQuestions[dppIndex];

  if (!q) return;

  container.innerHTML = `
    <div class="question-card">
      <div class="question-meta">
        <span>${q.subject}</span>
        <span>
          Q${dppIndex + 1}/90
        </span>
      </div>

      <h2>${escapeHTML(q.question)}</h2>

      <div class="options">
        ${q.options.map(
          (option, index) => `
            <button
              class="option"
              onclick="selectDPPAnswer(${index})"
            >
              <strong>
                ${String.fromCharCode(
                  65 + index
                )}.
              </strong>
              ${escapeHTML(option)}
            </button>
          `
        ).join("")}
      </div>

      <div class="question-actions">
        <button
          class="btn"
          onclick="previousDPPQuestion()"
        >
          ◀️ Previous
        </button>

        <button
          class="primary-btn"
          onclick="nextDPPQuestion()"
        >
          Next ▶️
        </button>
      </div>
    </div>
  `;
}

function selectDPPAnswer(answer) {
  dppAnswers[dppIndex] =
    answer;
}

window.selectDPPAnswer =
  selectDPPAnswer;

function nextDPPQuestion() {
  if (
    dppIndex <
    dppQuestions.length - 1
  ) {
    dppIndex++;
    renderDPPQuestion();
  }
}

window.nextDPPQuestion =
  nextDPPQuestion;

function previousDPPQuestion() {
  if (dppIndex > 0) {
    dppIndex--;
    renderDPPQuestion();
  }
}

window.previousDPPQuestion =
  previousDPPQuestion;

/* =========================
   PERFORMANCE
========================= */

function updatePerformance() {
  const score =
    Number(
      localStorage.getItem(
        "ml_last_test_score"
      ) || 0
    );

  const attempted =
    Number(
      localStorage.getItem(
        "ml_last_test_attempted"
      ) || 0
    );

  const scoreElements =
    document.querySelectorAll(
      "[data-last-score]"
    );

  scoreElements.forEach(
    (element) => {
      element.textContent =
        score;
    }
  );

  const attemptedElements =
    document.querySelectorAll(
      "[data-attempted]"
    );

  attemptedElements.forEach(
    (element) => {
      element.textContent =
        attempted;
    }
  );
}

window.updatePerformance =
  updatePerformance;

/* =========================
   MUSIC OPTION
========================= */

let audioContext = null;
let musicOscillator = null;
let musicPlaying = false;

function toggleMusic() {
  if (musicPlaying) {
    stopMusic();
  } else {
    startMusic();
  }
}

window.toggleMusic = toggleMusic;

function startMusic() {
  try {
    audioContext =
      audioContext ||
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    musicOscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    musicOscillator.type =
      "sine";

    musicOscillator.frequency.value =
      220;

    gain.gain.value =
      0.015;

    musicOscillator.connect(gain);
    gain.connect(
      audioContext.destination
    );

    musicOscillator.start();

    musicPlaying = true;

  } catch (error) {
    console.error(
      "Music error:",
      error
    );
  }
}

function stopMusic() {
  try {
    if (musicOscillator) {
      musicOscillator.stop();
      musicOscillator.disconnect();
      musicOscillator = null;
    }

    musicPlaying = false;

  } catch (error) {
    console.error(error);
  }
}

/* =========================
   INITIALIZATION
========================= */

function initializeApp() {
  // Apply saved settings
  setTheme(currentTheme);
  setMode(currentMode);
  setLanguage(currentLanguage);

  // IMPORTANT:
  // Hide every page first.
  // Only Home remains visible.
  document
    .querySelectorAll(".page")
    .forEach((page) => {
      page.classList.remove("active");
      page.style.display = "none";
    });

  const home =
    $("home");

  if (home) {
    home.classList.add("active");
    home.style.display = "block";
  }

  currentPage = "home";

  document
    .querySelectorAll(".nav-item")
    .forEach((item) => {
      item.classList.toggle(
        "active",
        item.dataset.page === "home"
      );
    });

  renderThemes();
  updatePerformance();

  // Global Enter search
  const searchInput =
    $("globalSearchInput");

  if (searchInput) {
    searchInput.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          globalSearch();
        }
      }
    );
  }
}

/* =========================
   START APP
========================= */

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApp
  );
} else {
  initializeApp();
  }
