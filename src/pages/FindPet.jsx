import React, { useState, useEffect } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PetGrid from '../components/findpet/PetGrid';
import { getPets, deletePet } from '../lib/api';

export default function FindPet({ onSelectPet, onToggleFavorite, userRole }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getPets({ type: filterType, search: searchTerm });
      setPets(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [filterType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPets();
  };

  const handleDeletePet = async (petId, petName) => {
    if (!window.confirm(`Are you sure you want to remove ${petName} from listings?`)) {
      return;
    }
    try {
      await deletePet(petId);
      setPets((prev) => prev.filter((p) => (p._id || p.id) !== petId));
    } catch (err) {
      alert(err.message || 'Failed to delete pet');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d1f]">
              Find Your Perfect Companion
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Browse available rescue animals ready for adoption into loving homes.
            </p>
          </div>

          {userRole === 'admin' && (
            <Link
              to="/add-pet"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#426306] text-white font-bold hover:bg-[#344e05] transition text-sm shrink-0 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Add New Pet
            </Link>
          )}
        </div>

        {/* Filter Tabs & Search Input */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="flex bg-gray-100/80 p-1 rounded-xl border border-gray-200/60 max-w-xs">
            {['all', 'dog', 'cat'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`flex-1 px-4 py-2 text-xs font-bold capitalize rounded-lg transition ${
                  filterType === type
                    ? 'bg-white shadow-sm text-[#426306]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type === 'all' ? 'All Pets' : `${type}s`}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by pet name, breed, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#426306] text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </form>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-10 h-10 border-4 border-[#426306] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Loading pets from database...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-center text-sm font-medium">
          {error}
        </div>
      ) : (
        <PetGrid
          pets={pets}
          onSelectPet={onSelectPet}
          onToggleFavorite={onToggleFavorite}
          userRole={userRole}
          onDeletePet={handleDeletePet}
        />
      )}
    </div>
  );
}