import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  PawPrint,
  Heart,
  HandHeart,
  CheckCircle,
  XCircle,
  PlusCircle,
  Trash2,
  Shield,
  Filter,
} from 'lucide-react';
import {
  getPets,
  deletePet,
  getAllAdoptions,
  updateAdoptionStatus,
  getAllUsers,
} from '../lib/api';

const mockVolunteersData = [
  {
    _id: 'vol-1',
    name: 'Rahim Chowdhury',
    email: 'rahim.c@example.com',
    phone: '+880 1812 345678',
    location: 'Gulshan, Dhaka',
    workType: 'Dog Walking',
    availability: 'Weekends Only',
    message: 'Love spending time with rescue dogs and helping them get daily exercise!',
    status: 'approved',
    createdAt: '2026-09-10T10:00:00.000Z',
  },
  {
    _id: 'vol-2',
    name: 'Nusrat Jahan',
    email: 'nusrat.j@example.com',
    phone: '+880 1719 876543',
    location: 'Banani, Dhaka',
    workType: 'Pet Care',
    availability: 'Flexible',
    message: 'Experienced with kitten fostering, bottle feeding, and shelter care.',
    status: 'pending',
    createdAt: '2026-09-14T14:30:00.000Z',
  },
  {
    _id: 'vol-3',
    name: 'Tanvir Hossain',
    email: 'tanvir.h@example.com',
    phone: '+880 1911 223344',
    location: 'Uttara, Dhaka',
    workType: 'Event Support',
    availability: 'Weekdays',
    message: 'Happy to help set up adoption fairs, coordinate guests, and photography.',
    status: 'pending',
    createdAt: '2026-09-16T09:15:00.000Z',
  },
];

export default function AdminDashboard() {
  const [pets, setPets] = useState([]);
  const [adoptions, setAdoptions] = useState([]);
  const [volunteers, setVolunteers] = useState(mockVolunteersData);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  const [activeTab, setActiveTab] = useState('adoptions'); // 'adoptions' | 'volunteers' | 'pets' | 'users'
  const [volunteerFilter, setVolunteerFilter] = useState('all');

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [petsData, adoptionsData, usersData] = await Promise.all([
        getPets(),
        getAllAdoptions(),
        getAllUsers(),
      ]);

      setPets(petsData);
      setAdoptions(adoptionsData);
      setUsers(usersData);
      setError('');
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

  // Adoption actions (real backend)
  const handleAdoptionStatus = async (id, status) => {
    try {
      await updateAdoptionStatus(id, status);
      setAdoptions((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
      flashMessage(`Adoption request marked as ${status}`);
    } catch (err) {
      alert(err.message || 'Failed to update adoption request');
    }
  };

  // Volunteer actions (mock local state)
  const handleVolunteerStatus = (id, status) => {
    setVolunteers((prev) =>
      prev.map((v) => (v._id === id ? { ...v, status } : v))
    );
    flashMessage(`Volunteer application marked as ${status}`);
  };

  // Pet deletion (real backend)
  const handleDeletePet = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from the system?`)) {
      return;
    }
    try {
      await deletePet(id);
      setPets((prev) => prev.filter((p) => (p._id || p.id) !== id));
      flashMessage(`Pet "${name}" removed from database`);
    } catch (err) {
      alert(err.message || 'Failed to delete pet');
    }
  };

  const filteredVolunteers = volunteers.filter((v) => {
    if (volunteerFilter === 'all') return true;
    return v.status === volunteerFilter;
  });

  const pendingAdoptionsCount = adoptions.filter((a) => a.status === 'pending').length;
  const pendingVolunteersCount = volunteers.filter((v) => v.status === 'pending').length;
  const approvedVolunteersCount = volunteers.filter((v) => v.status === 'approved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Admin Title Header */}
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

      {/* Live Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Users
            </p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : users.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e8f2d8] text-[#426306] flex items-center justify-center">
            <PawPrint className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Pets Listed
            </p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : pets.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Adoptions (Pending)
            </p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : `${pendingAdoptionsCount} / ${adoptions.length}`}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <HandHeart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Volunteers
            </p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {approvedVolunteersCount} ({pendingVolunteersCount} new)
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100 bg-gray-50/70 px-4 sm:px-6 pt-3 gap-2 overflow-x-auto">
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
            {pendingAdoptionsCount > 0 && (
              <span className="ml-1 bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingAdoptionsCount} pending
              </span>
            )}
          </button>

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
            Volunteer Requests ({volunteers.length})
            {pendingVolunteersCount > 0 && (
              <span className="ml-1 bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {pendingVolunteersCount} pending
              </span>
            )}
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

        {/* Tab Body */}
        <div className="p-6 sm:p-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="w-8 h-8 border-4 border-[#426306] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-gray-500 font-medium">Loading records from MongoDB...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-medium">
              {error}
            </div>
          ) : (
            <>
              {/* TAB 1: ADOPTION REQUESTS */}
              {activeTab === 'adoptions' && (
                <div className="space-y-4">
                  {adoptions.length === 0 ? (
                    <p className="text-gray-500 text-sm py-8 text-center">
                      No adoption applications in the system yet.
                    </p>
                  ) : (
                    adoptions.map((app) => (
                      <div
                        key={app._id}
                        className="bg-gray-50/70 border border-gray-200/60 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                      >
                        <div className="flex items-start sm:items-center gap-4">
                          {app.petImage ? (
                            <img
                              src={app.petImage}
                              alt={app.petName}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
                              🐾
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-gray-900 text-base">
                                Pet: {app.petName}
                              </h3>
                              <span className="text-xs text-gray-500">
                                ({app.petBreed || 'Rescue'})
                              </span>
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                                  app.status === 'approved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : app.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {app.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-600 mt-2">
                              <p>
                                <span className="font-semibold text-gray-700">Applicant:</span>{' '}
                                {app.applicantName} ({app.applicantEmail})
                              </p>
                              <p>
                                <span className="font-semibold text-gray-700">Phone:</span>{' '}
                                {app.applicantPhone}
                              </p>
                              <p>
                                <span className="font-semibold text-gray-700">Location:</span>{' '}
                                {app.applicantLocation}
                              </p>
                              <p>
                                <span className="font-semibold text-gray-700">Housing:</span>{' '}
                                {app.housingType} ({app.ownOrRent})
                              </p>
                            </div>

                            {app.notes && (
                              <p className="text-xs text-gray-600 mt-2 bg-white p-2.5 rounded-xl border border-gray-200/50 italic">
                                "{app.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Status Controls */}
                        <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                          <button
                            type="button"
                            onClick={() => handleAdoptionStatus(app._id, 'approved')}
                            disabled={app.status === 'approved'}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdoptionStatus(app._id, 'rejected')}
                            disabled={app.status === 'rejected'}
                            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: VOLUNTEER REQUESTS & CURRENT VOLUNTEERS (MOCK DATA) */}
              {activeTab === 'volunteers' && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-xl w-fit text-xs font-semibold">
                    <Filter className="w-3.5 h-3.5 text-gray-400 ml-2" />
                    {['all', 'pending', 'approved', 'rejected'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setVolunteerFilter(f)}
                        className={`px-3 py-1 rounded-lg capitalize transition ${
                          volunteerFilter === f
                            ? 'bg-white shadow-sm text-[#426306] font-bold'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {f === 'approved' ? 'Current Volunteers' : f}
                      </button>
                    ))}
                  </div>

                  {filteredVolunteers.length === 0 ? (
                    <p className="text-gray-500 text-sm py-8 text-center">
                      No volunteer applications matching "{volunteerFilter}".
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {filteredVolunteers.map((vol) => (
                        <div
                          key={vol._id}
                          className="bg-gray-50/70 border border-gray-200/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 className="font-bold text-gray-900 text-base">{vol.name}</h3>
                              <span className="text-xs font-semibold bg-[#e8f2d8] text-[#426306] px-2.5 py-0.5 rounded-lg">
                                {vol.workType}
                              </span>
                              <span className="text-xs font-medium text-gray-600 bg-gray-200/80 px-2 py-0.5 rounded-lg">
                                {vol.availability}
                              </span>
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                                  vol.status === 'approved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : vol.status === 'rejected'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {vol.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2 flex-wrap">
                              <span>Email: {vol.email}</span>
                              <span>•</span>
                              <span>Phone: {vol.phone}</span>
                              {vol.location && (
                                <>
                                  <span>•</span>
                                  <span>Location: {vol.location}</span>
                                </>
                              )}
                            </div>

                            {vol.message && (
                              <p className="text-xs text-gray-600 mt-2 bg-white p-2.5 rounded-xl border border-gray-200/50 italic max-w-2xl">
                                "{vol.message}"
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => handleVolunteerStatus(vol._id, 'approved')}
                              disabled={vol.status === 'approved'}
                              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleVolunteerStatus(vol._id, 'rejected')}
                              disabled={vol.status === 'rejected'}
                              className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: MANAGE PETS */}
              {activeTab === 'pets' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-500">
                      Manage listings directly in MongoDB Atlas. Deleting a pet removes it from public view.
                    </p>
                    <Link
                      to="/add-pet"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#426306] text-white text-xs font-bold hover:bg-[#344e05] transition shadow-sm"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Add Pet
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pets.map((pet) => {
                      const petId = pet._id || pet.id;
                      return (
                        <div
                          key={petId}
                          className="bg-gray-50/70 border border-gray-200/70 rounded-2xl overflow-hidden p-4 flex gap-4 items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={pet.mainImage}
                              alt={pet.name}
                              className="w-14 h-14 rounded-xl object-cover shrink-0"
                            />
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm">{pet.name}</h4>
                              <p className="text-xs text-gray-500">
                                {pet.breed} • {pet.age}
                              </p>
                              <span
                                className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  pet.status === 'adopted'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {pet.status === 'adopted' ? 'Adopted' : 'Available'}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeletePet(petId, pet.name)}
                            className="p-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition"
                            title="Remove pet"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: ALL REGISTERED USERS */}
              {activeTab === 'users' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Date Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-gray-50/60">
                          <td className="py-3 px-4 font-bold text-gray-900">{u.name}</td>
                          <td className="py-3 px-4 text-gray-600">{u.email}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                                u.role === 'admin'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-500">
                            {new Date(u.createdAt).toLocaleDateString(undefined, {
                              dateStyle: 'medium',
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}