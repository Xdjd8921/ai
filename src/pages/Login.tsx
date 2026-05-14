import React, { useState } from "react";
import { motion } from "motion/react";
import { Video, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login({ isRegister = false }: { isRegister?: boolean }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(isRegister ? "Account created! Welcome to CineAI." : "Signed in successfully!");
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-dark-bg relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.4)]">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tighter gradient-text">CINEAI</span>
          </Link>
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2 text-white">
            {isRegister ? "Join CineAI" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-sm font-light">
            {isRegister ? "Create your neural workspace today." : "Access your AI video projects."}
          </p>
        </div>

        <div className="glass p-8 rounded-3xl border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
               <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <Input className="glass border-white/5 focus:border-neon-blue/50 h-12" placeholder="Alex Rivera" required />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input type="email" className="glass border-white/5 focus:border-neon-blue/50 h-12 pl-12" placeholder="name@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
                {!isRegister && <a href="#" className="text-[10px] text-neon-blue hover:underline">Forgot password?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input type="password" className="glass border-white/5 focus:border-neon-blue/50 h-12 pl-12" placeholder="••••••••" required />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 mt-4 bg-neon-blue text-black hover:bg-neon-blue/90 font-black shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                isRegister ? "CREATE ACCOUNT" : "SIGN IN"
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#050505] px-3 text-gray-500 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="glass border-white/10 hover:bg-white/5 h-12 font-bold text-xs uppercase tracking-widest">
              Google
            </Button>
            <Button variant="outline" className="glass border-white/10 hover:bg-white/5 h-12 font-bold text-xs uppercase tracking-widest">
              Apple
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {isRegister ? "Already have an account?" : "New to CineAI?"}
            <Link to={isRegister ? "/login" : "/register"} className="text-neon-blue hover:underline ml-2 font-bold">
              {isRegister ? "Sign In" : "Register Now"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
