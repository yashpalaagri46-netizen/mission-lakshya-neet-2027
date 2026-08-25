"use strict";

/* =========================================================
MISSION LAKSHYA NEET 2027
FINAL APP JAVASCRIPT
35 THEMES + DISPLAY MODES + AI + YOUTUBE + SEARCH
========================================================= */

/* =========================================================
35 THEMES
========================================================= */

const THEMES = [
{name:"Ocean Blue", icon:"🌊", accent:"#287cff", accent2:"#7c3cff", bg:"#06122f", bg2:"#0b1d46"},
{name:"Purple Dream", icon:"💜", accent:"#8b5cf6", accent2:"#ec4899", bg:"#180b2e", bg2:"#321052"},
{name:"Cyberpunk", icon:"🤖", accent:"#00f5ff", accent2:"#ff00d4", bg:"#050510", bg2:"#15152f"},
{name:"Sunset", icon:"🌅", accent:"#ff6b35", accent2:"#ff1744", bg:"#30100b", bg2:"#541b12"},
{name:"Royal Gold", icon:"👑", accent:"#fbbf24", accent2:"#f59e0b", bg:"#18120a", bg2:"#30220c"},
{name:"Emerald", icon:"💚", accent:"#10b981", accent2:"#22c55e", bg:"#041c16", bg2:"#073d2e"},
{name:"Rose", icon:"🌹", accent:"#f43f5e", accent2:"#ec4899", bg:"#240914", bg2:"#451025"},
{name:"Midnight", icon:"🌑", accent:"#6366f1", accent2:"#312e81", bg:"#020617", bg2:"#0f172a"},
{name:"Crimson", icon:"❤️", accent:"#ef4444", accent2:"#991b1b", bg:"#200506", bg2:"#400b0d"},
{name:"Neon Green", icon:"🟢", accent:"#39ff14", accent2:"#00c853", bg:"#031405", bg2:"#082b0d"},
{name:"Sky", icon:"☁️", accent:"#38bdf8", accent2:"#0ea5e9", bg:"#061827", bg2:"#0c304a"},
{name:"Aqua", icon:"💧", accent:"#06b6d4", accent2:"#14b8a6", bg:"#031b22", bg2:"#063942"},
{name:"Violet", icon:"🔮", accent:"#a855f7", accent2:"#7e22ce", bg:"#180622", bg2:"#321044"},
{name:"Magenta", icon:"💗", accent:"#d946ef", accent2:"#ec4899", bg:"#250625", bg2:"#48104a"},
{name:"Electric", icon:"⚡", accent:"#facc15", accent2:"#22d3ee", bg:"#10130a", bg2:"#18333b"},
{name:"Fire", icon:"🔥", accent:"#f97316", accent2:"#dc2626", bg:"#250b03", bg2:"#481305"},
{name:"Ice", icon:"❄️", accent:"#67e8f9", accent2:"#60a5fa", bg:"#031827", bg2:"#0b2f4a"},
{name:"Forest", icon:"🌲", accent:"#16a34a", accent2:"#15803d", bg:"#04150a", bg2:"#092a13"},
{name:"Lavender", icon:"🪻", accent:"#c084fc", accent2:"#a78bfa", bg:"#170d27", bg2:"#30204a"},
{name:"Cherry", icon:"🍒", accent:"#fb7185", accent2:"#be123c", bg:"#21070d", bg2:"#450e1c"},
{name:"Solar", icon:"☀️", accent:"#f59e0b", accent2:"#facc15", bg:"#1c1204", bg2:"#3b2508"},
{name:"Galaxy", icon:"🌌", accent:"#818cf8", accent2:"#c084fc", bg:"#05021a", bg2:"#180b3b"},
{name:"Space", icon:"🚀", accent:"#60a5fa", accent2:"#9333ea", bg:"#020617", bg2:"#111827"},
{name:"Neon Pink", icon:"🩷", accent:"#ff1493", accent2:"#ff00ff", bg:"#180016", bg2:"#39002f"},
{name:"Neon Orange", icon:"🟠", accent:"#ff7a00", accent2:"#ff3d00", bg:"#1b0900", bg2:"#3d1600"},
{name:"Turquoise", icon:"🩵", accent:"#2dd4bf", accent2:"#06b6d4", bg:"#031916", bg2:"#063c38"},
{name:"Deep Blue", icon:"🔵", accent:"#2563eb", accent2:"#1d4ed8", bg:"#020b24", bg2:"#071b4c"},
{name:"Plasma", icon:"⚛️", accent:"#e879f9", accent2:"#22d3ee", bg:"#10041c", bg2:"#25104a"},
{name:"Matrix", icon:"💻", accent:"#22c55e", accent2:"#16a34a", bg:"#020d05", bg2:"#06200d"},
{name:"Holographic", icon:"✨", accent:"#67e8f9", accent2:"#f0abfc", bg:"#0a0a20", bg2:"#202047"},
{name:"Aurora", icon:"🌈", accent:"#34d399", accent2:"#818cf8", bg:"#03131a", bg2:"#11254a"},
{name:"Royal Purple", icon:"🔱", accent:"#7c3aed", accent2:"#c026d3", bg:"#10051f", bg2:"#2b0d46"},
{name:"Neon Blue", icon:"🔷", accent:"#00bfff", accent2:"#0066ff", bg:"#020b18", bg2:"#06234d"},
{name:"Dark Red", icon:"🟥", accent:"#ff3333", accent2:"#8b0000", bg:"#120303", bg2:"#2d0606"},
{name:"Diamond", icon:"💎", accent:"#93c5fd", accent2:"#c4b5fd", bg:"#07111f", bg2:"#172554"}
];

/* =========================================================
DISPLAY MODES
========================================================= */

const MODES = [
{
name:"Dark Mode",
icon:"🌙",
className:"dark"
},
{
name:"Light Mode",
icon:"☀️",
className:"light"
},
{
name:"OLED Black",
icon:"⚫",
className:"oled"
},
{
name:"Glass Mode",
icon:"🪟",
className:"glass"
},
{
name:"Neon Mode",
icon:"💡",
className:"neon"
},
{
name:"Focus Mode",
icon:"🎯",
className:"focus"
},
{
name:"3D Mode",
icon:"🧊",
className:"threeD"
}
];

/* =========================================================
PAGE NAVIGATION
========================================================= */

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
top:0,
behavior:"smooth"
});

if (pageId === "youtube") {
loadYouTubeLive();
}
}

/* =========================================================
SIDEBAR
========================================================= */

function toggleSidebar() {

const sidebar =
document.getElementById("sidebar");

if (sidebar) {
sidebar.classList.toggle("open");
}
}

/* =========================================================
LIGHT / DARK
========================================================= */

function toggleLightDark() {

const isLight =
document.body.classList.toggle("light");

localStorage.setItem(
"mlLightMode",
isLight ? "light" : "dark"
);

if (isLight) {
setDisplayMode("light", false);
} else {
setDisplayMode("dark", false);
}
}

/* =========================================================
APPLY THEME
========================================================= */

function applyTheme(theme, save = true) {

if (!theme) return;

const root =
document.documentElement;

root.style.setProperty("--accent", theme.accent);
root.style.setProperty("--accent2", theme.accent2);
root.style.setProperty("--bg", theme.bg);
root.style.setProperty("--bg2", theme.bg2);

document.body.dataset.theme =
theme.name;

if (save) {
localStorage.setItem(
"mlSelectedTheme",
theme.name
);
}

updateThemeButtons(theme.name);
}

/* =========================================================
SELECT THEME BY NAME
========================================================= */

function selectTheme(name) {

const theme =
THEMES.find(t => t.name === name);

if (!theme) return;

applyTheme(theme, true);

showThemeMessage(
"🎨 " + theme.name + " theme applied!"
);
}

/* =========================================================
THEME BUTTONS
========================================================= */

function updateThemeButtons(activeName) {

document.querySelectorAll(".theme-card")
.forEach(card => {

  if (
    card.dataset.theme === activeName
  ) {
    card.classList.add("selected");
  } else {
    card.classList.remove("selected");
  }

});

}

/* =========================================================
DISPLAY MODE
========================================================= */

function setDisplayMode(mode, save = true) {

document.body.classList.remove(
"light",
"oled",
"glass",
"neon",
"focus",
"threeD"
);

if (mode !== "dark") {
document.body.classList.add(mode);
}

if (save) {
localStorage.setItem(
"mlDisplayMode",
mode
);
}

updateModeButtons(mode);
}

/* =========================================================
MODE BUTTONS
========================================================= */

function updateModeButtons(activeMode) {

document.querySelectorAll(".mode-card")
.forEach(card => {

  if (
    card.dataset.mode === activeMode
  ) {
    card.classList.add("selected");
  } else {
    card.classList.remove("selected");
  }

});

}

/* =========================================================
CREATE 35 THEME CARDS
========================================================= */

function createThemeCards() {

const container =
document.getElementById("themeList");

if (!container) return;

container.innerHTML = "";

THEMES.forEach(theme => {

const card =
  document.createElement("button");

card.className = "theme-card";

card.dataset.theme =
  theme.name;

card.type = "button";

card.style.background =
  `linear-gradient(135deg,
    ${theme.accent},
    ${theme.accent2})`;

card.innerHTML = `
  <span style="font-size:25px">
    ${theme.icon}
  </span>
  <br>
  <span>${theme.name}</span>
`;

card.addEventListener(
  "click",
  () => selectTheme(theme.name)
);

container.appendChild(card);

});

updateThemeButtons(
localStorage.getItem("mlSelectedTheme") ||
THEMES[0].name
);
}

/* =========================================================
CREATE DISPLAY MODE CARDS
========================================================= */

function createModeCards() {

const container =
document.getElementById("modeList");

if (!container) return;

container.innerHTML = "";

MODES.forEach(mode => {

const card =
  document.createElement("button");

card.className =
  "theme-card mode-card";

card.dataset.mode =
  mode.className;

card.type = "button";

card.innerHTML = `
  <span style="font-size:25px">
    ${mode.icon}
  </span>
  <br>
  <span>${mode.name}</span>
`;

card.addEventListener(
  "click",
  () => {

    setDisplayMode(
      mode.className,
      true
    );

    showThemeMessage(
      "⚙️ " + mode.name + " activated!"
    );

  }
);

container.appendChild(card);

});

updateModeButtons(
localStorage.getItem("mlDisplayMode") ||
"dark"
);
}

/* =========================================================
THEME MESSAGE
========================================================= */

function showThemeMessage(message) {

let box =
document.getElementById("themeMessage");

if (!box) {

box =
  document.createElement("div");

box.id =
  "themeMessage";

box.style.position =
  "fixed";

box.style.right =
  "20px";

box.style.bottom =
  "20px";

box.style.zIndex =
  "99999";

box.style.padding =
  "14px 20px";

box.style.borderRadius =
  "14px";

box.style.background =
  "rgba(0,0,0,.85)";

box.style.color =
  "#fff";

box.style.fontWeight =
  "900";

box.style.boxShadow =
  "0 10px 35px rgba(0,0,0,.35)";

document.body.appendChild(box);

}

box.textContent =
message;

clearTimeout(
window.themeMessageTimer
);

window.themeMessageTimer =
setTimeout(() => {
box.remove();
}, 1800);
}

/* =========================================================
LOAD SAVED THEME / MODE
========================================================= */

function loadSavedAppearance() {

const savedTheme =
localStorage.getItem(
"mlSelectedTheme"
);

const theme =
THEMES.find(
t => t.name === savedTheme
);

applyTheme(
theme || THEMES[0],
false
);

const savedMode =
localStorage.getItem(
"mlDisplayMode"
) || "dark";

setDisplayMode(
savedMode,
false
);
}

/* =========================================================
GLOBAL SEARCH
========================================================= */

function globalSearch() {

const input =
document.getElementById(
"globalSearch"
);

if (!input) return;

const q =
input.value.toLowerCase().trim();

if (!q) return;

if (
q.includes("book") ||
q.includes("notes") ||
q.includes("किताब")
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

/* =========================================================
YOUTUBE SEARCH
========================================================= */

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
"_blank"
);
}

function searchYouTube() {
youtubeSearch();
}

/* =========================================================
YOUTUBE LIVE
========================================================= */

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
    "/api/youtube-live"
  );

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

    const title =
      escapeHTML(
        video.title ||
        "Live Class"
      );

    const channel =
      escapeHTML(
        video.channelTitle ||
        ""
      );

    const thumbnail =
      escapeHTML(
        video.thumbnail ||
        ""
      );

    card.innerHTML = `
      <img
        src="${thumbnail}"
        alt="YouTube Live"
      >

      <h3>${title}</h3>

      <p>${channel}</p>

      <button
        class="main-btn"
        type="button"
      >
        ▶️ Play Live
      </button>

      <button
        class="secondary-btn"
        type="button"
      >
        💬 YouTube
      </button>
    `;

    const buttons =
      card.querySelectorAll(
        "button"
      );

    buttons[0].onclick =
      () => playLive(videoId);

    buttons[1].onclick =
      () => {

        window.open(
          video.url ||
          `https://www.youtube.com/watch?v=${videoId}`,
          "_blank"
        );

      };

    container.appendChild(card);
  }
);

}

catch (error) {

console.error(
  "YouTube Error:",
  error
);

status.innerText =
  "⚠️ YouTube Live load नहीं हो सकी।";

}
}

/* =========================================================
PLAY YOUTUBE
========================================================= */

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
behavior:"smooth",
block:"center"
});

const chat =
document.getElementById(
"youtubeChat"
);

if (chat) {

chat.innerHTML = `
  <h3>💬 Live Chat</h3>

  <p class="section-subtitle">
    YouTube पर live chat खोलने के लिए नीचे button दबाएँ।
  </p>

  <button
    class="main-btn"
    type="button"
    onclick="window.open(
      'https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}',
      '_blank'
    )"
  >
    💬 Open YouTube Live Chat
  </button>
`;

}
}

/* =========================================================
AI DOUBT SOLVER
========================================================= */

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
"🤖 AI सोच रहा है...";

try {

const response =
  await fetch(
    "/api/chat",
    {
      method:"POST",

      headers:{
        "Content-Type":
          "application/json"
      },

      body:JSON.stringify({
        message:question
      })
    }
  );

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

catch(error) {

console.error(
  "AI Error:",
  error
);

answerBox.innerText =
  "❌ AI Error: " +
  (error.message ||
  "Unknown error");

}
}

/* =========================================================
TELEGRAM
========================================================= */

function openTelegram() {

window.open(
"https://t.me/Yashpal_aagri",
"_blank"
);
}

/* =========================================================
PARTICLES
========================================================= */

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

/* =========================================================
ADD EXTRA MODE STYLES
========================================================= */

function addModeStyles() {

if (
document.getElementById(
"dynamicModeStyles"
)
) {
return;
}

const style =
document.createElement(
"style"
);

style.id =
"dynamicModeStyles";

style.textContent = `

body.oled {
  --bg:#000000;
  --bg2:#000000;
}

body.glass .feature-card,
body.glass .hero,
body.glass .youtube-box,
body.glass .ai-box,
body.glass .progress-box {
  backdrop-filter:blur(25px);
  background:rgba(255,255,255,.06);
}

body.neon .feature-card,
body.neon .hero,
body.neon .theme-card {
  box-shadow:
    0 0 18px var(--accent),
    0 0 40px rgba(255,255,255,.05);
}

body.focus #particles {
  display:none;
}

body.focus .feature-card {
  transform:none!important;
}

body.threeD .feature-card {
  transform-style:preserve-3d;
  perspective:1000px;
}

body.threeD .feature-card:hover {
  transform:
    translateY(-10px)
    rotateX(6deg)
    rotateY(-6deg);
}

.theme-card.selected {
  outline:
    3px solid var(--accent);
  outline-offset:3px;
  transform:scale(1.04);
}

.mode-card.selected {
  outline:
    3px solid var(--accent);
  outline-offset:3px;
}

#themeList,
#modeList {
  padding-bottom:20px;
}

`;

document.head.appendChild(
style
);
}

/* =========================================================
KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
"keydown",
event => {

if (
  (event.ctrlKey ||
   event.metaKey) &&
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

/* =========================================================
START APP
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {

createParticles();

addModeStyles();

createThemeCards();

createModeCards();

loadSavedAppearance();

console.log(
  "🚀 Mission Lakshya NEET 2027 loaded!"
);

console.log(
  "🎨 35 Themes loaded:",
  THEMES.length
);

console.log(
  "⚙️ Display Modes loaded:",
  MODES.length
);

}
);
