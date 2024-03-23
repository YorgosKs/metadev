import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from './axios/axios';

export default function Protected({ cookie, children }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const location = useLocation();
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
        console.log(error);
        setIsAllowed(false);
      }
    };

    validateToken();
  }, [cookie]);

  if (isAllowed === null) {
    return <div>Loading...</div>; // Loading indicator
  }

  const shouldRedirectToDashboard =
    isAllowed &&
    (location.pathname === '/login' ||
      location.pathname === '/register' ||
      location.pathname === '/forgot-password' ||
      location.pathname === '/');

  if (shouldRedirectToDashboard) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
}
