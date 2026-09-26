import React, { useState, useMemo, useEffect } from 'react';
import TashkentMap from './components/Map';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ActionDetailModal from './components/ActionDetailModal';
import AddActionModal from './components/AddActionModal';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import ToastNotification from './components/ToastNotification';
import { 
  getStoredInitiatives, 
  saveInitiative, 
  getStoredUser, 
  saveUser, 
  removeUser, 
  getLikedInitiatives, 
  toggleLikeInitiative,
  getLeaderboard 
} from './utils/storage';

export default function App() {
  // State for initiatives and persistent storage
  const [initiatives, setInitiatives] = useState(getStoredInitiatives);
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [likes, setLikes] = useState(getLikedInitiatives);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard);

  // Filters and Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Barcha tumanlar');
  const [selectedType, setSelectedType] = useState('all'); // 'all' | 'tree' | 'cleanup'

  // Map & Navigation state
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [focusedCoords, setFocusedCoords] = useState(null);
  const [clickCoordsForAdd, setClickCoordsForAdd] = useState(null);

  // Modals & Drawers state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Filtered initiatives based on search, district, and type
  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((item) => {
      // Type match
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // District match
      if (selectedDistrict !== 'Barcha tumanlar' && item.district !== selectedDistrict) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchDistrict = item.district.toLowerCase().includes(query);
        const matchAuthor = item.author.name.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchDistrict || matchAuthor;
      }
      return true;
    });
  }, [initiatives, selectedType, selectedDistrict, searchQuery]);

  // Aggregate totals
  const totalTrees = useMemo(() => {
    return initiatives
      .filter((i) => i.type === 'tree')
      .reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);
  }, [initiatives]);

  const totalCleanups = useMemo(() => {
    return initiatives
      .filter((i) => i.type === 'cleanup')
      .reduce((acc, curr) => acc + (Number(curr.count) || 0), 0);
  }, [initiatives]);

  // User's own initiatives
  const myInitiatives = useMemo(() => {
    if (!currentUser) return [];
    return initiatives.filter(i => 
      i.author.name.toLowerCase() === currentUser.name.toLowerCase() ||
      i.author.handle === currentUser.handle
    );
  }, [initiatives, currentUser]);

  // Handle map click to add action
  const handleMapClickToAdd = (latlng) => {
    setClickCoordsForAdd([latlng.lat, latlng.lng]);
    setIsAddModalOpen(true);
  };

  // Handle initiative selection (from map marker or sidebar feed)
  const handleSelectInitiative = (item) => {
    setSelectedInitiative(item);
    setFocusedCoords(item.coords);
  };

  // Handle opening full detail modal
  const handleOpenDetailModal = (item) => {
    setSelectedInitiative(item);
    setIsDetailModalOpen(true);
  };

  // Handle adding new initiative
  const handleSaveInitiative = (newInit) => {
    const updated = saveInitiative(newInit);
    setInitiatives(updated);
    setSelectedInitiative(newInit);
    setFocusedCoords(newInit.coords);

    // Update user stats if logged in
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        points: (currentUser.points || 0) + (newInit.type === 'tree' ? 50 : 40),
        trees: (currentUser.trees || 0) + (newInit.type === 'tree' ? newInit.count : 0),
        cleanups: (currentUser.cleanups || 0) + (newInit.type === 'cleanup' ? 1 : 0)
      };
      saveUser(updatedUser);
      setCurrentUser(updatedUser);
    }

    setToast({
      type: 'success',
      title: "Muvaffaqiyatli qo'shildi!",
      message: `"${newInit.title}" xaritada aks ettirildi.`
    });
  };

  // Handle like toggle
  const handleToggleLike = (id) => {
    const isNowLiked = toggleLikeInitiative(id);
    setLikes(getLikedInitiatives());
    setInitiatives(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: isNowLiked ? (item.likes || 0) + 1 : Math.max(0, (item.likes || 1) - 1)
        };
      }
      return item;
    }));
  };

  // Auth actions
  const handleLogin = (user) => {
    const saved = saveUser(user);
    setCurrentUser(saved);
    setToast({
      type: 'success',
      title: "Xush kelibsiz!",
      message: `${user.name}, profilingiz faollashtirildi.`
    });
  };

  const handleLogout = () => {
    removeUser();
    setCurrentUser(null);
    setToast({
      type: 'info',
      title: "Chiqildi",
      message: "Hisobdan muvaffaqiyatli chiqildi."
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      
      {/* Floating Header Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        totalTrees={totalTrees}
        totalCleanups={totalCleanups}
        onOpenAddModal={() => {
          setClickCoordsForAdd([41.2995, 69.2401]);
          setIsAddModalOpen(true);
        }}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        currentUser={currentUser}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Fullscreen Tashkent Map */}
      <main className="w-full h-full">
        <TashkentMap
          initiatives={filteredInitiatives}
          selectedInitiative={selectedInitiative}
          onSelectInitiative={handleSelectInitiative}
          onMapClickToAdd={handleMapClickToAdd}
          focusedCoords={focusedCoords}
          onOpenDetailModal={handleOpenDetailModal}
        />
      </main>

      {/* Activity Feed & Eco-Heroes Leaderboard Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        initiatives={initiatives}
        leaderboard={leaderboard}
        onSelectInitiative={(item) => {
          handleSelectInitiative(item);
          handleOpenDetailModal(item);
        }}
      />

      {/* Add New Action Modal */}
      <AddActionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveInitiative}
        initialCoords={clickCoordsForAdd}
        currentUser={currentUser}
      />

      {/* Action Detail & Before/After Modal */}
      {isDetailModalOpen && (
        <ActionDetailModal
          initiative={selectedInitiative}
          onClose={() => setIsDetailModalOpen(false)}
          isLiked={!!likes[selectedInitiative?.id]}
          onToggleLike={handleToggleLike}
        />
      )}

      {/* User Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        myInitiatives={myInitiatives}
        onSelectInitiative={(item) => {
          handleSelectInitiative(item);
          handleOpenDetailModal(item);
        }}
      />

      {/* Toast Notification Alert */}
      <ToastNotification
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
