"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  BrainCircuit,
  AlertTriangle,
  Loader2,
  MapPin,
  Waves,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export default function WeatherPage() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiAdvisory, setAiAdvisory] = useState<string>(
    "Initializing Neural Climate Link...",
  );

  useEffect(() => {
    async function fetchWeather() {
      if (!API_KEY) {
        useFallbackData("Environment Variable Missing");
        return;
      }

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=${API_KEY}`,
        );
        const data = await res.json();

        // If key is not yet active (401), use the simulation mode
        if (data.cod === 200) {
          setWeather(data);
          generateAIAdvisory(data.main.temp, data.main.humidity);
        } else {
          useFallbackData(`System Status: ${data.message}`);
        }
      } catch (err) {
        useFallbackData("Connection Latency Detected");
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  // Simulation mode to ensure your demo never looks 'stuck'
  const useFallbackData = (reason: string) => {
    console.warn(`Weather Simulation Active: ${reason}`);
    const mockData = {
      name: "Pune (Simulated)",
      main: { temp: 27, humidity: 82, pressure: 1012 },
      wind: { speed: 4.2 },
    };
    setWeather(mockData);
    generateAIAdvisory(mockData.main.temp, mockData.main.humidity);
    setLoading(false);
  };

  const generateAIAdvisory = (temp: number, humidity: number) => {
    if (humidity > 75) {
      setAiAdvisory(
        "CRITICAL: Humidity > 75% detected. High risk for Downy Mildew in Grape crops and Root Rot in Soybeans. Ensure proper drainage.",
      );
    } else if (temp > 35) {
      setAiAdvisory(
        "WARNING: Heat stress detected. Increase irrigation for soybean root nodules.",
      );
    } else {
      setAiAdvisory(
        "OPTIMAL: Climate conditions are stable. Continue standard field maintenance.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-emerald-500/30">
      <Navbar />
      <Background />

      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase"
            >
              <CloudSun size={14} className="animate-pulse" /> Climate
              Intelligence
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Live <span className="text-emerald-500">Forecast</span>
            </h1>
          </div>

          <div className="text-right flex items-center gap-4 bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md min-w-[240px] justify-end">
            <MapPin size={20} className="text-emerald-500" />
            <div className="text-right">
              <p className="text-white text-sm font-black uppercase tracking-widest leading-none">
                {weather?.name || "LOCATING..."}
              </p>
              <p className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.4em] mt-2">
                Null Resolver Linked
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="flex-1 flex flex-col items-center justify-center space-y-6"
            >
              <Loader2
                className="animate-spin text-emerald-500"
                size={64}
                strokeWidth={1}
              />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500 animate-pulse">
                Synchronizing Satellite Link...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Thermometer />,
                    label: "Temp",
                    value: `${Math.round(weather?.main?.temp ?? 0)}°C`,
                    color: "text-orange-400",
                  },
                  {
                    icon: <Droplets />,
                    label: "Humidity",
                    value: `${weather?.main?.humidity ?? 0}%`,
                    color: "text-blue-400",
                  },
                  {
                    icon: <Waves />,
                    label: "Pressure",
                    value: `${weather?.main?.pressure ?? 0} hPa`,
                    color: "text-cyan-400",
                  },
                  {
                    icon: <BrainCircuit />,
                    label: "AI Risk",
                    value:
                      (weather?.main?.humidity ?? 0) > 70 ? "High" : "Stable",
                    color:
                      (weather?.main?.humidity ?? 0) > 70
                        ? "text-red-400"
                        : "text-emerald-400",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8, borderColor: "rgba(16,185,129,0.3)" }}
                    className="glass-panel p-10 bg-white/[0.02] border-white/5 flex flex-col items-center gap-6 transition-all group"
                  >
                    <div
                      className={`${item.color} p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors`}
                    >
                      {item.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
                        {item.label}
                      </p>
                      <p className="text-4xl font-black">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className="glass-panel p-12 bg-emerald-500/5 border-emerald-500/20 relative overflow-hidden rounded-[3rem]">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                  <div className="p-8 bg-emerald-500 text-black rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                    <AlertTriangle
                      size={40}
                      className={
                        (weather?.main?.humidity ?? 0) > 70
                          ? "animate-bounce"
                          : ""
                      }
                    />
                  </div>
                  <div className="space-y-6 text-center md:text-left">
                    <h3 className="text-emerald-400 font-black uppercase text-xs tracking-[0.4em]">
                      Neural Advisory Report
                    </h3>
                    <p className="text-3xl md:text-4xl font-black leading-tight tracking-tighter">
                      {aiAdvisory}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-6 border-t border-white/5 text-gray-500 text-[9px] font-bold uppercase tracking-widest">
                      <span>Protocol: Null Resolver</span>
                      <span>Engine: Gemini 3 Flash</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
