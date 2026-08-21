import React from 'react';
import { Search } from 'lucide-react';

export default function HeroSection({ onNavigate }) {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 pt-24 pb-10 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-[#161d1f] leading-tight mb-4 tracking-tight">
        Find your perfect <span className="text-[#5a7d22]">furry companion</span>
      </h1>
      <p className="text-[#5a6352] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
        Browse hundreds of adoptable pets from shelters near you and give a loving animal a forever home.
      </p>
      <button
        onClick={() => onNavigate('search')}
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#5a7d22] text-white rounded-2xl font-bold text-base hover:bg-[#426306] transition-colors shadow-md active:scale-95"
      >
        <Search className="w-5 h-5" />
        Find a Pet
      </button>
    </section>
  );
}
