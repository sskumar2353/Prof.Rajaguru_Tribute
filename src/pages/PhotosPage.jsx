import { ArrowRight, Play, Images } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/common/PageIntro';
import { memorial } from '../data/memorial';
import styles from './PhotosPage.module.css';

const videos = [
  {
    id: 'CPZcEnu2Ab4',
    title: 'Remembering Prof. Rajaguru',
    description:
      'A special video remembering the life and legacy of Prof. Rajaguru.',
    thumbnail: 'https://img.youtube.com/vi/CPZcEnu2Ab4/hqdefault.jpg',
  },
  {
    id: 'QFhyRZfiRnI',
    title: 'A Life of Faith and Service',
    description:
      'Memories and reflections celebrating the life and service of Prof. Rajaguru.',
    thumbnail: 'https://img.youtube.com/vi/QFhyRZfiRnI/hqdefault.jpg',
  },
];

export default function PhotosPage() {
  const photos = Array.isArray(memorial.photos) ? memorial.photos : [];

  return (
    <>
      <PageIntro
        title="Gallery Board"
        text="A collection of photographs, memories, and videos celebrating the life of Prof. Rajaguru."
      />

      <section className={styles.section}>
        <div className={styles.board}>
          {/* LEFT — PHOTOS */}
          <Link to="/photos/images" className={styles.photoPanel}>
            <div className={styles.photoHeader}>
              <div>
                <span className={styles.eyebrow}>Memories</span>
                <h2>Photographs</h2>
              </div>

              <div className={styles.arrow}>
                <ArrowRight size={20} />
              </div>
            </div>

            <div className={styles.photoGrid}>
              {photos.slice(0, 5).map((photo, index) => (
                <div
                  className={`${styles.photo} ${
                    index === 0 ? styles.largePhoto : ''
                  }`}
                  key={photo.id || photo.src || index}
                >
                  <img
                    src={photo.src || photo.url}
                    alt={photo.alt || photo.caption || 'Memory'}
                    loading="lazy"
                  />

                  {(photo.caption || photo.title) && (
                    <div className={styles.photoCaption}>
                      {photo.caption || photo.title}
                    </div>
                  )}
                </div>
              ))}

              {photos.length === 0 && (
                <div className={styles.emptyPhotos}>
                  <Images size={32} />
                  <span>Photos will appear here</span>
                </div>
              )}
            </div>

            <div className={styles.viewMore}>
              View all photographs
              <ArrowRight size={16} />
            </div>
          </Link>

          {/* RIGHT — VIDEOS */}
          <div className={styles.videoColumn}>
            <div className={styles.videoHeader}>
              <div>
                <span className={styles.eyebrow}>Watch</span>
                <h2>Videos</h2>
              </div>
            </div>

            {videos.map((video, index) => (
              <Link
                to={`/photos/videos/${video.id}`}
                className={styles.videoCard}
                key={video.id}
              >
                <div className={styles.videoThumbnail}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                  />

                  <div className={styles.playButton}>
                    <Play size={19} fill="currentColor" />
                  </div>

                  <span className={styles.videoNumber}>
                    0{index + 1}
                  </span>
                </div>

                <div className={styles.videoInfo}>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>

                  <span className={styles.watchLink}>
                    Watch video
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}