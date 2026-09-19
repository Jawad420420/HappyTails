import React, { useState } from 'react';
import { Heart, PawPrint, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredUser, getToken } from '../../lib/auth';

export default function VolunteerForm() {
  const storedUser = getStoredUser();

  const [form, setForm] = useState({
    name: storedUser?.name || '',
    email: storedUser?.email || '',
    phone: '',
    location: '',
    workType: 'Pet Care & Feeding',
    availability: 'Weekends Only',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    // Retrieve authentication token
    const token = getToken ? getToken() : localStorage.getItem('token');

    if (!token) {
      setStatus('error');
      setErrorMsg('You must be logged in to submit a volunteer application. Please log in first.');
      return;
    }

    try {
      // Real API Call with Authorization Bearer token attached
      const response = await fetch('http://localhost:4000/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass JWT token to satisfy auth middleware
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          city: form.location,
          role: form.workType,
          availability: form.availability,
          reason: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to submit application');
      }

      // Show success screen
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const inputBox =
    'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-[#426306] transition text-sm';

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#e8f2d8] rounded-2xl flex items-center justify-center text-[#426306]">
          <PawPrint className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#161d1f]">
            Become a Volunteer
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Help animals find care, love, and a forever home. Join our volunteer team today!
          </p>
        </div>
      </div>

      {/* Hero Banner Image */}
      <div className="mb-6 rounded-2xl overflow-hidden bg-gray-100 h-48 sm:h-56 relative">
        <img
          src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80"
          alt="Volunteers with pets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 sm:p-6">
          <p className="text-white text-sm sm:text-base font-semibold">
            Every minute you dedicate brings hope to rescue animals in need.
          </p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-900">Application Submitted!</h3>
          <p className="text-sm text-emerald-700 max-w-md mx-auto">
            Thank you for stepping up to help! Our team has received your application. We will contact
            you soon via email.
          </p>
          <div className="pt-2">
            <Link
              to="/user-dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#426306] text-white text-xs font-bold rounded-xl hover:bg-[#344e05] transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
              <input
                name="name"
                placeholder="Full Name"
                className={inputBox}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className={inputBox}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
              <input
                name="phone"
                placeholder="Phone Number"
                className={inputBox}
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">City / Area *</label>
              <input
                name="location"
                placeholder="e.g. Dhanmondi, Dhaka"
                className={inputBox}
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Role / Work Type *</label>
              <select
                name="workType"
                className={inputBox}
                value={form.workType}
                onChange={handleChange}
                required
              >
                <option value="Pet Care & Feeding">Pet Care & Feeding</option>
                <option value="Dog Walking & Exercise">Dog Walking & Exercise</option>
                <option value="Temporary Fostering">Temporary Fostering</option>
                <option value="Adoption Events & Outreach">Adoption Events & Outreach</option>
                <option value="Administrative & Coordination">Administrative & Coordination</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Your Availability *</label>
              <select
                name="availability"
                className={inputBox}
                value={form.availability}
                onChange={handleChange}
                required
              >
                <option value="Weekends Only">Weekends Only</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Evenings">Evenings</option>
                <option value="Flexible / On-call">Flexible / On-call</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Why do you want to volunteer? *
            </label>
            <textarea
              name="message"
              placeholder="Tell us a little about your experience with animals and why you want to join..."
              className={`${inputBox} h-28 resize-none`}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#426306] text-white py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#344d05] transition active:scale-95 disabled:opacity-60 text-sm shadow-sm"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            {status === 'loading' ? 'Submitting Application...' : 'Join Volunteer Team'}
          </button>
        </form>
      )}
    </div>
  );
}