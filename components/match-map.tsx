"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MatchMapProps {
  lostItem: {
    name: string;
    location: string;
    coordinates: { lat: number; lng: number };
  };
  foundItem: {
    name: string;
    location: string;
    coordinates: { lat: number; lng: number };
  };
}

export default function MatchMap({ lostItem, foundItem }: MatchMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const lostLatLng = L.latLng(
        lostItem.coordinates.lat,
        lostItem.coordinates.lng
      );
      const foundLatLng = L.latLng(
        foundItem.coordinates.lat,
        foundItem.coordinates.lng
      );
      const bounds = L.latLngBounds([lostLatLng, foundLatLng]).pad(0.1);
      const center = bounds.getCenter();

      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: 13,
      });

      map.fitBounds(bounds);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const lostIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
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
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
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

      const lostMarker = L.marker(
        [lostItem.coordinates.lat, lostItem.coordinates.lng],
        { icon: lostIcon }
      )
        .bindPopup(
          `<div>
            <b>${lostItem.name}</b><br>
            <span>Status: Hilang</span><br>
            <span>Lokasi: ${lostItem.location}</span>
          </div>`
        )
        .addTo(map);

      const foundMarker = L.marker(
        [foundItem.coordinates.lat, foundItem.coordinates.lng],
        { icon: foundIcon }
      )
        .bindPopup(
          `<div>
            <b>${foundItem.name}</b><br>
            <span>Status: Ditemukan</span><br>
            <span>Lokasi: ${foundItem.location}</span>
          </div>`
        )
        .addTo(map);

      const polyline = L.polyline(
        [
          [lostItem.coordinates.lat, lostItem.coordinates.lng],
          [foundItem.coordinates.lat, foundItem.coordinates.lng],
        ],
        { color: "blue", dashArray: "5, 10", weight: 2 }
      ).addTo(map);

      const distance = lostLatLng.distanceTo(foundLatLng);
      const distanceText =
        distance < 1000
          ? `${Math.round(distance)} meter`
          : `${(distance / 1000).toFixed(2)} km`;

      const midPoint = L.latLng(
        (lostItem.coordinates.lat + foundItem.coordinates.lat) / 2,
        (lostItem.coordinates.lng + foundItem.coordinates.lng) / 2
      );

      L.marker(midPoint, {
        icon: L.divIcon({
          className: "distance-label",
          html: `<div class="bg-white px-2 py-1 rounded text-xs border">${distanceText}</div>`,
          iconSize: [80, 20],
          iconAnchor: [40, 10],
        }),
      }).addTo(map);

      const style = document.createElement("style");
      style.textContent = `
        .lost-marker {
          filter: hue-rotate(0deg);
        }
        .found-marker {
          filter: hue-rotate(120deg);
        }
        .distance-label {
          background: none;
          border: none;
        }
      `;
      document.head.appendChild(style);

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lostItem, foundItem]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}
