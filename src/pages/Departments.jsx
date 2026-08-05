import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { departmentsData } from '../data/departmentsData';
import styles from './Departments.module.css';

export default function Departments() {
  const departments = Object.values(departmentsData);

  return (
    <div className="container">
      <section className={styles.section}>
        <h2 className="section-title">Select Your Department</h2>
        
        <div className={styles.grid}>
          {departments.map((dept, i) => (
            <motion.div
              key={dept.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/departments/${dept.slug}`} className={`glass-card ${styles.card}`}>
                <h3 className={styles.name}>{dept.shortName}</h3>
                <p className={styles.fullName}>{dept.name}</p>
                <div className={styles.arrow}>&rarr;</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
