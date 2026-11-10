import { memorial } from '../data/memorial';
import styles from './EulogyPage.module.css';

export default function EulogyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <span className={styles.label}>A Life Remembered</span>

          <h1>A Testimony of the Life of {memorial.name}</h1>

          <p>
            Remembering a life of faith, prayer, humility, service, and
            devotion to God and others.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.inner}>
          <span className={styles.sectionLabel}>A Testimony</span>

          <h2>A Testimony of the Life of Prof. Y. Rajaguru</h2>

          <div className={styles.divider} />

          <div className={styles.eulogy}>
            <p>
              Prof. Y. Rajaguru was born in 1945 to Mr. Yesadian and Mrs. Mary,
              the sixth of seven children. His father—fondly known as “Writer”—
              served the British administration in the tea estates of Munnar.
              Carrying a deep burden for the villages near Madurai, he
              established the first primary school and a small church in Kusavan
              Gundu in 1942. His sudden passing when Rajaguru was still young
              brought the family great hardship. But by the grace of God yet his
              mother Mrs. Mary ensured that all seven children were educated.
            </p>

            <p>
              Rajaguru studied first in his father’s school and later at
              Pasumalai High School, where the Lord began shaping his spiritual
              life. In 1958, when late Mr. & Mrs. Daniel conducted the first
              Tamil Nadu retreat on the Pasumalai campus, a fresh move of God
              began. Regular Sunday evening prayer meetings led by Bro.
              Jubileeraj and others stirred many young hearts. Rajaguru was one
              of those deeply touched, drawn toward prayer, fasting, and the
              fellowship of God's children.
            </p>

            <p>
              Around the same time, Bro. Press Moses and Bro. Swamidoss were
              converted and later joined American College, where a small prayer
              group began. This humble gathering grew into what became known as
              the Daniel Group. Many were reached during those days—among them
              Bros. Ebenezer, T. S. Paulraj, and Rajaguru himself.
            </p>

            <p>
              At a time when Madurai had no formal Fellowship Center, this
              little group  continued their Saturday fasting prayer and daily
              evening waiting upon God quietly influenced the entire college. It
              was said that even the Principal and the hostel students felt the
              impact of their earnest prayers.
            </p>

            <p>
              After completing his B.Sc, Bro. Joe guided him to move to Madras
              to stay at the LEF centre in Tambaram. From 1966, he worked as a
              demonstrator at Guindy Engineering College, while also serving
              faithfully in the ministry. He went on to complete his
              post-graduation at Madras Christian College, where God used him to
              lead several students to Christ. One of them was Bro. Seiboi
              Singsit from Imphal, Manipur, who later entered the Indian Foreign
              Service (IFS). Through this connection, the Lord used Br. Rajaguru
              to sow the first seeds of Fellowship ministry in Imphal.
            </p>

            <p>
              By then he had already entered government service and served at
              Presidency College, Chennai, where he would continue for over
              three decades touching the lives of many students.
            </p>

            <p>
              In God’s will, he married Jebagnanam. The Lord blessed them with
              two children—Joseph, married to Annie, through whom he was blessed
              with three grandsons: Jordan, Nathan, and Ethan; and Joy, married
              to Joshua, through whom he rejoiced to have a granddaughter,
              Katie. His family was his quiet joy, and he prayed faithfully for
              each one.
            </p>

            <p>
              Throughout his life, he continued to serve the Lord unassumingly
              wherever the servants of God sent him—at HQ, Beulah Gardens,
              various places in Tamil Nadu and Andhra, Imphal and the North
              East, Hyderabad and many other regions as well. His ministry spoke
              more through example than words.
            </p>

            <p>
              He leaves behind a legacy of faith, humility, prayer, and simple
              obedience—one that he prayed will continue to bear fruit in the
              generations that follow.
            </p>

            <p className={styles.closing}>
              The family is grateful for the love and prayers of the Fellowship
              family.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
