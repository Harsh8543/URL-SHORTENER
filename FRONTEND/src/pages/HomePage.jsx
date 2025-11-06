

import React from 'react'
import UrlForm from '../components/UrlForm'

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700/60 via-purple-600/60 to-indigo-700/60 backdrop-blur-sm"></div>

      {/* Main content */}
      <div className="relative z-10 bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
          ✨ URL Shortener ✨
        </h1>

        <p className="text-gray-600 mb-6">
          Create beautiful, shareable short links instantly.
        </p>

        <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-xl shadow-inner">
          <UrlForm />
        </div>
      </div>

      {/* Decorative glow at bottom */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-blue-500/30 via-transparent to-transparent blur-3xl opacity-70"></div>
    </div>
  )
}

export default HomePage
