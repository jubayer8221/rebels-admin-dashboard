import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const ProtectedRoute = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    // If not authenticated, redirect to login. Use 'replace' to clean history.
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the child routes (DashboardLayout and children)
    return <Outlet />;
};

export default ProtectedRoute;