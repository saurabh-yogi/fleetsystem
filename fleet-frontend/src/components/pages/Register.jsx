import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://fleet-backened.onrender.com/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'Admin' })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server not connected');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Truck size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">FleetPro</h1>
            <p className="text-xs text-gray-500">Fleet Management System</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h2>
        <p className="text-gray-500 text-sm mb-6">Register to get started</p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 gap-2 focus-within:border-blue-400">
            <User size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Enter your name"
              className="outline-none py-3 text-sm w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Email</label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 gap-2 focus-within:border-blue-400">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="outline-none py-3 text-sm w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-1 block">Password</label>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 gap-2 focus-within:border-blue-400">
            <Lock size={18} className="text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 8 chars, number & special char"
              className="outline-none py-3 text-sm w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} className="text-gray-400" /> : <Eye size={18} className="text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;