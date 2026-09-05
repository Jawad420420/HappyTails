import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';
import { signup, login } from '../lib/api';

export default function AuthFlow({ onLogin, onCancel }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [role, setRole] = useState('adopter'); // 'adopter' or 'shelter'

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const switchMode = (mode) => {
    setAuthMode(mode);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const data =
        authMode === 'login'
          ? await login({ email, password })
          : await signup({ name, email, password, role });

      onLogin(data.user, data.token);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm p-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-11 h-11 bg-[#426306] rounded-full flex items-center justify-center mb-2">
            <PawPrint className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <span className="text-lg font-black text-[#161d1f]">Happy Tails</span>
        </div>

        {/* Mode Tabs */}
        <div className="flex bg-gray-50/80 p-1 rounded-xl mb-6 border border-gray-100">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 text-center rounded-lg text-sm font-semibold transition ${
              authMode === 'login' ? 'bg-white shadow-sm text-[#426306]' : 'text-gray-500'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            className={`flex-1 py-2 text-center rounded-lg text-sm font-semibold transition ${
              authMode === 'signup' ? 'bg-white shadow-sm text-[#426306]' : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-lg font-extrabold text-[#161d1f] text-center mb-4">
          {authMode === 'login' ? 'Welcome back!' : 'Create an account'}
        </h2>

        {authMode === 'signup' && (
          <>
            <p className="text-xs text-gray-500 font-semibold mb-2">I AM A...</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                onClick={() => setRole('adopter')}
                className={`p-2.5 rounded-xl border-2 text-sm font-medium text-center transition ${
                  role === 'adopter'
                    ? 'border-[#426306] bg-[#e8f2d8] text-[#426306]'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                🐶 Adopter
              </button>
              <button
                type="button"
                onClick={() => setRole('shelter')}
                className={`p-2.5 rounded-xl border-2 text-sm font-medium text-center transition ${
                  role === 'shelter'
                    ? 'border-[#426306] bg-[#e8f2d8] text-[#426306]'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                🏢 Shelter
              </button>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">
                {role === 'shelter' ? 'Shelter Name' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === 'shelter' ? 'HappyPaws Shelter' : 'Sarah Johnson'}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#426306]/40 focus:border-[#426306]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-600 mb-1 font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#426306]/40 focus:border-[#426306]"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#426306]/40 focus:border-[#426306]"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#426306] text-white font-semibold rounded-xl hover:bg-[#344e05] transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? 'Please wait…'
              : authMode === 'login'
              ? 'Log In'
              : 'Create Account'}
          </button>
        </form>

        <button
          onClick={onCancel}
          className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-4"
        >
          Back to browsing
        </button>
      </div>
    </div>
  );
}
