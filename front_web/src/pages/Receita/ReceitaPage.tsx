// src/pages/Receita/ReceitaPage.tsx
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header'; // Importe seu componente Header
import styles from './ReceitaPage.module.css'; // Importe os estilos

// Interface para a estrutura de dados da receita (pode ser a mesma do backend)
interface RecipeDetails {
  id: string;
  cookName: string;
  cookImage: string;
  description: string;
  mainImage: string;
  ingredients: string[];
  preparationSteps: string[];
  title: string; // CORREÇÃO: Adicionada a propriedade 'title'
}

const ReceitaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Dados de exemplo para uma receita específica
  const dummyRecipe: RecipeDetails = {
    id: 'pizza-margherita',
    cookName: 'JOÃO PEDRO',
    cookImage: 'https://placehold.co/48x48/cccccc/333333?text=JP', // Placeholder para a imagem do cozinheiro
    description: 'A receita escolhida de hoje é uma deliciosa pizza marguerita, muito requisitada aqui no restaurante.',
    mainImage: 'https://placehold.co/800x350/FFDDC1/FF8C00?text=Pizza+Margherita', // Placeholder para a imagem da pizza
    ingredients: [
      '1 e meia xícara de chá de água',
      'Meia xícara de chá de leite',
      '2 colheres de sopa de azeite de oliva',
      '1 ovo',
      'Meia colher de chá de sal',
      '1 colher de chá de açúcar',
      '20 gramas de fermento biológico seco',
      '1 quilo de farinha de trigo',
      'Molho de tomate a gosto',
      'Queijo muçarela ralado a gosto',
      'Tomate em rodelas a gosto',
      'Manjericão a gosto',
    ],
    preparationSteps: [
      'Em uma tigela, misture água, leite, azeite, sal, açúcar e fermento biológico. Vá adicionando a farinha aos poucos, enquanto amassa, até ficar consistente.',
      'Transfira para uma superfície enfarinhada e amasse, polvilhando mais farinha se necessário, até desgrudar das mãos. Sove bem a massa por uns 10 minutos ou até ficar lisa e macia.',
      'Divida em porções, modele bolas, cubra e deixe crescer por 30 minutos.',
      'Abra as massas com um rolo até formar discos na espessura desejada e acomode em formas de pizza.',
      'Passe molho de tomate em cada disco, deixando a borda livre, e leve ao forno alto preaquecido a 220 graus Celsius por 10 minutos.',
      'Distribua queijo muçarela, rodelas de tomate e leve de volta ao forno até dourar a borda e derreter o queijo.',
      'Distribua as folhas de manjericão e sirva bem quentinho.',
    ],
    title: 'Pizza Margherita', // CORREÇÃO: Adicionado o título ao dummyRecipe
  };

  useEffect(() => {
    // TODO: Em uma aplicação real, você faria uma chamada à API do backend aqui
    // para buscar os detalhes da receita com base no 'id' da URL.
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simula um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 700));
        // Se o ID da URL corresponder à nossa receita dummy, use-a.
        // Em um cenário real, você faria uma busca por ID no backend.
        if (id === dummyRecipe.id) {
          setRecipe(dummyRecipe);
        } else {
          // Se o ID não for encontrado, você pode redirecionar para uma página 404
          // ou exibir uma mensagem de receita não encontrada.
          setError('Receita não encontrada.');
          setRecipe(null);
        }
      } catch (err) {
        setError('Falha ao carregar a receita. Tente novamente mais tarde.');
        console.error('Erro ao buscar detalhes da receita:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]); // Re-executa o efeito se o ID da receita na URL mudar

  const handleProfileClick = () => {
    navigate('/pagina-do-usuario'); // Navega para a página do usuário
  };

  const handleEdit = () => {
    console.log('Botão EDITAR clicado para receita:', id);
    // TODO: Implementar lógica de edição (ex: navegar para um formulário de edição)
  };

  const handleUpdate = () => {
    console.log('Botão ATUALIZAR clicado para receita:', id);
    // TODO: Implementar lógica de atualização (ex: salvar alterações)
  };

  const handleDelete = () => {
    console.log('Botão EXCLUIR clicado para receita:', id);
    // TODO: Implementar lógica de exclusão
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      alert('Receita excluída (simulação).');
      navigate('/hub'); // Redireciona para o Hub após exclusão simulada
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
        {/* Perfil do Cozinheiro e Botões de Ação */}
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

        {/* Descrição da Receita */}
        <p className={styles.recipeDescription}>
          {recipe.description}
        </p>

        {/* Imagem Principal da Receita */}
        <div className={styles.recipeImageContainer}>
          <img
            src={recipe.mainImage}
            alt={recipe.title} /* Usando recipe.title aqui */
            className={styles.recipeImage}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/800x350/cccccc/333333?text=Imagem+da+Receita';
            }}
          />
        </div>

        {/* Seção de Ingredientes */}
        <h2 className={styles.sectionTitle}>INGREDIENTES:</h2>
        <ul className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        {/* Seção de Modo de Preparo */}
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
