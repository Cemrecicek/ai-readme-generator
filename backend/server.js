import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 HuggingFace router (OpenAI compatible)
const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

app.post("/generate", async (req, res) => {
  const { projectName, description, tags } = req.body;

  const prompt = `
You are a senior developer.

Write a COMPLETE and professional README.md.

IMPORTANT:
- Use ONLY markdown headings (#, ##, ###)
- Do NOT use === or ** instead of headings
- Use bullet points with '-'
- Make it detailed and realistic

Include:
- Title
- Description
- Features
- Installation
- Usage
- Tech Stack
- License

Project Name: ${projectName}
Description: ${description}
Tech Stack: ${tags.join(", ")}

Return ONLY markdown.
`;

  try {
    const completion = await client.chat.completions.create({
      model: "moonshotai/Kimi-K2-Instruct-0905",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = completion.choices?.[0]?.message?.content;

    res.json({
      result: result || "No response",
    });
  } catch (err) {
    console.error("AI ERROR:", err);

    res.status(500).json({
      result: "AI failed. Please try again.",
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});