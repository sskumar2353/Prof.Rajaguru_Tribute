import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span>♥</span>
          {siteConfig.brand}
          <small>A place for good memories</small>
        </div>
        <div className={styles.links}>
          <Link to="/tributes">Tributes</Link>
        </div>
      </div>
      <div className={styles.bottom}>In Loving Memory of Prof. Rajaguru</div>
    </footer>
  );
}
