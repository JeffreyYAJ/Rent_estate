import { useState } from 'react';
import { X, Home, DoorOpen, Building2, UploadCloud, MapPin, CheckCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface CreateListingModalProps {
  onClose: () => void;
  onSuccess?: () => void; // Pour rafraichir la liste après succès
}

const amenitiesList = [
  { id: 1, name: "WiFi" },
  { id: 2, name: "Cuisine Équipée" },
  { id: 3, name: "Climatisation" },
  { id: 4, name: "Parking Privé" },
  { id: 5, name: "Piscine" },
  { id: 6, name: "Sécurité 24/7" },
];

const steps = [
  "Informations",
  "Détails",
  "Photos",
  "Adresse",
  "Finances"
];

export default function CreateListingModal({ onClose, onSuccess }: CreateListingModalProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "APARTMENT",
    surface: "",
    number_of_rooms: "",
    number_of_bedrooms: "",
    number_of_bathrooms: "",
    floor: "",
    furnished: false,
    monthly_rent: "",
    charges: "",
    deposit: "",
    agency_fees: "",
    address: {
      street_address: "",
      city: "",
      district: "",
      postal_code: "",
      latitude: "",
      longitude: "",
    },
    amenity_ids: [] as number[],
  });

  const toggleAmenity = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      amenity_ids: prev.amenity_ids.includes(id)
        ? prev.amenity_ids.filter((a) => a !== id)
        : [...prev.amenity_ids, id],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      // 1. D'abord on crée la propriété
      const propertyPayload = {
        ...formData,
        surface: Number(formData.surface),
        number_of_rooms: Number(formData.number_of_rooms),
        number_of_bedrooms: Number(formData.number_of_bedrooms),
        number_of_bathrooms: Number(formData.number_of_bathrooms),
        floor: Number(formData.floor),
        monthly_rent: formData.monthly_rent,
        deposit: formData.deposit,
        agency_fees: formData.agency_fees,
        charges: formData.charges,
        address: {
          ...formData.address,
          latitude: Number(formData.address.latitude),
          longitude: Number(formData.address.longitude),
        }
      };

      const resProp = await fetch("http://localhost:8000/api/properties/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(propertyPayload),
      });

      if (!resProp.ok) throw new Error("Erreur création propriété");
      const createdProperty = await resProp.json();

      // 2. Ensuite on upload les photos (si API séparée ou multipart)
      // Note: Si ton API attend tout en un, il faut utiliser FormData dès le début.
      // Ici je suppose que tu as un endpoint pour ajouter des photos à une propriété existante
      // ou que tu dois adapter pour utiliser FormData globalement.
      
      // EXEMPLE UPLOAD PHOTOS (A adapter selon ton API exacte)
      if (photos.length > 0) {
         const photoFormData = new FormData();
         photos.forEach((photo) => {
            photoFormData.append('images', photo); // 'images' ou 'image' selon ton back
         });
         photoFormData.append('property_id', createdProperty.id);

         await fetch(`http://localhost:8000/api/properties/${createdProperty.id}/upload_photos/`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }, // Pas de Content-Type pour FormData
            body: photoFormData
         });
      }

      alert("Propriété publiée avec succès !");
      if (onSuccess) onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la publication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calcul progression
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Ajouter un bien</h2>
            <p className="text-sm text-gray-500">Étape {step + 1} sur {steps.length}: {steps[step]}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-100 h-1.5">
          <div 
            className="bg-blue-600 h-1.5 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* BODY SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-8">
          <form id="create-listing-form" onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
            
            {/* ÉTAPE 0 : GENERAL */}
            {step === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Titre de l'annonce</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Superbe appartement vue mer..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { key: "APARTMENT", icon: Building2, label: "Appartement" },
                    { key: "HOUSE", icon: Home, label: "Maison" },
                    { key: "ROOM", icon: DoorOpen, label: "Chambre" },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.type === item.key;
                    return (
                      <button
                        type="button"
                        key={item.key}
                        onClick={() => setFormData({ ...formData, type: item.key })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all
                          ${isSelected 
                            ? "border-blue-600 bg-blue-50 text-blue-700" 
                            : "border-gray-200 hover:border-blue-300 text-gray-600"
                          }`}
                      >
                        <Icon size={28} />
                        <span className="font-medium">{item.label}</span>
                        {isSelected && <CheckCircle size={16} className="text-blue-600 absolute top-2 right-2" />}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Décrivez les points forts de votre logement..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 1 : DETAILS */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                   <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Surface (m²)</label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-blue-500 outline-none"
                        value={formData.surface}
                        onChange={e => setFormData({...formData, surface: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Pièces</label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-blue-500 outline-none"
                        value={formData.number_of_rooms}
                        onChange={e => setFormData({...formData, number_of_rooms: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Chambres</label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-blue-500 outline-none"
                        value={formData.number_of_bedrooms}
                        onChange={e => setFormData({...formData, number_of_bedrooms: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Salles de bain</label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-blue-500 outline-none"
                        value={formData.number_of_bathrooms}
                        onChange={e => setFormData({...formData, number_of_bathrooms: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Étage</label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-blue-500 outline-none"
                        value={formData.floor}
                        onChange={e => setFormData({...formData, floor: e.target.value})}
                      />
                   </div>
                </div>

                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-3">Équipements</label>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {amenitiesList.map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleAmenity(item.id)}
                          className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition
                            ${formData.amenity_ids.includes(item.id) 
                              ? "bg-blue-100 text-blue-800 border-blue-200 border" 
                              : "bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100"}`}
                        >
                          {item.name}
                        </button>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 : PHOTOS */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer relative">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handlePhotoUpload}
                    />
                    <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                       <UploadCloud className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-700 font-medium">Cliquez pour ajouter des photos</p>
                    <p className="text-sm text-gray-400 mt-1">PNG, JPG jusqu'à 5Mo</p>
                 </div>

                 {photos.length > 0 && (
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photos.map((file, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden shadow-sm aspect-square">
                           <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                           <button 
                              type="button"
                              onClick={() => removePhoto(idx)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                           >
                              <X size={14} />
                           </button>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
            )}

            {/* ÉTAPE 3 : ADRESSE */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-700 text-sm mb-4">
                    <MapPin className="shrink-0" />
                    <p>Soyez précis ! L'adresse exacte ne sera communiquée qu'une fois la réservation confirmée.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse (Rue, Avenue)</label>
                        <input 
                           type="text" 
                           className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
                           value={formData.address.street_address}
                           onChange={e => setFormData({...formData, address: {...formData.address, street_address: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                        <input 
                           type="text" 
                           className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
                           value={formData.address.city}
                           onChange={e => setFormData({...formData, address: {...formData.address, city: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quartier</label>
                        <input 
                           type="text" 
                           className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
                           value={formData.address.district}
                           onChange={e => setFormData({...formData, address: {...formData.address, district: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                        <input 
                           type="number" 
                           placeholder="ex: 3.8480"
                           className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
                           value={formData.address.latitude}
                           onChange={e => setFormData({...formData, address: {...formData.address, latitude: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                        <input 
                           type="number" 
                           placeholder="ex: 11.5021"
                           className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
                           value={formData.address.longitude}
                           onChange={e => setFormData({...formData, address: {...formData.address, longitude: e.target.value}})}
                        />
                    </div>
                 </div>
              </div>
            )}

            {/* ÉTAPE 4 : FINANCES */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                      <label className="block text-lg font-bold text-gray-800 mb-2">Loyer Mensuel</label>
                      <div className="relative">
                          <input 
                             type="number" 
                             className="w-full pl-4 pr-16 py-4 rounded-xl border border-gray-300 text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                             placeholder="0"
                             value={formData.monthly_rent}
                             onChange={e => setFormData({...formData, monthly_rent: e.target.value})}
                          />
                          <span className="absolute right-6 top-5 text-gray-400 font-medium">FCFA</span>
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                      <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Caution (mois)</label>
                          <input 
                             type="number" 
                             className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
                             value={formData.deposit}
                             onChange={e => setFormData({...formData, deposit: e.target.value})}
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Charges Mensuelles</label>
                          <input 
                             type="number" 
                             className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500"
                             value={formData.charges}
                             onChange={e => setFormData({...formData, charges: e.target.value})}
                          />
                      </div>
                  </div>
              </div>
            )}
          </form>
        </div>

        {/* FOOTER NAVIGATION */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            {step > 0 ? (
               <button 
                 type="button" 
                 onClick={() => setStep(step - 1)}
                 className="flex items-center gap-2 text-gray-600 font-semibold hover:text-gray-900 transition"
               >
                 <ChevronLeft size={20} /> Retour
               </button>
            ) : (
               <div></div> // Spacer
            )}

            {step < steps.length - 1 ? (
               <button 
                 type="button" 
                 onClick={() => setStep(step + 1)}
                 className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition shadow-lg"
               >
                 Suivant <ChevronRight size={20} />
               </button>
            ) : (
               <button 
                 type="submit" 
                 form="create-listing-form"
                 disabled={isSubmitting}
                 className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-70"
               >
                 {isSubmitting ? <Loader2 className="animate-spin" /> : <CheckCircle />}
                 Publier l'annonce
               </button>
            )}
        </div>

      </div>
    </div>
  );
}