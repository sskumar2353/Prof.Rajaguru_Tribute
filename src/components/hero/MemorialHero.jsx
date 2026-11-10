import { motion } from 'framer-motion';
import { memorial } from '../../data/memorial';
import styles from './MemorialHero.module.css';

export default function MemorialHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} />
      <div className={styles.glow} />
      <div className={styles.petals} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} style={{ '--i': index }} />
        ))}
      </div>
      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
      >
        <motion.p
          className={styles.eyebrow}
          variants={{
            hidden: { opacity: 0, y: -12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          {memorial.heroTitle}
        </motion.p>
        <motion.div
          className={styles.portraitFrame}
          variants={{
            hidden: { opacity: 0, scale: 0.88, y: 15 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 240, damping: 24 },
            },
          }}
        >
          <img src={memorial.portrait} alt={`${memorial.name} portrait`} />
        </motion.div>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          {memorial.name}
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          {memorial.heroSubtitle}
        </motion.p>
        <motion.span
          className={styles.dates}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6 } },
          }}
        >
          {memorial.dates}
        </motion.span>
      </motion.div>
    </section>
  );
}
