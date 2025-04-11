import React, { useState, useEffect } from "react";
import axios from "../config/axiosInstance";

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [originalOldUrl, setOriginalOldUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [urls, setUrls] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getProfileDetails = async () => {
    const result = await axios.get("/user/getProfile");
    setUrls(result.data.user.urls);
    console.log(result.data.user.urls);
  };
  
  useEffect(() => {
    getProfileDetails();
  }, []);

  const createShortUrl = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/u/create", {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
      setOriginalOldUrl(originalUrl);
      setOriginalUrl("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative">

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Create New Short URL
          </h2>

          <form
            onSubmit={(e) => {
              createShortUrl(e);
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="originalUrl"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Original URL
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="originalUrl"
                  type="url"
                  placeholder="Enter you url (https://example.com/very/long/url)"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-black/60 hover:bg-black/80 text-white font-medium rounded-lg transition-colors border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                >
                  {isLoading ? "Creating..." : "Create Short URL"}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">
            Your Short URL
          </h2>

          {shortUrl ? (
            <div className="bg-black/40 p-4 rounded-lg border border-white/5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Short URL:</p>
                  <a
                    href={`${window.location.origin}/${shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 break-all"
                  >
                    {`${window.location.origin}/${shortUrl}`}
                  </a>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(`${window.location.origin}/${shortUrl}`)
                  }
                  className="px-4 py-2 bg-black/60 hover:bg-black/80 text-white font-medium rounded-lg transition-colors border border-white/10 backdrop-blur-md"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-gray-400 text-sm mb-1">Original URL:</p>
                <p className="text-gray-300 break-all">
                  {originalOldUrl || "URL not available"}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-black/40 p-4 rounded-lg border border-white/5 text-gray-400">
              Your shortened URL will appear here after creation
            </div>
          )}
        </div>

        <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            URL Statistics
          </h2>
          {urls && urls.length > 0 ? (
            <div className="space-y-4">
              {urls.map((url) => (
                <div key={url._id} className="bg-black/40 p-4 rounded-lg border border-white/5">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1">Short URL:</p>
                      <p className="text-blue-400 break-all mb-2">{import.meta.env.VITE_FRONTEND_URL+"/"+ url.shortUrl}</p>
                      <p className="text-gray-400 text-sm mb-1">Original URL:</p>
                      <p className="text-gray-300 break-all">{url.originalUrl}</p>
                    </div>
                    <div className="flex items-center mt-4 md:mt-0">
                      <div className="bg-black/60 border border-white/10 rounded-lg px-4 py-2">
                        <p className="text-gray-400 text-sm">Clicks</p>
                        <p className="text-white text-xl font-bold text-center">{url.clickCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No URLs created yet. Your statistics will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;