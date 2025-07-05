// src/components/Header/Header.tsx
import * as React from "react";
import styles from './Header.module.css'; // Importa o CSS Module

interface HeaderProps {
  logoSrc?: string;
  profileSrc?: string;
  onProfileClick?: () => void; // Nova prop para o clique no perfil
}

export const Header: React.FC<HeaderProps> = ({
 // children, // Removido, pois não é usado neste componente
  logoSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/ebd05975757df181bb82b3473385937d56421cbf?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8",
  profileSrc = "https://cdn.builder.io/api/v1/image/assets/TEMP/84383cb146f9fb4c24365d8d628c5d767de9bb4f?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8",
  onProfileClick // Recebe a função de clique
}) => {
  return (
    <header className={styles.header}>
      <img
        src={logoSrc}
        alt="Logo da Aplicação"
        className={styles.logo}
      />
      <div className={styles.searchBox}>
        Busque sua receita aqui...
      </div>
      {/* O ícone de perfil agora é clicável */}
      <img
        src={profileSrc}
        alt="Foto de perfil do usuário"
        className={styles.profileIcon}
        onClick={onProfileClick} // Adiciona o evento de clique
      />
    </header>
  );
};
