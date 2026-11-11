import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memorial } from '../../data/memorial';
import styles from './MemorialHero.module.css';

export default function MemorialHero() {
  const slides = memorial.heroPhotos && memorial.heroPhotos.length > 0
    ? memorial.heroPhotos
    : Array(7).fill(memorial.portrait);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Memorial Canvas */}
      <div className={styles.canvasBackground} />
      <div className={styles.radialAura} />
      <div className={styles.ambientGlow} />

      {/* Floating Ethereal Golden Motes */}
      <div className={styles.motesContainer} aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} className={styles.mote} style={{ '--m': index }} />
        ))}
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{memorial.heroTitle}</p>

        {/* 7-Photo Memorial Slideshow */}
        <div className={styles.slideshowContainer}>
          <div className={styles.portraitFrame}>
            {slides.map((src, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === activeSlide ? styles.activeSlide : ''
                }`}
                aria-hidden={index !== activeSlide}
              >
                <img
                  src={src}
                  alt={`${memorial.name} memorial photo ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={prevSlide}
                  aria-label="Previous memorial photograph"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={nextSlide}
                  aria-label="Next memorial photograph"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* 7 Indicator Dots */}
          {slides.length > 1 && (
            <div className={styles.dots} role="tablist" aria-label="Slideshow pagination">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === activeSlide}
                  aria-label={`Jump to photograph ${index + 1}`}
                  className={`${styles.dot} ${
                    index === activeSlide ? styles.activeDot : ''
                  }`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        <h1>{memorial.name}</h1>
        <p className={styles.subtitle}>{memorial.heroSubtitle}</p>
        <span className={styles.dates}>{memorial.dates}</span>
      </div>
    </section>
  );
}
