import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import PageIntro from '../components/common/PageIntro';
import { memorial } from '../data/memorial';
import styles from './TimelinePage.module.css';

export default function TimelinePage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const timelineItems = Array.isArray(memorial.timeline) ? memorial.timeline : [];

  return (
    <>
      <PageIntro
        title="A Life's Journey"
        text="A collection of meaningful chapters, memories, and moments from a life that continues to inspire."
      />

      <section className={styles.section} ref={containerRef}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>

        {timelineItems.length > 0 ? (
          <div className={styles.timeline}>
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

              <motion.path
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
                style={{ pathLength: smoothProgress }}
              />
            </svg>

            <div className={styles.milestones}>
              {timelineItems.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.article
                    className={`${styles.item} ${
                      isLeft ? styles.left : styles.right
                    }`}
                    key={`${item.year}-${index}`}
                    initial={{ opacity: 0, y: 35, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.05,
                    }}
                    whileTap={{ scale: 0.98 }}
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

                    <motion.div
                      className={styles.marker}
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <motion.span
                        className={styles.markerCore}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.3,
                        }}
                      />
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              className={styles.end}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.endMarker}>
                <span />
              </div>

              <p>Forever remembered</p>
            </motion.div>
          </div>
        ) : (
          <div className={styles.empty}>
            <span>Timeline</span>

            <h2>Life chapters will appear here</h2>

            <p>
              Add timeline entries in <code>src/data/memorial.js</code>.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
