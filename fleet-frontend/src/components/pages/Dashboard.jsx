import { Truck, CheckCircle, Wrench, XCircle, Users, Navigation } from 'lucide-react';

function Dashboard(){
  const stats = [
    { title: "Total Vehicles", value: "25", color: "bg-blue-50", textColor: "text-blue-600",icon: Truck, iconBg: "bg-blue-100"},
    { title: "Active Vehicles", value: "22",color: "bg-green-50", textColor: "text-green-600", icon: CheckCircle, iconBg: "bg-green-100"},
    { title: "In Maintenance", value: "2",color: "bg-orange-50", textColor: "text-orange-600", icon: Wrench, iconBg: "bg-orange-100"},
    { title: "Inactive Vehicles", value: "1",color: "bg-red-50", textColor: "text-red-600", icon: XCircle, iconBg: "bg-red-100"},
    { title: "Total Drivers", value: "30",color: "bg-purple-50", textColor: "text-purple-600", icon: Users, iconBg: "bg-purple-100"},
    { title: "Total Trips(Today", value: "18",color: "bg-indigo-50", textColor: "text-indigo-600",icon: Navigation, iconBg: "bg-indigo-100"},
  ];
  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-500 mb-6">overview of fleet operations</p>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
        
          <div key ={stat.title} className={`${stat.color} p-5 rounded-xl shadow-md border border-gray-300`}>
            <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">{stat.title}</p>
            <div className= {`${stat.iconBg} p-2  rounded-lg`}>
              <Icon size={20} className={stat.textColor} />
              </div>
              </div>
            <p className={`text-3xl font-bold mt-1 ${stat.textColor}`}>{stat.value}</p>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;