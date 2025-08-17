import type React from 'react';
import { NavLink } from 'react-router-dom';

import logoPng from '../../assets/logo.png';

import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <span className={styles.logoIcon}>
            <img src={logoPng} alt={'logo'} />
          </span>
          <span className={styles.logoText}>Async Race</span>
        </h1>
        <div className={styles.links}>
          <NavLink
            to="/garage"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.linkIcon}>🚗</span>
            Garage
          </NavLink>
          <NavLink
            to="/winner"
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.linkIcon}>🏆</span>
            Winners
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
