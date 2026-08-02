import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Truck, Users, Route, Fuel, Wrench, Bell, FileText, MapPin, Map, FolderOpen, Settings } from 'lucide-react';
import {  useState } from 'react';


function Sidebar(){
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();


  const menuItems = [
   { name: "Dashboard", icon: LayoutDashboard, path:"/"},
   { name: "Vehicles", icon: Truck, path:"/vehicles"},
   {name: "Drivers", icon: Users, path:"/drivers"},
   {name: "Trips", icon: Route, path:"/trips"},
   {name: "Fuel & Expenses", icon: Fuel, path:"/fuel"},
   {name: "Maintenance", icon: Wrench, path:"/maintenance"},
   {name: "Alerts", icon: Bell, path:"/alerts"},
   {name: "Reports", icon: FileText, path:"/reports"},
   {name: "Live Tracking", icon: MapPin, path:"/tracking"},
   {name: "Geofence", icon: Map, path:"/geofence"},
   {name: "Documents", icon: FolderOpen, path:"/documents"},
   {name: "Settings", icon: Settings, path:"/settings"},
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
          onClick={() => {setActiveItem(item.name); navigate(item.path);}}
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