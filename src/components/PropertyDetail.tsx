import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHouse, FaBed } from "react-icons/fa6";
import React from "react";
import WaitingPage from "./WaitingPage";
import SingleMap from "./SingleMap";
import ImageCarousel from "./ImageCarrousel";
import ImageLightbox from "./ImageLightBox"; // Import du nouveau modal

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [contactOpen, setContactOpen] = useState(false);
  
  // États pour le modal d'images
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/properties/${id}/`)
      .then((res) => res.json())
      .then(setProperty);
  }, [id]);

  const handleStartChat = () => {
    if (!property || !property.landlord) {
        alert("Impossible de contacter le propriétaire.");
        return;
    }
    navigate("/messages", { 
      state: { 
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.primary_photo?.url,
        landlordName: property.landlord.full_name || "Propriétaire"
      } 
    });
  };

  if (!property) return <div><WaitingPage/></div>;

  // Préparation des photos
  const galleryPhotos = property.photos && property.photos.length > 0 
      ? property.photos 
      : property.primary_photo 
          ? [property.primary_photo] 
          : [];

  // Fonction appelée quand on clique sur le carrousel
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden">
      <div className="h-full w-full bg-white text-gray-900 p-6 md:p-10 overflow-y-auto">
        
        {/* 1. TITLE & ADDRESS */}
        <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
          {property.title}
        </h1>
        <div className="flex items-center gap-2 mt-3 text-gray-600 mb-6">
          <span className="text-lg">{property.address?.full_address}</span>
        </div>

        {/* 2. CARROUSEL (Juste en dessous du titre) */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <ImageCarousel 
                photos={galleryPhotos} 
                altTitle={property.title} 
                onImageClick={openLightbox} // Active le clic
            />
        </div>

        {/* 3. ICONS ROW (Ton ancien layout) */}
        <div className="flex flex-wrap gap-6 mb-10">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl text-gray-700">
            <FaHouse className="text-2xl" />
            <span className="font-medium">{property.surface} m²</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl text-gray-700">
            <FaBed className="text-2xl" />
            <span className="font-medium">{property.number_of_bedrooms} Ch.</span>
          </div>
        </div>

        {/* 4. GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Left content */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">À propos de ce logement</h2>
            <p className="font-semibold text-gray-800">
                {property.type === 'APARTMENT' ? 'Appartement Entier' : property.type}
            </p>

            <p className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>

            {/* MAP */}
            {property.address?.latitude && property.address?.longitude && (
              <div className="mt-10 pt-10 border-t border-gray-100">
                <h3 className="text-xl font-bold mb-4">Localisation</h3>
                <p className="text-gray-500 mb-4 text-sm">
                    {property.address.district}, {property.address.city}
                </p>
                <div className="h-80 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
                  <SingleMap 
                    lat={property.address.latitude} 
                    lng={property.address.longitude} 
                    title={property.title}
                  />
                </div>
              </div>
            )}

            <h3 className="text-lg font-bold mt-10 mb-3">Informations complémentaires</h3>
            <p className="text-gray-700 leading-relaxed">
               Propriété publiée le {new Date(property.published_at || Date.now()).toLocaleDateString()}.
            </p>
          </div>

          {/* Right sidebar (Sticky) */}
          
        </div>
      </div>

      {/* --- LE MODAL LIGHTBOX --- */}
      {isLightboxOpen && (
        <ImageLightbox 
            photos={galleryPhotos} 
            startIndex={lightboxIndex} 
            onClose={() => setIsLightboxOpen(false)} 
        />
      )}

    </div>
  );
}