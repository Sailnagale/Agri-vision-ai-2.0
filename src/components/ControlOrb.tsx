"use client";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet"; // Corrected Import
import "leaflet/dist/leaflet.css";
import { AlertCircle } from "lucide-react";
import L from "leaflet";

// Fix for default Leaflet icon issues in Next.js
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Simulated hotspot data for Maharashtra region
const hotspots = [
  { id: 1, lat: 18.5204, lng: 73.8567, disease: "Soybean Rust", risk: "High", radius: 5000, color: "#ef4444" },
  { id: 2, lat: 19.9975, lng: 73.7898, disease: "Downy Mildew", risk: "Medium", radius: 8000, color: "#f59e0b" },
  { id: 3, lat: 18.1856, lng: 74.6106, disease: "Root Rot", risk: "Critical", radius: 4000, color: "#dc2626" },
];

export default function OutbreakMap() {
  return (
    <div className="glass-panel p-8 bg-white/[0.02] border-white/5 rounded-[3rem] overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500">
            <AlertCircle size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter">Regional <span className="text-red-500">Outbreaks</span></h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Live Threat Mapping: Maharashtra</p>
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full rounded-[2rem] overflow-hidden border border-white/5 relative z-0">
        <MapContainer 
          center={[18.5204, 73.8567]} // Centered on Pune
          zoom={8} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          className="grayscale invert opacity-80 brightness-75 hover:grayscale-0 hover:invert-0 hover:opacity-100 transition-all duration-700"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {hotspots.map((spot) => (
            <Circle
              key={spot.id}
              center={[spot.lat, spot.lng]}
              radius={spot.radius}
              pathOptions={{ fillColor: spot.color, color: spot.color, weight: 1, fillOpacity: 0.4 }}
            >
              <Popup>
                <div className="text-black p-2">
                  <h4 className="font-black uppercase text-xs">{spot.disease}</h4>
                  <p className="text-[10px] mt-1 font-bold">Risk Level: <span style={{ color: spot.color }}>{spot.risk}</span></p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}