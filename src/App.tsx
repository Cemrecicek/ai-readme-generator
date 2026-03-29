import { useState } from "react";
import GeneratorForm from "./features/generator/GeneratorForm";
import AppLayout from "./layouts/AppLayout";
import PreviewPanel from "./features/generator/PreviewPanel";

export default function App() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  return (
    <AppLayout
      left={
        <GeneratorForm
          projectName={projectName}
          setProjectName={setProjectName}
          description={description}
          setDescription={setDescription}
          selectedTags={tags}
          setSelectedTags={setTags}
        />
      }
      right={
        <PreviewPanel
          projectName={projectName}
          description={description}
          tags={tags}
        />
      }
    />
  );
}