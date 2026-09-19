import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  PawPrint,
  Heart,
  HandHeart,
  CheckCircle,
  PlusCircle,
  Trash2,
  Shield,
} from 'lucide-react';
import {
  getPets,
  deletePet,
  getAllAdoptions,
  updateAdoptionStatus,
  getAllUsers,
  getAllVolunteers,
  updateVolunteerStatus,
} from '../lib/api';

export default function AdminDashboard() {
  const [pets, setPets] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const [activeTab, setActiveTab] = useState('volunteers');

  // Load all dashboard data
  const loadAllData = async () => {
    try {
      setLoading(true);
      setError('');

      const [petsData, adoptionsData, usersData, volunteersData] = await Promise.all([
        getPets(),
        getAllAdoptions(),
        getAllUsers(),
        getAllVolunteers(),
      ]);

      setPets(petsData || []);
      setAdoptions(adoptionsData || []);
      setUsers(usersData || []);
      setVolunteers(volunteersData || []);
    } catch (err) {
      setError(err.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const flashMessage = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(''), 3500);
  };

  // Adoption Status Change
  const handleAdoptionStatus = async (id, status) => {
    try {
      await updateAdoptionStatus(id, status);
      setAdoptions((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
      flashMessage(`Adoption request set to ${status}`);
    } catch (err) {
      alert(err.message || 'Failed to update adoption request');
    }
  };

  // Volunteer Status Change
  const handleVolunteerStatus = async (id, status) => {
    try {
      await updateVolunteerStatus(id, status);
      // Update local state so status becomes 'approved' or 'rejected'
      setVolunteers((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status } : v))
      );
      flashMessage(`Volunteer request set to ${status}`);
    } catch (err) {
      alert(err.message || 'Failed to update volunteer status');
    }
  };

  // Delete Pet
  const handleDeletePet = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deletePet(id);
      setPets((prev) => prev.filter((p) => (p._id || p.id) !== id));
      flashMessage(`Pet "${name}" removed from database`);
    } catch (err) {
      alert(err.message || 'Failed to delete pet');
    }
  };

  // Filter approved volunteers count specifically for the counter card
  const approvedVolunteersCount = volunteers.filter(
    (v) => (v.status || '').toLowerCase() === 'approved'
  ).length;

  // Filter approved adoptions if needed for stats
  const approvedAdoptionsCount = adoptions.filter(
    (a) => (a.status || '').toLowerCase() === 'approved'
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            Administrative Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d1f]">
            Admin Control Center
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage pet listings, approve/reject adoption & volunteer requests, and monitor users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/add-pet"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#426306] text-white font-bold hover:bg-[#344e05] transition text-xs sm:text-sm shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Pet
          </Link>
        </div>
      </div>

      {actionMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">{loading ? '...' : users.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e8f2d8] text-[#426306] flex items-center justify-center">
            <PawPrint className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pets Listed</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">{loading ? '...' : pets.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Approved Adoptions</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : approvedAdoptionsCount}
            </p>
          </div>
        </div>

        {/* VOLUNTEERS CARD: Starts at 0, only increments when approved */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <HandHeart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Volunteers</p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : approvedVolunteersCount}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100 bg-gray-50/70 px-4 sm:px-6 pt-3 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('volunteers')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'volunteers'
                ? 'border-[#426306] text-[#426306]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <HandHeart className="w-4 h-4" />
            Volunteer Applications ({volunteers.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('adoptions')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'adoptions'
                ? 'border-[#426306] text-[#426306]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            Adoption Requests ({adoptions.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pets')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'pets'
                ? 'border-[#426306] text-[#426306]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <PawPrint className="w-4 h-4" />
            Manage Pets ({pets.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'users'
                ? 'border-[#426306] text-[#426306]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Registered Users ({users.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-4 border-[#426306] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-gray-500 font-medium">Loading database records...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-medium">
              {error}
            </div>
          ) : (
            <>
              {/* VOLUNTEERS TAB */}
              {activeTab === 'volunteers' && (
                <div className="space-y-4">
                  {volunteers.length === 0 ? (
                    <p className="text-gray-500 text-sm py-8 text-center">No volunteer applications found.</p>
                  ) : (
                    volunteers.map((vol) => {
                      const isApproved = (vol.status || '').toLowerCase() === 'approved';
                      const isRejected = (vol.status || '').toLowerCase() === 'rejected';

                      return (
                        <div
                          key={vol._id}
                          className="bg-gray-50/70 border border-gray-200/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div>
                            <h3 className="font-bold text-gray-900 text-base">{vol.fullName || 'Volunteer Applicant'}</h3>
                            <p className="text-xs text-gray-500 mt-1">{vol.email} • {vol.phone}</p>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize mt-2 inline-block ${
                                isApproved
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isRejected
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {vol.status || 'Pending'}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleVolunteerStatus(vol._id, 'approved')}
                              disabled={isApproved}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                                isApproved
                                  ? 'bg-emerald-700 text-white opacity-60 cursor-not-allowed'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              }`}
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVolunteerStatus(vol._id, 'rejected')}
                              disabled={isRejected}
                              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                                isRejected
                                  ? 'bg-red-700 text-white opacity-60 cursor-not-allowed'
                                  : 'bg-red-600 hover:bg-red-700 text-white'
                              }`}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* ADOPTIONS TAB */}
              {activeTab === 'adoptions' && (
                <div className="space-y-4">
                  {adoptions.length === 0 ? (
                    <p className="text-gray-500 text-sm py-8 text-center">No adoption requests found.</p>
                  ) : (
                    adoptions.map((app) => (
                      <div
                        key={app._id}
                        className="bg-gray-50/70 border border-gray-200/60 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                      >
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">Pet: {app.petName || 'Rescue Pet'}</h3>
                          <p className="text-xs text-gray-600 mt-1">Applicant: {app.applicantName} ({app.applicantEmail})</p>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize bg-amber-100 text-amber-800 mt-2 inline-block">
                            {app.status || 'Pending'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleAdoptionStatus(app._id, 'approved')}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdoptionStatus(app._id, 'rejected')}
                            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* PETS TAB */}
              {activeTab === 'pets' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pets.map((pet) => (
                    <div key={pet._id || pet.id} className="bg-gray-50/70 border border-gray-200/70 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{pet.name}</h4>
                        <p className="text-xs text-gray-500">{pet.breed}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePet(pet._id || pet.id, pet.name)}
                        className="p-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* USERS TAB */}
              {activeTab === 'users' && (
                <div className="space-y-2">
                  {users.map((u) => (
                    <div key={u._id} className="p-3 bg-gray-50 rounded-xl flex justify-between text-xs">
                      <span className="font-bold text-gray-900">{u.name} ({u.email})</span>
                      <span className="uppercase font-bold text-amber-700">{u.role}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}