import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm border-b border-gray-200">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500">overview of your fleet operations</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell size={22} className="text-gray-600 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">S</div>
          <span className="text-gray-700 font-medium">Saurabh</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;