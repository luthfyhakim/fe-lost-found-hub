"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Props for our location picker
type LocationPickerProps = {
  initialPosition: { lat: number; lng: number };
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  height?: string;
};

// Core map component (will be dynamically imported)
const MapComponent = ({
  initialPosition,
  onLocationSelect,
  height = "400px",
}: LocationPickerProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Function to add Leaflet CSS once
  const addLeafletCSS = () => {
    if (document.getElementById("leaflet-css")) return;

    const link = document.createElement("link");
    link.id = "leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  };

  // Initialize the map
  useEffect(() => {
    // Check if we're in the browser
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
        // Dynamic import of Leaflet
        const L = await import("leaflet");

        // Add CSS
        addLeafletCSS();

        // Create map only if it doesn't exist yet
        if (!mapInstanceRef.current && mapContainerRef.current) {
          // Create map instance
          const map = L.map(mapContainerRef.current).setView(
            [initialPosition.lat, initialPosition.lng],
            13
          );

          mapInstanceRef.current = map;

          // Add tile layer
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map);

          // Create marker
          const marker = L.marker([initialPosition.lat, initialPosition.lng], {
            draggable: true,
          }).addTo(map);

          // Handle marker drag
          marker.on("dragend", () => {
            const position = marker.getLatLng();
            const address = `Lokasi di sekitar ${position.lat.toFixed(
              4
            )}, ${position.lng.toFixed(4)}`;
            onLocationSelect(position.lat, position.lng, address);
          });

          // Handle map click
          map.on("click", (e) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            const address = `Lokasi di sekitar ${lat.toFixed(4)}, ${lng.toFixed(
              4
            )}`;
            onLocationSelect(lat, lng, address);
          });

          // Try to get user location
          map.locate({ setView: true, maxZoom: 16 });
          map.on("locationfound", (e) => {
            marker.setLatLng(e.latlng);
            const address = `Lokasi Anda di sekitar ${e.latlng.lat.toFixed(
              4
            )}, ${e.latlng.lng.toFixed(4)}`;
            onLocationSelect(e.latlng.lat, e.latlng.lng, address);
          });

          // Force a resize after rendering
          setTimeout(() => {
            map.invalidateSize();
          }, 100);

          setIsMapInitialized(true);

          // Define cleanup function
          cleanup = () => {
            if (map) {
              // Remove map properly
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

    // Return cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, [initialPosition, onLocationSelect, isMapInitialized]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height, width: "100%" }}
      className="rounded border border-gray-300"
    />
  );
};

// Create dynamic component with SSR disabled
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
