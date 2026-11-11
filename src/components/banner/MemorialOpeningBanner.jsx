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
              {service.hall}, Kilpauk
            </span>
          </span>

          {/* Mobile compact details */}
          <span className={styles.mobileText}>
            <Calendar size={13} className={styles.calendarIcon} />
            <span className={styles.mobileDateText}>
              <strong>16th Nov</strong>, 6 PM
            </span>
            <span className={styles.mobileSeparator}>•</span>
            <span className={styles.mobileVenue}>Kilpauk</span>
          </span>
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
