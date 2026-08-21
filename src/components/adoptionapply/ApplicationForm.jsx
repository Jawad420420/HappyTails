import React from 'react';
import { User, Mail, Phone, MapPin, Home, Info, CheckSquare, Heart } from 'lucide-react';

export default function ApplicationForm({ formData, setFormData, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Adoption Application</h2>
        <p className="text-gray-500">Please fill out this form to begin the adoption process.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#426306] focus:border-transparent transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#426306] focus:border-transparent transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#426306] focus:border-transparent transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Location / Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="City, State, Zip"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#426306] focus:border-transparent transition-all outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Housing Type</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Home className="w-5 h-5 text-gray-400" />
            </div>
            <select
              value={formData.housingType}
              onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#426306] focus:border-transparent transition-all outline-none appearance-none"
            >
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo/Townhouse</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Do you own or rent?</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <CheckSquare className="w-5 h-5 text-gray-400" />
            </div>
            <select
              value={formData.ownOrRent}
              onChange={(e) => setFormData({ ...formData, ownOrRent: e.target.value })}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#426306] focus:border-transparent transition-all outline-none appearance-none"
            >
              <option value="Own">Own</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-blue-50/50 rounded-2xl p-5 mb-8 border border-blue-100 flex gap-4">
        <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 leading-relaxed">
          By submitting this application, you are expressing interest in adopting. Our team will review your application and contact you within 2-3 business days to discuss the next steps.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100 mt-6">
        <label className="flex items-center gap-3 cursor-pointer group w-full sm:w-auto">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              className="peer sr-only"
              required
            />
            <div className="w-6 h-6 border-2 border-gray-300 rounded-md peer-checked:bg-[#426306] peer-checked:border-[#426306] peer-focus:ring-2 peer-focus:ring-[#426306]/30 transition-all flex items-center justify-center bg-white group-hover:border-[#426306]">
              <svg className={`w-4 h-4 text-white pointer-events-none transition-transform duration-200 ${formData.termsAccepted ? 'scale-100' : 'scale-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            I agree to the <a href="#" className="text-[#426306] hover:underline">adoption terms</a>
          </span>
        </label>

        <button
          type="submit"
          disabled={!formData.termsAccepted}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#426306] text-white rounded-xl font-bold text-lg hover:bg-[#344d05] focus:ring-4 focus:ring-[#426306]/30 transition-all shadow-lg shadow-[#426306]/30 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 flex items-center justify-center gap-2"
        >
          Submit Application
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>
    </form>
  );
}
