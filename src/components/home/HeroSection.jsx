import React from 'react';

export default function HeroSection() {
  return (
    <section className="w-full max-w-3xl mx-auto px-6 pt-32 pb-10 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-[#161d1f] leading-tight mb-4 tracking-tight">
        Find your perfect <span className="text-[#5a7d22]">furry companion</span>
      </h1>
      <p className="text-[#5a6352] text-lg max-w-xl mx-auto leading-relaxed">
        Browse hundreds of adoptable pets from shelters near you and give a loving animal a forever home.
      </p>
    </section>
  );
}