"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";
import { getDiagnosis } from "@/lib/api";

export default function HolographicScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);

    try {
      // Create a local URL for the image to show on the next page
      const imageUrl = URL.createObjectURL(file);
      sessionStorage.setItem("pending_scan_image", imageUrl);

      const data = await getDiagnosis(file);
      const params = new URLSearchParams({
        disease: data.disease,
        confidence: data.confidence.toString(),
      });

      router.push(`/results?${params.toString()}`);
    } catch (err) {
      console.error("Analysis failed:", err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <motion.div className="glass-panel relative h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-emerald-500/20 overflow-hidden cursor-pointer group">
        <input
          type="file"
          className="absolute inset-0 opacity-0 z-50 cursor-pointer"
          onChange={handleUpload}
          disabled={isScanning}
          accept="image/*"
        />
        {isScanning ? (
          <div className="text-center">
            <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mx-auto mb-4" />
            <h3 className="text-2xl font-bold animate-pulse uppercase tracking-tighter">
              Analyzing...
            </h3>
          </div>
        ) : (
          <div className="text-center group-hover:scale-105 transition-transform duration-500">
            <Upload className="w-16 h-16 text-emerald-500/50 mx-auto mb-6" />
            <h3 className="text-2xl font-bold">Upload Specimen</h3>
            <p className="text-gray-400 mt-2">
              Click to scan crop for diagnosis
            </p>
          </div>
        )}
        {isScanning && (
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_20px_#10b981]"
          />
        )}
      </motion.div>
    </div>
  );
}
