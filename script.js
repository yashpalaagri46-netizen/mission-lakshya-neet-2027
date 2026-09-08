/* =========================================================
   STUDY WALLAH — MAIN JAVASCRIPT
   NEET + JEE Preparation Platform
   ========================================================= */

"use strict";

/* -----------------------------
   STORAGE
----------------------------- */

const STORAGE = {
  profile: "studywallah_profile",
  theme: "studywallah_theme",
  language: "studywallah_language",
  bookmarks: "studywallah_bookmarks",
  progress: "studywallah_progress",
  activity: "studywallah_activity",
  planner: "studywallah_planner",
  quizHistory: "studywallah_quiz_history",
  notifications: "studywallah_notifications"
};

function getData(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function setData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Storage error:", error);
  }
}

/* -----------------------------
   DEFAULT USER
----------------------------- */

let profile = getData(STORAGE.profile, {
  name: "Student",
  course: "NEET",
  language: "English"
});

let bookmarks = getData(STORAGE.bookmarks, []);
let progress = getData(STORAGE.progress, {});
let activity = getData(STORAGE.activity, []);
let planner = getData(STORAGE.planner, []);
let quizHistory = getData(STORAGE.quizHistory, []);

function saveAll() {
  setData(STORAGE.profile, profile);
  setData(STORAGE.bookmarks, bookmarks);
  setData(STORAGE.progress, progress);
  setData(STORAGE.activity, activity);
  setData(STORAGE.planner, planner);
  setData(STORAGE.quizHistory, quizHistory);
}

/* -----------------------------
   APP INIT
----------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  loadTheme();
  loadProfile();
  setupNavigation();
  setupSearch();
  setupKeyboardShortcuts();
  setupButtons();
  updateStats();
  renderPlanner();
  renderBookmarks();
  renderActivity();
  renderNotifications();

  console.log("Study Wallah initialized successfully.");
}

/* -----------------------------
   NAVIGATION
----------------------------- */

function setupNavigation() {
  const navItems = document.querySelectorAll("[data-page], .nav-item");

  navItems.forEach(item => {
    item.addEventListener("click", event => {
      const page =
        item.dataset.page ||
        item.getAttribute("data-page") ||
        item.getAttribute("href")?.replace("#", "");

      if (!page) return;

      event.preventDefault();
      showPage(page);
    });
  });
}

function showPage(pageName) {
  const pages = document.querySelectorAll(
    ".page, .section-page, [data-section]"
  );

  pages.forEach(page => {
    const pageId =
      page.dataset.section ||
      page.dataset.page ||
      page.id;

    if (
      pageId === pageName ||
      pageId === `page-${pageName}`
    ) {
      page.classList.add("active");
      page.style.display = "";
    } else {
      page.classList.remove("active");
      if (pages.length > 1) {
        page.style.display = "none";
      }
    }
  });

  document.querySelectorAll(
    "[data-page], .nav-item"
  ).forEach(item => {
    const value =
      item.dataset.page ||
      item.getAttribute("data-page");

    item.classList.toggle(
      "active",
      value === pageName
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  addActivity(`Opened ${pageName}`);
}

/* -----------------------------
   MOBILE MENU
----------------------------- */

function setupButtons() {
  document.addEventListener("click", event => {
    const menuButton = event.target.closest(
      "[data-menu], .menu-btn, .hamburger"
    );

    if (menuButton) {
      toggleMobileMenu();
    }

    const closeButton = event.target.closest(
      "[data-close], .close-btn"
    );

    if (closeButton) {
      closeAllModals();
    }
  });
}

function toggleMobileMenu() {
  const sidebar = document.querySelector(
    ".sidebar, .mobile-sidebar, #sidebar"
  );

  if (sidebar) {
    sidebar.classList.toggle("open");
  }

  document.body.classList.toggle("menu-open");
}

/* -----------------------------
   SEARCH
----------------------------- */

function setupSearch() {
  const searchInputs = document.querySelectorAll(
    "#globalSearch, .global-search, [data-search]"
  );

  searchInputs.forEach(input => {
    input.addEventListener("input", () => {
      performSearch(input.value);
    });

    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        performSearch(input.value);
      }
    });
  });
}

function performSearch(query) {
  query = query.trim().toLowerCase();

  if (!query) {
    clearSearchResults();
    return;
  }

  const searchableElements = document.querySelectorAll(
    "[data-searchable], .course-card, .lesson-card, .question-card, .note-card, .resource-card"
  );

  let found = 0;

  searchableElements.forEach(element => {
    const text = element.textContent.toLowerCase();

    if (text.includes(query)) {
      element.style.display = "";
      element.classList.add("search-match");
      found++;
    } else {
      element.style.display = "none";
      element.classList.remove("search-match");
    }
  });

  showToast(
    found
      ? `${found} result${found > 1 ? "s" : ""} found`
      : "No results found"
  );
}

function clearSearchResults() {
  document.querySelectorAll(
    ".course-card, .lesson-card, .question-card, .note-card, .resource-card"
  ).forEach(element => {
    element.style.display = "";
    element.classList.remove("search-match");
  });
}

/* -----------------------------
   THEME
----------------------------- */

function loadTheme() {
  const theme = localStorage.getItem(STORAGE.theme) || "dark-purple";
  applyTheme(theme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  localStorage.setItem(STORAGE.theme, theme);

  document.querySelectorAll(
    "[data-theme-choice]"
  ).forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.themeChoice === theme
    );
  });
}

function changeTheme(theme) {
  applyTheme(theme);
  showToast("Theme changed");
}

/* -----------------------------
   LANGUAGE
----------------------------- */

function changeLanguage(language) {
  profile.language = language;
  setData(STORAGE.language, language);
  saveAll();

  document.documentElement.lang =
    language === "Hindi" ? "hi" : "en";

  showToast(
    language === "Hindi"
      ? "भाषा हिन्दी में बदल दी गई"
      : "Language changed to English"
  );
}

/* -----------------------------
   PROFILE
----------------------------- */

function loadProfile() {
  const nameElements = document.querySelectorAll(
    "[data-user-name], #userName, .user-name"
  );

  nameElements.forEach(element => {
    element.textContent = profile.name;
  });

  const courseElements = document.querySelectorAll(
    "[data-user-course], #userCourse"
  );

  courseElements.forEach(element => {
    element.textContent = profile.course;
  });
}

function updateProfile(name, course) {
  if (name) profile.name = name;
  if (course) profile.course = course;

  saveAll();
  loadProfile();

  showToast("Profile updated");
}

/* -----------------------------
   ACTIVITY
----------------------------- */

function addActivity(text) {
  activity.unshift({
    text,
    time: new Date().toISOString()
  });

  activity = activity.slice(0, 30);

  setData(STORAGE.activity, activity);
  renderActivity();
}

function renderActivity() {
  const containers = document.querySelectorAll(
    "[data-activity], #recentActivity"
  );

  containers.forEach(container => {
    if (!activity.length) {
      container.innerHTML =
        `<div class="empty-state">No recent activity</div>`;
      return;
    }

    container.innerHTML = activity
      .slice(0, 8)
      .map(item => `
        <div class="activity-item">
          <div>
            <strong>${escapeHTML(item.text)}</strong>
            <small>${formatTime(item.time)}</small>
          </div>
        </div>
      `)
      .join("");
  });
}

/* -----------------------------
   PROGRESS
----------------------------- */

function setProgress(id, value) {
  value = Math.max(0, Math.min(100, Number(value)));

  progress[id] = value;

  setData(STORAGE.progress, progress);
  updateStats();
}

function increaseProgress(id, amount = 1) {
  const current = progress[id] || 0;
  setProgress(id, current + amount);
}

function getProgress(id) {
  return progress[id] || 0;
}

function updateStats() {
  const values = Object.values(progress);

  const average = values.length
    ? Math.round(
        values.reduce((a, b) => a + b, 0) /
        values.length
      )
    : 0;

  document.querySelectorAll(
    "[data-overall-progress], #overallProgress"
  ).forEach(element => {
    element.textContent = `${average}%`;
  });

  document.querySelectorAll(
    "[data-progress-bar]"
  ).forEach(bar => {
    const id = bar.dataset.progressBar;
    const value = getProgress(id);

    bar.style.width = `${value}%`;
  });

  document.querySelectorAll(
    "[data-stat='bookmarks']"
  ).forEach(element => {
    element.textContent = bookmarks.length;
  });

  document.querySelectorAll(
    "[data-stat='quizzes']"
  ).forEach(element => {
    element.textContent = quizHistory.length;
  });
}

/* -----------------------------
   BOOKMARKS
----------------------------- */

function toggleBookmark(type, id, title = "") {
  const index = bookmarks.findIndex(
    item =>
      item.type === type &&
      item.id === id
  );

  if (index >= 0) {
    bookmarks.splice(index, 1);
    showToast("Removed from bookmarks");
  } else {
    bookmarks.push({
      type,
      id,
      title,
      createdAt: new Date().toISOString()
    });

    showToast("Added to bookmarks");
  }

  setData(STORAGE.bookmarks, bookmarks);
  renderBookmarks();
  updateStats();
}

function isBookmarked(type, id) {
  return bookmarks.some(
    item =>
      item.type === type &&
      item.id === id
  );
}

function renderBookmarks() {
  const containers = document.querySelectorAll(
    "[data-bookmarks], #bookmarksList"
  );

  containers.forEach(container => {
    if (!bookmarks.length) {
      container.innerHTML = `
        <div class="empty-state">
          No bookmarks yet
        </div>
      `;
      return;
    }

    container.innerHTML = bookmarks
      .map(item => `
        <div class="bookmark-item">
          <div>
            <strong>${escapeHTML(item.title || item.id)}</strong>
            <small>${escapeHTML(item.type)}</small>
          </div>
          <button
            onclick="toggleBookmark(
              '${escapeAttribute(item.type)}',
              '${escapeAttribute(item.id)}'
            )">
            Remove
          </button>
        </div>
      `)
      .join("");
  });
}

/* -----------------------------
   QUIZ
----------------------------- */

let currentQuiz = null;
let quizTimer = null;
let quizSeconds = 0;

function startQuiz(questions, title = "Quiz", duration = 600) {
  if (!Array.isArray(questions) || !questions.length) {
    showToast("No questions available");
    return;
  }

  currentQuiz = {
    title,
    questions,
    answers: {},
    startedAt: Date.now()
  };

  quizSeconds = duration;

  renderQuiz();

  clearInterval(quizTimer);

  quizTimer = setInterval(() => {
    quizSeconds--;

    updateQuizTimer();

    if (quizSeconds <= 0) {
      clearInterval(quizTimer);
      submitQuiz();
    }
  }, 1000);
}

function renderQuiz() {
  const container = document.querySelector(
    "#quizContainer, [data-quiz-container]"
  );

  if (!container || !currentQuiz) return;

  container.innerHTML = `
    <div class="quiz-header">
      <h2>${escapeHTML(currentQuiz.title)}</h2>
      <div id="quizTimer">00:00</div>
    </div>

    <div class="quiz-questions">
      ${currentQuiz.questions
        .map((question, index) => `
          <div class="quiz-question">
            <h3>
              ${index + 1}. ${escapeHTML(question.question)}
            </h3>

            <div class="quiz-options">
              ${question.options
                .map((option, optionIndex) => `
                  <button
                    class="quiz-option"
                    data-question="${index}"
                    data-option="${optionIndex}"
                    onclick="selectQuizAnswer(${index}, ${optionIndex})">
                    ${escapeHTML(option)}
                  </button>
                `)
                .join("")}
            </div>
          </div>
        `)
        .join("")}
    </div>

    <button
      class="primary-btn"
      onclick="submitQuiz()">
      Submit Quiz
    </button>
  `;

  updateQuizTimer();
}

function selectQuizAnswer(questionIndex, optionIndex) {
  if (!currentQuiz) return;

  currentQuiz.answers[questionIndex] = optionIndex;

  document
    .querySelectorAll(
      `[data-question="${questionIndex}"]`
    )
    .forEach(button => {
      button.classList.remove("selected");
    });

  const selected = document.querySelector(
    `[data-question="${questionIndex}"][data-option="${optionIndex}"]`
  );

  if (selected) {
    selected.classList.add("selected");
  }
}

function updateQuizTimer() {
  const timer = document.querySelector("#quizTimer");

  if (!timer) return;

  const minutes = Math.floor(quizSeconds / 60);
  const seconds = quizSeconds % 60;

  timer.textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function submitQuiz() {
  if (!currentQuiz) return;

  clearInterval(quizTimer);

  let correct = 0;

  currentQuiz.questions.forEach(
    (question, index) => {
      if (
        currentQuiz.answers[index] ===
        question.answer
      ) {
        correct++;
      }
    }
  );

  const total = currentQuiz.questions.length;

  const score = Math.round(
    (correct / total) * 100
  );

  const result = {
    title: currentQuiz.title,
    correct,
    total,
    score,
    date: new Date().toISOString()
  };

  quizHistory.unshift(result);
  quizHistory = quizHistory.slice(0, 50);

  setData(
    STORAGE.quizHistory,
    quizHistory
  );

  addActivity(
    `${currentQuiz.title} completed — ${score}%`
  );

  showQuizResult(result);

  currentQuiz = null;
}

function showQuizResult(result) {
  const container = document.querySelector(
    "#quizResult, [data-quiz-result]"
  );

  if (!container) {
    showToast(
      `Quiz completed: ${result.score}%`
    );
    return;
  }

  container.innerHTML = `
    <div class="quiz-result">
      <h2>Quiz Complete</h2>
      <div class="score">${result.score}%</div>
      <p>
        ${result.correct} / ${result.total}
        questions correct
      </p>

      <button
        class="primary-btn"
        onclick="location.reload()">
        Retry
      </button>
    </div>
  `;
}

/* -----------------------------
   PLANNER
----------------------------- */

function addPlannerTask(title, date = "") {
  if (!title.trim()) {
    showToast("Enter a task");
    return;
  }

  planner.push({
    id: Date.now().toString(),
    title,
    date,
    completed: false
  });

  setData(STORAGE.planner, planner);

  renderPlanner();
  showToast("Task added");
}

function togglePlannerTask(id) {
  const task = planner.find(
    item => item.id === id
  );

  if (!task) return;

  task.completed = !task.completed;

  setData(STORAGE.planner, planner);
  renderPlanner();
}

function deletePlannerTask(id) {
  planner = planner.filter(
    item => item.id !== id
  );

  setData(STORAGE.planner, planner);
  renderPlanner();
}

function renderPlanner() {
  const containers = document.querySelectorAll(
    "[data-planner], #plannerList"
  );

  containers.forEach(container => {
    if (!planner.length) {
      container.innerHTML = `
        <div class="empty-state">
          No study tasks yet
        </div>
      `;
      return;
    }

    container.innerHTML = planner
      .map(task => `
        <div class="planner-task ${
          task.completed ? "completed" : ""
        }">
          <label>
            <input
              type="checkbox"
              ${
                task.completed
                  ? "checked"
                  : ""
              }
              onchange="togglePlannerTask('${escapeAttribute(task.id)}')"
            >

            <span>
              ${escapeHTML(task.title)}
            </span>
          </label>

          ${
            task.date
              ? `<small>${escapeHTML(task.date)}</small>`
              : ""
          }

          <button
            onclick="deletePlannerTask('${escapeAttribute(task.id)}')">
            ×
          </button>
        </div>
      `)
      .join("");
  });
}

/* -----------------------------
   NOTES
----------------------------- */

function savePersonalNote(title, content) {
  const notes = getData(
    "studywallah_personal_notes",
    []
  );

  notes.unshift({
    id: Date.now().toString(),
    title,
    content,
    date: new Date().toISOString()
  });

  setData(
    "studywallah_personal_notes",
    notes
  );

  showToast("Note saved");
}

/* -----------------------------
   NOTIFICATIONS
----------------------------- */

function renderNotifications() {
  const containers = document.querySelectorAll(
    "[data-notifications], #notificationsList"
  );

  const notifications = getData(
    STORAGE.notifications,
    [
      {
        title: "Welcome to Study Wallah",
        message: "Start your NEET/JEE preparation today.",
        date: new Date().toISOString()
      }
    ]
  );

  containers.forEach(container => {
    container.innerHTML = notifications
      .map(notification => `
        <div class="notification-item">
          <strong>
            ${escapeHTML(notification.title)}
          </strong>

          <p>
            ${escapeHTML(notification.message)}
          </p>
        </div>
      `)
      .join("");
  });
}

/* -----------------------------
   YOUTUBE SEARCH
----------------------------- */

function searchYouTube(query) {
  if (!query.trim()) {
    showToast("Enter a video topic");
    return;
  }

  const url =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(query);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

  addActivity(
    `Searched YouTube: ${query}`
  );
}

/* -----------------------------
   COURSE FILTER
----------------------------- */

function filterCourse(course) {
  document.querySelectorAll(
    "[data-course]"
  ).forEach(card => {
    const cardCourse =
      card.dataset.course;

    card.style.display =
      course === "all" ||
      cardCourse === course
        ? ""
        : "none";
  });
}

function filterSubject(subject) {
  document.querySelectorAll(
    "[data-subject]"
  ).forEach(card => {
    const cardSubject =
      card.dataset.subject;

    card.style.display =
      subject === "all" ||
      cardSubject === subject
        ? ""
        : "none";
  });
}

/* -----------------------------
   MODALS
----------------------------- */

function openModal(id) {
  const modal = document.getElementById(id);

  if (!modal) return;

  modal.classList.add("open");
  modal.style.display = "flex";

  document.body.classList.add(
    "modal-open"
  );
}

function closeModal(id) {
  const modal = document.getElementById(id);

  if (!modal) return;

  modal.classList.remove("open");
  modal.style.display = "none";

  document.body.classList.remove(
    "modal-open"
  );
}

function closeAllModals() {
  document.querySelectorAll(
    ".modal.open, .modal"
  ).forEach(modal => {
    modal.classList.remove("open");
    modal.style.display = "none";
  });

  document.body.classList.remove(
    "modal-open"
  );
}

/* -----------------------------
   TOAST
----------------------------- */

function showToast(message) {
  let toast = document.querySelector(
    "#toast, .toast"
  );

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(
    showToast.timeout
  );

  showToast.timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* -----------------------------
   KEYBOARD SHORTCUTS
----------------------------- */

function setupKeyboardShortcuts() {
  document.addEventListener(
    "keydown",
    event => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        const search =
          document.querySelector(
            "#globalSearch, .global-search"
          );

        if (search) {
          search.focus();
        }
      }

      if (event.key === "Escape") {
        closeAllModals();
      }
    }
  );
}

/* -----------------------------
   RESET DATA
----------------------------- */

function resetStudyData() {
  const confirmed = confirm(
    "Are you sure you want to reset your Study Wallah data?"
  );

  if (!confirmed) return;

  Object.values(STORAGE).forEach(key => {
    localStorage.removeItem(key);
  });

  localStorage.removeItem(
    "studywallah_personal_notes"
  );

  location.reload();
}

/* -----------------------------
   SECURITY HELPERS
----------------------------- */

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

/* -----------------------------
   TIME FORMAT
----------------------------- */

function formatTime(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString(
    undefined,
    {
      dateStyle: "short",
      timeStyle: "short"
    }
  );
}

/* -----------------------------
   GLOBAL API
----------------------------- */

window.StudyWallah = {
  showPage,
  changeTheme,
  changeLanguage,
  updateProfile,

  setProgress,
  increaseProgress,
  getProgress,

  toggleBookmark,
  isBookmarked,

  startQuiz,
  submitQuiz,
  selectQuizAnswer,

  addPlannerTask,
  togglePlannerTask,
  deletePlannerTask,

  savePersonalNote,

  searchYouTube,
  filterCourse,
  filterSubject,

  openModal,
  closeModal,
  closeAllModals,

  showToast,
  resetStudyData
};

console.log(
  "Study Wallah — NEET + JEE Study Platform"
);
console.log(
  "Frontend JavaScript loaded."
);
