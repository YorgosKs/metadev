import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from './axios/axios';
import Cookies from 'universal-cookie';

export default function Protected({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const location = useLocation();
  const cookies = new Cookies();
  const cookie = cookies.get('auth-token');
  useEffect(() => {
    const validateToken = async () => {
      if (!cookie) {
        setIsAllowed(false);
        return;
      }

      try {
        const response = await axios.get('/users/check', {
          headers: {
            'auth-token': cookie,
          },
        });
        setIsAllowed(response.data);
      } catch (error) {
        setIsAllowed(false);
      }
    };

    validateToken();
  }, [cookie]);

  const publicRoutes = ['/login', '/register', '/forgot-password', '/'];
  const shouldRedirectToDashboard =
    isAllowed && publicRoutes.includes(location.pathname);

  if (shouldRedirectToDashboard) {
    return <Navigate to='/dashboard' replace />;
  }

  const protectedRoutes = ['/dashboard', '/employees', '/open-positions'];
  const shouldRedirectToLogin =
    !isAllowed && protectedRoutes.includes(location.pathname);

  if (shouldRedirectToLogin) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
