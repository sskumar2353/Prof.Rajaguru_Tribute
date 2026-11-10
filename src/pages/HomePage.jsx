import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, Camera, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { memorial } from '../data/memorial';
import SectionHeading from '../components/common/SectionHeading';
import PhotoGrid from '../components/media/PhotoGrid';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <section className={styles.welcome}>
        <div className="container">
          <SectionHeading
            eyebrow="A place to remember"
            title="Forever held in our hearts"
          />

          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {memorial.homeIntro.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </motion.div>

          <div className={styles.cards}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/tributes#post" className={styles.card}>
                <Heart />
                <span>
                  <strong>Share a Tribute</strong>
                  <small>Leave a message from the heart</small>
                </span>
                <ArrowRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/eulogy" className={styles.card}>
                <BookOpen />
                <span>
                  <strong>Read the Eulogy</strong>
                  <small>Remember a life beautifully lived</small>
                </span>
                <ArrowRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.19 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/photos" className={styles.card}>
                <Camera />
                <span>
                  <strong>View Memories</strong>
                  <small>Browse treasured photographs</small>
                </span>
                <ArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.tributeCta}>
        <motion.div
          className={styles.tributeCtaInner}
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className={styles.tributeCtaEyebrow}>Leave a tribute</span>
            <h2>Share a memory from the heart</h2>
            <p>Your words can become part of this lasting memorial.</p>
          </div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Link to="/tributes#post" className={styles.tributeCtaButton}>
              <PenLine size={17} />
              Leave a Tribute
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className={styles.photos}>
        <div className="container">
          <SectionHeading
            eyebrow="Memories in pictures"
            title="A collection of moments"
          />
          <PhotoGrid photos={memorial.photos.slice(0, 3)} />
          <div className={styles.center}>
            <motion.div whileTap={{ scale: 0.96 }} style={{ display: 'inline-block' }}>
              <Link to="/photos" className={styles.outline}>
                View all photos <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
