import Navbar from '../Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Route } from 'lucide-react';

function Reports() {
  const monthlyRevenue = [
    { month: "Jan", revenue: 45000, expense: 28000 },
    { month: "Feb", revenue: 52000, expense: 31000 },
    { month: "Mar", revenue: 48000, expense: 29000 },
    { month: "Apr", revenue: 61000, expense: 35000 },
    { month: "May", revenue: 78500, expense: 32450 },
    { month: "Jun", revenue: 72000, expense: 30000 },
  ];

  const tripStats = [
    { month: "Jan", trips: 45 },
    { month: "Feb", trips: 52 },
    { month: "Mar", trips: 48 },
    { month: "Apr", trips: 61 },
    { month: "May", trips: 78 },
    { month: "Jun", trips: 72 },
  ];

  const summaryCards = [
    { title: "Total Revenue", value: "₹3,56,500", change: "+18%", positive: true, icon: TrendingUp, color: "from-green-500 to-green-600" },
    { title: "Total Expense", value: "₹1,85,450", change: "+5%", positive: false, icon: TrendingDown, color: "from-red-500 to-red-600" },
    { title: "Total Profit", value: "₹1,71,050", change: "+32%", positive: true, icon: DollarSign, color: "from-blue-500 to-blue-600" },
    { title: "Total Trips", value: "356", change: "+12%", positive: true, icon: Route, color: "from-purple-500 to-purple-600" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
          <p className="text-gray-500 text-sm">6 months analytics overview</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className={`bg-gradient-to-br ${card.color} p-5 rounded-2xl shadow-lg`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-white bg-opacity-20 p-2 rounded-xl">
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-white text-opacity-80 text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded-full">{card.change}</span>
                </div>
                <p className="text-white text-opacity-80 text-sm">{card.title}</p>
                <p className="text-white text-2xl font-bold mt-1">{card.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Revenue vs Expense</h3>
            <p className="text-gray-500 text-xs mb-4">Last 6 months comparison</p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyRevenue}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#22c55e" name="Revenue" radius={[6,6,0,0]} />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-1">Trip Trend</h3>
            <p className="text-gray-500 text-xs mb-4">Monthly trip count</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tripStats}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="trips" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;