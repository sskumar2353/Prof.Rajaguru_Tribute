import { useState, useEffect, useCallback } from 'react';
import { Images, Maximize2, X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import PageIntro from '../components/common/PageIntro';
import { getMemorialPhotos } from '../services/photoService';
import styles from './PhotosPage.module.css';

const INITIAL_BATCH = 48;
const BATCH_INCREMENT = 48;

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [brokenImageIds, setBrokenImageIds] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);

  const loadPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getMemorialPhotos();
      setPhotos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError('Unable to load photographs at this time.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  function handleImageError(id) {
    setBrokenImageIds((prev) => new Set(prev).add(id));
  }

  // All valid photographs preserved within the application
  const validPhotos = photos.filter((p) => !brokenImageIds.has(p.id));
  const displayedPhotos = validPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < validPhotos.length;

  function loadMore() {
    setVisibleCount((prev) => Math.min(prev + BATCH_INCREMENT, validPhotos.length));
  }

  function showAll() {
    setVisibleCount(validPhotos.length);
  }

  // Lightbox navigation (allows cycling through all loaded valid photos)
  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const prevImage = useCallback(() => {
    if (validPhotos.length === 0) return;
    setSelectedIndex((current) =>
      current === 0 ? validPhotos.length - 1 : current - 1
    );
  }, [validPhotos.length]);

  const nextImage = useCallback(() => {
    if (validPhotos.length === 0) return;
    setSelectedIndex((current) =>
      current === validPhotos.length - 1 ? 0 : current + 1
    );
  }, [validPhotos.length]);

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

  const activePhoto = selectedIndex !== null ? validPhotos[selectedIndex] : null;

  return (
    <>
      <PageIntro
        eyebrow="Photo Archive"
        title="Photographs"
        text="A collection of photographs preserving the moments, fellowship, and quiet joy that remain part of Prof. Rajaguru’s story."
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.headingRow}>
            <div>
              <span className={styles.eyebrow}>In remembrance</span>
              <h2>Moments we cherish</h2>
            </div>
            {validPhotos.length > 0 && (
              <span className={styles.photoBadge}>
                {validPhotos.length} Photographs
              </span>
            )}
          </div>

          {loading && (
            <div className={styles.loadingGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.skeletonCard} ${i === 0 ? styles.skeletonFeatured : ''}`}
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className={styles.errorBox}>
              <p>{error}</p>
              <button onClick={loadPhotos} className={styles.retryButton}>
                <RefreshCw size={15} /> Try again
              </button>
            </div>
          )}

          {!loading && !error && validPhotos.length === 0 && (
            <div className={styles.empty}>
              <Images size={34} />
              <h3>Photographs are being prepared</h3>
              <p>The memorial photo archive is currently being updated.</p>
            </div>
          )}

          {!loading && !error && validPhotos.length > 0 && (
            <>
              <div className={styles.grid}>
                {displayedPhotos.map((photo, index) => {
                  const isFeatured = index === 0;
                  const isWide = index === 4;

                  return (
                    <button
                      key={photo.id || index}
                      type="button"
                      onClick={() => openLightbox(index)}
                      className={`${styles.card} ${isFeatured ? styles.featured : ''} ${
                        isWide ? styles.wide : ''
                      }`}
                      aria-label={`View photograph ${index + 1}`}
                    >
                      <img
                        src={photo.thumbnail || photo.src}
                        alt="Memorial photograph of Prof. Rajaguru"
                        loading={index < 6 ? 'eager' : 'lazy'}
                        onError={() => handleImageError(photo.id)}
                      />
                      <div className={styles.hoverIndicator} aria-hidden="true">
                        <Maximize2 size={18} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {hasMore && (
                <div className={styles.loadMoreContainer}>
                  <button
                    type="button"
                    onClick={loadMore}
                    className={styles.loadMoreButton}
                  >
                    Load More Photographs ({validPhotos.length - visibleCount} remaining)
                  </button>
                  <button
                    type="button"
                    onClick={showAll}
                    className={styles.showAllButton}
                  >
                    Show All {validPhotos.length}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Fullscreen Interactive Lightbox Modal */}
      {activePhoto && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            {validPhotos.length > 1 && (
              <>
                <button
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className={styles.imageContainer}>
              <img
                src={activePhoto.src}
                alt={activePhoto.alt || 'Memorial photograph'}
                className={styles.lightboxImage}
              />
            </div>

            <div className={styles.lightboxMeta}>
              <span className={styles.lightboxCounter}>
                {selectedIndex + 1} / {validPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
