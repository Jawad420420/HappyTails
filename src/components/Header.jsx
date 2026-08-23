<<<<<<< HEAD
import React from 'react';

export default function Header({ currentPage, onNavigate }) {
=======
// top app bar and desktop nav component
import { Menu, PawPrint, Search, User, X } from 'lucide-react';
import { useState } from 'react';

export default function Header({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
>>>>>>> 258d6a31172cb8ebc5df2c07a22df0ef7b5642df
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
  const navigate = (page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
<<<<<<< HEAD
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 cursor-pointer shrink-0"
=======
    <>
      <header className="hidden md:flex justify-between items-center px-8 lg:px-16 h-20 w-full z-50 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm transition-all duration-300">
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-[#426306] cursor-pointer group"
>>>>>>> 258d6a31172cb8ebc5df2c07a22df0ef7b5642df
        >
          <div className="w-10 h-10 bg-[#426306] rounded-2xl flex items-center justify-center text-white font-extrabold text-xl">
            🐾
          </div>
          <span className="text-xl font-black text-[#161d1f]">Happy Tails</span>
        </div>

<<<<<<< HEAD
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
=======
        <nav className="flex gap-2 lg:gap-4 items-center bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                type="button"
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-xl ${
                  isActive
                    ? 'bg-white text-[#426306] shadow-sm ring-1 ring-gray-200/50'
                    : 'text-gray-600 hover:text-[#426306] hover:bg-gray-100/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('search')}
            className="p-2.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#426306] transition"
            title="Search pets"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#e8f2d8] text-[#426306] font-bold border border-[#d5e8b8] hover:bg-[#dcecc5] hover:shadow-md hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <User className="w-5 h-5" />
            Admin
          </button>
        </div>
      </header>

      <header className="relative flex md:hidden justify-between items-center px-5 h-16 w-full z-40 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#5a7d22] to-[#426306] shadow-md shadow-[#426306]/20 transition-transform active:scale-95"
        >
          <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
        </button>

        <button
          type="button"
          onClick={() => navigate('home')}
          className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#426306] to-[#5a7d22] cursor-pointer"
        >
          Happy Tails
        </button>

        <button
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-[#426306] hover:bg-[#e8f2d8] transition-colors active:scale-95"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-[calc(100%+0.5rem)] left-4 right-4 p-2 bg-white rounded-2xl border border-gray-100 shadow-xl">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    type="button"
                    key={item.page}
                    onClick={() => navigate(item.page)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#e8f2d8] text-[#426306]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#426306]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                onClick={() => navigate('search')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#426306] transition-colors"
              >
                <Search className="w-4 h-4" />
                Search pets
              </button>
              <button
                type="button"
                onClick={() => navigate('admin')}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#426306] transition-colors"
              >
                <User className="w-4 h-4" />
                Admin
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
>>>>>>> 258d6a31172cb8ebc5df2c07a22df0ef7b5642df
  );
}