// src/components/EditarPerfilModal/EditarPerfilModal.tsx
import * as React from 'react';
import { useState } from 'react';
import { Button } from '../Button/Button'; // Importe seu componente Button
import styles from './EditarPerfilModal.module.css';

interface EditarPerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfileImage: string;
  currentCoverImage: string;
  onSave: (newProfileImage: string, newCoverImage: string) => void;
  onDeleteProfile: () => void;
}

const EditarPerfilModal: React.FC<EditarPerfilModalProps> = ({
  isOpen,
  onClose,
  currentProfileImage,
  currentCoverImage,
  onSave,
  onDeleteProfile,
}) => {
  const [newProfileImage, setNewProfileImage] = useState(currentProfileImage);
  const [newCoverImage, setNewCoverImage] = useState(currentCoverImage);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(newProfileImage, newCoverImage);
    onClose();
  };

  // Simulação de upload de imagem (apenas para demonstração)
  const handleImageUpload = (setImage: React.Dispatch<React.SetStateAction<string>>) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times; {/* Caractere 'X' para fechar */}
        </button>
        <h2 className={styles.modalTitle}>Foto de perfil</h2>

        <div className={styles.profileImageContainer}>
          <img
            src={newProfileImage}
            alt="Foto de perfil"
            className={styles.profileImage}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/128x128/cccccc/333333?text=Profile'; // Fallback image
            }}
          />
          <button className={styles.editButton} onClick={() => handleImageUpload(setNewProfileImage)}>
            Editar
          </button>
        </div>

        <h2 className={styles.modalTitle}>Foto de Capa</h2> {/* Título para foto de capa */}
        <div className={styles.coverImageContainer}>
          <img
            src={newCoverImage}
            alt="Foto de capa"
            className={styles.coverImage}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x120/cccccc/333333?text=Cover'; // Fallback image
            }}
          />
          <button className={styles.editButton} onClick={() => handleImageUpload(setNewCoverImage)}>
            Editar
          </button>
        </div>

        <div className={styles.buttonGroup}>
          <Button variant="primary" size="medium" onClick={handleSave} className={styles.saveButton}>
            Salvar alteração
          </Button>
          <Button variant="secondary" size="medium" onClick={onDeleteProfile} className={styles.deleteButton}>
            EXCLUIR PERFIL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilModal;
