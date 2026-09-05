import React from 'react';
import BackButton from '../components/BackButton';
import PetInfo from '../components/petdetails/PetInfo';
import PetActions from '../components/petdetails/PetActions';

export default function PetDetails({ pet, onApply, onToggleFavorite }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <BackButton label="Back to Search" to="/search" />
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <PetInfo pet={pet} />
        <PetActions pet={pet} onApply={onApply} onToggleFavorite={onToggleFavorite} />
      </div>
    </div>
  );
}