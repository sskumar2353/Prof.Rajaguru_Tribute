import { useEffect, useState } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTributes } from '../services/tributeService';
import TributeCard from '../components/tribute/TributeCard';
import TributeForm from '../components/tribute/TributeForm';
import PageIntro from '../components/common/PageIntro';
import styles from './TributesPage.module.css';

export default function TributesPage() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  function handleCreated(tribute) {
    setTributes((current) => [tribute, ...current]);
  }

  const recentTributes = tributes.slice(0, 8);

  return (
    <main className={styles.page}>
      <PageIntro
        eyebrow="Shared Memories"
        title="Tributes"
        description="Words, memories, and messages shared by everyone who knew and loved Prof. Rajaguru."
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <TributeForm onCreated={handleCreated} />

          <div className={styles.wallHeader}>
            <div>
              <span className={styles.label}>Recent Memories</span>
              <h2>Messages from loved ones</h2>
            </div>
            <div className={styles.icon} aria-hidden="true">
              <Heart size={22} />
            </div>
          </div>

          {loading && <div className={styles.status}>Loading tributes…</div>}

          {error && <div className={styles.error}>{error}</div>}

          {!loading && !error && recentTributes.length === 0 && (
            <div className={styles.empty}>
              <Heart size={32} />
              <h3>No tributes yet</h3>
              <p>Be the first person to share a memory.</p>
            </div>
          )}

          {!loading && !error && recentTributes.length > 0 && (
            <>
              <div className={styles.grid}>
                {recentTributes.map((tribute) => (
                  <TributeCard key={tribute.id} tribute={tribute} />
                ))}
              </div>

              {tributes.length > 8 && (
                <div className={styles.archiveAction}>
                  <Link to="/tributes/all" className={styles.archiveButton}>
                    View all tributes <ArrowRight size={17} />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
