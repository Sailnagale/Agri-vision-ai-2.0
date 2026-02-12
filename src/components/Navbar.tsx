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
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  // Navigation array with Team moved to the last position
  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Analyzer", href: "/analyze", icon: <LayoutDashboard size={16} /> },
    { name: "Weather", href: "/weather", icon: <CloudSun size={16} /> },
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
            <span className="text-[8px] font-bold text-emerald-500/50 uppercase tracking-[0.3em] mt-1">
              Null Resolver Labs
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                  isActive
                    ? "text-emerald-400"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                <span
                  className={`${isActive ? "text-emerald-400" : "group-hover:text-emerald-400 transition-colors"}`}
                >
                  {link.icon}
                </span>
                {link.name}

                {/* Visual Active/Hover Indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-emerald-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          <div className="h-6 w-px bg-white/10 mx-2" />

          {/* GitHub Project Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-panel border-white/10 hover:border-emerald-500/50 text-gray-400 hover:text-white transition-all rounded-full"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
