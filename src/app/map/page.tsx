"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";

// Icône personnalisée pour le marqueur utilisateur
const userIcon = new Icon({
  iconUrl: "/marker.png", // Mets une icône personnalisée ici
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapScreen() {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error("Erreur de géolocalisation :", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="h-full w-full">
      {position ? (
        <MapContainer center={position} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={userIcon}/>
          <Recenter position={position} />
        </MapContainer>
      ) : (
        <p className="text-center mt-20">📍 Récupération de votre position...</p>
      )}
    </div>
  );
}

// Fonction pour recentrer la carte quand la position change
function Recenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 13);
  }, [position, map]);
  return null;
}
