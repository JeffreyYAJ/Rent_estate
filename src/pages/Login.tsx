import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHouse, FaLock, FaUser } from "react-icons/fa6";
import { BiLoaderAlt } from "react-icons/bi";

export default function Login() {
  const navigate = useNavigate();
  
  // États du formulaire
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Appel à ton API d'authentification
      // Note: Vérifie si ton endpoint est '/api/token/' ou '/api/login/'
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. SUCCÈS : On stocke le token
        // Django SimpleJWT renvoie souvent { access: "...", refresh: "..." }
        // Si ton API renvoie { token: "..." }, adapte ici.
        const token = data.access || data.token; 
        
        localStorage.setItem("token", token);
        
        
        // Optionnel : stocker le nom d'utilisateur si besoin
        localStorage.setItem("user_name", email);
        localStorage.setItem("user_id", data.user_id);
        // 3. Redirection vers la page des propriétés
        navigate("/properties");
      } else {
        // 4. ERREUR : Identifiants incorrects
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Partie Gauche : Image décorative */}
        <div className="w-full md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <FaHouse /> GEMGEM-ESTATE
            </div>
            <h2 className="text-3xl font-bold mb-4">Bienvenue chez vous.</h2>
            <p className="text-blue-100">
              Louez des appartements et maisons vérifiés en toute sécurité au Cameroun.
            </p>
          </div>
          {/* Cercles décoratifs */}
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-blue-500 rounded-full opacity-50"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-blue-700 rounded-full opacity-50"></div>
        </div>

        {/* Partie Droite : Formulaire */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Connexion</h3>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Ex: jean.dupont"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaLock />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm text-blue-600 hover:underline">Mot de passe oublié ?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:bg-blue-400"
            >
              {loading ? (
                <>
                  <BiLoaderAlt className="animate-spin text-xl" /> Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              S'inscrire gratuitement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}