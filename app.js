/* =========================================
   MISSION LAKSHYA NEET 2027
   STEP 2 - MAIN APP JAVASCRIPT
   35 THEMES + MODES + AI + YOUTUBE
========================================= */

"use strict";

/* =========================================
   GLOBAL SETTINGS
========================================= */

const APP_NAME = "Mission Lakshya NEET 2027";

const DEFAULT_THEME = "theme-01";

const THEME_STORAGE = "mlSelectedTheme";

const MODE_STORAGE = "mlDisplayMode";

const LIGHT_STORAGE = "mlLightMode";


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

  const sidebar =
    document.getElementById("sidebar");

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

  const sidebar =
    document.getElementById("sidebar");

  if (sidebar) {
    sidebar.classList.toggle("open");
  }

}


/* =========================================
   LIGHT / DARK MODE
========================================= */

function toggleLightDark() {

  const isLight =
    document.body.classList.toggle("light");

  localStorage.setItem(
    LIGHT_STORAGE,
    isLight ? "light" : "dark"
  );

}


/* =========================================
   DISPLAY MODES
========================================= */

const DISPLAY_MODES = [

  {
    id: "default",
    name: "Default",
    icon: "✨",
    className: ""
  },

  {
    id: "focus",
    name: "Focus Mode",
    icon: "🎯",
    className: "focus-mode"
  },

  {
    id: "reading",
    name: "Reading Mode",
    icon: "📖",
    className: "reading-mode"
  },

  {
    id: "night",
    name: "Night Study",
    icon: "🌙",
    className: "night-mode"
  },

  {
    id: "glass",
    name: "Glass Mode",
    icon: "💎",
    className: "glass-mode"
  },

  {
    id: "minimal",
    name: "Minimal Mode",
    icon: "⚪",
    className: "minimal-mode"
  },

  {
    id: "study",
    name: "Study Mode",
    icon: "📚",
    className: "study-mode"
  }

];


/* =========================================
   35 THEMES
========================================= */

const THEMES = [

  {
    id: "theme-01",
    name: "Mission Blue",
    icon: "🚀"
  },

  {
    id: "theme-02",
    name: "Ocean",
    icon: "🌊"
  },

  {
    id: "theme-03",
    name: "Sky",
    icon: "☁️"
  },

  {
    id: "theme-04",
    name: "Royal",
    icon: "👑"
  },

  {
    id: "theme-05",
    name: "Galaxy",
    icon: "🌌"
  },

  {
    id: "theme-06",
    name: "Space",
    icon: "🚀"
  },

  {
    id: "theme-07",
    name: "Neon",
    icon: "💡"
  },

  {
    id: "theme-08",
    name: "Cyber",
    icon: "🤖"
  },

  {
    id: "theme-09",
    name: "Forest",
    icon: "🌲"
  },

  {
    id: "theme-10",
    name: "Nature",
    icon: "🌿"
  },

  {
    id: "theme-11",
    name: "Mint",
    icon: "🍃"
  },

  {
    id: "theme-12",
    name: "Emerald",
    icon: "💚"
  },

  {
    id: "theme-13",
    name: "Sunset",
    icon: "🌅"
  },

  {
    id: "theme-14",
    name: "Fire",
    icon: "🔥"
  },

  {
    id: "theme-15",
    name: "Orange",
    icon: "🟠"
  },

  {
    id: "theme-16",
    name: "Rose",
    icon: "🌹"
  },

  {
    id: "theme-17",
    name: "Pink",
    icon: "🌸"
  },

  {
    id: "theme-18",
    name: "Lavender",
    icon: "💜"
  },

  {
    id: "theme-19",
    name: "Purple",
    icon: "🔮"
  },

  {
    id: "theme-20",
    name: "Violet",
    icon: "🪻"
  },

  {
    id: "theme-21",
    name: "Coffee",
    icon: "☕"
  },

  {
    id: "theme-22",
    name: "Chocolate",
    icon: "🍫"
  },

  {
    id: "theme-23",
    name: "Sand",
    icon: "🏜️"
  },

  {
    id: "theme-24",
    name: "Arctic",
    icon: "❄️"
  },

  {
    id: "theme-25",
    name: "Ice",
    icon: "🧊"
  },

  {
    id: "theme-26",
    name: "Midnight",
    icon: "🌙"
  },

  {
    id: "theme-27",
    name: "Dark Space",
    icon: "🌑"
  },

  {
    id: "theme-28",
    name: "Matrix",
    icon: "🟢"
  },

  {
    id: "theme-29",
    name: "Tech",
    icon: "⚙️"
  },

  {
    id: "theme-30",
    name: "Electric",
    icon: "⚡"
  },

  {
    id: "theme-31",
    name: "Medical",
    icon: "➕"
  },

  {
    id: "theme-32",
    name: "Education",
    icon: "🎓"
  },

  {
    id: "theme-33",
    name: "Notebook",
    icon: "📓"
  },

  {
    id: "theme-34",
    name: "Calm",
    icon: "🧘"
  },

  {
    id: "theme-35",
    name: "Mission Gold",
    icon: "🏆"
  }

];


/* =========================================
   APPLY THEME
========================================= */

function applyTheme(themeId) {

  THEMES.forEach(theme => {

    document.body.classList.remove(theme.id);

  });

  const selected =
    THEMES.find(theme => theme.id === themeId);

  if (!selected) {
    themeId = DEFAULT_THEME;
  }

  document.body.classList.add(themeId);

  localStorage.setItem(
    THEME_STORAGE,
    themeId
  );

  renderThemes();

}


/* =========================================
   APPLY DISPLAY MODE
========================================= */

function applyDisplayMode(modeId) {

  DISPLAY_MODES.forEach(mode => {

    if (mode.className) {
      document.body.classList.remove(
        mode.className
      );
    }

  });

  const selected =
    DISPLAY_MODES.find(
      mode => mode.id === modeId
    );

  if (
    selected &&
    selected.className
  ) {

    document.body.classList.add(
      selected.className
    );

  }

  localStorage.setItem(
    MODE_STORAGE,
    modeId
  );

  renderModes();

}


/* =========================================
   RENDER THEMES
========================================= */

function renderThemes() {

  const container =
    document.getElementById("themeList");

  if (!container) return;

  const current =
    localStorage.getItem(THEME_STORAGE) ||
    DEFAULT_THEME;

  container.innerHTML = "";

  THEMES.forEach(theme => {

    const card =
      document.createElement("button");

    card.className =
      "theme-card";

    if (theme.id === current) {
      card.classList.add("selected");
    }

    card.type = "button";

    card.innerHTML = `
      <span class="theme-icon">
        ${theme.icon}
      </span>

      <strong>
        ${escapeHTML(theme.name)}
      </strong>

      <small>
        ${theme.id.replace("theme-", "Theme ")}
      </small>
    `;

    card.addEventListener(
      "click",
      () => applyTheme(theme.id)
    );

    container.appendChild(card);

  });


  renderModes();

}


/* =========================================
   RENDER MODES
========================================= */

function renderModes() {

  const container =
    document.getElementById("modeList");

  if (!container) return;

  const current =
    localStorage.getItem(MODE_STORAGE) ||
    "default";

  container.innerHTML = "";

  DISPLAY_MODES.forEach(mode => {

    const card =
      document.createElement("button");

    card.className =
      "theme-card";

    if (mode.id === current) {
      card.classList.add("selected");
    }

    card.type = "button";

    card.innerHTML = `
      <span class="theme-icon">
        ${mode.icon}
      </span>

      <strong>
        ${escapeHTML(mode.name)}
      </strong>
    `;

    card.addEventListener(
      "click",
      () => applyDisplayMode(mode.id)
    );

    container.appendChild(card);

  });

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
    q.includes("practice") ||
    q.includes("प्रैक्टिस")
  ) {

    showPage("dpp");

  }


  else if (
    q.includes("ai") ||
    q.includes("gemini") ||
    q.includes("doubt") ||
    q.includes("सवाल") ||
    q.includes("डाउट")
  ) {

    showPage("ai");

  }


  else if (
    q.includes("youtube") ||
    q.includes("live") ||
    q.includes("लाइव")
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
    q.includes("pyq") ||
    q.includes("previous year")
  ) {

    showPage("pyq");

  }


  else if (
    q.includes("planner") ||
    q.includes("plan")
  ) {

    showPage("planner");

  }


  else if (
    q.includes("revision") ||
    q.includes("revise")
  ) {

    showPage("revision");

  }


  else if (
    q.includes("performance") ||
    q.includes("score")
  ) {

    showPage("performance");

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
      document.getElementById(
        "youtubeQuery"
      );

    if (input) {
      query =
        input.value.trim();
    }

  }

  if (!query) {

    alert(
      "पहले YouTube search लिखें।"
    );

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

}


function searchYouTube() {
  youtubeSearch();
}


/* =========================================
   YOUTUBE LIVE
========================================= */

async function loadYouTubeLive() {

  const status =
    document.getElementById(
      "liveStatus"
    );

  const container =
    document.getElementById(
      "liveVideos"
    );

  if (!status || !container) {
    return;
  }


  status.innerText =
    "🔄 Live classes खोजी जा रही हैं...";


  container.innerHTML = "";


  try {

    const response =
      await fetch(
        "/api/youtube-live",
        {
          method: "GET",
          headers: {
            "Accept":
              "application/json"
          }
        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data?.error ||
        "YouTube API error"
      );

    }


    if (
      !Array.isArray(
        data.liveClasses
      ) ||
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


    data.liveClasses.forEach(
      video => {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "live-card";


        const videoId =
          escapeHTML(
            video.videoId || ""
          );


        card.innerHTML = `
          <img
            src="${escapeHTML(
              video.thumbnail || ""
            )}"
            alt="YouTube Live"
            loading="lazy"
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
            data-video-id="${videoId}"
          >
            ▶️ Play Live
          </button>

          <button
            class="secondary-btn"
            data-video-url="${escapeHTML(
              video.url || "#"
            )}"
          >
            💬 YouTube
          </button>
        `;


        const playButton =
          card.querySelector(
            "[data-video-id]"
          );


        if (playButton) {

          playButton.addEventListener(
            "click",
            () => {
              playLive(
                playButton.dataset.videoId
              );
            }
          );

        }


        const youtubeButton =
          card.querySelector(
            "[data-video-url]"
          );


        if (youtubeButton) {

          youtubeButton.addEventListener(
            "click",
            () => {

              const url =
                youtubeButton.dataset
                  .videoUrl;

              if (url && url !== "#") {

                window.open(
                  url,
                  "_blank",
                  "noopener,noreferrer"
                );

              }

            }
          );

        }


        container.appendChild(card);

      }
    );

  }


  catch (error) {

    console.error(
      "YouTube Live Error:",
      error
    );


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


  if (!player || !videoId) {
    return;
  }


  player.src =
    "https://www.youtube.com/embed/" +
    encodeURIComponent(videoId) +
    "?autoplay=1";


  player.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });


  /* Try to prepare YouTube chat */

  loadYouTubeChat(videoId);

}


/* =========================================
   YOUTUBE CHAT
========================================= */

function loadYouTubeChat(videoId) {

  const chat =
    document.getElementById(
      "youtubeChat"
    );


  if (!chat || !videoId) {
    return;
  }


  chat.innerHTML = `
    <h3>
      💬 Live Chat
    </h3>

    <p class="section-subtitle">
      Live stream का official YouTube chat
    </p>

    <button
      class="main-btn"
      type="button"
      onclick="openYouTubeChat('${escapeHTML(videoId)}')"
    >
      💬 Open Live Chat
    </button>
  `;

}


function openYouTubeChat(videoId) {

  const url =
    "https://www.youtube.com/live_chat?v=" +
    encodeURIComponent(videoId);


  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================
   GEMINI AI
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


  if (!questionBox || !answerBox) {
    return;
  }


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
      await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
            "Accept":
              "application/json"
          },

          body: JSON.stringify({
            message: question
          })
        }
      );


    let data = {};

    try {
      data =
        await response.json();
    }

    catch {
      data = {};
    }


    if (!response.ok) {

      throw new Error(
        data?.error ||
        `Server Error (${response.status})`
      );

    }


    answerBox.innerText =
      data?.answer ||
      "AI से जवाब नहीं मिला।";

  }


  catch (error) {

    console.error(
      "Gemini AI Error:",
      error
    );


    answerBox.innerText =
      "❌ AI से connection नहीं हो पाया।\n\n" +
      (
        error?.message ||
        "कृपया थोड़ी देर बाद फिर कोशिश करें।"
      );

  }

}


/* =========================================
   TELEGRAM
========================================= */

function openTelegram() {

  window.open(
    "https://t.me/Yashpal_aagri",
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================
   STUDY WEBSITES
========================================= */

const STUDY_WEBSITES = [

  {
    name: "StudyPanda",
    icon: "🐼",
    url: "https://studypanda.live/books"
  },

  {
    name: "Learnify",
    icon: "📚",
    url: "https://learnify.deltaverse.site/"
  },

  {
    name: "PW Study",
    icon: "🎓",
    url: "https://pw.studyparcham.in/#home-view"
  },

  {
    name: "AS Multiverse",
    icon: "🌐",
    url: "https://asmultiverse.com/?tab=home"
  },

  {
    name: "StudyBee Pro",
    icon: "🐝",
    url: "http://studybeepro.site"
  },

  {
    name: "Rolex CoderZ",
    icon: "💻",
    url: "http://rolexcoderz.in"
  },

  {
    name: "Ved Study",
    icon: "📖",
    url: "https://vedstudy.com/"
  },

  {
    name: "PrepPro Network",
    icon: "🎯",
    url: "https://preppronetwork.vercel.app/"
  },

  {
    name: "Learn By",
    icon: "🧠",
    url: "https://learnby..."
  }

];


function renderStudyWebsites() {

  const container =
    document.getElementById(
      "websiteList"
    );


  if (!container) {
    return;
  }


  container.innerHTML = "";


  STUDY_WEBSITES.forEach(
    website => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "website-card";


      card.innerHTML = `
        <div class="website-icon">
          ${website.icon}
        </div>

        <h3>
          ${escapeHTML(
            website.name
          )}
        </h3>

        <button
          class="main-btn"
          type="button"
        >
          Open
        </button>
      `;


      const button =
        card.querySelector(
          "button"
        );


      button.addEventListener(
        "click",
        () => {

          if (
            !website.url ||
            website.url.includes("...")
          ) {

            alert(
              "इस website का सही URL अभी add करना बाकी है।"
            );

            return;

          }


          window.open(
            website.url,
            "_blank",
            "noopener,noreferrer"
          );

        }
      );


      container.appendChild(card);

    }
  );

}


/* =========================================
   3D LIVE STUDY ANIMATION
========================================= */

function createStudyAnimation() {

  const animation =
    document.querySelector(
      ".study-animation"
    );


  if (!animation) {
    return;
  }


  /* Prevent duplicate elements */

  if (
    animation.querySelector(
      ".study-particle"
    )
  ) {
    return;
  }


  const symbols = [
    "📚",
    "📝",
    "🧠",
    "🎓",
    "💡",
    "🔬",
    "📖",
    "⭐",
    "🎯",
    "🚀"
  ];


  symbols.forEach(
    (symbol, index) => {

      const element =
        document.createElement(
          "span"
        );


      element.className =
        "study-particle";


      element.innerText =
        symbol;


      element.style.setProperty(
        "--i",
        index
      );


      element.style.left =
        (5 + Math.random() * 90) +
        "%";


      element.style.top =
        (5 + Math.random() * 90) +
        "%";


      animation.appendChild(
        element
      );

    }
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


  if (!container) {
    return;
  }


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
   HTML SECURITY
========================================= */

function escapeHTML(text) {

  return String(text)
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
   LOAD SAVED SETTINGS
========================================= */

function loadSavedSettings() {

  const savedTheme =
    localStorage.getItem(
      THEME_STORAGE
    ) ||
    DEFAULT_THEME;


  const savedMode =
    localStorage.getItem(
      MODE_STORAGE
    ) ||
    "default";


  const savedLight =
    localStorage.getItem(
      LIGHT_STORAGE
    );


  applyThemeSilently(
    savedTheme
  );


  applyDisplayModeSilently(
    savedMode
  );


  if (savedLight === "light") {

    document.body.classList.add(
      "light"
    );

  }

}


/* =========================================
   SILENT THEME
========================================= */

function applyThemeSilently(
  themeId
) {

  THEMES.forEach(
    theme => {

      document.body.classList.remove(
        theme.id
      );

    }
  );


  const valid =
    THEMES.some(
      theme =>
        theme.id === themeId
    );


  document.body.classList.add(
    valid
      ? themeId
      : DEFAULT_THEME
  );

}


/* =========================================
   SILENT MODE
========================================= */

function applyDisplayModeSilently(
  modeId
) {

  DISPLAY_MODES.forEach(
    mode => {

      if (mode.className) {

        document.body.classList.remove(
          mode.className
        );

      }

    }
  );


  const selected =
    DISPLAY_MODES.find(
      mode =>
        mode.id === modeId
    );


  if (
    selected &&
    selected.className
  ) {

    document.body.classList.add(
      selected.className
    );

  }

}


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

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

  }
);


/* =========================================
   START APP
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    loadSavedSettings();

    createParticles();

    createStudyAnimation();

    renderThemes();

    renderStudyWebsites();


    console.log(
      "🚀 " +
      APP_NAME +
      " loaded successfully!"
    );

  }
);
