// src/components/ControlOrb.tsx
"use client";
import { motion } from "framer-motion";
import { Mic, Languages } from "lucide-react";

export default function ControlOrb() {
  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4">
      {/* Voice Trigger with Pulse */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 group relative"
      >
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20" />
        <Mic className="text-white group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Language Switcher */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 glass-panel flex items-center justify-center shadow-lg"
      >
        <Languages className="text-emerald-400" />
      </motion.button>
    </div>
  );
}
