import React from 'react';
import { Link } from 'react-router-dom';
import PetCard from '../PetCard';
import { ArrowRight } from 'lucide-react';

export default function FeaturedPets({ pets = [], onSelectPet, onToggleFavorite }) {
  const featuredPets = (pets || []).slice(0, 3);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 mb-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-[#161d1f]">Featured Pets</h2>
          <p className="text-xs text-gray-500 mt-0.5">Meet some of our adorable companions looking for homes</p>
        </div>
        <Link
          to="/search"
          className="flex items-center gap-1 text-sm text-[#426306] font-bold hover:text-[#344e05] transition-colors group"
        >
          View all pets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {featuredPets.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 text-xs text-gray-500">
          Loading adoptable pets...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPets.map((pet) => (
            <PetCard
              key={pet._id || pet.id}
              pet={pet}
              onSelectPet={onSelectPet}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}