import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './COE.module.css';

export default function COE() {
  const [activeTab, setActiveTab] = useState('officials');
  const [malpracticeOpen, setMalpracticeOpen] = useState(false);

  return (
    <div className={`container ${styles.coeContainer}`}>
      <section className={styles.hero}>
        <h2 className={styles.title}>Controller of Examinations</h2>
        <p className={styles.subtitle}>Estd. 2011 | Empowering Academic Excellence & Integrity</p>
      </section>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'officials' ? styles.active : ''}`}
          onClick={() => setActiveTab('officials')}
        >
          Officials & Staff
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'fees' ? styles.active : ''}`}
          onClick={() => setActiveTab('fees')}
        >
          Fee Structure
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'notices' ? styles.active : ''}`}
          onClick={() => setActiveTab('notices')}
        >
          Notices & Rules
        </button>
      </div>

      <div className="glass-card">
        <AnimatePresence mode="wait">
          {activeTab === 'officials' && (
            <motion.div key="officials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className={styles.sectionTitle}>COE Officials</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name of the Officials</th>
                      <th>Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>Dr. R. V. Mahendra Gowda</td><td>Principal / Chief Controller of Examinations</td></tr>
                    <tr><td>2</td><td>Dr. S. Tamil Selvi</td><td>Controller of Examinations</td></tr>
                    <tr><td>3</td><td>Dr. S. Cammillus</td><td>Deputy Controller of Examinations</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Supporting Staff</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name of the Staff</th>
                      <th>Designation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>Ms. D. Jency</td><td>Computer Programmer</td></tr>
                    <tr><td>2</td><td>Mr. P. Muthu</td><td>Junior Assistant</td></tr>
                    <tr><td>3</td><td>Ms. D. Santhana Lakshmi</td><td>Junior Assistant</td></tr>
                    <tr><td>4</td><td>Mr. J. Ganesa Moorthy</td><td>Office Assistant</td></tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'fees' && (
            <motion.div key="fees" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className={styles.sectionTitle}>Examination Fees (UG & PG)</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Nature of Fee</th>
                      <th>Amount (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>Theory & Practical (UG)</td><td>250/- per subject</td></tr>
                    <tr><td>2</td><td>Project Work (UG)</td><td>400/-</td></tr>
                    <tr><td>3</td><td>Theory & Practical (PG)</td><td>400/- per subject</td></tr>
                    <tr><td>4</td><td>Project Work (PG) - Phase I</td><td>1000/-</td></tr>
                    <tr><td>5</td><td>Project Work (PG) - Phase II</td><td>2000/-</td></tr>
                    <tr><td>6</td><td>Statement of Grades</td><td>100/-</td></tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'notices' && (
            <motion.div key="notices" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className={styles.sectionTitle}>Important Rules</h3>
              
              <div className={styles.accordion}>
                <button 
                  className={styles.accordionBtn}
                  onClick={() => setMalpracticeOpen(!malpracticeOpen)}
                >
                  <span>Malpractice Actions & Penalties</span>
                  <span>{malpracticeOpen ? '▲' : '▼'}</span>
                </button>
                <AnimatePresence>
                  {malpracticeOpen && (
                    <motion.div 
                      className={styles.accordionContent}
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    >
                      <div className={styles.accordionInner}>
                        <p><strong>Severe Action:</strong> Students found guilty of malpractice will face immediate cancellation of all registered exams in the current semester.</p>
                        <p><strong>Mobile Phones:</strong> Bringing electronic gadgets/smartwatches into the exam hall will result in confiscation and disciplinary action.</p>
                        <p><strong>Impersonation:</strong> Leads to dismissal from the institution and police complaint.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Downloads</h3>
              <div className={styles.downloads}>
                <a href="https://nec.edu.in/wp-content/uploads/2024/01/UG-Time-table.pdf" target="_blank" rel="noreferrer" className="btn-secondary">UG Time Table</a>
                <a href="https://nec.edu.in/wp-content/uploads/2024/01/PG-Time-table-.pdf" target="_blank" rel="noreferrer" className="btn-secondary">PG Time Table</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
