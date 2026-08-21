import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AdoptionJourney from '../components/home/AdoptionJourney';
import FeaturedPets from '../components/home/FeaturedPets';

export default function Home({ pets, onSelectPet, onToggleFavorite, onNavigate }) {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection onNavigate={onNavigate} />
      <AdoptionJourney />
      <FeaturedPets 
        pets={pets} 
        onSelectPet={onSelectPet} 
        onToggleFavorite={onToggleFavorite} 
        onNavigate={onNavigate} 
      />
    </div>
  );
}
