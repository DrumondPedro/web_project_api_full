import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { LoginContext } from '../../contexts/LoginContext';

function ProtectedRoute({ children, publicRoute = false }) {
  const location = useLocation();
  const from = location.state?.from || '/';

  const { isLoggedIn } = useContext(LoginContext);

  if (publicRoute && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!publicRoute && !isLoggedIn) {
    return <Navigate to={'/signin'} state={{ from: location.pathname }} />;
  }
  return children;
}

export default ProtectedRoute;
