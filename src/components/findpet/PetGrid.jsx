import React from 'react';
import { Heart, X } from 'lucide-react';

export default function PetGrid({ pets, onSelectPet, onToggleFavorite, userRole }) {
  const isShelterAdmin = userRole === 'shelter';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {pets.map((pet) => (
        <div
          key={pet.id}
          onClick={() => onSelectPet(pet)}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={pet.mainImage}
              alt={pet.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Action Button: Red Circle with White Cross for Shelter OR Heart for Adopters */}
            <div className="absolute top-3 right-3">
              {isShelterAdmin ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents opening pet details
                  }}
                  className="p-2.5 bg-[#ba1a1a] rounded-full shadow-md hover:bg-[#93000a] transition-colors duration-200"
                  title="Remove pet listing"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(pet.id);
                  }}
                  className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200"
                  title={pet.isFavorite ? 'Remove favorite' : 'Add to favorite'}
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors duration-300 ${pet.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
                  />
                </button>
              )}
            </div>

            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-sm">
                {pet.breed}
              </span>
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#426306] transition-colors line-clamp-1">{pet.name}</h3>
              <span className="text-sm font-medium text-[#426306] bg-[#426306]/10 px-2.5 py-1 rounded-md">{pet.age}</span>
            </div>
            
            <p className="text-sm text-gray-500 line-clamp-2 mt-auto pt-2 border-t border-gray-50">
              Meet {pet.name}! A wonderful companion looking for a loving forever home.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}