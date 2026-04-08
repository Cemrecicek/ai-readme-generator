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

A modern task management web application that helps users organize their daily tasks, track progress, and improve productivity.

## Features
- Task creation & management
- Filtering and deadlines
- Clean and responsive UI

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Node.js
`;


  const handleGenerate = async (isDemo = false) => {

    if (isDemo) {
      setGeneratedMarkdown(demoMarkdown);
      setError("");
      setLoading(false);
      return;
    }


    setGeneratedMarkdown("");
    setLoading(true);
    setError("");

    try {
      const result = await generateReadme({
        projectName,
        description,
        tags,
      });

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