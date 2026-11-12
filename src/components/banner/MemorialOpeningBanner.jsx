import { useState } from 'react';
import { Calendar, MapPin, X, ArrowRight, Sparkles } from 'lucide-react';
import { memorial } from '../../data/memorial';
import styles from './MemorialOpeningBanner.module.css';

export default function MemorialOpeningBanner() {
  const [dismissed, setDismissed] = useState(false);
  const service = memorial.memorialService;

  if (dismissed || !service) return null;

  function scrollToSection(e) {
    e.preventDefault();
    const elem = document.getElementById('service-invitation');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <aside className={styles.banner} aria-label="Memorial Service Announcement">
      <div className={styles.inner}>
        <div className={styles.pill}>
          <Sparkles size={13} className={styles.sparkle} />
          <span>Memorial Service</span>
        </div>

        <div className={styles.textContainer}>
          {/* Desktop & Tablet details */}
          <span className={styles.desktopText}>
            <span className={styles.dateInfo}>
              <Calendar size={14} />
              <strong>{service.date}</strong> at <strong>{service.time}</strong>
            </span>
            <span className={styles.separator} aria-hidden="true">•</span>
            <span className={styles.venueInfo}>
              <MapPin size={14} />
              {service.hall}, {service.church}, Kilpauk
            </span>
          </span>

          {/* Mobile continuous ticker with full address and details */}
          <div className={styles.mobileTickerWrapper} onClick={scrollToSection}>
            <div className={styles.mobileTickerTrack}>
              <span className={styles.tickerItem}>
                🕊️ <strong>Memorial Service:</strong> {service.date} at {service.time} • 📍 {service.hall}, {service.church}, Kilpauk, Chennai &nbsp;•&nbsp;&nbsp;
              </span>
              <span className={styles.tickerItem} aria-hidden="true">
                🕊️ <strong>Memorial Service:</strong> {service.date} at {service.time} • 📍 {service.hall}, {service.church}, Kilpauk, Chennai &nbsp;•&nbsp;&nbsp;
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href="#service-invitation"
            onClick={scrollToSection}
            className={styles.viewLink}
          >
            <span className={styles.viewFull}>View Invitation</span>
            <span className={styles.viewShort}>View</span>
            <ArrowRight size={13} />
          </a>

          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
