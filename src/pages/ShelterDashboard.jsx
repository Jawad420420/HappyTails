import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, ClipboardList } from 'lucide-react';

export default function ShelterDashboard({ userName = 'Shelter Admin' }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Title Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h1 className="text-2xl font-black text-gray-900">{userName} Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage listings, review adoption requests, and track activities.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Available Pets</p>
          <p className="text-3xl font-black text-[#426306] mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Pending Applications</p>
          <p className="text-3xl font-black text-[#426306] mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Adopted This Month</p>
          <p className="text-3xl font-black text-[#426306] mt-2">8</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-xl">
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          <Link
            to="/add-pet"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#426306] text-white font-bold hover:bg-[#344f05] transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Pet
          </Link>

          <Link
            to="/search"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-50 text-red-700 font-bold border border-red-200 hover:bg-red-100 transition"
          >
            <Trash2 className="w-4 h-4" />
            Remove a Pet
          </Link>

          <Link
            to="/applications"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e8f2d8] text-[#426306] font-bold border border-[#d5e8b8] hover:bg-[#dcecc5] transition"
          >
            <ClipboardList className="w-4 h-4" />
            Review Applications
          </Link>
        </div>
      </div>
    </div>
  );
}