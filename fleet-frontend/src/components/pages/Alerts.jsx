import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Fuel, Wrench, MapPin, FileText, AlertTriangle } from 'lucide-react';

function Alerts() {
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://fleet-backened.onrender.com/api/alerts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
      setLoading(false);
    };
    fetchAlerts();
  }, []);

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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Alerts</h2>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search by vehicle or type..."
              className="outline-none text-sm w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;