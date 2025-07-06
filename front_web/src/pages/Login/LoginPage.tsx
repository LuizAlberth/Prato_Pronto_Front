// src/pages/Login/LoginPage.tsx
import * as React from 'react';
import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import styles from './LoginPage.module.css';
import { loginUsuario } from '../../api/usuarioService'; // NOVA IMPORTAÇÃO

interface LoginPageProps {
  onLoginSuccess: () => void;
  onForgotPasswordClick: () => void;
  onBackClick: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onForgotPasswordClick, onBackClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const logoPratoPronto = '/logo.png';

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const usuarioLogado = await loginUsuario({ email, senha: password });
      console.log('Login bem-sucedido para:', usuarioLogado.nome);
      onLoginSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocorreu um erro inesperado.');
      }
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.loginTitle}>Login</h1>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          {/* Campo de Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>EMAIL:</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Campo de Senha */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>SENHA:</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Mensagem de Erro */}
          {error && (
            <p className={styles.errorMessage}>{error}</p>
          )}
          {/* Botão Entrar */}
          <Button
            type="submit"
            size="large"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'ENTRAR'}
          </Button>
        </form>
        {/* Links de Esqueceu a Senha */}
        <div className={styles.forgotPasswordText}>
          Esqueceu a senha?{' '}
          <button
            onClick={onForgotPasswordClick}
            className={styles.forgotPasswordLink}
          >
            Clique aqui
          </button>
        </div>
      </div>
      {/* Logo no canto inferior esquerdo */}
      <div className={styles.logoContainer}>
        <img
          src={logoPratoPronto}
          alt="Logo Prato Pronto"
          className={styles.logoImage}
        />
      </div>
      {/* Botão Voltar no canto inferior direito */}
      <div className={styles.backButtonContainer}>
        <button
          onClick={onBackClick}
          className={styles.backButton}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default LoginPage;