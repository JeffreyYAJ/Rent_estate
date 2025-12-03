import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useMemo } from "react";
import "leaflet/dist/leaflet.css";

// On reprend la même interface que AvailableProps pour être cohérent
interface Property {
  id: number;
  title: string;
  monthly_rent: string;
  address: { 
    latitude: number; 
    longitude: number;
    full_address: string;
  };
}

interface Props {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
}

// Fix pour les icônes Leaflet manquantes
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: iconMarker,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function PriceMap({
  properties,
  center = [3.8480, 11.5021], // Yaoundé
  zoom = 13,
}: Props) {

  // Création du marqueur "Prix"
  const createPriceIcon = (priceString: string) => {
    const price = parseInt(priceString).toLocaleString();
    return L.divIcon({
      className: "", 
      iconSize: [60, 26],
      iconAnchor: [30, 13],
      html: `
        <div class="bg-white border border-blue-600 text-blue-600 font-bold text-xs 
                    px-1 py-0.5 rounded shadow-sm text-center whitespace-nowrap">
            ${price}
        </div>
      `,
    });
  };

  const markers = useMemo(() => {
    return properties.map((p) => {
      // Vérification de sécurité : si pas de coordonnées, on n'affiche pas
      if (!p.address || !p.address.latitude || !p.address.longitude) return null;

      return (
        <Marker
          key={p.id}
          position={[p.address.latitude, p.address.longitude]}
          icon={createPriceIcon(p.monthly_rent)}
        >
          <Popup>
            <div className="text-sm font-bold">{p.title}</div>
            <div className="text-xs text-gray-500">{p.address.full_address}</div>
            <div className="text-blue-600 font-bold mt-1">
                {parseInt(p.monthly_rent).toLocaleString()} FCFA
            </div>
          </Popup>
        </Marker>
      );
    });
  }, [properties]);

  return (
    <div className="w-full h-full bg-gray-200">
      <MapContainer center={center} zoom={zoom} className="w-full h-full">
        <TileLayer 
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />
        {markers}
      </MapContainer>
    </div>
  );
}