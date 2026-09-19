import React from 'react';
import { ShieldCheck, Heart, Stethoscope, Utensils } from 'lucide-react';

const guides = [
  { icon: Utensils, title: 'Nutrition & Diet', desc: 'Balanced meals, proper portions, and avoiding toxic foods for dogs and cats.' },
  { icon: Stethoscope, title: 'Routine Vet Visits', desc: 'Vaccination schedules, regular checkups, deworming, and preventive care.' },
  { icon: Heart, title: 'Grooming & Hygiene', desc: 'Brushing routines, bathing tips, nail trimming, and dental health essentials.' },
  { icon: ShieldCheck, title: 'Home Safety', desc: 'Pet-proofing your living space, securing hazards, and emergency readiness.' }
];

export default function PetCareGuide() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 space-y-8">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-[#161d1f]">Pet Care Guide</h1>
        <p className="text-sm text-gray-500">Essential health, nutrition, and safety advice to help your adopted pets thrive.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((g, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-[#426306] transition">
            <div className="p-3 bg-[#e8f2d8] text-[#426306] rounded-2xl shrink-0">
              <g.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#161d1f] mb-1">{g.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{g.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}