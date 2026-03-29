type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export default function AppLayout({ left, right }: Props) {
  return (
    <main className="h-screen bg-[#050816] text-slate-100 flex flex-col">
      
      {/* HEADER */}
      <header className="w-full border-b border-white/10 bg-white/5 backdrop-blur px-4 py-4 flex items-center justify-between">
  
  <div>
    <h1 className="text-xl font-semibold">README Generator</h1>
    <p className="text-sm text-slate-400">
      AI-powered documentation
    </p>
  </div>

  <button className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400">
    Generate
  </button>

</header>

      {/* CONTENT */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-4">
        <div className="flex h-full gap-4">
          <div className="w-1/2 h-full">{left}</div>
          <div className="w-1/2 h-full">{right}</div>
        </div>
      </div>

    </main>
  );
}