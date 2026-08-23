module.exports = async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      answer: "Only POST request allowed."
    });

  }

  try {

    const question =
      req.body?.question?.trim();

    if (!question) {

      return res.status(400).json({
        answer: "कृपया अपना सवाल लिखें।"
      });

    }

    const apiKey =
      process.env.OPENAI_API_KEY;

    if (!apiKey) {

      return res.status(500).json({
        answer:
          "AI API key अभी Vercel में सेट नहीं है।"
      });

    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "Bearer " + apiKey
        },

        body: JSON.stringify({

          model: "gpt-5.6",

          instructions:
            `You are Mission Lakshya NEET 2027 AI Tutor.

Help students with:
Physics
Chemistry
Biology

Answer in simple Hindi.

For numerical questions:
1. Given data
2. Formula
3. Calculation
4. Final answer

Explain concepts clearly.
Do not pretend to know information you are unsure about.
Keep answers educational and suitable for students.`,

          input: question

        })

      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      console.error(data);

      return res.status(500).json({
        answer:
          "AI service से जवाब नहीं मिला।"
      });

    }

    const answer =
      data.output_text ||
      "AI ने कोई उत्तर नहीं दिया।";

    return res.status(200).json({
      answer
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      answer:
        "AI server में समस्या आ गई।"
    });

  }

};
