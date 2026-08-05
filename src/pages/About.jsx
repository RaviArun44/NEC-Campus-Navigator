import styles from './About.module.css';

export default function About() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <div className="glass-card">
          <h2 className={styles.heroTitle}>About National Engineering College</h2>
          <p className={styles.heroSubtitle}>An Autonomous Institution Affiliated to Anna University | Established in 1984</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="glass-card">
          <h2 className="section-title">History & Establishment</h2>
          <p className={styles.desc}>
            National Engineering College (NEC) was established in 1984 by Kalvithanthai Thiru. K. Ramasamy. It is an autonomous institution affiliated to Anna University, approved by AICTE, and accredited by NBA (Tier-1) and NAAC with B++ grade. The college is set in a sprawling campus of 150 acres and offers a highly conducive environment for learning and research.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Our Vision</h3>
              <p>Transforming lives through quality education and research with human values.</p>
            </div>

            <div className={styles.card}>
              <h3>Our Mission</h3>
              <ul className={styles.list}>
                <li>Maintain excellent infrastructure and highly qualified faculty.</li>
                <li>Provide a conducive environment for creativity and team spirit.</li>
                <li>Promote ethical behavior and commitment to society.</li>
                <li>Foster industry-institute interaction for practical learning.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
