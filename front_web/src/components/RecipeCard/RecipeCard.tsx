// src/components/RecipeCard/RecipeCard.tsx
import * as React from 'react';
import styles from './RecipeCard.module.css';

// Interface para o objeto de receita
export interface Recipe {
  id: string;
  imageSrc: string;
  title: string;
  time: string;
  difficulty: string;
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (id: string) => void; // Função para lidar com o clique no card
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(recipe.id)}>
      <div className={styles.imageContainer}>
        <img
          src={recipe.imageSrc}
          alt={recipe.title}
          className={styles.image}
          // Fallback para imagem caso a URL não carregue
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x240/cccccc/333333?text=Sem+Imagem';
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={styles.detail}>Tempo: {recipe.time}</p>
        <p className={styles.detail}>Dificuldade: <span className={styles.difficulty}>{recipe.difficulty}</span></p>
      </div>
    </div>
  );
};

export default RecipeCard;
