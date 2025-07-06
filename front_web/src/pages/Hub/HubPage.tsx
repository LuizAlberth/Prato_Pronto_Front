// src/pages/Hub/HubPage.tsx

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import RecipeCard, { type Recipe } from '../../components/RecipeCard/RecipeCard';
import styles from './HubPage.module.css';

// ALTERAÇÃO: Importando o serviço que busca os dados reais.
import { getTodasReceitas } from '../../api/ReceitaService'; 

const HubPage: React.FC = () => {
  const navigate = useNavigate();
  // Este estado agora espera dados no formato do RecipeCard (id, imageSrc, title, etc.)
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Função que agora busca os dados REAIS do backend.
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Busca os dados brutos do backend.
        const receitasDoBackend = await getTodasReceitas();

        // 2. Transforma os dados do backend para o formato que o RecipeCard espera.
        const receitasFormatadas = receitasDoBackend.map((receita) => ({
          id: receita.id.toString(),
          title: receita.titulo,
          time: `${receita.tempoPreparo} minutos`,
          difficulty: receita.dificuldade,
          // NOTA: A imagem virá do backend no futuro. Por enquanto, usamos um placeholder.
          imageSrc: `https://placehold.co/400x240/FFDDC1/FF8C00?text=${encodeURIComponent(receita.titulo)}`,
        }));
        
        // 3. Atualiza o estado com os dados formatados e prontos para a UI.
        setRecipes(receitasFormatadas);

      } catch (err) {
        setError('Falha ao carregar receitas. Tente novamente mais tarde.');
        console.error('Erro ao buscar receitas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []); // O array vazio [] garante que a busca aconteça apenas uma vez.

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/receita/${recipeId}`);
  };

  const handlePublishClick = () => {
    navigate('/publicacao');
  };

  const handleProfileClick = () => {
    navigate('/pagina-do-usuario');
  };

  // O resto do seu componente (lógica de 'loading', 'error' e o JSX) continua o mesmo,
  // pois ele já está preparado para receber os dados e renderizá-los.
  
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