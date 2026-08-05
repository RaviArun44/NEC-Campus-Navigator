import { useParams, Navigate, Link } from 'react-router-dom';
import { hostelsData } from '../data/hostelsData';
import QRSection from '../components/QRSection';
import Gallery from '../components/Gallery';
import styles from './HostelDetail.module.css';

export default function HostelDetail() {
  const { id } = useParams();
  const hostel = hostelsData[id];

  if (!hostel) {
    return <Navigate to="/hostel" replace />;
  }

  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>{hostel.name}</h1>
        <Link to="/hostel" className={styles.back}>&larr; Back to Hostels</Link>
      </div>

      <section className={styles.intro}>
        <div className="glass-card">
          <p><strong>Capacity:</strong> {hostel.capacity} Students</p>
          <p className={styles.desc}>{hostel.description}</p>
        </div>
      </section>

      <QRSection 
        locationUrl={hostel.locationUrl} 
        mapsLink={hostel.mapsLink} 
        qrImage={hostel.qrImage}
      />

      <section className={styles.amenitiesSection}>
        <h2 className="section-title">Key Amenities</h2>
        <div className="glass-card">
          <ul className={styles.list}>
            {hostel.amenities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <Gallery images={hostel.galleryImages} title="Hostel Facilities & Views" />
    </div>
  );
}
