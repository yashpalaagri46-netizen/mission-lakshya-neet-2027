// Mission Lakshya – Aria AI
// NEET + JEE AI Doubt Solver
// API key is read ONLY from Vercel Environment Variables.

export default async function handler(req, res) {
  // ---------- CORS ----------
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ---------- METHOD ----------
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Only POST requests are allowed."
    });
  }

  // ---------- REQUEST ----------
  try {
    const body = req.body || {};

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const image =
      typeof body.image === "string"
        ? body.image
        : null;

    const language =
      typeof body.language === "string"
        ? body.language
        : "Hinglish";

    const subject =
      typeof body.subject === "string"
        ? body.subject
        : "General";

    if (!message && !image) {
      return res.status(400).json({
        success: false,
        error: "Question is empty."
      });
    }

    // ---------- API KEY ----------
    const API_KEY = process.env.AI_API_KEY;

    // API key अभी Vercel में नहीं है
    if (!API_KEY) {
      return res.status(200).json({
        success: true,
        demo: true,
        answer:
          "👋 Hi! Main Aria AI hoon.\n\n" +
          "AI backend abhi setup mode mein hai.\n\n" +
          "Vercel Project Settings → Environment Variables mein " +
          "`AI_API_KEY` add karne ke baad main NEET aur JEE ke " +
          "Physics, Chemistry, Biology aur Maths questions solve kar paungi.\n\n" +
          "📚 Main step-by-step explanation, formulas, concepts aur examples ke saath answer dungi."
      });
    }

    // ---------- PROVIDER ----------
    // OpenAI-compatible API endpoint.
    // API key source code mein nahi rakhi gayi hai.
    const API_URL =
      process.env.AI_API_URL ||
      "https://api.openai.com/v1/chat/completions";

    const MODEL =
      process.env.AI_MODEL ||
      "gpt-4o-mini";

    // ---------- SYSTEM PROMPT ----------
    const systemPrompt = `
You are Aria AI, the official AI study assistant of Mission Lakshya.

Mission:
Help students prepare for NEET and JEE.

Subjects:
Physics
Chemistry
Biology
Mathematics

Languages:
Hindi
English
Hinglish

Important behavior:
1. Explain concepts in a simple student-friendly way.
2. For numerical questions, show the formula, values, calculation and final answer.
3. Give step-by-step solutions.
4. Explain why each step is done.
5. Mention units wherever applicable.
6. For Chemistry, explain reactions, mole calculations, equations and concepts clearly.
7. For Biology, explain NCERT-oriented concepts clearly and accurately.
8. For Physics, show formulas, substitutions and units.
9. For Mathematics, show complete working and formulas.
10. If the student asks in Hindi, answer mainly in Hindi/Hinglish.
11. If the student asks in English, answer in English.
12. If the student uses Hinglish, answer in Hinglish.
13. Keep answers suitable for school/competitive-exam students.
14. Do not invent facts.
15. If a question is ambiguous, clearly state the assumption.
16. Use headings and bullet points when useful.
17. End difficult solutions with a short "Final Answer".
18. Never claim to have seen an image if no image was actually provided.
19. If an image is provided, analyze the visible question carefully.
20. Help with notes, revision, quizzes, DPPs and study planning when requested.

You are NOT a replacement for a teacher.
For medical or safety-related questions, provide educational information and encourage the student to consult a qualified adult/professional when appropriate.

Current subject: ${subject}
Preferred language: ${language}
`;

    // ---------- USER CONTENT ----------
    const userContent = [];

    if (message) {
      userContent.push({
        type: "text",
        text: message
      });
    }

    // Image support
    if (image) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: image
        }
      });
    }

    // ---------- AI REQUEST ----------
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.3,
        max_tokens: 2500,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userContent
          }
        ]
      })
    });

    // ---------- PROVIDER ERROR ----------
    if (!response.ok) {
      let errorText = "";

      try {
        const errorData = await response.json();
        errorText =
          errorData?.error?.message ||
          errorData?.message ||
          "";
      } catch {
        errorText = await response.text();
      }

      console.error("AI Provider Error:", errorText);

      return res.status(502).json({
        success: false,
        error:
          "Aria AI se response nahi mil paaya. " +
          "API configuration check karein."
      });
    }

    // ---------- RESPONSE ----------
    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      "";

    if (!answer) {
      return res.status(502).json({
        success: false,
        error: "AI ne empty response diya."
      });
    }

    return res.status(200).json({
      success: true,
      demo: false,
      answer: answer
    });

  } catch (error) {
    console.error("Aria AI Server Error:", error);

    return res.status(500).json({
      success: false,
      error:
        "Aria AI server mein temporary problem aa gayi. " +
        "Please try again."
    });
  }
}
