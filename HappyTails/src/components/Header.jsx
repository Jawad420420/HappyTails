import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, PawPrint, User, Shield, X, LogOut, ChevronDown } from 'lucide-react';

export default function Header({
  isLoggedIn = false,
  userRole = null, // 'user' or 'admin'
  userName = '',
  userAvatar = '',
  onOpenAuth,
  onLogout,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Admin cannot see Volunteer in navbar
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/search', label: 'Find a Pet' },
    { path: '/volunteer', label: 'Volunteer' },
    { path: '/vaccination', label: 'Vaccination' },
    { path: '/pet-care', label: 'Pet Care Guide' },
  ].filter((item) => !(userRole === 'admin' && item.path === '/volunteer'));

  const handleDashboardClick = () => {
    const target = userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard';
    navigate(target);
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
      <header className="hidden md:flex justify-between items-center px-4 xl:px-8 h-20 w-full z-50 bg-white/90 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 bg-[#426306] rounded-full flex items-center justify-center shrink-0 shadow-sm">
            <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="text-lg xl:text-xl font-black text-[#161d1f] whitespace-nowrap tracking-tight">
            Happy Tails
          </span>
        </Link>

        {/* Public Navigation Links */}
        <nav className="flex items-center bg-gray-50/90 p-1.5 rounded-2xl border border-gray-200/60 overflow-x-auto max-w-[60vw]">
          <div className="flex items-center gap-1 min-w-max">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-xs xl:text-sm font-semibold transition-all rounded-xl whitespace-nowrap shrink-0 inline-block ${
                    isActive
                      ? 'bg-[#e8f2d8] text-[#426306] shadow-sm ring-1 ring-[#d5e8b8]'
                      : 'text-gray-600 hover:text-[#426306] hover:bg-gray-100/60'
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
            <button
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#426306] text-white font-bold hover:bg-[#344e05] transition whitespace-nowrap shadow-sm text-xs xl:text-sm"
            >
              Log In / Sign Up
            </button>
          ) : (
            <div className="relative flex items-center gap-1 bg-[#e8f2d8] rounded-2xl p-1 border border-[#d5e8b8]">
              {/* User / Admin Pill Button */}
              <button
                type="button"
                onClick={handleDashboardClick}
                className="flex items-center gap-2 px-3 py-1.5 text-[#426306] font-bold hover:bg-[#dcecc5] transition rounded-xl text-xs xl:text-sm"
              >
                {userRole === 'admin' ? (
                  <>
                    <Shield className="w-4 h-4 text-amber-700" />
                    <span className="flex items-center gap-1.5">
                      {userName || 'Admin'}
                      <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">
                        Admin
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    {userAvatar ? (
                      <img src={userAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span>{userName || 'User'}</span>
                  </>
                )}
              </button>

              {/* Dropdown Toggle */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="p-1.5 text-[#426306] hover:bg-[#dcecc5] transition rounded-xl"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-gray-100 shadow-xl py-1.5 z-50">
                  <button
                    type="button"
                    onClick={handleDashboardClick}
                    className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs xl:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    {userRole === 'admin' ? (
                      <Shield className="w-4 h-4 text-amber-600" />
                    ) : (
                      <User className="w-4 h-4 text-[#426306]" />
                    )}
                    {userRole === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                  </button>
                  <hr className="my-1 border-gray-100" />
                  <button
                    type="button"
                    onClick={handleLogoutClick}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs xl:text-sm font-semibold text-red-600 hover:bg-red-50 transition"
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
      <header className="relative flex md:hidden justify-between items-center px-5 h-16 w-full z-40 bg-white/90 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
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
                  onClick={handleDashboardClick}
                  className="w-full text-left px-4 py-2 rounded-xl text-sm font-bold text-[#426306] bg-[#e8f2d8] flex items-center gap-2"
                >
                  {userRole === 'admin' ? (
                    <Shield className="w-4 h-4 text-amber-700" />
                  ) : userAvatar ? (
                    <img src={userAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  {userRole === 'admin' ? 'Admin Dashboard' : `Dashboard (${userName})`}
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