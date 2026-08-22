import React from 'react';
import { Search } from 'lucide-react';

export default function HeroSection({ onNavigate }) {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 pt-32 pb-10 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-[#161d1f] leading-tight mb-4 tracking-tight">
        Find your perfect <span className="text-[#5a7d22]">furry companion</span>
      </h1>
      <p className="text-[#5a6352] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
        Browse hundreds of adoptable pets from shelters near you and give a loving animal a forever home.
      </p>
    <div className="flex justify-center gap-3 mt-2">
     <button
  onClick={() => onNavigate('search')}
  className="w-36 h-12 inline-flex items-center justify-center gap-2 bg-[#e8f2d8] text-[#426306] rounded-xl font-semibold text-sm hover:bg-[#d9e8c4] transition-colors shadow-md active:scale-95"
>
  <Search className="w-5 h-4" />
  Find a Pet
</button>
      <button
        onClick={() => onNavigate('add-pet')}
       className="w-36 h-12 inline-flex items-center justify-center gap-2 bg-[#e8f2d8] text-[#426306] rounded-xl font-semibold text-sm hover:bg-[#d9e8c4] transition-colors shadow-md active:scale-95"
      >
       Add New Pet
     </button>
     </div>

    </section>
  );
}
