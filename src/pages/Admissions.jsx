import styles from './Admissions.module.css';

export default function Admissions() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <div className="glass-card">
          <h2 className={styles.heroTitle}>Admissions 2025-26</h2>
          <p className={styles.heroSubtitle}>Join NEC – An Autonomous Institution Affiliated to Anna University</p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="glass-card">
          <h2 className={styles.sectionTitle}>Admission Process</h2>
          <p className={styles.desc}>
            Undergraduate admissions are through Tamil Nadu Engineering Admissions (TNEA) counselling based on +2 marks.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Undergraduate Programs (B.E. / B.Tech)</h3>
              <ul className={styles.list}>
                <li>Computer Science and Engineering (CSE)</li>
                <li>Electronics and Communication Engineering (ECE)</li>
                <li>Mechanical Engineering</li>
                <li>Electrical and Electronics Engineering (EEE)</li>
                <li>Civil Engineering</li>
                <li>Information Technology (IT)</li>
                <li>Artificial Intelligence and Data Science (AI & DS)</li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3>Postgraduate Programs (M.E.)</h3>
              <ul className={styles.list}>
                <li>Computer Science and Engineering</li>
                <li>Embedded Systems Technologies</li>
                <li>High Voltage Engineering</li>
                <li>Energy Engineering</li>
                <li>Information Technology</li>
              </ul>
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Documents Required</h2>
          <ul className={`${styles.list} ${styles.docList}`}>
            <li>TNEA Allotment Order</li>
            <li>10th & 12th Mark Sheets</li>
            <li>Transfer Certificate</li>
            <li>Community Certificate (if applicable)</li>
            <li>Aadhaar Card Copy</li>
            <li>Passport Size Photos</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
