import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const shelters = [
  { id: 1, name: 'Happy Paws Shelter', location: 'Dhaka', phone: '+880 1711 000111', email: 'contact@happypaws.org', petsCount: 12, image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6UxIqvSaqMOFO7jvCC8tcrktLBRDSGTIAiy9UEBNxw&s=10' },
  { id: 2, name: 'Safe Haven Rescue', location: 'Gazipur', phone: '+880 1822 333444', email: 'info@safehaven.org', petsCount: 8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzQFo6P-dh4bmf4Q4YS0EMqTAxDR-g8FPOnEa9H8yRHQ&s=10' },
  { id: 3, name: 'Paws & Claws Rescue', location: 'Narayanganj', phone: '+880 1933 555666', email: 'hello@pawsclaws.org', petsCount: 15, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS82bsc2vVWB8hvMqdM8NqQ3fQvOwjmi3y4_dk4p5D3ug&s=10' }
];

export default function Shelters({ onNavigate }) {
  const [search, setSearch] = useState('');
  const filtered = shelters.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full max-w-6xl mx-auto py-6 space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#161d1f]">Partner Shelters</h1>
          <p className="text-sm text-gray-500 mt-1">Find verified rescue organizations and shelters near you.</p>
        </div>
        <input
          type="text"
          placeholder="Search shelter or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#426306] text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(s => (
          <div key={s.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            <div>
              <img src={s.image} alt={s.name} className="w-full h-40 object-cover" />
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#161d1f]">{s.name}</h3>
                  <span className="text-xs font-semibold bg-[#e8f2d8] text-[#426306] px-2.5 py-1 rounded-full">{s.petsCount} Pets</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#426306]" />{s.location}</p>
                  <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#426306]" />{s.phone}</p>
                  <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#426306]" />{s.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}