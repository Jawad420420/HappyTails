import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../PetCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedPets({ pets, onSelectPet, onToggleFavorite }) {
  const featuredPets = pets.slice(0, 3);

  return (
    <section className="w-full max-w-4xl mx-auto px-6 mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#161d1f]">Featured Pets</h2>
        <Link
          to="/search"
          className="flex items-center gap-1 text-sm text-[#5a7d22] font-semibold hover:text-[#426306] transition-colors group"
        >
          View all <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredPets.map(pet => (
          <PetCard
            key={pet.id}
            pet={pet}
            onSelectPet={onSelectPet}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}