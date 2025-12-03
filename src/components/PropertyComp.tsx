import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import AvailableProps, { Property } from "./AvaliableProps"; 
import PriceMap from "./PriceMap";
import { useParams, useNavigate } from "react-router-dom";

export default function PropertyPage() {
  const [searchParams] = useSearchParams();
  
  // États centralisés ici
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Gestion des filtres
  const initialFilters = {
    where: searchParams.get("where") || "",
    rent: searchParams.get("rent") || "",
  };
  const [filters, setFilters] = useState(initialFilters);

  // Synchronisation URL -> Filtres
  useEffect(() => {
    setFilters({
      where: searchParams.get("where") || "",
      rent: searchParams.get("rent") || "",
    });
  }, [searchParams]);

  const convertedFilters = {
    ...filters,
    city: filters.where || "",
    min_price: filters.rent ? parseInt(filters.rent) : "",
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleToggleFavorite = async (propertyId: number, isFavorite: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Connectez-vous pour ajouter aux favoris !");
        return;
    }

    // 1. Mise à jour visuelle immédiate (Optimiste)
    setProperties((prev) =>
        prev.map((p) =>
            p.id === propertyId ? { ...p, is_favorite: !isFavorite } : p
        )
    );

    try {
        if (isFavorite) {
            // Si c'était déjà favori, on SUPPRIME
            await fetch(`http://localhost:8000/api/favorites/${propertyId}/`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            // Si ce n'était pas favori, on AJOUTE (Ton API POST)
            await fetch("http://localhost:8000/api/favorites/", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ property_id: propertyId }), // Correspond à ton body API
            });
        }
    } catch (error) {
        console.error("Erreur favoris", error);
        // Si erreur, on annule le changement visuel
        setProperties((prev) =>
            prev.map((p) =>
                p.id === propertyId ? { ...p, is_favorite: isFavorite } : p
            )
        );
    }
};

  // --- L'APPEL API SE FAIT ICI ---
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const params = new URLSearchParams();

      Object.entries(convertedFilters).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          params.append(key, value as string);
        }
      });
      params.append("status", "PUBLISHED");

      try {
        console.log("Fetching: ", params.toString()); // Pour déboguer
        const res = await fetch(`http://localhost:8000/api/properties/?${params.toString()}`);
        const data = await res.json();
        setProperties(data.results || []);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]); // Recharge quand les filtres changent


  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden">
      {/* Barre de filtre fixe en haut */}
      <div className="flex-none shadow-sm z-20 bg-white">
        <FilterBar onFilterChange={handleFilterChange} filters={convertedFilters} />
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
        
        {/* LISTE DES PROPRIÉTÉS (Gauche ou Haut) */}
        <div className="w-full lg:w-3/5 h-full overflow-y-auto bg-gray-50 border-r scrollbar-thin">
          <AvailableProps properties={properties} loading={loading} onToggleFavorite={handleToggleFavorite}/>
        </div>

        {/* CARTE (Droite ou Bas) */}
        <div className="w-full lg:w-2/5 h-[400px] lg:h-full relative shadow-inner z-10">
           {/* La carte reçoit les MÊMES données que la liste */}
           <PriceMap properties={properties} />
        </div>

      </div>
    </div>
  );
}