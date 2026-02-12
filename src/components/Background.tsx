"use client";
export const Background = () => (
  <div className="fixed inset-0 -z-10 bg-[#020617]">
    {/* Subtle Glow Orbs */}
    <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

    {/* Grid Pattern Overlay */}
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
  </div>
);
