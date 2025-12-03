import React from 'react';

interface Address {
  district: string;
  city: string;
}

interface Property {
  id: number;
  title: string;
  monthly_rent: string;
  surface: number;
  number_of_rooms: number;
  address: Address;
  primary_photo?: {
    url: string;
  };
}

interface PropertyCardProps {
  property: Property;
}

const FavPropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(numericPrice);
  };

  // Valeurs par défaut basées sur votre image
  const beds = 1;
  const adults = 2;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="h-48 bg-gray-100 relative">
        {property.primary_photo ? (
          <img 
            src={property.primary_photo.url} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="mb-2">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(property.monthly_rent)}
          </span>
          <span className="text-gray-600 ml-1">per month</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 leading-tight">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-gray-600 mb-3">
          {property.address.district}, {property.address.city}
        </p>

        {/* Features */}
        <div className="flex items-center text-sm text-gray-600 space-x-3">
          <span>{property.number_of_rooms} rooms</span>
          <span>•</span>
          <span>{beds} bed</span>
          <span>•</span>
          <span>{adults} adults</span>
          <span>•</span>
          <span>{property.surface}m²</span>
        </div>
      </div>
    </div>
  );
};

export default FavPropertyCard;