import { useState } from "react";
import { Bell, Lock, Trash2, X, Loader2, Eye, EyeOff } from "lucide-react";

// --- MODAL CHANGEMENT DE MOT DE PASSE (Interne) ---
interface PasswordModalProps {
  onClose: () => void;
}

function ChangePasswordModal({ onClose }: PasswordModalProps) {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirm: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false); // Pour afficher/masquer le texte

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.new_password !== formData.new_password_confirm) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/auth/me/password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Mot de passe modifié avec succès !");
        onClose();
      } else {
        // Gestion des erreurs API (ex: ancien mot de passe incorrect)
        const msg = data.old_password ? "Ancien mot de passe incorrect." : 
                    data.new_password ? data.new_password[0] : 
                    "Erreur lors du changement.";
        setError(msg);
      }
    } catch (err) {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Changer le mot de passe</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
            <input 
              type="password" 
              name="old_password"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
             <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
             <input 
               type={showPass ? "text" : "password"}
               name="new_password"
               required
               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
               onChange={handleChange}
             />
             <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-8 text-gray-400">
                {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
             </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau</label>
            <input 
              type="password" 
              name="new_password_confirm"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-70 mt-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Confirmer le changement"}
          </button>
        </form>
      </div>
    </div>
  );
}


// --- PAGE PRINCIPALE SETTINGS ---
export default function SettingsPage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Bell className="text-blue-500" /> Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
             <div>
               <p className="font-medium text-gray-800">Alertes Email</p>
               <p className="text-sm text-gray-500">Recevoir des emails pour les nouveaux messages.</p>
             </div>
             <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Lock className="text-orange-500" /> Sécurité
        </h2>
        <p className="text-gray-500 text-sm mb-4">Pour protéger votre compte, utilisez un mot de passe fort.</p>
        
        <button 
          onClick={() => setShowPasswordModal(true)}
          className="bg-orange-50 text-orange-700 border border-orange-200 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition flex items-center gap-2"
        >
          <Lock size={16} />
          Changer mon mot de passe
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-8">
        <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <Trash2 /> Zone de danger
        </h2>
        <p className="text-red-600 text-sm mb-4">
          La suppression de votre compte est irréversible.
        </p>
        <button 
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
            onClick={() => alert("Fonction à venir !")}
        >
          Supprimer mon compte
        </button>
      </div>

      {/* MODAL */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}