import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, X } from 'lucide-react';

function Drivers() {
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', licenseNumber: '', status: 'Active', address: ''
  });

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://fleet-backened.onrender.com/api/drivers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setDrivers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('https://fleet-backened.onrender.com/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      setForm({ name: '', phone: '', email: '', licenseNumber: '', status: 'Active', address: '' });
      fetchDrivers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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
                  {["Name", "Phone", "Email", "License", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-400">No drivers found</td></tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{d.name}</td>
                      <td className="px-4 py-3 text-sm">{d.phone}</td>
                      <td className="px-4 py-3 text-sm">{d.email}</td>
                      <td className="px-4 py-3 text-sm">{d.licenseNumber}</td>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add Driver</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Ramesh Kumar' },
                { label: 'Phone', key: 'phone', placeholder: '9876543210' },
                { label: 'Email', key: 'email', placeholder: 'ramesh@gmail.com' },
                { label: 'License Number', key: 'licenseNumber', placeholder: 'RJ1420240007' },
                { label: 'Address', key: 'address', placeholder: 'Jaipur, Rajasthan' },
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
                <label className="text-sm text-gray-600">Status</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Active', 'Inactive', 'On Trip'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2">
                Add Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Drivers;