import { useState, useEffect } from 'react';
import { initialPetsData, initialApplications } from './data/petsData';

// Components import
import Header from './components/Header';

// Pages import
import Home from './pages/Home';
import FindPet from './pages/FindPet';
import PetDetails from './pages/PetDetails';
import AdoptionApply from './pages/AdoptionApply';
import MyApplications from './pages/MyApplications';
import AddPet from './pages/AddPet';
import Volunteer from './pages/Volunteer';
import Vaccination from './pages/Vaccination';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Shelters from './pages/Shelters';
import PetCareGuide from './pages/PetCareGuide';
import SuccessStories from './pages/SuccessStories';
import ShelterDashboard from './pages/ShelterDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pets, setPets] = useState(initialPetsData);
  const [selectedPet, setSelectedPet] = useState(initialPetsData[0]);
  const [applications, setApplications] = useState(initialApplications);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setCurrentPage('pet-details');
  };

  const handleApplyPet = (pet) => {
    setSelectedPet(pet);
    setCurrentPage('apply');
  };

  const handleToggleFavorite = (petId) => {
    setPets((prevPets) =>
      prevPets.map((pet) =>
        pet.id === petId ? { ...pet, isFavorite: !pet.isFavorite } : pet
      )
    );
    if (selectedPet && selectedPet.id === petId) {
      setSelectedPet((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleSubmitApplication = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            pets={pets}
            onSelectPet={handleSelectPet}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={setCurrentPage}
          />
        );

      case 'search':
        return (
          <FindPet
            pets={pets}
            onSelectPet={handleSelectPet}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'pet-details':
        return (
          <PetDetails
            pet={selectedPet}
            onBack={() => setCurrentPage('search')}
            onApply={handleApplyPet}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={setCurrentPage}
          />
        );

      case 'apply':
        return (
          <AdoptionApply
            selectedPet={selectedPet}
            onBack={() => setCurrentPage('applications')}
            onSubmitApplication={handleSubmitApplication}
          />
        );

      case 'applications':
        return (
          <MyApplications
            applications={applications}
            onNavigate={setCurrentPage}
          />
        );

      case 'add-pet':
        return <AddPet onNavigate={setCurrentPage} />;

      case 'volunteer':
        return <Volunteer onNavigate={setCurrentPage} />;

      case 'vaccination':
        return <Vaccination onNavigate={setCurrentPage} />;

      case 'admin':
        return <AdminDashboard onNavigate={setCurrentPage} />;

      case 'user-dashboard':
        return (
          <UserDashboard
            applications={applications}
            onNavigate={setCurrentPage}
          />
        );

      case 'shelters':
        return <Shelters onNavigate={setCurrentPage} />;

      case 'pet-care':
        return <PetCareGuide onNavigate={setCurrentPage} />;

      case 'stories':
        return <SuccessStories onNavigate={setCurrentPage} />;

      case 'shelter-dashboard':
        return <ShelterDashboard onNavigate={setCurrentPage} />;

      default:
        return (
          <Home
            pets={pets}
            onSelectPet={handleSelectPet}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4fafd] text-[#161d1f] flex flex-col font-sans">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {renderCurrentPage()}
      </main>
    </div>
  );
}