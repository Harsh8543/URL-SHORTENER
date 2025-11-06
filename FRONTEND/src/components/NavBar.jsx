
import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 
      shadow-lg border-b border-white/30 backdrop-blur-lg">
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* LEFT - Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md hover:scale-105 transition-all duration-300"
            >
              URL Shortener
            </Link>
          </div>

          {/* RIGHT - Auth */}
          <div className="flex items-center space-x-3">

            {/* LOGIN BUTTON */}
            <Link 
              to="/auth"
              className="bg-white/20 text-white font-semibold px-4 py-2 rounded-xl 
                border border-white/40 backdrop-blur-md shadow-md
                hover:bg-white/30 hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>

            {/* EXTRA BUTTON (OPTIONAL) Visual Enhancement */}
            <button 
              className="hidden sm:block bg-white text-purple-600 font-bold px-4 py-2 
                rounded-xl shadow-md hover:bg-gray-100 hover:scale-105 
                transition-all duration-300"
            >
              Try Now
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
