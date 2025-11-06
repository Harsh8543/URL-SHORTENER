


import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await registerUser(name, password, email);
      setLoading(false);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 shadow-2xl border border-white/30 rounded-3xl px-10 py-8">

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-white text-center drop-shadow-lg mb-6">
          Create an Account
        </h2>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-md text-red-100 bg-red-500/50 border border-red-300">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-5">
          <label className="block text-white font-semibold mb-2">Full Name</label>
          <input
            className="w-full py-2 px-4 rounded-lg bg-white/30 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-purple-300 outline-none"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-white font-semibold mb-2">Email</label>
          <input
            className="w-full py-2 px-4 rounded-lg bg-white/30 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-purple-300 outline-none"
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2">Password</label>
          <input
            className="w-full py-2 px-4 rounded-lg bg-white/30 text-white placeholder-white/70 border border-white/40 focus:ring-2 focus:ring-purple-300 outline-none"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:opacity-90 transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Switch to Login */}
        <p className="text-center text-white/90 mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => state(true)}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
