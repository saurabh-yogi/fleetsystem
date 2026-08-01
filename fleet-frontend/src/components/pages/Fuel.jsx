import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search } from 'lucide-react';

function Fuel() {
  const [search, setSearch] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFuel = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://fleet-backened.onrender.com/api/fuel', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching fuel records:', error);
      }
      setLoading(false);
    };
    fetchFuel();
  }, []);

  const filtered = records.filter(r =>
    r.vehicle?.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    r.driver?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Fuel & Expenses</h2>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Record
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
                  {["Vehicle", "Driver", "Date", "Liters", "Price/L", "Total", "Location", "Odometer"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-400">No fuel records found</td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{r.vehicle?.vehicleNumber || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{r.driver?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm">{r.liters} L</td>
                      <td className="px-4 py-3 text-sm">₹{r.pricePerLiter}/L</td>
                      <td className="px-4 py-3 text-sm font-medium text-green-600">₹{r.totalCost}</td>
                      <td className="px-4 py-3 text-sm">{r.location || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{r.odometer ? `${r.odometer} km` : 'N/A'}</td>
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

export default Fuel;