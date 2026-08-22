import React from 'react';

export default function PetActions({ pet, onApply, onToggleFavorite }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onApply(pet)}
        className="flex-1 px-6 py-3 bg-[#5a7d22] text-white rounded-full font-bold hover:bg-[#426306]"
      >
        Apply for Adoption
      </button>
      <button
        onClick={() => onToggleFavorite(pet.id)}
        className="px-6 py-3 border border-[#426306] text-[#426306] rounded-full font-bold"
      >
        {pet.isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
