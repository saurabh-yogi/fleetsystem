import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search } from 'lucide-react';

function Trips() {
  const [search, setSearch] = useState('');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://fleet-backened.onrender.com/api/trips', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
      setLoading(false);
    };
    fetchTrips();
  }, []);

  const filtered = trips.filter(t =>
    t.startLocation?.toLowerCase().includes(search.toLowerCase()) ||
    t.endLocation?.toLowerCase().includes(search.toLowerCase()) ||
    t.vehicle?.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    t.driver?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-green-600';
    if (status === 'Ongoing') return 'bg-blue-100 text-blue-600';
    return 'bg-red-100 text-red-600';
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Trips</h2>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Trip
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by vehicle, driver, or location..."
              className="outline-none text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Vehicle", "Driver", "From", "To", "Distance", "Fare", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-400">No trips found</td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{t.vehicle?.vehicleNumber || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{t.driver?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{t.startLocation}</td>
                      <td className="px-4 py-3 text-sm">{t.endLocation}</td>
                      <td className="px-4 py-3 text-sm">{t.distance ? `${t.distance} km` : 'N/A'}</td>
                      <td className="px-4 py-3 text-sm font-medium text-green-600">{t.fare ? `₹${t.fare}` : 'N/A'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(t.status)}`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Trips;