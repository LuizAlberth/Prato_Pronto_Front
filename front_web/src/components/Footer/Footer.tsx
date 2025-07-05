import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';
// import logo from '../../assets/logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/termos-de-uso" className={styles.link}>Termos de uso</Link>
      <div className={styles.logo}>
        {/* <img src={logo} alt="Prato Pronto Logo" /> */}
        <div className={styles.logoPlaceholder}></div>
      </div>
      <Link to="/contato" className={styles.link}>Entre em contato</Link>
    </footer>
  );
};