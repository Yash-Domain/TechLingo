import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { Key, Cpu, Lock } from "lucide-react"; 

export default function Settings() {
  const navigate = useNavigate();

  // 1. Try to get name from localStorage first for instant load
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");
  
  const [activeSection, setActiveSection] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 2. Fetch fresh user info from the new /api/settings endpoint
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await apiRequest("/api/settings"); 
        
        // Based on your Postman screenshot, the structure is data.user.username
        if (data && data.user && data.user.username) {
          setUsername(data.user.username);
          // Keep localStorage in sync
          localStorage.setItem("username", data.user.username);
        }
      } catch (err) {
        console.warn("Could not fetch latest user details, using cached name.", err);
      }
    }
    fetchUser();
  }, []);

  async function handleSave(payload) {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Sending updates to the same endpoint (PUT)
      await apiRequest("/api/settings", {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      setSuccess("Settings updated successfully");
      
      // Clear sensitive fields on success
      setApiKey("");
      setModel("");
      setPassword("");
      setActiveSection(null);
    } catch (err) {
      setError(err.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  }

  // Common styles for inputs
  const inputClasses = "w-full rounded-lg bg-zinc-950 border border-zinc-700 p-3 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600 rounded-full blur-[128px] opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full blur-[96px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-20"></div>

        <div className="relative rounded-2xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-8 shadow-2xl space-y-8">
          
          {/* -------- PROFILE HEADER -------- */}
          <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] mb-3 shadow-lg shadow-purple-500/20">
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            
            {/* Username Display */}
            <h2 className="text-2xl font-bold text-white tracking-wide">{username}</h2>
            <p className="text-zinc-500 text-sm font-medium">Account Settings</p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent w-full"></div>

          {/* -------- OPTION LIST -------- */}
          {!activeSection && (
            <div className="space-y-3">
              <Option onClick={() => setActiveSection("api")}>
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Key size={18} />
                </div>
                <span className="font-medium">Change API Key</span>
              </Option>
              <Option onClick={() => setActiveSection("model")}>
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Cpu size={18} />
                </div>
                <span className="font-medium">Change Model</span>
              </Option>
              <Option onClick={() => setActiveSection("password")}>
                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                  <Lock size={18} />
                </div>
                <span className="font-medium">Change Password</span>
              </Option>
            </div>
          )}

          {/* -------- API KEY SECTION -------- */}
          {activeSection === "api" && (
            <Section
              title="Change API Key"
              onBack={() => setActiveSection(null)}
              onSave={() => handleSave({ openrouterApiKey: apiKey })}
              loading={loading}
            >
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 ml-1">New OpenRouter API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-or-..."
                  className={inputClasses}
                />
              </div>
            </Section>
          )}

          {/* -------- MODEL SECTION -------- */}
          {activeSection === "model" && (
            <Section
              title="Change Model"
              onBack={() => setActiveSection(null)}
              onSave={() => handleSave({ model })}
              loading={loading}
            >
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 ml-1">Model Name</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. deepseek/deepseek-r1"
                  className={inputClasses}
                />
              </div>
            </Section>
          )}

          {/* -------- PASSWORD SECTION -------- */}
          {activeSection === "password" && (
            <Section
              title="Change Password"
              onBack={() => setActiveSection(null)}
              onSave={() => handleSave({ password })}
              loading={loading}
            >
              <div className="space-y-2">
                <label className="text-sm text-zinc-400 ml-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className={inputClasses}
                />
              </div>
            </Section>
          )}

          {/* Status Messages */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-in fade-in zoom-in-95">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-center animate-in fade-in zoom-in-95">
              {success}
            </div>
          )}

          {/* Back to Dashboard Link */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-sm text-zinc-400 hover:text-white pt-2 transition-colors flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> 
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ SMALL COMPONENTS ------------------ */

function Option({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 rounded-xl bg-zinc-950/40 border border-zinc-800 p-3 text-left text-zinc-100 hover:border-indigo-500/50 hover:bg-zinc-800/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 group"
    >
      {children}
      <span className="ml-auto text-zinc-600 group-hover:text-indigo-400 transition-colors">→</span>
    </button>
  );
}

function Section({ title, children, onBack, onSave, loading }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      {children}

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}