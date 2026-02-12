"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
  Activity,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const OutbreakMap = dynamic(() => import("@/components/OutbreakMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-white/5 animate-pulse rounded-[3rem] flex items-center justify-center">
      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/30">
        Syncing Satellite Data...
      </p>
    </div>
  ),
});

export default function WeatherPage() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [aiAdvisory, setAiAdvisory] = useState<string>(
    "Initializing Neural Link...",
  );

  useEffect(() => {
    setHasMounted(true);
    fetchWeather();
  }, []);

  async function fetchWeather() {
    if (!API_KEY) {
      useFallbackData("API Key Missing");
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=${API_KEY}`,
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        generateAIAdvisory(data.main.temp, data.main.humidity);
      } else {
        useFallbackData(data.message);
      }
    } catch (err) {
      useFallbackData("Offline Mode");
    } finally {
      setLoading(false);
    }
  }

  const useFallbackData = (reason: string) => {
    setWeather({
      name: "Pune (Simulated)",
      main: { temp: 28, humidity: 82, pressure: 1012 },
    });
    generateAIAdvisory(28, 82);
    setLoading(false);
  };

  const generateAIAdvisory = (temp: number, humidity: number) => {
    if (humidity > 75)
      setAiAdvisory(
        "CRITICAL: Humidity > 75% detected. High risk for Downy Mildew and Soybean Rust.",
      );
    else if (temp > 35)
      setAiAdvisory(
        "WARNING: Heat stress. Increase irrigation for root nodule protection.",
      );
    else
      setAiAdvisory(
        "OPTIMAL: Environment stable. Low-risk for regional pathogens.",
      );
  };

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      <Background />
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-black tracking-[0.3em] uppercase">
              <CloudSun size={14} /> Climate Intelligence
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
              Live <span className="text-emerald-500">Forecast</span>
            </h1>
          </div>
          <div className="text-right flex items-center gap-4 bg-white/5 p-5 rounded-[2rem] border border-white/5 backdrop-blur-md">
            <MapPin size={20} className="text-emerald-500" />
            <div className="text-right">
              <p className="text-white text-sm font-black uppercase tracking-widest">
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
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <Loader2 className="animate-spin text-emerald-500" size={64} />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500 animate-pulse">
                Syncing Satellite Array...
              </p>
            </div>
          ) : (
            <motion.div
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
                  },
                  {
                    icon: <Droplets />,
                    label: "Humidity",
                    value: `${weather?.main?.humidity ?? 0}%`,
                  },
                  {
                    icon: <Waves />,
                    label: "Pressure",
                    value: `${weather?.main?.pressure ?? 0} hPa`,
                  },
                  {
                    icon: <BrainCircuit />,
                    label: "AI Risk",
                    value:
                      (weather?.main?.humidity ?? 0) > 70 ? "High" : "Stable",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="glass-panel p-10 bg-white/[0.02] border-white/5 flex flex-col items-center gap-6"
                  >
                    <div className="text-emerald-500 p-4 bg-white/5 rounded-2xl">
                      {item.icon}
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
                        {item.label}
                      </p>
                      <p className="text-4xl font-black">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Regional Map */}
              <div className="mt-16">
                <OutbreakMap />
              </div>

              {/* Fixed Proliferation Chart */}
              <div className="glass-panel p-10 bg-white/[0.01] border-white/5 rounded-[3rem]">
                <div className="flex items-center gap-3 mb-10">
                  <Activity size={18} className="text-emerald-500" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                    Neural Pathogen Proliferation Projection
                  </h4>
                </div>
                {/* Fixed container height (h-40) */}
                <div className="flex items-end justify-between h-40 gap-3">
                  {[35, 42, 58, 88, 92, 72, 48].map((risk, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center gap-4 h-full justify-end"
                    >
                      <div
                        className="w-full relative"
                        style={{ height: `${risk}%` }}
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          className={`w-full rounded-t-xl transition-all ${risk > 70 ? "bg-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "bg-emerald-500/20"}`}
                        />
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-700">
                        Day {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advisory Box */}
              <div className="glass-panel p-12 bg-emerald-500/5 border-emerald-500/20 rounded-[3rem]">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="p-8 bg-emerald-500 text-black rounded-[2.5rem]">
                    <AlertTriangle size={40} />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-emerald-400 font-black uppercase text-xs tracking-[0.4em]">
                      Neural Advisory Report
                    </h3>
                    <p className="text-3xl font-black leading-tight">
                      {aiAdvisory}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
