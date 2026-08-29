import React from 'react';

export default function UserDashboard({ applications = [], onNavigate, userName = 'Sarah J.' }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Title Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h1 className="text-2xl font-black text-gray-900">User Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Track your adoption applications and manage your saved favorites.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Applications Submitted</p>
          <p className="text-3xl font-black text-[#426306] mt-2">
            {applications.length || 3}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-semibold text-gray-500">Saved Favorites</p>
          <p className="text-3xl font-black text-[#426306] mt-2">0</p>
        </div>
      </div>

      {/* Applications List Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-extrabold text-gray-900 mb-6">My Applications</h2>
        
        <div className="flex flex-col gap-4">
          {/* Sample Application Item 1 */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Max</h3>
              <p className="text-xs text-gray-500 mt-0.5">Applied: Oct 24, 2026</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold text-amber-800 bg-amber-100 rounded-full">
              Under Review
            </span>
          </div>

          {/* Sample Application Item 2 */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Luna</h3>
              <p className="text-xs text-gray-500 mt-0.5">Applied: Oct 18, 2026</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold text-[#426306] bg-[#e8f2d8] rounded-full">
              Approved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}