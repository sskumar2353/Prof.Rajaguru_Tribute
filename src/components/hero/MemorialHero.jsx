import { useState, useEffect, useCallback, useRef } from 'react';
import { memorial } from '../../data/memorial';
import styles from './MemorialHero.module.css';

export default function MemorialHero() {
  const slides = memorial.heroPhotos && memorial.heroPhotos.length > 0
    ? memorial.heroPhotos
    : [memorial.portrait];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe support for manual navigation
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 35;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Automatic slide rotation every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  function handleTouchStart(e) {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      // Swiped left -> next photo
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev photo
      prevSlide();
    }
  }

  function handleFrameClick(e) {
    // If user clicked/tapped without drag, advance to next photo
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width / 2) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

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

        {/* 3-Photo Memorial Slideshow with Swipe & Click manual navigation */}
        <div className={styles.slideshowContainer}>
          <div
            className={styles.portraitFrame}
            onClick={handleFrameClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Memorial photographs slideshow"
            title="Click or swipe to see next photo"
          >
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
          </div>

          {/* Indicator Dots for manual selection */}
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
