import React, { useState, useEffect } from 'react';
import { ShieldCheck, Heart, Stethoscope, Utensils, Plus, Trash2 } from 'lucide-react';
import { getToken, getStoredUser } from '../lib/auth';
import Footer from '../components/Footer';

const iconMap = {
  Utensils,
  Stethoscope,
  Heart,
  ShieldCheck,
};

export default function PetCareGuide({ userRole }) {
  const user = getStoredUser();
  const isAdmin = userRole === 'admin' || user?.role === 'admin';

  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', category: 'Utensils' });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/guides');
      const data = await res.json();
      if (res.ok) setGuides(data);
    } catch (err) {
      console.error('Failed to load guides:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      alert('Your session expired or token is missing. Please log in again.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/guides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowAddModal(false);
        setFormData({ title: '', desc: '', category: 'Utensils' });
        fetchGuides();
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Failed to save guide');
      }
    } catch (err) {
      console.error('Failed to create guide:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this guide?')) return;

    const token = getToken();

    try {
      const res = await fetch(`http://localhost:4000/api/guides/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) fetchGuides();
    } catch (err) {
      console.error('Failed to delete guide:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-between bg-gray-50/50">
      <div className="w-full max-w-5xl mx-auto py-8 space-y-8 flex-1 px-4">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl font-extrabold text-[#161d1f]">Pet Care Guide</h1>
          <p className="text-sm text-gray-500">
            Essential health, nutrition, and safety advice to help your adopted pets thrive.
          </p>

          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#426306] text-white rounded-xl text-sm font-semibold hover:bg-[#344e05] transition shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add New Guide
            </button>
          )}
        </div>

        {/* Guides Grid */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading guides...</p>
        ) : guides.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No pet care guides available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g) => {
              const IconComponent = iconMap[g.category] || Utensils;
              return (
                <div
                  key={g._id || g.id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4 hover:border-[#426306] transition relative group"
                >
                  <div className="p-3 bg-[#e8f2d8] text-[#426306] rounded-2xl shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1 pr-6">
                    <h3 className="text-lg font-bold text-[#161d1f] mb-1">{g.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{g.desc}</p>
                  </div>

                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(g._id || g.id)}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition"
                      title="Delete Guide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Guide Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-[#161d1f]">Add Pet Care Guide</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Daily Nutrition & Diet"
                  className="w-full border rounded-xl p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-[#426306]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Icon Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-xl p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-[#426306]"
                >
                  <option value="Utensils">Nutrition & Diet (Utensils)</option>
                  <option value="Stethoscope">Vet Visits (Stethoscope)</option>
                  <option value="Heart">Grooming & Hygiene (Heart)</option>
                  <option value="ShieldCheck">Home Safety (ShieldCheck)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600">Description</label>
                <textarea
                  required
                  rows="3"
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="Provide essential care information..."
                  className="w-full border rounded-xl p-2.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-[#426306]"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-xl text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#426306] text-white rounded-xl text-sm font-semibold hover:bg-[#344e05]"
                >
                  Save Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}