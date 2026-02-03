import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden px-6 font-sans selection:bg-indigo-500/30">
      {/* Background glow - more focused "scanning" feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[160px] opacity-20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[160px] opacity-10" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col min-h-screen">
        
        {/* TOP SECTION: Header / Navigation */}
        <nav className="flex justify-between items-center py-8">
          {/* Left: Brand */}
          <div className="text-2xl font-bold tracking-tighter text-white">
            Tech<span className="text-indigo-500">Lingo</span>
          </div>
          
          {/* Right: Actions */}
          <button 
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg bg-zinc-900 border border-white/10 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
          >
            Sign in
          </button>
        </nav>

        {/* Hero Section */}
        <div className="flex-grow flex flex-col justify-center max-w-3xl pt-20 pb-32">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Port your brain. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              C++ to Python.
            </span>
          </h1>
          <p className="mt-8 text-xl text-zinc-400 leading-relaxed max-w-2xl">
            You already know how to think in algorithms. We just help you translate the 
            <span className="text-zinc-200"> memory management</span> and <span className="text-zinc-200">boilerplate</span> of C++ 
            into Python's expressive syntax.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all transform hover:scale-105"
            >
              Start Mapping
            </button>
            <div className="text-sm text-zinc-500 font-mono">
              std::cout &lt;&lt; "Ready"; // print("Ready")
            </div>
          </div>
        </div>

        {/* The "Mapping" Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="group rounded-3xl bg-zinc-900/40 border border-white/5 p-8 hover:border-indigo-500/50 transition">
            <div className="w-10 h-10 mb-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Syntax Translation</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Forget "Hello World." Map <code>vectors</code> to <code>lists</code> and <code>maps</code> to <code>dicts</code> instantly.
            </p>
          </div>

          <div className="group rounded-3xl bg-zinc-900/40 border border-white/5 p-8 hover:border-cyan-500/50 transition">
            <div className="w-10 h-10 mb-6 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Memory Logic</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Understand how Python handles objects compared to C++ pointers and references. No more segmentation faults.
            </p>
          </div>

          <div className="group rounded-3xl bg-zinc-900/40 border border-white/5 p-8 hover:border-purple-500/50 transition">
            <div className="w-10 h-10 mb-6 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">OOP Paradigms</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Transition your Class structures, inheritance, and polymorphism from header files to Pythonic classes.
            </p>
          </div>
        </div>

        {/* Comparison Preview Section */}
        <div className="mt-32 p-1 border-t border-white/5">
          <div className="mt-20 flex flex-col md:flex-row gap-12 items-center">
             <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-6">Built for the "Native" C++ Speaker</h2>
                <p className="text-zinc-400 mb-6 italic">
                  "If you know how a <code>for</code> loop works in assembly or C++, you don't need to relearn the concept. You just need the new 'cultural' accent."
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Zero fluff for experienced devs
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Cognitive load reduction
                  </div>
                </div>
             </div>
             <div className="flex-1 bg-zinc-900 rounded-2xl p-6 border border-white/10 w-full font-mono text-xs shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-zinc-500">// C++ Approach</div>
                <div className="text-indigo-300">for(int i=0; i&lt;n; ++i) &#123; ... &#125;</div>
                <div className="my-4 text-zinc-500"># Python Mapping</div>
                <div className="text-emerald-300">for i in range(n): ...</div>
             </div>
          </div>
        </div>

        {/* Final Footer - Real World Style */}
        <footer className="mt-40 border-t border-white/5 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} TechLingo · Designed for Systems Thinkers
          </div>
          
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>Feedback & Suggestions:</span>
            <a 
              
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              yashpawde10@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}