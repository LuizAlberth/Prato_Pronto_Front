// Esta interface define os dados que o formulário de cadastro envia para a API.
export interface UsuarioCadastroData {
  nome: string;
  email: string;
  senha: string;
}

// Esta interface representa os dados de um usuário que o backend pode retornar.
export interface Usuario {
  id: number;
  nome: string;
  email: string;
}