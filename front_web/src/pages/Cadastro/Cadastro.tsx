// src/pages/Cadastro/Cadastro.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './cadastro.module.css';
// ALTERAÇÃO: Importando nosso novo serviço de API
import { cadastrarUsuario } from '../../api/usuarioService';

const Cadastro: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // ALTERAÇÃO: Estados para feedback de carregamento e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ALTERAÇÃO: A lógica de submissão agora chama a API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Limpa erros anteriores
    setLoading(true); // Ativa o estado de carregamento

    try {
      // Chama a função do serviço, passando os dados do formulário
      await cadastrarUsuario({ nome, email, senha });

      // Se a chamada for bem-sucedida
      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      navigate('/login');

    } catch (err) {
      // Se a chamada falhar, captura o erro
      if (err instanceof Error) {
        setError(err.message); // Define a mensagem de erro para ser exibida na tela
      } else {
        setError('Ocorreu um erro inesperado.');
      }
      console.error('Erro no cadastro:', err);
    } finally {
      // Executa sempre, seja em caso de sucesso ou falha
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainBlock}>
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
              <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} />
            </div>
            
            {/* ALTERAÇÃO: Exibe a mensagem de erro, se houver */}
            {error && <p className={styles.errorMessage}>{error}</p>}
            
            {/* ALTERAÇÃO: O botão agora mostra um feedback de carregamento */}
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Cadastrando...' : 'CADASTRAR'}
            </button>
          </form>
        </div>
        <p className={styles.loginLink}>
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>
        <div className={styles.footerRow}>
          <div className={styles.logoContainer}>
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

export default Cadastro;