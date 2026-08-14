import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, Route, Fuel, Wrench, Bell, FileText, MapPin, Map, FolderOpen, Settings, ChevronDown } from 'lucide-react';

function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Vehicles", icon: Truck, path: "/vehicles" },
    { name: "Drivers", icon: Users, path: "/drivers" },
    { name: "Trips", icon: Route, path: "/trips" },
    { name: "Fuel & Expenses", icon: Fuel, path: "/fuel" },
    { name: "Maintenance", icon: Wrench, path: "/maintenance" },
    { name: "Alerts", icon: Bell, path: "/alerts" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Live Tracking", icon: MapPin, path: "/tracking" },
    { name: "Geofence", icon: Map, path: "/geofence" },
    { name: "Documents", icon: FolderOpen, path: "/documents" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="w-64 h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}>
      
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Truck size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">FleetPro</h1>
            <p className="text-slate-400 text-xs mt-0.5">Fleet Management</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-slate-500 text-xs font-medium px-3 mb-2 uppercase tracking-wider">Main Menu</p>
        <ul className="flex flex-col gap-1">
          {menuItems.slice(0, 8).map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            return (
              <li
                key={item.name}
                onClick={() => { setActiveItem(item.name); navigate(item.path); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
                {item.name === 'Alerts' && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                )}
              </li>
            );
          })}
        </ul>

        <p className="text-slate-500 text-xs font-medium px-3 mb-2 mt-4 uppercase tracking-wider">More</p>
        <ul className="flex flex-col gap-1">
          {menuItems.slice(8).map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            return (
              <li
                key={item.name}
                onClick={() => { setActiveItem(item.name); navigate(item.path); }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-3 bg-slate-700 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-slate-600 transition-all">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">S</div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Saurabh</p>
            <p className="text-slate-400 text-xs">Admin</p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>

    </div>
  );
}

export default Sidebar;