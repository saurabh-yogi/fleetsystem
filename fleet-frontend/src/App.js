import Sidebar from './components/sidebar';
import Dashboard from './components/pages/Dashboard';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;