import ReactMarkdown from "react-markdown";

type Props = {
  projectName: string;
  description: string;
  tags: string[];
};

export default function PreviewPanel({
  projectName,
  description,
  tags,
}: Props) {
  const markdown = `
# ${projectName || "Project Name"}

${description || "Project description..."}

${
  tags.length > 0
    ? `## Tech Stack

${tags.map((tag) => `- ${tag}`).join("\n")}`
    : ""
}
`;

  return (
    <div className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#07111f] p-6">
      
      {/* HEADER */}
      <div className="mb-4 border-b border-white/10 pb-4 flex justify-between items-center">
        <span className="text-sm text-slate-400">README.md</span>
      </div>

      {/* MARKDOWN CONTENT */}
      <div className="flex-1 overflow-auto prose prose-invert max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}