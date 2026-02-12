"use client";
import { useState } from "react";
import { Mic, Languages, Loader2, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceAssistantProps {
  onLanguageToggle: () => void;
  isMarathi: boolean;
  currentText: string | null;
}

export default function VoiceAssistant({
  onLanguageToggle,
  isMarathi,
  currentText,
}: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 1. Text-to-Speech: Reads the Gemini Expert Analysis
  const handleSpeak = () => {
    if (!currentText || isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const speech = new SpeechSynthesisUtterance(currentText);
    speech.lang = isMarathi ? "mr-IN" : "en-IN";
    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 items-center">
      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass-panel px-4 py-2 border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2"
          >
            Audio Stream Active
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Toggle Button */}
      <button
        onClick={onLanguageToggle}
        className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-emerald-400 border-white/10 hover:border-emerald-500/50 transition-all shadow-2xl"
      >
        <Languages size={20} />
      </button>

      {/* Voice/Audio Button */}
      <button
        onClick={handleSpeak}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-[0_0_40px_rgba(16,185,129,0.2)] ${
          isSpeaking
            ? "bg-red-500 animate-pulse"
            : "bg-emerald-500 hover:bg-emerald-400"
        }`}
      >
        {isSpeaking ? (
          <Volume2 className="text-white" size={32} />
        ) : (
          <Mic className="text-black" size={32} />
        )}
      </button>
    </div>
  );
}
