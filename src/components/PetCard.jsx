import React from 'react';
import { Heart, MapPin, CheckCircle2 } from 'lucide-react';

export default function PetCard({ pet, onSelectPet, onToggleFavorite }) {
  const petId = pet._id || pet.id;

  return (
    <article
      onClick={() => onSelectPet(pet)}
      className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#dde4e6]/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col"
    >
      {/* pet image container */}
      <div className="relative h-48 md:h-52 w-full overflow-hidden bg-[#dde4e6]">
        <img
          src={pet.mainImage}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80';
          }}
        />

        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm ${
              pet.status === 'adopted'
                ? 'bg-purple-600 text-white'
                : 'bg-[#426306] text-white'
            }`}
          >
            {pet.status === 'adopted' ? 'Adopted' : 'Available'}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onToggleFavorite) onToggleFavorite(petId);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 ${
            pet.isFavorite
              ? 'bg-[#ffffff] text-[#ba1a1a] shadow-md'
              : 'bg-[#ffffff]/80 text-[#44493a] hover:bg-[#ffffff] hover:text-[#ba1a1a]'
          }`}
          title={pet.isFavorite ? 'Remove favorite' : 'Add to favorite'}
        >
          <Heart
            className="w-4 h-4"
            fill={pet.isFavorite ? '#ba1a1a' : 'none'}
            strokeWidth={pet.isFavorite ? 2.5 : 2}
          />
        </button>
      </div>

      {/* pet details info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* name and gender */}
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold text-[#161d1f] group-hover:text-[#426306] transition-colors">
              {pet.name}
            </h3>

            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                pet.gender === 'male'
                  ? 'text-[#426306] bg-[#5a7d22]/15'
                  : 'text-[#944a00] bg-[#fc8f34]/15'
              }`}
            >
              {pet.gender === 'male' ? '♂ Male' : '♀ Female'}
            </span>
          </div>

          {/* species and age */}
          <p className="text-xs font-medium text-[#44493a] mb-1 capitalize">
            {pet.breed} • {pet.age}
          </p>

          {/* location */}
          <p className="text-xs text-[#44493a] flex items-center gap-1 mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#747969]" />
            <span>{pet.location}</span>
          </p>
        </div>

        {/* vaccination status badge */}
        <div className="pt-3 border-t border-[#dde4e6]/50 flex items-center justify-between">
          {pet.isVaccinated ? (
            <div className="inline-flex items-center gap-1.5 bg-[#c7f087]/50 text-[#121f00] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#426306]" />
              <span>Vaccinated</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <span>Health Checked</span>
            </div>
          )}

          <span className="text-xs font-semibold text-[#426306] group-hover:translate-x-0.5 transition-transform">
            Details →
          </span>
        </div>
      </div>
    </article>
  );
}