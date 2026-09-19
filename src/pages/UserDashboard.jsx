import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  HandHeart,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  User,
} from 'lucide-react';
import { getMyAdoptions, getMyVaccinations, getMyVolunteers } from '../lib/api';

export default function UserDashboard({ userName }) {
  const [adoptions, setAdoptions] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('adoptions');

  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        const [adoptionsData, vaccData, volData] = await Promise.all([
          getMyAdoptions(),
          getMyVaccinations().catch(() => []),
          getMyVolunteers().catch(() => []),
        ]);
        setAdoptions(adoptionsData || []);
        setVaccinations(vaccData || []);
        setVolunteers(volData || []);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Under Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#426306] uppercase tracking-wider mb-1">
            <User className="w-4 h-4" />
            User Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d1f]">
            Welcome back, {userName || 'Friend'}!
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your adoption requests, volunteer status, and pet health records.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/search"
            className="px-4 py-2.5 rounded-xl bg-[#426306] text-white font-bold text-xs hover:bg-[#344e05] transition shadow-sm"
          >
            Browse Available Pets
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#e8f2d8] text-[#426306] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Adoption Requests
            </p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : adoptions.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <HandHeart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Volunteer Applications
            </p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : volunteers.length}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Vaccination Reminders
            </p>
            <p className="text-2xl font-black text-gray-900 mt-0.5">
              {loading ? '...' : vaccinations.length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area with Tabs */}
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
            Volunteer Applications ({volunteers.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vaccinations')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-2 ${
              activeTab === 'vaccinations'
                ? 'border-[#426306] text-[#426306]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Vaccination Reminders ({vaccinations.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-[#426306] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-gray-500">Loading your records...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-medium">
              {error}
            </div>
          ) : (
            <>
              {/* ADOPTIONS TAB */}
              {activeTab === 'adoptions' && (
                <div>
                  {adoptions.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                      <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-900 mb-1 text-base">
                        No Adoption Applications Yet
                      </h3>
                      <p className="text-gray-500 text-xs mb-4">
                        You haven't submitted any adoption requests yet. Explore our rescue pets!
                      </p>
                      <Link
                        to="/search"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#426306] text-white text-xs font-bold rounded-xl hover:bg-[#344e05] transition"
                      >
                        Find a Pet
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {adoptions.map((app) => (
                        <div
                          key={app._id}
                          className="bg-gray-50/70 rounded-2xl border border-gray-200/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            {app.petImage ? (
                              <img
                                src={app.petImage}
                                alt={app.petName}
                                className="w-16 h-16 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                                🐾
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-bold text-gray-900 text-base">
                                  {app.petName || 'Unknown Pet'}
                                </h3>
                                <span className="text-xs text-gray-500">
                                  ({app.petBreed || 'Breed'})
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                Submitted:{' '}
                                {new Date(app.createdAt).toLocaleDateString(undefined, {
                                  dateStyle: 'medium',
                                })}
                              </p>
                              {app.applicantLocation && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Location: {app.applicantLocation} • Housing: {app.housingType}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col sm:items-end gap-1 shrink-0">
                            {getStatusBadge(app.status)}
                            <span className="text-[11px] text-gray-400 mt-1">
                              {app.status === 'approved'
                                ? 'Application approved! Our team will contact you.'
                                : app.status === 'rejected'
                                ? 'Application was not selected'
                                : 'Our team is reviewing your form'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* VOLUNTEERS TAB */}
              {activeTab === 'volunteers' && (
                <div>
                  {volunteers.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                      <HandHeart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-900 mb-1 text-base">
                        No Volunteer Applications Found
                      </h3>
                      <p className="text-gray-500 text-xs mb-4">
                        Interested in giving back? Apply to become a volunteer today!
                      </p>
                      <Link
                        to="/volunteer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#426306] text-white text-xs font-bold rounded-xl hover:bg-[#344e05] transition"
                      >
                        Apply as Volunteer
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {volunteers.map((vol) => (
                        <div
                          key={vol._id}
                          className="bg-gray-50/70 rounded-2xl border border-gray-200/60 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-gray-900 text-base">
                                {vol.role || vol.workType || 'General Volunteer'}
                              </h3>
                              <span className="text-xs font-medium text-gray-600 bg-gray-200/80 px-2 py-0.5 rounded-lg">
                                {vol.availability}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-gray-400" />
                              Applied:{' '}
                              {new Date(vol.createdAt).toLocaleDateString(undefined, {
                                dateStyle: 'medium',
                              })}
                            </p>
                            {(vol.reason || vol.message) && (
                              <p className="text-xs text-gray-600 mt-2 bg-white p-2.5 rounded-xl border border-gray-200/60 max-w-xl italic">
                                "{vol.reason || vol.message}"
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col sm:items-end gap-1 shrink-0">
                            {getStatusBadge(vol.status)}
                            <span className="text-[11px] text-gray-400 mt-1">
                              {vol.status === 'approved'
                                ? 'Welcome to the volunteer team!'
                                : vol.status === 'rejected'
                                ? 'Application not approved at this time'
                                : 'Awaiting coordinator review'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* VACCINATIONS TAB */}
              {activeTab === 'vaccinations' && (
                <div>
                  {vaccinations.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                      <ShieldCheck className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                      <h3 className="font-bold text-gray-900 mb-1 text-base">
                        No Vaccination Reminders
                      </h3>
                      <p className="text-gray-500 text-xs mb-4">
                        Keep your adopted pets up-to-date on essential rabies & core shots.
                      </p>
                      <Link
                        to="/vaccination"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#426306] text-white text-xs font-bold rounded-xl hover:bg-[#344e05] transition"
                      >
                        Schedule a Vaccine Reminder
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {vaccinations.map((vac) => {
                        const isCompleted = vac.status === 'completed';
                        const due = new Date(vac.dueDate);
                        return (
                          <div
                            key={vac._id}
                            className="bg-gray-50/70 rounded-2xl border border-gray-200/60 p-4 flex items-center justify-between gap-4"
                          >
                            <div>
                              <p className="font-bold text-gray-900 text-sm">
                                {vac.petName} • {vac.vaccineName}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Due: {due.toLocaleDateString(undefined, { dateStyle: 'medium' })}
                              </p>
                            </div>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full ${
                                isCompleted
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {isCompleted ? 'Completed' : 'Pending Booster'}
                            </span>
                          </div>
                        );
                      })}
                      <div className="pt-2">
                        <Link
                          to="/vaccination"
                          className="text-xs font-bold text-[#426306] hover:underline inline-flex items-center gap-1"
                        >
                          Manage All Vaccination Records
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}