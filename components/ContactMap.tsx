"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "@/app/globals.css";
import type { LatLngTuple } from "leaflet";
// Fix Next.js marker issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

const createIcon = (color: "red" | "blue" | "green") =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: "drop",
  });

const LOCATIONS: {
  id: string;
  name: string;
  position: LatLngTuple;
  icon: L.Icon;
}[] = [
  {
    id: "pune",
    name: "Pune",
    position: [18.5204, 73.8567],
    icon: createIcon("blue"),
  },
  {
    id: "nashik",
    name: "Nashik",
    position: [19.9975, 73.7898],
    icon: createIcon("green"),
  },
  {
    id: "nagpur",
    name: "Nagpur",
    position: [21.1458, 79.0882],
    icon: createIcon("red"),
  },
];

const MAHARASHTRA_CENTER: [number, number] = [19.7515, 75.7139];

export default function ContactMap() {
  const scrollToCard = (id: string) => {
    document
      .getElementById(`contact-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MapContainer
      center={MAHARASHTRA_CENTER}
      zoom={6}
      scrollWheelZoom={false}
      className="h-full w-full "
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {LOCATIONS.map((loc) => (
        <Marker
          key={loc.id}
          position={loc.position}
          icon={loc.icon}
          eventHandlers={{
            click: () => scrollToCard(loc.id),
          }}
        >
          <Popup>
            <strong>{loc.name}</strong>
            <br />
            Click to view details
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
