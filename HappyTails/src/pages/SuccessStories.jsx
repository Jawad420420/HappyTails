import React from 'react';
import { Quote } from 'lucide-react';

const stories = [
  { id: 1, petName: 'Luna & Farha', quote: 'Adopting Luna was the best decision. She brought so much warmth to our apartment!', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80' },
  { id: 2, petName: 'Max & Tanzim', quote: 'Max loves running in the park every morning. The adoption process was smooth and simple.', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80' }
];

export default function SuccessStories() {
  return (
    <div className="w-full max-w-5xl mx-auto py-6 space-y-8">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-[#161d1f]">Happy Tails & Stories</h1>
        <p className="text-sm text-gray-500">Real stories from adopters who found their lifelong companions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map(s => (
          <div key={s.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <img src={s.image} alt={s.petName} className="w-full h-48 object-cover" />
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-sm text-gray-600 italic flex gap-2">
                <Quote className="w-5 h-5 text-[#426306] shrink-0" />
                "{s.quote}"
              </p>
              <h3 className="text-right font-bold text-[#426306] text-sm">— {s.petName}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}