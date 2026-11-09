import { memorial } from '../../data/memorial';
import styles from './MemorialHero.module.css';

export default function MemorialHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} />
      <div className={styles.glow} />
      <div className={styles.petals} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <span key={index} style={{ '--i': index }} />)}
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>{memorial.heroTitle}</p>
        <div className={styles.portraitFrame}><img src={memorial.portrait} alt={`${memorial.name} portrait`} /></div>
        <h1>{memorial.name}</h1>
        <p className={styles.subtitle}>{memorial.heroSubtitle}</p>
        <span className={styles.dates}>{memorial.dates}</span>
      </div>
    </section>
  );
}
