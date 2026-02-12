"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";
import DiagnosisDashboard from "@/components/DiagnosisDashboard";
import { motion } from "framer-motion";

function ResultsContent() {
  const searchParams = useSearchParams();
  const disease = searchParams.get("disease");
  const confidence = searchParams.get("confidence");

  if (!disease || !confidence) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-red-400">
          No Diagnosis Data Found
        </h2>
        <p className="text-gray-400 mt-2">
          Please return to the home page and upload an image.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold mb-2">
          Diagnostic Laboratory Report
        </h1>
        <div className="h-px w-20 bg-emerald-500/50 mx-auto" />
      </div>

      <DiagnosisDashboard
        result={disease}
        confidence={parseFloat(confidence)}
      />
    </motion.div>
  );
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen pt-32 relative bg-black selection:bg-emerald-500/30">
      <Navbar />
      <Background />

      {/* Suspense is required when using useSearchParams in Next.js App Router */}
      <Suspense
        fallback={<div className="text-center py-20">Loading Results...</div>}
      >
        <ResultsContent />
      </Suspense>
    </main>
  );
}
