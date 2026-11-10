import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/common/PageIntro';
import { mediaConfig } from '../config/media';
import styles from './VideosPage.module.css';

export default function VideosPage() {
  return (
    <>
      <PageIntro
        title="Videos"
        text="Recorded moments of remembrance, faith, family, and fellowship."
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.introRow}>
            <div>
              <span className={styles.eyebrow}>Watch & remember</span>
              <h2>Stories that continue to speak</h2>
            </div>
            <span className={styles.count}>02 recordings</span>
          </div>

          <div className={styles.grid}>
            {mediaConfig.videos.map((video, index) => (
              <article className={styles.card} key={video.id}>
                <div className={styles.videoFrame}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <span className={styles.number}>0{index + 1}</span>
                </div>

                <div className={styles.content}>
                  <span className={styles.label}>YouTube recording</span>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className={styles.actions}>
                    <Link to={`/videos/${video.id}`}>
                      Open video page <ArrowRight size={15} />
                    </Link>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      YouTube <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
