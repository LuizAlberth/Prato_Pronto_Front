// src/components/ReviewCard/ReviewCard.tsx
import * as React from 'react';
import styles from './ReviewCard.module.css';

export interface Review {
  id: string;
  userImageSrc: string;
  username: string;
  text: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
      <img
        src={review.userImageSrc}
        alt={`${review.username}'s profile`}
        className={styles.profileImage}
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/48x48/cccccc/333333?text=User'; // Fallback image
        }}
      />
      <div className={styles.content}>
        <div className={styles.username}>{review.username}</div>
        <p className={styles.reviewText}>{review.text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
