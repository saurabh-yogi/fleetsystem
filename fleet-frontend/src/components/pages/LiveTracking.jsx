import Navbar from '../Navbar';

function LiveTracking() {
  const vehicles = [
    { number: "RJ14 GA 1234", driver: "Ramesh Kumar", speed: "60 km/h", location: "Jaipur", fuel: "45%", status: "Running" },
    { number: "RJ14 GB 5678", driver: "Mahesh Yadav", speed: "45 km/h", location: "Delhi", fuel: "62%", status: "Running" },
    { number: "RJ14 GC 9876", driver: "Suresh Singh", speed: "0 km/h", location: "Ajmer", fuel: "23%", status: "Stopped" },
    { number: "RJ14 GD 4321", driver: "Vikram Meena", speed: "80 km/h", location: "Kota", fuel: "71%", status: "Running" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Live Tracking</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              Live
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Map Placeholder */}
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-200 h-96 flex items-center justify-center relative">
              <div className="text-center">
                <p className="text-gray-500 text-lg font-medium">🗺️ Live Map</p>
                <p className="text-gray-400 text-sm mt-1">Google Maps / Leaflet will be integrated here</p>
                <p className="text-gray-400 text-sm">Socket.io for real-time tracking</p>
              </div>

              {/* Vehicle Pins */}
              {vehicles.filter(v => v.status === 'Running').map((v, i) => (
                <div
                  key={v.number}
                  className="absolute bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                  style={{ top: `${20 + i * 20}%`, left: `${20 + i * 15}%` }}
                >
                  {v.number}
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Vehicles</h3>
            </div>
            <div className="flex flex-col gap-3 p-4">
              {vehicles.map((v) => (
                <div key={v.number} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{v.number}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${v.status === 'Running' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {v.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{v.driver}</p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    <span>📍 {v.location}</span>
                    <span>⚡ {v.speed}</span>
                    <span>⛽ {v.fuel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveTracking;