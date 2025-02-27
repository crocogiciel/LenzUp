"use client";

import { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { DivIcon } from "leaflet";

// Icône personnalisée pour le marqueur utilisateur
/*
const userIcon = new Icon({
    iconUrl: "/current_position_marker.png", // Mets une icône personnalisée ici
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5],
});
*/

const Map = () => {
    const [position, setPosition] = useState<[number, number] | undefined>(undefined);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error("Erreur de géolocalisation :", err),
            { enableHighAccuracy: true }
        );
    }, []);

    return (
        <div className="h-full w-full">
            {position ? (
                <MapContainer center={position} zoom={13} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} icon={new DivIcon({className: "currentPosMarker", iconSize: [10, 10]})} />
                    <Recenter position={position} />
                </MapContainer>
            ) : (
                <p className="text-center mt-20">Récupération de votre position...</p>
            )}
        </div>
    );
}

function Recenter({ position }: { position: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position, 13);
    }, [position]);
    return null;
}

export default Map;