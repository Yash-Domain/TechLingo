import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Day() {
  const { day } = useParams();
  const navigate = useNavigate();

  // Optional safety: invalid day
  useEffect(() => {
    const dayNum = Number(day);
    if (!dayNum || dayNum < 1 || dayNum > 7) {
      navigate("/dashboard", { replace: true });
    }
  }, [day, navigate]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
      <div className="rounded-2xl bg-zinc-900/80 border border-white/10 p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Day {day}
        </h1>

        <p className="text-zinc-400">
          Day content will appear here.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 text-indigo-400 hover:text-indigo-300 transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}
