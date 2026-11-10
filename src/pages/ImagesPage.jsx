import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memorial } from '../data/memorial';
import styles from './ImagesPage.module.css';

export default function ImagesPage() {
  const photos = Array.isArray(memorial.photos) ? memorial.photos : [];

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

        <div className={styles.grid}>
          {photos.map((photo, index) => (
            <figure
              className={styles.photo}
              key={photo.id || photo.src || photo.url || index}
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
            </figure>
          ))}
        </div>

        {photos.length === 0 && (
          <div className={styles.empty}>
            No photographs have been added yet.
          </div>
        )}
      </div>
    </main>
  );
}
