import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BookOpen, Camera, PenLine } from 'lucide-react';
import { memorial } from '../data/memorial';
import SectionHeading from '../components/common/SectionHeading';
import PhotoGrid from '../components/media/PhotoGrid';
import MemorialServiceSection from '../components/home/MemorialServiceSection';
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

          <div className={styles.copy}>
            {memorial.homeIntro.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          <div className={styles.cards}>
            <Link to="/tributes#leave-tribute" className={styles.card}>
              <Heart />
              <span>
                <strong>Share a Tribute</strong>
                <small>Leave a message from the heart</small>
              </span>
              <ArrowRight />
            </Link>

            <Link to="/eulogy" className={styles.card}>
              <BookOpen />
              <span>
                <strong>Read the Eulogy</strong>
                <small>Remember a life beautifully lived</small>
              </span>
              <ArrowRight />
            </Link>

            <Link to="/photos" className={styles.card}>
              <Camera />
              <span>
                <strong>View Memories</strong>
                <small>Browse treasured photographs</small>
              </span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <MemorialServiceSection />

      <section className={styles.tributeCta}>
        <div className={styles.tributeCtaInner}>
          <div>
            <span className={styles.tributeCtaEyebrow}>Leave a tribute</span>
            <h2>Share a memory from the heart</h2>
            <p>Your words can become part of this lasting memorial.</p>
          </div>
          <Link to="/tributes#leave-tribute" className={styles.tributeCtaButton}>
            <PenLine size={17} />
            Leave a Tribute
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className={styles.photos}>
        <div className="container">
          <SectionHeading
            eyebrow="Memories in pictures"
            title="A collection of moments"
          />
          <PhotoGrid photos={memorial.photos.slice(0, 3)} />
          <div className={styles.center}>
            <Link to="/photos" className={styles.outline}>
              View all photos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
