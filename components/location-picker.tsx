"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

type LocationPickerProps = {
  initialPosition: { lat: number; lng: number };
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  height?: string;
};

const MapComponent = ({
  initialPosition,
  onLocationSelect,
  height = "400px",
}: LocationPickerProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !mapContainerRef.current ||
      isMapInitialized
    ) {
      return;
    }

    let cleanup: (() => void) | undefined;

    const initializeMap = async () => {
      try {
        const L = await import("leaflet");

        if (!mapInstanceRef.current && mapContainerRef.current) {
          const map = L.map(mapContainerRef.current).setView(
            [initialPosition.lat, initialPosition.lng],
            13
          );

          mapInstanceRef.current = map;

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map);

          const icon = new L.Icon({
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
            className: "icon-marker",
          });

          const marker = L.marker([initialPosition.lat, initialPosition.lng], {
            icon: icon,
            draggable: true,
          }).addTo(map);

          const getAddress = async (lat: number, lng: number) => {
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=id`
              );
              const data = await res.json();
              const area =
                data.address?.suburb ||
                data.address?.village ||
                data.address?.town ||
                data.address?.city ||
                data.address?.county ||
                data.address?.state ||
                "daerah tidak diketahui";
              return `Lokasi di sekitar ${area} (${lat.toFixed(
                4
              )}, ${lng.toFixed(4)})`;
            } catch {
              return `Lokasi di sekitar (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
            }
          };

          marker.on("dragend", async () => {
            const position = marker.getLatLng();
            const address = await getAddress(position.lat, position.lng);
            onLocationSelect(position.lat, position.lng, address);
          });

          map.on("click", async (e) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            const address = await getAddress(lat, lng);
            onLocationSelect(lat, lng, address);
          });

          map.locate({ setView: true, maxZoom: 16 });
          map.on("locationfound", async (e) => {
            marker.setLatLng(e.latlng);
            const address = await getAddress(e.latlng.lat, e.latlng.lng);
            onLocationSelect(e.latlng.lat, e.latlng.lng, address);
          });

          setTimeout(() => {
            map.invalidateSize();
          }, 100);

          setIsMapInitialized(true);

          cleanup = () => {
            if (map) {
              map.off();
              map.remove();
              mapInstanceRef.current = null;
            }
          };
        }
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();

    return () => {
      if (cleanup) cleanup();
    };
  }, [initialPosition, onLocationSelect, isMapInitialized]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: "100%" }}
      className="rounded border border-gray-300 z-10"
    />
  );
};

const LocationPicker = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-gray-100 rounded border border-gray-300"
      style={{ height: "400px", width: "100%" }}
    >
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default LocationPicker;
