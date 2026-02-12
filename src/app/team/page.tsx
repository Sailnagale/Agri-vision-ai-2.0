"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Award } from "lucide-react"; // Use standardized names
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";

const teamMembers = [
  {
    name: "Sail Nagale",
    role: "Project Lead",
    desc: "4th Sem CSE (Data Science) student at VIT Pune. Specialized in Computer Vision and agricultural research.",
    links: { github: "#", linkedin: "#", mail: "mailto:sail@example.com" },
  },
  {
    name: "Aditya Mane",
    role: "ML Engineer",
    desc: "Expert in deep learning integration and neural network optimization for real-time analysis.",
    links: { github: "#", linkedin: "#", mail: "mailto:aditya@example.com" },
  },
  {
    name: "Mayur Muskawad",
    role: "Full Stack Developer",
    desc: "Specialized in the MERN stack and creating high-fidelity, interactive UI/UX experiences.",
    links: { github: "#", linkedin: "#", mail: "mailto:mayur@example.com" },
  },
  {
    name: "Akashkumar Kushwaha",
    role: "Backend Architect",
    desc: "Focusing on system scalability, edge computing, and robust API development.",
    links: { github: "#", linkedin: "#", mail: "mailto:akash@example.com" },
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-emerald-500/30">
      <Navbar />
      <Background />

      <section className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center">
        {/* Branding Header */}
        <div className="text-center mb-24 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[11px] font-black tracking-[0.4em] uppercase"
          >
            <Code2 size={14} /> Null Resolver Labs
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Squad
            </span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-[10px] font-bold uppercase tracking-[0.5em] leading-relaxed">
            Visionary Coders from VIT Pune | Spark Hackathon 2026
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15, borderColor: "rgba(16,185,129,0.4)" }}
              className="glass-panel p-10 bg-white/[0.01] border-white/5 hover:bg-white/[0.03] transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full group-hover:bg-emerald-500/10 transition-all" />

              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                <span className="font-black text-2xl">{member.name[0]}</span>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                {member.name}
              </h3>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-6">
                {member.role}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed mb-10 min-h-[80px]">
                {member.desc}
              </p>

              {/* Fixed Non-Deprecated Icons */}
              <div className="flex gap-6 pt-6 border-t border-white/5">
                <a
                  href={member.links.github}
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  <Github size={20} strokeWidth={1.5} />
                </a>
                <a
                  href={member.links.linkedin}
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <a
                  href={member.links.mail}
                  className="text-gray-600 hover:text-white transition-colors"
                >
                  <Mail size={20} strokeWidth={1.5} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 flex items-center gap-4 text-gray-800 text-[9px] font-bold uppercase tracking-[0.5em]">
          <Award size={12} /> Established February 2026
        </div>
      </section>
    </main>
  );
}
