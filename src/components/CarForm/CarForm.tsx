import type React from 'react';
import { useState, useEffect } from 'react';

import CarSvg from '../../assets/svg/CarSvg';

import styles from './CarForm.module.css';

interface CarFormProps {
  onSubmit: (name: string, color: string) => void;
  initialName?: string;
  initialColor?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const CarForm: React.FC<CarFormProps> = ({
  onSubmit,
  initialName = '',
  initialColor = '#FF6B6B',
  isEditing = false,
  onCancel,
}) => {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    setName(initialName);
    setColor(initialColor);
  }, [initialName, initialColor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      alert('Car name cannot be empty');
      return;
    }
    if (name.trim().length > 50) {
      alert('Car name is too long (max 50 characters)');
      return;
    }
    onSubmit(name.trim(), color);
    if (!isEditing) {
      setName('');
      setColor('#FF6B6B');
    }
  };

  const handleCancel = () => {
    setName('');
    setColor('#FF6B6B');
    onCancel?.();
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>{isEditing ? 'Update Car' : 'Create New Car'}</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="carName" className={styles.label}>
            Car Name
          </label>
          <input
            id="carName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter car name..."
            className={styles.input}
            maxLength={50}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="carColor" className={styles.label}>
            Car Color
          </label>
          <div className={styles.colorInputContainer}>
            <input
              id="carColor"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className={styles.colorInput}
            />
            <div className={styles.carPreview}>
              <CarSvg color={color} />
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={`${styles.button} ${styles.primary}`}>
            {isEditing ? 'Update' : 'Create'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className={`${styles.button} ${styles.secondary}`}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CarForm;
