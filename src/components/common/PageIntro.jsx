import styles from "./PageIntro.module.css";
export default function PageIntro({ title, text }) {
  return (
    <section className={styles.intro}>
      <div className="container">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
