
import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'

const DashboardPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/60 via-blue-600/60 to-indigo-700/60 backdrop-blur-sm"></div>

      <div className="relative z-10 bg-white/90 p-10 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
          ✨ URL Shortener Dashboard ✨
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Shorten, manage, and share your links with style!
        </p>

        <div className="space-y-8">
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-6 rounded-xl shadow-inner">
            <UrlForm />
          </div>

          <div className="bg-gradient-to-r from-pink-100 via-blue-100 to-indigo-100 p-6 rounded-xl shadow-inner">
            <UserUrl />
          </div>
        </div>
      </div>

      {/* Decorative glow effect */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-purple-500/30 via-transparent to-transparent blur-3xl opacity-70"></div>
    </div>
  )
}

export default DashboardPage
