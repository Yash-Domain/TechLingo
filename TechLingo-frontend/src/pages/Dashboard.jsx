import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ------------------ LOAD PROGRESS ------------------ */
  useEffect(() => {
    async function loadProgress() {
      try {
        const data = await apiRequest("/api/progress");
        setCompletedDays((data.completedDays || []).map(Number));
      } catch (err) {
        console.error(err);
        setError("Failed to load progress");
      } finally {
        setLoading(false);
      }
    }
    loadProgress();
  }, []);

  /* ------------------ LOGOUT CONFIRM ------------------ */
  function confirmLogout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/"); 
  }

  /* ------------------ DAY LOGIC ------------------ */
  const TOTAL_DAYS = 7;
  const lastCompletedDay =
    completedDays.length > 0 ? Math.max(...completedDays) : 0;

  const isCourseCompleted = completedDays.length === TOTAL_DAYS;
  const currentDay = isCourseCompleted ? null : lastCompletedDay + 1;

  const days = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);

  // Calculate Percentage
  const progressPercentage = Math.round((completedDays.length / TOTAL_DAYS) * 100);

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
          Loading your roadmap…
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

  return (
    <PageWrapper>
      {/* Top bar */}
      <div className="relative z-10 flex justify-end gap-6 p-6">
        <button
          onClick={() => navigate("/settings")}
          className="text-sm text-zinc-300 hover:text-white transition cursor-pointer"
        >
          Settings
        </button>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-sm text-red-400 hover:text-red-300 transition cursor-pointer"
        >
          Sign out
        </button>
      </div>

      {/* Dashboard card */}
      <div className="flex min-h-[80vh] items-center justify-center pb-12"> {/* Added padding bottom for mobile scroll */}
        <div className="relative w-full max-w-5xl">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-20"></div>

          <div className="relative rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-10 shadow-2xl">
            
            {/* Header Section */}
            <div className="mb-8">
              {isCourseCompleted ? (
                <>
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    🎉 Congratulations, Course Completed
                  </h1>
                  <p className="text-zinc-400 mt-2">
                    You’ve successfully completed the TechLingo learning path.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    Your Learning Roadmap
                  </h1>
                  <p className="text-zinc-400 mt-2">
                    Continue where you left off
                  </p>
                </>
              )}

              {/* Progress Bar Section */}
              <div className="mt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Course Progress</span>
                  <span className="text-lg font-bold text-indigo-400">{progressPercentage}%</span>
                </div>
                <div className="w-full h-3 bg-zinc-950/50 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* ✅ FIXED: Responsive Grid */}
            {/* Mobile: 2 cols | Tablet: 4 cols | Desktop: 7 cols */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-6">
              {days.map((day) => {
                const isCompleted = completedDays.includes(day);
                const isCurrent = currentDay !== null && day === currentDay;
                const isClickable = isCompleted || isCurrent;

                let cardStyle = "bg-zinc-950/70 border-zinc-800 text-zinc-400";
                let labelStyle = "text-zinc-400";

                if (isCompleted) {
                  cardStyle = "bg-zinc-950/70 border-emerald-500/60 text-emerald-400";
                  labelStyle = "text-emerald-400";
                }

                if (isCurrent) {
                  cardStyle = "bg-indigo-950/60 border-indigo-500/70 text-indigo-300";
                  labelStyle = "text-indigo-300";
                }

                return (
                  <div
                    key={day}
                    onClick={() => isClickable && navigate(`/day/${day}`)}
                    className={`h-24 md:h-28 rounded-2xl border flex flex-col items-center justify-center transition
                      ${isClickable ? "cursor-pointer hover:scale-[1.03]" : "opacity-60"}
                      ${cardStyle}`}
                  >
                    <span className={`text-base md:text-lg font-semibold ${labelStyle}`}>
                      Day {day}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] md:text-xs mt-1 text-indigo-400">
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-white/10 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white">
              Sign out?
            </h2>
            <p className="text-sm text-zinc-400 mt-2">
              You will be logged out of TechLingo.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-500 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}