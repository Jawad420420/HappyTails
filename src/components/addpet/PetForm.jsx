import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { createPet } from '../../lib/api';

const sampleImages = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
];

export default function PetForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    gender: 'male',
    location: '',
    aboutText: '',
    mainImage: '',
    isVaccinated: true,
    isDewormed: true,
    isNeutered: false,
    isHealthy: true,
    personality: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await createPet({
        ...formData,
        personality: formData.personality
          ? formData.personality.split(',').map((s) => s.trim())
          : [],
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to create pet');
      setSubmitting(false);
    }
  };

  const inputBox =
    'w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#426306] transition text-sm';

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#e8f2d8] rounded-xl flex items-center justify-center text-[#426306]">
          <PawPrint className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#161d1f]">Add New Pet Listing</h1>
          <p className="text-gray-500 text-xs mt-0.5">
            Create a live pet profile stored in MongoDB Atlas
          </p>
        </div>
      </div>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-900">Pet Created Successfully!</h3>
          <p className="text-sm text-emerald-700">Redirecting to admin dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image URL with live preview */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Pet Image URL *
            </label>
            <div className="flex gap-2">
              <input
                name="mainImage"
                type="url"
                value={formData.mainImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                required
                className={inputBox}
              />
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <span>Quick Sample Image:</span>
              {sampleImages.slice(0, 3).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, mainImage: img }))}
                  className="px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-[11px] font-medium transition"
                >
                  Sample {idx + 1}
                </button>
              ))}
            </div>

            {formData.mainImage && (
              <div className="mt-3 relative w-36 h-28 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={formData.mainImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Basic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Pet Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Max"
                required
                className={inputBox}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Animal Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} className={inputBox}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Breed *</label>
              <input
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                placeholder="e.g. Golden Retriever"
                required
                className={inputBox}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Age *</label>
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g. 2 Years / 6 Months"
                required
                className={inputBox}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputBox}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Location *</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Dhaka, Gulshan"
                required
                className={inputBox}
              />
            </div>
          </div>

          {/* Health & Medical Status Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Health & Medical Flags
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200/80">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isVaccinated"
                  checked={formData.isVaccinated}
                  onChange={handleChange}
                  className="rounded text-[#426306] focus:ring-[#426306] w-4 h-4"
                />
                Vaccinated
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isDewormed"
                  checked={formData.isDewormed}
                  onChange={handleChange}
                  className="rounded text-[#426306] focus:ring-[#426306] w-4 h-4"
                />
                Dewormed
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNeutered"
                  checked={formData.isNeutered}
                  onChange={handleChange}
                  className="rounded text-[#426306] focus:ring-[#426306] w-4 h-4"
                />
                Spayed / Neutered
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="isHealthy"
                  checked={formData.isHealthy}
                  onChange={handleChange}
                  className="rounded text-[#426306] focus:ring-[#426306] w-4 h-4"
                />
                Healthy
              </label>
            </div>
          </div>

          {/* Personality Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Personality Traits (comma separated)
            </label>
            <input
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              placeholder="Friendly, Playful, Active, Good with kids"
              className={inputBox}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              About the Pet *
            </label>
            <textarea
              name="aboutText"
              value={formData.aboutText}
              onChange={handleChange}
              placeholder="Describe pet personality, behavior, background story, and ideal home environment..."
              rows={4}
              required
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
            className="w-full bg-[#426306] text-white py-3.5 rounded-xl font-bold hover:bg-[#344d05] transition active:scale-95 shadow-sm disabled:opacity-60 text-sm flex items-center justify-center gap-2"
          >
            <PawPrint className="w-4 h-4" />
            {submitting ? 'Publishing Pet...' : 'Publish Pet to Database'}
          </button>
        </form>
      )}
    </div>
  );
}