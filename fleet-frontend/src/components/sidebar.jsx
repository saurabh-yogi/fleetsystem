import { LayoutDashboard, Truck, Users, Route, Fuel, Wrench, Bell, FileText, MapPin, Map, FolderOpen, Settings } from 'lucide-react';
import { useState } from 'react';


function Sidebar(){
  const [activeItem, setActiveItem] = useState("Dashboard");


  const menuItems = [
   { name: "Dashboard", icon: LayoutDashboard},
   { name: "Vehicles", icon: Truck},
   {name: "Drivers", icon: Users},
   {name: "Trips", icon: Route},
   {name: "Fuel & Expenses", icon: Fuel},
   {name: "Maintenance", icon: Wrench},
   {name: "Alerts", icon: Bell},
   {name: "Reports", icon: FileText},
   {name: "Live Tracking", icon: MapPin},
   {name: "Geofence", icon: Map},
   {name: "Documents", icon: FolderOpen},
   {name: "Settings", icon: Settings},
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white">
      <h1 className="text-xl font-bold p-4">Fleet</h1>
      <ul>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;
          return (
          <li key={item.name}
          onClick={() => setActiveItem(item.name)}
          className={`flex items-center gap-3px-4 py-3  cursor-pointer ${
            isActive ? 'bg-blue-600' : 'hover:bg-slate-800'
          }`}   >
            
            <Icon size={20}/>
            <span>{item.name}</span>
          </li>
          );
})}
      </ul>
    </div>
  );
}

export default Sidebar;