import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.accent} aria-hidden="true">†</span>
          <strong>{siteConfig.memorialName}</strong>
          <small>{siteConfig.tagline}</small>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/tributes">Tributes</Link>
          <Link to="/eulogy">Eulogy</Link>
          <Link to="/photos">Photos</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/timeline">Timeline</Link>
        </nav>
      </div>
      <div className={styles.bottom}>
        <span>In Loving Memory of Prof. Rajaguru ({siteConfig.memorialDates})</span>
      </div>
    </footer>
  );
}
