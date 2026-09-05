import React from 'react';
import BackButton from '../components/BackButton';
import ApplicationList from '../components/myapplications/ApplicationList';

export default function MyApplications({ applications }) {
  return (
    <div className="space-y-4 max-w-5xl mx-auto py-6 px-4">
      <div className="mb-4">
        <BackButton label="Back to Dashboard" />
      </div>
      <h1 className="text-3xl font-bold text-[#161d1f] mb-6">My Applications</h1>
      <ApplicationList applications={applications} />
    </div>
  );
}