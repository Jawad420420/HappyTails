import React, { useState } from 'react';
import { PawPrint, Shield, User } from 'lucide-react';
import { signup, login } from '../lib/api';

export default function AuthFlow({ onLogin, onCancel }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
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
          : await signup({ name, email, password });

      onLogin(data.user, data.token);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillCredentials = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
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
          {authMode === 'login' ? 'Welcome back!' : 'Create your account'}
        </h2>

        {/* Quick Demo Credentials Helpers */}
        {authMode === 'login' && (
          <div className="mb-5 bg-gray-50 border border-gray-200/80 rounded-xl p-3">
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center">
              Quick Demo Logins
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('admin@happytails.com', 'admin123')}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-amber-900 hover:bg-amber-50 hover:border-amber-300 transition"
              >
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('user@happytails.com', 'user123')}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white rounded-lg border border-gray-200 text-xs font-semibold text-[#426306] hover:bg-[#e8f2d8] hover:border-[#426306] transition"
              >
                <User className="w-3.5 h-3.5 text-[#426306]" />
                User
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Johnson"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#426306]/40 focus:border-[#426306] text-sm"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#426306]/40 focus:border-[#426306] text-sm"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#426306]/40 focus:border-[#426306] text-sm"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#426306] text-white font-semibold rounded-xl hover:bg-[#344e05] transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed text-sm"
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
