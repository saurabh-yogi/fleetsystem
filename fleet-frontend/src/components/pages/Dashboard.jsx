import { Truck, CheckCircle, Wrench, XCircle, Users, Navigation, Fuel, MapPin, FileText } from 'lucide-react';
import Navbar from '../Navbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

function Dashboard() {
  const stats = [
    { title: "Total Vehicles", value: "25", color: "bg-blue-50", textColor: "text-blue-600", icon: Truck, iconBg: "bg-blue-100" },
    { title: "Active Vehicles", value: "22", color: "bg-green-50", textColor: "text-green-600", icon: CheckCircle, iconBg: "bg-green-100" },
    { title: "In Maintenance", value: "2", color: "bg-orange-50", textColor: "text-orange-600", icon: Wrench, iconBg: "bg-orange-100" },
    { title: "Inactive Vehicles", value: "1", color: "bg-red-50", textColor: "text-red-600", icon: XCircle, iconBg: "bg-red-100" },
    { title: "Total Drivers", value: "30", color: "bg-purple-50", textColor: "text-purple-600", icon: Users, iconBg: "bg-purple-100" },
    { title: "Total Trips (Today)", value: "18", color: "bg-indigo-50", textColor: "text-indigo-600", icon: Navigation, iconBg: "bg-indigo-100" },
  ];

  const vehicles = [
    { vehicle: "RJ14 GA 1234", driver: "Ramesh Kumar", status: "Running", location: "Jaipur", speed: "60 km/h", fuel: "45%" },
    { vehicle: "RJ14 GB 5678", driver: "Mahesh Yadav", status: "Running", location: "Delhi", speed: "45 km/h", fuel: "62%" },
    { vehicle: "RJ14 GC 9876", driver: "Suresh Singh", status: "Stopped", location: "Ajmer", speed: "0 km/h", fuel: "23%" },
    { vehicle: "RJ14 GD 4321", driver: "Vikram Meena", status: "Running", location: "Kota", speed: "80 km/h", fuel: "71%" },
  ];

  const alerts = [
    { icon: Fuel, title: "High Fuel Consumption", vehicle: "RJ14 GA 1234", time: "10:30 AM", color: "text-red-500", bg: "bg-red-50" },
    { icon: Wrench, title: "Maintenance Due", vehicle: "RJ14 GB 5678", time: "Yesterday", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: MapPin, title: "Geofence Breach", vehicle: "RJ14 GC 9876", time: "22 May", color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: FileText, title: "Insurance Expiring Soon", vehicle: "RJ14 GD 4321", time: "20 May", color: "text-blue-500", bg: "bg-blue-50" },
  ];

  const tripData = [
    { date: "1 May", trips: 12 },
    { date: "7 May", trips: 18 },
    { date: "14 May", trips: 22 },
    { date: "21 May", trips: 28 },
    { date: "28 May", trips: 34 },
  ];

  const expenseData = [
    { name: "Fuel", value: 41, color: "#6366f1" },
    { name: "Maintenance", value: 22, color: "#3b82f6" },
    { name: "Driver Salary", value: 21, color: "#22c55e" },
    { name: "Toll & Tax", value: 7, color: "#f97316" },
    { name: "Other", value: 9, color: "#d1d5db" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">

        {/* First Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className={`${stat.color} p-5 rounded-xl shadow-md border border-gray-200`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <div className={`${stat.iconBg} p-2 rounded-lg`}>
                    <Icon size={20} className={stat.textColor} />
                  </div>
                </div>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Second Stats Row */}
        <div className="grid grid-cols-5 gap-4 mt-4">
          {[
            { title: "Today's Revenue", value: "₹78,500", change: "+12.5%", color: "text-green-500" },
            { title: "Today's Expense", value: "₹32,450", change: "+5.3%", color: "text-red-500" },
            { title: "Today's Profit", value: "₹46,050", change: "+18.2%", color: "text-green-500" },
            { title: "Fuel Consumed", value: "220.5 L", change: "+8.7%", color: "text-red-500" },
            { title: "Avg. Mileage", value: "15.6 km/l", change: "+4.6%", color: "text-green-500" },
          ].map((item) => (
            <div key={item.title} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{item.value}</p>
              <p className={`text-xs mt-1 ${item.color}`}>{item.change}</p>
            </div>
          ))}
        </div>

        {/* Table + Alerts Row */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Recent Vehicles Status</h3>
              <span className="text-blue-600 text-sm cursor-pointer">View all</span>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Vehicle No.", "Driver", "Status", "Location", "Speed", "Fuel"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((row) => (
                  <tr key={row.vehicle} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{row.vehicle}</td>
                    <td className="px-4 py-3 text-sm">{row.driver}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.status === 'Running' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{row.location}</td>
                    <td className="px-4 py-3 text-sm">{row.speed}</td>
                    <td className="px-4 py-3 text-sm">{row.fuel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Recent Alerts</h3>
              <span className="text-blue-600 text-sm cursor-pointer">View all</span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.title} className={`${alert.bg} p-3 rounded-lg flex items-start gap-3`}>
                    <div className={`${alert.color} mt-1`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                      <p className="text-xs text-gray-500">{alert.vehicle} • {alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-4 mt-4">

          {/* Trips Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 mb-4">Trips Overview (This Month)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={tripData}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="trips" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-bold text-gray-800 mb-4">Expense Overview (This Month)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={expenseData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                  {expenseData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;