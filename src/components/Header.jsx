import React, { useState } from 'react';
import { Menu, PawPrint, Search, User, X } from 'lucide-react';

export default function Header({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center px-4 xl:px-8 h-20 w-full z-50 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
        {/* Restored Clean Single-Paw Logo */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 bg-[#426306] rounded-full flex items-center justify-center shrink-0">
            <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="text-lg xl:text-xl font-black text-[#161d1f] whitespace-nowrap">
            Happy Tails
          </span>
        </div>

        {/* Forced Single Line Nav Bar */}
        <nav className="flex items-center bg-gray-50/80 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto max-w-[65vw]">
          <div className="flex items-center gap-1 min-w-max">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  style={{ whitespace: 'nowrap' }}
                  className={`px-3 py-2 text-xs xl:text-sm font-semibold transition-all rounded-xl whitespace-nowrap shrink-0 inline-block ${
                    isActive
                      ? 'bg-[#e8f2d8] text-[#426306] shadow-sm ring-1 ring-[#d5e8b8]'
                      : 'text-gray-600 hover:text-[#426306] hover:bg-gray-100/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('search')}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-[#426306] transition"
            title="Search pets"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            style={{ whitespace: 'nowrap' }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#e8f2d8] text-[#426306] font-bold border border-[#d5e8b8] hover:bg-[#dcecc5] transition whitespace-nowrap"
          >
            <User className="w-4 h-4" />
            Admin
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="relative flex md:hidden justify-between items-center px-5 h-16 w-full z-40 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#426306]"
        >
          <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
        </button>

        <button
          type="button"
          onClick={() => navigate('home')}
          className="text-xl font-extrabold text-[#426306]"
        >
          Happy Tails
        </button>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-[#426306]"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-4 right-4 p-2 bg-white rounded-2xl border border-gray-100 shadow-xl">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    currentPage === item.id ? 'bg-[#e8f2d8] text-[#426306]' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}