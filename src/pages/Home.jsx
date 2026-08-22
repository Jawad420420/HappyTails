import React from 'react';
import HeroSection from '../components/home/HeroSection';
import AdoptionJourney from '../components/home/AdoptionJourney';
import FeaturedPets from '../components/home/FeaturedPets';
import VolunteerCard from '../components/home/VolunteerCard';
import HealthCard from '../components/home/HealthCard';

export default function Home({ pets, onSelectPet, onToggleFavorite, onNavigate }) {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection onNavigate={onNavigate} />
      <AdoptionJourney />

      <VolunteerCard onNavigate={onNavigate} />
      <HealthCard onNavigate={onNavigate} />

      <FeaturedPets 
        pets={pets} 
        onSelectPet={onSelectPet} 
        onToggleFavorite={onToggleFavorite} 
        onNavigate={onNavigate} 
      />
    </div>
  );
}
