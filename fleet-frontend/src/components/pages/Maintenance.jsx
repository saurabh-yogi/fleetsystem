import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, X } from 'lucide-react';

function Maintenance() {
  const [search, setSearch] = useState('');
  const [records, setRecords] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ vehicle: '', type: '', description: '', cost: '', date: '', nextServiceDate: '', status: 'Scheduled', workshop: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [maintRes, vehiclesRes] = await Promise.all([
        fetch('https://fleet-backened.onrender.com/api/maintenance', { headers }),
        fetch('https://fleet-backened.onrender.com/api/vehicles', { headers }),
      ]);
      const [maintData, vehiclesData] = await Promise.all([maintRes.json(), vehiclesRes.json()]);
      setRecords(Array.isArray(maintData) ? maintData : []);
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
    } catch (error) { console.error('Error:', error); }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchAll(); }, []);

  const handleAdd = async () => {
    try {
      await fetch('https://fleet-backened.onrender.com/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      setForm({ vehicle: '', type: '', description: '', cost: '', date: '', nextServiceDate: '', status: 'Scheduled', workshop: '' });
      fetchAll();
    } catch (error) { console.error('Error:', error); }
  };

  const filtered = records.filter(r =>
    r.vehicle?.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    r.type?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    if (status === 'Completed') return 'bg-green-100 text-green-700';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-700';
    return 'bg-orange-100 text-orange-700';
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Maintenance</h2>
            <p className="text-gray-500 text-sm">{records.length} total records</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-200">
            <Plus size={18} /> Add Record
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search by vehicle or type..." className="outline-none text-sm w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Vehicle", "Type", "Cost", "Date", "Next Service", "Workshop", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="7" className="px-5 py-12 text-center text-gray-400">No maintenance records found</td></tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r._id} className="border-t border-gray-50 hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{r.vehicle?.vehicleNumber || 'N/A'}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{r.type}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-red-500">₹{r.cost}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{new Date(r.date).toLocaleDateString()}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{r.nextServiceDate ? new Date(r.nextServiceDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{r.workshop || 'N/A'}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor(r.status)}`}>{r.status}</span>
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add Maintenance Record</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Vehicle</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNumber}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select Type</option>
                  {['Oil Change', 'Tyre Change', 'Brake Service', 'Engine Repair', 'General Service', 'Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              {[
                { label: 'Description', key: 'description', placeholder: 'Engine oil changed' },
                { label: 'Cost (₹)', key: 'cost', placeholder: '2500' },
                { label: 'Date', key: 'date', type: 'date' },
                { label: 'Next Service Date', key: 'nextServiceDate', type: 'date' },
                { label: 'Workshop', key: 'workshop', placeholder: 'Tata Motors Jaipur' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
                  <input type={field.type || 'text'} className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" placeholder={field.placeholder} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Scheduled', 'In Progress', 'Completed'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold mt-2">Add Record</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Maintenance;