import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import styles from './VideoDetailPage.module.css';

const videos = [
  {
    id: 'YOUR_YOUTUBE_VIDEO_ID_1',
    title: 'Remembering Prof. Rajaguru',
    description:
      'A special video remembering the life, faith, service, and memories of Prof. Rajaguru.',
  },
  {
    id: 'YOUR_YOUTUBE_VIDEO_ID_2',
    title: 'A Life of Faith and Service',
    description:
      'Memories and reflections celebrating the life and legacy of Prof. Rajaguru.',
  },
];

export default function VideoDetailPage() {
  const { videoId } = useParams();

  const video = videos.find((item) => item.id === videoId);

  if (!video) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>Video not found</h1>
          <Link to="/photos">Return to gallery</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link to="/photos" className={styles.back}>
          <ArrowLeft size={17} />
          Back to gallery
        </Link>

        <div className={styles.header}>
          <span>Remembering</span>
          <h1>{video.title}</h1>
        </div>

        <article className={styles.videoContainer}>
          <div className={styles.video}>
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className={styles.description}>
            <span>About this video</span>
            <h2>{video.title}</h2>
            <p>{video.description}</p>

            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch on YouTube
              <ExternalLink size={15} />
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}
