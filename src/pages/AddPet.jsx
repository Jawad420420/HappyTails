import React from 'react';
import BackButton from '../components/BackButton';
import PetForm from '../components/addpet/PetForm';

export default function AddPet() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <BackButton to="/admin-dashboard" label="Back to Admin Dashboard" />
      </div>

      <PetForm />
    </div>
  );
}