"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";

const lostItems = [
  {
    id: 1,
    name: "Dompet Hitam",
    lat: -6.2088,
    lng: 106.8456,
    date: "2023-05-10",
  },
  {
    id: 2,
    name: "Kunci Mobil",
    lat: -6.2158,
    lng: 106.8326,
    date: "2023-05-11",
  },
  {
    id: 3,
    name: "Laptop ASUS",
    lat: -6.1751,
    lng: 106.865,
    date: "2023-05-12",
  },
  {
    id: 4,
    name: "Tas Ransel",
    lat: -6.2018,
    lng: 106.7813,
    date: "2023-05-13",
  },
];

const foundItems = [
  {
    id: 1,
    name: "Dompet Coklat",
    lat: -6.1854,
    lng: 106.8243,
    date: "2023-05-10",
  },
  {
    id: 2,
    name: "Kunci Motor",
    lat: -6.2382,
    lng: 106.7952,
    date: "2023-05-11",
  },
  {
    id: 3,
    name: "Handphone Samsung",
    lat: -6.1899,
    lng: 106.8287,
    date: "2023-05-12",
  },
];

export default function DashboardMap() {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const initializeMap = async () => {
      try {
        const L = (await import("leaflet")).default;

        if (mapContainerRef.current && !mapRef.current) {
          const map = L.map(mapContainerRef.current).setView(
            [-6.2088, 106.8456],
            12
          );

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map);

          const lostIcon = new L.Icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconRetinaUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
            shadowUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            className: "lost-marker",
          });

          const foundIcon = new L.Icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconRetinaUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
            shadowUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            className: "found-marker",
          });

          lostItems.forEach((item) => {
            L.marker([item.lat, item.lng], { icon: lostIcon })
              .bindPopup(
                `<div>
                  <b>${item.name}</b><br>
                  <span>Status: Hilang</span><br>
                  <span>Tanggal: ${item.date}</span><br>
                  <a href="/item/lost/${item.id}" class="text-blue-500 hover:underline">Lihat Detail</a>
                </div>`
              )
              .addTo(map);
          });

          foundItems.forEach((item) => {
            L.marker([item.lat, item.lng], { icon: foundIcon })
              .bindPopup(
                `<div>
                  <b>${item.name}</b><br>
                  <span>Status: Ditemukan</span><br>
                  <span>Tanggal: ${item.date}</span><br>
                  <a href="/item/found/${item.id}" class="text-blue-500 hover:underline">Lihat Detail</a>
                </div>`
              )
              .addTo(map);
          });

          L.circle([-6.2088, 106.8456], {
            color: "rgba(59, 130, 246, 0.5)",
            fillColor: "rgba(59, 130, 246, 0.1)",
            fillOpacity: 0.5,
            radius: 5000,
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

          mapRef.current = map;
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();
  }, [isMounted]);

  return <div ref={mapContainerRef} className="h-full w-full z-10" />;
}
