// src/pages/Receita/ReceitaPage.tsx

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import styles from './ReceitaPage.module.css';

// ALTERAÇÃO: Importando o serviço e o tipo do backend
import { getReceitaPorId } from '../../api/ReceitaService';
import { type ReceitaBackend } from '../../types/Receita';

// Esta interface agora define a estrutura de dados que a TELA precisa para renderizar.
interface RecipeDetails {
  id: string;
  cookName: string;
  cookImage: string;
  description: string;
  mainImage: string;
  ingredients: string[]; // Espera uma lista de strings
  preparationSteps: string[]; // Espera uma lista de strings
  title: string;
}

const ReceitaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID da receita não fornecido.');
      setLoading(false);
      return;
    }

    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Busca os dados brutos do backend usando o ID da URL
        const backendData = await getReceitaPorId(id);

        // 2. TRADUÇÃO: Transforma os dados do backend para o formato que a página precisa.
        const recipeDetails: RecipeDetails = {
          id: backendData.id.toString(),
          title: backendData.titulo,
          description: backendData.descricao,
          cookName: backendData.idCozinheiro.nome.toUpperCase(),
          ingredients: backendData.ingredientes.map(ing => `${ing.quantidade} de ${ing.nome}`),
          // Transforma a string única de modo de preparo em uma lista de passos
          preparationSteps: backendData.modoPreparo.split('.').map(step => step.trim()).filter(step => step),
          // TODO: As imagens virão da entidade 'Upload' do backend no futuro. Por enquanto, usamos placeholders.
          mainImage: `https://placehold.co/800x350/FFDDC1/FF8C00?text=${encodeURIComponent(backendData.titulo)}`,
          cookImage: 'https://placehold.co/48x48/cccccc/333333?text=Chef',
        };
        
        // 3. Atualiza o estado com os dados formatados e prontos para a UI.
        setRecipe(recipeDetails);

      } catch (err) {
        setError('Falha ao carregar a receita. Verifique se o ID está correto.');
        console.error('Erro ao buscar detalhes da receita:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Re-executa se o 'id' mudar

  // O resto do seu componente (funções de clique, JSX para loading/error/render)
  // pode permanecer exatamente o mesmo, pois ele receberá os dados no formato que já esperava.

  const handleProfileClick = () => {
    navigate('/pagina-do-usuario');
  };

  const handleEdit = () => {
    console.log('Botão EDITAR clicado para receita:', id);
  };

  const handleUpdate = () => {
    console.log('Botão ATUALIZAR clicado para receita:', id);
  };

  const handleDelete = () => {
    console.log('Botão EXCLUIR clicado para receita:', id);
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      alert('Receita excluída (simulação).');
      navigate('/hub');
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <Header onProfileClick={handleProfileClick} />
        <div className={styles.mainContent} style={{ textAlign: 'center', padding: '50px' }}>
          Carregando receita...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <Header onProfileClick={handleProfileClick} />
        <div className={styles.mainContent} style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          Erro: {error}
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.pageContainer}>
        <Header onProfileClick={handleProfileClick} />
        <div className={styles.mainContent} style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          Receita não encontrada.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header onProfileClick={handleProfileClick} />
      <main className={styles.mainContent}>
        <div className={styles.cookProfile}>
          <div className={styles.cookDetails}>
            <img src={recipe.cookImage} alt={recipe.cookName} className={styles.cookImage} />
            <span className={styles.cookName}>{recipe.cookName}</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={`${styles.actionButton} ${styles.editButton}`} onClick={handleEdit}>EDITAR</button>
            <button className={`${styles.actionButton} ${styles.updateButton}`} onClick={handleUpdate}>ATUALIZAR</button>
            <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={handleDelete}>EXCLUIR</button>
          </div>
        </div>
        <p className={styles.recipeDescription}>{recipe.description}</p>
        <div className={styles.recipeImageContainer}>
          <img src={recipe.mainImage} alt={recipe.title} className={styles.recipeImage} />
        </div>
        <h2 className={styles.sectionTitle}>INGREDIENTES:</h2>
        <ul className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className={styles.sectionTitle}>MODO DE PREPARO:</h2>
        <div className={styles.preparationSteps}>
          <ol>
            {recipe.preparationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
};

export default ReceitaPage;