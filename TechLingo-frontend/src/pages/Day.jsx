import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

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

  /* ------------------ PAGE WRAPPER ------------------ */
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

  const completedCount = Object.values(checkedMap).filter(Boolean).length;

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

      {/* Content */}
      <div className="flex justify-center pb-20">
        <div className="relative w-full max-w-5xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-20"></div>

          <div className="relative rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-10 shadow-2xl space-y-12">
            {/* Header */}
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Day {day}: {title}
            </h1>

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

            {/* Comparison (SIDE BY SIDE) */}
            {/* Comparison (REDESIGNED) */}
<section>
  <h2 className="text-xl font-semibold text-white mb-6">
    Python vs C++
  </h2>

  <div className="space-y-6">
    {comparison.map((item) => (
      <div
        key={item._id}
        className="rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden"
      >
        {/* Concept title */}
        <div className="px-6 py-4 border-b border-zinc-800">
          <h3 className="text-indigo-300 font-semibold text-lg">
            {item.concept}
          </h3>
        </div>

        {/* Two-column comparison */}
        <div className="grid grid-cols-2">
          {/* C++ */}
          <div className="px-6 py-5 border-r border-zinc-800">
            <p className="text-sm uppercase tracking-wide text-zinc-400 mb-2">
              C++
            </p>
            <code className="text-zinc-300 leading-relaxed">
              {item.cpp}
            </code>
          </div>

          {/* Python */}
          <div className="px-6 py-5">
            <p className="text-sm uppercase tracking-wide text-zinc-400 mb-2">
              Python
            </p>
            <code className="text-zinc-300 leading-relaxed">
              {item.python}
            </code>
          </div>
        </div>

        {/* Mental model */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/40">
          <p className="text-zinc-500 italic">
            {item.mental_model}
          </p>
        </div>
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

      {/* Practice Questions (REDESIGNED) */}
<section>
  <h2 className="text-xl font-semibold text-white mb-2">
    Practice Questions
  </h2>

  <p className="text-zinc-500 mb-4">
    {completedCount} / {practice_questions.length} completed
  </p>

  {/* Header row */}
  <div className="grid grid-cols-[80px_1fr] px-4 py-2 text-sm text-zinc-400 border-b border-zinc-800">
    <span>Status</span>
    <span>Problem</span>
  </div>

  <div className="space-y-3 mt-3">
    {practice_questions.map((q) => (
      <div
        key={q._id}
        className="grid grid-cols-[80px_1fr] items-start rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-4"
      >
        {/* Status */}
        <div className="flex justify-center pt-1">
          <input
            type="checkbox"
            checked={!!checkedMap[q._id]}
            onChange={() => toggleQuestion(q._id)}
            className="h-5 w-5 accent-indigo-500"
          />
        </div>

        {/* Problem */}
        <div>
          <p className="text-zinc-200 text-base">
            {q.question}
          </p>
          <p className="text-zinc-500 mt-2 text-sm">
            💡 {q.expected_thinking}
          </p>
        </div>
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
