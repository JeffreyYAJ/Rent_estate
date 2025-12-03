import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, Home as HomeIcon, DoorOpen, Building2 } from 'lucide-react';
import { Listing } from '../../types';
import ListingCard from './ListingCard';

interface DiscoverPageProps {
  listings: Listing[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onViewListing: (listing: Listing) => void;
}

export default function DiscoverPage({ listings, favorites, onToggleFavorite, onViewListing }: DiscoverPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'house' | 'room' | 'studio'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || listing.type === selectedType;
      const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1];

      return matchesSearch && matchesType && matchesPrice;
    });
  }, [listings, searchTerm, selectedType, priceRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Trouvez votre logement idéal
          </h1>
          <p className="text-gray-400">Découvrez des milliers d'offres dans toute la France</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 flex items-center px-4 py-3">
                <Search className="w-5 h-5 text-cyan-400 mr-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher par ville ou titre..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                px-6 rounded-xl backdrop-blur-xl border transition-all relative group
                ${showFilters
                  ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }
              `}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 space-y-6">
              <div>
                <label className="text-sm text-gray-400 mb-3 block">Type de logement</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <FilterButton
                    icon={HomeIcon}
                    label="Tous"
                    active={selectedType === 'all'}
                    onClick={() => setSelectedType('all')}
                  />
                  <FilterButton
                    icon={HomeIcon}
                    label="Maison"
                    active={selectedType === 'house'}
                    onClick={() => setSelectedType('house')}
                  />
                  <FilterButton
                    icon={DoorOpen}
                    label="Chambre"
                    active={selectedType === 'room'}
                    onClick={() => setSelectedType('room')}
                  />
                  <FilterButton
                    icon={Building2}
                    label="Studio"
                    active={selectedType === 'studio'}
                    onClick={() => setSelectedType('studio')}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm text-gray-400">Prix par nuit</label>
                  <span className="text-sm text-cyan-400">{priceRange[0]} - {priceRange[1]}</span>
                </div>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 text-gray-400">
          {filteredListings.length} logement{filteredListings.length > 1 ? 's' : ''} trouvé{filteredListings.length > 1 ? 's' : ''}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              isFavorite={favorites.has(listing.id)}
              onToggleFavorite={() => onToggleFavorite(listing.id)}
              onClick={() => onViewListing(listing)}
            />
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 inline-block">
              <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucun résultat</h3>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  icon: Icon,
  label,
  active,
  onClick
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all
        ${active
          ? 'text-cyan-400'
          : 'text-gray-400 hover:text-white'
        }
      `}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur"></div>
      )}
      <div className={`
        relative backdrop-blur-sm rounded-xl px-3 py-2 flex items-center space-x-2 w-full justify-center
        ${active
          ? 'bg-white/10 border border-cyan-400/30'
          : 'border border-white/10 group-hover:bg-white/5'
        }
      `}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </button>
  );
}
