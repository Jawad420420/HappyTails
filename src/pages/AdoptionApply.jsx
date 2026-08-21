import React from 'react';
import ApplicationForm from '../components/adoptionapply/ApplicationForm';

export default function AdoptionApply({ selectedPet, onBack, onSubmitApplication }) {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    housingType: 'House',
    ownOrRent: 'Own',
    hasFencedYard: 'Yes, fully fenced',
    hasOtherPets: 'No',
    termsAccepted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      id: `app-${Date.now()}`,
      petId: selectedPet.id,
      petName: selectedPet.name,
      petBreed: selectedPet.breed,
      petAge: selectedPet.age,
      petImage: selectedPet.mainImage,
      shelterName: selectedPet.shelterName,
      appliedDate: new Date().toLocaleDateString(),
      status: 'Under Review',
      ...formData,
    };
    onSubmitApplication(newApp);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-4 text-[#426306] font-bold">
        ← Back
      </button>
      <ApplicationForm 
        formData={formData} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}
