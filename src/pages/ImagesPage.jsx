import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { memorial } from '../data/memorial';
import styles from './ImagesPage.module.css';

const swipeThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function ImagesPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const photos = Array.isArray(memorial.photos) ? memorial.photos : [];

  const openLightbox = (index) => {
    setDirection(0);
    setSelectedIndex(index);
  };

  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = useCallback(() => {
    if (photos.length === 0) return;
    setDirection(-1);
    setSelectedIndex((current) => (current === 0 ? photos.length - 1 : current - 1));
  }, [photos.length]);

  const nextImage = useCallback(() => {
    if (photos.length === 0) return;
    setDirection(1);
    setSelectedIndex((current) => (current === photos.length - 1 ? 0 : current + 1));
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    }
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, prevImage, nextImage]);

  const activePhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link to="/photos" className={styles.back}>
          <ArrowLeft size={17} />
          Back to gallery
        </Link>

        <header className={styles.header}>
          <span>Memories</span>
          <h1>Photographs</h1>
          <p>
            Moments and memories shared by family, friends, and loved ones.
          </p>
        </header>

        <motion.div
          className={styles.grid}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {photos.map((photo, index) => (
            <motion.figure
              className={styles.photo}
              key={photo.id || photo.src || photo.url || index}
              onClick={() => openLightbox(index)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileTap={{ scale: 0.98 }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={photo.src || photo.url}
                alt={photo.alt || photo.caption || 'Memory'}
                loading="lazy"
              />

              {(photo.caption || photo.title) && (
                <figcaption>
                  {photo.caption || photo.title}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </motion.div>

        {photos.length === 0 && (
          <div className={styles.empty}>
            No photographs have been added yet.
          </div>
        )}
      </div>

      {/* Mobile Swipe Lightbox */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className={styles.lightbox}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            >
              <button
                className={styles.closeBtn}
                onClick={closeLightbox}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {photos.length > 1 && (
                <>
                  <button
                    className={`${styles.navBtn} ${styles.prevBtn}`}
                    onClick={prevImage}
                    aria-label="Previous"
                  >
                    <ChevronLeft size={26} />
                  </button>
                  <button
                    className={`${styles.navBtn} ${styles.nextBtn}`}
                    onClick={nextImage}
                    aria-label="Next"
                  >
                    <ChevronRight size={26} />
                  </button>
                </>
              )}

              <div className={styles.lightboxImageWrapper}>
                <motion.div
                  key={selectedIndex}
                  className={styles.swipeContainer}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeThreshold) nextImage();
                    else if (swipe > swipeThreshold) prevImage();
                  }}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={activePhoto.src || activePhoto.url}
                    alt={activePhoto.alt || activePhoto.caption}
                    className={styles.lightboxImage}
                    draggable={false}
                  />
                </motion.div>
              </div>

              <div className={styles.lightboxFooter}>
                <p>{activePhoto.caption || activePhoto.title}</p>
                <span>
                  {selectedIndex + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
