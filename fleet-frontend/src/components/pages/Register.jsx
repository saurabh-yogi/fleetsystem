import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Mail, Lock, Eye, EyeOff, User, ArrowRight, Shield, Clock, TrendingUp, Star } from 'lucide-react';

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

  const benefits = [
    { icon: Shield, title: "100% Secure & Private", desc: "Your fleet data is encrypted and safe" },
    { icon: Clock, title: "Setup in 2 Minutes", desc: "Start managing your fleet instantly" },
    { icon: TrendingUp, title: "Reduce Costs by 30%", desc: "Smart insights save fuel and maintenance costs" },
  ];

  const reviews = [
    { name: "Rajesh Sharma", company: "Sharma Logistics, Jaipur", text: "FleetPro ne hamare 50 trucks ka management ekdum aasan kar diya!", stars: 5 },
    { name: "Mohammad Iqbal", company: "IM Transport, Delhi", text: "Best fleet software for Indian transport business!", stars: 5 },
  ];

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between px-16 py-12"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)' }}>

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
            🚀 Join 500+ Fleet Operators
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Start Managing<br />Your Fleet Today
          </h2>
          <p className="text-blue-200 mb-8 text-lg">Free to start. No credit card required. Setup in minutes.</p>

          {/* Benefits */}
          <div className="flex flex-col gap-5 mb-8">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="flex items-start gap-4">
                  <div className="bg-blue-500 bg-opacity-40 p-2 rounded-lg">
                    <Icon size={20} className="text-blue-200" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{b.title}</p>
                    <p className="text-blue-300 text-xs mt-0.5">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reviews */}
          <div className="flex flex-col gap-3">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white bg-opacity-10 rounded-xl p-4">
                <div className="flex gap-1 mb-2">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-100 text-xs italic">"{r.text}"</p>
                <p className="text-blue-300 text-xs mt-2 font-medium">— {r.name}, {r.company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="z-10 border-t border-blue-500 pt-6">
          <p className="text-blue-300 text-xs">🔒 256-bit SSL encrypted • GDPR compliant • 99.9% uptime</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Truck size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">FleetPro</h1>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">Create Account</h2>
          <p className="text-gray-500 mb-8">Start your free fleet management journey</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 gap-2 focus-within:border-blue-500 transition-colors">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Rajesh Kumar"
                className="outline-none py-3.5 text-sm w-full text-gray-800"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
                placeholder="Min 8 chars, number & special char"
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
            onClick={handleRegister}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}
          >
            {loading ? 'Creating Account...' : <>Create Free Account <ArrowRight size={18} /></>}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="text-blue-600 font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>

          <p className="text-center text-xs text-gray-400 mt-6">
            🔒 Your data is secure. We never share your information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;