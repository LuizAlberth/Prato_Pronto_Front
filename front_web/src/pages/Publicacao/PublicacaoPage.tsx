// src/pages/Publicacao/PublicacaoPage.tsx
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button'; // Importe seu componente Button
import styles from './PublicacaoPage.module.css'; // Importe os estilos

// Interface para os dados da nova receita
interface NewRecipeData {
  id: string; // Para simular o ID da receita publicada
  name: string;
  prepTime: string;
  ingredients: string; // Lista de ingredientes como texto bruto
  preparationSteps: string; // Modo de preparo como texto bruto
  image: string | null; // URL da imagem ou base64
  dietary: {
    fitness: boolean;
    lactoseFree: boolean;
    glutenFree: boolean;
    vegan: boolean;
    sugarFree: boolean;
  };
}

const PublicacaoPage: React.FC = () => {
  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationSteps, setPreparationSteps] = useState('');
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [dietaryOptions, setDietaryOptions] = useState({
    fitness: false,
    lactoseFree: false,
    glutenFree: false,
    vegan: false,
    sugarFree: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const logoPratoPronto = '/logo.png'; // Caminho relativo à pasta public

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDietaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDietaryOptions({
      ...dietaryOptions,
      [e.target.name]: e.target.checked,
    });
  };

  const handlePublish = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    // TODO: Aqui você enviaria os dados da receita para o seu backend Spring Boot.
    // Por enquanto, vamos simular a publicação.

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula atraso de rede

      // Simula a criação de um ID para a nova receita
      const newRecipeId = `recipe-${Date.now()}`;

      const newRecipeData: NewRecipeData = {
        id: newRecipeId,
        name: recipeName,
        prepTime: prepTime,
        ingredients: ingredients,
        preparationSteps: preparationSteps,
        image: recipeImage,
        dietary: dietaryOptions,
      };

      console.log('Dados da receita a ser publicada (simulado):', newRecipeData);

      setMessage('Receita publicada com sucesso!');

      // Redireciona para a página da receita recém-publicada
      // Note: A ReceitaPage precisaria ser capaz de renderizar a partir desses dados
      // ou buscar a receita com base no ID.
      navigate(`/receita/${newRecipeId}`);

    } catch (err) {
      setMessage('Falha ao publicar receita. Tente novamente.');
      console.error('Erro na publicação simulada:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/hub'); // Leva de volta ao Hub
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <img src={logoPratoPronto} alt="Logo Prato Pronto" className={styles.logo} />
        <h1 className={styles.title}>Publicar Receita</h1>
      </header>

      <form onSubmit={handlePublish} className={styles.mainContent}>
        {/* Campo Nome da Receita */}
        <div className={styles.formGroup}>
          <label htmlFor="recipeName" className={styles.label}>Nome da Receita</label>
          <input
            type="text"
            id="recipeName"
            className={styles.input}
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>

        {/* Campo Tempo de preparo */}
        <div className={styles.formGroup}>
          <label htmlFor="prepTime" className={styles.label}>Tempo de preparo</label>
          <input
            type="text"
            id="prepTime"
            className={styles.input}
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="Ex: 30 minutos"
            required
          />
        </div>

        {/* Campo Lista de Ingredientes */}
        <div className={styles.formGroup}>
          <label htmlFor="ingredients" className={styles.label}>Lista de Ingredientes</label>
          <textarea
            id="ingredients"
            className={styles.textarea}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Um ingrediente por linha. Ex: 2 xícaras de farinha"
            required
          ></textarea>
        </div>

        {/* Caixa de Upload de Imagem */}
        <div className={styles.imageUploadBox} onClick={() => document.getElementById('imageUploadInput')?.click()}>
          {recipeImage ? (
            <img src={recipeImage} alt="Preview da Receita" className={styles.imagePreview} />
          ) : (
            <span>Imagem</span>
          )}
          <input
            type="file"
            id="imageUploadInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {/* Campo Modo de Preparo */}
        <div className={styles.formGroup} style={{ gridColumn: '1 / span 2' }}> {/* Ocupa as duas colunas */}
          <label htmlFor="preparationSteps" className={styles.label}>Modo de Preparo (Passo a Passo)</label>
          <textarea
            id="preparationSteps"
            className={styles.textarea}
            value={preparationSteps}
            onChange={(e) => setPreparationSteps(e.target.value)}
            placeholder="Descreva o passo a passo. Ex: 1. Misture os ingredientes..."
            required
          ></textarea>
        </div>

        {/* Opções Dietéticas */}
        <div className={styles.dietaryOptions}>
          <label>Receita é considerada:</label>
          <div>
            <label>
              <input type="radio" name="fitness" checked={dietaryOptions.fitness} onChange={handleDietaryChange} /> Fitness
            </label>
            <label>
              <input type="radio" name="lactoseFree" checked={dietaryOptions.lactoseFree} onChange={handleDietaryChange} /> Sem lactose
            </label>
            <label>
              <input type="radio" name="glutenFree" checked={dietaryOptions.glutenFree} onChange={handleDietaryChange} /> Sem glúten
            </label>
            <label>
              <input type="radio" name="vegan" checked={dietaryOptions.vegan} onChange={handleDietaryChange} /> Vegano
            </label>
            <label>
              <input type="radio" name="sugarFree" checked={dietaryOptions.sugarFree} onChange={handleDietaryChange} /> Sem açúcar
            </label>
          </div>
        </div>

        {/* Mensagem de status */}
        {message && (
          <p style={{ gridColumn: '1 / span 2', textAlign: 'center', color: message.includes('sucesso') ? 'green' : 'red' }}>
            {message}
          </p>
        )}

        {/* Botões de Ação */}
        <div className={styles.buttonGroup}>
          <Button variant="secondary" size="medium" onClick={handleCancel} className={styles.cancelButton} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="medium" className={styles.publishButton} disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PublicacaoPage;
