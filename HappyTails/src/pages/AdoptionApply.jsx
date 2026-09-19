import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, CheckCircle, AlertCircle, PawPrint } from 'lucide-react';
import BackButton from '../components/BackButton';
import { getPetById, submitAdoption } from '../lib/api';
import { getStoredUser } from '../lib/auth';

export default function AdoptionApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedUser = getStoredUser();

  const [pet, setPet] = useState(null);
  const [loadingPet, setLoadingPet] = useState(true);

  const [formData, setFormData] = useState({
    applicantName: storedUser?.name || '',
    applicantEmail: storedUser?.email || '',
    applicantPhone: '',
    applicantLocation: '',
    housingType: 'House',
    ownOrRent: 'Own',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      getPetById(id)
        .then(setPet)
        .catch((err) => setError(err.message))
        .finally(() => setLoadingPet(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storedUser) {
      navigate('/auth');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitAdoption({
        petId: id,
        ...formData,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/user-dashboard');
      }, 1800);
    } catch (err) {
      setError(err.message || 'Failed to submit application');
      setSubmitting(false);
    }
  };

  if (loadingPet) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="w-10 h-10 border-4 border-[#426306] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 font-medium text-sm">Loading application form...</p>
      </div>
    );
  }

  const inputBox =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#426306] transition text-sm';

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-16">
      <div className="mb-6">
        <BackButton to={`/pet/${id}`} label="Back to Pet Details" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#e8f2d8] rounded-2xl flex items-center justify-center text-[#426306]">
            <PawPrint className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#161d1f]">Adoption Application</h1>
            <p className="text-gray-500 text-xs mt-0.5">
              Submit your request to welcome {pet?.name || 'this pet'} into your home
            </p>
          </div>
        </div>

        {/* Selected Pet Quick Preview */}
        {pet && (
          <div className="flex items-center gap-4 bg-[#f8faf4] p-3.5 rounded-2xl border border-[#e8f2d8] mb-6">
            <img
              src={pet.mainImage}
              alt={pet.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-base">{pet.name}</h3>
              <p className="text-xs text-gray-500">
                {pet.breed} • {pet.age} • {pet.location}
              </p>
            </div>
          </div>
        )}

        {success ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-900">Application Submitted!</h3>
            <p className="text-sm text-emerald-700">
              Your adoption request for {pet?.name} has been received. Redirecting to your
              dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className={inputBox}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  name="applicantEmail"
                  type="email"
                  value={formData.applicantEmail}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className={inputBox}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  name="applicantPhone"
                  value={formData.applicantPhone}
                  onChange={handleChange}
                  required
                  placeholder="+880 1712 345678"
                  className={inputBox}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City / Location *
                </label>
                <input
                  name="applicantLocation"
                  value={formData.applicantLocation}
                  onChange={handleChange}
                  required
                  placeholder="Dhanmondi, Dhaka"
                  className={inputBox}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Housing Type
                </label>
                <select
                  name="housingType"
                  value={formData.housingType}
                  onChange={handleChange}
                  className={inputBox}
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo / Townhouse</option>
                  <option value="Farm / Other">Farm / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Ownership
                </label>
                <select
                  name="ownOrRent"
                  value={formData.ownOrRent}
                  onChange={handleChange}
                  className={inputBox}
                >
                  <option value="Own">Own</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Tell us about your home & experience with pets
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="We have experience raising dogs, someone is always at home, and we have a safe fenced yard..."
                rows={3}
                className={`${inputBox} resize-none`}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-[#426306] text-white font-bold rounded-xl hover:bg-[#344e05] transition shadow-sm disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              <Heart className="w-4 h-4" fill="currentColor" />
              {submitting ? 'Submitting Application...' : 'Submit Adoption Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}