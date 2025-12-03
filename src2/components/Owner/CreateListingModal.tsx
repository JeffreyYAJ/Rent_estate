import { useState } from 'react';
import { X, Home, DoorOpen, Building2, Upload } from 'lucide-react';

interface CreateListingModalProps {
  onClose: () => void;
}

export default function CreateListingModal({ onClose }: CreateListingModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'studio' as 'house' | 'room' | 'studio',
    location: '',
    price: '',
    bedrooms: '1',
    bathrooms: '1',
    maxGuests: '2',
    amenities: [] as string[]
  });

  const amenitiesList = ['WiFi', 'Cuisine', 'Climatisation', 'TV', 'Parking', 'Piscine', 'Jardin', 'BBQ', 'Buanderie'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="backdrop-blur-xl bg-gray-950/90 rounded-3xl border border-white/10 shadow-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Créer une annonce
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Titre de l'annonce</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all"
                placeholder="Ex: Appartement moderne avec vue"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all resize-none"
                placeholder="Décrivez votre logement..."
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Type de logement</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'house' })}
                  className={`
                    flex flex-col items-center space-y-2 p-4 rounded-xl border transition-all
                    ${formData.type === 'house'
                      ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }
                  `}
                >
                  <Home className="w-6 h-6" />
                  <span className="text-sm font-medium">Maison</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'room' })}
                  className={`
                    flex flex-col items-center space-y-2 p-4 rounded-xl border transition-all
                    ${formData.type === 'room'
                      ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }
                  `}
                >
                  <DoorOpen className="w-6 h-6" />
                  <span className="text-sm font-medium">Chambre</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'studio' })}
                  className={`
                    flex flex-col items-center space-y-2 p-4 rounded-xl border transition-all
                    ${formData.type === 'studio'
                      ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }
                  `}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="text-sm font-medium">Studio</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Localisation</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all"
                  placeholder="Ex: Paris, France"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Prix par nuit (€)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all"
                  placeholder="89"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Chambres</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Salles de bain</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  className="w-full backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Voyageurs max</label>
                <input
                  type="number"
                  value={formData.maxGuests}
                  onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                  className="w-full backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Équipements</label>
              <div className="grid grid-cols-3 gap-2">
                {amenitiesList.map(amenity => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`
                      px-3 py-2 rounded-lg border text-sm transition-all
                      ${formData.amenities.includes(amenity)
                        ? 'bg-cyan-500/20 border-cyan-400/30 text-cyan-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                      }
                    `}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Photos</label>
              <div className="backdrop-blur-sm bg-white/5 rounded-xl border-2 border-dashed border-white/10 p-8 text-center hover:border-cyan-400/30 transition-all cursor-pointer">
                <Upload className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-1">Cliquez pour ajouter des photos</p>
                <p className="text-gray-600 text-xs">ou glissez-déposez vos fichiers</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 px-6 py-3 text-white hover:bg-white/10 transition-all"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 relative group overflow-hidden rounded-xl p-[2px] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gray-900 rounded-[10px] px-6 py-3 group-hover:bg-transparent transition-all">
                  <span className="text-white font-semibold">Publier l'annonce</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
