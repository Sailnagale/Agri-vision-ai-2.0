"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  BrainCircuit,
  Trash2,
  Leaf,
  MessageSquare,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";
import ReactMarkdown from "react-markdown"; // For rendering **bold** and lists

export default function AgriChatbot() {
  const [messages, setMessages] = useState<
    { role: "user" | "model"; text: string }[]
  >([
    {
      role: "model",
      text: "Neural link established. I can provide detailed, structured analysis on **Soybean Rust**, **Grape Cluster Health**, and **Climate Mitigation**.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, userMessage: userMsg }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "**Error:** Neural link interrupted." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      <Background />
      <section className="relative z-10 pt-32 pb-10 px-6 max-w-5xl mx-auto flex flex-col h-[90vh]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">
                Neural <span className="text-emerald-500">Assistant</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                Engine: Llama 3.3 via Groq
              </p>
            </div>
          </div>
          <button
            suppressHydrationWarning
            onClick={() =>
              setMessages([{ role: "model", text: "History cleared." }])
            }
            className="p-3 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex-1 glass-panel bg-white/[0.02] border-white/5 rounded-[3rem] flex flex-col overflow-hidden mb-6 shadow-2xl">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide"
          >
            <AnimatePresence>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-4 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border ${m.role === "user" ? "bg-white/5 border-white/10" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"}`}
                    >
                      {m.role === "user" ? (
                        <User size={18} />
                      ) : (
                        <Bot size={18} />
                      )}
                    </div>
                    <div
                      className={`p-6 rounded-3xl text-sm leading-relaxed ${m.role === "user" ? "bg-emerald-500 text-black font-bold" : "bg-white/5 border border-white/5 text-gray-300"}`}
                    >
                      {/* Markdown rendering logic */}
                      <ReactMarkdown
                        components={{
                          strong: ({ node, ...props }) => (
                            <span
                              className="font-black text-emerald-400"
                              {...props}
                            />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="mb-4 last:mb-0" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc ml-4 space-y-2 mb-4"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="text-gray-300" {...props} />
                          ),
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div className="p-5 rounded-3xl bg-white/5 text-[10px] font-bold uppercase tracking-widest text-emerald-500 animate-pulse">
                  Processing...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/[0.01] border-t border-white/5">
            <div className="relative flex items-center">
              <input
                suppressHydrationWarning
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Consult the Assistant..."
                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 pr-16 text-sm focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-600"
              />
              <button
                suppressHydrationWarning
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-3 h-10 w-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center hover:bg-emerald-400 transition-all shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
