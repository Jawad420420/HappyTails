import React, { useState } from 'react';
import StatCard from '../components/admin/StatCard';
import AdoptionTable from '../components/admin/AdoptionTable';
import RecentActivity from '../components/admin/RecentActivity';
import QuickActions from '../components/admin/QuickActions';
import PetForm from '../components/addpet/PetForm';

export default function ShelterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full max-w-6xl mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-[#161d1f]">Shelter Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage listings, review adoption requests, and track activities.</p>
        </div>
        <button
          onClick={() => setActiveTab(activeTab === 'overview' ? 'add-pet' : 'overview')}
          className="px-5 py-2.5 bg-[#426306] text-white rounded-xl text-xs font-bold hover:bg-[#344d05] transition"
        >
          {activeTab === 'overview' ? '+ Add New Pet' : 'Back to Overview'}
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Available Pets" value="12" />
            <StatCard title="Pending Applications" value="5" />
            <StatCard title="Adopted This Month" value="8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AdoptionTable />
              <RecentActivity />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </>
      ) : (
        <PetForm />
      )}
    </div>
  );
}