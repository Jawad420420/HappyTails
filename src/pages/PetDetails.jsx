import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Heart, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import BackButton from '../components/BackButton';
import { getPetById } from '../lib/api';

export default function PetDetails({ pet: propPet, onApply, onToggleFavorite, isLoggedIn }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(propPet || null);
  const [loading, setLoading] = useState(!propPet && !!id);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPetById(id)
        .then((data) => {
          setPet(data);
          setError('');
        })
        .catch((err) => {
          setError(err.message || 'Could not find pet');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleApplyClick = () => {
    const petId = pet?._id || pet?.id || id;
    if (!isLoggedIn) {
      navigate('/auth');
      return;
    }
    navigate(`/apply/${petId}`);
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <div className="w-10 h-10 border-4 border-[#426306] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 font-medium text-sm">Loading pet details...</p>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-600 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Pet Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">
            The pet listing you are looking for may have been adopted or removed.
          </p>
          <BackButton label="Back to Search" to="/search" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-4">
        <BackButton label="Back to Search" to="/search" />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Main Pet Image Banner */}
        <div className="relative h-72 sm:h-96 w-full bg-gray-100 overflow-hidden">
          <img
            src={pet.mainImage}
            alt={pet.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80';
            }}
          />
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1.5 text-xs font-black rounded-full uppercase tracking-wider shadow-md ${
                pet.status === 'adopted'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#426306] text-white'
              }`}
            >
              {pet.status === 'adopted' ? 'Adopted' : 'Available for Adoption'}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-[#161d1f] flex items-center gap-3">
                {pet.name}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1.5">
                <span className="font-semibold text-gray-700">{pet.breed}</span>
                <span>•</span>
                <span>{pet.age}</span>
                <span>•</span>
                <span className="capitalize">{pet.gender}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#426306]" />
                  {pet.location}
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold capitalize">
                Type: {pet.type}
              </span>
            </div>
          </div>

          {/* Health & Medical Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Health & Medical Status
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  pet.isVaccinated
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {pet.isVaccinated ? 'Fully Vaccinated' : 'Vaccinations Pending'}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  pet.isDewormed
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                {pet.isDewormed ? 'Dewormed' : 'Deworming Due'}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                  pet.isNeutered
                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                {pet.isNeutered ? 'Spayed / Neutered' : 'Not Spayed'}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Vet Checked & Healthy
              </span>
            </div>
          </div>

          {/* Personality Tags */}
          {pet.personality && pet.personality.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Personality & Traits
              </h3>
              <div className="flex flex-wrap gap-2">
                {pet.personality.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#e8f2d8] text-[#426306] rounded-xl text-xs font-bold"
                  >
                    <Sparkles className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Story / About */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              About {pet.name}
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              {pet.aboutText}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              disabled={pet.status === 'adopted'}
              onClick={handleApplyClick}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#426306] text-white font-bold hover:bg-[#344e05] transition shadow-sm text-sm text-center disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              {pet.status === 'adopted' ? 'Pet Has Been Adopted' : `Apply to Adopt ${pet.name}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}