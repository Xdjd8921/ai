import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import Upload from "@/pages/Upload";
import Editor from "@/pages/Editor";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import AIAssistant from "@/components/AIAssistant";
import Navbar from "@/components/layout/Navbar";

export default function App() {
  return (
    <Router>
      <TooltipProvider>
        <div className="min-h-screen bg-dark-bg text-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login isRegister />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <AIAssistant />
          <Toaster theme="dark" position="top-right" closeButton />
        </div>
      </TooltipProvider>
    </Router>
  );
}
