import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axiosInstance";

const Redirect = () => {
  const { shortId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        setLoading(true);
        const isPlusInShortId = shortId.includes("+");
        setIsPreviewMode(isPlusInShortId);
        const cleanShortId = isPlusInShortId ? shortId.replace("+", "") : shortId;
        const response = await axios.get(`/u/${cleanShortId}`);
        if (response.data && response.data.originalUrl) {
          setOriginalUrl(response.data.originalUrl);
          if (!isPlusInShortId) {
            setTimeout(() => {
              window.location.href = response.data.originalUrl;
            }, 1500);
          }
        } else {
          setError("Invalid short URL");
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to retrieve original URL"
        );
      } finally {
        setLoading(false);
      }
    };

    if (shortId) {
      fetchOriginalUrl();
    } else {
      setError("No short URL provided");
      setLoading(false);
    }
  }, [shortId]);

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative">
      {/* Glassmorphism background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>

      <div className="max-w-xl w-full backdrop-blur-xl bg-white/5 p-8 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 text-center z-10">
        {loading ? (
          <>
            <div className="animate-spin w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Processing...
            </h2>
            <p className="text-gray-400">
              Please wait while we process your request.
            </p>
          </>
        ) : error ? (
          <>
            <div className="text-red-400 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Redirect Failed
            </h2>
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-black/60 hover:bg-black/80 text-white font-medium rounded-lg transition-colors border border-white/10 backdrop-blur-md"
            >
              Back to Home
            </button>
          </>
        ) : isPreviewMode ? (
          <>
            <div className="text-yellow-400 text-5xl mb-4">👁️</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Link Preview
            </h2>
            <p className="text-gray-400 mb-2">This URL will redirect you to:</p>
            <div className="bg-black/40 p-4 rounded-lg border border-white/5 mb-6">
              <p className="text-blue-400 break-all">{originalUrl}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={originalUrl}
                className="px-6 py-3 bg-black/60 hover:bg-black/80 text-white font-medium rounded-lg transition-colors border border-white/10 backdrop-blur-md"
              >
                Continue to Website
              </a>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-medium rounded-lg transition-colors border border-white/10 backdrop-blur-md"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-green-400 text-5xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Redirecting...
            </h2>
            <p className="text-gray-400 mb-2">You are being redirected to:</p>
            <p className="text-blue-400 break-all mb-6">{originalUrl}</p>
            <div className="flex flex-col space-y-3">
              <p className="text-gray-400">Redirecting you automatically...</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={originalUrl}
                  className="px-6 py-3 bg-black/60 hover:bg-black/80 text-white font-medium rounded-lg transition-colors border border-white/10 backdrop-blur-md"
                >
                  Redirect Now
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Redirect;
