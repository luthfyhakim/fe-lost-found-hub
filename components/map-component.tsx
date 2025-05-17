"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Button } from "./ui/button";
import { HomeIcon, Locate, ZoomIn, ZoomOut } from "lucide-react";

type MapComponentProps = {
  layers: {
    streets: boolean;
    satellite: boolean;
    terrain: boolean;
    buildings: boolean;
    boundaries: boolean;
  };
  activeTool: string | null;
};

export default function MapComponent({
  layers,
  activeTool,
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  useEffect(() => {
    let map: L.Map | null = null;

    if (mapContainerRef.current) {
      map = L.map(mapContainerRef.current).setView([-2.5489, 118.0149], 5); // Indonesia centered

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
        className: "icon-marker",
      });

      const jakartaMarker = L.marker([-6.2088, 106.8456], { icon: icon })
        .bindPopup("<b>Jakarta</b><br>Capital city of Indonesia")
        .addTo(map);

      const baliMarker = L.marker([-8.3405, 115.092], { icon: icon })
        .bindPopup("<b>Bali</b><br>Popular tourist destination")
        .addTo(map);

      const yogyakartaMarker = L.marker([-7.7956, 110.3695], { icon: icon })
        .bindPopup("<b>Yogyakarta</b><br>Cultural center of Java")
        .addTo(map);

      const javaPolygon = L.polygon(
        [
          [-6.0, 105.0],
          [-8.0, 106.0],
          [-9.0, 108.0],
          [-8.8, 110.0],
          [-8.5, 112.0],
          [-8.0, 114.0],
          [-7.0, 114.5],
          [-6.5, 112.0],
          [-6.0, 110.0],
          [-5.8, 108.0],
          [-5.9, 106.0],
        ],
        {
          color: "green",
          fillOpacity: 0.2,
        }
      )
        .bindPopup("Java Island")
        .addTo(map);

      mapRef.current = map;
      setIsMapInitialized(true);
    }

    return () => {
      if (map) {
        map.remove();
      }
      mapRef.current = null;
      setIsMapInitialized(false);
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isMapInitialized) return;

    console.log("Layer state changed:", layers);
  }, [layers, isMapInitialized]);

  useEffect(() => {
    if (!mapRef.current || !isMapInitialized) return;

    console.log("Active tool changed:", activeTool);
  }, [activeTool, isMapInitialized]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.setView([-2.5489, 118.0149], 5);
    }
  };

  const handleLocateMe = () => {
    if (mapRef.current && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current?.setView([latitude, longitude], 13);
          L.marker([latitude, longitude])
            .bindPopup("Your location")
            .addTo(mapRef.current as L.Map);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your location. Please check your browser permissions."
          );
        }
      );
    }
  };

  return (
    <div className="relative h-full w-full">
      <div ref={mapContainerRef} className="h-full w-full" />

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom in</span>
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Zoom out</span>
        </Button>
        <Button variant="secondary" size="icon" onClick={handleResetView}>
          <HomeIcon className="h-4 w-4" />
          <span className="sr-only">Reset view</span>
        </Button>
        <Button variant="secondary" size="icon" onClick={handleLocateMe}>
          <Locate className="h-4 w-4" />
          <span className="sr-only">Locate me</span>
        </Button>
      </div>
    </div>
  );
}
