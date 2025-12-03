import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
//import LoginScreen from './components/Auth/LoginScreen';
import Header from './components/Home/Header';
import DiscoverPage from './components/Home/DiscoverPage';
import FavoritesPage from './components/Home/FavoritesPage';
import MessagesPage from './components/Messages/MessagesPage';
import MyListingsPage from './components/Owner/MyListingsPage';
//import ListingDetailModal from './components/Home/ListingDetailModal';
import { mockListings } from './data/mockData';
import { Listing } from './types';

function AppContent() {
  //const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<'discover' | 'favorites' | 'messages' | 'myListings'>('discover');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  //const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  //const [contactingListing, setContactingListing] = useState<Listing | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleViewListing = (listing: Listing) => {
    setSelectedListing(listing);
  };

  // const handleContactOwner = () => {
  //   setContactingListing(selectedListing);
  //   setSelectedListing(null);
  //   setCurrentView('messages');
  // };

  // if (!isAuthenticated) {
  //   return <LoginScreen />;
  // }

  return (
    <div className="min-h-screen">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      {currentView === 'discover' && (
        <DiscoverPage
          listings={mockListings}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onViewListing={handleViewListing}
        />
      )}

      {currentView === 'favorites' && (
        <FavoritesPage
          listings={mockListings}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onViewListing={handleViewListing}
        />
      )}

      {currentView === 'messages' && <MessagesPage />}

      {currentView === 'myListings' && (
        <MyListingsPage
          listings={mockListings}
          onViewListing={handleViewListing}
        />
      )}

      {/* {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          isFavorite={favorites.has(selectedListing.id)}
          onClose={() => setSelectedListing(null)}
          onToggleFavorite={() => toggleFavorite(selectedListing.id)}
          onContact={handleContactOwner}
        />
      )} */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
