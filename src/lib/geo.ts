export type Titik = { label: string; lat: number; lng: number };

export const KOTA: Titik[] = [
  { label: "Makassar", lat: -5.1477, lng: 119.4327 },
  { label: "Gowa (Sungguminasa)", lat: -5.2, lng: 119.4472 },
  { label: "Maros", lat: -4.9945, lng: 119.5731 },
  { label: "Pangkep", lat: -4.8331, lng: 119.5537 },
  { label: "Barru", lat: -4.4333, lng: 119.6167 },
  { label: "Parepare", lat: -4.0135, lng: 119.6255 },
  { label: "Enrekang", lat: -3.5631, lng: 119.7686 },
  { label: "Bone (Watampone)", lat: -4.5381, lng: 120.3282 },
  { label: "Bulukumba", lat: -5.5571, lng: 120.1932 },
  { label: "Palopo", lat: -2.9925, lng: 120.1969 },
];

export function jarakKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const formatJarak = (km: number) => (km < 1 ? "< 1 km" : km < 10 ? `${km.toFixed(1).replace(".", ",")} km` : `${Math.round(km)} km`);
