import { Outlet, useLocation } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer';

function Layout() {
  const { pathname } = useLocation();
  
  const hideLayout = pathname === '/privacy-policy' || pathname === '/404' || 
    !['/', '/search', '/favorites', '/profile', '/auth/success', '/auth/failure'].some(
      path => pathname === path || pathname.startsWith('/movie/') || pathname.startsWith('/tv/')
    );

  return (
    <div>
      {!hideLayout && <Header />}
      <Outlet />
      {!hideLayout && <Footer />}
    </div>
  )
}

export default Layout