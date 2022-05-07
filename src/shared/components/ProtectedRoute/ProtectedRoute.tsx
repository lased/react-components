import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAuthStore } from 'store/auth';
import { useAxios } from 'shared/hooks';

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, login } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const query = useAxios('/delay/3');

  useEffect(() => {
    if (!isLoggedIn) {
      query.query();
    } else {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (query.isError) {
      navigate('/', { replace: true });
      setIsLoading(false);
    }
    if (query.isSuccess) {
      login('token');
      setIsLoading(false);
    }
  }, [query.isSuccess, query.isError]);

  if (isLoading) {
    return <strong>Loading...</strong>;
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectedRoute;
