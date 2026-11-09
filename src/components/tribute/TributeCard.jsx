import { Heart } from 'lucide-react';
import styles from './TributeCard.module.css';

export default function TributeCard({ tribute }) {
  const date = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(tribute.created_at));
  return <article className={styles.card}><div className={styles.icon}><Heart size={18}/></div><p className={styles.message}>“{tribute.message}”</p><div className={styles.meta}><strong>{tribute.name}</strong><span>{date}</span></div></article>;
}
