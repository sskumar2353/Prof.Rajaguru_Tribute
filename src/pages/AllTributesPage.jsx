import { useEffect, useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTributes } from '../services/tributeService';
import TributeCard from '../components/tribute/TributeCard';
import PageIntro from '../components/common/PageIntro';
import styles from './AllTributesPage.module.css';

export default function AllTributesPage() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTributes() {
      try {
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

  return (
    <main className={styles.page}>
      <PageIntro
        eyebrow="Every Memory Matters"
        title="All Tributes"
        description="A complete collection of messages shared in loving memory of Prof. Rajaguru."
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.topBar}>
            <Link to="/tributes" className={styles.backButton}>
              <ArrowLeft size={16} />
              Recent tributes
            </Link>
            <span className={styles.count}>
              {tributes.length} {tributes.length === 1 ? 'tribute' : 'tributes'}
            </span>
          </div>

          {loading && <div className={styles.status}>Loading tributes…</div>}
          {error && <div className={styles.error}>{error}</div>}

          {!loading && !error && tributes.length === 0 && (
            <div className={styles.empty}>
              <Heart size={32} />
              <h3>No tributes yet</h3>
              <p>Be the first person to share a memory.</p>
            </div>
          )}

          {!loading && !error && tributes.length > 0 && (
            <div className={styles.grid}>
              {tributes.map((tribute) => (
                <TributeCard key={tribute.id} tribute={tribute} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
