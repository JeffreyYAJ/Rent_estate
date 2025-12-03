import { Heart, MapPin, Users, Home, DoorOpen, Building2 } from 'lucide-react';
import { Listing } from '../../types';

interface ListingCardProps {
  listing: Listing;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onClick: () => void;
}

export default function ListingCard({ listing, isFavorite, onToggleFavorite, onClick }: ListingCardProps) {
  const typeIcons = {
    house: Home,
    room: DoorOpen,
    studio: Building2
  };

  const TypeIcon = typeIcons[listing.type];

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden transition-all group-hover:border-cyan-400/30">
        <div className="relative h-48 overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-black/30 border border-white/20 hover:bg-black/50 transition-all z-10"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <div className="px-3 py-1 rounded-full backdrop-blur-md bg-black/40 border border-white/20 flex items-center space-x-1">
              <TypeIcon className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-white capitalize">{listing.type}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-white line-clamp-1 flex-1">
              {listing.title}
            </h3>
          </div>

          <div className="flex items-center text-gray-400 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {listing.description}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <div className="flex items-center space-x-1">
                <Home className="w-4 h-4" />
                <span>{listing.bedrooms}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{listing.maxGuests}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {listing.price}
              </div>
              <div className="text-xs text-gray-500">par nuit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
