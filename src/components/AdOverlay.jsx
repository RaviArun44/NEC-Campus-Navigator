import { useState, useEffect } from 'react';
import styles from './AdOverlay.module.css';

export default function AdOverlay() {
  const [visible, setVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const now = new Date();
    const expiry = new Date();
    expiry.setHours(17, 0, 0, 0);
    if (now >= expiry) return;

    setVisible(true);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.imageWrap}>
          {timeLeft > 10 ? (
            <img src="/ITAfinal.png" className={styles.adImage} alt="IT Association Symposium" />
          ) : (
            <img src="/WhatsApp Image 2026-02-10 at 3.40.51 PM.jpeg" className={styles.adImage} alt="ECE Association Symposium" />
          )}
        </div>

        <p className={styles.timer}>
          Advertisement closes in <strong>{timeLeft}</strong> seconds
        </p>

        <div className={styles.buttons}>
          <button className={styles.viewBtn} onClick={() => setVisible(false)}>
            View The Site
          </button>
          <button className={styles.cancelBtn} onClick={() => setVisible(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
