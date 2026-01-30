import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { Terminal, Cpu, ArrowRightLeft, Lightbulb, CheckCircle2, Circle } from 'lucide-react';

export default function Day() {
  const { day } = useParams();
  const navigate = useNavigate();

  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkedMap, setCheckedMap] = useState({});

  /* ------------------ FETCH DAY ------------------ */
  useEffect(() => {
    async function loadDay() {
      try {
        const data = await apiRequest(`/api/day/${day}`);
        setDayData(data);

        // Load checkbox states from localStorage
        const initialChecked = {};
        data.practice_questions.forEach((q) => {
          const key = `techlingo:day:${day}:question:${q._id}`;
          initialChecked[q._id] = localStorage.getItem(key) === "true";
        });
        setCheckedMap(initialChecked);
      } catch (err) {
        setError(err.message || "Failed to load day content");
      } finally {
        setLoading(false);
      }
    }
    loadDay();
  }, [day]);

  /* ------------------ TOGGLE CHECKBOX ------------------ */
  function toggleQuestion(questionId) {
    const key = `techlingo:day:${day}:question:${questionId}`;

    setCheckedMap((prev) => {
      const next = { ...prev, [questionId]: !prev[questionId] };
      localStorage.setItem(key, next[questionId]);
      return next;
    });
  }

  /* ------------------ HELPERS FOR CODE FORMATTING ------------------ */
  // Intelligently breaks lines on semicolons and comments for readability
  const formatCode = (code, type) => {
    let formatted = code || "";
    
    if (type === 'cpp') {
      // Break after semicolons, break before comments
      formatted = formatted.replace(/;/g, ';\n').replace(/\/\//g, '\n//');
    } else {
      // Break before python comments
      formatted = formatted.replace(/#/g, '\n#');
      // Also break on semicolons for Python/General text if they exist (common in one-liners)
      formatted = formatted.replace(/;/g, ';\n');
    }

    // Split into lines for individual rendering
    return formatted.split('\n').filter(line => line.trim() !== '');
  };

  const renderCodeLine = (line) => {
    // Check if line is a comment to apply different styling
    const isComment = line.trim().startsWith('//') || line.trim().startsWith('#');
    
    return (
      <div className={`${isComment ? 'text-emerald-400/80 italic' : 'text-zinc-100'}`}>
        {line}
      </div>
    );
  };

  /* ------------------ PAGE WRAPPER ------------------ */
  const PageWrapper = ({ children }) => (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden px-4 font-sans selection:bg-indigo-500/30">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-[96px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      {children}
    </div>
  );

  if (loading)
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center text-zinc-400 animate-pulse">
          Loading lesson content...
        </div>
      </PageWrapper>
    );

  if (error)
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center text-red-400">
          {error}
        </div>
      </PageWrapper>
    );

  const {
    title,
    core_concept,
    comparison,
    common_mistakes,
    practice_questions
  } = dayData;

  const completedCount = Object.values(checkedMap).filter(Boolean).length;

  return (
    <PageWrapper>
      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center p-6 max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-zinc-300 hover:text-white transition flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
        </button>
      </div>

      {/* Content */}
      <div className="flex justify-center pb-20">
        <div className="relative w-full max-w-5xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-20"></div>

          <div className="relative rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl space-y-16">
            
            {/* Header */}
            <div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-indigo-300 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20">
                Day {day}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
                {title}
              </h1>
            </div>

            {/* Core Concept */}
            <section className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                Core Concept
              </h2>
              <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800">
                <p className="text-indigo-300 text-lg font-medium mb-4 leading-relaxed">
                  {core_concept.summary}
                </p>
                <p className="text-zinc-400 leading-relaxed text-base">
                  {core_concept.detailed_explanation}
                </p>
              </div>
            </section>

            {/* Comparison (PROFESSIONAL DESIGN) */}
            <section>
              <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Language Architecture: Python vs C++
                </h2>
              </div>

              <div className="space-y-10">
                {comparison.map((item) => (
                  <div 
                    key={item._id} 
                    className="group rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden hover:border-zinc-700 transition-all duration-300 shadow-xl"
                  >
                    {/* Concept Title */}
                    <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/40 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                      <h3 className="text-zinc-100 font-semibold text-sm tracking-wide uppercase">
                        {item.concept}
                      </h3>
                    </div>

                    {/* Code Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
                      
                      {/* C++ Side */}
                      <div className="flex flex-col min-w-0">
                        <div className="px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/50 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Cpu className="w-4 h-4" />
                            <span className="text-xs font-bold tracking-wider">C++</span>
                          </div>
                        </div>
                        <div className="p-0 bg-[#0d0d0d] flex-1 overflow-x-auto">
                          <pre className="p-5 font-mono text-sm leading-7 whitespace-pre">
                            <code>
                              {formatCode(item.cpp, 'cpp').map((line, idx) => (
                                <div key={idx} className="w-max">
                                  {renderCodeLine(line)}
                                </div>
                              ))}
                            </code>
                          </pre>
                        </div>
                      </div>

                      {/* Python Side */}
                      <div className="flex flex-col min-w-0">
                        <div className="px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/50 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Terminal className="w-4 h-4" />
                            <span className="text-xs font-bold tracking-wider">PYTHON</span>
                          </div>
                        </div>
                        <div className="p-0 bg-[#0d0d0d] flex-1 overflow-x-auto">
                          <pre className="p-5 font-mono text-sm leading-7 whitespace-pre">
                            <code>
                              {formatCode(item.python, 'python').map((line, idx) => (
                                <div key={idx} className="w-max">
                                  {renderCodeLine(line)}
                                </div>
                              ))}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Mental Model Footer */}
                    <div className="relative px-6 py-5 bg-indigo-950/20 border-t border-indigo-500/20">
                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <Lightbulb className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
                            Mental Model
                          </p>
                          <p className="text-zinc-300 text-sm leading-relaxed opacity-90 font-medium">
                            {item.mental_model}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Mistakes */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-6 pl-2 border-l-4 border-red-500/50">
                Common Mistakes
              </h2>
              <div className="grid gap-4">
                {common_mistakes.map((m, i) => (
                  <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                    <span className="text-red-400 mt-1 font-bold">✕</span>
                    <span className="text-zinc-300">{m}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Practice Questions (UPDATED WITH CODE FORMATTING) */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                  Practice Questions
                </h2>
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {completedCount} / {practice_questions.length} Completed
                </div>
              </div>

              <div className="space-y-4">
                {practice_questions.map((q) => {
                  const isChecked = !!checkedMap[q._id];
                  
                  return (
                    <div
                      key={q._id}
                      onClick={() => toggleQuestion(q._id)}
                      className={`
                        cursor-pointer group relative rounded-2xl border px-5 py-5 transition-all duration-300
                        ${isChecked 
                          ? 'bg-emerald-950/20 border-emerald-500/30 hover:bg-emerald-950/30' 
                          : 'bg-zinc-950/50 border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-900/60'
                        }
                      `}
                    >
                      <div className="flex gap-4 items-start">
                        {/* Checkbox Icon */}
                        <div className={`mt-1 flex-shrink-0 transition-colors duration-300 ${isChecked ? 'text-emerald-400' : 'text-zinc-600 group-hover:text-indigo-400'}`}>
                          {isChecked ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Question Text - Formatted as Code */}
                          <div className={`font-mono text-sm leading-relaxed mb-3 ${isChecked ? 'text-zinc-400 line-through opacity-70' : 'text-zinc-100'}`}>
                             {/* Re-using formatCode to handle semicolons/multi-lines in questions */}
                             <div className="whitespace-pre-wrap break-words">
                               {formatCode(q.question, 'python').map((line, idx) => (
                                  <div key={idx} className="mb-0.5">
                                    {line}
                                  </div>
                               ))}
                             </div>
                          </div>
                          
                          {/* Expected Thinking */}
                          <div className={`flex gap-2 text-sm transition-all duration-500 ${isChecked ? 'text-emerald-400/70' : 'text-zinc-500'}`}>
                            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>{q.expected_thinking}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}