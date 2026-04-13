import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css'


// Layout & Pages
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <DashboardLayout>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Main Admin Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />


            {/* 404 Page (Optional) */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center h-full">
                  <h1 className="text-4xl font-bold text-gray-800">404</h1>
                  <p className="text-gray-500">Page not found</p>
                </div>
              }
            />
          </Routes>
        </DashboardLayout>
      </Router>
    </Provider>
  );
}

export default App;

