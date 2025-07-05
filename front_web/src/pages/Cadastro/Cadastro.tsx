// src/pages/Cadastro/Cadastro.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './cadastro.module.css';

// import logo from '../../assets/logo.png'; // Comentado, pois não está sendo usado no JSX

// Alterado de 'export const Cadastro' para 'const Cadastro'
const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ nome, email, senha });
    // alert('Cadastro realizado com sucesso! (Simulação)'); // Evitar alert() em aplicações React
    // Em vez de alert(), você pode usar um modal ou uma mensagem na tela
    console.log('Cadastro realizado com sucesso! (Simulação)');
    navigate('/login');
  };

  return (
    // Container da página inteira. A única função dele agora é centralizar o bloco de conteúdo.
    <div className={styles.pageContainer}>
      
      {/* Este é o bloco de conteúdo que será centralizado */}
      <div className={styles.mainBlock}>
        
        {/* Formulário branco */}
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>CADASTRAR</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="nome">NOME:</label>
              <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">EMAIL:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="senha">SENHA:</label>
              <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <button type="submit" className={styles.submitButton}>CADASTRAR</button>
          </form>
        </div>

        {/* Link de login */}
        <p className={styles.loginLink}>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>

        {/* Rodapé do bloco com logo e botão Voltar */}
        <div className={styles.footerRow}>
          <div className={styles.logoContainer}>
            {/* <img src={logo} alt="Prato Pronto Logo" className={styles.logoImage}/> */}
            <div className={styles.logoPlaceholder}>PRATO PRONTO</div>
          </div>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            Voltar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cadastro; // Adicionado 'export default' aqui
