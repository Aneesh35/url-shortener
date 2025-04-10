import React, { useState } from "react";
import axios from '../config/axiosInstance.js'
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await axios.post("/user/SignUp", { email, password });
      localStorage.clear();
      localStorage.setItem('token', result.data.token);
      navigate("/dashBoard");
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center relative">
      {/* Glassmorphism background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-md w-full backdrop-blur-xl bg-white/5 p-8 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Sign up to start creating short links</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full px-4 py-3 bg-blue-600/80 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/SignIn" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;