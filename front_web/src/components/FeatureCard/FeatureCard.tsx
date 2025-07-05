import React from 'react';
import styles from './featureCard.module.css';

interface FeatureCardProps {
  icon: string; // Caminho para a imagem do ícone
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <img src={icon} alt={title} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};