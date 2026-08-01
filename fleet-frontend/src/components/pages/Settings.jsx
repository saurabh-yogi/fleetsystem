import Navbar from '../Navbar';
import { User, Bell, Lock, Truck } from 'lucide-react';

function Settings() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>

        <div className="grid grid-cols-2 gap-4">

          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-blue-500" />
              <h3 className="font-bold text-gray-800">Profile Settings</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <input className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" defaultValue="Saurabh" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" defaultValue="saurabh@gmail.com" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Company Name</label>
                <input className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" defaultValue="Saurabh Transport" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 mt-2">
                Save Changes
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-blue-500" />
              <h3 className="font-bold text-gray-800">Notification Settings</h3>
            </div>
            <div className="flex flex-col gap-4">
              {[
                "Fuel Consumption Alerts",
                "Maintenance Due Alerts",
                "Geofence Breach Alerts",
                "Insurance Expiry Alerts",
                "Overspeed Alerts",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item}</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock size={20} className="text-blue-500" />
              <h3 className="font-bold text-gray-800">Security Settings</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-gray-500">Current Password</label>
                <input type="password" className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-sm text-gray-500">New Password</label>
                <input type="password" className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 mt-2">
                Update Password
              </button>
            </div>
          </div>

          {/* Fleet Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck size={20} className="text-blue-500" />
              <h3 className="font-bold text-gray-800">Fleet Settings</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm text-gray-500">Speed Limit (km/h)</label>
                <input className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" defaultValue="100" />
              </div>
              <div>
                <label className="text-sm text-gray-500">Fuel Alert Threshold (%)</label>
                <input className="w-full border border-gray-200 rounded-lg p-2 mt-1 text-sm outline-none focus:border-blue-400" defaultValue="20" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 mt-2">
                Save Settings
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;