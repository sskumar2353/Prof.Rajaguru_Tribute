import { useState } from 'react';
import { Calendar, Clock, MapPin, Maximize2, ExternalLink, X } from 'lucide-react';
import { memorial } from '../../data/memorial';
import styles from './MemorialServiceSection.module.css';

export default function MemorialServiceSection() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const service = memorial.memorialService;

  if (!service) return null;

  return (
    <>
      <section id="service-invitation" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Memorial Service</span>
            <h2 className={styles.title}>You are warmly invited</h2>
            <p className={styles.verse}>{service.verse}</p>
          </div>

          <div className={styles.cardWrapper}>
            {/* Left: Interactive Invitation Flyer */}
            <div className={styles.flyerCol}>
              <button
                type="button"
                className={styles.flyerButton}
                onClick={() => setIsLightboxOpen(true)}
                aria-label="View full memorial service invitation flyer"
              >
                <img
                  src={service.flyer}
                  alt="Memorial service invitation flyer for Late Prof. Rajaguru"
                  className={styles.flyerImage}
                  loading="lazy"
                />
                <div className={styles.expandOverlay}>
                  <Maximize2 size={24} />
                  <span>Tap to view</span>
                </div>
              </button>
            </div>

            {/* Right: Clean, High-Legibility Details */}
            <div className={styles.detailsCol}>
              <div className={styles.detailsCard}>
                <span className={styles.cardBadge}>Service Details</span>
                <h3 className={styles.honoreeTitle}>
                  In Loving Memory of
                  <br />
                  <strong>Late PROF. RAJAGURU</strong>
                </h3>
                <p className={styles.years}>08.10.1945 – 15.11.2025</p>

                <div className={styles.metaList}>
                  <div className={styles.metaItem}>
                    <div className={styles.metaIcon}>
                      <Calendar size={20} />
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Date</span>
                      <strong className={styles.metaValue}>{service.date}</strong>
                    </div>
                  </div>

                  <div className={styles.metaItem}>
                    <div className={styles.metaIcon}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Time</span>
                      <strong className={styles.metaValue}>{service.time}</strong>
                    </div>
                  </div>

                  <div className={styles.metaItem}>
                    <div className={styles.metaIcon}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className={styles.metaLabel}>Venue & Address</span>
                      <strong className={styles.metaValue}>{service.hall}</strong>
                      <span className={styles.addressLine}>{service.church}</span>
                      <span className={styles.addressLine}>{service.address}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className={styles.primaryBtn}
                  >
                    <Maximize2 size={16} /> View
                  </button>
                  <a
                    href={service.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.secondaryBtn}
                  >
                    <ExternalLink size={16} /> Navigate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen High-Resolution Lightbox for Flyer */}
      {isLightboxOpen && (
        <div
          className={styles.lightbox}
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Invitation flyer modal"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            <img
              src={service.flyer}
              alt="High resolution memorial service invitation flyer"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
}
