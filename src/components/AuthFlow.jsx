import React, { useState } from 'react';

export default function AuthFlow({ onLogin, onCancel }) {
  // 'login' or 'signup'
  const [authMode, setAuthMode] = useState('login'); 
  // 'adopter' or 'shelter'
  const [role, setRole] = useState('adopter'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass user info back to App.jsx
    const userName = role === 'adopter' ? 'Sarah J.' : 'HappyPaws Shelter';
    onLogin(role, userName);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        
        {/* Header Tabs: Switch between Login & Signup */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-center rounded-lg text-sm font-semibold transition ${
              authMode === 'login' ? 'bg-white shadow text-green-700' : 'text-gray-500'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 text-center rounded-lg text-sm font-semibold transition ${
              authMode === 'signup' ? 'bg-white shadow text-green-700' : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          {authMode === 'login' ? 'Welcome Back!' : 'Create an Account'}
        </h2>

        {/* Role Selector Buttons */}
        <p className="text-xs text-gray-500 font-semibold mb-2">SELECT YOUR ROLE</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole('adopter')}
            className={`p-3 rounded-xl border-2 text-sm font-medium text-center transition ${
              role === 'adopter'
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            🐶 I want to Adopt
          </button>
          <button
            type="button"
            onClick={() => setRole('shelter')}
            className={`p-3 rounded-xl border-2 text-sm font-medium text-center transition ${
              role === 'shelter'
                ? 'border-green-500 bg-green-50 text-green-800'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            🏢 I am a Shelter
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'signup' && role === 'shelter' && (
            <div>
              <label className="block text-xs text-gray-600 mb-1 font-medium">Shelter Tax ID / EIN</label>
              <input
                type="text"
                placeholder="e.g. 12-3456789"
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-600 mb-1 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-md"
          >
            {authMode === 'login' ? `Log In as ${role === 'adopter' ? 'Adopter' : 'Shelter'}` : 'Register Account'}
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