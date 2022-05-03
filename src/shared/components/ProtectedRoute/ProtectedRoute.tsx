import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthStore } from 'store/auth';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
