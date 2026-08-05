import { motion } from 'framer-motion';
import styles from './Gallery.module.css';

export default function Gallery({ images, title }) {
  if (!images || images.length === 0) return null;

  return (
    <section className={styles.section}>
      {title && <h2 className="section-title">{title}</h2>}
      <div className={styles.grid}>
        {images.map((img, i) => (
          <motion.div
            key={i}
            className={styles.item}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <img src={img.src} alt={img.alt || `Image ${i + 1}`} className={styles.image} />
            {img.alt && <p className={styles.caption}>{img.alt}</p>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
