import React from 'react';
import PetInfo from '../components/petdetails/PetInfo';
import PetActions from '../components/petdetails/PetActions';

export default function PetDetails({ pet, onBack, onApply, onToggleFavorite }) {
  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-[#f4fafd] border border-[#dde4e6] rounded-full text-sm"
      >
        ← Back
      </button>
      <div className="bg-white rounded-2xl p-6">
        <PetInfo pet={pet} />
        <PetActions pet={pet} onApply={onApply} onToggleFavorite={onToggleFavorite} />
      </div>
    </div>
  );
}
