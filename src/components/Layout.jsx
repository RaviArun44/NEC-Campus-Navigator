import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <img
          src="https://facultytick.com/wp-content/uploads/2022/03/National-Engineering-College.jpg"
          alt="NEC Logo"
          className={styles.logo}
        />
        <div className={styles.titleBlock}>
          <h1 className={styles.collegeName}>National Engineering College, Kovilpatti</h1>
          <p className={styles.tagline}>🗺️ Campus Navigator — Find Your Way Around Campus</p>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
