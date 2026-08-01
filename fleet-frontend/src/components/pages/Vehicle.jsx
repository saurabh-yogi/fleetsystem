import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search } from 'lucide-react';

function Vehicles() {
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://fleet-backened.onrender.com/api/vehicles', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  const filtered = vehicles.filter(v =>
    v.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    v.assignedDriver?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    if (status === 'Running') return 'bg-green-100 text-green-600';
    if (status === 'Stopped') return 'bg-red-100 text-red-600';
    return 'bg-orange-100 text-orange-600';
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Vehicles</h2>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Vehicle
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by vehicle no. or driver..."
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
                  {["Vehicle No.", "Type", "Brand", "Model", "Year", "Fuel", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-400">No vehicles found</td>
                  </tr>
                ) : (
                  filtered.map((v) => (
                    <tr key={v._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{v.vehicleNumber}</td>
                      <td className="px-4 py-3 text-sm">{v.type}</td>
                      <td className="px-4 py-3 text-sm">{v.brand}</td>
                      <td className="px-4 py-3 text-sm">{v.model}</td>
                      <td className="px-4 py-3 text-sm">{v.year}</td>
                      <td className="px-4 py-3 text-sm">{v.fuelType}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(v.status)}`}>
                          {v.status}
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

export default Vehicles;