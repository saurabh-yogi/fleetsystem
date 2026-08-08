import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Fuel, Wrench, MapPin, FileText, AlertTriangle, Plus, X } from 'lucide-react';

function Alerts() {
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: '', message: '', severity: 'Medium', status: 'Unread', vehicle: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [alertsRes, vehiclesRes] = await Promise.all([
        fetch('https://fleet-backened.onrender.com/api/alerts', { headers }),
        fetch('https://fleet-backened.onrender.com/api/vehicles', { headers }),
      ]);
      const [alertsData, vehiclesData] = await Promise.all([
        alertsRes.json(), vehiclesRes.json()
      ]);
      setAlerts(Array.isArray(alertsData) ? alertsData : []);
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAdd = async () => {
    try {
      await fetch('https://fleet-backened.onrender.com/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      setForm({ type: '', message: '', severity: 'Medium', status: 'Unread', vehicle: '' });
      fetchAll();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filtered = alerts.filter(a =>
    a.vehicle?.vehicleNumber?.toLowerCase().includes(search.toLowerCase()) ||
    a.type?.toLowerCase().includes(search.toLowerCase())
  );

  const severityColor = (severity) => {
    if (severity === 'High') return 'bg-red-100 text-red-600';
    return 'bg-orange-100 text-orange-600';
  };

  const statusColor = (status) => {
    if (status === 'Resolved') return 'bg-green-100 text-green-600';
    if (status === 'Read') return 'bg-gray-100 text-gray-600';
    return 'bg-blue-100 text-blue-600';
  };

  const getIcon = (type) => {
    if (type?.includes('Fuel')) return Fuel;
    if (type?.includes('Maintenance')) return Wrench;
    if (type?.includes('Geofence')) return MapPin;
    if (type?.includes('Insurance') || type?.includes('License')) return FileText;
    return AlertTriangle;
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Alerts</h2>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Alert
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100">
            <input type="text" placeholder="Search by vehicle or type..." className="outline-none text-sm w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400">No alerts found</div>
          ) : (
            <div className="flex flex-col gap-3 p-4">
              {filtered.map((alert) => {
                const Icon = getIcon(alert.type);
                return (
                  <div key={alert._id} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                    <div className="bg-red-50 p-2 rounded-lg">
                      <Icon size={20} className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-800">{alert.type}</p>
                        <span className="text-xs text-gray-400">{new Date(alert.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.vehicle?.vehicleNumber || 'N/A'}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityColor(alert.severity)}`}>{alert.severity}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(alert.status)}`}>{alert.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Add Alert</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-gray-600">Vehicle</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.vehicle} onChange={(e) => setForm({ ...form, vehicle: e.target.value })}>
                  <option value="">Select Vehicle</option>
                  {vehicles.map(v => <option key={v._id} value={v._id}>{v.vehicleNumber}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Type</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="">Select Type</option>
                  {['High Fuel Consumption', 'Maintenance Due', 'Geofence Breach', 'Insurance Expiring', 'License Expiring', 'Other'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Message</label>
                <input className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" placeholder="Alert message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Severity</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none" value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>
                  {['Low', 'Medium', 'High'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2">Add Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;