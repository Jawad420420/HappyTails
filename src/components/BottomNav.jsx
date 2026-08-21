import { ClipboardList, Home, Search } from 'lucide-react';

export default function BottomNav({ currentPage, onNavigate }) {
  const navItems = [
    { label: 'Home', page: 'home', icon: Home },
    { label: 'Find', page: 'search', icon: Search },
    { label: 'Applications', page: 'applications', icon: ClipboardList },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-100 bg-white/95 px-4 py-2 shadow-[0_-4px_20px_rgba(22,29,31,0.08)] backdrop-blur-xl md:hidden">
      {navItems.map(({ label, page, icon: Icon }) => {
        const isActive = currentPage === page || (page === 'search' && currentPage === 'pet-details');

        return (
          <button
            key={page}
            type="button"
            onClick={() => onNavigate(page)}
            className={`flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
              isActive ? 'text-[#426306]' : 'text-gray-500 hover:text-[#426306]'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
