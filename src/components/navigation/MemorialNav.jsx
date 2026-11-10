import { NavLink } from 'react-router-dom';
import styles from './MemorialNav.module.css';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Tributes', path: '/tributes' },
  { label: 'Eulogy', path: '/eulogy' },
  { label: 'Gallery', path: '/photos' },
  { label: 'Timeline', path: '/timeline' },
];

export default function MemorialNav() {
  return (
    <nav className={styles.nav} aria-label="Memorial navigation">
      <div className={styles.inner}>
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
