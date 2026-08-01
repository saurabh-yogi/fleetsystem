import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Plus, Search, FileText } from 'lucide-react';

function Documents() {
  const [search, setSearch] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://fleet-backened.onrender.com/api/documents', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
      setLoading(false);
    };
    fetchDocuments();
  }, []);

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
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={18} /> Add Document
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, type, or vehicle..."
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
                  {["Title", "Type", "Vehicle", "Driver", "Expiry Date", "Status"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-sm text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-400">No documents found</td>
                  </tr>
                ) : (
                  filtered.map((d) => (
                    <tr key={d._id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" />
                        {d.title}
                      </td>
                      <td className="px-4 py-3 text-sm">{d.type}</td>
                      <td className="px-4 py-3 text-sm">{d.vehicle?.vehicleNumber || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{d.driver?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">{d.expiryDate ? new Date(d.expiryDate).toLocaleDateString() : 'N/A'}</td>
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
    </div>
  );
}

export default Documents;