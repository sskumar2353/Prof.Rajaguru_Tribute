import { useEffect, useRef } from 'react';
import PageIntro from '../components/common/PageIntro';
import { memorial } from '../data/memorial';
import styles from './TimelinePage.module.css';

export default function TimelinePage() {
  const timelineRef = useRef(null);
  const items = Array.isArray(memorial.timeline) ? memorial.timeline : [];

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll('[data-timeline-item]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageIntro
        title="A Life's Journey"
        text="Meaningful chapters from a life of faith, family, teaching, service, and quiet influence."
      />

      <section className={styles.section}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>The Journey</span>
          <h2>
            Every chapter
            <br />
            <em>tells a story.</em>
          </h2>
          <p>
            Follow the journey through the years, remembering the moments that
            shaped a life and touched the lives of others.
          </p>
        </div>

        {items.length > 0 ? (
          <div className={styles.timeline} ref={timelineRef}>
            <svg
              className={styles.pathSvg}
              viewBox="0 0 1000 1800"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className={styles.pathBase}
                d="M500 40 C 350 140, 350 250, 500 340 S 650 540, 500 640 S 350 840, 500 940 S 650 1140, 500 1240 S 350 1440, 500 1760"
              />
              <path
                className={styles.pathAccent}
                d="M500 40 C 350 140, 350 250, 500 340 S 650 540, 500 640 S 350 840, 500 940 S 650 1140, 500 1240 S 350 1440, 500 1760"
              />
            </svg>

            <div className={styles.items}>
              {items.map((item, index) => (
                <article
                  className={`${styles.item} ${
                    index % 2 === 0 ? styles.left : styles.right
                  }`}
                  data-timeline-item
                  key={`${item.year}-${index}`}
                >
                  <div className={styles.marker}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <div className={styles.card}>
                    <span className={styles.year}>{item.year}</span>
                    <h3>{item.title}</h3>
                    <div className={styles.rule} />
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.end}>Forever remembered</div>
          </div>
        ) : (
          <div className={styles.empty}>
            <span>Timeline</span>
            <h3>Life chapters will appear here</h3>
            <p>
              Add verified timeline entries to{' '}
              <code>src/data/memorial.js</code> when the family-approved
              chronology is ready.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
