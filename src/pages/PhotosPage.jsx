import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Images, Maximize2, X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import PageIntro from '../components/common/PageIntro';
import { mediaConfig } from '../config/media';
import { getMemorialPhotos } from '../services/photoService';
import styles from './PhotosPage.module.css';

export default function PhotosPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [brokenImageIds, setBrokenImageIds] = useState(new Set());

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

  // Handle broken images gracefully so broken icons are never displayed
  function handleImageError(id) {
    setBrokenImageIds((prev) => new Set(prev).add(id));
  }

  const validPhotos = photos.filter((p) => !brokenImageIds.has(p.id));

  // Lightbox keyboard navigation
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
            <a
              className={styles.archiveButton}
              href={mediaConfig.googlePhotosAlbumUrl || mediaConfig.oneDriveFolderUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open Google Photos album <ExternalLink size={15} />
            </a>
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
              <p>
                The shared OneDrive photo archive is currently being updated.
              </p>
              <a
                href={mediaConfig.googlePhotosAlbumUrl || mediaConfig.oneDriveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className={styles.archiveButton}
              >
                Open Google Photos album <ExternalLink size={15} />
              </a>
            </div>
          )}

          {!loading && !error && validPhotos.length > 0 && (
            <div className={styles.grid}>
              {validPhotos.map((photo, index) => {
                // Editorial composition: first image is featured, fifth image is wide
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
                    aria-label={`View photograph: ${photo.caption || photo.title}`}
                  >
                    <img
                      src={photo.thumbnail || photo.src}
                      alt={photo.alt || photo.caption || 'Memorial photograph'}
                      loading={index < 4 ? 'eager' : 'lazy'}
                      onError={() => handleImageError(photo.id)}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.caption}>
                        {photo.caption || photo.title || 'A cherished memory'}
                      </span>
                      <span className={styles.zoomIcon} aria-hidden="true">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className={styles.note}>
            <strong>Google Photos Memorial Album</strong>
            <span>
              All original high-resolution photographs are preserved in the family’s Google Photos memorial album.
              To view the full album or upload additional memorial photographs, use the album link above.
            </span>
          </div>
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
                alt={activePhoto.alt || activePhoto.caption}
                className={styles.lightboxImage}
              />
            </div>

            <div className={styles.lightboxMeta}>
              <p className={styles.lightboxCaption}>
                {activePhoto.caption || activePhoto.title}
              </p>
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
