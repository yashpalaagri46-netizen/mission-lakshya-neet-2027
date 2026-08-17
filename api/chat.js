export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Mission Lakshya NEET 2027 AI Doubt Solver. Help students with Physics, Chemistry and Biology in simple Hindi/Hinglish. Explain answers clearly and do not invent facts."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.3
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "AI request failed"
      });
    }

    return res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "AI ने कोई जवाब नहीं दिया।"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server error"
    });
  }
      }
