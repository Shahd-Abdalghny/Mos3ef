import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix default marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//     iconUrl: require("leaflet/dist/images/marker-icon.png"),
//     shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// بيانات تجريبية
const sampleLocations = [
    { lat: 30.0626, lng: 31.2497, type: "hospital", name: "Hospital Cairo" },
    { lat: 31.2001, lng: 29.9187, type: "hospital", name: "Hospital Alexandria" },
];

const Map = () => {
    const [currentPosition, setCurrentPosition] = useState([30.0626, 31.2497]); // default Cairo

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentPosition([position.coords.latitude, position.coords.longitude]);
                },
                (error) => {
                    console.log("Error getting location:", error);
                }
            );
        }
    }, []);

    return (
        <MapContainer
            center={currentPosition}
            zoom={12}
            style={{ height: "500px", width: "50%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marker للموقع الحالي */}
            <Marker position={currentPosition}>
                <Popup>You are here</Popup>
            </Marker>

            {/* Markers للمواقع التجريبية */}
            {sampleLocations.map((loc, i) => (
                <Marker key={i} position={[loc.lat, loc.lng]}>
                    <Popup>
                        {loc.name} <br /> Type: {loc.type}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
