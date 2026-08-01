import Navbar from '../Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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
    { title: "Total Revenue (6 months)", value: "₹3,56,500", color: "text-green-600" },
    { title: "Total Expense (6 months)", value: "₹1,85,450", color: "text-red-500" },
    { title: "Total Profit (6 months)", value: "₹1,71,050", color: "text-blue-600" },
    { title: "Total Trips (6 months)", value: "356", color: "text-purple-600" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Reports</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {summaryCards.map((card) => (
            <div key={card.title} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">

          {/* Revenue vs Expense */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Revenue vs Expense (6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyRevenue}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#22c55e" name="Revenue" radius={[4,4,0,0]} />
                <Bar dataKey="expense" fill="#ef4444" name="Expense" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trip Trend */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Trip Trend (6 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tripStats}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="trips" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Reports;