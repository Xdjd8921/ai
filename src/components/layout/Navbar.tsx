import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Video, LayoutDashboard, Upload as UploadIcon, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navItems = [
    { name: "Enhance", path: "/upload", icon: UploadIcon },
    { name: "My Projects", path: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 h-16 glass px-4 md:px-8 flex items-center justify-between",
      isHome ? "bg-transparent border-transparent" : "bg-dark-bg/80 border-b border-glass-border"
    )}>
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.5)] group-hover:scale-110 transition-transform">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter gradient-text">CINEAI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "relative text-sm font-medium hover:text-neon-blue transition-colors",
                  location.pathname === item.path ? "text-neon-blue" : "text-gray-400"
                )}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-neon-blue/10 rounded-md -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-gray-400 hover:text-white">Sign In</Button>
          </Link>
          <Link to="/upload">
            <Button className="bg-neon-blue text-black hover:bg-neon-blue/90 font-semibold shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass w-48 mt-2 animate-in fade-in zoom-in-95 duration-200">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link to={item.path} className="flex items-center gap-2 cursor-pointer">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link to="/login" className="flex items-center gap-2 cursor-pointer text-neon-blue">
                  Sign In
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
