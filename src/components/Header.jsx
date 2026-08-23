import React from 'react';

export default function Header({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Find a Pet' },
    { id: 'shelters', label: 'Shelters' },
    { id: 'pet-care', label: 'Pet Care' },
    { id: 'stories', label: 'Stories' },
    { id: 'user-dashboard', label: 'User Dashboard' },
    { id: 'shelter-dashboard', label: 'Shelter Admin' },
    { id: 'applications', label: 'My Applications' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 bg-[#426306] rounded-2xl flex items-center justify-center text-white font-extrabold text-xl">
            🐾
          </div>
          <span className="text-xl font-black text-[#161d1f]">Happy Tails</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-gray-50 p-1.5 rounded-full border border-gray-200/60 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                currentPage === item.id
                  ? 'bg-white text-[#426306] shadow-sm'
                  : 'text-gray-600 hover:text-[#161d1f]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('admin')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              currentPage === 'admin'
                ? 'bg-[#426306] text-white'
                : 'bg-[#e8f2d8] text-[#426306] hover:bg-[#d5e6be]'
            }`}
          >
            Admin
          </button>
        </div>
      </div>
    </header>
  );
}