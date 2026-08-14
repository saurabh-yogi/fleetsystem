import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://fleet-backened.onrender.com/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Server not connected');
    }
    setLoading(false);
  };

  const features = [
    { text: "Real-time Fleet Tracking", desc: "Monitor all vehicles live on map" },
    { text: "Smart Alerts & Notifications", desc: "Never miss maintenance or expiry" },
    { text: "Fuel & Expense Analytics", desc: "Track every rupee spent on fleet" },
    { text: "Driver Performance Reports", desc: "Detailed insights on every driver" },
  ];

  const stats = [
    { value: "500+", label: "Fleets Managed" },
    { value: "10K+", label: "Trips Tracked" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between px-16 py-12"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)' }}>
        
        {/* Background circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(-30%, 30%)' }}></div>

        {/* Logo */}
        <div className="flex items-center gap-3 z-10">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <Truck size={28} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">FleetPro</h1>
            <p className="text-blue-200 text-xs">Fleet Management System</p>
          </div>
        </div>

        {/* Main content */}
        <div className="z-10">
          <div className="inline-block bg-blue-500 bg-opacity-40 text-blue-100 text-xs px-3 py-1 rounded-full mb-4">
            🇮🇳 Made for Indian Fleet Operators
          </div>
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            Manage Your<br />Fleet Smarter
          </h2>
          <p className="text-blue-200 mb-10 text-lg">The complete solution for modern fleet management — built for India.</p>

          <div className="flex flex-col gap-4">
            {features.map((f) => (
              <div key={f.text} className="flex items-start gap-3">
                <div className="bg-green-400 rounded-full p-1 mt-0.5">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{f.text}</p>
                  <p className="text-blue-300 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="z-10 flex gap-8 border-t border-blue-500 pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-white text-2xl font-bold">{s.value}</p>
              <p className="text-blue-300 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Truck size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">FleetPro</h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">Welcome Back!</h2>
          <p className="text-gray-500 mb-8">Enter your credentials to access your fleet</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 gap-2 focus-within:border-blue-500 transition-colors">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="you@company.com"
                className="outline-none py-3.5 text-sm w-full text-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 gap-2 focus-within:border-blue-500 transition-colors">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="outline-none py-3.5 text-sm w-full text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}
          >
            {loading ? 'Logging in...' : <>Login to Dashboard <ArrowRight size={18} /></>}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')} className="text-blue-600 font-medium cursor-pointer hover:underline">
              Create Account
            </span>
          </p>

          <p className="text-center text-xs text-gray-400 mt-8">
            By logging in, you agree to our Terms of Service & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;