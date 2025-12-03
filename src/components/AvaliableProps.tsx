import { FaHeart, FaStar, FaBed, FaBath, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Définition de l'interface (inchangée)
export interface Property {
  id: number;
  title: string;
  monthly_rent: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  surface: number;
  address: { 
    full_address: string; 
    latitude: number; 
    longitude: number 
  };
  primary_photo?: { url: string };
  is_favorite?: boolean;
}

interface Props {
  properties: Property[]; 
  loading: boolean;
  onToggleFavorite: (id: number, isFavorite: boolean) => void; 
}

export default function AvailableProps({ properties, loading, onToggleFavorite }: Props) {
  const navigate = useNavigate();

  return (
    <section className="py-6 px-4 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-2xl font-bold text-zinc-950">Proprietes Disponible</h2>
      </div>

      {loading ? (
        <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Chargement des propriétés...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
             <p className="text-gray-500">Aucune propriété trouvée.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {properties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden relative cursor-pointer group"
              onClick={() => navigate(`/properties/${p.id}`)}
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={p.primary_photo?.url || "/placeholder.jpg"}
                  alt={p.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                
                {/* --- LE BOUTON CONNECTÉ --- */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Important : empêche d'ouvrir la page détail
                    // On envoie l'ID et l'état actuel (true/false) au parent
                    onToggleFavorite(p.id, !!p.is_favorite);
                  }}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-blue-50 transition hover:scale-110 z-10"
                >
                  <FaHeart 
                    className={`text-xl transition ${p.is_favorite ? "text-red-500" : "text-gray-400"}`} 
                  />
                </button>
                {/* ------------------------- */}

                <span className="absolute bottom-3 left-3 bg-white text-gray-900 text-sm font-bold px-3 py-1 rounded shadow">
                  {parseInt(p.monthly_rent).toLocaleString()} FCFA
                </span>
              </div>

              {/* Contenu */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 line-clamp-1">{p.title}</h3>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <FaStar className="mr-1" /> 4.8
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-3 truncate">{p.address.full_address}</p>

                <div className="flex justify-between text-gray-600 text-xs border-t pt-3">
                  <span className="flex items-center gap-1"><FaBed /> {p.number_of_bedrooms} ch.</span>
                  <span className="flex items-center gap-1"><FaBath /> {p.number_of_bathrooms} sdb.</span>
                  <span className="flex items-center gap-1"><FaUserFriends /> {p.surface} m²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}