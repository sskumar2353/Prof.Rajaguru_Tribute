import { useEffect, useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getTributes } from '../services/tributeService';
import TributeCard from '../components/tribute/TributeCard';
import TributeForm from '../components/tribute/TributeForm';
import PageIntro from '../components/common/PageIntro';
import styles from './TributesPage.module.css';

const ITEMS_PER_PAGE = 6;

export default function TributesPage() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    let active = true;

    async function loadTributes() {
      try {
        setLoading(true);
        setError('');
        const data = await getTributes();
        if (active) setTributes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (active) {
          setError('Unable to load tributes right now. Please try again later.');
          setTributes([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTributes();

    return () => {
      active = false;
    };
  }, []);

  // Handle direct navigation to tribute form via URL hash
  useEffect(() => {
    if (
      location.hash === '#leave-tribute' ||
      location.hash === '#post' ||
      location.hash === '#tribute-form'
    ) {
      const el = document.getElementById('leave-tribute');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    }
  }, [location.hash]);

  function handleCreated(tribute) {
    setTributes((current) => [tribute, ...current]);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(tributes.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTributes = tributes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const wall = document.getElementById('tributes-wall');
    if (wall) {
      wall.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <main className={styles.page}>
      <PageIntro
        eyebrow="Shared Memories"
        title="Tributes"
        description="Words, memories, and messages shared by everyone who knew and loved Prof. Rajaguru."
      />

      <section className={styles.section}>
        <div className={styles.container}>
          {/* Tributes Wall Header */}
          <div id="tributes-wall" className={styles.wallHeader}>
            <div>
              <span className={styles.label}>Memories of Prof. Rajaguru</span>
              <h2>Messages from loved ones</h2>
            </div>
            <div className={styles.icon} aria-hidden="true">
              <Heart size={22} />
            </div>
          </div>

          {loading && <div className={styles.status}>Loading tributes…</div>}

          {error && <div className={styles.error}>{error}</div>}

          {!loading && !error && tributes.length === 0 && (
            <div className={styles.empty}>
              <Heart size={32} />
              <h3>No tributes yet</h3>
              <p>Be the first person to share a memory below.</p>
            </div>
          )}

          {/* 6 Tributes Per Page */}
          {!loading && !error && currentTributes.length > 0 && (
            <>
              <div className={styles.grid}>
                {currentTributes.map((tribute) => (
                  <TributeCard key={tribute.id} tribute={tribute} />
                ))}
              </div>

              {/* Page-by-Page Pagination Controls */}
              {totalPages > 1 && (
                <nav className={styles.pagination} aria-label="Tributes pagination">
                  <button
                    type="button"
                    className={styles.pageBtn}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-label="Previous tributes page"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`${styles.pageNumBtn} ${
                          num === currentPage ? styles.activePage : ''
                        }`}
                        onClick={() => handlePageChange(num)}
                        aria-current={num === currentPage ? 'page' : undefined}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.pageBtn}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-label="Next tributes page"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </nav>
              )}
            </>
          )}

          {/* Tribute Submission Form — Placed Below the Tributes */}
          <div id="leave-tribute" className={styles.formSection}>
            <TributeForm onCreated={handleCreated} />
          </div>
        </div>
      </section>
    </main>
  );
}
