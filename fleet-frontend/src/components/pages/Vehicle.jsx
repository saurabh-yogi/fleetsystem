import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, X } from 'lucide-react';

function Vehicles() {
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ vehicleNumber: '', type: '', brand: '', model: '', year: '', fuelType: '', status: 'Inactive' });

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://fleet-backened.onrender.com/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setVehicles(Array.isArray(data) ? data : []);
    } catch (error) { console.error('Error:', error); }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } catch (error) { console.error('Error:', error); }
  };

  const filtered = vehicles.filter(v =>
    v.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    v.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    if (status === 'Running') return 'bg-green-100 text-green-700';
    if (status === 'Stopped') return 'bg-red-100 text-red-700';
    return 'bg-orange-100 text-orange-700';
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vehicles</h2>
            <p className="text-gray-500 text-sm">{vehicles.length} total vehicles</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-200">
            <Plus size={18} /> Add Vehicle
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search by vehicle no. or brand..." className="outline-none text-sm w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Vehicle No.", "Type", "Brand", "Model", "Year", "Fuel", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="px-5 py-12 text-center text-gray-400">No vehicles found</td></tr>
                ) : (
                  filtered.map((v) => (
                    <tr key={v._id} className="border-t border-gray-50 hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{v.vehicleNumber}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{v.type}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{v.brand}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{v.model}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{v.year}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{v.fuelType}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor(v.status)}`}>{v.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add Vehicle</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Vehicle Number', key: 'vehicleNumber', placeholder: 'RJ14 GA 1234' },
                { label: 'Brand', key: 'brand', placeholder: 'Tata' },
                { label: 'Model', key: 'model', placeholder: 'Prima' },
                { label: 'Year', key: 'year', placeholder: '2022' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
                  <input className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500 transition-colors" placeholder={field.placeholder} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select Type</option>
                  {['Truck', 'Bus', 'Car', 'Van', 'Bike', 'Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Fuel Type</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.fuelType} onChange={(e) => setForm({ ...form, fuelType: e.target.value })}>
                  <option value="">Select Fuel</option>
                  {['Petrol', 'Diesel', 'CNG', 'Electric'].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Running', 'Stopped', 'In Service', 'Inactive'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold mt-2 shadow-lg shadow-blue-200">Add Vehicle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vehicles;