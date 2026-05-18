import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import ConfirmEmail from "./pages/ConfirmEmail";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Layout from "./components/Layout";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </AuthProvider>
  );
}
