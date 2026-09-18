import React, { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import AdoptionJourney from '../components/home/AdoptionJourney';
import FeaturedPets from '../components/home/FeaturedPets';
import VolunteerCard from '../components/home/VolunteerCard';
import HealthCard from '../components/home/HealthCard';
import { getPets } from '../lib/api';

export default function Home({ pets: propPets, onSelectPet, onToggleFavorite }) {
  const [pets, setPets] = useState(propPets || []);

  useEffect(() => {
    if (!propPets || propPets.length === 0) {
      getPets()
        .then((data) => setPets(data))
        .catch(() => {});
    } else {
      setPets(propPets);
    }
  }, [propPets]);

  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection />
      <AdoptionJourney />

      <FeaturedPets
        pets={pets}
        onSelectPet={onSelectPet}
        onToggleFavorite={onToggleFavorite}
      />

      <VolunteerCard />
      <HealthCard />
    </div>
  );
}