import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

async function handleSubmit(e) {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    await apiRequest("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        openrouterApiKey: apiKey, // ✅ FIXED
        model,
      }),
    });

    navigate("/login"); // ✅ correct flow
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden px-4">
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-[96px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-20"></div>

        <div className="relative rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Create Account
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Start your TechLingo journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg bg-zinc-950/50 border border-zinc-800 px-4 py-3 pr-12 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <input
              type="text"
              placeholder="OpenRouter API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
              className="w-full rounded-lg bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />

            <input
              type="text"
              placeholder="Model name (e.g. gpt-4o)"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="w-full rounded-lg bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Login redirect */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition"
              >
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
