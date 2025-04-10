import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative">
      {/* Glassmorphism background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center my-12 md:my-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Short Links, <span className="text-blue-400">Big Impact</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create memorable, trackable short URLs in seconds. Share them anywhere and monitor their performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/SignIn')}
              className="px-8 py-4 bg-black/60 hover:bg-black/80 text-white font-medium rounded-lg transition-colors border border-gray-800 backdrop-blur-md"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/SignUp')}
              className="px-8 py-4 bg-blue-600/80 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors backdrop-blur-md"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Example Section */}
        <div className="backdrop-blur-xl bg-white/5 p-8 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 max-w-4xl mx-auto my-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <span className="text-2xl text-white">1</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Paste Your Link</h3>
              <p className="text-gray-400">Enter your long URL in the dashboard</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <span className="text-2xl  text-white">2</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Get Short URL</h3>
              <p className="text-gray-400">Instantly receive your shortened link</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <span className="text-2xl  text-white">3</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Track Clicks</h3>
              <p className="text-gray-400">Monitor performance and analytics</p>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="my-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose Our URL Shortener</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature Cards */}
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 mr-4 border border-white/10">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-medium text-white">Advanced Analytics</h3>
              </div>
              <p className="text-gray-400">Track clicks, geographic data, and referrers to optimize your links for better performance.</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 mr-4 border border-white/10">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="text-xl font-medium text-white">Link Preview</h3>
              </div>
              <p className="text-gray-400">Add "+" to any short URL to see where it leads before clicking, ensuring safety for you and your audience.</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 mr-4 border border-white/10">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-medium text-white">Secure & Reliable</h3>
              </div>
              <p className="text-gray-400">Enterprise-grade security and 99.9% uptime ensure your links work when you need them most.</p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/60 mr-4 border border-white/10">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-medium text-white">Lightning Fast</h3>
              </div>
              <p className="text-gray-400">Optimized redirects ensure your users reach their destination with minimal latency.</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="my-16 text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-blue-900/10 to-purple-900/10 p-10 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-300 mb-8">Join thousands of users who trust our platform for their link shortening needs.</p>
            <button 
              onClick={() => navigate('/SignUp')}
              className="px-8 py-4 bg-blue-600/80 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors shadow-lg backdrop-blur-md" 
            >
              Create Free Account
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-20 pt-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;