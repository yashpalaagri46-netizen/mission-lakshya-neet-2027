const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/ai", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({
        answer: "कृपया अपना सवाल लिखें।"
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
console.log("OPENAI_API_KEY मौजूद है:", !!apiKey);
    if (!apiKey) {
      return res.status(500).json({
        answer: "AI API key अभी सेट नहीं है।"
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        },

        body: JSON.stringify({
          model: "gpt-5.6",
          instructions:
            "You are Mission Lakshya NEET 2027 AI Tutor. Help with NEET Physics, Chemistry and Biology. Explain concepts clearly in simple Hindi. For numerical questions, show steps. Give educational answers suitable for students.",

          input: question
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return res.status(500).json({
        answer: "AI service से जवाब नहीं मिला।"
      });
    }

    const answer =
      data.output_text ||
      "AI ने कोई उत्तर नहीं दिया।";

    res.json({
      answer: answer
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      answer: "Server में समस्या आ गई।"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Mission Lakshya AI server running on port " + PORT);
});
