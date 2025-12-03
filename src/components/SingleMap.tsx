// SingleMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Fix pour les icônes Leaflet (obligatoire) ---
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: iconMarker,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  lat: number;
  lng: number;
  title: string;
}

export default function SingleMap({ lat, lng, title }: Props) {
  // On décale légèrement le centre pour que le popup soit bien visible
  const position: [number, number] = [lat, lng];

  return (
    <MapContainer 
      center={position} 
      zoom={15} 
      scrollWheelZoom={false} // On désactive le zoom molette pour ne pas gêner le scroll de la page
      className="w-full h-full rounded-xl z-0"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <span className="font-bold">{title}</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
}