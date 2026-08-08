import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, X, MapPin } from 'lucide-react';

function Geofence() {
  const [search, setSearch] = useState('');
  const [geofences, setGeofences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '', latitude: '', longitude: '', radius: '', status: 'Active'
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchGeofences = async () => {
    try {
      const response = await fetch('https://fleet-backened.onrender.com/api/geofence', { headers });
      const data = await response.json();
      setGeofences(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  useEffect(() => { fetchGeofences(); }, []);

  const handleAdd = async () => {
    try {
      await fetch('https://fleet-backened.onrender.com/api/geofence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify({
          ...form,
          coordinates: { latitude: form.latitude, longitude: form.longitude }
        })
      });
      setShowModal(false);
      setForm({ name: '', latitude: '', longitude: '', radius: '', status: 'Active' });
      fetchGeofences();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filtered = geofences.filter(g =>
    g.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Geofence</h2>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Geofence
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search by name..." className="outline-none text-sm w-full" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Latitude", "Longitude", "Radius", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-400">No geofences found</td></tr>
                ) : (
                  filtered.map((g) => (
                    <tr key={g._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm flex items-center gap-2"><MapPin size={16} className="text-blue-500" />{g.name}</td>
                      <td className="px-4 py-3 text-sm">{g.coordinates?.latitude}</td>
                      <td className="px-4 py-3 text-sm">{g.coordinates?.longitude}</td>
                      <td className="px-4 py-3 text-sm">{g.radius} km</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${g.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {g.status}
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
              <h3 className="text-lg font-bold text-gray-800">Add Geofence</h3>
              <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Name', key: 'name', placeholder: 'Jaipur City Boundary' },
                { label: 'Latitude', key: 'latitude', placeholder: '26.9124' },
                { label: 'Longitude', key: 'longitude', placeholder: '75.7873' },
                { label: 'Radius (km)', key: 'radius', placeholder: '50' },
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
                  {['Active', 'Inactive'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-2">
                Add Geofence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Geofence;