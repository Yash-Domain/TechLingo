import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function Day() {
  const { day } = useParams();
  const navigate = useNavigate();

  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ------------------ LOAD DAY ------------------ */
  useEffect(() => {
    async function loadDay() {
      try {
        const data = await apiRequest(`/api/day/${day}`);
        setDayData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load day content");
      } finally {
        setLoading(false);
      }
    }
    loadDay();
  }, [day]);

  /* ------------------ PAGE WRAPPER (SAME AS DASHBOARD) ------------------ */
  const PageWrapper = ({ children }) => (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden px-4">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-[96px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      {children}
    </div>
  );

  if (loading)
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center text-zinc-400">
          Loading lesson…
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

  return (
    <PageWrapper>
      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-zinc-300 hover:text-white transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Content card */}
      <div className="flex justify-center pb-20">
        <div className="relative w-full max-w-5xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-20"></div>

          <div className="relative rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-10 shadow-2xl space-y-10">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Day {day}: {title}
              </h1>
            </div>

            {/* Core Concept */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-2">
                Core Concept
              </h2>
              <p className="text-indigo-300 mb-3">
                {core_concept.summary}
              </p>
              <p className="text-zinc-400 leading-relaxed">
                {core_concept.detailed_explanation}
              </p>
            </section>

            {/* Comparison */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Python vs C++
              </h2>

              <div className="space-y-4">
                {comparison.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4"
                  >
                    <p className="text-indigo-300 font-semibold">
                      {item.concept}
                    </p>
                    <p className="text-zinc-400 mt-2">
                      <span className="text-zinc-300">C++:</span>{" "}
                      <code>{item.cpp}</code>
                    </p>
                    <p className="text-zinc-400">
                      <span className="text-zinc-300">Python:</span>{" "}
                      <code>{item.python}</code>
                    </p>
                    <p className="text-zinc-500 mt-2 italic">
                      {item.mental_model}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Mistakes */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                Common Mistakes
              </h2>
              <ul className="list-disc list-inside space-y-1 text-zinc-400">
                {common_mistakes.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </section>

            {/* Practice Questions */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">
                Practice Questions
              </h2>

              <div className="space-y-4">
                {practice_questions.map((q) => (
                  <div
                    key={q._id}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4"
                  >
                    <p className="text-zinc-200">❓ {q.question}</p>
                    <p className="text-zinc-500 mt-2">
                      💡 {q.expected_thinking}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
