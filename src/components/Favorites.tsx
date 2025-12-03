import React, { useEffect, useState } from "react";
import { Trash, XCircle, Home, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PriceMap from "./PriceMap"; // Assure-toi que le chemin est bon

// Interface adaptée pour matcher ce que PriceMap attend + tes données favoris
interface Property {
  id: number;
  title: string;
  monthly_rent: string;
  surface: number;
  number_of_rooms: number;
  address?: {
    district?: string;
    city?: string;
    // Ajout important pour la Map :
    latitude?: number; 
    longitude?: number;
    full_address?: string;
  };
  primary_photo?: {
    image?: string; // Note: Ton API renvoie "image" ou "url" ? Vérifie bien.
    url?: string;   // J'ajoute url au cas où c'est ce que PriceMap utilise
  };
}

interface FavoriteItem {
  id: number; // L'ID du favori (pas de la propriété)
  property: Property;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 👉 Récupérer les favoris
  const fetchFavorites = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
        // Si pas connecté, on redirige ou on affiche une erreur
        setLoading(false);
        return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/favorites/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erreur lors du chargement des favoris");
      
      const data = await response.json();
      setFavorites(data.results || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 👉 Supprimer un favori (Token corrigé !)
  const handleDelete = async (propertyId: number) => {
    const token = localStorage.getItem("token");
    if(!token) return;

    // Suppression optimiste (visuelle immédiate)
    const prevFavorites = [...favorites];
    setFavorites((prev) => prev.filter((fav) => fav.property.id !== propertyId));

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/favorites/${propertyId}/`, // Vérifie si l'API attend l'ID du favori ou de la propriété pour le DELETE
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Utilisation du vrai token
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur API");
      }
    } catch (error) {
      console.error("Erreur suppression", error);
      // On remet la liste comme avant si ça plante
      setFavorites(prevFavorites);
      alert("Impossible de supprimer ce favori.");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // --- PRÉPARATION DES DONNÉES POUR LA MAP ---
  // On extrait juste la partie "property" de chaque favori pour la donner à la map
  const mapProperties = favorites.map(fav => ({
    ...fav.property,
    // PriceMap attend 'address' avec latitude/longitude. 
    // Assurons-nous que l'objet correspond
    address: {
        ...fav.property.address,
        full_address: fav.property.address?.district + ', ' + fav.property.address?.city,
        latitude: fav.property.address?.latitude || 0, // Fallback si pas de coord
        longitude: fav.property.address?.longitude || 0
    }
  }));

  // --- RENDU ---

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pt-20">
        <p className="text-gray-600 text-lg animate-pulse">Chargement de vos coups de cœur...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-red-500 mb-2">Oups !</p>
            <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden">
        
        {/* Titre Header */}
        <div className="flex-none px-8 py-4 bg-white border-b z-10 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Mes Favoris ({favorites.length})</h1>
        </div>

        {favorites.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
                <Home className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-xl font-semibold text-gray-400 mb-2">Vous n'avez aucun favori</p>
                <button onClick={() => navigate('/properties')} className="text-blue-600 font-medium hover:underline">
                    Explorer les annonces
                </button>
            </div>
        ) : (
            // --- LAYOUT SPLIT (Liste | Carte) ---
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
                
                {/* COLONNE GAUCHE : LISTE */}
                <div className="w-full lg:w-3/5 h-full overflow-y-auto bg-gray-50 p-4 scrollbar-thin">
                    <div className="max-w-3xl mx-auto space-y-4">
                        {favorites.map(({ id, property }) => (
                            <div
                            key={id} // Ici c'est l'ID du favori
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col sm:flex-row h-auto sm:h-48 group cursor-pointer"
                            onClick={() => navigate(`/properties/${property.id}`)}
                            >
                            {/* Image */}
                            <div className="w-full sm:w-64 h-48 sm:h-full relative flex-shrink-0">
                                {property.primary_photo?.image || property.primary_photo?.url ? (
                                <img
                                    src={property.primary_photo?.image || property.primary_photo?.url}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                />
                                ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <span className="text-gray-400 text-sm">Pas d'image</span>
                                </div>
                                )}
                                
                                {/* Prix (Overlay Mobile) */}
                                <span className="absolute bottom-2 left-2 sm:hidden bg-white/90 px-2 py-1 rounded text-xs font-bold">
                                    {parseFloat(property.monthly_rent).toLocaleString("fr-FR")} €
                                </span>
                            </div>

                            {/* Contenu */}
                            <div className="p-4 flex-1 flex flex-col justify-between relative">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1 mb-1">
                                                {property.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                                <MapPin size={14} />
                                                {property.address?.district}, {property.address?.city}
                                            </p>
                                        </div>
                                        {/* Prix (Desktop) */}
                                        <div className="hidden sm:block text-right">
                                            <span className="text-xl font-bold text-blue-600 block">
                                                {parseInt(property.monthly_rent).toLocaleString("fr-FR")} FCFA
                                            </span>
                                            <span className="text-xs text-gray-500">/mois</span>
                                        </div>
                                    </div>

                                    {/* Caractéristiques */}
                                    <div className="flex items-center text-sm text-gray-600 space-x-4 mt-4 bg-gray-50 p-2 rounded-lg w-fit">
                                        <span className="font-medium">{property.number_of_rooms} p.</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="font-medium">{property.surface} m²</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Empêche le clic sur la carte d'ouvrir les détails
                                            handleDelete(property.id);
                                        }}
                                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                                        title="Retirer des favoris"
                                    >
                                        <Trash size={18} />
                                        <span className="font-medium">Retirer</span>
                                    </button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* COLONNE DROITE : CARTE */}
                <div className="hidden lg:block lg:w-2/5 h-full relative border-l border-gray-200">
                     {/* On passe les propriétés transformées à ta PriceMap existante */}
                     <PriceMap properties={mapProperties} zoom={12} />
                </div>

            </div>
        )}
    </div>
  );
};

export default FavoritesPage;