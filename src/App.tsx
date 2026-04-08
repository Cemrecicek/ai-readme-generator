import { useState } from "react";
import GeneratorForm from "./features/generator/GeneratorForm";
import AppLayout from "./layouts/AppLayout";
import PreviewPanel from "./features/generator/PreviewPanel";
import { generateReadme } from "./lib/api";

export default function App() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [generatedMarkdown, setGeneratedMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const demoMarkdown = `
# Task Manager App

A modern task management web application that helps users organize their daily tasks, track progress, and improve productivity. Designed with a clean and responsive interface, it provides a simple yet powerful way to manage workflows.

## Features
- Create, edit, and delete tasks
- Mark tasks as completed
- Filter tasks by status
- Responsive and clean UI
- Fast and intuitive user experience

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Node.js

## Installation

\`\`\`bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
npm install
npm run dev
\`\`\`

## Usage

1. Add a new task using the input field
2. Mark tasks as completed when done
3. Filter tasks based on their status
4. Manage your workflow efficiently

---

✨ This README was generated with AI README Generator
`;


  const handleGenerate = async (isDemo = false) => {

    setGeneratedMarkdown("");
    setLoading(true);
    setError("");

    if (!isDemo && (!projectName || !description)) {
      setError("Please fill project details first");
      setLoading(false);
      return;
    }

    if (isDemo) {
      setGeneratedMarkdown(demoMarkdown);
      setError("");
      setLoading(false);
      return;
    }


    try {
      const result = await generateReadme({
        projectName,
        description,
        tags,
      });
      console.log("RESULT:", result);

      if (!result || result.includes("failed")) {
        throw new Error("AI failed");
      }

      setGeneratedMarkdown(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);


  };

  return (
    <AppLayout
      onGenerate={handleGenerate}
      loading={loading}
      left={
        <GeneratorForm
          projectName={projectName}
          setProjectName={setProjectName}
          description={description}
          setDescription={setDescription}
          selectedTags={tags}
          setSelectedTags={setTags}
          onGenerate={handleGenerate}
        />
      }
      right={
        <PreviewPanel
          projectName={projectName}
          description={description}
          tags={tags}
          generatedMarkdown={generatedMarkdown}
          loading={loading}
          error={error}
          onRetry={handleGenerate}
        />
      }
    />
  );
}