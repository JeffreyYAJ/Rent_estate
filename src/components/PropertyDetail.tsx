import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHouse, FaBed } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import React from "react";
import WaitingPage from "./WaitingPage";
// 1. Import de la nouvelle composante Map
import SingleMap from "./SingleMap"; 

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartChat = () => {
    // Vérification de sécurité
    if (!property || !property.landlord) {
        alert("Impossible de contacter le propriétaire.");
        return;
    }
    navigate("/messages", { 
      state: { 
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.primary_photo?.url || property.primary_photo?.image, // Gère les deux cas
        landlordName: property.landlord.full_name || property.landlord.first_name // Fallback
      } 
    });
  };
  useEffect(() => {
    fetch(`http://localhost:8000/api/properties/${id}/`)
      .then((res) => res.json())
      .then(setProperty);
  }, [id]);

  if (!property) return <div><WaitingPage/></div>;

  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden">
      {/* Ajout de overflow-y-auto pour que la page défile */}
      <div className="h-full w-full bg-white text-gray-900 p-6 md:p-10 overflow-y-auto">
        
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
          {property.title}
        </h1>

        {/* Address */}
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <span>{property.address?.full_address}</span>
        </div>

        {/* Icons Row */}
        <div className="flex flex-wrap gap-6 mt-8">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl text-gray-700">
            <FaHouse className="text-2xl" />
            {/* Correction : Affichage dynamique de la surface */}
            <span className="font-medium">{property.surface} m²</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl text-gray-700">
            <FaBed className="text-2xl" />
            {/* Correction : Affichage dynamique des chambres */}
            <span className="font-medium">{property.number_of_bedrooms} Ch.</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">About this listing</h2>
            <p className="font-semibold text-gray-800">
                {property.type === 'APARTMENT' ? 'Entire apartment' : property.type}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>

            {/* --- NOUVELLE SECTION : MAP --- */}
            {property.address?.latitude && property.address?.longitude && (
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Localisation</h3>
                <p className="text-gray-500 mb-4 text-sm">
                    Situé à {property.address.district}, {property.address.city}
                </p>
                {/* Conteneur avec hauteur définie (très important) */}
                <div className="h-80 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
                  <SingleMap 
                    lat={property.address.latitude} 
                    lng={property.address.longitude} 
                    title={property.title}
                  />
                </div>
              </div>
            )}
            {/* ----------------------------- */}

            <h3 className="text-lg font-bold mt-10 mb-3">Additional Information</h3>
            <p className="text-gray-700 leading-relaxed">
               {/* Ici tu pourras mettre d'autres infos plus tard */}
               Propriété vérifiée et publiée le {new Date(property.published_at).toLocaleDateString()}.
            </p>
          </div>

          {/* Right sidebar (Sticky) */}
          <div className="relative">
            <aside className="border rounded-2xl shadow-sm p-6 sticky top-10">
              <p className="text-sm text-gray-500 font-semibold">PRIX</p>
              <p className="text-3xl font-bold mt-1">
                {parseInt(property.monthly_rent).toLocaleString()} FCFA
                <span className="text-base font-medium text-gray-500 ml-1">/ mois</span>
              </p>

              <button
                className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition relative"
                onClick={() => setContactOpen((v) => !v)}
                type="button"
              >
                Contacter le propriétaire
              </button>

              {/* Dropdown menu */}
              {contactOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <button
                    className="block w-full text-left px-6 py-3 hover:bg-gray-100 transition"
                    onClick={handleStartChat} 
                  >
                    Messagerie Intégrée
                  </button>
                  
                  {/* Lien WhatsApp Sécurisé */}
                  {property.landlord?.phone ? (
                      <a
                        className="block w-full text-left px-6 py-3 hover:bg-green-50 text-green-700 font-medium transition"
                        href={`https://wa.me/${property.landlord.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Bonjour, je suis intéressé par votre propriété "${property.title}" située à ${property.address?.full_address}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setContactOpen(false)}
                      >
                        WhatsApp
                      </a>
                  ) : (
                      <span className="block px-6 py-3 text-gray-400 text-sm italic">
                          Numéro non disponible
                      </span>
                  )}
                </div>
              )}

              <p className="text-center mt-4 text-gray-500 text-xs">
                 Aucun frais ne sera débité pour la prise de contact.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}