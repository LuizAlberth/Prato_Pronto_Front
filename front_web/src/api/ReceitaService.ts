// src/services/receitaService.ts

import { type ReceitaBackend } from '../types/Receita';

const API_BASE_URL = 'http://localhost:8080';

// Esta função você já tem
export const getTodasReceitas = async (): Promise<ReceitaBackend[]> => {
  const response = await fetch(`${API_BASE_URL}/receitas`);
  if (!response.ok) {
    throw new Error('Falha ao buscar as receitas do servidor.');
  }
  return response.json();
};

// ===================================================================
// ✨ NOVA FUNÇÃO A SER ADICIONADA ✨
export const getReceitaPorId = async (id: string): Promise<ReceitaBackend> => {
  // Faz a chamada para o endpoint GET /receitas/{id} do seu backend
  const response = await fetch(`${API_BASE_URL}/receitas/${id}`);
  
  if (!response.ok) {
    // Se a receita não for encontrada (erro 404) ou der outro erro, lança uma exceção.
    throw new Error(`Falha ao buscar a receita com ID ${id}.`);
  }

  return response.json();
};
// ===================================================================