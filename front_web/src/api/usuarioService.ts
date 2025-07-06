import { type Usuario, type UsuarioCadastroData } from '../types/usuario';

const API_BASE_URL = 'http://localhost:8080';

/**
 * Cadastra um novo usuário comum.
 */
export const cadastrarUsuario = async (dadosUsuario: UsuarioCadastroData): Promise<Usuario> => {
  const response = await fetch(`${API_BASE_URL}/comuns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  });

  // Caminho de ERRO: Se a resposta não for OK, nós LANÇAMOS UM ERRO.
  // Isso encerra a função e cumpre o contrato da Promise (rejeitando-a).
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro ao cadastrar usuário.' }));
    throw new Error(errorData.message || 'Ocorreu um erro desconhecido.');
  }

  // Caminho de SUCESSO: Se a resposta for OK, nós RETORNAMOS OS DADOS.
  return response.json();
};


/**
 * Autentica um usuário.
 */
export const loginUsuario = async (credenciais: Omit<UsuarioCadastroData, 'nome'>): Promise<Usuario> => {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credenciais),
  });

  // Caminho de ERRO: Se a resposta não for OK, nós LANÇAMOS UM ERRO.
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Email ou senha inválidos.');
  }
  
  // Caminho de SUCESSO: Se a resposta for OK, nós RETORNAMOS OS DADOS.
  return response.json();
};