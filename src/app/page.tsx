"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Languages,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";
import HolographicScanner from "@/components/HolographicScanner";

export default function HeroPage() {
  const [showDropbox, setShowDropbox] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-emerald-500/30">
      <Navbar />
      <Background />

      <section className="relative pt-24 pb-20 px-6 flex flex-col items-center justify-center min-h-screen z-10">
        <AnimatePresence mode="wait">
          {!showDropbox ? (
            /* --- FULL HERO COMPONENT --- */
            <motion.div
              key="hero-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
              className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side: Massive Branding - Now Single Line */}
              <div className="lg:col-span-6 text-left space-y-10 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-black tracking-[0.4em] uppercase"
                >
                  <Sparkles size={14} className="animate-pulse" /> Null Resolver
                  Labs
                </motion.div>

                <div className="space-y-6">
                  {/* Removed <br /> to keep text in one line */}
                  <h1 className="flex flex-wrap items-baseline gap-x-6 text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none uppercase">
                    <span>AGRIVISION</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      2.0
                    </span>
                  </h1>
                 
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 50px rgba(16,185,129,0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDropbox(true)}
                  className="group relative h-20 px-14 rounded-3xl bg-white text-black font-black uppercase tracking-[0.3em] text-xs overflow-hidden flex items-center gap-4 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Neural Scan{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>

              {/* Right Side: Re-Enlarged Animation */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end items-center order-1 lg:order-2">
                <div className="w-full max-w-[600px] md:max-w-[750px] aspect-square relative group">
                  <DotLottieReact
                    src="https://lottie.host/be3bbf07-0a6c-4e1a-a794-c79bfbd3281a/wU2WdeJNu8.lottie"
                    loop
                    autoplay
                  />
                  <div className="absolute inset-0 bg-emerald-500/20 blur-[160px] rounded-full -z-10 group-hover:bg-emerald-500/30 transition-all duration-1000 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- FULL UPLOAD COMPONENT --- */
            <motion.div
              key="upload-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl flex flex-col items-center"
            >
              <div className="mb-12 text-center space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">
                  Neural <span className="text-emerald-500">Uploader</span>
                </h2>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.5em]">
                  Awaiting Specimen for Analysis
                </p>
              </div>

              <div className="w-full glass-panel p-4 bg-white/[0.03] border-white/10 rounded-[3.5rem] shadow-[0_0_120px_rgba(0,0,0,0.6)]">
                <HolographicScanner />
              </div>

              <button
                onClick={() => setShowDropbox(false)}
                className="mt-12 text-gray-600 text-[10px] font-black uppercase tracking-[0.6em] hover:text-emerald-400 transition-colors"
              >
                [ Return to Mainframe ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Grid: Only shows on Hero View */}
        {!showDropbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-32 max-w-[1400px] w-full text-left"
          >
            {[
              {
                icon: <ShieldCheck size={28} />,
                title: "Precision",
                desc: "98.6% Accuracy for soybean root and leaf analysis.",
              },
              {
                icon: <Zap size={28} />,
                title: "Velocity",
                desc: "Sub-second results via Gemini 3 Flash engine.",
              },
              {
                icon: <Languages size={28} />,
                title: "Inclusive",
                desc: "Native Marathi speech synthesis for rural accessibility.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="glass-panel p-12 border-white/5 bg-white/[0.01] hover:border-emerald-500/40 transition-all group"
              >
                <div className="p-5 bg-emerald-500/10 rounded-[2rem] w-fit mb-10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                  {feature.icon}
                </div>
                <h3 className="font-black text-3xl mb-4 tracking-tighter uppercase">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
