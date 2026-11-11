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
          <Sparkles size={14} className={styles.sparkle} />
          <span>Memorial Service</span>
        </div>

        <div className={styles.textContainer}>
          <span className={styles.dateInfo}>
            <Calendar size={14} />
            <strong>{service.date}</strong> at <strong>{service.time}</strong>
          </span>
          <span className={styles.separator} aria-hidden="true">•</span>
          <span className={styles.venueInfo}>
            <MapPin size={14} />
            {service.hall}, {service.church}, Kilpauk
          </span>
        </div>

        <a
          href="#service-invitation"
          onClick={scrollToSection}
          className={styles.viewLink}
        >
          View Invitation <ArrowRight size={14} />
        </a>

        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
