// src/pages/Login/LoginPage.tsx
import * as React from 'react';
import { useState } from 'react';
import { Button } from '../../components/Button/Button'; // Seu componente Button
import styles from './LoginPage.module.css'; // Importa o CSS Module

// Defina a interface para as props, se houver, por exemplo, para um callback de login
interface LoginPageProps {
  onLoginSuccess: () => void; // Função para chamar quando o login for bem-sucedido
  onForgotPasswordClick: () => void; // Função para lidar com o clique em "Esqueceu a senha?"
  onBackClick: () => void; // Função para lidar com o clique em "Voltar"
}

const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onForgotPasswordClick,
  onBackClick
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // URL da imagem da logo. Confirmando o caminho '/logo.png'
  const logoPratoPronto = '/logo.png'; // Caminho relativo à pasta public

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    // Lógica SIMPLIFICADA: Simula um login bem-sucedido e redireciona imediatamente para o Hub.
    // Esta é uma abordagem TEMPORÁRIA para testar o roteamento.
    try {
      // Simula um pequeno atraso para simular o carregamento
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('Login simulado (sem verificação) bem-sucedido! Redirecionando para o Hub.');
      onLoginSuccess(); // Chama a função de callback para navegar para o Hub

    } catch (err) {
      // Em uma aplicação real, aqui você trataria erros de API
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido na simulação.');
      console.error('Erro na simulação de login:', err);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Container principal do formulário de login */}
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
            className={styles.loginButton} /* Passa a classe do CSS Module para o Button */
            disabled={loading} // Desabilita o botão enquanto carrega
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
