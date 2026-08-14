import { Bell, LogOut, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const pageTitles = {
    '/': { title: 'Dashboard', sub: 'Welcome back! Here\'s your fleet overview' },
    '/vehicles': { title: 'Vehicles', sub: 'Manage your fleet vehicles' },
    '/drivers': { title: 'Drivers', sub: 'Manage your drivers' },
    '/trips': { title: 'Trips', sub: 'Track all trips' },
    '/fuel': { title: 'Fuel & Expenses', sub: 'Monitor fuel consumption' },
    '/maintenance': { title: 'Maintenance', sub: 'Schedule and track maintenance' },
    '/alerts': { title: 'Alerts', sub: 'Stay updated with notifications' },
    '/reports': { title: 'Reports', sub: 'Analytics and insights' },
    '/tracking': { title: 'Live Tracking', sub: 'Real-time vehicle locations' },
    '/geofence': { title: 'Geofence', sub: 'Manage geographic boundaries' },
    '/documents': { title: 'Documents', sub: 'Manage fleet documents' },
    '/settings': { title: 'Settings', sub: 'Configure your preferences' },
  };

  const current = pageTitles[location.pathname] || { title: 'FleetPro', sub: 'Fleet Management System' };

  return (
    <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{current.title}</h2>
        <p className="text-sm text-gray-500">{current.sub}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search size={16} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-xl outline-none focus:bg-gray-200 transition-colors w-48"
          />
        </div>
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow">S</div>
          <span className="text-gray-700 font-medium text-sm hidden md:block">Saurabh</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
          <LogOut size={16} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;