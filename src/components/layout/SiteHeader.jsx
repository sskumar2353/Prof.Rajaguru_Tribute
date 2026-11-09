import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          {siteConfig.memorialName}
        </Link>
      </div>
    </header>
  );
}
