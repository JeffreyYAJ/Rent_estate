import { Heart } from 'lucide-react';
import { Listing } from '../../types';
import ListingCard from './ListingCard';

interface FavoritesPageProps {
  listings: Listing[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onViewListing: (listing: Listing) => void;
}

export default function FavoritesPage({ listings, favorites, onToggleFavorite, onViewListing }: FavoritesPageProps) {
  const favoriteListings = listings.filter(listing => favorites.has(listing.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Mes Favoris
          </h1>
          <p className="text-gray-400">
            {favoriteListings.length} logement{favoriteListings.length > 1 ? 's' : ''} sauvegardé{favoriteListings.length > 1 ? 's' : ''}
          </p>
        </div>

        {favoriteListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteListings.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(listing.id)}
                onClick={() => onViewListing(listing)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 inline-block">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
                <Heart className="relative w-16 h-16 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucun favori</h3>
              <p className="text-gray-500">Commencez à sauvegarder vos logements préférés</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
