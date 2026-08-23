export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "सवाल लिखिए।"
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY Vercel में नहीं मिली।"
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        encodeURIComponent(apiKey),
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          system_instruction: {
            parts: [
              {
                text:
                  "You are Mission Lakshya NEET 2027 AI Tutor. " +
                  "Help students with NEET Physics, Chemistry and Biology. " +
                  "Explain concepts clearly in simple Hindi. " +
                  "For numerical questions, explain step by step. " +
                  "Give educational answers suitable for students."
              }
            ]
          },

          contents: [
            {
              role: "user",

              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "Gemini API में समस्या हुई।"
      });
    }

    const answer =
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("") ||
      "AI से जवाब नहीं मिला।";

    return res.status(200).json({
      answer
    });

  } catch (error) {

    console.error("Gemini Error:", error);

    return res.status(500).json({
      error: "AI server में समस्या हुई।"
    });
  }
}
