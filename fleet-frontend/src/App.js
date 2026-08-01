import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Dashboard from './components/pages/Dashboard';
import Vehicles from './components/pages/Vehicle';
import Drivers from './components/pages/Drivers';
import Trips from './components/pages/Trips';
import Fuel from './components/pages/Fuel';
import Maintenance from './components/pages/Maintenance';
import Alerts from './components/pages/Alerts';
import Reports from './components/pages/Reports';
import LiveTracking from './components/pages/LiveTracking';
import Geofence from './components/pages/Geofence';
import Documents from './components/pages/Documents';
import Settings from './components/pages/Settings';
import Login from './components/pages/Login';
import ProtectedRoute from './Protectedroutes';
import Register from './components/pages/Register';

function Layout() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="flex">
      {!isLogin && <Sidebar />}
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/vehicles" element={<ProtectedRoute><Vehicles /></ProtectedRoute>} />
<Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
<Route path="/trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
<Route path="/fuel" element={<ProtectedRoute><Fuel /></ProtectedRoute>} />
<Route path="/maintenance" element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />
<Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
<Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
<Route path="/tracking" element={<ProtectedRoute><LiveTracking /></ProtectedRoute>} />
<Route path="/geofence" element={<ProtectedRoute><Geofence /></ProtectedRoute>} />
<Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
<Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
<Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;