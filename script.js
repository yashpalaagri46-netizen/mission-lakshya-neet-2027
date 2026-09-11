/* =========================================================
   MISSION LAKSHYA – NEET & JEE
   COMPLETE FRONTEND SCRIPT
   Created by Yashpal Aagri
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL STATE
   ========================================================= */

const state = {
  currentPage: "home",
  language: localStorage.getItem("ml_language") || "HI",
  theme: localStorage.getItem("ml_theme") || "dark",
  search: "",
  timerSeconds: Number(localStorage.getItem("ml_timer_seconds") || 0),
  timerRunning: false,
  timerInterval: null,
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  mockIndex: 0,
  mockScore: 0,
  mockAnswered: false,
  calculatorExpression: "",
  calculatorHistory:
    JSON.parse(localStorage.getItem("ml_calc_history") || "[]"),
  bookmarks:
    JSON.parse(localStorage.getItem("ml_bookmarks") || "[]"),
  activities:
    JSON.parse(localStorage.getItem("ml_activities") || "[]")
};

/* =========================================================
   DOM HELPERS
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeText(value) {
  return escapeHTML(value);
}

/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;

function showToast(message) {
  let toast = $("#toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function getPageIdFromElement(element) {
  return (
    element.dataset.page ||
    element.dataset.target ||
    element.getAttribute("data-page") ||
    ""
  );
}

function navigateTo(pageId) {
  if (!pageId) return;

  const pages = $all(".page");

  if (!pages.length) return;

  let target = document.getElementById(pageId);

  if (!target) {
    target =
      document.getElementById(`${pageId}-page`) ||
      document.querySelector(`[data-page-id="${pageId}"]`);
  }

  if (!target) {
    showToast("यह section अभी उपलब्ध नहीं है।");
    return;
  }

  pages.forEach(page => page.classList.remove("active"));
  target.classList.add("active");

  state.currentPage = pageId;

  $all(
    ".sidebar-nav button, .sidebar-nav a, .nav-item"
  ).forEach(item => {
    const itemPage = getPageIdFromElement(item);

    item.classList.toggle(
      "active",
      itemPage === pageId
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  closeMobileSidebar();

  addActivity(
    "📖",
    `Opened ${pageId.replace(/[-_]/g, " ")}`
  );
}

function setupNavigation() {
  $all(
    ".sidebar-nav button, .sidebar-nav a, .nav-item, [data-page]"
  ).forEach(element => {
    element.addEventListener("click", event => {
      const pageId = getPageIdFromElement(element);

      if (!pageId) return;

      if (
        element.tagName === "A" &&
        element.getAttribute("href") &&
        element.getAttribute("href").startsWith("#")
      ) {
        event.preventDefault();
      }

      navigateTo(pageId);
    });
  });

  $all(
    "[data-navigate], [data-target-page]"
  ).forEach(element => {
    element.addEventListener("click", () => {
      const pageId =
        element.dataset.navigate ||
        element.dataset.targetPage;

      navigateTo(pageId);
    });
  });
}

/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

function openMobileSidebar() {
  const sidebar = $("#sidebar");
  const overlay = $("#mobileOverlay");

  if (sidebar) {
    sidebar.classList.add("open");
    sidebar.classList.add("active");
  }

  if (overlay) {
    overlay.classList.add("active");
  }
}

function closeMobileSidebar() {
  const sidebar = $("#sidebar");
  const overlay = $("#mobileOverlay");

  if (sidebar) {
    sidebar.classList.remove("open");
    sidebar.classList.remove("active");
  }

  if (overlay) {
    overlay.classList.remove("active");
  }
}

function setupMobileMenu() {
  const menu = $("#menuButton");
  const close = $("#mobileClose");
  const overlay = $("#mobileOverlay");

  if (menu) {
    menu.addEventListener("click", openMobileSidebar);
  }

  if (close) {
    close.addEventListener("click", closeMobileSidebar);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMobileSidebar);
  }
}

/* =========================================================
   SEARCH
   ========================================================= */

const searchableItems = [
  {
    title: "Physics",
    description: "Physics chapters, formulas, numericals and lectures",
    page: "videos"
  },
  {
    title: "Chemistry",
    description: "Chemistry concepts, reactions and practice",
    page: "books"
  },
  {
    title: "Biology",
    description: "Biology NCERT, diagrams and questions",
    page: "library"
  },
  {
    title: "Maths for JEE",
    description: "JEE Mathematics concepts and practice",
    page: "question-bank"
  },
  {
    title: "DPP",
    description: "Daily Practice Problems",
    page: "dpp"
  },
  {
    title: "Quiz",
    description: "Daily subject quiz",
    page: "quiz"
  },
  {
    title: "Mock Test",
    description: "NEET and JEE mock tests",
    page: "mock"
  },
  {
    title: "Aria AI",
    description: "AI Doubt Solver for NEET and JEE",
    page: "ai"
  },
  {
    title: "Study Planner",
    description: "Plan your daily study schedule",
    page: "planner"
  },
  {
    title: "Analytics",
    description: "Study progress and performance",
    page: "analytics"
  },
  {
    title: "3D Learning Lab",
    description: "Interactive PCMB scientific models",
    page: "3d-lab"
  },
  {
    title: "Mathematical & Scientific Tools",
    description: "Scientific calculator and PCMB tools",
    page: "tools"
  },
  {
    title: "YouTube Live",
    description: "NEET and JEE live lectures",
    page: "youtube"
  },
  {
    title: "Study Websites",
    description: "Educational websites collection",
    page: "websites"
  }
];

function performSearch(query) {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    return [];
  }

  return searchableItems.filter(item => {
    return (
      item.title.toLowerCase().includes(cleanQuery) ||
      item.description.toLowerCase().includes(cleanQuery)
    );
  });
}

function showSearchResults(query) {
  const modal = $("#searchModal");
  const container =
    $("#searchResults") ||
    document.querySelector(".search-results");

  const results = performSearch(query);

  if (container) {
    if (!results.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔎</div>
          <h3>No results found</h3>
          <p>Try another keyword.</p>
        </div>
      `;
    } else {
      container.innerHTML = results
        .map(
          item => `
          <button
            class="search-result"
            data-search-page="${safeText(item.page)}"
            style="width:100%;text-align:left;color:inherit;"
          >
            <h4>${safeText(item.title)}</h4>
            <p>${safeText(item.description)}</p>
          </button>
        `
        )
        .join("");

      $all("[data-search-page]").forEach(button => {
        button.addEventListener("click", () => {
          navigateTo(button.dataset.searchPage);
          closeModal("searchModal");
        });
      });
    }
  }

  if (modal) {
    openModal("searchModal");
  }
}

function setupSearch() {
  const searchInputs = [
    $("#globalSearch"),
    document.querySelector(".search-box input"),
    document.querySelector(".search-container input")
  ].filter(Boolean);

  searchInputs.forEach(input => {
    input.addEventListener("input", event => {
      state.search = event.target.value;
    });

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        showSearchResults(input.value);
      }
    });
  });
}

/* =========================================================
   MODALS
   ========================================================= */

function openModal(id) {
  const modal = document.getElementById(id);

  if (!modal) return;

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const modal = document.getElementById(id);

  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function setupModals() {
  $all("[data-close-modal]").forEach(button => {
    button.addEventListener("click", () => {
      closeModal(button.dataset.closeModal);
    });
  });

  $all(".modal, #notificationModal, #profileModal, #searchModal, #websiteModal, #modelModal")
    .forEach(modal => {
      modal.addEventListener("click", event => {
        if (event.target === modal) {
          modal.classList.remove("active");
        }
      });
    });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;

    $all(
      ".modal.active, #notificationModal.active, #profileModal.active, #searchModal.active, #websiteModal.active, #modelModal.active"
    ).forEach(modal => {
      modal.classList.remove("active");
    });
  });
}

/* =========================================================
   TOPBAR BUTTONS
   ========================================================= */

function setupTopbar() {
  const languageButton = $("#languageButton");
  const themeButton = $("#themeButton");
  const notificationButton = $("#notificationButton");
  const profileButton = $("#profileButton");

  if (languageButton) {
    languageButton.addEventListener("click", toggleLanguage);
  }

  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }

  if (notificationButton) {
    notificationButton.addEventListener("click", () => {
      openModal("notificationModal");
    });
  }

  if (profileButton) {
    profileButton.addEventListener("click", () => {
      openModal("profileModal");
    });
  }
}

/* =========================================================
   LANGUAGE
   ========================================================= */

function toggleLanguage() {
  state.language =
    state.language === "HI" ? "EN" : "HI";

  localStorage.setItem(
    "ml_language",
    state.language
  );

  updateLanguageButton();

  showToast(
    state.language === "HI"
      ? "भाषा Hindi में बदल दी गई।"
      : "Language changed to English."
  );
}

function updateLanguageButton() {
  const button = $("#languageButton");

  if (!button) return;

  button.textContent =
    state.language === "HI" ? "HI | EN" : "EN | HI";
}

/* =========================================================
   THEMES
   ========================================================= */

const themePresets = {
  dark: {
    primary: "#7c3aed",
    secondary: "#2563eb",
    bg: "#070914"
  },

  purple: {
    primary: "#a855f7",
    secondary: "#7c3aed",
    bg: "#0c0714"
  },

  blue: {
    primary: "#2563eb",
    secondary: "#06b6d4",
    bg: "#06101a"
  },

  green: {
    primary: "#16a34a",
    secondary: "#0d9488",
    bg: "#06120d"
  },

  orange: {
    primary: "#f97316",
    secondary: "#ef4444",
    bg: "#160b06"
  },

  rose: {
    primary: "#ec4899",
    secondary: "#8b5cf6",
    bg: "#160712"
  },

  cyan: {
    primary: "#06b6d4",
    secondary: "#2563eb",
    bg: "#041217"
  },

  gold: {
    primary: "#eab308",
    secondary: "#f97316",
    bg: "#131006"
  }
};

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem("ml_theme", theme);

  document.body.classList.remove(
    "light-theme"
  );

  const preset =
    themePresets[theme] ||
    themePresets.dark;

  document.documentElement.style.setProperty(
    "--primary",
    preset.primary
  );

  document.documentElement.style.setProperty(
    "--primary-2",
    preset.primary
  );

  document.documentElement.style.setProperty(
    "--secondary",
    preset.secondary
  );

  document.documentElement.style.setProperty(
    "--bg",
    preset.bg
  );

  if (theme === "light") {
    document.body.classList.add("light-theme");
  }

  $all("[data-theme]").forEach(card => {
    card.classList.toggle(
      "active",
      card.dataset.theme === theme
    );
  });
}

function toggleTheme() {
  const next =
    state.theme === "dark"
      ? "light"
      : "dark";

  applyTheme(next);

  showToast(
    next === "light"
      ? "Light theme enabled."
      : "Dark theme enabled."
  );
}

function setupThemes() {
  applyTheme(state.theme);

  $all("[data-theme]").forEach(button => {
    button.addEventListener("click", () => {
      applyTheme(button.dataset.theme);
      showToast(
        `${button.dataset.theme} theme applied.`
      );
    });
  });
}

/* =========================================================
   ACTIVITIES
   ========================================================= */

function addActivity(icon, text) {
  const item = {
    icon,
    text,
    time: new Date().toISOString()
  };

  state.activities.unshift(item);
  state.activities =
    state.activities.slice(0, 15);

  localStorage.setItem(
    "ml_activities",
    JSON.stringify(state.activities)
  );
}

function renderActivities() {
  const containers = [
    $("#recentActivity"),
    document.querySelector(".activity-list")
  ].filter(Boolean);

  if (!containers.length) return;

  const list =
    state.activities.length
      ? state.activities
      : [
          {
            icon: "🚀",
            text: "Mission Lakshya शुरू किया",
            time: new Date().toISOString()
          }
        ];

  const html = list
    .slice(0, 8)
    .map(item => {
      const time = new Date(item.time);

      return `
        <div class="activity-item">
          <div class="activity-icon">${safeText(item.icon)}</div>
          <div>
            <strong>${safeText(item.text)}</strong>
            <span>${time.toLocaleString()}</span>
          </div>
        </div>
      `;
    })
    .join("");

  containers.forEach(container => {
    container.innerHTML = html;
  });
}

/* =========================================================
   BOOKMARKS
   ========================================================= */

function isBookmarked(id) {
  return state.bookmarks.includes(id);
}

function toggleBookmark(id, title = id) {
  if (!id) return;

  if (isBookmarked(id)) {
    state.bookmarks =
      state.bookmarks.filter(item => item !== id);

    showToast("Bookmark removed.");
  } else {
    state.bookmarks.push(id);
    showToast("Bookmark saved ⭐");
    addActivity("⭐", `Bookmarked: ${title}`);
  }

  localStorage.setItem(
    "ml_bookmarks",
    JSON.stringify(state.bookmarks)
  );

  renderBookmarks();
}

function renderBookmarks() {
  const container =
    $("#bookmarkList") ||
    document.querySelector(".bookmark-list");

  if (!container) return;

  if (!state.bookmarks.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⭐</div>
        <h3>No bookmarks yet</h3>
        <p>Save important study content here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.bookmarks
    .map(
      item => `
        <div class="bookmark-item">
          <div class="bookmark-icon">⭐</div>
          <div class="bookmark-info">
            <strong>${safeText(item)}</strong>
            <span>Saved study item</span>
          </div>
          <button
            class="secondary-btn"
            data-remove-bookmark="${safeText(item)}"
          >
            Remove
          </button>
        </div>
      `
    )
    .join("");

  $all("[data-remove-bookmark]").forEach(button => {
    button.addEventListener("click", () => {
      toggleBookmark(
        button.dataset.removeBookmark,
        button.dataset.removeBookmark
      );
    });
  });
}

function setupBookmarks() {
  $all("[data-bookmark]").forEach(button => {
    button.addEventListener("click", () => {
      const id =
        button.dataset.bookmark;

      const title =
        button.dataset.bookmarkTitle ||
        id;

      toggleBookmark(id, title);
    });
  });

  renderBookmarks();
}

/* =========================================================
   STUDY TIMER
   ========================================================= */

function formatTime(seconds) {
  const hours =
    Math.floor(seconds / 3600);

  const minutes =
    Math.floor((seconds % 3600) / 60);

  const secs =
    seconds % 60;

  return [
    hours,
    minutes,
    secs
  ]
    .map(value =>
      String(value).padStart(2, "0")
    )
    .join(":");
}

function updateTimerUI() {
  const display =
    $("#timerDisplay") ||
    document.querySelector(".timer-display");

  if (display) {
    display.textContent =
      formatTime(state.timerSeconds);
  }
}

function startTimer() {
  if (state.timerRunning) return;

  state.timerRunning = true;

  state.timerInterval =
    setInterval(() => {
      state.timerSeconds++;

      localStorage.setItem(
        "ml_timer_seconds",
        state.timerSeconds
      );

      updateTimerUI();
    }, 1000);

  showToast("Study timer started ⏱️");
}

function pauseTimer() {
  state.timerRunning = false;

  clearInterval(state.timerInterval);

  state.timerInterval = null;

  showToast("Study timer paused.");
}

function resetTimer() {
  pauseTimer();

  state.timerSeconds = 0;

  localStorage.setItem(
    "ml_timer_seconds",
    "0"
  );

  updateTimerUI();

  showToast("Timer reset.");
}

function setupTimer() {
  const start =
    $("#timerStart") ||
    document.querySelector("[data-timer-start]");

  const reset =
    $("#timerReset") ||
    document.querySelector("[data-timer-reset]");

  if (start) {
    start.addEventListener("click", () => {
      if (state.timerRunning) {
        pauseTimer();
        start.textContent = "Start";
      } else {
        startTimer();
        start.textContent = "Pause";
      }
    });
  }

  if (reset) {
    reset.addEventListener("click", resetTimer);
  }

  updateTimerUI();
}

/* =========================================================
   AI ARIA – FRONTEND CHAT
   ========================================================= */

function appendChatMessage(role, text) {
  const container =
    $("#chatMessages") ||
    document.querySelector(".chatMessages");

  if (!container) return;

  const message =
    document.createElement("div");

  message.className =
    `chat-message ${role}`;

  message.textContent = text;

  container.appendChild(message);

  container.scrollTop =
    container.scrollHeight;
}

function addTypingMessage() {
  const container =
    $("#chatMessages") ||
    document.querySelector(".chatMessages");

  if (!container) return null;

  const message =
    document.createElement("div");

  message.className =
    "chat-message ai";

  message.dataset.typing = "true";
  message.textContent = "Aria सोच रही है…";

  container.appendChild(message);

  container.scrollTop =
    container.scrollHeight;

  return message;
}

async function askAria(question) {
  const cleanQuestion =
    question.trim();

  if (!cleanQuestion) return;

  appendChatMessage(
    "user",
    cleanQuestion
  );

  addActivity(
    "🤖",
    `Asked Aria: ${cleanQuestion.slice(0, 50)}`
  );

  const typing =
    addTypingMessage();

  try {
    const response =
      await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: cleanQuestion,
          language: state.language,
          subject: "PCMB",
          exam: "NEET + JEE"
        })
      });

    if (!response.ok) {
      throw new Error(
        `AI request failed: ${response.status}`
      );
    }

    const data =
      await response.json();

    if (typing) {
      typing.remove();
    }

    const answer =
      data.answer ||
      data.message ||
      "Aria अभी जवाब नहीं दे पाई।";

    appendChatMessage(
      "ai",
      answer
    );

    speakText(answer);
  } catch (error) {
    console.error(error);

    if (typing) {
      typing.remove();
    }

    appendChatMessage(
      "ai",
      "Aria अभी connect नहीं हो पा रही है। कृपया बाद में फिर try करें।"
    );
  }
}

function setupAIChat() {
  const form =
    $("#aiChatForm") ||
    document.querySelector(".aiChatForm");

  const input =
    $("#aiInput") ||
    document.querySelector('input[name="aiInput"]');

  if (!form || !input) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const question =
      input.value.trim();

    if (!question) return;

    input.value = "";

    askAria(question);
  });
}

/* =========================================================
   VOICE INPUT
   ========================================================= */

function setupVoiceInput() {
  const button =
    $("#voiceButton") ||
    document.querySelector("[data-voice]");

  const input =
    $("#aiInput") ||
    document.querySelector('input[name="aiInput"]');

  if (!button || !input) return;

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    button.addEventListener("click", () => {
      showToast(
        "इस browser में voice input available नहीं है।"
      );
    });

    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang =
    state.language === "HI"
      ? "hi-IN"
      : "en-IN";

  button.addEventListener("click", () => {
    recognition.lang =
      state.language === "HI"
        ? "hi-IN"
        : "en-IN";

    recognition.start();

    showToast("🎙️ बोलिए…");
  });

  recognition.onresult = event => {
    const transcript =
      event.results[0][0].transcript;

    input.value = transcript;
  };

  recognition.onerror = () => {
    showToast("Voice input में problem हुई।");
  };
}

/* =========================================================
   VOICE OUTPUT
   ========================================================= */

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  const clean =
    String(text)
      .replace(/[#*_`]/g, "")
      .slice(0, 1000);

  const utterance =
    new SpeechSynthesisUtterance(clean);

  utterance.lang =
    /[\u0900-\u097F]/.test(clean)
      ? "hi-IN"
      : "en-IN";

  utterance.rate = 0.95;

  window.speechSynthesis.cancel();

  window.speechSynthesis.speak(
    utterance
  );
}

/* =========================================================
   QUESTION IMAGE PREVIEW
   ========================================================= */

function setupQuestionImage() {
  const input =
    $("#questionImage");

  if (!input) return;

  input.addEventListener("change", () => {
    const file =
      input.files && input.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image.");
      return;
    }

    const reader =
      new FileReader();

    reader.onload = event => {
      let preview =
        $("#questionImagePreview");

      if (!preview) {
        preview =
          document.createElement("img");

        preview.id =
          "questionImagePreview";

        preview.style.maxWidth =
          "100%";

        preview.style.maxHeight =
          "250px";

        preview.style.marginTop =
          "12px";

        input.parentElement.appendChild(
          preview
        );
      }

      preview.src =
        event.target.result;
    };

    reader.readAsDataURL(file);

    showToast(
      "Question image selected. Aria can process it when the AI backend supports image input."
    );
  });
}

/* =========================================================
   QUIZ ENGINE
   ========================================================= */

const quizQuestions = [
  {
    subject: "Biology",
    question:
      "The basic structural and functional unit of life is:",
    options: [
      "Tissue",
      "Cell",
      "Organ",
      "Organ system"
    ],
    answer: 1
  },
  {
    subject: "Physics",
    question:
      "SI unit of force is:",
    options: [
      "Joule",
      "Watt",
      "Newton",
      "Pascal"
    ],
    answer: 2
  },
  {
    subject: "Chemistry",
    question:
      "The atomic number represents the number of:",
    options: [
      "Neutrons",
      "Protons",
      "Nucleons",
      "Isotopes"
    ],
    answer: 1
  },
  {
    subject: "Mathematics",
    question:
      "Derivative of x² is:",
    options: [
      "x",
      "2x",
      "x²",
      "2"
    ],
    answer: 1
  },
  {
    subject: "Biology",
    question:
      "DNA stands for:",
    options: [
      "Deoxyribonucleic Acid",
      "Dinucleic Acid",
      "Deoxyribose Nitrogen Acid",
      "None"
    ],
    answer: 0
  }
];

function renderQuiz() {
  const container =
    $("#quizContainer") ||
    document.querySelector(".quiz-container");

  if (!container) return;

  const question =
    quizQuestions[state.quizIndex];

  if (!question) {
    renderQuizResult();
    return;
  }

  container.innerHTML = `
    <div class="card">
      <div class="question-number">
        Question ${state.quizIndex + 1}
        / ${quizQuestions.length}
      </div>

      <div class="question-text">
        ${safeText(question.question)}
      </div>

      <div class="options">
        ${question.options
          .map(
            (option, index) => `
            <button
              class="option"
              data-quiz-option="${index}"
            >
              ${String.fromCharCode(65 + index)}.
              ${safeText(option)}
            </button>
          `
          )
          .join("")}
      </div>

      <div style="margin-top:18px;">
        <button
          class="primary-btn"
          id="nextQuiz"
          disabled
        >
          Next Question →
        </button>
      </div>
    </div>
  `;

  $all("[data-quiz-option]").forEach(button => {
    button.addEventListener("click", () => {
      answerQuiz(
        Number(button.dataset.quizOption)
      );
    });
  });

  const next =
    $("#nextQuiz");

  if (next) {
    next.addEventListener("click", nextQuiz);
  }
}

function answerQuiz(index) {
  if (state.quizAnswered) return;

  state.quizAnswered = true;

  const question =
    quizQuestions[state.quizIndex];

  const buttons =
    $all("[data-quiz-option]");

  buttons.forEach(button => {
    button.disabled = true;

    const value =
      Number(button.dataset.quizOption);

    if (value === question.answer) {
      button.classList.add("correct");
    }

    if (
      value === index &&
      value !== question.answer
    ) {
      button.classList.add("wrong");
    }
  });

  if (index === question.answer) {
    state.quizScore++;
    showToast("सही जवाब! 🎉");
  } else {
    showToast("गलत जवाब। सही option देखो।");
  }

  const next =
    $("#nextQuiz");

  if (next) {
    next.disabled = false;
  }
}

function nextQuiz() {
  state.quizIndex++;
  state.quizAnswered = false;

  renderQuiz();
}

function renderQuizResult() {
  const container =
    $("#quizContainer") ||
    document.querySelector(".quiz-container");

  if (!container) return;

  const percentage =
    Math.round(
      (state.quizScore /
        quizQuestions.length) *
        100
    );

  container.innerHTML = `
    <div class="card" style="text-align:center;">
      <div style="font-size:55px;">🏆</div>
      <h2>Quiz Complete!</h2>

      <p style="margin-top:10px;color:var(--text-muted);">
        Score: ${state.quizScore}
        / ${quizQuestions.length}
      </p>

      <div style="font-size:35px;font-weight:900;margin-top:12px;">
        ${percentage}%
      </div>

      <button
        class="primary-btn"
        id="restartQuiz"
        style="margin-top:20px;"
      >
        Try Again
      </button>
    </div>
  `;

  const restart =
    $("#restartQuiz");

  if (restart) {
    restart.addEventListener("click", () => {
      state.quizIndex = 0;
      state.quizScore = 0;
      state.quizAnswered = false;
      renderQuiz();
    });
  }
}

function setupQuiz() {
  if (
    $("#quizContainer") ||
    document.querySelector(".quiz-container")
  ) {
    renderQuiz();
  }
}

/* =========================================================
   SCIENTIFIC CALCULATOR
   ========================================================= */

function sanitizeCalculatorExpression(expression) {
  return expression
    .replace(/π/g, "Math.PI")
    .replace(/√/g, "Math.sqrt")
    .replace(/\^/g, "**")
    .replace(/\bsin\(/gi, "Math.sin(")
    .replace(/\bcos\(/gi, "Math.cos(")
    .replace(/\btan\(/gi, "Math.tan(")
    .replace(/\blog\(/gi, "Math.log10(")
    .replace(/\bln\(/gi, "Math.log(");
}

function updateCalculatorDisplay() {
  const display =
    $("#calculatorDisplay") ||
    document.querySelector(".calculator-display");

  if (display) {
    display.textContent =
      state.calculatorExpression || "0";
  }
}

function calculatorInput(value) {
  state.calculatorExpression += value;
  updateCalculatorDisplay();
}

function calculatorClear() {
  state.calculatorExpression = "";
  updateCalculatorDisplay();
}

function calculatorDelete() {
  state.calculatorExpression =
    state.calculatorExpression.slice(0, -1);

  updateCalculatorDisplay();
}

function calculatorCalculate() {
  if (!state.calculatorExpression) return;

  try {
    const expression =
      sanitizeCalculatorExpression(
        state.calculatorExpression
      );

    if (
      !/^[0-9+\-*/().%\sA-Za-z_]+$/.test(
        expression
      )
    ) {
      throw new Error("Invalid expression");
    }

    const result =
      Function(
        `"use strict"; return (${expression})`
      )();

    if (
      typeof result !== "number" ||
      !Number.isFinite(result)
    ) {
      throw new Error("Invalid result");
    }

    state.calculatorHistory.unshift({
      expression:
        state.calculatorExpression,
      result
    });

    state.calculatorHistory =
      state.calculatorHistory.slice(0, 30);

    localStorage.setItem(
      "ml_calc_history",
      JSON.stringify(
        state.calculatorHistory
      )
    );

    state.calculatorExpression =
      String(result);

    updateCalculatorDisplay();
  } catch (error) {
    showToast("Calculation invalid है।");
  }
}

function setupCalculator() {
  const buttons =
    $all(
      "[data-calc], .calculator-grid button"
    );

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value =
        button.dataset.calc ||
        button.textContent.trim();

      if (
        value === "C" ||
        value === "AC"
      ) {
        calculatorClear();
        return;
      }

      if (
        value === "DEL" ||
        value === "⌫"
      ) {
        calculatorDelete();
        return;
      }

      if (
        value === "="
      ) {
        calculatorCalculate();
        return;
      }

      calculatorInput(value);
    });
  });

  updateCalculatorDisplay();
}

/* =========================================================
   3D LEARNING LAB
   ========================================================= */

const modelData = {
  cell: {
    title: "3D Cell",
    icon: "🧫",
    description:
      "Explore cell structure and organelles."
  },

  dna: {
    title: "DNA",
    icon: "🧬",
    description:
      "Explore the DNA double helix."
  },

  heart: {
    title: "Human Heart",
    icon: "❤️",
    description:
      "Explore chambers and blood flow."
  },

  brain: {
    title: "Brain",
    icon: "🧠",
    description:
      "Explore major regions of the brain."
  },

  atom: {
    title: "Atom",
    icon: "⚛️",
    description:
      "Explore protons, neutrons and electrons."
  },

  molecule: {
    title: "Molecule",
    icon: "🔬",
    description:
      "Explore molecular structures."
  },

  vector: {
    title: "Vector",
    icon: "➡️",
    description:
      "Visualize direction and magnitude."
  },

  circuit: {
    title: "Electric Circuit",
    icon: "⚡",
    description:
      "Explore basic circuit components."
  },

  geometry: {
    title: "3D Geometry",
    icon: "📐",
    description:
      "Explore coordinate geometry in 3D."
  }
};

function open3DModel(modelName) {
  const model =
    modelData[modelName] ||
    modelData.cell;

  const modal =
    $("#modelModal");

  if (!modal) {
    showToast(
      `${model.title} selected.`
    );
    return;
  }

  const object =
    $("#modelObject");

  if (object) {
    object.innerHTML = `
      <div class="model-preview" style="height:330px;">
        <div class="cube" style="transform:rotateX(-20deg) rotateY(35deg);">
          <div class="cube-face cube-front">${model.icon}</div>
          <div class="cube-face cube-back"></div>
          <div class="cube-face cube-right"></div>
          <div class="cube-face cube-left"></div>
          <div class="cube-face cube-top"></div>
          <div class="cube-face cube-bottom"></div>
        </div>
      </div>
      <h3 style="margin-top:15px;">
        ${safeText(model.title)}
      </h3>
      <p style="margin-top:7px;color:var(--text-muted);">
        ${safeText(model.description)}
      </p>
    `;
  }

  openModal("modelModal");
}

function setup3DLab() {
  $all("[data-model]").forEach(button => {
    button.addEventListener("click", () => {
      open3DModel(button.dataset.model);
    });
  });
}

/* =========================================================
   YOUTUBE LIVE
   ========================================================= */

async function loadYouTubeLive() {
  const container =
    $("#youtubeLiveList") ||
    document.querySelector(".youtube-list");

  if (!container) return;

  container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
    </div>
  `;

  try {
    const response =
      await fetch("/api/youtube-live");

    if (!response.ok) {
      throw new Error("YouTube API error");
    }

    const data =
      await response.json();

    const videos =
      data.liveClasses ||
      data.items ||
      [];

    if (!videos.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📺</div>
          <h3>No live classes found</h3>
          <p>Try refreshing later.</p>
        </div>
      `;
      return;
    }

    container.innerHTML =
      videos
        .map(video => {
          const videoId =
            video.videoId ||
            video.id;

          return `
            <div
              class="live-item"
              data-video-id="${safeText(videoId)}"
            >
              <div class="live-thumb">
                ${
                  video.thumbnail
                    ? `<img src="${safeText(video.thumbnail)}" alt="">`
                    : "▶️"
                }
              </div>

              <div class="live-info">
                <h4>
                  ${safeText(
                    video.title ||
                    "Live Class"
                  )}
                </h4>

                <span>
                  🔴 LIVE
                  ${
                    video.channel
                      ? " • " +
                        safeText(video.channel)
                      : ""
                  }
                </span>
              </div>
            </div>
          `;
        })
        .join("");

    $all("[data-video-id]").forEach(item => {
      item.addEventListener("click", () => {
        playYouTubeVideo(
          item.dataset.videoId
        );
      });
    });
  } catch (error) {
    console.error(error);

    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📡</div>
        <h3>YouTube Live unavailable</h3>
        <p>
          Backend/API configuration check करें।
        </p>
      </div>
    `;
  }
}

function playYouTubeVideo(videoId) {
  if (!videoId) return;

  const player =
    $("#youtubePlayer") ||
    document.querySelector(
      ".youtube-player"
    );

  if (!player) return;

  player.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1"
      title="YouTube Live"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `;

  showToast("Live class opened 📺");
}

function setupYouTube() {
  const refresh =
    $("#youtubeRefresh");

  if (refresh) {
    refresh.addEventListener(
      "click",
      loadYouTubeLive
    );
  }

  loadYouTubeLive();
}

/* =========================================================
   STUDY WEBSITE VIEWER
   ========================================================= */

const studyWebsites = [
  {
    name: "StudyPanda",
    url: "https://studypanda.live/books"
  },
  {
    name: "Learnify",
    url: "https://learnify.deltaverse.site/"
  },
  {
    name: "PW StudyParcham",
    url: "https://pw.studyparcham.in/#home-view"
  },
  {
    name: "AS Multiverse",
    url: "https://asmultiverse.com/?tab=home"
  },
  {
    name: "StudyRays",
    url: "https://studyrays.cc"
  },
  {
    name: "LearnTopper",
    url: "https://learntopper.in"
  },
  {
    name: "StudySpark",
    url: "https://studyspark.pro"
  },
  {
    name: "Eduzex PW",
    url: "http://eduzex-pw.pages.dev"
  },
  {
    name: "DeltaStudy",
    url: "http://deltastudy.site"
  },
  {
    name: "Studybeepro",
    url: "http://studybeepro.site"
  },
  {
    name: "RolexCoderZ",
    url: "http://rolexcoderz.in"
  },
  {
    name: "VedStudy",
    url: "https://vedstudy.com/"
  },
  {
    name: "PrepProNetwork",
    url: "https://preppronetwork.vercel.app/"
  },
  {
    name: "learnbyakp",
    url: "http://learnbyakp.site"
  },
  {
    name: "pwx.pages.dev",
    url: "https://pwx.pages.dev"
  }
];

function openStudyWebsite(index) {
  const website =
    studyWebsites[index];

  if (!website) return;

  const modal =
    $("#websiteModal");

  const frame =
    $("#embeddedSite") ||
    document.querySelector(
      "#websiteViewer iframe"
    );

  const title =
    $("#websiteModalTitle");

  const external =
    $("#openExternalWebsite");

  if (title) {
    title.textContent =
      website.name;
  }

  if (frame) {
    frame.src =
      website.url;
  }

  if (external) {
    external.onclick = () => {
      window.open(
        website.url,
        "_blank",
        "noopener,noreferrer"
      );
    };
  }

  if (modal) {
    openModal("websiteModal");
  } else {
    showToast(
      `${website.name} selected.`
    );
  }
}

function setupStudyWebsites() {
  $all("[data-website]").forEach(card => {
    card.addEventListener("click", () => {
      openStudyWebsite(
        Number(card.dataset.website)
      );
    });
  });
}

/* =========================================================
   FILTER BUTTONS
   ========================================================= */

function setupFilters() {
  $all(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
      const group =
        button.closest(
          ".filters"
        );

      if (group) {
        group
          .querySelectorAll(".filter-btn")
          .forEach(item => {
            item.classList.remove(
              "active"
            );
          });
      }

      button.classList.add("active");

      const filter =
        button.dataset.filter ||
        button.textContent.trim();

      applyContentFilter(
        filter
      );
    });
  });
}

function applyContentFilter(filter) {
  const normalized =
    String(filter)
      .toLowerCase();

  const cards =
    $all(
      "[data-subject], [data-category]"
    );

  if (!cards.length) return;

  cards.forEach(card => {
    const category =
      String(
        card.dataset.subject ||
        card.dataset.category ||
        ""
      ).toLowerCase();

    const show =
      normalized === "all" ||
      normalized === "सभी" ||
      !normalized ||
      category.includes(normalized);

    card.style.display =
      show ? "" : "none";
  });
}

/* =========================================================
   DYNAMIC DATE
   ========================================================= */

function updateDate() {
  const date =
    new Date();

  $all("[data-current-date]").forEach(
    element => {
      element.textContent =
        date.toLocaleDateString(
          state.language === "HI"
            ? "hi-IN"
            : "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric"
          }
        );
    }
  );
}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

function setupKeyboardShortcuts() {
  document.addEventListener(
    "keydown",
    event => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        const search =
          $("#globalSearch") ||
          document.querySelector(
            ".search-box input"
          );

        if (search) {
          search.focus();
        }
      }

      if (
        event.key === "/" &&
        document.activeElement.tagName !==
          "INPUT" &&
        document.activeElement.tagName !==
          "TEXTAREA"
      ) {
        event.preventDefault();

        const search =
          $("#globalSearch") ||
          document.querySelector(
            ".search-box input"
          );

        if (search) {
          search.focus();
        }
      }
    }
  );
}

/* =========================================================
   GENERIC BUTTON FEEDBACK
   ========================================================= */

function setupGenericButtons() {
  $all("button").forEach(button => {
    if (
      button.dataset.bound === "true"
    ) {
      return;
    }

    const text =
      button.textContent.trim();

    if (
      !text ||
      button.closest(".sidebar") ||
      button.closest(".topbar") ||
      button.closest(".modal")
    ) {
      return;
    }

    const knownAction =
      button.dataset.page ||
      button.dataset.model ||
      button.dataset.website ||
      button.dataset.bookmark ||
      button.dataset.calc ||
      button.id;

    if (knownAction) return;

    button.addEventListener(
      "click",
      () => {
        const label =
          button.textContent.trim();

        if (
          /start learning|continue|open|view|save|download|practice|begin/i.test(
            label
          )
        ) {
          showToast(
            `${label} selected.`
          );
        }
      }
    );

    button.dataset.bound =
      "true";
  });
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeMissionLakshya() {
  try {
    setupNavigation();
    setupMobileMenu();
    setupSearch();
    setupModals();
    setupTopbar();

    updateLanguageButton();
    setupThemes();

    setupTimer();
    setupAIChat();
    setupVoiceInput();
    setupQuestionImage();

    setupQuiz();
    setupCalculator();
    setup3DLab();

    setupYouTube();
    setupStudyWebsites();

    setupFilters();
    setupBookmarks();

    renderActivities();
    updateDate();

    setupKeyboardShortcuts();
    setupGenericButtons();

    /* Default page */
    const activePage =
      document.querySelector(
        ".page.active"
      );

    if (!activePage) {
      navigateTo("home");
    }

    console.log(
      "Mission Lakshya initialized successfully."
    );
  } catch (error) {
    console.error(
      "Mission Lakshya initialization error:",
      error
    );
  }
}

/* =========================================================
   DOM READY
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeMissionLakshya
  );
} else {
  initializeMissionLakshya();
}

/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

window.MissionLakshya = {
  navigateTo,
  askAria,
  open3DModel,
  loadYouTubeLive,
  openStudyWebsite,
  playYouTubeVideo,
  startTimer,
  pauseTimer,
  resetTimer,
  toggleBookmark,
  applyTheme,
  showToast,
  speakText
};
