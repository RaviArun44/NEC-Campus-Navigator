import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery';
import styles from './Home.module.css';

const campusImages = [
  { src: 'https://content3.jdmagicbox.com/comp/kovilpatti/p5/9999p4632.4632.090822183654.a6p5/catalogue/national-engineering-college-kovilpatti-ho-kovilpatti-colleges-23zwuj7.jpg', alt: 'NEC Campus' },
  { src: 'https://img.jagranjosh.com/images/2023/January/312023/National-Engineering-College-NEC-Kovilpatti-Campus-View-1.jpg', alt: 'NEC Campus View' },
  { src: 'https://d2lk14jtvqry1q.cloudfront.net/media/0103201911575_4f5c238b72.jpg', alt: 'NEC Building' },
  { src: 'https://nec.edu.in/wp-content/uploads/2024/01/GHostel1.jpg', alt: 'Girls Hostel' },
  { src: 'https://nec.edu.in/wp-content/uploads/2024/02/PG-Lab-copy-scaled-1-1024x576.webp', alt: 'PG Lab' },
  { src: 'https://nec.edu.in/wp-content/uploads/2024/02/01-Electrical-Workshop-1-1024x576.jpg', alt: 'Electrical Workshop' },
];

export default function Home() {
  return (
    <div className="container">
      <section className={styles.hero}>
        <div className="glass-card">
          <h2 className={styles.heroTitle}>Welcome to National Engineering College</h2>
          <p className={styles.heroSubtitle}>An Autonomous Institution Affiliated to Anna University</p>
          <p className={styles.heroEst}>Established in 1984</p>
          <div className={styles.heroActions}>
            <Link to="/admissions" className="btn-primary">Apply Now</Link>
            <Link to="/departments" className="btn-secondary">Explore Departments</Link>
          </div>
        </div>
      </section>

      <section className={styles.coeInfo}>
        <div className="glass-card">
          <h2 className={styles.coeTitle}>🎓 Controller of Examinations (COE) — Quick Update</h2>
          <p><strong>Office Established:</strong> 2011 (after Autonomous status was conferred)</p>
          <p><strong>Key Responsibilities:</strong> Preparing academic calendar, conducting university / end semester examinations, processing & publishing results, issuing grade sheets, consolidated statements & transcripts.</p>

          <h3 className={styles.subHeading}>📋 Important Notices</h3>
          <ul className={styles.list}>
            <li>Eligible students must register for End Semester Examinations on or before the last date — <strong>No partial / late registration allowed.</strong></li>
            <li>Hall Tickets must be collected from respective departments (private candidates from COE office).</li>
            <li>Third & Final Year Academic Calendar 2023–2024 is available.</li>
          </ul>

          <h3 className={styles.subHeading}>📅 Recent / Sample Timetables</h3>
          <div className={styles.coeLinks}>
            <a href="https://nec.edu.in/wp-content/uploads/2024/01/UG-Time-table.pdf" target="_blank" rel="noreferrer" className="btn-primary">📄 UG (B.E./B.Tech) Time Table</a>
            <a href="https://nec.edu.in/wp-content/uploads/2024/01/PG-Time-table-.pdf" target="_blank" rel="noreferrer" className="btn-primary">📄 PG (M.E./M.Tech) Time Table</a>
            <a href="https://nec.edu.in/wp-content/uploads/2024/01/Ph.D-course-work-Time-table.pdf" target="_blank" rel="noreferrer" className="btn-primary">📄 Ph.D. Coursework Time Table</a>
          </div>

          <p className={styles.coeNote}>
            For latest timetables, results & registration &rarr; visit the detailed <Link to="/coe">COE Section</Link> on this site.
          </p>
        </div>
      </section>

      <Gallery images={campusImages} title="Campus Gallery" />
    </div>
  );
}
