import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, PawPrint, User, X, LogOut, ChevronDown } from 'lucide-react';

export default function Header({
  isLoggedIn = false,
  userRole = null, // 'adopter' or 'shelter'
  userName = '',
  onOpenAuth,
  onLogout
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Find a Pet' },
    { path: '/shelters', label: 'Shelters' },
    { path: '/pet-care', label: 'Pet Care' },
    { path: '/stories', label: 'Stories' },
  ];

  const handleUserClick = () => {
    const targetDashboard = userRole === 'shelter' ? '/shelter-dashboard' : '/user-dashboard';
    navigate(targetDashboard);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogoutClick = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center px-4 xl:px-8 h-20 w-full z-50 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 bg-[#426306] rounded-full flex items-center justify-center shrink-0">
            <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="text-lg xl:text-xl font-black text-[#161d1f] whitespace-nowrap">
            Happy Tails
          </span>
        </Link>

        {/* Public Navigation Links */}
        <nav className="flex items-center bg-gray-50/80 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto max-w-[65vw]">
          <div className="flex items-center gap-1 min-w-max">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-xs xl:text-sm font-semibold transition-all rounded-xl whitespace-nowrap shrink-0 inline-block ${
                    isActive
                      ? 'bg-[#e8f2d8] text-[#426306] shadow-sm ring-1 ring-[#d5e8b8]'
                      : 'text-gray-600 hover:text-[#426306] hover:bg-gray-100/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Action Buttons & Authentication Dropdown */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0 relative">
          {!isLoggedIn ? (
            /* Logged Out View */
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#426306] text-white font-bold hover:bg-[#344e05] transition whitespace-nowrap shadow-sm text-xs xl:text-sm"
            >
              Log In / Sign Up
            </button>
          ) : (
            /* Logged In Profile Menu */
            <div className="relative flex items-center gap-1 bg-[#e8f2d8] rounded-2xl p-1 border border-[#d5e8b8]">
              {/* User Name Pill: Direct Navigation to Dashboard */}
              <button
                type="button"
                onClick={handleUserClick}
                className="flex items-center gap-2 px-3 py-1.5 text-[#426306] font-bold hover:bg-[#dcecc5] transition rounded-xl text-xs xl:text-sm"
              >
                <User className="w-4 h-4" />
                <span>{userName}</span>
              </button>

              {/* Dropdown Toggle Trigger */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="p-1.5 text-[#426306] hover:bg-[#dcecc5] transition rounded-xl"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Minimal Profile Dropdown - Log Out Only */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl border border-gray-100 shadow-xl py-1.5 z-50">
                  <button
                    type="button"
                    onClick={handleLogoutClick}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs xl:text-sm font-semibold text-red-600 hover:bg-red-50 transition rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="relative flex md:hidden justify-between items-center px-5 h-16 w-full z-40 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
        <Link
          to="/"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#426306]"
        >
          <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
        </Link>

        <Link
          to="/"
          className="text-xl font-extrabold text-[#426306]"
        >
          Happy Tails
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-[#426306]"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-4 right-4 p-2 bg-white rounded-2xl border border-gray-100 shadow-xl space-y-1">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                      isActive ? 'bg-[#e8f2d8] text-[#426306]' : 'text-gray-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <hr className="my-1 border-gray-100" />

            {!isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-bold bg-[#426306] text-white"
              >
                Log In / Sign Up
              </button>
            ) : (
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={handleUserClick}
                  className="w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-[#426306] bg-[#e8f2d8] flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Dashboard ({userName})
                </button>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold text-red-600 bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}