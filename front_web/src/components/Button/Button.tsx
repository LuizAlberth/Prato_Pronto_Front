// src/components/Button/Button.tsx
import * as React from 'react';
import styles from './Button.module.css'; // Importa o CSS Module

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost'; // Exemplo de variantes
  size?: 'small' | 'medium' | 'large'; // Exemplo de tamanhos
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '', // Para permitir classes adicionais (externas)
  ...props
}) => {
  // Combina as classes do CSS Module com base nas props
  const buttonClasses = [
    styles.button, // Classe base
    styles[variant], // Classe da variante (primary, secondary, ghost)
    styles[size],    // Classe do tamanho (small, medium, large)
    className        // Quaisquer classes adicionais passadas via prop
  ].filter(Boolean).join(' '); // Filtra valores falsy e junta com espaço

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};
