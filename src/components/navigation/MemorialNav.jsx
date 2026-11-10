import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './MemorialNav.module.css';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Tributes', path: '/tributes' },
  { label: 'Eulogy', path: '/eulogy' },
  { label: 'Gallery', path: '/photos' },
  { label: 'Timeline', path: '/timeline' },
];

export default function MemorialNav() {
  const location = useLocation();

  return (
    <nav className={styles.nav} aria-label="Memorial navigation">
      <div className={styles.inner}>
        {links.map((link) => {
          const isActive =
            link.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.path);

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive: linkActive }) =>
                linkActive ? styles.active : styles.link
              }
            >
              <span className={styles.label}>{link.label}</span>
              {isActive && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className={styles.activeBar}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
