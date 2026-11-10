import { Heart } from "lucide-react";
import styles from "./TributeCard.module.css";

export default function TributeCard({ tribute }) {
  return (
    <article className={styles.card}>
      <div className={styles.icon}>
        <Heart size={18} />
      </div>

      <p className={styles.message}>“{tribute.message}”</p>

      <div className={styles.meta}>
        <strong>{tribute.name}</strong>

        {tribute.place?.trim() && (
          <span>{tribute.place.trim()}</span>
        )}
      </div>
    </article>
  );
}