import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLogin } from '../redux/conditionSlice';
import { useEffect } from 'react';
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const { darkTheme } = useSelector(state => state.conditions);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      dispatch(showLogin());
    }
  }, [isAuthenticated, loading, dispatch]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkTheme ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="relative w-16 h-16">
          <div className={`absolute inset-0 border-4 rounded-full ${darkTheme ? 'border-gray-800' : 'border-gray-200'}`}></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#29e3ad] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;