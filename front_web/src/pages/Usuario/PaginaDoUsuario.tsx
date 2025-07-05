// src/pages/Usuario/PaginaDoUsuario.tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header'; // Importe seu componente Header
import { Button } from '../../components/Button/Button'; // Importe seu componente Button
import RecipeCard, { type Recipe } from '../../components/RecipeCard/RecipeCard'; // Importe o RecipeCard e a interface
import ReviewCard, { type Review } from '../../components/ReviewCard/ReviewCard'; // Importe o ReviewCard e a interface
import EditarPerfilModal from '../../components/EditarPerfilModal/EditarPerfilModal'; // Importe o modal
import styles from './PaginaDoUsuario.module.css'; // Importe os estilos

const PaginaDoUsuario: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados de exemplo para o usuário
  const [userProfile, setUserProfile] = useState({
    name: 'SOFIA MARTINELLI',
    profileImage: 'https://placehold.co/128x128/FFDDC1/FF8C00?text=Perfil', // Placeholder para a imagem de perfil
    coverImage: 'https://placehold.co/1200x200/FFDDC1/FF8C00?text=Capa', // Placeholder para a imagem de capa
  });

  // Dados de exemplo para Receitas Favoritas (reutilizando a interface Recipe do Hub)
  const favoriteRecipes: Recipe[] = [
    {
      id: 'fav1',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Panquecas+italianas',
      title: 'Panquecas italianas',
      time: '40 minutos',
      difficulty: 'Fácil',
    },
    {
      id: 'fav2',
      imageSrc: 'https://placehold.co/400x240/FFDDC1/FF8C00?text=Tapioca+omelete',
      title: 'Tapioca omelete',
      time: '15 minutos',
      difficulty: 'Muito Fácil',
    },
    // Adicione mais receitas favoritas de exemplo se desejar
  ];

  // Dados de exemplo para Avaliações
  const userReviews: Review[] = [
    {
      id: 'rev1',
      userImageSrc: 'https://placehold.co/48x48/FFDDC1/FF8C00?text=User1',
      username: 'SOFIA MARTINELLI',
      text: 'Achei simplesmente incrível !!!!',
    },
    {
      id: 'rev2',
      userImageSrc: 'https://placehold.co/48x48/FFDDC1/FF8C00?text=User2',
      username: 'SOFIA MARTINELLI',
      text: 'Muito bom, vou fazer novamente.',
    },
    // Adicione mais avaliações de exemplo se desejar
  ];

  const handleRecipeClick = (recipeId: string) => {
    navigate(`/receita/${recipeId}`); // Navega para a página de detalhes da receita
  };

  const handleEditProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (newProfileImage: string, newCoverImage: string) => {
    // TODO: Aqui você enviaria as novas imagens para o backend
    console.log('Salvando novas imagens:', { newProfileImage, newCoverImage });
    setUserProfile({
      ...userProfile,
      profileImage: newProfileImage,
      coverImage: newCoverImage,
    });
  };

  const handleDeleteProfile = () => {
    // TODO: Lógica para excluir o perfil do usuário
    console.log('Excluir perfil clicado!');
    if (window.confirm('Tem certeza que deseja excluir seu perfil? Esta ação é irreversível.')) {
      // Implementar a chamada à API de exclusão de perfil
      alert('Perfil excluído (simulação).');
      navigate('/'); // Redireciona para a página inicial após exclusão
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header profileSrc={userProfile.profileImage} onProfileClick={() => navigate('/pagina-do-usuario')} />

      <main className={styles.mainContent}>
        {/* Foto de Capa */}
        <img src={userProfile.coverImage} alt="Foto de capa do perfil" className={styles.coverPhoto} />

        {/* Informações do Perfil */}
        <div className={styles.profileInfo}>
          <div className={styles.profileDetails}>
            <img src={userProfile.profileImage} alt="Foto de perfil" className={styles.profileImage} />
            <h1 className={styles.username}>{userProfile.name}</h1>
          </div>
          <Button variant="primary" size="medium" onClick={handleEditProfileClick} className={styles.editProfileButton}>
            EDITAR PERFIL
          </Button>
        </div>

        {/* Seção de Receitas Favoritas */}
        <section className={styles.favoritesSection}>
          <h2 className={styles.sectionTitle}>RECEITAS FAVORITAS:</h2>
          {favoriteRecipes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Você ainda não tem receitas favoritas.</p>
          ) : (
            <div className={styles.recipeGrid}>
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
              ))}
            </div>
          )}
        </section>

        {/* Seção de Avaliações */}
        <section className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>AVALIAÇÕES:</h2>
          {userReviews.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Nenhuma avaliação recebida ainda.</p>
          ) : (
            <div className={styles.reviewsGrid}>
              {userReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal de Edição de Perfil */}
      <EditarPerfilModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        currentProfileImage={userProfile.profileImage}
        currentCoverImage={userProfile.coverImage}
        onSave={handleSaveProfile}
        onDeleteProfile={handleDeleteProfile}
      />
    </div>
  );
};

export default PaginaDoUsuario;
