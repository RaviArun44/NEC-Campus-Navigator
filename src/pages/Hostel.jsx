import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { hostelsData } from '../data/hostelsData';
import styles from './Hostel.module.css';

export default function Hostel() {
  const hostels = Object.values(hostelsData);

  return (
    <div className="container">
      <section className={styles.hero}>
        <div className="glass-card">
          <h2 className={styles.heroTitle}>Hostel Facilities</h2>
          <p className={styles.heroSubtitle}>Separate Hostels for Boys and Girls with Modern Amenities</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className="section-title">Select Your Hostel</h2>
        
        <div className={styles.grid}>
          {hostels.map((hostel, i) => (
            <motion.div
              key={hostel.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/hostel/${hostel.slug}`} className={`glass-card ${styles.card}`}>
                <h3 className={styles.name}>{hostel.name}</h3>
                <div className={styles.arrow}>&rarr;</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
