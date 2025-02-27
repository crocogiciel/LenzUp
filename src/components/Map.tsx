"use client";

import { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { DivIcon, Icon } from "leaflet";
import BottomDrawer from "./BottomDrawer";


// Icône personnalisée pour le marqueur utilisateur

const PhotographerIcon = new Icon({
    iconUrl: "/marker.png", // Mets une icône personnalisée ici
    iconSize: [40, 40],
    iconAnchor: [0, 20],
});

const UserIcon = new DivIcon({ className: "currentPosMarker", iconSize: [10, 10], iconAnchor: [0, 0] })


const Map = () => {
    const [position, setPosition] = useState<[number, number] | undefined>(undefined);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [photographersPostion, setPhotographersPostion] = useState<[number, number][] | null>([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => generatePositionData({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            (err) => console.error("Erreur de géolocalisation :", err),
            { enableHighAccuracy: true }
        );
    }, []);

    const generatePositionData = (pos: { lat: number; lon: number }) => {
        setPosition([pos.lat, pos.lon])
        const photographers: [number, number][] = [
            [pos.lat + 0.0001, pos.lon + 0.0001],
            [pos.lat - 0.00012, pos.lon + 0.00012],
        ]
        setPhotographersPostion(photographers);
    }

    return (
        <div className="h-full w-full">
            {position ? (
                <MapContainer center={position} zoom={13} className="h-full w-full">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} icon={UserIcon} />
                    {photographersPostion?.map((photographer, index) => <Marker key={index} position={photographer} icon={PhotographerIcon} eventHandlers={{ click: () => setSelectedLocation({ lat: photographer[0], lon: photographer[1] }) }} />)}
                    <Recenter position={position} />
                    <BottomDrawer open={!!selectedLocation} onClose={() => setSelectedLocation(null)}>
                        <p>📍 Position : {selectedLocation?.lat}, {selectedLocation?.lon}</p>
                        <p>💡 Ici, tu peux afficher plus d&apos;infos sur l&apos;utilisateur !</p>
                    </BottomDrawer>
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
        map.setView(position, 20);
    }, [position, map]);
    return null;
}

export default Map;
