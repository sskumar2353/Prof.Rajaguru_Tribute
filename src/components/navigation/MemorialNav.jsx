import { useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './MemorialNav.module.css';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Tributes', path: '/tributes' },
  { label: 'Eulogy', path: '/eulogy' },
  { label: 'Images', path: '/photos' },
  { label: 'Videos', path: '/videos' },
  { label: 'Timeline', path: '/timeline' },
];

export default function MemorialNav() {
  const location = useLocation();
  const navContainerRef = useRef(null);

  useEffect(() => {
    if (navContainerRef.current) {
      const activeEl = navContainerRef.current.querySelector(`.${styles.active}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [location.pathname]);

  return (
    <nav className={styles.nav} aria-label="Memorial navigation">
      <div className={styles.inner} ref={navContainerRef}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
