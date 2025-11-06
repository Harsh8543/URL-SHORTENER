
import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = () => {

  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    try {
      const shortUrl = await createShortUrl(url, customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="space-y-5 p-6 rounded-2xl shadow-xl bg-white/20 border border-white/40 backdrop-blur-xl
        animate-fadeIn">

      {/* Title */}
      <h1 className="text-2xl font-bold text-white text-center drop-shadow-lg">
        Shorten Your URL ✨
      </h1>

      {/* URL Input */}
      <div>
        <label htmlFor="url" className="block text-sm font-semibold text-white mb-1">
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/50 
          focus:ring-2 focus:ring-purple-600 outline-none shadow-md"
        />
      </div>

      {/* Custom Slug */}
      {isAuthenticated && (
        <div className="mt-2">
          <label htmlFor="customSlug" className="block text-sm font-semibold text-white mb-1">
            Custom Slug (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="your-custom-slug"
            className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/50 
            focus:ring-2 focus:ring-purple-600 outline-none shadow-md"
          />
        </div>
      )}

      {/* Shorten Button */}
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full py-3 font-semibold rounded-xl text-white shadow-lg 
          bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400
          hover:scale-105 transition-all duration-300"
      >
        Shorten URL
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-2 p-3 rounded-xl bg-red-200 text-red-700 shadow-md">
          {error}
        </div>
      )}

      {/* Short URL Display */}
      {shortUrl && (
        <div className="mt-4 bg-white/70 backdrop-blur-lg p-4 rounded-xl shadow-lg border border-white/40">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Your Shortened URL:
          </h2>

          <div className="flex items-center">
            <input
              readOnly
              value={shortUrl}
              className="flex-1 p-3 bg-gray-100 border border-gray-300 rounded-l-xl"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-r-xl font-semibold transition-all duration-300 ${
                copied
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default UrlForm
