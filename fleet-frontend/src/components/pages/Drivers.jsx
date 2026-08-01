import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search } from 'lucide-react';

function Drivers() {
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://fleet-backened.onrender.com/api/drivers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
      setLoading(false);
    };
    fetchDrivers();
  }, []);

  const filtered = drivers.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.phone?.includes(search)
  );

  const statusColor = (status) => {
    if (status === 'On Trip') return 'bg-blue-100 text-blue-600';
    if (status === 'Active') return 'bg-green-100 text-green-600';
    return 'bg-red-100 text-red-600';
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Drivers</h2>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Driver
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
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
                  {["Name", "Phone", "License", "Vehicle", "Experience", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-400">No drivers found</td>
                  </tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{d.name}</td>
                      <td className="px-4 py-3 text-sm">{d.phone}</td>
                      <td className="px-4 py-3 text-sm">{d.licenseNumber}</td>
                      <td className="px-4 py-3 text-sm">{d.assignedVehicle?.vehicleNumber || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{d.experience || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(d.status)}`}>
                          {d.status}
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

export default Drivers;