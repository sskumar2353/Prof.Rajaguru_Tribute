import TributeCard from './TributeCard';
import styles from './TributeWall.module.css';

export default function TributeWall({ tributes, loading }) {
  if (loading) return <div className={styles.loading}>Loading memories…</div>;
  if (!tributes.length) return <div className={styles.empty}>No tributes yet. Be the first to leave a memory.</div>;
  return <div className={styles.grid}>{tributes.map(tribute => <TributeCard key={tribute.id} tribute={tribute}/>)}</div>;
}
