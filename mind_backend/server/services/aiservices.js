const axios = require("axios");
import dotenv from 'dotenv';


/**
 * AI service function
 */
async function generateStudyPlanAI(subject, examDate) {

  const prompt = `
You are an expert study planner.

Create a DAILY study plan for:
Subject: ${subject}
Exam Date: ${examDate}

Rules:
- Output ONLY valid JSON
- No extra text
- Structure:
{
  "plan": [
    { "day": 1, "topic": "..." }
  ]
}
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const text = response.data.choices[0].message.content;
  return JSON.parse(text);
}

module.exports = generateStudyPlanAI;
