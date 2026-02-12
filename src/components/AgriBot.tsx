"use client";
import Spline from "@splinetool/react-spline";

export default function AgriBot() {
  return (
    <div className="w-full h-[500px] relative">
      {/* This renders the 3D scene. Replace the URL with your own Spline export link */}
      <Spline scene="https://prod.spline.design/your-unique-scene-id/scene.splinecode" />

      {/* Decorative Overlay to match your AgriVision UI */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
  );
}
