import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FacultyAccordion.module.css';

export default function FacultyAccordion({ faculty }) {
  const [openId, setOpenId] = useState(null);

  if (!faculty || faculty.length === 0) return null;

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className={styles.section}>
      <h2 className="section-title">Faculty Members</h2>
      <ul className={styles.list}>
        {faculty.map((f) => (
          <li key={f.id} className={styles.item}>
            <button
              className={`${styles.header} ${openId === f.id ? styles.active : ''}`}
              onClick={() => toggle(f.id)}
            >
              <span>{f.name}</span>
              <span className={styles.chevron}>{openId === f.id ? '▲' : '▼'}</span>
            </button>
            <AnimatePresence>
              {openId === f.id && (
                <motion.div
                  className={styles.content}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.inner}>
                    <p><strong>Designation:</strong> {f.designation}</p>
                    <p><strong>Specialization:</strong> {f.specialization}</p>
                    {f.email && <p><strong>Email:</strong> <a href={`mailto:${f.email}`}>{f.email}</a></p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </section>
  );
}
