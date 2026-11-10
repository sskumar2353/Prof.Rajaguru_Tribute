import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { mediaConfig } from '../config/media';
import styles from './VideoDetailPage.module.css';

export default function VideoDetailPage() {
  const { videoId } = useParams();
  const video = mediaConfig.videos.find((item) => item.id === videoId);

  if (!video) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Video not found</h1>
          <Link to="/videos">Return to videos</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link className={styles.back} to="/videos">
          <ArrowLeft size={16} /> Back to videos
        </Link>
        <div className={styles.header}>
          <span>Remembering</span>
          <h1>{video.title}</h1>
        </div>
        <div className={styles.frame}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className={styles.description}>
          <span>About this recording</span>
          <p>{video.description}</p>
          <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
            Watch on YouTube <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </main>
  );
}
