import { useParams, Navigate, Link } from 'react-router-dom';
import { departmentsData } from '../data/departmentsData';
import QRSection from '../components/QRSection';
import Gallery from '../components/Gallery';
import FacultyAccordion from '../components/FacultyAccordion';
import styles from './Department.module.css';

export default function Department() {
  const { id } = useParams();
  const dept = departmentsData[id];

  if (!dept) {
    return <Navigate to="/departments" replace />;
  }

  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>{dept.name}</h1>
        <Link to="/departments" className={styles.back}>&larr; Back to Departments</Link>
      </div>

      <section className={styles.intro}>
        <div className="glass-card">
          <p>
            Established in {dept.established} | Intake: {dept.intake} | {dept.accreditation}
          </p>
          <p className={styles.focus}>Focus: {dept.focus}</p>
        </div>
      </section>

      <QRSection 
        locationUrl={dept.locationUrl} 
        mapsLink={dept.mapsLink} 
        qrImage={dept.qrImage}
      />

      <Gallery images={dept.labImages} title="Department Labs & Facilities" />

      <FacultyAccordion faculty={dept.faculty} />
    </div>
  );
}
