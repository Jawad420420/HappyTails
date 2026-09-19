import React from 'react';
import { Search, Heart, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find a Pet',
    desc: 'Browse adoptable rescue pets and find your perfect match.',
  },
  {
    icon: Heart,
    title: 'Apply & Connect',
    desc: 'Submit your adoption request and connect with our team to meet them in person.',
  },
  {
    icon: ShieldCheck,
    title: 'Adopt & Love',
    desc: 'Complete the process and bring your new best friend to their forever home.',
  },
];

export default function AdoptionJourney() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 mb-14">
      <h2 className="text-center text-xl font-bold text-[#161d1f] mb-8 tracking-tight">
        How Adoption Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-[#e8eddf] shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f0f6e8] flex items-center justify-center mb-4">
              <step.icon className="w-6 h-6 text-[#5a7d22]" />
            </div>
            <h3 className="font-bold text-[#161d1f] mb-1">{step.title}</h3>
            <p className="text-sm text-[#6b7560] leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
