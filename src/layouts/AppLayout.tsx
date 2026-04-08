import logo from "../assets/md_logo.png"

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  onGenerate: () => void;
  loading: boolean;
  canGenerate: boolean;
};

export default function AppLayout({
  left,
  right,
  onGenerate,
  loading,
  canGenerate
}: Props) {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100 flex flex-col">

      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-white/5 backdrop-blur px-4 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 object-contain drop-shadow-lg transition hover:scale-105"
          />

          <div className="leading-tight">
            <h1 className="text-xl font-semibold">
              README <span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-xs text-slate-400">
              AI-powered documentation
            </p>
          </div>

        </div>

        {/* RIGHT - BUTTON */}
        <button
          onClick={() => onGenerate()}
          disabled={loading||!canGenerate}
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Generating
            </span>
          ) : "Generate"}
        </button>

      </header>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto w-full px-4 py-6">

        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT */}
          <div className="w-full lg:w-1/2">
            {left}
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-1/2">
            {right}
          </div>

        </div>

      </div>

    </main>
  );
}