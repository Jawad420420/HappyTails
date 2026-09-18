import React, { useEffect, useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Trash2,
  AlertCircle,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import {
  getMyVaccinations,
  addVaccination,
  updateVaccination,
  deleteVaccination,
} from '../../lib/api';
import { getToken } from '../../lib/auth';
import { Link } from 'react-router-dom';

const standardVaccines = [
  'Rabies',
  'DHPP (Distemper, Hepatitis, Parvo, Parainfluenza)',
  'Bordetella (Kennel Cough)',
  'FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)',
  'FeLV (Feline Leukemia)',
  'Deworming Treatment',
];

export default function VaccinationCard() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    petName: '',
    vaccineName: 'Rabies',
    dueDate: '',
  });

  const isLoggedIn = !!getToken();

  const loadReminders = async () => {
    if (!isLoggedIn) return;
    try {
      setLoading(true);
      const data = await getMyVaccinations();
      setReminders(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load reminders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, [isLoggedIn]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddReminder = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError('Please log in to add pet vaccination reminders.');
      return;
    }
    setError('');
    setSuccess('');
    try {
      const res = await addVaccination(form);
      setReminders((prev) => [res.vaccination, ...prev]);
      setForm({ petName: '', vaccineName: 'Rabies', dueDate: '' });
      setSuccess('Vaccination reminder successfully scheduled!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save reminder');
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      const res = await updateVaccination(id, { status: newStatus });
      setReminders((prev) =>
        prev.map((r) => (r._id === id ? res.vaccination : r))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this vaccination reminder?')) return;
    try {
      await deleteVaccination(id);
      setReminders((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const inputBox =
    'w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#426306] text-sm';

  return (
    <div className="space-y-8">
      {/* Main Tracker Card */}
      <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#e8f2d8] rounded-xl flex items-center justify-center text-[#426306]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d1f]">
              Pet Health & Vaccination Tracker
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Keep your furry companions protected with real-time booster schedules
            </p>
          </div>
        </div>

        {!isLoggedIn ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <p className="text-amber-900 font-bold mb-2">Login Required</p>
            <p className="text-amber-700 text-xs sm:text-sm mb-4">
              Please log in to manage your pets' personal vaccination records and reminders.
            </p>
            <Link
              to="/auth"
              className="inline-block px-5 py-2.5 bg-[#426306] text-white text-xs font-bold rounded-xl hover:bg-[#344e05] transition"
            >
              Log In to My Account
            </Link>
          </div>
        ) : (
          <>
            {/* Add Reminder Form */}
            <div className="bg-[#f7faf0] rounded-2xl p-5 border border-[#e2edd0] mb-8">
              <h3 className="font-bold text-[#426306] text-sm sm:text-base flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4" />
                Add New Vaccination Reminder
              </h3>

              <form onSubmit={handleAddReminder} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Pet Name *
                    </label>
                    <input
                      name="petName"
                      placeholder="e.g. Max"
                      value={form.petName}
                      onChange={handleChange}
                      required
                      className={inputBox}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Vaccine Name *
                    </label>
                    <select
                      name="vaccineName"
                      value={form.vaccineName}
                      onChange={handleChange}
                      className={inputBox}
                    >
                      {standardVaccines.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Due Date *
                    </label>
                    <input
                      name="dueDate"
                      type="date"
                      value={form.dueDate}
                      onChange={handleChange}
                      required
                      className={inputBox}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-600 font-semibold bg-red-50 p-2 rounded-lg">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#426306] text-white py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#344d05] transition text-xs sm:text-sm shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Save Vaccination Schedule
                </button>
              </form>
            </div>

            {/* Vaccination History & Upcoming List */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                <span>Upcoming & Completed Vaccinations</span>
                <span className="text-xs font-normal text-gray-500">
                  {reminders.length} scheduled
                </span>
              </h2>

              {loading ? (
                <div className="text-center py-6 text-xs text-gray-500">
                  Loading vaccination records...
                </div>
              ) : reminders.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-500 text-xs">
                    No vaccination reminders scheduled yet. Add your first reminder above!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {reminders.map((item) => {
                    const isCompleted = item.status === 'completed';
                    const due = new Date(item.dueDate);
                    const isOverdue = !isCompleted && due < new Date();

                    return (
                      <div
                        key={item._id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border transition ${
                          isCompleted
                            ? 'bg-emerald-50/50 border-emerald-100'
                            : isOverdue
                            ? 'bg-amber-50/60 border-amber-200'
                            : 'bg-gray-50 border-gray-100'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-sm">
                              {item.petName}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs font-semibold text-[#426306]">
                              {item.vaccineName}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            Due: {due.toLocaleDateString(undefined, { dateStyle: 'medium' })}
                            {isOverdue && (
                              <span className="text-amber-700 font-bold ml-1">
                                (Overdue)
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleToggleComplete(item._id, item.status)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                              isCompleted
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-white border border-gray-300 text-gray-700 hover:border-[#426306]'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Completed
                              </>
                            ) : (
                              <>
                                <Clock className="w-3.5 h-3.5 text-gray-500" />
                                Mark Vaccinated
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete reminder"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Recommended Core Vaccination Timeline Reference Guide */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-[#161d1f] mb-2">
          Recommended Core Vaccination Schedule
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Standard veterinary timeline to protect puppies, kittens, and adult pets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dogs Schedule */}
          <div className="bg-[#f9faf7] rounded-2xl p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-[#426306] text-sm flex items-center gap-2">
              🐶 Canine (Dog) Vaccines
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex justify-between border-b border-gray-200/50 pb-1.5">
                <span className="font-semibold text-gray-800">6 – 8 Weeks:</span>
                <span>DHPP Core Booster 1</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/50 pb-1.5">
                <span className="font-semibold text-gray-800">10 – 12 Weeks:</span>
                <span>DHPP Booster 2, Bordetella</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/50 pb-1.5">
                <span className="font-semibold text-gray-800">16 Weeks:</span>
                <span>DHPP Booster 3, Rabies</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-gray-800">Annual (1+ Year):</span>
                <span>Rabies & DHPP Booster</span>
              </li>
            </ul>
          </div>

          {/* Cats Schedule */}
          <div className="bg-[#f9faf7] rounded-2xl p-5 border border-gray-100 space-y-3">
            <h3 className="font-bold text-[#426306] text-sm flex items-center gap-2">
              🐱 Feline (Cat) Vaccines
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex justify-between border-b border-gray-200/50 pb-1.5">
                <span className="font-semibold text-gray-800">6 – 8 Weeks:</span>
                <span>FVRCP (Distemper/Rhino)</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/50 pb-1.5">
                <span className="font-semibold text-gray-800">10 – 12 Weeks:</span>
                <span>FVRCP Booster 2, FeLV</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/50 pb-1.5">
                <span className="font-semibold text-gray-800">16 Weeks:</span>
                <span>Rabies, FeLV Booster</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold text-gray-800">Annual (1+ Year):</span>
                <span>Rabies & FVRCP Booster</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
