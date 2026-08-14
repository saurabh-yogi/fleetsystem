import { Truck, CheckCircle, Wrench, XCircle, Users, Navigation, Fuel, MapPin, FileText } from 'lucide-react';
import Navbar from '../Navbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

function Dashboard() {
  const stats = [
    { title: "Total Vehicles", value: "25", color: "from-blue-500 to-blue-600", textColor: "text-white", icon: Truck, sub: "Fleet size" },
    { title: "Active Vehicles", value: "22", color: "from-green-500 to-green-600", textColor: "text-white", icon: CheckCircle, sub: "Currently running" },
    { title: "In Maintenance", value: "2", color: "from-orange-500 to-orange-600", textColor: "text-white", icon: Wrench, sub: "Under service" },
    { title: "Inactive Vehicles", value: "1", color: "from-red-500 to-red-600", textColor: "text-white", icon: XCircle, sub: "Not in use" },
    { title: "Total Drivers", value: "30", color: "from-purple-500 to-purple-600", textColor: "text-white", icon: Users, sub: "Registered drivers" },
    { title: "Total Trips Today", value: "18", color: "from-indigo-500 to-indigo-600", textColor: "text-white", icon: Navigation, sub: "Trips today" },
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

        {/* First Stats Row - Gradient Cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className={`bg-gradient-to-br ${stat.color} p-5 rounded-2xl shadow-lg`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-white text-opacity-70 text-xs">{stat.sub}</span>
                </div>
                <p className="text-white text-opacity-80 text-sm">{stat.title}</p>
                <p className="text-white text-4xl font-bold mt-1">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Second Stats Row */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          {[
            { title: "Today's Revenue", value: "₹78,500", change: "+12.5%", color: "text-green-500", border: "border-l-4 border-green-500" },
            { title: "Today's Expense", value: "₹32,450", change: "+5.3%", color: "text-red-500", border: "border-l-4 border-red-500" },
            { title: "Today's Profit", value: "₹46,050", change: "+18.2%", color: "text-green-500", border: "border-l-4 border-green-500" },
            { title: "Fuel Consumed", value: "220.5 L", change: "+8.7%", color: "text-red-500", border: "border-l-4 border-orange-500" },
            { title: "Avg. Mileage", value: "15.6 km/l", change: "+4.6%", color: "text-green-500", border: "border-l-4 border-blue-500" },
          ].map((item) => (
            <div key={item.title} className={`bg-white p-4 rounded-xl shadow-sm ${item.border}`}>
              <p className="text-xs text-gray-500">{item.title}</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{item.value}</p>
              <p className={`text-xs mt-1 font-medium ${item.color}`}>{item.change}</p>
            </div>
          ))}
        </div>

        {/* Table + Alerts Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Recent Vehicles Status</h3>
              <span className="text-blue-600 text-sm cursor-pointer font-medium">View all →</span>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Vehicle No.", "Driver", "Status", "Location", "Speed", "Fuel"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehicles.map((row) => (
                  <tr key={row.vehicle} className="border-t border-gray-50 hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-3 text-sm font-semibold text-gray-800">{row.vehicle}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{row.driver}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${row.status === 'Running' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-600">{row.location}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{row.speed}</td>
                    <td className="px-5 py-3 text-sm text-gray-600">{row.fuel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Recent Alerts</h3>
              <span className="text-blue-600 text-sm cursor-pointer font-medium">View all →</span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.title} className={`${alert.bg} p-3 rounded-xl flex items-start gap-3 hover:opacity-80 cursor-pointer transition-all`}>
                    <div className={`${alert.color} mt-0.5`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{alert.title}</p>
                      <p className="text-xs text-gray-500">{alert.vehicle} • {alert.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4">Trips Overview (This Month)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={tripData}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="trips" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-800 mb-4">Expense Overview (This Month)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={expenseData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value">
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