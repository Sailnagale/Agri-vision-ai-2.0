"use client";
// 1. Corrected import
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Binary, Cpu, Search, Dna } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";
import HolographicScanner from "@/components/HolographicScanner";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      <Background />

      {/* Decorative Neural Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase"
          >
            <Binary size={14} /> Neural Processing Unit
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
            Neural{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Scanner
            </span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.5em]">
            Optimized for Soybean & Grape Varieties
          </p>
        </div>

        {/* The Main Analysis Interface */}
        <div className="w-full max-w-4xl relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-2xl" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-500/30 rounded-br-2xl" />

          <div className="glass-panel p-6 md:p-12 bg-white/[0.02] border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(16,185,129,0.1)]">
            <HolographicScanner />
          </div>
        </div>

        {/* System Diagnostics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-4xl">
          {[
            
            { icon: <Zap size={16} />, label: "Latency", value: "< 0.8s" },
            {
              icon: <ShieldCheck size={16} />,
              label: "Validation",
              value: "Active",
            },
            {
              icon: <Search size={16} />,
              label: "Detection",
              value: "Multimodal",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-panel p-4 flex flex-col items-center gap-2 border-white/5 bg-white/[0.01]"
            >
              <div className="text-emerald-500 opacity-50">{stat.icon}</div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">
                {stat.label}
              </span>
              <span className="text-[10px] font-bold text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Protocol Note */}
        <div className="mt-20 flex items-center gap-3 text-gray-700">
          <Dna size={14} className="animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.5em]">
            Analysis Protocol v2.0.4 | Null Resolver Labs
          </span>
        </div>
      </section>
    </main>
  );
}
