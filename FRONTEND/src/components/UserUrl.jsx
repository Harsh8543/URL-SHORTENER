

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  // Loading animation
  if (isLoading) {
    return (
      <div className="flex justify-center my-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Error UI
  if (isError) {
    return (
      <div className="my-6 bg-red-200 border border-red-500 text-red-700 px-4 py-3 rounded-xl shadow-md">
        Error loading your URLs: {error.message}
      </div>
    )
  }

  // No URLs
  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center my-8 p-6 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <h2 className="text-xl font-semibold text-gray-700">No URLs Found</h2>
        <p className="text-gray-500 mt-1">Create your first shortened URL!</p>
      </div>
    )
  }

  return (
    <div className="mt-8 bg-white/20 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-4">
        <h1 className="text-xl font-bold text-white drop-shadow-lg">Your Shortened URLs</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto h-64">
        <table className="min-w-full divide-y divide-white/40">
          <thead className="bg-white/30 backdrop-blur-xl">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Short URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white/60 backdrop-blur-xl">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-white/80 transition-all">
                
                {/* Full URL */}
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900 truncate max-w-xs">{url.full_url}</p>
                </td>

                {/* Short URL */}
                <td className="px-6 py-4">
                  <a
                    href={`http://localhost:3000/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 underline font-semibold"
                  >
                    localhost:3000/{url.short_url}
                  </a>
                </td>

                {/* Clicks */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-bold bg-purple-100 text-purple-800 rounded-full">
                    {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                  </span>
                </td>

                {/* Copy Button */}
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleCopy(`http://localhost:3000/${url.short_url}`, url._id)
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all ${
                      copiedId === url._id
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105"
                    }`}
                  >
                    {copiedId === url._id ? "Copied!" : "Copy URL"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserUrl
