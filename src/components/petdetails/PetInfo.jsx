import React from 'react';

export default function PetInfo({ pet }) {
  return (
    <>
      <img
        src={pet.mainImage}
        alt={pet.name}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold text-[#161d1f] mb-2">{pet.name}</h1>
      <p className="text-lg text-[#44493a] mb-4">{pet.breed} • {pet.age}</p>
      <p className="text-[#44493a] mb-6">{pet.aboutText}</p>
    </>
  );
}
