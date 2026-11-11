import { Heart } from 'lucide-react';
import styles from './TributeCard.module.css';

export default function TributeCard({ tribute }) {
  const isInvalid = (val) => {
    if (!val) return true;
    const lower = String(val).trim().toLowerCase();
    return (
      lower.length === 0 ||
      lower === 'not specified' ||
      lower === 'not available' ||
      lower === 'null' ||
      lower === 'undefined' ||
      lower === 'anonymous' ||
      lower === 'none'
    );
  };

  const name = isInvalid(tribute.name) ? '' : String(tribute.name).trim();
  const place = isInvalid(tribute.place) ? '' : String(tribute.place).trim();

  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        <Heart size={17} />
      </div>
      <p className={styles.message}>“{tribute.message}”</p>
      {(name || place) && (
        <div className={styles.meta}>
          <strong className={styles.name}>{name}</strong>
          <span className={styles.place}>{place}</span>
        </div>
      )}
    </article>
  );
}
