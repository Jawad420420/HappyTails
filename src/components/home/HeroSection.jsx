import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f2d8] text-[#426306] text-xs font-bold uppercase tracking-wider mb-6">
        🐾 Compassionate Pet Adoption Platform
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-[#161d1f] leading-tight mb-4 tracking-tight">
        Find your perfect <span className="text-[#5a7d22]">furry companion</span>
      </h1>
      <p className="text-[#5a6352] text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
        Browse verified rescue animals ready for adoption and give a deserving pet a loving forever home.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          to="/search"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#426306] text-white font-bold hover:bg-[#344e05] transition shadow-sm flex items-center justify-center gap-2 text-sm"
        >
          <Search className="w-4 h-4" />
          Find a Pet
        </Link>
        <Link
          to="/volunteer"
          className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2 text-sm"
        >
          <Heart className="w-4 h-4 text-[#426306]" />
          Become a Volunteer
        </Link>
      </div>
    </section>
  );
}