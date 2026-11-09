import { ExternalLink, Images, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/common/PageIntro';
import { memorial } from '../data/memorial';
import { mediaConfig } from '../config/media';
import styles from './PhotosPage.module.css';

export default function PhotosPage() {
  const photos = Array.isArray(memorial.photos) ? memorial.photos : [];

  return (
    <>
      <PageIntro
        title="Photographs"
        text="A collection of photographs preserving the people, places, and moments that remain part of Prof. Rajaguru’s story."
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
              href={mediaConfig.oneDriveFolderUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open photo archive <ExternalLink size={15} />
            </a>
          </div>

          {photos.length ? (
            <div className={styles.grid}>
              {photos.map((photo, index) => (
                <Link
                  key={photo.id || photo.src || index}
                  to={`/photos/image/${encodeURIComponent(photo.id || index)}`}
                  className={`${styles.card} ${index === 0 ? styles.featured : ''}`}
                >
                  <img
                    src={photo.src || photo.url}
                    alt={photo.alt || photo.caption || 'Memorial photograph'}
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  <div className={styles.overlay}>
                    <span>{photo.caption || photo.title || 'A cherished memory'}</span>
                    <Maximize2 size={16} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <Images size={30} />
              <h3>Photographs are being prepared</h3>
              <p>
                The shared photo archive is available through the button above.
              </p>
              <a href={mediaConfig.oneDriveFolderUrl} target="_blank" rel="noreferrer">
                Open the photo archive <ExternalLink size={15} />
              </a>
            </div>
          )}

          <div className={styles.note}>
            <strong>Photo archive</strong>
            <span>
              The supplied OneDrive folder is kept as the source archive. Public
              websites cannot reliably enumerate a private OneDrive folder without
              Microsoft Graph authentication, so the archive link remains available
              until a public/API-backed image feed is configured.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
