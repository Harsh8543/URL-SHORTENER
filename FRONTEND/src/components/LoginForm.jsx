
import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('sarkaranurag104@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(password, email);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517816428104-797678c7cf16?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 shadow-2xl border border-white/30 rounded-3xl px-10 py-8">

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-white text-center drop-shadow-lg mb-6">
          Welcome Back
        </h2>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-md text-red-100 bg-red-500/50 border border-red-300">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-5">
          <label className="block text-white font-semibold mb-2">Email</label>
          <input
            className="w-full py-2 px-4 rounded-lg bg-white/30 text-white placeholder-white/70 
            border border-white/40 focus:ring-2 focus:ring-blue-300 outline-none"
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
            className="w-full py-2 px-4 rounded-lg bg-white/30 text-white placeholder-white/70 
            border border-white/40 focus:ring-2 focus:ring-blue-300 outline-none"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 
          text-white font-bold shadow-lg hover:opacity-90 transition-all duration-300 
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Switch to Register */}
        <p className="text-center text-white/90 mt-4 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => state(false)}
            className="text-yellow-300 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
