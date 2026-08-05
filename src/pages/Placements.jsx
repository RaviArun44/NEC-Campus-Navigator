import { motion } from 'framer-motion';
import styles from './Placements.module.css';

export default function Placements() {
  const stats = [
    { value: '₹10 - 12 LPA', label: 'Highest Package' },
    { value: '₹4.5 - 5 LPA', label: 'Average Package' },
    { value: '80-95%', label: 'Placement Rate' },
    { value: '500+', label: 'Offers Annually' },
  ];

  const recruiters = [
    'TCS', 'Cognizant', 'Accenture', 'Zoho', 'Wipro', 'Infosys',
    'Data Patterns', 'Tessolve Semiconductor', 'L&T Technology Services',
    'Renault Nissan', 'HCL', 'Capgemini'
  ];

  return (
    <div className="container">
      <section className={styles.hero}>
        <div className="glass-card">
          <h2 className={styles.heroTitle}>Placements at NEC</h2>
          <p className={styles.heroSubtitle}>Strong Industry Connections | Excellent Placement Record | 80-95% Placement Rate</p>
        </div>
      </section>

      <section className={styles.content}>
        <h2 className="section-title">Placement Highlights (2024-2025)</h2>
        
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={`glass-card ${styles.statCard}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '4rem' }}>Top Recruiters</h2>
        <div className={styles.recruitersGrid}>
          {recruiters.map((company, i) => (
            <motion.div
              key={i}
              className={styles.recruiterBadge}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
            >
              {company}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
