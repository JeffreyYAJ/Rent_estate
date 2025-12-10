import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { User, Home, Heart, Settings, LogOut, MessageSquare, Building } from "lucide-react";

export default function AccountLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      navigate("/login");
    }
  };

  const menuItems = [
    { icon: User, label: "Mon Profil", path: "/account" },
    { icon: Building, label: "Mes Propriétés", path: "/account/my-properties" },
    { icon: Heart, label: "Mes Favoris", path: "/account/favorites" },
    { icon: MessageSquare, label: "Messagerie", path: "/messages" }, // On peut le garder ici ou l'ouvrir en grand
    { icon: Settings, label: "Paramètres", path: "/account/settings" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Compte</h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* SIDEBAR DE NAVIGATION */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                  {/* Initiale (Idéalement récupérée du user) */}
                  M
                </div>
                <div>
                  <p className="font-bold text-gray-900">Mon Espace</p>
                  <p className="text-xs text-gray-500">Gérer mon compte</p>
                </div>
              </div>
              
              <nav className="p-2 space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/account"} // "end" pour éviter que "Mon Profil" soit toujours actif
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-600 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`
                    }
                  >
                    <item.icon size={20} />
                    {item.label}
                  </NavLink>
                ))}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-red-500 hover:bg-red-50 mt-4"
                >
                  <LogOut size={20} />
                  Déconnexion
                </button>
              </nav>
            </div>
          </aside>

          {/* ZONE DE CONTENU VARIABLE */}
          <main className="flex-1 min-h-[500px]">
             {/* C'est ici que s'afficheront Profile, Properties, etc. */}
             <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}