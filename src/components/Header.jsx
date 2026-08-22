// top app bar and desktop nav component
import { PawPrint, Search, User } from 'lucide-react';

export default function Header({ currentPage, onNavigate }) {
  // desktop nav items list
  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Find a Pet', page: 'search' },
    { label: 'Apply', page: 'apply' },
    { label: 'Add Pet', page: 'add-pet' },
    { label: 'My Applications', page: 'applications' },
  ];

  return (
    <>
      {/* desktop header */}
      <header className="hidden md:flex justify-between items-center px-8 lg:px-16 h-20 w-full z-50 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm transition-all duration-300">
        {/* logo and brand name */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-[#426306] cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#5a7d22] to-[#426306] flex items-center justify-center shadow-lg shadow-[#426306]/20 transform group-hover:scale-105 transition-all duration-300 group-active:scale-95">
            <PawPrint className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#426306] to-[#5a7d22]">Happy Tails</span>
        </div>

        {/* nav links */}
        <nav className="flex gap-2 lg:gap-4 items-center bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
          {navItems.map((item) => {
            const isActive = currentPage === item.page || (item.page === 'search' && currentPage === 'pet-details');
            return (
              <button
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

        {/* right actions */}
        
        <div className="flex items-center gap-4">

  <button
    onClick={() => onNavigate('search')}
    className="
    p-2.5
    rounded-full
    hover:bg-gray-100
    text-gray-600
    hover:text-[#426306]
    transition
    "
    title="Search pets"
  >
    <Search className="w-5 h-5" />
  </button>


  <button
  onClick={() => onNavigate('admin')}
  className="
    flex
    items-center
    gap-2
    px-5
    py-2.5
    rounded-2xl
    bg-[#e8f2d8]
    text-[#426306]
    font-bold
    border
    border-[#d5e8b8]
    hover:bg-[#dcecc5]
    hover:shadow-md
    hover:scale-105
    transition-all
    duration-300
    active:scale-95
  "
>

  <User 
    className="
      w-5
      h-5
    "
  />

  Admin

</button>


</div>
      </header>

      {/* mobile top app bar */}
      <header className="flex md:hidden justify-between items-center px-5 h-16 w-full z-40 bg-white/80 sticky top-0 border-b border-gray-100 backdrop-blur-xl shadow-sm">
        <button
          onClick={() => onNavigate('home')}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#5a7d22] to-[#426306] shadow-md shadow-[#426306]/20 transition-transform active:scale-95"
        >
          <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
        </button>

        <h1
          onClick={() => onNavigate('home')}
          className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#426306] to-[#5a7d22] cursor-pointer"
        >
          Happy Tails
        </h1>

        
      </header>
    </>
  );
}
