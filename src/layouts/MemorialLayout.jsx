import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from '../components/layout/SiteHeader';
import MemorialHero from '../components/hero/MemorialHero';
import MemorialNav from '../components/navigation/MemorialNav';
import SiteFooter from '../components/layout/SiteFooter';
import ScrollToTop from '../components/common/ScrollToTop';

export default function MemorialLayout() {
  const location = useLocation();
  const showHero = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      {showHero && <MemorialHero />}
      <MemorialNav />
      <main><Outlet /></main>
      <SiteFooter />
    </>
  );
}
