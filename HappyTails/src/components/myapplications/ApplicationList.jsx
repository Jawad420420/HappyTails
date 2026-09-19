import React from 'react';

export default function ApplicationList({ applications }) {
  if (applications.length === 0) {
    return <p className="text-center text-[#44493a]">No applications yet</p>;
  }

  return (
    <>
      {applications.map((app) => (
        <div key={app.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-[#161d1f]">{app.petName}</h3>
              <p className="text-sm text-[#44493a]">{app.petBreed} • {app.petAge}</p>
              <p className="text-xs text-[#747969]">Applied: {app.appliedDate}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              app.status === 'Approved' ? 'bg-[#c7f087] text-[#121f00]' :
              app.status === 'Under Review' ? 'bg-[#ffdad6] text-[#93000a]' :
              'bg-[#dde4e6] text-[#44493a]'
            }`}>
              {app.status}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
