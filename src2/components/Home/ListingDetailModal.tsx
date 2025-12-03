import { X, MapPin, Users, Home, Bath, Wifi, MessageSquare, Heart } from 'lucide-react';
import { Listing } from '../../types';
import { useState } from 'react';

interface ListingDetailModalProps {
  listing: Listing;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
  onContact: () => void;
}

export default function ListingDetailModal({
  listing,
  isFavorite,
  onClose,
  onToggleFavorite,
  onContact
}: ListingDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="backdrop-blur-xl bg-gray-950/90 rounded-3xl border border-white/10 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md bg-black/40 border border-white/20 hover:bg-black/60 transition-all text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative h-96 rounded-t-3xl overflow-hidden">
            <img
              src={listing.images[currentImageIndex]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            {listing.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {listing.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-cyan-400 w-8'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="absolute top-4 left-4">
              <div className="px-4 py-2 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
                <span className="text-white text-sm capitalize">{listing.type}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{listing.title}</h2>
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{listing.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={onToggleFavorite}
                  className={`
                    p-3 rounded-xl backdrop-blur-sm border transition-all
                    ${isFavorite
                      ? 'bg-red-500/20 border-red-400/30 text-red-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400'
                    }
                  `}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                <div className="text-right">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {listing.price}
                  </div>
                  <div className="text-sm text-gray-500">par nuit</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4 text-center">
                <Home className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-white font-semibold">{listing.bedrooms}</div>
                <div className="text-gray-400 text-xs">Chambres</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4 text-center">
                <Bath className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-white font-semibold">{listing.bathrooms}</div>
                <div className="text-gray-400 text-xs">Salles de bain</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4 text-center">
                <Users className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-white font-semibold">{listing.maxGuests}</div>
                <div className="text-gray-400 text-xs">Voyageurs</div>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4 text-center">
                <Wifi className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-white font-semibold">{listing.amenities.length}</div>
                <div className="text-gray-400 text-xs">Équipements</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
              <p className="text-gray-400 leading-relaxed">{listing.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Équipements</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {listing.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 backdrop-blur-sm bg-white/5 rounded-lg border border-white/10 px-4 py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-gray-300 text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Propriétaire</h3>
              <div className="flex items-center space-x-4 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4">
                {listing.ownerAvatar && (
                  <img
                    src={listing.ownerAvatar}
                    alt={listing.ownerName}
                    className="w-16 h-16 rounded-full border-2 border-cyan-400/30"
                  />
                )}
                <div className="flex-1">
                  <div className="text-white font-semibold text-lg">{listing.ownerName}</div>
                  <div className="text-gray-400 text-sm">Hôte</div>
                </div>
              </div>
            </div>

            <button
              onClick={onContact}
              className="w-full relative group overflow-hidden rounded-xl p-[2px] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gray-900 rounded-[10px] px-6 py-4 group-hover:bg-transparent transition-all flex items-center justify-center space-x-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Contacter le propriétaire</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
