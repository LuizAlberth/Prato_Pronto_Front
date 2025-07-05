// src/pages/PaginaInicial/PaginaInicial.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from './../../components/Header/Header';
import { Footer } from './../../components/Footer/Footer'; // Descomentado
import { FeatureCard } from './../../components/FeatureCard/FeatureCard'; // Descomentado
import styles from './paginaInicial.module.css';

// Importe suas imagens
import heroBackground from '../../assets/hero-background.png'; // Imagem de fundo principal
import iconDieta from '../../assets/icon-dieta.png';
import iconTempo from '../../assets/icon-tempo.png';
import iconReceitas from '../../assets/icon-receitas.png';
import espagueteImg from '../../assets/espaguete.png';

// Alterado de 'export const PaginaInicial' para 'const PaginaInicial'
const PaginaInicial: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main>
        <section className={styles.heroSection} style={{ backgroundImage: `url(${heroBackground})` }}>
          {/* O conteúdo do hero é a própria imagem de fundo */}
          {/* Adicionando um título para a seção hero, se desejar */}
          <h1 style={{color: 'white', fontSize: '3em', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>Sua Jornada Culinária Começa Aqui!</h1>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Aqui você é o chefe da cozinha</h2>
          <div className={styles.featuresGrid}>
            <FeatureCard 
              icon={iconDieta}
              title="Deixamos a sua dieta mais diversificada"
              description=""
            />
            <FeatureCard 
              icon={iconTempo}
              title="Sem tempo? Temos o que você precisa então"
              description=""
            />
            <FeatureCard 
              icon={iconReceitas}
              title="Aqui você encontra as melhores receitas"
              description=""
            />
          </div>
        </section>

        <section className={styles.ctaSection}>
          <button className={styles.ctaButton} onClick={() => navigate('/cadastro')}>
            Cadastre-se
          </button>
          <Link to="/login" className={styles.loginLink}>
            Já possui conta?
          </Link>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.aboutImage}>
            <img src={espagueteImg} alt="Prato de espaguete à bolonhesa" />
          </div>
          <div className={styles.aboutText}>
            <h3>Nós de Prato Pronto prezamos pela usabilidade, qualidade e segurança.</h3>
            <p>
              Oferecendo gratuitamente um site para o compartilhamento de receitas e 
              aprendizado na cozinha, com experiências únicas e receitas saborosas 
              prontas para serem descobertas.
            </p>
            <p>
              Temos chefes verificados que compartilham algumas de suas melhores 
              receitas em troca de avaliações positivas dos usuários, não perca tempo 
              e comece a cozinhar, ou se preferir compartilhe a sua receita favorita 
              para que outras pessoas possam apreciá-la também.
            </p>
          </div>
        </section>
      </main>

      <Footer /> {/* Descomentado */}
    </div>
  );
};

export default PaginaInicial; // Adicionado 'export default' aqui
