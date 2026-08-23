import React from 'react';
import ApplicationList from '../components/myapplications/ApplicationList';
import StatCard from '../components/admin/StatCard';
import RecentActivity from '../components/admin/RecentActivity';

export default function UserDashboard({ applications = [], favoritesCount = 0, onNavigate }) {
  return (
    <div className="w-full max-w-6xl mx-auto py-6 space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#161d1f]">User Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your adoption applications, favorites, and recent account activity.</p>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('search')}
          className="px-5 py-2.5 bg-[#426306] text-white rounded-xl text-xs font-bold hover:bg-[#344d05] transition"
        >
          Browse Pets
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Applications Submitted" value={applications.length} />
        <StatCard title="Saved Favorites" value={favoritesCount} />
        <StatCard title="Notifications" value="2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-[#161d1f] mb-4">My Applications</h2>
          <ApplicationList applications={applications} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}