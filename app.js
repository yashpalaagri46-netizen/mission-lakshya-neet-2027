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
    options: ["m/s", "kg
