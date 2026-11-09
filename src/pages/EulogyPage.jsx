import { memorial } from '../data/memorial';
import styles from './EulogyPage.module.css';

export default function EulogyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <span className={styles.label}>A Life Remembered</span>
          <h1>A Eulogy for {memorial.name}</h1>
          <p>
            Remembering a life of love, faith, kindness, and the memories
            that will remain with us forever.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.inner}>
          <span className={styles.sectionLabel}>In Loving Memory</span>

          <h2>Remembering {memorial.name}</h2>

          <div className={styles.divider} />

          <div className={styles.eulogy}>
            <p>
              Today we gather to remember and celebrate the life of{' '}
              <strong>{memorial.name}</strong>.
            </p>

            <p>
              A life cannot be measured only by the years lived, but by the
              lives touched, the love shared, and the memories created along
              the way.
            </p>

            <p>
              {memorial.name} will always be remembered for the moments of
              kindness, the conversations, the laughter, and the quiet ways
              in which a lasting difference was made in the lives of others.
            </p>

            <p>
              Although the loss leaves an emptiness that words cannot fully
              express, the memories remain. Every story, every photograph,
              every shared moment becomes part of a legacy that continues.
            </p>

            <p>
              May we remember {memorial.name} not only with sadness, but with
              gratitude — gratitude for the life that was lived, the love
              that was given, and the memories that will never be forgotten.
            </p>

            <p className={styles.closing}>
              Forever remembered.<br />
              Forever loved.<br />
              Forever missed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}