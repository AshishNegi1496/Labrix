"use client";

import { useEffect, useRef } from "react";
import maplibregl, { type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LOCATION: [number, number] = [73.802571, 18.625874];
const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "osm-tiles": {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster",
      source: "osm-tiles",
    },
  ],
};

const POPUP_HTML = `
  <div class="type-h6">
    <strong>ClinRT Global Services Pvt. Ltd.</strong><br/>
    905, Tower 3, Kohinoor World Towers<br/>
    PCMC, Pune, Maharashtra 411018<br/>
    India
  </div>
`;

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: LOCATION,
      zoom: 14,
      attributionControl: false,
    });

    mapRef.current = map;
    map.scrollZoom.disable();

    new maplibregl.Marker({ color: "#0f243a" })
      .setLngLat(LOCATION)
      .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML(POPUP_HTML))
      .addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full rounded-3xl overflow-hidden"
    />
  );
}
