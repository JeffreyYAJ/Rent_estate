import { Home, Heart, MessageSquare, PlusCircle, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  currentView: 'discover' | 'favorites' | 'messages' | 'myListings';
  onViewChange: (view: 'discover' | 'favorites' | 'messages' | 'myListings') => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/30 blur-lg rounded-full"></div>
              <div className="relative bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              DreamStay
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <NavButton
              icon={Home}
              label="Découvrir"
              active={currentView === 'discover'}
              onClick={() => onViewChange('discover')}
            />
            <NavButton
              icon={Heart}
              label="Favoris"
              active={currentView === 'favorites'}
              onClick={() => onViewChange('favorites')}
            />
            <NavButton
              icon={MessageSquare}
              label="Messages"
              active={currentView === 'messages'}
              onClick={() => onViewChange('messages')}
            />
            <NavButton
              icon={PlusCircle}
              label="Mes annonces"
              active={currentView === 'myListings'}
              onClick={() => onViewChange('myListings')}
            />
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10">
              {user?.avatar && (
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
              )}
              <span className="text-sm text-gray-300">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-red-400"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-1 pb-2 overflow-x-auto">
          <NavButton
            icon={Home}
            label="Découvrir"
            active={currentView === 'discover'}
            onClick={() => onViewChange('discover')}
            compact
          />
          <NavButton
            icon={Heart}
            label="Favoris"
            active={currentView === 'favorites'}
            onClick={() => onViewChange('favorites')}
            compact
          />
          <NavButton
            icon={MessageSquare}
            label="Messages"
            active={currentView === 'messages'}
            onClick={() => onViewChange('messages')}
            compact
          />
          <NavButton
            icon={PlusCircle}
            label="Annonces"
            active={currentView === 'myListings'}
            onClick={() => onViewChange('myListings')}
            compact
          />
        </div>
      </div>
    </header>
  );
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
  compact = false
}: {
  icon: any;
  label: string;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-xl transition-all relative group
        ${active
          ? 'text-cyan-400'
          : 'text-gray-400 hover:text-white'
        }
        ${compact ? 'text-xs' : ''}
      `}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur"></div>
      )}
      <div className={`
        relative backdrop-blur-sm rounded-xl px-3 py-2 flex items-center space-x-2
        ${active
          ? 'bg-white/10 border border-cyan-400/30'
          : 'border border-transparent group-hover:bg-white/5'
        }
      `}>
        <Icon className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
        <span className={`font-medium ${compact ? 'text-xs' : ''}`}>{label}</span>
      </div>
    </button>
  );
}
