import QRCode from 'react-qr-code';
import styles from './QRSection.module.css';

export default function QRSection({ locationUrl, mapsLink, qrImage }) {
  if (!locationUrl && !mapsLink && !qrImage) return null;

  return (
    <section className={styles.section}>
      <h2 className="section-title">Location QR Code</h2>
      <p className={styles.subtitle}>Scan to get directions on campus</p>
      
      <div className={styles.qrContainer}>
        <div className={styles.qrBox}>
          {qrImage ? (
            <img src={qrImage} alt="Location QR Code" className={styles.qrImage} />
          ) : locationUrl ? (
            <QRCode value={locationUrl} size={180} fgColor="#003366" />
          ) : null}
        </div>
      </div>

      {mapsLink && (
        <div className={styles.actions}>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open Directions in Google Maps
          </a>
        </div>
      )}
    </section>
  );
}
