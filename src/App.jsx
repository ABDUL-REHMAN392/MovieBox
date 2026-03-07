import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from './UI/Layout';
import { Home, Search, SinglePage } from "./pages";
import AuthSuccess from './pages/AuthSuccess';
import AuthFailure from './pages/AuthFailure';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import PrivateRoute from './component/PrivateRoute';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserProfile, logout } from "./redux/authSlice";
import { fetchFavorites, resetFavorites } from "./redux/favoritesSlice";
import NotFound from "./pages/NotFound";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path=":type/:id" element={<SinglePage />} />
      <Route path="search" element={<Search />} />
      <Route path="auth/success" element={<AuthSuccess />} />
      <Route path="auth/failure" element={<AuthFailure />} />
      <Route path="favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
      <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

// ===== SESSION EXPIRED BANNER =====
function SessionExpiredBanner({ show, onDismiss, darkTheme }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div className={`flex items-center justify-between gap-3 px-5 py-3 text-sm ${
        darkTheme
          ? 'bg-[#111] border-b border-white/8 shadow-lg shadow-black/40'
          : 'bg-white border-b border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5">
          <FiAlertTriangle size={14} className="text-amber-400 shrink-0" />
          <span className={darkTheme ? 'text-gray-300' : 'text-gray-700'}>
            Your session has expired — please{' '}
            <span className="text-[#29e3ad] font-semibold">log in</span> again to continue.
          </span>
        </div>
        <button
          onClick={onDismiss}
          className={`p-1.5 rounded-lg transition-all cursor-pointer shrink-0 ${
            darkTheme ? 'hover:bg-white/8 text-gray-500 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'
          }`}
        >
          <FiX size={13} />
        </button>
      </div>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const { darkTheme } = useSelector(state => state.conditions);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchFavorites());
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    const handleForceLogout = () => {
      dispatch(logout());
      dispatch(resetFavorites());
      setSessionExpired(true);
      setTimeout(() => setSessionExpired(false), 7000);
    };
    window.addEventListener('auth:logout', handleForceLogout);
    return () => window.removeEventListener('auth:logout', handleForceLogout);
  }, [dispatch]);

  return (
    <>
      <SessionExpiredBanner
        show={sessionExpired}
        onDismiss={() => setSessionExpired(false)}
        darkTheme={darkTheme}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;