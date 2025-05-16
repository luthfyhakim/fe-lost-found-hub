"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

interface ItemLocationMapProps {
  location: {
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  type: "lost" | "found";
}

const ItemLocationMap = ({ location, type }: ItemLocationMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;

    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    const map = L.map(mapContainerRef.current).setView(
      [location.coordinates.lat, location.coordinates.lng],
      15
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const icon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      className: type === "lost" ? "lost-marker" : "found-marker",
    });

    L.marker([location.coordinates.lat, location.coordinates.lng], { icon })
      .bindPopup(
        `<div>
          <b>${location.name}</b><br>
          <span>Status: ${type === "lost" ? "Hilang" : "Ditemukan"}</span><br>
          <span>Lokasi: ${location.address}</span>
        </div>`
      )
      .addTo(map)
      .openPopup();

    L.circle([location.coordinates.lat, location.coordinates.lng], {
      color: type === "lost" ? "red" : "green",
      fillColor:
        type === "lost" ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 255, 0, 0.1)",
      fillOpacity: 0.5,
      radius: 100,
    }).addTo(map);

    const style = document.createElement("style");
    style.textContent = `
      .lost-marker {
        filter: hue-rotate(0deg);
      }
      .found-marker {
        filter: hue-rotate(120deg);
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.remove();
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [location, type, isMounted]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default dynamic(() => Promise.resolve(ItemLocationMap), {
  ssr: false,
});
