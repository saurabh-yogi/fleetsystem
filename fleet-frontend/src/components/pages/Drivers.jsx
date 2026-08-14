import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, X, Users } from 'lucide-react';

function Drivers() {
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', licenseNumber: '', status: 'Active', address: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchDrivers = async () => {
    try {
      const response = await fetch('https://fleet-backened.onrender.com/api/drivers', { headers });
      const data = await response.json();
      setDrivers(Array.isArray(data) ? data : []);
    } catch (error) { console.error('Error:', error); }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchDrivers(); }, []);

  const handleAdd = async () => {
    try {
      await fetch('https://fleet-backened.onrender.com/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      setForm({ name: '', phone: '', email: '', licenseNumber: '', status: 'Active', address: '' });
      fetchDrivers();
    } catch (error) { console.error('Error:', error); }
  };

  const filtered = drivers.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.phone?.includes(search)
  );

  const statusColor = (status) => {
    if (status === 'On Trip') return 'bg-blue-100 text-blue-700';
    if (status === 'Active') return 'bg-green-100 text-green-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Drivers</h2>
            <p className="text-gray-500 text-sm">{drivers.length} total drivers</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-200">
            <Plus size={18} /> Add Driver
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search by name or phone..." className="outline-none text-sm w-full text-gray-700" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Phone", "Email", "License", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="5" className="px-5 py-12 text-center text-gray-400">No drivers found</td></tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d._id} className="border-t border-gray-50 hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">{d.name}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{d.phone}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{d.email}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{d.licenseNumber}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColor(d.status)}`}>{d.status}</span>
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
              <h3 className="text-lg font-bold text-gray-900">Add Driver</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Ramesh Kumar' },
                { label: 'Phone', key: 'phone', placeholder: '9876543210' },
                { label: 'Email', key: 'email', placeholder: 'ramesh@gmail.com' },
                { label: 'License Number', key: 'licenseNumber', placeholder: 'RJ1420240007' },
                { label: 'Address', key: 'address', placeholder: 'Jaipur, Rajasthan' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
                  <input className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500 transition-colors" placeholder={field.placeholder} value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Active', 'Inactive', 'On Trip'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold mt-2 shadow-lg shadow-blue-200">Add Driver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drivers;