import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  Home, 
  X, 
  Save, 
  Loader2 
} from "lucide-react";
import CreateListingModal from "./CreateListing"; // Ton modal de création existant

// --- INTERFACES ---
interface Property {
  id: number;
  title: string;
  monthly_rent: string;
  surface: number;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  description?: string; // Ajouté pour l'édition
  status?: "PUBLISHED" | "DRAFT" | "RENTED";
  address: {
    full_address: string;
    city: string;
  };
  primary_photo?: {
    url: string;
  };
}

// --- COMPOSANTE MODAL D'ÉDITION (Interne) ---
interface EditModalProps {
  property: Property;
  onClose: () => void;
  onUpdate: (id: number, updatedFields: any) => Promise<void>;
}

function EditListingModal({ property, onClose, onUpdate }: EditModalProps) {
  const [formData, setFormData] = useState({
    title: property.title,
    monthly_rent: property.monthly_rent,
    description: property.description || "",
    surface: property.surface,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onUpdate(property.id, formData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Modifier l'annonce</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loyer Mensuel (FCFA)</label>
              <input 
                type="number" 
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.monthly_rent}
                onChange={(e) => setFormData({...formData, monthly_rent: e.target.value})}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface (m²)</label>
              <input 
                type="number" 
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.surface}
                onChange={(e) => setFormData({...formData, surface: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition"
            >
              Annuler
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- COMPOSANTE PRINCIPALE ---
function MyProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null); // Si null = modal fermé, sinon = modal ouvert avec cette prop
  
  const navigate = useNavigate();

  // 1. GET Properties
  const fetchProperties = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8000/api/properties/my_properties/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur chargement :", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // 2. DELETE Property (API Call)
  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette annonce ?")) return;

    const token = localStorage.getItem("token");
    const previousProperties = [...properties];
    
    // Optimistic UI update
    setProperties(properties.filter((p) => p.id !== id));

    try {
      const res = await fetch(`http://localhost:8000/api/properties/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Erreur suppression");
      // 204 No Content = Succès, rien à faire de plus

    } catch (error) {
      alert("Impossible de supprimer l'annonce.");
      setProperties(previousProperties); // Rollback
    }
  };

  // 3. UPDATE Property (API Call)
  const handleUpdate = async (id: number, updatedFields: any) => {
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`http://localhost:8000/api/properties/${id}/`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(updatedFields)
      });

      if (res.ok) {
        const updatedProp = await res.json();
        
        // Mise à jour de la liste locale
        setProperties(prev => prev.map(p => p.id === id ? updatedProp : p));
        
        // Fermer le modal
        setPropertyToEdit(null);
      } else {
        alert("Erreur lors de la modification.");
      }
    } catch (error) {
      console.error("Erreur update:", error);
      alert("Erreur réseau lors de la modification.");
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "PUBLISHED": return <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase">Publié</span>;
      case "DRAFT": return <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-full uppercase">Brouillon</span>;
      case "RENTED": return <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full uppercase">Loué</span>;
      default: return <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase">Publié</span>;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 px-4 md:px-8 pb-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Propriétés</h1>
            <p className="text-gray-500 mt-1">Gérez vos annonces et suivez leur statut.</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            Créer une annonce
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center flex flex-col items-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
                <Home size={40} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Aucune propriété pour le moment</h3>
            <button onClick={() => setShowCreateModal(true)} className="text-blue-600 font-bold hover:underline mt-2">
              Publier ma première annonce
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
                
                {/* Image Area */}
                <div className="relative h-56 group cursor-pointer" onClick={() => navigate(`/properties/${p.id}`)}>
                  <img
                    src={p.primary_photo?.url || "/placeholder.jpg"}
                    alt={p.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">{getStatusBadge(p.status)}</div>
                  <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1 rounded-lg text-sm font-bold text-gray-900 shadow-sm">
                    {parseInt(p.monthly_rent).toLocaleString()} FCFA
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1 mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                    <MapPin size={14} /> {p.address.full_address}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 mt-auto">
                    <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
                      <BedDouble size={18} className="text-blue-500 mb-1" />
                      <span className="text-xs font-semibold text-gray-700">{p.number_of_bedrooms} Ch.</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
                      <Bath size={18} className="text-blue-500 mb-1" />
                      <span className="text-xs font-semibold text-gray-700">{p.number_of_bathrooms} Sdb.</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
                      <Maximize size={18} className="text-blue-500 mb-1" />
                      <span className="text-xs font-semibold text-gray-700">{p.surface} m²</span>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button 
                        onClick={() => navigate(`/properties/${p.id}`)}
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                        <Eye size={16} /> Voir
                    </button>
                    
                    {/* BOUTON MODIFIER ACTIF */}
                    <button 
                        onClick={() => setPropertyToEdit(p)}
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                        <Edit size={16} /> Modifier
                    </button>

                    {/* BOUTON SUPPRIMER ACTIF */}
                    <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Supprimer"
                    >
                        <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Création */}
        {showCreateModal && (
          <CreateListingModal 
            onClose={() => setShowCreateModal(false)} 
            onSuccess={() => {
                setShowCreateModal(false);
                fetchProperties();
            }}
          />
        )}

        {/* Modal Modification (Nouveau) */}
        {propertyToEdit && (
          <EditListingModal 
            property={propertyToEdit}
            onClose={() => setPropertyToEdit(null)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default MyProperties;