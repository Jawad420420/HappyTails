import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { initialPetsData, initialApplications } from './data/petsData';
import { saveSession, clearSession, getStoredUser } from './lib/auth';

// Components import
import Header from './components/Header';
import AuthFlow from './components/AuthFlow';
import ProtectedRoute from './components/ProtectedRoute';

// Active Pages import
import Home from './pages/Home';
import FindPet from './pages/FindPet';
import PetDetails from './pages/PetDetails';
import AdoptionApply from './pages/AdoptionApply';
import MyApplications from './pages/MyApplications';
import AddPet from './pages/AddPet';
import Volunteer from './pages/Volunteer';
import Vaccination from './pages/Vaccination';
import UserDashboard from './pages/UserDashboard';
import Shelters from './pages/Shelters';
import PetCareGuide from './pages/PetCareGuide';
import SuccessStories from './pages/SuccessStories';
import ShelterDashboard from './pages/ShelterDashboard';

export default function App() {
  const navigate = useNavigate();
  const [pets, setPets] = useState(initialPetsData);
  const [selectedPet, setSelectedPet] = useState(initialPetsData[0]);
  const [applications, setApplications] = useState(initialApplications);

  // Auth States (restored from localStorage on load, so refreshes keep the session)
  const storedUser = getStoredUser();
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedUser);
  const [userRole, setUserRole] = useState(storedUser?.role || null); // 'adopter' or 'shelter'
  const [userName, setUserName] = useState(storedUser?.name || '');

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    navigate('/pet-details');
  };

  const handleApplyPet = (pet) => {
    setSelectedPet(pet);
    navigate('/apply');
  };

  // Favorite toggle handler
  function handleToggleFavorite(petId) {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, isFavorite: !pet.isFavorite } : pet
      )
    );
  }

  const handleSubmitApplication = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  // Auth Handler Functions
  const handleLogin = (user, token) => {
    saveSession(token, user);
    setIsLoggedIn(true);
    setUserRole(user.role);
    setUserName(user.name);
    // Auto-redirect to proper dashboard after login
    if (user.role === 'adopter') {
      navigate('/user-dashboard');
    } else {
      navigate('/shelter-dashboard');
    }
  };

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f4fafd] text-[#161d1f] flex flex-col font-sans">
      <Header
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        userName={userName}
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
            path="/pet-details"
            element={
              <PetDetails
                pet={selectedPet}
                onApply={handleApplyPet}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/apply"
            element={
              <AdoptionApply
                selectedPet={selectedPet}
                onSubmitApplication={handleSubmitApplication}
              />
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRole="adopter">
                <MyApplications applications={applications} />
              </ProtectedRoute>
            }
          />

          {/* Form & Info Pages */}
          <Route
            path="/add-pet"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRole="shelter">
                <AddPet />
              </ProtectedRoute>
            }
          />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/vaccination" element={<Vaccination />} />
          <Route path="/shelters" element={<Shelters />} />
          <Route path="/pet-care" element={<PetCareGuide />} />
          <Route path="/stories" element={<SuccessStories />} />

          {/* Dashboards & Auth */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRole="adopter">
                <UserDashboard applications={applications} userName={userName} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shelter-dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} userRole={userRole} allowedRole="shelter">
                <ShelterDashboard userName={userName} />
              </ProtectedRoute>
            }
          />
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