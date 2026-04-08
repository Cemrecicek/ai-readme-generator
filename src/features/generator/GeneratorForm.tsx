import { useState } from "react";
import { TECH_STACK } from "./techStack";




type Props = {
  projectName: string;
  setProjectName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  onGenerate?: () => void;
};

export default function GeneratorForm({
  projectName,
  setProjectName,
  description,
  setDescription,
  selectedTags,
  setSelectedTags,
  onGenerate,
}: Props) {
  const [customTag, setCustomTag] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    if (!customTag.trim()) return;

    if (!selectedTags.includes(customTag)) {
      setSelectedTags((prev) => [...prev, customTag]);
    }

    setCustomTag("");
  };

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };
  const fillDemoData = () => {
    setProjectName("Task Manager App");

    setDescription(
      "A modern task management web application that helps users organize their daily tasks, track progress, and improve productivity. It includes features like task creation, filtering, deadlines, and a clean user interface."
    );

    setSelectedTags([
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
    ]);
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#07111f] p-6">

      {/* TITLE */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Project Details</h2>
          <p className="text-slate-400 text-sm mt-1">
            Fill in your project information to generate a README
          </p>
        </div>

        <button
          onClick={() => {
            fillDemoData()
            setTimeout(() => onGenerate?.(), 200);
          }}
          className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition whitespace-nowrap self-start md:self-center"
        >
          Try Demo
        </button>
      </div>

      {/* FORM */}
      <div className="flex flex-col gap-6">

        {/* Project Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Project Name
          </label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="e.g. my-awesome-project"
            className="w-full box-border rounded-2xl bg-slate-900/80 border border-white/10 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="A brief description..."
            className="w-full box-border rounded-2xl bg-slate-900/80 border border-white/10 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block mb-3 text-sm font-medium">
            Tech Stack
          </label>

          {/* Tag List */}
          <div className="flex flex-wrap gap-3">
            {[...new Set([...TECH_STACK, ...selectedTags])].map((tag) => {
              const isSelected = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm transition
                    ${isSelected
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }
                  `}
                >
                  {tag}

                  {isSelected && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag);
                      }}
                      className="cursor-pointer text-white/80 hover:text-white"
                    >
                      ✕
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom Tag */}
          <div className="flex gap-2 mt-4">
            <input
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="Type tag name..."
              className="flex-1 rounded-xl bg-slate-900/80 border border-white/10 px-3 py-2 text-sm outline-none focus:border-indigo-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomTag();
                }
              }}
            />

            <button
              type="button"
              onClick={addCustomTag}
              className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-sm hover:bg-indigo-400"
            >
              Add
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}