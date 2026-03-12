"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

const LOCATION: LatLngTuple = [18.5204, 73.8567];

export default function ContactMap() {
  return (
    <MapContainer
      center={LOCATION}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full rounded-3xl"
    >
      {/* Modern dark themed map */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      {/* Animated office location */}
      <CircleMarker
        center={LOCATION}
        radius={10}
        pathOptions={{
          color: "#f3f6f4",
          fillColor: "#d1752a",
          fillOpacity: 1,
        }}
        className="animate-pulse"
      >
        <Popup>
          <div className="text-sm">
            <strong>ClinRT Global Services Pvt. Ltd.</strong>
            <br />
            905, Tower 3, Kohinoor World Towers
            <br />
            PCMC, Pune, Maharashtra 411018
            <br />
            India
          </div>
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
}
