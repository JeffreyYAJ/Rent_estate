import { useState } from 'react';
import { PlusCircle, Edit, Trash2, Home } from 'lucide-react';
import { Listing } from '../../types';
import ListingCard from '../Home/ListingCard';
import CreateListingModal from './CreateListingModal';

interface MyListingsPageProps {
  listings: Listing[];
  onViewListing: (listing: Listing) => void;
}

export default function MyListingsPage({ listings, onViewListing }: MyListingsPageProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const myListings = listings.filter(l => l.ownerId === '1');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Mes Annonces
            </h1>
            <p className="text-gray-400">
              {myListings.length} annonce{myListings.length > 1 ? 's' : ''} active{myListings.length > 1 ? 's' : ''}
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="relative group overflow-hidden rounded-xl p-[2px] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gray-900 rounded-[10px] px-6 py-3 group-hover:bg-transparent transition-all flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Créer une annonce</span>
            </div>
          </button>
        </div>

        {myListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map(listing => (
              <div key={listing.id} className="relative group">
                <ListingCard
                  listing={listing}
                  isFavorite={false}
                  onToggleFavorite={() => {}}
                  onClick={() => onViewListing(listing)}
                />
                <div className="absolute top-2 left-2 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg backdrop-blur-md bg-blue-500/80 border border-white/20 hover:bg-blue-600/80 transition-all text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg backdrop-blur-md bg-red-500/80 border border-white/20 hover:bg-red-600/80 transition-all text-white">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 inline-block">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
                <Home className="relative w-16 h-16 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucune annonce</h3>
              <p className="text-gray-500 mb-6">Créez votre première annonce pour commencer</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="relative group overflow-hidden rounded-xl p-[2px] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
                <div className="relative bg-gray-900 rounded-[10px] px-6 py-3 flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Créer une annonce</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateListingModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
