import { Heart } from 'lucide-react';
import styles from './TributeCard.module.css';

export default function TributeCard({ tribute }) {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(tribute.created_at));

  const rawPlace = tribute.place ? String(tribute.place).trim() : '';
  const hasPlace =
    rawPlace.length > 0 &&
    rawPlace.toLowerCase() !== 'not specified' &&
    rawPlace.toLowerCase() !== 'null' &&
    rawPlace.toLowerCase() !== 'undefined';

  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        <Heart size={17} />
      </div>
      <p className={styles.message}>“{tribute.message}”</p>
      <div className={styles.meta}>
        <div>
          <strong className={styles.name}>{tribute.name}</strong>
          {hasPlace && <span className={styles.place}>{rawPlace}</span>}
        </div>
        <span className={styles.date}>{date}</span>
      </div>
    </article>
  );
}
