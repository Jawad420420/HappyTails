// application card component
import { Calendar, MapPin } from 'lucide-react';

export default function ApplicationCard({
  application,
  onViewDetails,
}) {
  // status badge color styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Under Review':
        return {
          badgeClass: 'bg-[#ffdad6] text-[#93000a]',
          borderAccent: 'bg-[#fc8f34]',
        };
      case 'Approved':
        return {
          badgeClass: 'bg-[#c7f087] text-[#121f00]',
          borderAccent: 'bg-[#426306]',
        };
      case 'Pending':
      default:
        return {
          badgeClass: 'bg-[#dde4e6] text-[#44493a]',
          borderAccent: 'bg-[#74736e]',
        };
    }
  };

  const { badgeClass, borderAccent } = getStatusBadge(application.status);

  return (
    <div className="bg-[#ffffff] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 border border-[#dde4e6] flex flex-col sm:flex-row gap-5 relative overflow-hidden group">
      {/* accent line on card side */}
      <div className={`absolute top-0 left-0 w-2 h-full ${borderAccent}`} />

      {/* pet image thumbnail */}
      <div className="w-full sm:w-36 h-48 sm:h-36 shrink-0 rounded-xl overflow-hidden relative bg-[#dde4e6]">
        <img
          src={application.petImage}
          alt={application.petName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* card info */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          {/* name and status pill */}
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="text-xl font-bold text-[#161d1f]">
              {application.petName}
            </h3>
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold ${badgeClass}`}
            >
              {application.status}
            </span>
          </div>

          <p className="text-sm text-[#44493a] mb-3">
            {application.petBreed} • {application.petAge}
          </p>

          {/* date and shelter details */}
          <div className="space-y-1 text-xs text-[#44493a]">
            <p className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#747969]" />
              <span>Applied on: {application.appliedDate}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#747969]" />
              <span>{application.shelterName}</span>
            </p>
          </div>
        </div>

        {/* action button */}
        <div className="mt-4 sm:mt-2 flex sm:justify-end">
          <button
            type="button"
            onClick={() => onViewDetails(application)}
            className="w-full sm:w-auto px-5 py-2 border border-[#426306] text-[#426306] rounded-full text-xs font-bold hover:bg-[#5a7d22]/10 transition-colors active:scale-95 duration-100"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
