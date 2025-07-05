// src/pages/Hub/HubPage.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header'; // Importe seu componente Header
import { Button } from '../../components/Button/Button'; // Importe seu componente Button
import RecipeCard, { type Recipe } from '../../components/RecipeCard/RecipeCard'; // CORREÇÃO: Adicionado 'type' antes de Recipe
import styles from './HubPage.module.css'; // Importe os estilos do HubPage

const HubPage: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Sugestão: Dados de Exemplo vs. Dados Reais ---
  // Para começar, é MELHOR usar dados de exemplo (dummy data) para construir e estilizar a UI.
  // Isso permite que você veja o layout funcionando antes mesmo de o backend estar 100% pronto.
  // Uma vez que o backend esteja pronto, você pode trocar para a lógica de fetch real.

  const dummyRecipes: Recipe[] = [
    {
      id: '1',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Bolinhos+de+Queijo', // Placeholder com cor laranja clara
      title: 'Bolinhos de Queijo',
      time: '30 minutos',
      difficulty: 'Média',
    },
    {
      id: '2',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Folhados+de+Repolho',
      title: 'Folhados de Repolho',
      time: '45 minutos',
      difficulty: 'Difícil',
    },
    {
      id: '3',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Espaguete',
      title: 'Espaguete',
      time: '45 minutos',
      difficulty: 'Difícil',
    },
    {
      id: '4',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Ensopado',
      title: 'Ensopado',
      time: '30 minutos',
      difficulty: 'Média',
    },
    {
      id: '5',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Strogonoff',
      title: 'Strogonoff',
      time: '30 minutos',
      difficulty: 'Média',
    },
    {
      id: '6',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Frango+ao+Molho',
      title: 'Frango ao Molho',
      time: '45 minutos',
      difficulty: 'Difícil',
    },
  ];

  useEffect(() => {
    // TODO: Implementar a chamada à API do seu backend Spring Boot para buscar receitas
    // Por enquanto, vamos usar os dados de exemplo para preencher a tela.
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simula um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        setRecipes(dummyRecipes); // Usando dados de exemplo
      } catch (err) {
        setError('Falha ao carregar receitas. Tente novamente mais tarde.');
        console.error('Erro ao buscar receitas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (recipeId: string) => {
    // TODO: Navegar para a página de detalhes da receita
    navigate(`/receita/${recipeId}`); // Exemplo de rota para detalhes da receita
  };

  const handlePublishClick = () => {
    navigate('/publicacao'); // Navega para a tela de Publicação
  };

  const handleProfileClick = () => {
    navigate('/pagina-do-usuario'); // Navega para a página do usuário
  };

  if (loading) {
    return (
      <div className={styles.hubContainer}>
        <Header profileSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/84383cb146f9fb4c24365d8d628c5d767de9bb4f?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8" onProfileClick={handleProfileClick} />
        <div className={styles.mainContent} style={{ textAlign: 'center', marginTop: '50px' }}>
          Carregando receitas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.hubContainer}>
        <Header profileSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/84383cb146f9fb4c24365d8d628c5d767de9bb4f?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8" onProfileClick={handleProfileClick} />
        <div className={styles.mainContent} style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
          Erro: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.hubContainer}>
      <Header profileSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/84383cb146f9fb4c24365d8d628c5d767de9bb4f?placeholderIfAbsent=true&apiKey=dee6fdd91750450e80e459b2398c16e8" onProfileClick={handleProfileClick} />

      <div className={styles.mainContent}>
        <div className={styles.controls}>
          <button className={styles.filterButton} onClick={() => console.log('Filtros clicado')}>
            Filtro
          </button>
          <Button variant="primary" size="medium" onClick={handlePublishClick} className={styles.publishButton}>
            PUBLICAR
          </Button>
        </div>

        {recipes.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
            Nenhuma receita encontrada. Que tal publicar uma?
          </div>
        ) : (
          <div className={styles.recipeGrid}>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HubPage;
