import React from 'react';
import { Plus, Users, ClipboardList, Building } from 'lucide-react';

export default function ShelterDashboard({ onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Title Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Shelter Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage listings, review adoption requests, and track activities.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('add-pet')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#426306] text-white font-bold hover:bg-[#344f05] transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Pet
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Available Pets</p>
          <p className="text-3xl font-black text-[#426306] mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Pending Applications</p>
          <p className="text-3xl font-black text-[#426306] mt-2">5</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Adopted This Month</p>
          <p className="text-3xl font-black text-[#426306] mt-2">8</p>
        </div>
      </div>

      {/* Simplified Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-xl">
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="w-full py-3 px-4 rounded-xl bg-[#426306] text-white font-bold hover:bg-[#344f05] transition text-center shadow-sm"
          >
            Manage Users
          </button>
          <button
            type="button"
            className="w-full py-3 px-4 rounded-xl bg-[#e8f2d8] text-[#426306] font-bold border border-[#d5e8b8] hover:bg-[#dcecc5] transition text-center"
          >
            Review Applications
          </button>
          <button
            type="button"
            className="w-full py-3 px-4 rounded-xl bg-white border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition text-center"
          >
            Add Shelter
          </button>
        </div>
      </div>
    </div>
  );
}