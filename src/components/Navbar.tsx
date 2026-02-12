"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Leaf,
  Home,
  LayoutDashboard,
  CloudSun,
  Users,
  Github,
<<<<<<< HEAD
  LogOut,
  User as UserIcon,
=======
  MessageSquare, // Added for the Assistant icon
>>>>>>> bdb87470c9be20c1c6ffb7206356832f229fe756
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Navigation array with Assistant added
  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Analyzer", href: "/analyze", icon: <LayoutDashboard size={16} /> },
    { name: "Weather", href: "/weather", icon: <CloudSun size={16} /> },
    { name: "Assistant", href: "/chatbot", icon: <MessageSquare size={16} /> },
    { name: "Team", href: "/team", icon: <Users size={16} /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Branding/Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 text-emerald-400"
          >
            <Leaf size={24} />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter uppercase leading-none">
              AGRIVISION <span className="text-emerald-500">2.0</span>
            </span>
            <span className="text-xs font-bold text-emerald-500/50 uppercase tracking-[0.3em] mt-1">
              Null Resolver Labs
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.name} className="relative group/link">
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${isActive
                      ? "text-emerald-400"
                      : "text-gray-500 hover:text-white"
                    }`}
                >
                  <span
                    className={`${isActive ? "text-emerald-400" : "group-hover/link:text-emerald-400 transition-colors"}`}
                  >
                    {link.icon}
                  </span>
                  {link.name}

                  {/* Visual Active/Hover Indicator */}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-emerald-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover/link:w-full"
                      }`}
                  />
                </Link>
              </div>
            );
          })}

          <div className="h-6 w-px bg-white/10 mx-2" />

          {/* Auth Section */}
          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-white/10 hover:border-emerald-500/50 bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                      <UserIcon size={16} />
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white truncate max-w-[100px]">
                      {user.name}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-xl"
                      >
                        <div className="p-3 border-b border-white/5">
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Signed in as</p>
                          <p className="text-sm text-white font-medium truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-2 p-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </>
          )}

          {/* GitHub Project Link */}
          {/* <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-panel border-white/10 hover:border-emerald-500/50 text-gray-400 hover:text-white transition-all rounded-full"
          >
            <Github size={18} />
          </a> */}
        </div>
      </div>
    </nav>
  );
}
