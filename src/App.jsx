// main app component jeta shob page and state handle kore
import { useState, useEffect } from 'react';
import { initialPetsData, initialApplications } from './data/petsData';

// components import
import Header from './components/Header';


// pages import
import Home from './pages/Home';
import FindPet from './pages/FindPet';
import PetDetails from './pages/PetDetails';
import AdoptionApply from './pages/AdoptionApply';
import MyApplications from './pages/MyApplications';
import AddPet from './pages/AddPet';
import Volunteer from './pages/Volunteer';
import Vaccination from './pages/Vaccination';
import AdminDashboard from './pages/AdminDashboard';

// placeholder pages removed
export default function App() {
  // navigation state
  const [currentPage, setCurrentPage] = useState('home');
  // pet data list
  const [pets, setPets] = useState(initialPetsData);
  // selected pet
  const [selectedPet, setSelectedPet] = useState(initialPetsData[0]);
  // application history
  const [applications, setApplications] = useState(initialApplications);

  // page change hole scroll up kora
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // pet details e jawar handler
  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setCurrentPage('pet-details');
  };

  // adopt apply button click handler
  const handleApplyPet = (pet) => {
    setSelectedPet(pet);
    setCurrentPage('apply');
  };

  // favorite toggle korar handler
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

  // new application submit korar handler
  const handleSubmitApplication = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  // page render korar switch
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
        if (!selectedPet) {
          return (
            <FindPet
              pets={pets}
              onSelectPet={handleSelectPet}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        }
        return (
          <PetDetails
            pet={selectedPet}
            onBack={() => setCurrentPage('search')}
            onApply={handleApplyPet}
            onToggleFavorite={handleToggleFavorite}
          />
        );

      case 'apply':
        if (!selectedPet) {
          return (
            <FindPet
              pets={pets}
              onSelectPet={handleSelectPet}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        }
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
           console.log("ADD PET CLICKED");
           return <AddPet />;

      case 'volunteer':
            return <Volunteer />;

      case 'vaccination':
          return <Vaccination />;

      case 'admin':
          return <AdminDashboard />;

      // missing placeholder pages handled by default
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
      {/* top navigation bar */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      {/* main content container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {renderCurrentPage()}
      </main>

      
    </div>
  );
}
