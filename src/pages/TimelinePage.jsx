import { useEffect, useRef } from 'react';
import PageIntro from '../components/common/PageIntro';
import { memorial } from '../data/memorial';
import styles from './TimelinePage.module.css';

export default function TimelinePage() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const root = timelineRef.current;

    if (!root) return;

    const items = root.querySelectorAll(`.${styles.item}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageIntro
        title="A Life's Journey"
        text="A collection of meaningful chapters, memories, and moments from a life that continues to inspire."
      />

      <section className={styles.section}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>The Journey</span>

          <h1>
            Every chapter
            <br />
            <em>tells a story.</em>
          </h1>

          <p>
            Follow the journey through the years, remembering the moments
            that shaped a life and touched the lives of others.
          </p>
        </div>

        {memorial.timeline.length > 0 ? (
          <div className={styles.timeline} ref={timelineRef}>
            <svg
              className={styles.pathSvg}
              viewBox="0 0 1000 2200"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter
                  id="softGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                className={styles.pathShadow}
                d="
                  M 500 20
                  C 310 130, 300 230, 500 340
                  C 700 450, 700 550, 500 660
                  C 300 770, 300 870, 500 980
                  C 700 1090, 700 1190, 500 1300
                  C 300 1410, 300 1510, 500 1620
                  C 700 1730, 700 1830, 500 1940
                  C 400 1995, 430 2070, 500 2180
                "
              />

              <path
                className={styles.path}
                d="
                  M 500 20
                  C 310 130, 300 230, 500 340
                  C 700 450, 700 550, 500 660
                  C 300 770, 300 870, 500 980
                  C 700 1090, 700 1190, 500 1300
                  C 300 1410, 300 1510, 500 1620
                  C 700 1730, 700 1830, 500 1940
                  C 400 1995, 430 2070, 500 2180
                "
              />
            </svg>

            <div className={styles.milestones}>
              {memorial.timeline.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <article
                    className={`${styles.item} ${
                      isLeft ? styles.left : styles.right
                    }`}
                    key={`${item.year}-${index}`}
                  >
                    <div className={styles.content}>
                      <div className={styles.chapter}>
                        Chapter {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className={styles.year}>{item.year}</div>

                      <h2>{item.title}</h2>

                      <div className={styles.rule} />

                      <p>{item.text}</p>
                    </div>

                    <div className={styles.marker}>
                      <span className={styles.markerCore} />
                    </div>
                  </article>
                );
              })}
            </div>

            <div className={styles.end}>
              <div className={styles.endMarker}>
                <span />
              </div>

              <p>Forever remembered</p>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <span>Timeline</span>

            <h2>Life chapters will appear here</h2>

            <p>
              Add timeline entries in{' '}
              <code>src/data/memorial.js</code>.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
