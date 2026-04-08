import { useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";

type Props = {
  projectName: string;
  description: string;
  tags: string[];
  generatedMarkdown: string;
  loading: boolean;
  error: string;
  onRetry: () => void;
};

const markdownComponents: Components = {
  h1: (props) => (
    <h1 className="mt-0 mb-4 text-3xl font-bold text-white" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-3 text-2xl font-semibold text-white" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold text-white" {...props} />
  ),
  p: (props) => (
    <p className="my-3 leading-7 text-slate-300" {...props} />
  ),
  ul: (props) => (
    <ul className="my-3 list-disc pl-6 space-y-2 text-slate-300" {...props} />
  ),
  ol: (props) => (
    <ol className="my-3 list-decimal pl-6 space-y-2 text-slate-300" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  a: (props) => (
    <a className="text-indigo-400 underline hover:text-indigo-300" {...props} />
  ),
  code({ inline, children, ...props }: any) {
    return inline ? (
      <code className="bg-white/10 px-1 py-0.5 rounded text-pink-300" {...props}>
        {children}
      </code>
    ) : (
      <pre className="my-4 bg-slate-950/80 p-4 rounded-2xl overflow-x-auto">
        <code {...props}>{children}</code>
      </pre>
    );
  },
};

export default function PreviewPanel({
  generatedMarkdown,
  loading,
  error,
  onRetry,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"preview" | "raw">("preview");

  const markdownToShow = generatedMarkdown?.trim();

  const handleCopy = () => {
    if (!markdownToShow) return;

    navigator.clipboard.writeText(markdownToShow);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!markdownToShow) return;

    const blob = new Blob([markdownToShow], {
      type: "text/markdown",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#07111f] p-6">

      {/* HEADER */}
      <div className="mb-4 border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

        <span className="text-sm text-slate-400">README.md</span>

        <div className="flex flex-wrap items-center gap-2 justify-end">

          {/* TOGGLE */}
          <div className="flex bg-slate-800 rounded-lg overflow-hidden text-xs">
            <button
              onClick={() => setMode("preview")}
              className={`px-3 py-1 ${
                mode === "preview"
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400"
              }`}
            >
              Preview
            </button>

            <button
              onClick={() => setMode("raw")}
              className={`px-3 py-1 ${
                mode === "raw"
                  ? "bg-indigo-500 text-white"
                  : "text-slate-400"
              }`}
            >
              Raw
            </button>
          </div>

          {/* COPY */}
          <button
            onClick={handleCopy}
            disabled={!markdownToShow}
            className="text-[10px] sm:text-xs bg-slate-800 hover:bg-slate-700 px-2 sm:px-3 py-1 rounded-lg text-white disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* DOWNLOAD */}
          <button
            onClick={handleDownload}
            disabled={!markdownToShow}
            className="text-[10px] sm:text-xs bg-indigo-500 hover:bg-indigo-400 px-2 sm:px-3 py-1 rounded-lg text-white disabled:opacity-50"
          >
            Download
          </button>

        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-auto rounded-3xl border border-white/10 bg-[#07111f] p-6">

        {loading ? (
          <p className="text-slate-400">Generating README...</p>

        ) : error ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
            <p className="text-red-400 font-medium">{error}</p>

            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm"
            >
              Retry
            </button>
          </div>

        ) : !markdownToShow ? (
          <div className="flex items-center justify-center h-full text-slate-500 text-sm">
            No README generated yet. Click “Generate” to start.
          </div>

        ) : mode === "preview" ? (
          <div className="max-w-none">
            <ReactMarkdown components={markdownComponents}>
              {markdownToShow}
            </ReactMarkdown>
          </div>

        ) : (
          <pre className="text-sm text-slate-300 whitespace-pre-wrap leading-7">
            {markdownToShow}
          </pre>
        )}

      </div>
    </div>
  );
}