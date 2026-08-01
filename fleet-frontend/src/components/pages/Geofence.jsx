import { useState } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, MapPin } from 'lucide-react';

function Geofence() {
  const [search, setSearch] = useState('');

  const geofences = [
    { id: "GF001", name: "Jaipur City Boundary", lat: "26.9124", lng: "75.7873", radius: "50 km", vehicles: 8, status: "Active" },
    { id: "GF002", name: "Delhi Depot", lat: "28.7041", lng: "77.1025", radius: "5 km", vehicles: 4, status: "Active" },
    { id: "GF003", name: "Ajmer Zone", lat: "26.4499", lng: "74.6399", radius: "20 km", vehicles: 2, status: "Inactive" },
    { id: "GF004", name: "Kota Industrial Area", lat: "25.2138", lng: "75.8648", radius: "10 km", vehicles: 3, status: "Active" },
    { id: "GF005", name: "Jodhpur Region", lat: "26.2389", lng: "73.0243", radius: "30 km", vehicles: 5, status: "Active" },
  ];

  const filtered = geofences.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Geofence</h2>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Geofence
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              className="outline-none text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Name", "Latitude", "Longitude", "Radius", "Vehicles", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <tr key={g.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{g.id}</td>
                  <td className="px-4 py-3 text-sm flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" />
                    {g.name}
                  </td>
                  <td className="px-4 py-3 text-sm">{g.lat}</td>
                  <td className="px-4 py-3 text-sm">{g.lng}</td>
                  <td className="px-4 py-3 text-sm">{g.radius}</td>
                  <td className="px-4 py-3 text-sm">{g.vehicles}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${g.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {g.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Geofence;