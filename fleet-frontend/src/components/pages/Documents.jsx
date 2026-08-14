import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, X, FileText } from 'lucide-react';

function Documents() {
  const [search, setSearch] = useState('');
  const [documents, setDocuments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', type: '', vehicle: '', driver: '', expiryDate: '', status: 'Valid' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [docsRes, vehiclesRes, driversRes] = await Promise.all([
        fetch('https://fleet-backened.onrender.com/api/documents', { headers }),
        fetch('https://fleet-backened.onrender.com/api/vehicles', { headers }),
        fetch('https://fleet-backened.onrender.com/api/drivers', { headers }),
      ]);
      const [docsData, vehiclesData, driversData] = await Promise.all([docsRes.json(), vehiclesRes.json(), driversRes.json()]);
      setDocuments(Array.isArray(docsData) ? docsData : []);
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
      setDrivers(Array.isArray(driversData) ? driversData : []);
    } catch (error) { console.error('Error:', error); }
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchAll(); }, []);

  const handleAdd = async () => {
    try {
      await fetch('https://fleet-backened.onrender.com/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      setForm({ title: '', type: '', vehicle: '', driver: '', expiryDate: '', status: 'Valid' });
      fetchAll();
    } catch (error) { console.error('Error:', error); }
  };

  const filtered = documents.filter(d =>
    d.title?.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicle?.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    d.type?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s) => s === 'Valid' ? 'bg-green-100 text-green-700' : s === 'Expiring Soon' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700';

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
            <p className="text-gray-500 text-sm">{documents.length} total documents</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-200">
            <Plus size={18} /> Add Document
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search by title, type, or vehicle..." className="outline-none text-sm w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Title", "Type", "Vehicle", "Driver", "Expiry Date", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="6" className="px-5 py-12 text-center text-gray-400">No documents found</td></tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d._id} className="border-t border-gray-50 hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-800 flex items-center gap-2"><FileText size={15} className="text-blue-500" />{d.title}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{d.type}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{d.vehicle?.vehicleNumber || 'N/A'}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{d.driver?.name || 'N/A'}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-600">{d.expiryDate ? new Date(d.expiryDate).toLocaleDateString() : 'N/A'}</td>
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add Document</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                <input className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" placeholder="Insurance Certificate" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select Type</option>
                  {['Insurance', 'Registration', 'Permit', 'License', 'Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Vehicle</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNumber}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Driver</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })}>
                  <option value="">Select Driver</option>
                  {drivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Expiry Date</label>
                <input type="date" className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                <select className="w-full border-2 border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-blue-500" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold mt-2 shadow-lg shadow-blue-200">Add Document</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;