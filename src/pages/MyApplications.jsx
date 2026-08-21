import React from 'react';
import ApplicationList from '../components/myapplications/ApplicationList';

export default function MyApplications({ applications, onNavigate }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#161d1f] mb-6">My Applications</h1>
      <ApplicationList applications={applications} />
    </div>
  );
}
