import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correction pour les icônes Leaflet par défaut qui buggent souvent avec Webpack/Vite
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  properties: any[]; // Remplace 'any' par ton interface Property si tu l'exportes
}

export default function PropertyMap({ properties }: MapProps) {
  // Centre par défaut (ex: Paris ou Yaoundé)
  const defaultCenter: [number, number] = [3.8480, 11.5021]; 

  return (
    // IMPORTANT : La div parente doit avoir une hauteur définie !
    <div className="h-full w-full min-h-[400px] rounded-xl overflow-hidden shadow-lg sticky top-24">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((prop) => (
            // On vérifie qu'on a bien les coordonnées avant d'afficher
            prop.latitude && prop.longitude && (
              <Marker 
                key={prop.id} 
                position={[Number(prop.latitude), Number(prop.longitude)]}
              >
                <Popup>
                  <div className="font-bold">{prop.title}</div>
                  <div>{parseInt(prop.monthly_rent).toLocaleString()} FCFA</div>
                </Popup>
              </Marker>
            )
        ))}
      </MapContainer>
    </div>
  );
}