import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, X } from 'lucide-react';

function Vehicles() {
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    vehicleNumber: '', type: '', brand: '', model: '', year: '', fuelType: '', status: 'Inactive'
  });

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://fleet-backened.onrender.com/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('https://fleet-backened.onrender.com/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      setForm({ vehicleNumber: '', type: '', brand: '', model: '', year: '', fuelType: '', status: 'Inactive' });
      fetchVehicles();
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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
                  <tr><td colSpan="7" className="px-4 py-8 text-center text-gray-400">No vehicles found</td></tr>
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

      {/* Add Vehicle Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add Vehicle</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Vehicle Number', key: 'vehicleNumber', placeholder: 'RJ14 GA 1234' },
                { label: 'Brand', key: 'brand', placeholder: 'Tata' },
                { label: 'Model', key: 'model', placeholder: 'Prima' },
                { label: 'Year', key: 'year', placeholder: '2022' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm text-gray-600">{field.label}</label>
                  <input
                    className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400"
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="text-sm text-gray-600">Type</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select Type</option>
                  {['Truck', 'Bus', 'Car', 'Van', 'Bike', 'Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Fuel Type</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}>
                  <option value="">Select Fuel</option>
                  {['Petrol', 'Diesel', 'CNG', 'Electric'].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Running', 'Stopped', 'In Service', 'Inactive'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2">
                Add Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicles;