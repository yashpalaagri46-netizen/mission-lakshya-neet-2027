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

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY अभी Vercel में सेट नहीं है।"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-5.6",
          instructions:
            "You are Mission Lakshya NEET 2027 AI Tutor. Help students with NEET Physics, Chemistry and Biology. Explain concepts clearly in simple Hindi. For numerical questions, show steps. Give educational answers suitable for students.",
          input: message
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenAI API में समस्या हुई।"
      });
    }

    const answer =
      data.output_text ||
      "AI से जवाब नहीं मिला।";

    return res.status(200).json({
      answer
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "AI server में समस्या हुई।"
    });
  }
}
