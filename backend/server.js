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
You are a professional software developer.

Write a clean and realistic README.md file.

IMPORTANT RULES:
- Only use the information provided below
- Do NOT add features, tools, or technologies that are not listed
- Do NOT assume anything extra
- Keep it simple, clear, and realistic
- Use proper markdown formatting

Include these sections:
- Title
- Description
- Features
- Tech Stack
- Installation
- Usage

Project Name: ${projectName}
Description: ${description}
Tech Stack: ${tags.join(", ")}

Write a concise and accurate README.
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