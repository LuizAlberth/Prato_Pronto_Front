// src/types/receita.ts

export interface Cozinheiro {
  id: number;
  nome: string;
  email: string;
  verificado: boolean;
}

export interface Ingrediente {
  id: number;
  nome: string;
  quantidade: string;
}

// Este tipo representa a receita como ela vem do seu backend Spring Boot
export interface ReceitaBackend {
  id: number;
  titulo: string;
  descricao: string;
  modoPreparo: string;
  tempoPreparo: number;
  dificuldade: string;
  idCozinheiro: Cozinheiro;
  ingredientes: Ingrediente[];
  // uploads: any[]; // Adicione se for usar
}