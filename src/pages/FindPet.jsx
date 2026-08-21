import React from 'react';
import PetGrid from '../components/findpet/PetGrid';

export default function FindPet({ pets, onSelectPet, onToggleFavorite }) {
  return (
    <PetGrid 
      pets={pets} 
      onSelectPet={onSelectPet} 
      onToggleFavorite={onToggleFavorite} 
    />
  );
}
