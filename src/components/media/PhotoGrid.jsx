import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import styles from './PhotoGrid.module.css';

export default function PhotoGrid({ photos }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const items = Array.isArray(photos) ? photos : [];

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = useCallback(() => {
    if (items.length === 0) return;
    setSelectedIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  }, [items.length]);

  const nextImage = useCallback(() => {
    if (items.length === 0) return;
    setSelectedIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, prevImage, nextImage]);

  const active = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div className={styles.grid}>
        {items.map((photo, index) => (
          <button
            key={photo.src || index}
            type="button"
            className={`${styles.item} ${index === 0 ? styles.featured : ''}`}
            onClick={() => openLightbox(index)}
            aria-label={`View photo: ${photo.caption || photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt || photo.caption || 'Memorial photo'} loading="lazy" />
            <span className={styles.caption}>
              <em>{photo.caption}</em>
              <Maximize2 size={15} />
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.lightboxBox} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={closeLightbox} aria-label="Close">
              <X size={20} />
            </button>
            {items.length > 1 && (
              <>
                <button className={`${styles.nav} ${styles.prev}`} onClick={prevImage} aria-label="Previous">
                  <ChevronLeft size={24} />
                </button>
                <button className={`${styles.nav} ${styles.next}`} onClick={nextImage} aria-label="Next">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            <img src={active.src} alt={active.alt || active.caption} className={styles.modalImg} />
            <p className={styles.modalCaption}>{active.caption}</p>
          </div>
        </div>
      )}
    </>
  );
}
