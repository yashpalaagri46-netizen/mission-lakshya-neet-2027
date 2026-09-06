/* =========================================================
   MISSION LAKSHYA NEET 2027
   app.js
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL DATA
   ========================================================= */

const APP = {
  name: "Mission Lakshya NEET 2027",
  creator: "Yashpal Aagri",
  themeKey: "ml_theme",
  modeKey: "ml_mode",
  languageKey: "ml_language",
  bookmarksKey: "ml_bookmarks",
  profileKey: "ml_profile",
  progressKey: "ml_progress"
};

/* =========================================================
   THEMES
   ========================================================= */

const THEMES = [
  ["purple", "Royal Purple", "#7c3aed", "#a855f7"],
  ["blue", "Ocean Blue", "#2563eb", "#3b82f6"],
  ["green", "Emerald Green", "#16a34a", "#22c55e"],
  ["orange", "Energy Orange", "#ea580c", "#f97316"],
  ["red", "Power Red", "#dc2626", "#ef4444"],
  ["rose", "Rose Pink", "#e11d48", "#f43f5e"],
  ["ocean", "Deep Ocean", "#0891b2", "#06b6d4"],
  ["sunset", "Sunset", "#db2777", "#f97316"],
  ["cyber", "Cyber", "#06b6d4", "#8b5cf6"],
  ["gold", "Golden", "#ca8a04", "#eab308"],
  ["midnight", "Midnight", "#4f46e5", "#6366f1"],
  ["emerald", "Emerald", "#059669", "#10b981"],
  ["violet", "Violet", "#6d28d9", "#8b5cf6"],
  ["indigo", "Indigo", "#4338ca", "#6366f1"],
  ["sky", "Sky", "#0284c7", "#38bdf8"],
  ["cyan", "Cyan", "#0891b2", "#22d3ee"],
  ["teal", "Teal", "#0f766e", "#14b8a6"],
  ["lime", "Lime", "#65a30d", "#84cc16"],
  ["amber", "Amber", "#d97706", "#f59e0b"],
  ["yellow", "Yellow", "#ca8a04", "#facc15"],
  ["fuchsia", "Fuchsia", "#c026d3", "#e879f9"],
  ["pink", "Pink", "#db2777", "#f472b6"],
  ["magenta", "Magenta", "#be185d", "#ec4899"],
  ["crimson", "Crimson", "#be123c", "#fb7185"],
  ["coral", "Coral", "#f43f5e", "#fb7185"],
  ["indigo2", "Deep Indigo", "#3730a3", "#4f46e5"],
  ["lavender", "Lavender", "#8b5cf6", "#c084fc"],
  ["plum", "Plum", "#7e22ce", "#a855f7"],
  ["grape", "Grape", "#6b21a8", "#9333ea"],
  ["forest", "Forest", "#166534", "#22c55e"],
  ["mint", "Mint", "#0f766e", "#2dd4bf"],
  ["steel", "Steel", "#475569", "#64748b"],
  ["slate", "Slate", "#334155", "#64748b"],
  ["royal", "Royal Blue", "#1d4ed8", "#6366f1"],
  ["electric", "Electric", "#4f46e5", "#06b6d4"],
  ["neon", "Neon", "#7c3aed", "#22d3ee"]
];

/* =========================================================
   MODES
   ========================================================= */

const MODES = [
  ["auto", "⚙️", "Auto", "System preference"],
  ["light", "☀️", "Light", "Bright mode"],
  ["dark", "🌙", "Dark", "Dark mode"],
  ["amoled", "🖤", "AMOLED", "Pure black mode"],
  ["blue", "🔵", "Blue", "Blue study mode"],
  ["purple", "🟣", "Purple", "Purple study mode"],
  ["green", "🟢", "Green", "Green study mode"],
  ["orange", "🟠", "Orange", "Orange study mode"]
];

/* =========================================================
   SAMPLE BOOKS
   ========================================================= */

const BOOKS = [
  {
    subject: "Physics",
    title: "Physics Notes",
    icon: "⚡",
    description: "NEET Physics chapter-wise study material",
    tag: "Physics"
  },
  {
    subject: "Chemistry",
    title: "Chemistry Notes",
    icon: "🧪",
    description: "Physical, Organic and Inorganic Chemistry",
    tag: "Chemistry"
  },
  {
    subject: "Biology",
    title: "Biology Notes",
    icon: "🧬",
    description: "NCERT-focused Biology preparation",
    tag: "Biology"
  },
  {
    subject: "Physics",
    title: "Formula Revision",
    icon: "📐",
    description: "Important Physics formulas",
    tag: "Revision"
  },
  {
    subject: "Chemistry",
    title: "Reaction Revision",
    icon: "⚗️",
    description: "Important Chemistry reactions",
    tag: "Revision"
  },
  {
    subject: "Biology",
    title: "NCERT Revision",
    icon: "🌱",
    description: "Biology NCERT quick revision",
    tag: "NCERT"
  }
];

/* =========================================================
   SAMPLE VIDEOS
   ========================================================= */

const VIDEOS = [
  {
    title: "Physics NEET Revision",
    subject: "Physics",
    icon: "⚡"
  },
  {
    title: "Chemistry NEET Revision",
    subject: "Chemistry",
    icon: "🧪"
  },
  {
    title: "Biology NCERT Revision",
    subject: "Biology",
    icon: "🧬"
  },
  {
    title: "NEET Strategy",
    subject: "Strategy",
    icon: "🎯"
  },
  {
    title: "Quick Revision",
    subject: "Revision",
    icon: "📚"
  },
  {
    title: "Important Questions",
    subject: "Practice",
    icon: "❓"
  }
];

/* =========================================================
   STUDY WEBSITES
   ========================================================= */

const STUDY_WEBSITES = [
  ["DeltaStudy", "http://DeltaStudy.site", "📚"],
  ["Eduzex PW", "http://eduzex-pw.pages.dev/", "🎓"],
  ["StudyRays", "http://StudyRays.cc", "🌟"],
  ["LearnTopper", "http://Learntopper.in", "📖"],
  ["StudySpark", "http://Studyspark.pro", "⚡"],
  ["StudyBeePro", "http://Studybeepro.site", "🐝"],
  ["RolexCoderZ", "http://RolexCoderZ.in", "💻"],
  ["VedStudy", "https://vedstudy.com/", "🎯"],
  ["PrepProNetwork", "https://preppronetwork.vercel.app/", "🚀"],
  ["StudyPanda Books", "https://studypanda.live/books", "🐼"],
  ["Learnify", "https://learnify.deltaverse.site/", "📘"],
  ["PW StudyParcham", "https://pw.studyparcham.in/", "🏫"],
  ["AS Multiverse", "https://asmultiverse.com/", "🌐"],
  ["PWX Study", "https://pwx.pages.dev", "📕"]
];

/* =========================================================
   QUESTION BANK
   ========================================================= */

const QUESTION_BANK = [
  {
    subject: "Physics",
    question: "बल की SI इकाई क्या है?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    answer: 1,
    explanation: "बल की SI इकाई Newton है।"
  },
  {
    subject: "Chemistry",
    question: "पानी का रासायनिक सूत्र क्या है?",
    options: ["CO₂", "O₂", "H₂O", "NaCl"],
    answer: 2,
    explanation: "पानी दो Hydrogen और एक Oxygen से बना होता है।"
  },
  {
    subject: "Biology",
    question: "मानव शरीर में रक्त को पंप करने वाला अंग कौन सा है?",
    options: ["Liver", "Heart", "Lung", "Kidney"],
    answer: 1,
    explanation: "Heart पूरे शरीर में रक्त पंप करता है।"
  },
  {
    subject: "Physics",
    question: "वेग की SI इकाई क्या है?",
    options: ["m/s", "kg", "N", "J"],
    answer: 0,
    explanation: "वेग की SI इकाई metre per second (m/s) है।"
  },
  {
    subject: "Chemistry",
    question: "परमाणु का केंद्र क्या कहलाता है?",
    options: ["Electron", "Nucleus", "Orbital", "Ion"],
    answer: 1,
    explanation: "परमाणु का केंद्रीय भाग Nucleus कहलाता है।"
  },
  {
    subject: "Biology",
    question: "पौधों में प्रकाश संश्लेषण मुख्यतः कहाँ होता है?",
    options: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"],
    answer: 2,
    explanation: "Photosynthesis मुख्यतः chloroplast में होता है।"
  }
];

/* =========================================================
   APP STATE
   ========================================================= */

let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let testTimer = null;
let testSeconds = 0;

let musicOn = false;
let audioContext = null;

let profile = loadJSON(APP.profileKey, {
  name: "Yashpal Aagri",
  target: "NEET 2027"
});

/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

function loadJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  let container = $(".toast-container");

  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* =========================================================
   NAVIGATION
   ========================================================= */

function showSection(sectionId) {
  const sections = $all(".page-section");

  sections.forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(sectionId);

  if (target) {
    target.classList.add("active");
  }

  $all(".nav-item").forEach(item => {
    item.classList.remove("active");

    const onclick = item.getAttribute("onclick") || "";

    if (onclick.includes(sectionId)) {
      item.classList.add("active");
    }
  });

  closeSidebar();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function toggleSidebar() {
  const sidebar = $(".sidebar");

  if (!sidebar) return;

  sidebar.classList.toggle("open");

  createSidebarOverlay();
}

function closeSidebar() {
  const sidebar = $(".sidebar");

  if (sidebar) {
    sidebar.classList.remove("open");
  }

  const overlay = $(".sidebar-overlay");

  if (overlay) {
    overlay.classList.remove("show");
  }
}

function createSidebarOverlay() {
  let overlay = $(".sidebar-overlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";

    overlay.addEventListener("click", closeSidebar);

    document.body.appendChild(overlay);
  }

  const sidebar = $(".sidebar");

  if (sidebar?.classList.contains("open")) {
    overlay.classList.add("show");
  }
}

/* =========================================================
   SEARCH
   ========================================================= */

function globalSearch(value) {
  const query = String(value || "").trim().toLowerCase();

  if (!query) return;

  const matches = [
    ...BOOKS.map(x => x.title),
    ...VIDEOS.map(x => x.title),
    ...QUESTION_BANK.map(x => x.question),
    ...STUDY_WEBSITES.map(x => x[0])
  ].filter(item =>
    item.toLowerCase().includes(query)
  );

  if (matches.length) {
    showToast(`🔎 ${matches.length} result मिले`);
  } else {
    showToast("कोई result नहीं मिला");
  }
}

/* =========================================================
   THEMES
   ========================================================= */

function renderThemes() {
  const container = $("#themeList");

  if (!container) return;

  container.innerHTML = "";

  THEMES.forEach(theme => {
    const [id, name, primary, secondary] = theme;

    const card = document.createElement("button");

    card.className = "theme-card";

    card.dataset.theme = id;

    card.innerHTML = `
      <div
        class="theme-preview"
        style="--theme-primary:${primary};--theme-secondary:${secondary}"
      ></div>
      <strong>${escapeHTML(name)}</strong>
      <small>${primary}</small>
    `;

    card.addEventListener("click", () => {
      setTheme(id);
    });

    container.appendChild(card);
  });

  updateThemeSelection();
}

function setTheme(theme) {
  const themeExists = THEMES.some(t => t[0] === theme);

  if (!themeExists) return;

  document.body.classList.remove(
    ...THEMES.map(t => t[0])
  );

  document.body.classList.add(theme);

  localStorage.setItem(APP.themeKey, theme);

  updateThemeSelection();

  showToast(`🎨 ${theme} theme applied`);
}

function updateThemeSelection() {
  const activeTheme = localStorage.getItem(APP.themeKey) || "purple";

  $all(".theme-card").forEach(card => {
    card.classList.toggle(
      "active",
      card.dataset.theme === activeTheme
    );
  });
}

/* =========================================================
   MODES
   ========================================================= */

function renderModes() {
  const container = $("#modeList");

  if (!container) return;

  container.innerHTML = "";

  MODES.forEach(mode => {
    const [id, icon, name, description] = mode;

    const card = document.createElement("button");

    card.className = "mode-card";
    card.dataset.mode = id;

    card.innerHTML = `
      <div style="font-size:25px">${icon}</div>
      <strong>${escapeHTML(name)}</strong>
      <small>${escapeHTML(description)}</small>
    `;

    card.addEventListener("click", () => {
      setMode(id);
    });

    container.appendChild(card);
  });

  updateModeSelection();
}

function setMode(mode) {
  const valid = MODES.some(x => x[0] === mode);

  if (!valid) return;

  const classes = [
    "dark",
    "amoled",
    "blue",
    "purple",
    "green",
    "orange"
  ];

  document.body.classList.remove(...classes);

  if (mode !== "auto" && mode !== "light") {
    document.body.classList.add(mode);
  }

  if (mode === "dark") {
    document.body.dataset.mode = "dark";
  } else if (mode === "amoled") {
    document.body.dataset.mode = "amoled";
  } else {
    delete document.body.dataset.mode;
  }

  localStorage.setItem(APP.modeKey, mode);

  updateModeSelection();

  showToast(`⚙️ ${mode} mode applied`);
}

function updateModeSelection() {
  const activeMode = localStorage.getItem(APP.modeKey) || "auto";

  $all(".mode-card").forEach(card => {
    card.classList.toggle(
      "active",
      card.dataset.mode === activeMode
    );
  });
}

/* =========================================================
   THEME INITIALIZATION
   ========================================================= */

function initializeTheme() {
  const savedTheme =
    localStorage.getItem(APP.themeKey) || "purple";

  const savedMode =
    localStorage.getItem(APP.modeKey) || "auto";

  setTheme(savedTheme);
  setMode(savedMode);
}

/* =========================================================
   BOOKS
   ========================================================= */

function renderBooks(list = BOOKS) {
  const container = $(".books-grid");

  if (!container) return;

  container.innerHTML = "";

  list.forEach(book => {
    const card = document.createElement("div");

    card.className = "resource-card";

    card.innerHTML = `
      <div class="resource-icon">${book.icon}</div>

      <h3>${escapeHTML(book.title)}</h3>

      <p>${escapeHTML(book.description)}</p>

      <div class="resource-meta">
        <span class="tag">${escapeHTML(book.subject)}</span>
        <span class="tag">${escapeHTML(book.tag)}</span>
      </div>

      <div class="resource-actions">
        <button class="btn btn-primary"
          onclick="openResource('${escapeHTML(book.title)}')">
          📖 Open
        </button>

        <button class="btn btn-secondary"
          onclick="bookmarkItem('${escapeHTML(book.title)}')">
          🔖 Save
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function openResource(title) {
  showToast(`📖 ${title} खोलने के लिए resource अभी तैयार किया जा रहा है`);
}

/* =========================================================
   VIDEOS
   ========================================================= */

function renderVideos(list = VIDEOS) {
  const container = $(".video-grid");

  if (!container) return;

  container.innerHTML = "";

  list.forEach(video => {
    const card = document.createElement("div");

    card.className = "resource-card";

    card.innerHTML = `
      <div class="video-thumb">
        <span style="font-size:42px">${video.icon}</span>
      </div>

      <div class="video-info">
        <h3>${escapeHTML(video.title)}</h3>
        <p>${escapeHTML(video.subject)} • NEET 2027</p>
      </div>

      <div class="resource-actions">
        <button class="btn btn-primary"
          onclick="openYouTubeSearch('${escapeHTML(video.title)}')">
          ▶ Watch
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

/* =========================================================
   YOUTUBE
   ========================================================= */

function openYouTubeSearch(query) {
  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(query + " NEET");

  window.open(url, "_blank", "noopener,noreferrer");
}

function playYouTube(videoId) {
  const player = $("#youtubePlayer");

  if (!player) return;

  player.src =
    "https://www.youtube.com/embed/" +
    encodeURIComponent(videoId);

  showSection("youtube");
}

/* =========================================================
   STUDY WEBSITES
   ========================================================= */

function renderStudyWebsites() {
  const container = $(".website-grid");

  if (!container) return;

  container.innerHTML = "";

  STUDY_WEBSITES.forEach(site => {
    const [name, url, icon] = site;

    const card = document.createElement("div");

    card.className = "website-card";

    card.innerHTML = `
      <div class="website-logo">${icon}</div>

      <h3>${escapeHTML(name)}</h3>

      <p>External study resource</p>

      <div class="website-actions">

        <button
          class="btn btn-primary"
          onclick="openWebsite('${url}')">
          Open
        </button>

        <button
          class="btn btn-secondary"
          onclick="openExternal('${url}')">
          New Tab
        </button>

      </div>
    `;

    container.appendChild(card);
  });
}

function openWebsite(url) {
  const viewer = $(".website-viewer");

  if (!viewer) {
    openExternal(url);
    return;
  }

  viewer.innerHTML = `
    <iframe
      src="${url}"
      title="Study Website"
      loading="lazy"
      referrerpolicy="no-referrer">
    </iframe>

    <div style="padding:12px">
      <button class="btn btn-secondary"
        onclick="openExternal('${url}')">
        🌐 Open in New Tab
      </button>
    </div>
  `;

  viewer.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  showToast("🌐 Website loading...");
}

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================================================
   BOOKMARKS
   ========================================================= */

function bookmarkItem(item) {
  const bookmarks =
    loadJSON(APP.bookmarksKey, []);

  if (!bookmarks.includes(item)) {
    bookmarks.push(item);

    saveJSON(APP.bookmarksKey, bookmarks);

    showToast("🔖 Saved to bookmarks");
  } else {
    showToast("Already saved 🔖");
  }
}

/* =========================================================
   AI DOUBT SOLVER
   ========================================================= */

async function askAI() {
  const question = $("#aiQuestion");
  const answer = $("#aiAnswer");
  const loading = $("#aiLoading");

  if (!question || !answer) return;

  const text = question.value.trim();

  if (!text) {
    showToast("पहले अपना सवाल लिखो");
    question.focus();
    return;
  }

  if (loading) {
    loading.classList.remove("hidden");
  }

  answer.textContent = "";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: text
      })
    });

    if (!response.ok) {
      throw new Error("AI request failed");
    }

    const data = await response.json();

    answer.textContent =
      data.answer ||
      data.text ||
      "AI ने कोई उत्तर नहीं दिया।";

  } catch (error) {
    console.error(error);

    answer.textContent =
      "AI अभी उपलब्ध नहीं है। कृपया थोड़ी देर बाद फिर कोशिश करें।";
  } finally {
    if (loading) {
      loading.classList.add("hidden");
    }
  }
}

/* =========================================================
   QUESTION BANK
   ========================================================= */

function renderQuestionBank(list = QUESTION_BANK) {
  const container = $("#questionBankList");

  if (!container) return;

  container.innerHTML = "";

  list.forEach((q, index) => {
    const card = document.createElement("div");

    card.className = "question-card";

    card.innerHTML = `
      <div class="question-number">
        ${escapeHTML(q.subject)} • Question ${index + 1}
      </div>

      <div class="question-text">
        ${escapeHTML(q.question)}
      </div>

      <div class="options">
        ${q.options.map((option, i) => `
          <button class="option"
            onclick="checkQuestion(this, ${index}, ${i})">
            ${String.fromCharCode(65 + i)}.
            ${escapeHTML(option)}
          </button>
        `).join("")}
      </div>

      <div id="explanation-${index}"
           class="ai-answer hidden"></div>
    `;

    container.appendChild(card);
  });
}

function checkQuestion(button, questionIndex, selected) {
  const question = QUESTION_BANK[questionIndex];

  const parent = button.closest(".question-card");

  if (!parent) return;

  const options = parent.querySelectorAll(".option");

  options.forEach(option => {
    option.disabled = true;
  });

  if (selected === question.answer) {
    button.classList.add("correct");
    showToast("✅ सही उत्तर!");
  } else {
    button.classList.add("wrong");
    options[question.answer]?.classList.add("correct");
    showToast("❌ गलत उत्तर");
  }

  const explanation =
    document.getElementById(
      `explanation-${questionIndex}`
    );

  if (explanation) {
    explanation.classList.remove("hidden");

    explanation.textContent =
      "💡 Explanation: " +
      question.explanation;
  }
}

/* =========================================================
   NEET TEST GENERATOR
   ========================================================= */

function generateTestQuestions() {
  const questions = [];

  for (let i = 0; i < 180; i++) {
    const base =
      QUESTION_BANK[i % QUESTION_BANK.length];

    questions.push({
      ...base,
      question:
        `${base.question} (NEET Mock Question ${i + 1})`
    });
  }

  return questions;
}

function startNEETTest() {
  currentQuestions = generateTestQuestions();

  currentQuestionIndex = 0;

  userAnswers = new Array(
    currentQuestions.length
  ).fill(null);

  testSeconds = 3 * 60 * 60;

  startTestTimer();

  renderTestQuestion();

  showToast(
    "🎯 NEET Test शुरू! 180 Questions"
  );
}

function startTestTimer() {
  clearInterval(testTimer);

  updateTimerDisplay();

  testTimer = setInterval(() => {
    testSeconds--;

    updateTimerDisplay();

    if (testSeconds <= 0) {
      clearInterval(testTimer);
      finishNEETTest();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timer =
    document.querySelector(".timer");

  if (!timer) return;

  const hours =
    Math.floor(testSeconds / 3600);

  const minutes =
    Math.floor((testSeconds % 3600) / 60);

  const seconds =
    testSeconds % 60;

  timer.textContent =
    `⏱️ ${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function renderTestQuestion() {
  const area = $("#testArea");

  if (!area || !currentQuestions.length) return;

  const q =
    currentQuestions[currentQuestionIndex];

  area.innerHTML = `
    <div class="test-header">

      <strong>
        Question ${currentQuestionIndex + 1}
        / ${currentQuestions.length}
      </strong>

      <div class="timer">
        ⏱️ 03:00:00
      </div>

    </div>

    <div class="question-card">

      <div class="question-number">
        ${escapeHTML(q.subject)}
      </div>

      <div class="question-text">
        ${escapeHTML(q.question)}
      </div>

      <div class="options">

        ${q.options.map((option, i) => `
          <button
            class="option ${
              userAnswers[currentQuestionIndex] === i
                ? "selected"
                : ""
            }"
            onclick="selectTestAnswer(${i})">

            ${String.fromCharCode(65 + i)}.
            ${escapeHTML(option)}

          </button>
        `).join("")}

      </div>

      <div style="
        display:flex;
        gap:10px;
        margin-top:18px;
        flex-wrap:wrap;
      ">

        <button
          class="btn btn-secondary"
          onclick="previousTestQuestion()">
          ← Previous
        </button>

        <button
          class="btn btn-primary"
          onclick="nextTestQuestion()">

          ${
            currentQuestionIndex ===
            currentQuestions.length - 1
              ? "Finish Test"
              : "Next →"
          }

        </button>

      </div>

    </div>
  `;

  updateTimerDisplay();
}

function selectTestAnswer(answer) {
  userAnswers[currentQuestionIndex] = answer;

  renderTestQuestion();
}

function nextTestQuestion() {
  if (
    currentQuestionIndex <
    currentQuestions.length - 1
  ) {
    currentQuestionIndex++;
    renderTestQuestion();
  } else {
    finishNEETTest();
  }
}

function previousTestQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderTestQuestion();
  }
}

function finishNEETTest() {
  clearInterval(testTimer);

  let correct = 0;

  currentQuestions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      correct++;
    }
  });

  const attempted =
    userAnswers.filter(x => x !== null).length;

  const wrong = attempted - correct;

  const area = $("#testArea");

  if (!area) return;

  area.innerHTML = `
    <div class="card" style="text-align:center">

      <div style="font-size:55px">
        🏆
      </div>

      <h2 style="margin-top:10px">
        NEET Test Completed
      </h2>

      <p style="color:var(--muted)">
        180 Questions
      </p>

      <div class="stats-grid"
           style="margin-top:20px">

        <div class="stat-card">
          <div class="stat-label">
            Correct
          </div>

          <div class="stat-value">
            ${correct}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-label">
            Wrong
          </div>

          <div class="stat-value">
            ${wrong}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-label">
            Attempted
          </div>

          <div class="stat-value">
            ${attempted}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-label">
            Score
          </div>

          <div class="stat-value">
            ${correct * 4}
          </div>
        </div>

      </div>

      <button
        class="btn btn-primary"
        style="margin-top:20px"
        onclick="startNEETTest()">

        🔄 Retake Test

      </button>

    </div>
  `;

  showToast("🏆 Test completed!");
}

/* =========================================================
   DPP
   ========================================================= */

function generateDPP() {
  const questions = [];

  for (let i = 0; i < 90; i++) {
    const base =
      QUESTION_BANK[i % QUESTION_BANK.length];

    questions.push({
      ...base,
      question:
        `${base.question} — DPP ${i + 1}`
    });
  }

  return questions;
}

function startDPP() {
  currentQuestions = generateDPP();

  currentQuestionIndex = 0;

  userAnswers = new Array(90).fill(null);

  testSeconds = 90 * 60;

  startTestTimer();

  renderTestQuestion();

  showToast("📚 DPP शुरू! 90 Questions");
}

/* =========================================================
   PROFILE
   ========================================================= */

function updateProfileUI() {
  $all("[data-profile-name]").forEach(element => {
    element.textContent = profile.name;
  });

  $all("[data-profile-target]").forEach(element => {
    element.textContent = profile.target;
  });
}

function editProfile() {
  const name =
    prompt(
      "अपना नाम लिखें:",
      profile.name
    );

  if (!name) return;

  profile.name = name.trim();

  saveJSON(APP.profileKey, profile);

  updateProfileUI();

  showToast("👤 Profile updated");
}

/* =========================================================
   MUSIC
   ========================================================= */

function toggleMusic() {
  musicOn = !musicOn;

  const status = $("#musicStatus");
  const button = $("#musicButton");

  if (musicOn) {
    startStudyTone();

    if (status) {
      status.textContent =
        "🎵 Study music ON";
    }

    if (button) {
      button.textContent = "⏸️";
    }
  } else {
    stopStudyTone();

    if (status) {
      status.textContent =
        "🎵 Music OFF";
    }

    if (button) {
      button.textContent = "▶️";
    }
  }
}

function startStudyTone() {
  try {
    audioContext =
      audioContext ||
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value = 220;

    gain.gain.value = 0.025;

    oscillator.connect(gain);

    gain.connect(audioContext.destination);

    oscillator.start();

    window.__studyOscillator = oscillator;
    window.__studyGain = gain;

  } catch {
    showToast(
      "🎵 Browser audio उपलब्ध नहीं है"
    );
  }
}

function stopStudyTone() {
  try {
    if (window.__studyOscillator) {
      window.__studyOscillator.stop();
      window.__studyOscillator = null;
    }
  } catch {}
}

/* =========================================================
   YOUTUBE LIVE
   ========================================================= */

async function loadYouTubeLive() {
  const status = $("#liveStatus");
  const container = $("#liveVideos");

  if (!container) return;

  if (status) {
    status.textContent = "🔴 Checking live classes...";
  }

  try {
    const response =
      await fetch("/api/youtube-live");

    if (!response.ok) {
      throw new Error("Live API unavailable");
    }

    const data = await response.json();

    const videos = data.videos || [];

    if (!videos.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">
            📺
          </div>

          <h3>No live class found</h3>

          <p>
            अभी कोई live class उपलब्ध नहीं है।
          </p>
        </div>
      `;

      if (status) {
        status.textContent =
          "⚪ No live classes";
      }

      return;
    }

    container.innerHTML =
      videos.map(video => `
        <div class="resource-card">

          <div class="video-thumb">
            ▶️
          </div>

          <h3>
            ${escapeHTML(video.title || "Live Class")}
          </h3>

          <p>
            ${escapeHTML(video.channelTitle || "")}
          </p>

          <button
            class="btn btn-primary"
            style="margin-top:12px"
            onclick="playYouTube('${escapeHTML(video.videoId)}')">

            ▶ Watch Live

          </button>

        </div>
      `).join("");

    if (status) {
      status.textContent =
        "🔴 Live classes available";
    }

  } catch (error) {
    console.error(error);

    container.innerHTML = `
      <div class="empty-state">

        <div class="empty-state-icon">
          📡
        </div>

        <h3>
          Live classes unavailable
        </h3>

        <p>
          YouTube API configuration check करें।
        </p>

      </div>
    `;

    if (status) {
      status.textContent =
        "⚠️ Live API unavailable";
    }
  }
}

/* =========================================================
   LANGUAGE
   ========================================================= */

function setLanguage(language) {
  localStorage.setItem(
    APP.languageKey,
    language
  );

  if (language === "hi") {
    document.documentElement.lang = "hi";
    showToast("🇮🇳 Hindi selected");
  } else {
    document.documentElement.lang = "en";
    showToast("🇬🇧 English selected");
  }
}

/* =========================================================
   PERFORMANCE
   ========================================================= */

function loadProgress() {
  const progress =
    loadJSON(APP.progressKey, {
      physics: 35,
      chemistry: 28,
      biology: 42
    });

  $all("[data-progress]").forEach(bar => {
    const subject =
      bar.dataset.progress;

    const value =
      Number(progress[subject] || 0);

    bar.style.width =
      `${Math.min(100, value)}%`;
  });
}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener("keydown", event => {
  if (
    event.key === "/" &&
    document.activeElement?.tagName !== "INPUT" &&
    document.activeElement?.tagName !== "TEXTAREA"
  ) {
    event.preventDefault();

    const search =
      $(".top-search input");

    search?.focus();
  }

  if (event.key === "Escape") {
    closeSidebar();
  }
});

/* =========================================================
   GLOBAL SEARCH LISTENER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const search =
    $(".top-search input");

  if (search) {
    search.addEventListener(
      "keydown",
      event => {
        if (event.key === "Enter") {
          globalSearch(search.value);
        }
      }
    );
  }
});

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    renderThemes();

    renderModes();

    renderBooks();

    renderVideos();

    renderStudyWebsites();

    renderQuestionBank();

    initializeTheme();

    updateProfileUI();

    loadProgress();

    /* Default home */

    const home =
      document.getElementById("home");

    if (home) {
      showSection("home");
    }

    console.log(
      "Mission Lakshya NEET 2027 loaded successfully."
    );

  }
);

/* =========================================================
   WINDOW EXPORTS
   ========================================================= */

window.showSection = showSection;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;

window.setTheme = setTheme;
window.setMode = setMode;

window.renderThemes = renderThemes;
window.renderModes = renderModes;

window.askAI = askAI;

window.openResource = openResource;
window.openYouTubeSearch = openYouTubeSearch;
window.playYouTube = playYouTube;

window.openWebsite = openWebsite;
window.openExternal = openExternal;

window.bookmarkItem = bookmarkItem;

window.checkQuestion = checkQuestion;

window.startNEETTest = startNEETTest;
window.startDPP = startDPP;

window.selectTestAnswer = selectTestAnswer;
window.nextTestQuestion = nextTestQuestion;
window.previousTestQuestion = previousTestQuestion;

window.finishNEETTest = finishNEETTest;

window.editProfile = editProfile;

window.toggleMusic = toggleMusic;

window.loadYouTubeLive = loadYouTubeLive;

window.setLanguage = setLanguage;
