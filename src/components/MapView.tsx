"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import type { Vendor } from "@/data/vendors";
import type { Titik } from "@/lib/geo";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export default function MapView({
  vendors,
  activeId,
  onSelect,
  origin,
  radiusKm,
  height = 420,
  interactive = true,
}: {
  vendors: Vendor[];
  activeId?: number | null;
  onSelect?: (id: number | null) => void;
  origin?: Titik | null;
  radiusKm?: number | null;
  height?: number | string;
  interactive?: boolean;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const markers = useRef<Map<number, L.Marker>>(new Map());
  const cb = useRef(onSelect);
  useEffect(() => {
    cb.current = onSelect;
  });

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { scrollWheelZoom: false, zoomControl: interactive, dragging: interactive, doubleClickZoom: interactive, touchZoom: interactive })
      .setView([-4.6, 119.8], 8);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(m);
    layer.current = L.layerGroup().addTo(m);
    map.current = m;
    m.on("click", () => cb.current?.(null));
    return () => {
      m.remove();
      map.current = null;
    };
  }, [interactive]);

  // penanda + bingkai
  useEffect(() => {
    const m = map.current;
    const g = layer.current;
    if (!m || !g) return;
    g.clearLayers();
    markers.current.clear();
    const pts: L.LatLngExpression[] = [];
    vendors.forEach((v) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="pin"><span>${esc(String(v.pemilik.angkatan ? String(v.pemilik.angkatan).slice(2) : "?"))}</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });
      const mk = L.marker([v.lat, v.lng], { icon, title: `${v.judul}, ${v.usaha}`, keyboard: true }).addTo(g);
      mk.bindPopup(
        `<strong style="font-family:serif;font-size:15px">${esc(v.judul)}</strong><br>${esc(v.usaha)}<br><span style="color:#5d6577">${esc(v.kota)}</span><br><a href="/marketplace/${v.id}" style="font-weight:700;color:#1d5c48">Lihat profil →</a>`,
        { closeButton: false },
      );
      mk.on("click", () => cb.current?.(v.id));
      markers.current.set(v.id, mk);
      pts.push([v.lat, v.lng]);
    });
    if (origin) {
      L.marker([origin.lat, origin.lng], { icon: L.divIcon({ className: "", html: '<div class="you"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }), title: "Lokasi kamu", interactive: false }).addTo(g);
      if (radiusKm) L.circle([origin.lat, origin.lng], { radius: radiusKm * 1000, color: "#1d5c48", weight: 1.5, fillColor: "#1d5c48", fillOpacity: 0.07, interactive: false }).addTo(g);
      pts.push([origin.lat, origin.lng]);
    }
    if (pts.length > 1) m.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 12 });
    else if (pts.length === 1) m.setView(pts[0], 12);
  }, [vendors, origin, radiusKm]);

  // penanda aktif
  useEffect(() => {
    markers.current.forEach((mk, id) => {
      const pin = mk.getElement()?.querySelector(".pin");
      pin?.setAttribute("data-active", String(id === activeId));
      mk.setZIndexOffset(id === activeId ? 1000 : 0);
    });
    const mk = activeId != null ? markers.current.get(activeId) : null;
    if (mk && map.current && !map.current.getBounds().contains(mk.getLatLng())) map.current.panTo(mk.getLatLng());
  }, [activeId, vendors]);

  return (
    <div
      ref={el}
      style={{ height }}
      className="w-full overflow-hidden rounded-md border-[1.5px] border-ink"
      role="application"
      aria-label="Peta lokasi usaha alumni"
    />
  );
}
