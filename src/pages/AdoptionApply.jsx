import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ApplicationForm from '../components/adoptionapply/ApplicationForm';

export default function AdoptionApply({ selectedPet, onSubmitApplication }) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    housingType: 'House',
    ownOrRent: 'Own',
    termsAccepted: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApp = {
      id: `app-${Date.now()}`,
      petId: selectedPet?.id || '',
      petName: selectedPet?.name || 'Unknown Pet',
      petBreed: selectedPet?.breed || '',
      petAge: selectedPet?.age || '',
      petImage: selectedPet?.mainImage || '',
      shelterName: selectedPet?.shelterName || '',
      appliedDate: new Date().toLocaleDateString(),
      status: 'Under Review',
      ...formData,
    };
    
    onSubmitApplication(newApp);
    navigate('/applications');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="mb-6">
        <BackButton to="/search" label="Back to Search" />
      </div>
      <ApplicationForm 
        formData={formData} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
      />
    </div>
  );
}