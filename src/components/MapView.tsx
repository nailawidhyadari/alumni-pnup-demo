"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
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
  const [kunci, setKunci] = useState(() => interactive && L.Browser.mobile);
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
    vendors.forEach((v, idx) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="pin" style="animation-delay:${idx * 70}ms"><span>${esc(String(v.pemilik.angkatan ? String(v.pemilik.angkatan).slice(2) : "?"))}</span></div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });
      const mk = L.marker([v.lat, v.lng], { icon, title: `${v.judul}, ${v.usaha}`, keyboard: true }).addTo(g);
      mk.bindPopup(
        `<strong style="font-family:serif;font-size:15px">${esc(v.judul)}</strong><br>${esc(v.usaha)}<br><span style="color:#726c62">${esc(v.kota)}</span><br><a href="/marketplace/${v.id}" style="font-weight:700;color:#7a1f26">Lihat profil →</a>`,
        { closeButton: false },
      );
      mk.on("click", () => cb.current?.(v.id));
      markers.current.set(v.id, mk);
      pts.push([v.lat, v.lng]);
    });
    if (origin) {
      L.marker([origin.lat, origin.lng], { icon: L.divIcon({ className: "", html: '<div class="you"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }), title: "Lokasi kamu", interactive: false }).addTo(g);
      if (radiusKm) L.circle([origin.lat, origin.lng], { radius: radiusKm * 1000, color: "#43604f", weight: 1.5, fillColor: "#43604f", fillOpacity: 0.07, interactive: false }).addTo(g);
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
    <div className="relative" style={{ height }}>
      <div ref={el} style={{ height: "100%" }} className="w-full overflow-hidden rounded-sm border border-ink" role="application" aria-label="Peta lokasi usaha alumni" />
      {kunci && (
        <button
          type="button"
          onClick={() => setKunci(false)}
          className="absolute inset-0 z-[500] flex items-end justify-center rounded-sm bg-transparent pb-4"
          aria-label="Aktifkan peta agar bisa digeser dan diperbesar"
        >
          <span className="rounded-sm bg-ink/90 px-4 py-2 text-sm font-semibold text-paper">Ketuk untuk menggeser peta</span>
        </button>
      )}
    </div>
  );
}
