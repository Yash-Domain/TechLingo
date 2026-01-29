import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

/* -------- TEMP PLACEHOLDER COMPONENT -------- */
function Placeholder({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-300">
      <h1 className="text-2xl">{title}</h1>
    </div>
  );
}

/* -------- SIMPLE AUTH GUARD -------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* root */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* day page (SINGLE dynamic page) */}
        <Route
          path="/day/:day"
          element={
            <ProtectedRoute>
              <Placeholder title="Day Page (Coming Soon)" />
            </ProtectedRoute>
          }
        />

        {/* settings (placeholder for now) */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Placeholder title="Settings (Coming Soon)" />
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
