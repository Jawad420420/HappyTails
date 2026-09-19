import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { saveSession, clearSession, getStoredUser } from './lib/auth';
import { getPets } from './lib/api';

// Components
import Header from './components/Header';
import AuthFlow from './components/AuthFlow';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import FindPet from './pages/FindPet';
import PetDetails from './pages/PetDetails';
import AdoptionApply from './pages/AdoptionApply';
import AddPet from './pages/AddPet';
import Volunteer from './pages/Volunteer';
import Vaccination from './pages/Vaccination';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PetCareGuide from './pages/PetCareGuide';
import SuccessStories from './pages/SuccessStories';

export default function App() {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);

  // Auth States restored from localStorage
  const storedUser = getStoredUser();
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const [userRole, setUserRole] = useState(storedUser?.role || null); // 'user' | 'admin'
  const [userName, setUserName] = useState(storedUser?.name || '');
  const [userAvatar, setUserAvatar] = useState(storedUser?.avatar || '');

  const loadPets = async () => {
    try {
      setLoadingPets(true);
      const data = await getPets();
      setPets(data);
    } catch {
      // Ignore network failure on initial load
    } finally {
      setLoadingPets(false);
    }
  };

  useEffect(() => {
    loadPets();
  }, []);

  const handleSelectPet = (pet) => {
    const id = pet._id || pet.id;
    navigate(`/pet/${id}`);
  };

  const handleApplyPet = (pet) => {
    const id = pet._id || pet.id;
    navigate(`/apply/${id}`);
  };

  const handleToggleFavorite = (petId) => {
    setPets((prev) =>
      prev.map((p) => {
        const id = p._id || p.id;
        return id === petId ? { ...p, isFavorite: !p.isFavorite } : p;
      })
    );
  };

  const handleLogin = (user, token) => {
    saveSession(token, user);
    setIsLoggedIn(true);
    setUserRole(user.role);
    setUserName(user.name);
    setUserAvatar(user.avatar || '');

    if (user.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    setUserAvatar('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f4fafd] text-[#161d1f] flex flex-col font-sans">
      <Header
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        userName={userName}
        userAvatar={userAvatar}
        onOpenAuth={() => navigate('/auth')}
        onLogout={handleLogout}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Routes>
          {/* Main Pages */}
          <Route
            path="/"
            element={
              <Home
                pets={pets}
                onSelectPet={handleSelectPet}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/search"
            element={
              <FindPet
                pets={pets}
                onSelectPet={handleSelectPet}
                onToggleFavorite={handleToggleFavorite}
                userRole={userRole}
              />
            }
          />
          <Route
            path="/pet/:id"
            element={
              <PetDetails
                isLoggedIn={isLoggedIn}
                onApply={handleApplyPet}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/apply/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
                <AdoptionApply />
              </ProtectedRoute>
            }
          />

          {/* Form & Resource Pages */}
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/vaccination" element={<Vaccination />} />
          <Route path="/pet-care" element={<PetCareGuide />} />
          <Route path="/stories" element={<SuccessStories />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                allowedRole="admin"
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-pet"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                allowedRole="admin"
              >
                <AddPet />
              </ProtectedRoute>
            }
          />

          {/* User Dashboard */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole}>
                <UserDashboard userName={userName} />
              </ProtectedRoute>
            }
          />

          {/* Authentication */}
          <Route
            path="/auth"
            element={
              <AuthFlow
                onLogin={handleLogin}
                onCancel={() => navigate('/')}
              />
            }
          />

          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}