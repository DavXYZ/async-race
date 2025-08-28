import React from 'react';

import styles from './CarForm.module.css';

interface CarFormButtonsProps {
  isEditing?: boolean;
  resetFields: () => void;
}

const CarFormButtons: React.FC<CarFormButtonsProps> = ({
  isEditing = false,
  resetFields,
}: CarFormButtonsProps) => (
  <div className={styles.buttonGroup}>
    <button type="submit" className={`${styles.button} ${styles.primary}`}>
      {isEditing ? 'Update' : 'Create'}
    </button>

    {isEditing && (
      <button
        type="button"
        onClick={resetFields}
        className={`${styles.button} ${styles.secondary}`}
      >
        Cancel
      </button>
    )}
  </div>
);

export default CarFormButtons;
