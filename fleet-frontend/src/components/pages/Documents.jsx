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
  const [form, setForm] = useState({
    title: '', type: '', vehicle: '', driver: '', expiryDate: '', status: 'Valid'
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [docsRes, vehiclesRes, driversRes] = await Promise.all([
        fetch('https://fleet-backened.onrender.com/api/documents', { headers }),
        fetch('https://fleet-backened.onrender.com/api/vehicles', { headers }),
        fetch('https://fleet-backened.onrender.com/api/drivers', { headers }),
      ]);
      const [docsData, vehiclesData, driversData] = await Promise.all([
        docsRes.json(), vehiclesRes.json(), driversRes.json()
      ]);
      setDocuments(Array.isArray(docsData) ? docsData : []);
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
      setDrivers(Array.isArray(driversData) ? driversData : []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filtered = documents.filter(d =>
    d.title?.toLowerCase().includes(search.toLowerCase()) ||
    d.vehicle?.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    d.type?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (status) => {
    if (status === 'Valid') return 'bg-green-100 text-green-600';
    if (status === 'Expiring Soon') return 'bg-orange-100 text-orange-600';
    return 'bg-red-100 text-red-600';
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Documents</h2>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Document
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search by title, type, or vehicle..." className="outline-none text-sm w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Title", "Type", "Vehicle", "Driver", "Expiry Date", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-400">No documents found</td></tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm flex items-center gap-2"><FileText size={16} className="text-blue-500" />{d.title}</td>
                      <td className="px-4 py-3 text-sm">{d.type}</td>
                      <td className="px-4 py-3 text-sm">{d.vehicle?.vehicleNumber || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{d.driver?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{d.expiryDate ? new Date(d.expiryDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(d.status)}`}>{d.status}</span>
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl overflow-y-auto max-h-screen">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add Document</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-gray-600">Title</label>
                <input className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" placeholder="Insurance Certificate" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Type</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select Type</option>
                  {['Insurance', 'Registration', 'Permit', 'License', 'Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Vehicle</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNumber}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Driver</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })}>
                  <option value="">Select Driver</option>
                  {drivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Expiry Date</label>
                <input type="date" className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Valid', 'Expiring Soon', 'Expired'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2">Add Document</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;