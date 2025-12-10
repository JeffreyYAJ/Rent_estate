import { useState, useEffect } from "react";
import { Save, User, Mail, Phone, Loader2, MapPin } from "lucide-react";
import React from "react";


export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    // Ajoute d'autres champs si ton API GET /me/ les renvoie
  });

  // 1. Charger les données actuelles de l'utilisateur
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        // On suppose que GET /api/auth/me/ existe pour récupérer les infos
        const res = await fetch("http://localhost:8000/api/auth/me/", {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
            const data = await res.json();
            // On pré-remplit le formulaire
            setUserData({
                first_name: data.first_name || "",
                last_name: data.last_name || "",
                email: data.email || "",
                phone: data.phone || "",
            });
        }
      } catch (error) {
        console.error("Erreur chargement profil", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Mettre à jour le profil (PATCH)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/auth/me/", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            first_name: userData.first_name,
            last_name: userData.last_name,
            phone: userData.phone,
            // L'email est souvent en lecture seule, ne pas l'envoyer si l'API ne le permet pas
        }),
      });

      if (res.ok) {
        alert("Profil mis à jour avec succès !");
        // Optionnel : Mettre à jour le nom dans le localStorage si utilisé ailleurs
        // localStorage.setItem("user_name", userData.first_name); 
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur API", error);
      alert("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Chargement de votre profil...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations Personnelles</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                value={userData.first_name}
                onChange={e => setUserData({...userData, first_name: e.target.value})}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                value={userData.last_name}
                onChange={e => setUserData({...userData, last_name: e.target.value})}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                disabled 
                value={userData.email}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">L'email ne peut pas être modifié ici.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="tel" 
                value={userData.phone}
                onChange={e => setUserData({...userData, phone: e.target.value})}
                placeholder="+237..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-70"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}