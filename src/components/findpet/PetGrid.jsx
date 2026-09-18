import React from 'react';
import { Heart, Trash2, CheckCircle2, MapPin } from 'lucide-react';

export default function PetGrid({ pets, onSelectPet, onToggleFavorite, userRole, onDeletePet }) {
  const isAdmin = userRole === 'admin';

  if (!pets || pets.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
        <p className="text-5xl mb-4">🐾</p>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No pets found</h3>
        <p className="text-gray-500 text-sm">Try changing your search terms or filter selection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map((pet) => {
        const petId = pet._id || pet.id;
        return (
          <div
            key={petId}
            onClick={() => onSelectPet(pet)}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={pet.mainImage}
                alt={pet.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80';
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm ${
                    pet.status === 'adopted'
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#426306] text-white'
                  }`}
                >
                  {pet.status === 'adopted' ? 'Adopted' : 'Available'}
                </span>
              </div>

              {/* Action Button: Delete button for Admin, Heart button for Users */}
              <div className="absolute top-3 right-3">
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDeletePet) onDeletePet(petId, pet.name);
                    }}
                    className="p-2.5 bg-red-600/95 hover:bg-red-700 text-white rounded-full shadow-md transition-colors duration-200"
                    title="Remove pet listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleFavorite) onToggleFavorite(petId);
                    }}
                    className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    title={pet.isFavorite ? 'Remove favorite' : 'Add to favorite'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors duration-300 ${
                        pet.isFavorite
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    />
                  </button>
                )}
              </div>

              <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 rounded-full shadow-sm">
                  {pet.breed}
                </span>
                {pet.isVaccinated && (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold rounded-full shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Vaccinated
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#426306] transition-colors line-clamp-1">
                  {pet.name}
                </h3>
                <span className="text-xs font-semibold text-[#426306] bg-[#e8f2d8] px-2.5 py-1 rounded-lg">
                  {pet.age}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{pet.location}</span>
                <span>•</span>
                <span className="capitalize">{pet.gender}</span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2 mt-auto pt-2 border-t border-gray-100">
                {pet.aboutText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}