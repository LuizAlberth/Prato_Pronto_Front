// src/App.tsx
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Importa os seus componentes de página
import PaginaInicial from './pages/PaginaInicial/PaginaInicial'; // Assumindo export default
import Cadastro from './pages/Cadastro/Cadastro'; // Assumindo export default
import LoginPage from './pages/Login/LoginPage'; // Importação correta para default export
import HubPage from './pages/Hub/HubPage'; // Importa o HubPage
import PaginaDoUsuario from './pages/Usuario/PaginaDoUsuario'; // Importa a PaginaDoUsuario
import ReceitaPage from './pages/Receita/ReceitaPage'; // Importa a ReceitaPage
import PublicacaoPage from './pages/Publicacao/PublicacaoPage'; // Importa a nova PublicacaoPage

// --- Componentes Placeholder para as novas rotas ---
// Estes são componentes simples para que o roteamento funcione.
// Você os substituirá por seus componentes reais quando criá-los.

const ReceitaDetalhePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f2f7', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2196F3', marginBottom: '1rem' }}>Detalhes da Receita</h1>
      <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem', textAlign: 'center' }}>
        Esta é a página de detalhes de uma receita específica.
      </p>
      <button
        onClick={() => navigate('/hub')}
        style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
      >
        Voltar para o Hub
      </button>
    </div>
  );
};

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f2f7', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2196F3', marginBottom: '1rem' }}>Página de Recuperação de Senha</h1>
      <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem', textAlign: 'center' }}>
        Aqui você pode redefinir sua senha.
      </p>
      <button
        onClick={() => navigate('/login')}
        style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
      >
        Voltar para Login
      </button>
    </div>
  );
};

// Componente principal que define as rotas da aplicação
function AppRoutes() {
  const navigate = useNavigate(); // useNavigate deve ser usado dentro do contexto do Router

  return (
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route
        path="/login"
        element={
          <LoginPage
            onLoginSuccess={() => {
              console.log('Login bem-sucedido! Redirecionando para /hub');
              navigate('/hub');
            }}
            onForgotPasswordClick={() => {
              navigate('/forgot-password');
            }}
            onBackClick={() => {
              navigate('/');
            }}
          />
        }
      />

      {/* Rotas para o Hub e outras páginas */}
      <Route path="/hub" element={<HubPage />} />
      <Route path="/publicacao" element={<PublicacaoPage />} /> {/* Nova rota */}
      <Route path="/pagina-do-usuario" element={<PaginaDoUsuario />} />
      <Route path="/receita/:id" element={<ReceitaPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Rota para 404 Not Found (opcional) */}
      <Route path="*" element={
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffcccc', padding: '20px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#CC0000', marginBottom: '1rem' }}>404 - Página Não Encontrada</h1>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '10px 20px', backgroundColor: '#CC0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}
          >
            Ir para a Página Inicial
          </button>
        </div>
      } />
    </Routes>
  );
}

// O componente App principal que envolve tudo no Router
function App() {
  return (
    <Router>
      <AppRoutes /> {/* Renderiza o componente que contém as rotas */}
    </Router>
  );
}

export default App;
