/* =========================================================
   MISSION LAKSHYA NEET 2027
   APP.JS - Section Navigation + Main App
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
  ["sunset", "Sunset"],
  ["midnight", "Midnight"],
  ["ocean", "Ocean"],
  ["aqua", "Aqua"],
  ["forest", "Forest"],
  ["mint", "Mint"],
  ["lavender", "Lavender"],
  ["plum", "Plum"],
  ["rosewood", "Rosewood"],
  ["slate", "Slate"],
  ["neon", "Neon"],
  ["cyber", "Cyber"],
  ["space", "Space"],
  ["aurora", "Aurora"],
  ["cosmic", "Cosmic"]
];

const MODES = [
  ["auto", "⚙️ Auto"],
  ["light", "☀️ Light"],
  ["dark", "🌙 Dark"],
  ["amoled", "🖤 AMOLED"],
  ["blue", "🔵 Blue"],
  ["purple", "🟣 Purple"],
  ["green", "🟢 Green"],
  ["orange", "🟠 Orange"]
];

/* =========================
   SAMPLE DATA
========================= */

const books = [
  {
    title: "NCERT Physics Class 11",
    subject: "Physics",
    icon: "⚛️"
  },
  {
    title: "NCERT Chemistry Class 11",
    subject: "Chemistry",
    icon: "🧪"
  },
  {
    title: "NCERT Biology Class 11",
    subject: "Biology",
    icon: "🧬"
  },
  {
    title: "NCERT Physics Class 12",
    subject: "Physics",
    icon: "⚡"
  },
  {
    title: "NCERT Chemistry Class 12",
    subject: "Chemistry",
    icon: "🔬"
  },
  {
    title: "NCERT Biology Class 12",
    subject: "Biology",
    icon: "🌱"
  }
];

const videos = [
  {
    title: "Physics NEET Lecture",
    subject: "Physics",
    query: "NEET Physics lecture"
  },
  {
    title: "Chemistry NEET Lecture",
    subject: "Chemistry",
    query: "NEET Chemistry lecture"
  },
  {
    title: "Biology NEET Lecture",
    subject: "Biology",
    query: "NEET Biology lecture"
  }
];

const websites = [
  {
    name: "DeltaStudy",
    url: "http://DeltaStudy.site",
    icon: "📚"
  },
  {
    name: "Eduzex PW",
    url: "http://eduzex-pw.pages.dev/",
    icon: "🎓"
  },
  {
    name: "StudyRays",
    url: "http://StudyRays.cc",
    icon: "🌐"
  },
  {
    name: "LearnTopper",
    url: "http://Learntopper.in",
    icon: "📖"
  },
  {
    name: "StudySpark",
    url: "http://Studyspark.pro",
    icon: "✨"
  },
  {
    name: "StudyBeePro",
    url: "http://Studybeepro.site",
    icon: "🐝"
  },
  {
    name: "RolexCoderZ",
    url: "http://RolexCoderZ.in",
    icon: "💻"
  },
  {
    name: "VedStudy",
    url: "https://vedstudy.com/",
    icon: "📚"
  },
  {
    name: "PrepPro Network",
    url: "https://preppronetwork.vercel.app/",
    icon: "🚀"
  },
  {
    name: "StudyPanda Books",
    url: "https://studypanda.live/books",
    icon: "🐼"
  },
  {
    name: "Learnify",
    url: "https://learnify.deltaverse.site/",
    icon: "🎯"
  },
  {
    name: "PW StudyParcham",
    url: "https://pw.studyparcham.in/",
    icon: "🎓"
  },
  {
    name: "AS Multiverse",
    url: "https://asmultiverse.com/",
    icon: "🌌"
  },
  {
    name: "PWX Study",
    url: "https://pwx.pages.dev",
    icon: "📘"
  }
];

/* =========================
   SECTION NAVIGATION
========================= */

function showSection(sectionId) {

  const sections = document.querySelectorAll(".page-section");

  sections.forEach(section => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  const target = document.getElementById(sectionId);

  if (target) {
    target.classList.add("active");
    target.style.display = "block";
  }

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  const activeNav = document.querySelector(
    `[data-section="${sectionId}"]`
  );

  if (activeNav) {
    activeNav.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeSidebar();
}

/* =========================
   NAVIGATION BUTTONS
========================= */

function setupNavigation() {

  document.querySelectorAll("[data-section]").forEach(item => {

    item.addEventListener("click", function(event) {

      event.preventDefault();

      const section = this.dataset.section;

      if (section) {
        showSection(section);
      }

    });

  });

}

/* =========================
   SIDEBAR
========================= */

function openSidebar() {

  document.body.classList.add("sidebar-open");

  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    sidebar.classList.add("open");
  }
}

function closeSidebar() {

  document.body.classList.remove("sidebar-open");

  const sidebar = document.querySelector(".sidebar");

  if (sidebar) {
    sidebar.classList.remove("open");
  }
}

function toggleSidebar() {

  const sidebar = document.querySelector(".sidebar");

  if (!sidebar) return;

  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

/* =========================
   SEARCH
========================= */

function setupSearch() {

  const searchInput = document.getElementById("globalSearch");

  if (!searchInput) return;

  searchInput.addEventListener("keydown", function(event) {

    if (event.key !== "Enter") return;

    const query = this.value.trim();

    if (!query) return;

    const lower = query.toLowerCase();

    if (
      lower.includes("book") ||
      lower.includes("ncert") ||
      lower.includes("notes")
    ) {
      showSection("books");
    }

    else if (
      lower.includes("video") ||
      lower.includes("lecture")
    ) {
      showSection("videos");
    }

    else if (
      lower.includes("test") ||
      lower.includes("mock")
    ) {
      showSection("tests");
    }

    else if (
      lower.includes("dpp")
    ) {
      showSection("dpp");
    }

    else if (
      lower.includes("ai") ||
      lower.includes("doubt")
    ) {
      showSection("ai");
    }

    else if (
      lower.includes("youtube") ||
      lower.includes("live")
    ) {
      showSection("youtube");
    }

    else {
      alert("Search: " + query);
    }

  });

}

/* =========================
   THEME
========================= */

function setTheme(theme) {

  document.documentElement.dataset.theme = theme;

  localStorage.setItem(
    STORAGE.theme,
    theme
  );

  document.querySelectorAll(".theme-option").forEach(item => {
    item.classList.toggle(
      "active",
      item.dataset.theme === theme
    );
  });
}

function setMode(mode) {

  document.documentElement.dataset.mode = mode;

  localStorage.setItem(
    STORAGE.mode,
    mode
  );

  document.querySelectorAll(".mode-option").forEach(item => {
    item.classList.toggle(
      "active",
      item.dataset.mode === mode
    );
  });

  if (mode === "auto") {

    const dark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    document.documentElement.classList.toggle(
      "dark",
      dark
    );

  } else {

    document.documentElement.classList.toggle(
      "dark",
      mode === "dark" ||
      mode === "amoled"
    );

  }
}

/* =========================
   THEME UI
========================= */

function renderThemes() {

  const container =
    document.getElementById("themeList");

  if (!container) return;

  container.innerHTML = "";

  THEMES.forEach(([id, name]) => {

    const button =
      document.createElement("button");

    button.className = "theme-option";

    button.dataset.theme = id;

    button.innerHTML = `
      <span class="theme-dot theme-${id}"></span>
      <span>${name}</span>
    `;

    button.addEventListener("click", () => {
      setTheme(id);
    });

    container.appendChild(button);

  });

  const saved =
    localStorage.getItem(STORAGE.theme) ||
    "purple";

  setTheme(saved);
}

function renderModes() {

  const container =
    document.getElementById("modeList");

  if (!container) return;

  container.innerHTML = "";

  MODES.forEach(([id, name]) => {

    const button =
      document.createElement("button");

    button.className = "mode-option";

    button.dataset.mode = id;

    button.textContent = name;

    button.addEventListener("click", () => {
      setMode(id);
    });

    container.appendChild(button);

  });

  const saved =
    localStorage.getItem(STORAGE.mode) ||
    "auto";

  setMode(saved);
}

/* =========================
   BOOKS
========================= */

function renderBooks() {

  const container =
    document.getElementById("booksGrid");

  if (!container) return;

  container.innerHTML = books.map(book => `
    <div class="study-card">
      <div class="study-icon">
        ${book.icon}
      </div>

      <h3>${escapeHTML(book.title)}</h3>

      <p>${escapeHTML(book.subject)}</p>

      <button
        class="btn"
        onclick="alert('Book/PDF section तैयार किया जाएगा।')"
      >
        📖 Open
      </button>
    </div>
  `).join("");
}

/* =========================
   VIDEOS
========================= */

function renderVideos() {

  const container =
    document.getElementById("videosGrid");

  if (!container) return;

  container.innerHTML = videos.map(video => `
    <div class="study-card">

      <div class="study-icon">🎥</div>

      <h3>${escapeHTML(video.title)}</h3>

      <p>${escapeHTML(video.subject)}</p>

      <button
        class="btn"
        onclick="searchYouTube('${escapeAttribute(video.query)}')"
      >
        ▶ Watch
      </button>

    </div>
  `).join("");
}

/* =========================
   YOUTUBE SEARCH
========================= */

function searchYouTube(query) {

  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(query);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}

/* =========================
   YOUTUBE PLAYER
========================= */

function playYouTube(videoId) {

  const player =
    document.getElementById("youtubePlayer");

  if (!player) return;

  player.src =
    "https://www.youtube.com/embed/" +
    encodeURIComponent(videoId);

  const chat =
    document.getElementById("youtubeChat");

  if (chat) {

    chat.innerHTML = `
      <div class="info-box">
        📺 YouTube Live Chat
        <br>
        <a
          href="https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open YouTube Live
        </a>
      </div>
    `;

  }
}

/* =========================
   YOUTUBE LIVE API
========================= */

async function loadYouTubeLive() {

  const status =
    document.getElementById("liveStatus");

  const container =
    document.getElementById("liveVideos");

  if (!container) return;

  if (status) {
    status.textContent =
      "🔄 Live classes खोजी जा रही हैं...";
  }

  try {

    const response =
      await fetch("/api/youtube-live");

    const data =
      await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "YouTube API error"
      );
    }

    const videos =
      Array.isArray(data.videos)
        ? data.videos
        : [];

    if (!videos.length) {

      container.innerHTML = `
        <div class="empty-state">
          📺 अभी कोई live class नहीं मिली।
        </div>
      `;

      if (status) {
        status.textContent =
          "No live classes found.";
      }

      return;
    }

    container.innerHTML =
      videos.map(video => `

        <div class="study-card">

          <img
            src="${escapeAttribute(video.thumbnail)}"
            alt=""
            loading="lazy"
          >

          <h3>
            ${escapeHTML(video.title)}
          </h3>

          <p>
            🔴 ${escapeHTML(video.channelTitle)}
          </p>

          <button
            class="btn"
            onclick="playYouTube('${escapeAttribute(video.videoId)}')"
          >
            ▶ Watch Live
          </button>

        </div>

      `).join("");

    if (status) {
      status.textContent =
        `🔴 ${videos.length} live class मिली`;
    }

  } catch (error) {

    console.error(error);

    container.innerHTML = `
      <div class="empty-state">
        ⚠️ YouTube Live अभी उपलब्ध नहीं है।
        <br>
        API settings check करें।
      </div>
    `;

    if (status) {
      status.textContent =
        "YouTube Live unavailable";
    }

  }
}

/* =========================
   STUDY WEBSITES
========================= */

function renderWebsites() {

  const container =
    document.getElementById("websitesGrid");

  if (!container) return;

  container.innerHTML =
    websites.map((site, index) => `

      <div class="study-card">

        <div class="study-icon">
          ${site.icon}
        </div>

        <h3>
          ${escapeHTML(site.name)}
        </h3>

        <div class="button-row">

          <button
            class="btn"
            onclick="openWebsite(${index})"
          >
            🌐 Open
          </button>

          <button
            class="btn secondary"
            onclick="openWebsiteNewTab(${index})"
          >
            ↗ New Tab
          </button>

        </div>

      </div>

    `).join("");
}

function openWebsite(index) {

  const site = websites[index];

  if (!site) return;

  const viewer =
    document.getElementById("websiteViewer");

  const frame =
    document.getElementById("websiteFrame");

  if (viewer && frame) {

    frame.src = site.url;

    viewer.style.display = "block";

    viewer.scrollIntoView({
      behavior: "smooth"
    });

  }

}

function openWebsiteNewTab(index) {

  const site = websites[index];

  if (!site) return;

  window.open(
    site.url,
    "_blank",
    "noopener,noreferrer"
  );
}

/* =========================
   AI DOUBT SOLVER
========================= */

async function askAI() {

  const input =
    document.getElementById("aiQuestion");

  const answer =
    document.getElementById("aiAnswer");

  const loading =
    document.getElementById("aiLoading");

  if (!input || !answer) return;

  const question =
    input.value.trim();

  if (!question) {

    answer.innerHTML =
      "❗ पहले अपना सवाल लिखें।";

    return;
  }

  if (loading) {
    loading.style.display = "block";
  }

  answer.innerHTML =
    "🤖 AI सोच रहा है...";

  try {

    const response =
      await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          question
        })

      });

    const data =
      await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "AI error"
      );
    }

    answer.innerHTML =
      formatAIAnswer(data.answer);

  } catch (error) {

    console.error(error);

    answer.innerHTML = `
      ❌ AI अभी जवाब नहीं दे पाया।
      <br><br>
      कृपया कुछ देर बाद फिर कोशिश करें।
    `;

  } finally {

    if (loading) {
      loading.style.display = "none";
    }

  }
}

function formatAIAnswer(text) {

  return escapeHTML(text)
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");
}

/* =========================
   QUESTION BANK
========================= */

const questionBank = [
  {
    subject: "Physics",
    question: "Velocity का SI unit क्या है?",
    options: [
      "m",
      "m/s",
      "m/s²",
      "N"
    ],
    answer: 1,
    explanation:
      "Velocity का SI unit metre per second (m/s) है।"
  },

  {
    subject: "Chemistry",
    question: "Water का chemical formula क्या है?",
    options: [
      "CO₂",
      "O₂",
      "H₂O",
      "H₂"
    ],
    answer: 2,
    explanation:
      "Water का chemical formula H₂O है।"
  },

  {
    subject: "Biology",
    question: "Cell का powerhouse किसे कहा जाता है?",
    options: [
      "Nucleus",
      "Ribosome",
      "Mitochondria",
      "Golgi body"
    ],
    answer: 2,
    explanation:
      "Mitochondria को cell का powerhouse कहा जाता है।"
  },

  {
    subject: "Biology",
    question: "Photosynthesis मुख्य रूप से किस organelle में होता है?",
    options: [
      "Mitochondria",
      "Chloroplast",
      "Nucleus",
      "Ribosome"
    ],
    answer: 1,
    explanation:
      "Photosynthesis chloroplast में होता है।"
  },

  {
    subject: "Physics",
    question: "Force का SI unit क्या है?",
    options: [
      "Joule",
      "Newton",
      "Watt",
      "Pascal"
    ],
    answer: 1,
    explanation:
      "Force का SI unit Newton है।"
  },

  {
    subject: "Chemistry",
    question: "Atomic number किसे दर्शाता है?",
    options: [
      "Neutrons",
      "Electrons + Neutrons",
      "Protons",
      "Mass"
    ],
    answer: 2,
    explanation:
      "Atomic number nucleus में मौजूद protons की संख्या होती है।"
  }
];

/* =========================
   QUESTION BANK RENDER
========================= */

function renderQuestionBank() {

  const container =
    document.getElementById("questionBankGrid");

  if (!container) return;

  container.innerHTML =
    questionBank.map((q, index) => `

      <div class="question-card">

        <span class="badge">
          ${escapeHTML(q.subject)}
        </span>

        <h3>
          Q${index + 1}. ${escapeHTML(q.question)}
        </h3>

        <div class="options">

          ${q.options.map((option, i) => `

            <button
              class="option-btn"
              onclick="checkQuestion(${index}, ${i})"
            >
              ${String.fromCharCode(65 + i)}.
              ${escapeHTML(option)}
            </button>

          `).join("")}

        </div>

        <div
          id="explanation-${index}"
          class="explanation"
        ></div>

      </div>

    `).join("");
}

function checkQuestion(questionIndex, selected) {

  const question =
    questionBank[questionIndex];

  const box =
    document.getElementById(
      `explanation-${questionIndex}`
    );

  if (!box) return;

  if (selected === question.answer) {

    box.innerHTML = `
      <strong>✅ सही उत्तर!</strong>
      <br>
      ${escapeHTML(question.explanation)}
    `;

  } else {

    box.innerHTML = `
      <strong>❌ गलत उत्तर</strong>
      <br>
      सही उत्तर:
      ${escapeHTML(
        question.options[question.answer]
      )}
      <br><br>
      ${escapeHTML(question.explanation)}
    `;

  }

  box.style.display = "block";
}

/* =========================
   NEET TEST
========================= */

let testQuestions = [];
let currentTestQuestion = 0;
let testAnswers = [];
let testTimer = null;
let testSeconds = 10800;

/*
   NEET structure:
   Physics 45
   Chemistry 45
   Biology 90
*/

function createSubjectQuestions(
  subject,
  count
) {

  const source =
    questionBank.filter(
      q => q.subject === subject
    );

  const result = [];

  for (let i = 0; i < count; i++) {

    const base =
      source[i % source.length];

    result.push({
      ...base,
      number: i + 1,
      subject
    });

  }

  return result;
}

function createNEETQuestions() {

  return [
    ...createSubjectQuestions("Physics", 45),
    ...createSubjectQuestions("Chemistry", 45),
    ...createSubjectQuestions("Biology", 90)
  ];
}

function startNEETTest() {

  showSection("tests");

  testQuestions =
    createNEETQuestions();

  currentTestQuestion = 0;

  testAnswers =
    new Array(testQuestions.length)
      .fill(null);

  testSeconds = 10800;

  renderTestQuestion();

  startTestTimer();

}

function renderTestQuestion() {

  const area =
    document.getElementById("testArea");

  if (!area) return;

  const q =
    testQuestions[currentTestQuestion];

  if (!q) return;

  area.innerHTML = `

    <div class="test-panel">

      <div class="test-top">

        <strong>
          Question ${currentTestQuestion + 1}
          / ${testQuestions.length}
        </strong>

        <span id="testTimer">
          03:00:00
        </span>

      </div>

      <span class="badge">
        ${escapeHTML(q.subject)}
      </span>

      <h2>
        ${escapeHTML(q.question)}
      </h2>

      <div class="test-options">

        ${q.options.map((option, i) => `

          <button
            class="option-btn ${
              testAnswers[currentTestQuestion] === i
                ? "selected"
                : ""
            }"
            onclick="selectTestAnswer(${i})"
          >
            ${String.fromCharCode(65 + i)}.
            ${escapeHTML(option)}
          </button>

        `).join("")}

      </div>

      <div class="test-navigation">

        <button
          class="btn secondary"
          onclick="previousTestQuestion()"
          ${
            currentTestQuestion === 0
              ? "disabled"
              : ""
          }
        >
          ← Previous
        </button>

        ${
          currentTestQuestion ===
          testQuestions.length - 1

            ? `
              <button
                class="btn"
                onclick="finishTest()"
              >
                Submit Test
              </button>
            `

            : `
              <button
                class="btn"
                onclick="nextTestQuestion()"
              >
                Next →
              </button>
            `
        }

      </div>

    </div>
  `;

  updateTimerDisplay();

}

function selectTestAnswer(index) {

  testAnswers[currentTestQuestion] =
    index;

  renderTestQuestion();

}

function nextTestQuestion() {

  if (
    currentTestQuestion <
    testQuestions.length - 1
  ) {

    currentTestQuestion++;

    renderTestQuestion();

  }

}

function previousTestQuestion() {

  if (currentTestQuestion > 0) {

    currentTestQuestion--;

    renderTestQuestion();

  }

}

function startTestTimer() {

  clearInterval(testTimer);

  testTimer =
    setInterval(() => {

      testSeconds--;

      updateTimerDisplay();

      if (testSeconds <= 0) {

        clearInterval(testTimer);

        finishTest();

      }

    }, 1000);

}

function updateTimerDisplay() {

  const timer =
    document.getElementById("testTimer");

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

function finishTest() {

  clearInterval(testTimer);

  let correct = 0;

  testQuestions.forEach((q, i) => {

    if (
      testAnswers[i] === q.answer
    ) {
      correct++;
    }

  });

  const wrong =
    testAnswers.filter(
      (answer, i) =>
        answer !== null &&
        answer !== testQuestions[i].answer
    ).length;

  const unanswered =
    testQuestions.length -
    correct -
    wrong;

  const area =
    document.getElementById("testArea");

  if (!area) return;

  area.innerHTML = `

    <div class="result-card">

      <h2>🎉 Test Complete</h2>

      <div class="result-grid">

        <div>
          <strong>${correct}</strong>
          <span>Correct</span>
        </div>

        <div>
          <strong>${wrong}</strong>
          <span>Wrong</span>
        </div>

        <div>
          <strong>${unanswered}</strong>
          <span>Unanswered</span>
        </div>

        <div>
          <strong>
            ${Math.round(
              (correct /
                testQuestions.length) *
                100
            )}%
          </strong>
          <span>Accuracy</span>
        </div>

      </div>

      <button
        class="btn"
        onclick="startNEETTest()"
      >
        🔄 Restart Test
      </button>

    </div>

  `;

}

/* =========================
   DPP
========================= */

let dppQuestions = [];

function createDPPQuestions() {

  return [
    ...createSubjectQuestions("Physics", 30),
    ...createSubjectQuestions("Chemistry", 30),
    ...createSubjectQuestions("Biology", 30)
  ];
}

function startDPP() {

  showSection("dpp");

  dppQuestions =
    createDPPQuestions();

  const area =
    document.getElementById("dppArea");

  if (!area) return;

  area.innerHTML = `

    <div class="test-panel">

      <h2>📋 Today's DPP</h2>

      <p>
        Physics: 30 Questions
        <br>
        Chemistry: 30 Questions
        <br>
        Biology: 30 Questions
      </p>

      <p>
        Total: <strong>90 Questions</strong>
      </p>

      <button
        class="btn"
        onclick="startDPPQuiz()"
      >
        🚀 Start DPP
      </button>

    </div>
  `;

}

function startDPPQuiz() {

  const area =
    document.getElementById("dppArea");

  if (!area) return;

  let html = `
    <div class="question-list">
  `;

  dppQuestions.forEach((q, index) => {

    html += `

      <div class="question-card">

        <span class="badge">
          ${escapeHTML(q.subject)}
        </span>

        <h3>
          Q${index + 1}.
          ${escapeHTML(q.question)}
        </h3>

        <div class="options">

          ${q.options.map((option, i) => `

            <button
              class="option-btn"
              onclick="checkDPPAnswer(
                ${index},
                ${i}
              )"
            >
              ${String.fromCharCode(65 + i)}.
              ${escapeHTML(option)}
            </button>

          `).join("")}

        </div>

        <div
          id="dpp-answer-${index}"
          class="explanation"
        ></div>

      </div>
    `;

  });

  html += "</div>";

  area.innerHTML = html;

}

function checkDPPAnswer(
  questionIndex,
  selected
) {

  const q =
    dppQuestions[questionIndex];

  const box =
    document.getElementById(
      `dpp-answer-${questionIndex}`
    );

  if (!box) return;

  if (selected === q.answer) {

    box.innerHTML =
      "✅ सही उत्तर! " +
      escapeHTML(q.explanation);

  } else {

    box.innerHTML =
      "❌ गलत। सही उत्तर: " +
      escapeHTML(q.options[q.answer]);

  }

  box.style.display = "block";
}

/* =========================
   PROFILE
========================= */

function saveProfile() {

  const nameInput =
    document.getElementById("profileName");

  if (!nameInput) return;

  const name =
    nameInput.value.trim();

  localStorage.setItem(
    STORAGE.profile,
    JSON.stringify({
      name
    })
  );

  updateProfileUI();

  alert("Profile saved! ✅");
}

function updateProfileUI() {

  const saved =
    localStorage.getItem(
      STORAGE.profile
    );

  if (!saved) return;

  try {

    const profile =
      JSON.parse(saved);

    const name =
      profile.name || "Student";

    document
      .querySelectorAll(
        "[data-profile-name]"
      )
      .forEach(element => {
        element.textContent = name;
      });

    const input =
      document.getElementById("profileName");

    if (input) {
      input.value = name;
    }

  } catch (error) {
    console.error(error);
  }

}

/* =========================
   LANGUAGE
========================= */

function setLanguage(language) {

  localStorage.setItem(
    STORAGE.language,
    language
  );

  document.documentElement.lang =
    language === "hi"
      ? "hi"
      : "en";

}

/* =========================
   MUSIC
========================= */

let audioContext = null;
let musicOscillator = null;

function toggleMusic() {

  const status =
    document.getElementById("musicStatus");

  const button =
    document.getElementById("musicButton");

  if (musicOscillator) {

    musicOscillator.stop();

    musicOscillator.disconnect();

    musicOscillator = null;

    if (status) {
      status.textContent =
        "Music OFF";
    }

    if (button) {
      button.textContent =
        "🎵 Music";
    }

    return;
  }

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

    musicOscillator.frequency.value =
      220;

    gain.gain.value =
      0.025;

    musicOscillator.connect(gain);

    gain.connect(
      audioContext.destination
    );

    musicOscillator.start();

    if (status) {
      status.textContent =
        "Music ON 🎵";
    }

    if (button) {
      button.textContent =
        "🔇 Stop";
    }

  } catch (error) {

    console.error(error);

    alert(
      "Music browser में available नहीं है।"
    );

  }

}

/* =========================
   PROGRESS
========================= */

function updateProgress() {

  const progress =
    Number(
      localStorage.getItem(
        "ml_progress"
      ) || 0
    );

  document
    .querySelectorAll(
      "[data-progress]"
    )
    .forEach(element => {

      element.textContent =
        progress + "%";

    });

}

/* =========================
   ESCAPE HELPERS
========================= */

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
   GLOBAL BUTTONS
========================= */

function setupButtons() {

  const menuButton =
    document.getElementById("menuButton");

  if (menuButton) {

    menuButton.addEventListener(
      "click",
      toggleSidebar
    );

  }

  const musicButton =
    document.getElementById("musicButton");

  if (musicButton) {

    musicButton.addEventListener(
      "click",
      toggleMusic
    );

  }

}

/* =========================
   INIT
========================= */

function initializeApp() {

  /*
    IMPORTANT:
    सभी sections को पहले hide करना।
    केवल Home active रहेगा।
  */

  document
    .querySelectorAll(".page-section")
    .forEach(section => {

      section.classList.remove("active");

      section.style.display = "none";

    });

  const home =
    document.getElementById("home");

  if (home) {

    home.classList.add("active");

    home.style.display = "block";

  }

  setupNavigation();

  setupSearch();

  setupButtons();

  renderThemes();

  renderModes();

  renderBooks();

  renderVideos();

  renderQuestionBank();

  renderWebsites();

  updateProfileUI();

  updateProgress();

  loadYouTubeLive();

}

/* =========================
   START
========================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeApp
);

/* =========================
   GLOBAL EXPORTS
========================= */

window.showSection =
  showSection;

window.toggleSidebar =
  toggleSidebar;

window.openSidebar =
  openSidebar;

window.closeSidebar =
  closeSidebar;

window.setTheme =
  setTheme;

window.setMode =
  setMode;

window.setLanguage =
  setLanguage;

window.searchYouTube =
  searchYouTube;

window.playYouTube =
  playYouTube;

window.loadYouTubeLive =
  loadYouTubeLive;

window.openWebsite =
  openWebsite;

window.openWebsiteNewTab =
  openWebsiteNewTab;

window.askAI =
  askAI;

window.checkQuestion =
  checkQuestion;

window.startNEETTest =
  startNEETTest;

window.nextTestQuestion =
  nextTestQuestion;

window.previousTestQuestion =
  previousTestQuestion;

window.selectTestAnswer =
  selectTestAnswer;

window.finishTest =
  finishTest;

window.startDPP =
  startDPP;

window.startDPPQuiz =
  startDPPQuiz;

window.checkDPPAnswer =
  checkDPPAnswer;

window.saveProfile =
  saveProfile;

window.toggleMusic =
  toggleMusic;
