import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { DesignSettingsProvider } from './context/DesignSettingsContext';
import { DesignSettingsPanel } from './components/DesignSettingsPanel';

// Layout & Pages
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import { Profile } from './pages/Profile';
import Login from './pages/LogIn';
import ProtectedRoute from './features/auth/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <DesignSettingsProvider>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/login" element={<Login />} />

          {/* --- PRIVATE ROUTES (Gatekept by ProtectedRoute) --- */}
          <Route element={<ProtectedRoute />}>
            {/* Wrap all internal pages with the DashboardLayout */}
            <Route
              element={
                <DashboardLayout>
                  <Outlet />
                </DashboardLayout>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <DesignSettingsPanel />
            </Route>

          </Route>

          {/* --- NAVIGATION HELPERS --- */}
          {/* Default root redirects to dashboard (which triggers ProtectedRoute) */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                <h1 className="text-6xl font-black text-gray-200">404</h1>
                <p className="text-gray-500 font-medium">This page doesn't exist.</p>
              </div>
            }
          />
        </Routes>

        {/* Design Settings Panel - Always visible */}
      </DesignSettingsProvider>
    </Provider>
  );
}

export default App;